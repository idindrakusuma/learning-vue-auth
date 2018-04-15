<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <div class="container">
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="3"> Loading user data from firebase... </td>
        </tr>
        <tr v-else v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <th>{{ user.age }}</th>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    created () {
      this.$store.dispatch('fetchUsers')
    },
    computed:{
      users(){
        return this.$store.getters.users
      },
      loading(){
        return this.$store.getters.loading
      }
    },
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  .container{
    padding: 1.5rem;
  }

  table {
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    border-collapse: collapse;
    box-sizing: border-box;
  }

  table, tr, td, th{
    border: 1px solid #dee2e6;
    padding: 0.75rem;
  }

  p {
    color: red;
  }
</style>
