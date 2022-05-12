<template>
  <div id="app">
    <!-- <router-link class="nav-link" to="/" exact>Home</router-link> -->
    <router-view></router-view>
    <router-link class="nav-link" to="/home" exact>Home</router-link>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: justfont,Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothig: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
