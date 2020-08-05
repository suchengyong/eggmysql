
const Controller = require('egg').Controller;
const Response = require('./response')

class BaseController extends Controller {
  // 查询数据
  async index() {
    const { ctx,service } = this;
    let list = await service[this.entity].list();
    Response.success(ctx,'数据获取成功',list);
  }
  // 增加数据
  async create() {
    const { ctx,service } = this;
    let entity =  ctx.request.body;
    let result = await service[this.entity].create(entity);
    result.affectedRows>0?Response.success(ctx,'数据新增成功',null):Response.success(ctx,'数据新增失败',null);
  }
  // 修改数据
  async update() {
    const { ctx,service } = this;
    let id = ctx.params.id;
    let entity = Object.assign({},ctx.request.body,{id})
    const result = await service[this.entity].update(entity);
    result.affectedRows>0?Response.success(ctx,'数据修改成功',null):Response.success(ctx,'数据修改失败',null);
  }
  // 删除数据
  async destroy() {
    const { ctx,service } = this;
    let id = ctx.params.id;
    const result = await service[this.entity].destroy(id);
    result.affectedRows>0?Response.success(ctx,'数据删除成功',null):Response.success(ctx,'数据删除失败',null);
  }
}

module.exports = BaseController;
