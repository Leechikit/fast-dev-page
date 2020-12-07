import { Message } from 'element-ui'
export default function globalErrorHandler(Vue) {
  const TOASTERROR = 'ToastError'
  window.ToastError = class ToastError extends Error {
    constructor(...args) {
      super(...args)
      this.name = TOASTERROR
      this.message = args[0] || ''
    }
  }
  Vue.config.errorHandler = function(err) {
    if (err.name === TOASTERROR && err.message) {
      Message.error(err.message)
    }
    console.error(err)
  }
}
