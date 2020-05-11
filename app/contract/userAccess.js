'use strict'
module.exports = {
  codeRequest: {
    phone: {
      type: 'string',
      required: true,
      description: '⼿机号',
      example: '13226047873',
      format: /^1[34578]\d{9}$/
    }
  },
  loginRequest: {
    phone: {
      type: 'string',
      required: true,
      description: '⼿机号',
      example: '13226047873',
      format: /^1[34578]\d{9}$/
    },
    code: {
      type: 'string',
      required: true,
      description: '验证码',
      example: '746495',
      format: /^\d{6}$/
    }
  }
}
