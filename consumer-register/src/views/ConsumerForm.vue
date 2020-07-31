<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>{{ titleName }} Consumer</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="onSaveConsumer">
          <div class="form-group">
            <label>Name</label>
            <input v-model="consumer.name" type="text" class="form-control" placeholder="Enter Name" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="consumer.email" type="email" class="form-control" placeholder="Enter Email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="consumer.password" type="password" class="form-control" placeholder="Enter Password" required />
          </div>
          <div class="form-group pt-3">
            <button type="submit" class="btn btn-primary">{{btnName}}</button>
            <router-link class="btn btn-dark ml-3" to="/consumers">Back</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { getConsumer, saveConsumer } from "../services/consumerService";
export default {
  name: "ConsumerForm",
  data() {
    return {
      consumer: {},
      titleName: "New",
      btnName: "Add"
    };
  },
  created: function() {
    const id = this.$route.params.id;
    if (id) this.bindConsumer(id);
  },
  methods: {
    async bindConsumer(id) {
      this.titleName = "Edit";
      this.btnName = "Update";
      const response = await getConsumer(id);
      if (!response.data) this.$toasted.error("couldnt find !");
      this.consumer = response.data;
    },
    async onSaveConsumer() {
      try {
        await saveConsumer(this.consumer);
        this.$toasted.info("successfully done !");
        window.location = "/consumers";
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
