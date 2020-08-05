
const Service = require('egg').Service;

class BaseServic extends Service {
  // 查询所以数据
  async list() {
    return await this.app.mysql.select(this.entity);//也可以在样写 this.app.mysql.query('select * from user')
  }
  // 插入数据到数据库
  async create(entity) {
    return await this.app.mysql.insert(this.entity,entity);//也可以在样写 this.app.mysql.query('select * from user')
  }
  // 更新数据到数据库
  async update(entity) {
    // update user set username=?,passwrod =? where id = ?
    return await this.app.mysql.update(this.entity,entity)
  }
  // 删除数据库数据
  async destroy(id) {
    return await this.app.mysql.delete(this.entity,{id})
  }
}

module.exports = BaseServic