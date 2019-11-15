<template>
  <section class="form__content" id="step-1">
    <div class="form__field" v-for="(field, index) in fields" :key="index">
      <label :for="field">{{field}}</label>
      <input type="text" :id="field" />
    </div>

    <!-- <div class="form__field">
      <label for="name">Name</label>
      <input type="text" id="name" />
    </div>
    <div class="form__field">
      <label>Last name</label>
      <input type="text" />
    </div>-->
  </section>
</template>

<script>
export default {
  name: "FormStep",
  props: ["fields"],
  data: function() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
