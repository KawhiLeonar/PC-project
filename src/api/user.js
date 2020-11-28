import http from '@/utils/request.js'

// 获取用户的身份信息
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

export const reqUserProfile = () => {
  return http({
    method: 'get',
    url: '/mp/v1_0/user/profile'
  })
}
