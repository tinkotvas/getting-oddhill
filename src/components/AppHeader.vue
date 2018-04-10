<template>
    <div class="d-flex flex-row">
        <a class="navbar-brand">Getting Oddhill</a>
        <a class="ml-4 mt-2" href="#">Home</a>
        <a class="ml-4 mt-2" href="#">Posts</a>
        <a class="ml-4 mt-2 pr-4 mr-auto" href="#">Profiles</a>
        <input class="form-control m-1 mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary m-1 mr-auto" type="submit">Search</button>
        <a class="ml-4 mt-2" href="#">Login</a>
    </div>
</template>

<script>
export default {
    name:"AppHeader"
}
</script>

<style>
input{
    min-width: 100px;
    max-width: 250px;
}

</style>