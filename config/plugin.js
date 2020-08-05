'use strict';
// 配置数据库插件 先安装 npm i egg-mysql -S
exports.mysql = {
  package:'egg-mysql',
  enable:true
};
// 配置模版引擎插件 先安装 npm i egg-view-ejs -S
exports.ejs = {
  enable:true,
  package:'egg-view-ejs'
}
//会在app上挂载mysql   例如：app.mysql.select() 查询语句