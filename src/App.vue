<template>
  <div id="app">
    <navbar/>
    <!-- the router outlet, where all matched components would ber viewed -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: { Navbar }
}
</script>

<!-- Universal styles -->
<style lang="scss">
// Import theme variables first and overrides last, do not change the order
// Change to Darkly for dark theme and Flatly for light theme
@import "~bulmaswatch/flatly/variables";
// @import '~bulmaswatch/darkly/variables';
@import '~bulma/sass/utilities/_all';

/* --- Begin custom variables --- (https://buefy.github.io/#/documentation/customization) */

// Set your colors
// $primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  'white': ($white, $black),
  'black': ($black, $white),
  'light': ($light, $light-invert),
  'dark': ($dark, $dark-invert),
  'primary': ($primary, $primary-invert),
  'info': ($info, $info-invert),
  'success': ($success, $success-invert),
  'warning': ($warning, $warning-invert),
  'danger': ($danger, $danger-invert),
  'twitter': ($twitter, $twitter-invert)
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

$tablet: 768px;

/* --- End custom variables --- */

@import '~bulma';
@import '~buefy/src/scss/buefy';
@import "~bulmaswatch/flatly/overrides";
// @import '~bulmaswatch/darkly/overrides';

.load-overlay{
  position: relative;
  min-height:100px;
}
.no-overflow {
  overflow: initial;
}
</style>
