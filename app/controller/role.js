
const BaseController = require('./base');
const Response = require('./response');

class Controller extends BaseController {
  constructor(...agrs){
      super(...agrs);
      this.entity = 'role'
  }
  // 获取所有角色资源数据
  async getResource() {
    const {ctx,service} = this;
    const result = await service.role.getResource();
    Response.success(ctx,'资源角色获取成功',result);
  }
  // 设置角色资源数据
  async setResource() {
    const {ctx,service} = this;
    let body = ctx.request.body;
    const result = await service.role.setResource(body);
    Response.success(ctx,'资源角色设置成功',result);
  }
  // 获取所有用户角色
  async getUser() {
    const {ctx,service} = this;
    const result = await service.role.getUser();
    Response.success(ctx,'用户角色获取成功',result);
  }
  // 设置所有用户角色
  async setUser() {
    const {ctx,service} = this;
    let body = ctx.request.body;
    const result = await service.role.setUser(body);
    Response.success(ctx,'用户角色设置成功',result);
  }
}

module.exports = Controller;
