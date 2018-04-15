import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    users: [],
    loading: false,
    profile:{
      email: null
    }
  },


  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
      state.profile.email = userData.email
    },
    storeUsers (state, users) {
      state.users = users
    },
    clearAuthUser(state){
      state.idToken = null
      state.userId = null
    }
  },


  actions: {
    setLogoutTimer({ commit, dispatch }, expirationTime){
      setTimeout(() => {
        dispatch('logout')
      }, expirationTime * 1000)
    },
    signup ({commit, dispatch}, authData) {
      axios.post('/signupNewUser?key=AIzaSyBtnInx2D4hFjvClLxTY2aao_KRWdocbf4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          // this function to access the Actions function
          dispatch('storeUser', authData)
        })
        .catch(error => console.log(error))
    },
    login ({commit, dispatch}, authData) {
      axios.post('/verifyPassword?key=AIzaSyBtnInx2D4hFjvClLxTY2aao_KRWdocbf4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId,
            email: authData.email
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/dashboard')
        })
        .catch(error => {
          console.log(error)
          alert(error.message + ". please check your email & password!")
        })
    },
    // try to auto login using localStorage
    tryAutoLogin({ commit }){
      const token = localStorage.getItem('token')
      // have an token in localStorage?
      if (!token){
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      // have an valid token?
      if (now >= expirationDate){
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    // loogut
    logout({ commit }){
      commit('clearAuthUser')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      alert("bye!")
      router.replace('signin')
    },
    // store data to database
    storeUser ({commit, state}, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => {
          console.log(res)
          alert("register success! now you can signin")
          router.replace('/signin')
        })
        .catch(error => console.log(error))
    },
    fetchUsers ({commit, state}) {
      if (!state.idToken) {
        return
      }
      state.loading = true
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          const data = res.data
          console.log(data)
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          commit('storeUsers', users)
          state.loading = false
        })
        .catch(error => console.log(error))
    }
  },


  getters: {
    emailUser (state){
      return state.profile.email
    },
    users (state) {
      return state.users
    },
    isAunthenticated (state) {
      return state.idToken !== null
    },
    loading (state){
      return state.loading
    }
  }
})
