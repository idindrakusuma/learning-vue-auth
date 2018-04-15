import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import WelcomePage from './components/welcome/welcome.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'
import Profile from './components/profile/profile.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  {
    path: '/signin',
    component: SigninPage,
    beforeEnter(to, from, next){
      if(localStorage.getItem('token')){
        console.log('you are authenticated')
        next('/dashboard');
      }
      next()
    }
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter: checkAuth
  },
  {
    path: '/profile',
    component: Profile,
    beforeEnter: checkAuth
  }
]

function checkAuth(to, from, next){
  if (localStorage.getItem('token')) {
    next();
  }
  else {
    alert("You don't have an access, please signin first!")
    next('/signin')
  }
}

export default new VueRouter({mode: 'history', routes})
