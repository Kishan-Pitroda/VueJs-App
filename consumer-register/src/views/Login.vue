<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Login</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="onLogin">
          <div class="form-group">
            <label>Email</label>
            <input v-model="consumer.email" type="email" class="form-control" placeholder="Enter Email" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="consumer.password" type="password" class="form-control" placeholder="Enter Password" required />
          </div>
          <div class="form-group pt-3">
            <input type="submit" class="btn btn-success" value="Login" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../services/authService";
export default {
  name: "Login",
  data() {
    return {
      consumer: {}
    };
  },
  methods: {
    async onLogin() {
      try {
        await login(this.consumer.email, this.consumer.password);
        this.$toasted.show("successfully logged in !");
        window.location = "/";
      } catch (error) {
        console.log("error");
        this.$toasted.error("invalid credentials !");
      }
    }
  }
};
</script>
