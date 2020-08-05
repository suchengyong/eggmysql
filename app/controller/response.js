class Response{
    success(ctx,msg,data){
        ctx.body = {
            code:0,
            success:true,
            msg:msg,
            data:data
        };
    }
    error(ctx,msg){
        ctx.body = {
            code:1,
            success:false,
            msg:msg
        };
    }
}

module.exports = new Response();