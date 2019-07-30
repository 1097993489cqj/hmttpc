// 将token进行本地存储
const TOKEN_KEN = 'token'
// 设置token
export const setUser = data => {
  window.localStorage.setItem(TOKEN_KEN, JSON.stringify(data))
}

// 获取token
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(TOKEN_KEN))
}

// 移除token
export const removeUser = () => {
  return window.localStorage.removeItem(TOKEN_KEN)
}
