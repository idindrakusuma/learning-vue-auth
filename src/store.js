import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
  },
  mutations: {

  },
  actions: {
    singup({ commit }, authData){
      axios.post('/signupNewUser?key=AIzaSyBtnInx2D4hFjvClLxTY2aao_KRWdocbf4', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
        .then(res => console.log(res))
        .catch(error => console.log(error))
    },
    signin({ commit }, authData){
        axios.post('/verifyPassword?key=AIzaSyBtnInx2D4hFjvClLxTY2aao_KRWdocbf4', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
          .then(res => console.log(res))
          .catch(error => console.log(error))
      }
  },
  getters: {

  }
})
