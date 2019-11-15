<template>
  <section class="form__content" id="step-1">
    <div class="form__field">
      <label for="name">Name</label>
      <input type="text" id="name" />
    </div>
    <div class="form__field">
      <label>Last name</label>
      <input type="text" />
    </div>
  </section>
</template>

<script>
export default {
  name: "FormStep",
  props: {
    msg: String
  },
  data: function() {
    return {
      isDisabled: true
      // users: [],
      // loading: true,
      // isError: false,
      // errorText: "No user found with this phone number"
    };
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
