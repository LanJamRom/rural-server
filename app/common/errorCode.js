'use strict'

module.exports = {
  400: {
    ret: -1,
    msg: '请求无效，数据格式有误'
  },
  401: {
    ret: 2,
    msg: '请求没有权限，token超时或无效'
  },
  403: {
    ret: 3,
    msg: '禁止访问'
  },
  404: {
    ret: -1,
    msg: '未找到请求的记录'
  },
  406: {
    ret: -1,
    msg: '请求失败，请求头不一致'
  },
  410: {
    ret: -1,
    msg: '资源已被删除'
  },
  422: {
    ret: -1,
    msg: '请求失败，请验证参数'
  },
  500: {
    ret: -2,
    msg: '服务器发生错误'
  },
  502: {
    ret: -2,
    msg: '网关错误'
  },
  503: {
    ret: -2,
    msg: '服务不可用，服务器暂时过载需要维护'
  },
  504: {
    ret: -2,
    msg: '网关超时'
  },
  533: {
    ret: 2,
    msg: '验证码过期或无效'
  }
}
