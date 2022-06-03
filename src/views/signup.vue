<template>
<div class="container py-4 px-4">
  <div class="row" >
    <div> 
      <img src="../assets/logo1.png" class="pb-4 logo"/>
    </div>
    <div class="col-lg-5 m-auto bg-light-gray" >
      <div class="text-center mb-4">
        <h1 class="mt-4">註冊</h1>
      </div>
      <div v-if="errorMessage !== ''" class="alert alert-danger mx-4" role="alert">
        <span>{{ errorMessage }}</span>
      </div>
      <div v-if="successMessage !== ''" class="alert alert-success mx-4" role="alert">
        {{ successMessage }}&nbsp;&nbsp;<router-link to="/">登入</router-link>
      </div>
      <form id="signup-form" >
        <div class="row justify-content-center">
          <div class="col-sm-10 mb-4 form-group">
            <label class="fs-5 mb-1" for="account">帳號</label>
            <input type="text" id="account" v-model="user.account" class="form-control form-control-lg">
          </div>
          <div class="col-sm-10 mb-4 form-group">
            <label class="fs-5 mb-1" for="password">密碼</label>
            <input type="password" id="password" v-model="user.password" class="form-control form-control-lg">
          </div>
          <div class="col-sm-12 mb-4 form-group">
            <button :disabled="user.account == '' || user.password == ''" @click.prevent="signupRequest" class="btn btn-success btn-lg col-sm-4">註冊</button>
          </div>
          <div class="col-sm-12 form-group">
            <p>已經有帳號了嗎? <router-link to="/">登入</router-link></p>
          </div>
        </div>
      </form>
      <!-- <div v-for="(user,idx) in allUser" :key="idx">
        hello
        {{user.account}}
      </div> -->
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
      successMessage: '',
      allUser: [],
      db: 'https://volleague-default-rtdb.firebaseio.com/',
      SingleProfile: {
        authid: '',
        name: 'User',
        birthday: {
          year: 'yyyy',
          month: 'mm',
          day: 'dd',
        },
        position: ['OH'],
        teamList: [''],
        StatisticsList: [''],
      }
    }
  },
  created() {
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
    signupRequest() {
      this.errorMessage = '';
      this.successMessage = '';
      if(this.allUser.find(element => element.account == this.user.account)){
        this.errorMessage = '這個帳號已被使用!';
      }else{
        this.successMessage = '註冊成功!';
        // create auth
        this.$http.post(this.db + 'auth.json', this.user).then(function(data){
          this.SingleProfile.authid = data.body.name;
          this.$http.post(this.db + 'user.json',this.SingleProfile).then(function(data){
            console.log(data);
          });
          
        })
      }
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