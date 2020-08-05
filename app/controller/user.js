const BaseController = require('./base');
const Response = require('./response');
const svgCaptcha = require('svg-captcha');// 添加图片验证码
const JWT = require('jsonwebtoken');// 添加token

class Controller extends BaseController {
  constructor(...agrs){
    super(...agrs);
    this.entity = 'user'
  }
  async getUserRoleResource() {
    const {ctx,service} = this;
    const result = await service.user.getUserRoleResource();
    Response.success(ctx,'获取用户角色资源成功',result);
  }
  // 获取验证码 使用第三方模块安装 npm install svg-captcha -S
  async verificationCode() {
    const {ctx,service} = this;
    const captchaObj = svgCaptcha.create();// {text,data}
    ctx.session.captcha = captchaObj.text;// 将文本信息存放到会话session属性中
    ctx.set('Content-Type','image/svg+xml')
    ctx.body = captchaObj.data;
    //Response.success(ctx,'获取用户角色资源成功',captchaObj.data);
  }
  // 获取验证码 使用第三方模块安装 npm install svg-captcha -S
  async checkVerificationCode() {
    const {ctx,service} = this;
    const code = ctx.request.body.code;
    if(code === ctx.session.captcha) {
      Response.success(ctx,'验证码验证成功',null);
    }else{
      Response.success(ctx,'验证码验证失败',null);
    }
  }
  // 注册
  async signup() {
    const {ctx,service} = this;
    const body = ctx.request.body;
    const result = await service.user.signup(body);
    result.affectedRows>0?Response.success(ctx,'注册成功',{id:result.insertId}):Response.success(ctx,'注册失败',result);
  }
  // 登录
  async signin() {
    const {ctx,service} = this;
    const body = ctx.request.body;
    const result = await service.user.signin(body);
    if(result.length>0){
      delete result[0].password;//删除密码不返回给客户端
      Response.success(ctx,'登录成功',{token:JWT.sign(JSON.parse(JSON.stringify(result[0])),this.config.jwtSecret,{
        expiresIn:60*60*1 //设置1小时过期
      }),userInfo:result[0]});
    }else{
      Response.success(ctx,'登录失败，请重新登录',null);
    }
  }
}

module.exports = Controller;
