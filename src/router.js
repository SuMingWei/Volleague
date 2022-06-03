import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/home.vue';
import Login from './views/login.vue';
import Signup from './views/signup.vue';
import Profile from './views/profile.vue';
import SingleTeam from './views/singleTeam.vue';
import SingleRecord from './views/singleRecord.vue';
import Scoring from './views/scoring.vue';


Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
      path: '/',
      component: Login
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/home/:id',
      component: Home,
      children: [{
          path: '/home/:id/profile',
          alias: '/home/:id',
          component: Profile,
        },
        {
          path: 'team/:teamid',
          component: SingleTeam,
        },
        {
          path: 'team/:teamid/record/:contestid',
          component: SingleRecord,
        },
        {
          path: '/scoring',
          component: Scoring,
        }
      ]
    },
  ],
  mode: 'history',
});