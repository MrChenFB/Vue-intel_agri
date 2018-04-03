<template>

  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
//import Login from './components/Login'
export default {
  name: 'App',
//  components:{
//    "login":Login
//  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin:0;
}
</style>
