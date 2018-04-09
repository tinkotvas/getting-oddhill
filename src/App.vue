<template>
    <div id="MainApp">
        <section class="container-fluid">
            <div class="row">
                <div id="menubar" class="col-12 mx-auto">
                    <div class="col-12 border">
                        <ExampleMenu></ExampleMenu>
                    </div>
                </div>
            </div>
        </section>

        <section class="container-fluid">
            <div class="row">
                <div id="stages" class="col-12 col-sm-8">
                    <ExampleStage></ExampleStage>
                </div>

                <div id="puffs" class="col-4 d-none d-sm-block">
                    <ExamplePuff></ExamplePuff>
                    <ExamplePuff2></ExamplePuff2>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ExampleMenu from './components/ExampleMenu'
import ExampleStage from './components/ExampleStage'
import ExamplePuff from './components/ExamplePuff'
import ExamplePuff2 from './components/ExamplePuff2.vue'

export default {
  name: 'App',
  components: {
    ExampleMenu,
    ExampleStage,
    ExamplePuff,
    ExamplePuff2
  }
}
</script>

<style>

</style>
