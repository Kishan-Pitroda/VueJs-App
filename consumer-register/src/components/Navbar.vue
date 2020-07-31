<template>
  <nav class="navbar navbar-expand-sm navbar-light sticky-top p-3 mb-5">
    <a class="navbar-brand" href="/">Eshop</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <router-link class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/consumers">Consumer List</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/consumers/new">New Consumer</router-link>
      </li>
    </ul>
    <div v-if="currentUser">
      <span class="text-dark mr-3" v-if="currentUser">logged in as {{ currentUser.email }}</span>
      <a class="btn btn-secondary" v-on:click="onLogout">Logout</a>
    </div>
    <div v-else>
      <router-link class="btn btn-secondary" to="/login">Login</router-link>
    </div>
  </div>
</nav>
</template>
<script>
import { getCurrentUser, logout } from "../services/authService";
export default {
  name: "Navbar",
  data() {
    return {
      currentUser: {}
    };
  },
  created: function() {
    this.currentUser = getCurrentUser();
  },
  methods: {
    async onLogout() {
      await logout();
      this.$toasted.show("logged out successfully !");
      window.location = "/";
    }
  }
};
</script>
<style scoped>
.navbar-light{
  color: white;
   background: #06beb6;  /* fallback for old browsers */
   background: -webkit-linear-gradient(to right, #48b1bf, #06beb6);  /* Chrome 10-25, Safari 5.1-6 */
   background: linear-gradient(to right, #48b1bf, #06beb6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.navbar-light .navbar-brand{
  font-weight: 600;
  font-size: 30px;
}
@media(min-width: 577px){
.navbar-light .navbar-nav .nav-link{
  color: black;
  font-weight: 400;
  padding-left:20px;
}
@media (max-width:576px) {
  .navbar-light .navbar-nav .nav-link{
    color: black;
    font-weight: 400;
}}
}
</style>