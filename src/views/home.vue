<template>
  <div>
    <div class="navbar navbar-dark" style="background-color:#85929E">
      <a class="navbar-brand ms-4 fs-2 fw-bold" href="#">Volleague</a>
      <ul class="nav fs-6 fw-bold">
        <li class="nav-item">
          <!-- <router-link class="nav-link text-white" :to="{name: 'profile', params: {id: this.id}}" > -->
          <router-link class="nav-link text-white" :to="`/home/${id}/profile`" >
            <i class="fa-solid fa-user"/> 
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-white" to="/">
            <i class="fa-solid fa-right-from-bracket"/> 
          </router-link>
        </li>
      </ul>
    </div>
    <router-view :uid="id" ></router-view>
  </div>
</template>

<script>
// import Profile from './profile.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
    }
  },
}
</script>

<style scoped>

</style>