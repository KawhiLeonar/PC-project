import http from '@/utils/request.js'

export const reqGetArticles = (queryObj) => {
  return http({
    method: 'get',
    url: '/mp/v1_0/articles',
    params: queryObj || {}
  })
}
