const Service = require('egg').Service;

class PaginationServic extends Service {
  // 查询所以数据
  async list(page,size,where) {
    const data = await this.app.mysql.select('pagination',{
      where,
      order:[['id','asc'],['title','asc']],//先按ID 升序排序，在按title 升序排序
      offset:(page-1)*size,//起始索引 
      limit:size // 返回条数
    });
    const total = await this.app.mysql.count('pagination',where);//返回总条数
    return {data,total}
  }
}

module.exports = PaginationServic
