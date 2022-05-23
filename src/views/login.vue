<template>
<div class="container py-4 px-4">
  <div class="row">
    <div> 
      <img src="../assets/logo1.png" class="pb-4 logo"/>
    </div>
    <div class="col-lg-5 m-auto bg-light-gray">
      <div class="text-center mb-4">
        <h1 class="mt-4">Log In</h1>
      </div>
      <div v-if="errorMessage !== ''" class="alert alert-danger mx-4" role="alert">
        <span>{{ errorMessage }}</span>
      </div>
      <form id="login-form">
        <div class="row justify-content-center">
          <div class="col-sm-10 mb-4 form-group">
            <label class="fs-5 mb-1" for="account">Account</label>
            <input type="text" id="account" v-model="user.account" class="form-control form-control-lg">
          </div>
          <div class="col-sm-10 mb-4 form-group">
            <label class="fs-5 mb-1" for="password">Password</label>
            <input type="password" id="password" v-model="user.password" class="form-control form-control-lg">
          </div>
          <div class="col-sm-12 mb-4 form-group">
            <button :disabled="user.account == '' || user.password == ''" @click.prevent="loginRequest" class="btn btn-primary btn-lg col-sm-4">Log In</button>
          </div>
          <div class="col-sm-12 form-group">
          <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
        </div>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
export default{
  data() {
    return {
      user: {
        account: '',
        password: '',
      },
      errorMessage: '',
      allUser: [],
      db: 'https://volleague-default-rtdb.firebaseio.com/',
    }
  },
  created(){
    // get all user
    this.$http.get(this.db + 'auth.json').then(function(data){
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
    loginRequest(){
      this.errorMessage = '';
      this.allUser.find((value) => {
        if(value.account == this.user.account && value.password == this.user.password){
          // value.id is for auth
          // now get user.id 
          this.errorMessage = '';
          var authID = value.id;
          this.$http.get(this.db + 'user.json').then(function(data){
            return data.json();
          }).then(function(data){
            for(let userID in data){
              if(data[userID].authid == authID){
                this.$router.push('/home/' + userID);
              }
            }
          })
        }else if(value.account == this.user.account && value.password != this.user.password){
          this.errorMessage = 'Wrong Password !';
        }else{
          this.errorMessage = 'No Such User !';
        }
      });
      
      // if(this.allUser.find(element => element.account == this.user.account && element.password == this.user.password)){
      //   console.log(element);
      //   // this.$router.push('/home/' + );
      // }else if(this.allUser.find(element => element.account == this.user.account && element.password != this.user.password)){
      //   this.errorMessage = 'Wrong Password !';
      // }else{
      //   this.errorMessage = 'No Such User !';
      // }
    },
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