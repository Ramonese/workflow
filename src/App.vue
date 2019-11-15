<template>
  <div id="app">
    <div v-show="isIntroVisible">
      <section class="form__step">
        <p class="step__text">Start checkout process</p>
        <button class="btn" @click="start">Start</button>
      </section>
    </div>
    <template v-if="isVisible">
      <MultistepForm />
    </template>
  </div>
</template>

<script>
import MultistepForm from "./components/MultistepForm.vue";

export default {
  name: "app",
  components: {
    MultistepForm
  },
  data: function() {
    return {
      users: [],
      isVisible: false,
      isIntroVisible: true,
      loading: true,
      isError: false,
      errorText: "No user found with this phone number"
    };
  },
  methods: {
    start() {
      (this.isIntroVisible = false), (this.isVisible = true);
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
