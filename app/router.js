'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 在里做中间路由拦截 和文件middleware/authentication.js使用
  let authentication = app.middleware.authentication(app.config.authentication,app);//在里做路由拦截

  router.get('/', controller.home.index);
  router.resources('user','/api/user',controller.user);
  router.resources('role','/api/role',controller.role);
  router.resources('resource','/api/resource',controller.resource);
  router.resources('roleUser','/api/roleUser',controller.roleUser);
  router.resources('roleResource','/api/roleResource',controller.roleResource);
  // 使用模版引擎
  router.get('/page/news',controller.news.index);
  // 做分页和条件查询
  router.get('/api/pagination',controller.pagination.index);
  // 设置角色关系
  router.get('/api/role/getResource',controller.role.getResource);// 获取所有角色资源数据
  router.post('/api/role/setResource',controller.role.setResource);// 设置角色资源数据
  //添加 authentication 做token拦截
  router.get('/api/role/getUser',authentication,controller.role.getUser);// 获取所有用户角色
  router.post('/api/role/setUser',authentication,controller.role.setUser);// 设置所有用户角色

  router.get('/api/user/getUserRoleResource',controller.user.getUserRoleResource);// 获取用户角色和资源
  router.get('/api/user/verificationCode',controller.user.verificationCode);// 获取验证码 
  router.post('/api/user/checkVerificationCode',controller.user.checkVerificationCode);// 校验验证码是否正确

  // 登录和注册
  router.post('/api/user/signup',controller.user.signup);// 注册
  router.post('/api/user/signin',controller.user.signin);// 登录

};
