const LoadingOverlay = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install: Vue => {
    // We call Vue.mixin() here to inject functionality into all components.
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
