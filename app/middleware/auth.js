const JWT = require('jsonwebtoken');
// 通过添加白名单的方式来拦截
// 中间价 拦截登录成功才可以访问
module.exports = (options,app) => {
    return async function(ctx,next) {
        // 这里进行权限判断
        const authUrls = options.authUrls;
        if(authUrls.includes(ctx.url)) {// 如果在判断权限有没有token
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
        }else{
            await next();
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