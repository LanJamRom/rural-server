'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc-feat'
  },

  validate: {
    enable: true,
    package: 'egg-validate'
  },

  jwt: {
    enable: true,
    package: 'egg-jwt'
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  redis: {
    enable: true,
    package: 'egg-redis'
  },

  sessionRedis: {
    enable: true,
    package: 'egg-session-redis'
  },

  cors: {
    enable: true,
    package: 'egg-cors'
  }
}
