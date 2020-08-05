const Sha1 = require('sha1');// 密码加密
const md5 = require('md5');// 密码加密
const crypto = require('crypto');//node自带密码加密模块

const BaseServic = require('./base');

class Service extends BaseServic {
  constructor(...agrs){
    super(...agrs);
    this.entity = 'user'
  }
  async getUserRoleResource() {
    const data = await this.app.mysql.select('user');
    for(let i =0;i<data.length;i++) {
      const user = data[i];
      const resources = await this.app.mysql.query(`select resource.* from resource 
      inner join role_resource on resource.id = role_resource.resource_id
      inner join role_user on role_resource.role_id = role_user.role_id
      where role_user.user_id = ?`,[user.id]);
      const rootMens = [];
      const map = {};
      resources.forEach(resource => {
        resource.children = [];
        map[resource.id] = resource;// 把资源的ID和资源的对象关系存放到map中
        if(resource.parent_id == 0) {
          rootMens.push(resource)
        } else {
          map[resource.parent_id].children.push(resource)
        }
      });
      user.resource = rootMens;
    }
    return data
  }
  // 注册
  async signup(body) {
    const {ctx,service} = this;
    const username = body.username;
    const result = await this.app.mysql.select('user',{where:{"username":username},limit:1});
    if(result.length>0&&username==result[0].username){
      return '该用户名已经被注册，请更换其他名称注册'
    }else{
      body.password = md5(Sha1(body.password));
      return await this.app.mysql.insert('user',body);
    }
  }
  // 登录
  async signin(body) {
    const {ctx,service} = this;
    const username = body.username;
    const password = md5(Sha1(body.password));
    return await this.app.mysql.select('user',{where:{"username":username,"password":password},limit:1});
  }
}

module.exports = Service;
