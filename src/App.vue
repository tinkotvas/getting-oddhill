<template>
  <div id="app">
    <navbar/>
    <!-- the router outlet, where all matched components would ber viewed -->
    <router-view class="has-navbar-fixed-top"/>
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
// Fonts
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,400i,700,700i');
// Import theme variables first and overrides last, do not change the order
// Change to Darkly for dark theme and Flatly for light theme
@import "~bulmaswatch/flatly/variables";
// @import '~bulmaswatch/darkly/variables';
//Font
$family-sans-serif: 'Roboto Mono', monospace, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
p {
  font-size: 12pt;
}

$button-background-color: #3e30ed;
$button-color: #fff;
$button-hover-color: none;

// $tablet: 768px;
// The container horizontal gap, which acts as the offset for breakpoints
$gap: 32px;
// 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
$tablet: 600px;
// 960px container + 4rem
$desktop: 900px;
// 1152px container + 4rem
$widescreen: 1200px;
// 1344px container + 4rem
$fullhd: 1800px;

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

.has-navbar-fixed-top {
  padding: 6rem 1.5rem;
}
</style>
