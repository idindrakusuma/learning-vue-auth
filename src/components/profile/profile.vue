<template>
  <div id="profile">
    <h1>This is Your Profile!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>Hallo {{ email }}!</p>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
      data(){
        return {
          email: null
        }
      },
      created(){
        console.log(this.$store.getters.emailUser)
          this.email = this.$store.getters.emailUser
      }
  }
</script>

<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>
