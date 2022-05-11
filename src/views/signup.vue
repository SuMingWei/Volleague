<template>
<div class="container py-4 px-4">
  <div class="row" >
    <div> 
      <img src="../assets/logo1.png" class="pb-4 logo"/>
    </div>
    <div class="col-lg-5 m-auto bg-light-gray" >
      <div class="text-center mb-4">
        <h1 class="mt-4">Sign Up</h1>
      </div>

      <form id="login-form">
        <div class="row justify-content-center">
          <div class="col-sm-10 mb-4 form-group">
            <label class="fs-5 mb-1" for="name">Username</label>
            <input type="text" id="name" class="form-control form-control-lg">
          </div>
          <div class="col-sm-10 mb-4 form-group">
            <label class="fs-5 mb-1" for="password">Password</label>
            <input type="text" id="password" class="form-control form-control-lg">
          </div>
          <div class="col-sm-12 mb-4 form-group">
            <button class="btn btn-success btn-lg col-sm-4">Sign up</button>
          </div>
          <div class="col-sm-12 form-group">
            <p>Already have an account? <router-link to="/">Login</router-link></p>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default{

}
</script>

<style scoped>
.bg-light-gray {
  background-color:#EBEDEF;
  border-radius: 25px;
}
.logo {
  height: auto;
  width: 300px;
}
</style>