/**
 * 服务调用的拦截器，用于服务头添加token，及相关的逻辑判断
 */
import SessionStorage from '../utils/sessionStorage.js'
import { Base64 } from 'js-base64'
import { uuid } from '../utils/utils.js'

let sessionStorage = new SessionStorage()

export function requestInterceptor (config, authorization, tokenUri) {
  let accessToken = sessionStorage.get('access_token')
  let refreshToken = sessionStorage.get('refresh_token')
  if (accessToken && refreshToken) {
    if (config.url.indexOf(tokenUri)) {
      config.headers.Authorization = 'Basic ' + Base64.encode(authorization.client_id + ':' + authorization.clientSecret)
    } else {
      config.headers.Authorization = 'Bearer ' + accessToken
    }
  } else {
    config.headers.Authorization = 'Basic ' + Base64.encode(authorization.client_id + ':' + authorization.clientSecret)
  }

  return config
}

export function handleResponseError (error, authorization) {
  if (error.response) {
    switch (error.response.status) {
      /**
      * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
      */
      case 401:
        let msg = {
          client_id: authorization.client_id,
          redirect_uri: encodeURIComponent(authorization.redirect_uri),
          state: uuid(6, 16)
        }
        window.location.href = authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
        break
    }
  }
}
