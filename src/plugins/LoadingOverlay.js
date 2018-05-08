const LoadingOverlay = {
  install: (Vue) => {
    let plugin = {
      load (vm, eles) {
        let loadingElements = []
        let temp = Array.isArray(eles) ? eles : [eles] // eslint-disable-line
        for (let ele of temp) {
          loadingElements.push(
            vm.$loading.open({
              container: ele
            })
          )
        }
        return Array.isArray(eles) ? loadingElements : loadingElements[0]
      }
    }
    if (!Vue.prototype.$plugins) {
      Vue.prototype.$plugins = plugin
    } else {
      Object.assign(Vue.prototype.$plugins, plugin)
    }
  }
}

export default LoadingOverlay
