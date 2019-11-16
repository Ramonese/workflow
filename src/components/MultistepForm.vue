<template>
  <section>
    <h1>Step 1</h1>
    <form @submit.prevent>
      <section class="form__content" id="step-1" :firstComplete="firstComplete">
        <FormStep :fields="firstStepFields" @onChange="test" />
      </section>
      <section class="form__content" id="step-2" :secondComplete="secondComplete">
        <FormStep :fields="secondStepFields" @onChange="test" />
      </section>

      <div class="form__action">
        <button class="btn" data-cy="btn-back" @click="previousStep">Back</button>
        <button class="btn" @click="nextStep" :disabled="isDisabled" data-cy="btn-next">Next</button>
      </div>
    </form>
  </section>
</template>

<script>
import FormStep from "./FormStep.vue";
export default {
  name: "MultistepForm",
  components: {
    FormStep
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      currentStep: 1,
      allSteps: 2,
      isDisabled: false,
      firstComplete: false,
      secondComplete: false,
      firstStepFields: [
        { label: "First name", id: "firstName", type: "text", required: true },
        { label: "Last name", id: "lastName", type: "text", required: true },
        {
          label: "Github username",
          id: "username",
          type: "text",
          required: true
        }
      ],
      secondStepFields: [
        {
          label: "Agree with terms and services",
          id: "consent",
          type: "checkbox",
          required: true
        },
        { label: "Email", id: "email", type: "email", required: true }
      ]
    };
  },
  methods: {
    previousStep() {},
    nextStep() {
      this.currentStep = this.currentStep + 1;
      //alert(this.currentStep);
    },
    test(input) {
      this.firstComplete = true;
      console.log(input);
    }
  }
};
</script>

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
.form__content {
  border: 1px solid magenta;
  padding: 3em;
  margin: 2em;
}
</style>
