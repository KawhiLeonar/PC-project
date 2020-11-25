import http from '@/utils/request.js'

export const reqUserLogin = (mobile, code) => {
  return http({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
