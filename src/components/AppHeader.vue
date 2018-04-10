<template>
    <div class="d-flex flex-row">
        <div id="fullmenu" class="d-flex flex-row">
            <a class="navbar-brand">Getting Oddhill</a>
            <a class="ml-4 mt-2" href="#">Home</a>
            <a class="ml-4 mt-2" href="#">Posts</a>
            <a class="ml-4 mt-2 pr-4 mr-auto" href="#">Profiles</a>
            <input class="form-control m-1 mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-primary m-1" type="submit">Search</button>
            <a class="ml-4 mt-2" href="#">Login</a>
        </div>
        <div class="dropdown">
            <div class="dropdown_header" @click="toggleDropdown($event)">
                <p class="ml-4 mt-2" href="#">Header</p>
                <i class="fa fa-angle-down" aria-hidden="true"></i>
                <i class="fa fa-angle-up" aria-hidden="true"></i>
            </div>

            <div class="dropdown_content">
                <ul>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum dolor sit</li>
                    <li>Lorem ipsum dolor</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    toggleDropdown(event) {
      event.currentTarget.classList.toggle("is-active");
    }
  }
};
</script>


<style lang="scss">
input {
  min-width: 100px;
  max-width: 250px;
}

@media only screen and (max-width: 668px) {
  input,
  button {
    display: none !important;
  }
}

@media only screen and (max-width: 540px) {
  input,
  button {
    display: none !important;
  }
}

.dropdown {
  &_header {
    cursor: pointer;
    position: relative;
    &.is-active {
      + .dropdown_content {
        height: auto;
        opacity: 1;
        visibility: visible;
      }
    }
  }
  &_content {
    height: 0;
    overflow: hidden;
    visibility: hidden;
    position: absolute;
  }
}


</style>