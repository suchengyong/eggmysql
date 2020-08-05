
const BaseServic = require('./base');

class Service extends BaseServic {
  constructor(...agrs){
    super(...agrs);
    this.entity = 'role'
  }
  async getResource() {
    const resource = await this.app.mysql.select('resource')
    const rootMens = [];
    const map = {};
    resource.forEach(resource => {
      resource.children = [];
      map[resource.id] = resource;// 把资源的ID和资源的对象关系存放到map中
      if(resource.parent_id == 0) {
        rootMens.push(resource)
      } else {
        map[resource.parent_id].children.push(resource)
      }
    });
    return rootMens
  }
  async setResource(body) {
    let {roleId,resourceIds} = body;
    const conn = await this.app.mysql.beginTransaction();//有两段sql执行话 创建一个新的事务,如果有一段sql执行错误上一段就会回滚到执行之前数据
    try {
      await conn.query('DELETE FROM role_resource WHERE role_id=?',[roleId]);
      for(let i=0;i<resourceIds.length;i++) {
        let resourceId = resourceIds[i];
        await conn.insert('role_resource',{
          role_id:roleId,
          resource_id:resourceId
        });
      }
      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    }
    return null;
  }

  async getUser() {
    return await this.app.mysql.select('role_user')
  }
  async setUser(body) {
    let {roleId,userIds} = body;
    const conn = await this.app.mysql.beginTransaction();//有两段sql执行话 创建一个新的事务,如果有一段sql执行错误上一段就会回滚到执行之前数据
    try {
      await conn.query('DELETE FROM role_user WHERE role_id=?',[roleId]);
      for(let i=0;i<userIds.length;i++) {
        let userId = userIds[i];
        await conn.insert('role_user',{
          role_id:roleId,
          user_id:userId
        });
      }
      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    }
    return null;
  }
}

module.exports = Service;