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
$family-monospace: 'Averta W01 Regular';
p {
  font-size: 14pt;
  line-height: 24px;
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


//breakpoints
$gap: 32px;
$tablet: 600px;
$desktop: 900px;
$widescreen: 1200px;
$fullhd: 1800px;

$navbar-break: 599px;

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




/* --- End custom variables --- */

/* --- Begin Bulma imports --- */
// @import '~bulma'; // Do not import the entire package if we want to customize, instead:

@import "~bulma/sass/base/_all";
@import "~bulma/sass/elements/_all";

// @import "~bulma/sass/components/_all";
@import "~bulma/sass/components/breadcrumb.sass";
@import "~bulma/sass/components/card.sass";
@import "~bulma/sass/components/dropdown.sass";
@import "~bulma/sass/components/level.sass";
@import "~bulma/sass/components/media.sass";
@import "~bulma/sass/components/menu.sass";
@import "~bulma/sass/components/message.sass";
@import "~bulma/sass/components/modal.sass";
$desktop-old: $desktop;
$desktop: $navbar-break;
@import "~bulma/sass/components/navbar.sass";
$desktop: $desktop-old;
@import "~bulma/sass/components/pagination.sass";
@import "~bulma/sass/components/panel.sass";
@import "~bulma/sass/components/tabs.sass";

@import "~bulma/sass/grid/_all";
@import "~bulma/sass/layout/_all";

/* --- End Bulma imports --- */

@import '~buefy/src/scss/buefy';

@mixin touch{
  @media screen and (max-width: $navbar-break - 1px){
    @content
    }
  }
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
