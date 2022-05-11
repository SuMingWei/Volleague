<template>
  <div>
    <div class="navbar navbar-dark" style="background-color:#85929E">
      <a class="navbar-brand ms-4 fs-2 fw-bold" href="#">Volleague</a>
      <ul class="nav fs-6 fw-bold">
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/profile">
            <i class="fa-solid fa-user"/> 
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/team">
            <i class="fa-solid fa-people-group "/> 
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/">
            <i class="fa-solid fa-right-from-bracket"/> 
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import Profile from './profile.vue'
export default {
  components: {
    // 'profile': Profile,
  },
}
</script>

<style scoped>

</style>