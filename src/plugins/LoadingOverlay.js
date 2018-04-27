const LoadingOverlay = {
  install: Vue => {
    Vue.prototype.$plugins = {
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
  }
}

export default LoadingOverlay
