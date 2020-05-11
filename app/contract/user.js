'use strict'
module.exports = {
  createUserRequest: {
    phone: {
      type: 'string',
      required: true,
      description: '⼿机号',
      example: '13226047873',
      format: /^1[34578]\d{9}$/
    },
    password: { type: 'string', required: true, description: '密码', example: '111111' },
    realName: { type: 'string', required: true, description: '姓名', example: 'Tom' }
  }
}
