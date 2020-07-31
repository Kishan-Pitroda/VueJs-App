<template>
  <div class="container">
    <div class="card">
      <h3 class="card-header">Consumer Detail</h3>
      <div class="card-body">
        <h5 class>Id : {{ consumer.id }}</h5>
        <h5>Name : {{ consumer.name }}</h5>
        <h5>Email : {{ consumer.email }}</h5>
        <router-link class="btn btn-dark" to="/consumers">Back</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { getConsumer } from "../services/consumerService";
export default {
  name: "ConsumerDetail",
  data() {
    return {
      consumer: {}
    };
  },
  created: function() {
    const id = this.$route.params.id;
    console.log("detail");
    if (id) this.bindConsumer(id);
  },
  methods: {
    async bindConsumer(id) {
      const response = await getConsumer(id);
      if (!response.data) this.$toasted.error("couldnt find !");
      this.consumer = response.data;
    }
  }
};
</script>
