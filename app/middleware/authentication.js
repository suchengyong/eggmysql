const JWT = require('jsonwebtoken');
// 通过在路由请求接口中间添加 的方式来拦截
// 中间价 拦截登录成功才可以访问
module.exports = (options,app) => {
    return async function(ctx,next) {
        const authorization = ctx.get('authorization')
        if(authorization) {
            try {
                let user = await verifyToken(authorization,app.config.jwtSecret); 
                ctx.session.user = user;
                await next();
            } catch (error) {
                switch (error.name) {
                    case 'JsonWebTokenError':
                        ctx.status = 403;
                        ctx.body = {
                            code:1,
                            success:false,
                            msg:'token验证失败，请重新获取新的token'
                        };
                    break;
                    case 'TokenExpiredError':
                        ctx.status = 403;
                        ctx.body = {
                            code:1,
                            success:false,
                            msg:'tokeny已经过期，请重新获取token'
                        };
                    break;
                }  
            }
        }else{
            ctx.status = 401;
            ctx.body = {
                code:1,
                success:false,
                msg:'没有token'
            };
        }
    }
}

function verifyToken(token,secret) {
    return new Promise(function(resolve,reject) {
        JWT.verify(token,secret,function(error,payload) {
            if(error) {
                reject(error)
            }else{
                resolve(payload)
            }
        })
    }) 
}