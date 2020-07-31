<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
<style>
html{
height: 100vh;
}

body{
  background: #acb6e5;
  background: -webkit-linear-gradient(to right, #86fde8, #acb6e5);
  background: linear-gradient(to right, #86fde8, #acb6e5);
}
</style>