/* eslint valid-jsdoc: "off" */

'use strict'
const errorCode = require('../app/common/errorCode')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1585915284442_8122'

  // add your middleware config here
  config.middleware = ['errorHandler', 'tokenHandler']
  config.onerror = {
    all(err, ctx) {
      // 从 error 对象上读出各个属性，设置到响应中
      const status = err.status || 500
      let errorMsg = ''
      if (status === 422) {
        errorMsg = err.errors && err.errors[0] && `${err.errors[0].field} ${err.errors[0].message}`
      }
      // ⽣产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      if (status === 500 && app.config.env === 'prod') {
        errorMsg = 'Internal Server Error'
      }
      ctx.helper.success({ ctx, ret: errorCode[status].ret, msg: errorMsg || errorCode[status].msg })
    }
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'rural-client接⼝',
      description: '农村电商接⼝ swagger-ui for egg',
      version: '1.0.0'
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true,
    enable: true
  }

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'rural-shop',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    timezone: '+08:00', // 保存为本地时区
    define: {
      underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      freezeTableName: true, // Model 对应的表名将与model名相同。
      timestamps: false // 默认情况下，Sequelize会将createdAt和updatedAt的属性添加到模型中，以便您可以知道数据库条目何时进入数据库以及何时被更新（ 确实是太方便了，然而我们一般用不到 ....）。
    },
    // egg-sequelize在读取时间时，还是会返回UTC格式
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      }
    }
  }
  config.jwt = {
    secret: 'in2f54qw',
    enable: true, // default is false
    match: /^\/rural\/v2/ // optional
  }

  config.redis = {
    client: {
      host: 'localhost',
      port: 6379,
      password: '',
      db: '0'
    }
  }
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8081']
  }

  config.cors = {
    origin: '*', // 匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  return {
    ...config,
    ...userConfig
  }
}
