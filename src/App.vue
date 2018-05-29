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
@import "./styles/variables";
@import "~bulmaswatch/flatly/variables";

// @import '~bulmaswatch/darkly/variables';
//Font
$family-sans-serif: 'Roboto Mono', monospace, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
p {
  font-size: 12pt;
}

$button-background-color: #3e30ed;
$button-color: #fff;
$button-hover-color: #fff;

//Nav
$navbar-item-color:#000;
$navbar-item-hover-color: $link;
$navbar-item-active-color: $link;
$navbar-dropdown-background-color: $white-ter;
$navbar-dropdown-border-top: 1px solid $navbar-divider-background-color;
$navbar-dropdown-item-hover-background-color: transparent;
$navbar-dropdown-item-active-background-color: transparent;
$navbar-dropdown-item-active-color: $link;


//

$blue-purple: #3e30ed;
// Links
$link: $blue-purple;
$link-hover: darken($link, 10);
$link-focus: darken($link, 10);
$link-active: darken($link, 10);


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
// $link: $primary;
// $link-invert: $primary-invert;
// $link-focus-border: $primary;

// The container horizontal gap, which acts as the offset for breakpoints
$gap: 32px !default;
$tablet: 600px !default;
$desktop: 900px !default;
$widescreen: 1200px !default;
$fullhd: 1800px !default;

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
