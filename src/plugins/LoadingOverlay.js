const LoadingOverlay = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install: Vue => {
    // We call Vue.mixin() here to inject functionality into all components.
    Vue.prototype.$x = {
      load (vm, el) {
        return vm.$loading.open({
          container: el
        })
      }
    }
  }
}

export default LoadingOverlay
