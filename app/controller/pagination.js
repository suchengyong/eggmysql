const Controller = require('egg').Controller;
const Response = require('./response');

class PaginationController extends Controller {
    // 分页加条件查询 
    async index() {
        const { ctx,service } = this;
        const {pageNum,pageSize,...where} = ctx.query;//分页查询
        const page = isNaN(pageNum)? 1 : parseInt(pageNum);
        const size = isNaN(pageSize)? 3 : parseInt(pageSize);
        let list = await service.pagination.list(page,size,where);
        Response.success(ctx,'数据获取成功',list);
    }
}

module.exports = PaginationController;
