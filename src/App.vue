<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <section class="form__step">
      <p class="step__text">Start checkout process</p>
      <button class="btn" @click="start">Start</button>
    </section>
    <form></form>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      users: [],
      loading: true,
      isError: false,
      errorText: "No user found with this phone number"
    };
  },
  methods: {
    start() {
      console.log("test");
      alert("test");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn {
  background: lightslategray;
  border-radius: 5px;
  padding: 1em;
  border: none;
  cursor: pointer;
}
.form__step {
  border: 1px solid magenta;
  padding: 3em;
  max-width: 300px;
  margin: 0 auto;
}
</style>
