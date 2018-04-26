const LoadingOverlay = {
  install: Vue => {
    Vue.prototype.$x = {
      load (vm, eles) {
        let loadingElements = []
        Array.isArray(eles) ? null : eles = [eles] // eslint-disable-line
        for (let ele of eles) {
          loadingElements.push(
            vm.$loading.open({
              container: ele
            })
          )
        }
        return loadingElements.length > 1 ? loadingElements : loadingElements[0]
      }
    }
  }
}

export default LoadingOverlay
