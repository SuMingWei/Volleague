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
      <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
          {{ errorMessage }}
      </div>
      <form id="signup-form" >
        <div class="row justify-content-center">
          <div class="col-sm-10 mb-4 form-group">
            <label class="fs-5 mb-1" for="name">Username</label>
            <input type="text" id="name" v-model="user.name" class="form-control form-control-lg">
          </div>
          <div class="col-sm-10 mb-4 form-group">
            <label class="fs-5 mb-1" for="password">Password</label>
            <input type="text" id="password" v-model="user.password" class="form-control form-control-lg">
          </div>
          <div class="col-sm-12 mb-4 form-group">
            <button @click.prevent="signupRequest" class="btn btn-success btn-lg col-sm-4">Sign up</button>
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
// import { auth } from '../db'
export default{
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      errorMessage: '',
      allUser: [],
      db: 'https://volleague-default-rtdb.firebaseio.com/auth.json',
    }
  },
  created() {
    // get all user
    this.$http.get(this.db).then(function(data){
      return data.json();
    }).then(function(data){
      var userArr = [];
      for(let key in data){
        data[key].id = key;
        userArr.push(data[key]);
      }
      this.allUser = userArr;
      // console.log(this.allUser);
    })
  },
  methods: {
    signupRequest() {
      this.errorMessage = '';
      
      // this.$http.post(this.db, this.user).then(function(data){
      //   console.log(data);
      //   // this.submitted = true;
      // })
    }
  },
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