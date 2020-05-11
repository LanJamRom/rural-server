'use strict'
const dayjs = require('dayjs')
const Base64 = require('js-base64').Base64
const md5 = require('blueimp-md5')
// dayjs.locale('zh-cn')
const formatTime = (time, type = 'YYYY.MM.DD HH:mm:ss') => dayjs(time).format(type)

const toInt = str => {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}

const randomCode = length => {
  const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let result = ''
  for (let i = 0; i < length; i++) {
    const index = Math.ceil(Math.random() * 9)
    result += chars[index]
  }
  return result
}

const sendCode = async (ctx, phone, code) => {
  const ACCOUNT_SID = '8aaf07086c282571016c47ef77e513fb'
  const AUTH_TOKEN = '48f90fbdc6f345fc90f8200243653fd9'
  const Rest_URL = 'https://app.cloopen.com:8883'
  const AppID = '8aaf07086c282571016c47ef78fa1402'

  let sigParameter = ''
  const time = formatTime(Date.now(), 'YYYYMMDDHHmmss')
  sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time)
  const url = Rest_URL + '/2013-12-26/Accounts/' + ACCOUNT_SID + '/SMS/TemplateSMS?sig=' + sigParameter

  // 2. 准备请求体
  const body = {
    to: phone,
    appId: AppID,
    templateId: '1',
    datas: [code, '1']
  }
  let authorization = ACCOUNT_SID + ':' + time
  authorization = Base64.encode(authorization)
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Length': JSON.stringify(body).length + '',
    'Authorization': authorization
  }
  const { data } = await ctx.curl(url, {
    method: 'POST',
    dataType: 'json',
    headers,
    data: body
  })
  return data.statusCode === '000000'
}

const success = ({ ctx, res = [], msg = '请求成功', ret = 0 }) => {
  const {
    method,
    request: { query = {}, body = {} },
    params = {}
  } = ctx
  const head = {
    ret,
    msg,
    method
  }
  if (Object.keys(body).length) {
    head.body = body
  }
  if (Object.keys(query).length) {
    head.query = query
  }
  if (Object.keys(params).length) {
    head.params = params
  }
  ctx.set({
    'Content-Type': 'application/json'
  })
  ctx.body = JSON.stringify({
    head,
    data: res
  })
  ctx.status = 200
}

module.exports = {
  formatTime,
  success,
  toInt,
  randomCode,
  sendCode
}
