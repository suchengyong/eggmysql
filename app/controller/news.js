const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    const { ctx,service } = this;
    await ctx.render('news',{
        msg:'ejs 传递给前台数据'
    })// 返回模版引擎
  }
}

module.exports = NewsController;
