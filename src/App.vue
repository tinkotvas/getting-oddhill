<template>
    <div id="ExampleApp">
        <section class="container-fluid">
            <div class="row">
                <div id="menubar" class="col-12 mx-auto">
                    <div class="col-12 border">
                    </div>
                </div>
            </div>
        </section>

        <section class="container-fluid">
            <div class="row">
                <div id="stages" class="col-12 col-sm-8">
                    <PromotedStage></PromotedStage>
                </div>

                <div id="puffs" class="col-4 d-none d-sm-block">
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import PromotedStage from './components/PromotedStage'

export default {
  name: 'ExampleApp',
  components: {
      PromotedStage
  }
}
</script>

<style>

</style>
