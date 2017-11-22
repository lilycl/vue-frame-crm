import Frame from './frame'
import * as route from './route'
import * as http from './http'

const TFrame = function (Vue, opts = {}) {
  Vue.component(Frame.name, Frame)
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  TFrame(window.Vue)
}

export {
  TFrame,
  route,
  http
}
