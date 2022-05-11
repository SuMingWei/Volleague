import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/home.vue';
import Login from './views/login.vue';
import Signup from './views/signup.vue';
import Profile from './views/profile.vue';
import Team from './views/team.vue';
import SingleTeam from './views/singleTeam.vue';


Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path:'/',
      component:Login
    },
    {
      path:'/signup',
      component:Signup
    },
    {
      path:'/home',
      component:Home,
      children: [
        {
          path:'/profile',
          alias:'/home',
          component:Profile
        },
        {
          path:'/team',
          component:Team,
        },
        {
          path:'/singleteam',
          component:SingleTeam,
        }
      ]
    },
  ],
  mode: 'history',
});
