/**
 * 进入路由之前判断是否有token存在
 */
import SessionStorage from '../utils/sessionStorage.js'
import { getQuery, uuid } from '../utils/utils.js'

export function beforeEach (to, from, next, authorization, cb) {
  let sessionStorage = new SessionStorage()
  let accessToken = sessionStorage.get('access_token')
  let refreshToken = sessionStorage.get('refresh_token')
  // 路由拦截 根据路由配置中meta.requireAuth判断是否需要登录
  if (to.meta.requireAuth) {
    if (accessToken && refreshToken) {
      next()
    } else {
      let code = getQuery('code')
      let state = getQuery('state')
      if (code && state) {
        /**
         *  这里需要去请求token的值
         */
        cb(code, state, next)
      } else {
        let msg = {
          client_id: authorization.client_id,
          redirect_uri: encodeURIComponent(authorization.redirect_uri),
          state: uuid(6, 16)
        }
        window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
        next()
      }
    }
  } else {
    next()
  }
}
