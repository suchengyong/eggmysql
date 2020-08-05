/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1596281234178_4548';

  // add your middleware config here
  config.middleware = [
    //'auth' // 白名单 需要登录才能访问的URL方式 和config.auth里面路由，和文件middleware/auth.js 配合做白名单路由拦截
  ];//中间价放到在里
  config.auth = {// 白名单，需要登录才能访问的URL
    authUrls:[
      '/api/pagination' 
    ]
  };
  config.authentication = { };//做中间路由拦截token
  // 框架的安全插件是默认开启的，如果我们想关闭其中一些安全防范，直接设置该项的 enable 属性为 false 即可
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 配置模版引擎 先安装 npm i egg-view-ejs -S
  config.view = {
    mapping:{
      '.html':'ejs'
    }
  }
  // add your user config here
  const userConfig = {
    mysql:{
      client:{
        host:'localhost',
        port:3306,
        user:'root',
        password:'123456',
        database:'egg_mysql'
      }
    },
    jwtSecret:'124775767767ryttyyuuy',//加密token 的密钥
    cors:{
      credentials:true //配置允许跨越请求
    }
  };
  return {
    ...config,
    ...userConfig,
  };
};
