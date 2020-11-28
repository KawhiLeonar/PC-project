const KEY = 'hm-tt-pc-userinfo'

// 保存用户信息到localStorage
export const setUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

// 从本地取出用户信息
export const getUser = () => {
  return JSON.parse(localStorage.getItem(KEY)) || {}
}
// 从本地删除用户信息
export const delUser = () => {
  localStorage.removeItem(KEY)
}
