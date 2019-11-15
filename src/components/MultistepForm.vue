<template>
  <section>
    <h1>Step 1</h1>
    <form>
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
      <div class="form__action">
        <button class="btn">Back</button>
        <button class="btn" :disabled="isDisabled" data-cy="btn-next">Next</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "MultistepForm",
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
