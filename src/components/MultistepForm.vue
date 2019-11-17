<template>
  <section>
    <h1>Step {{ currentStep }} from {{ allSteps }}</h1>
    <form @submit.prevent="onSubmit">
      <section class="form__content" :id="currentStep">
        <transition name="slide">
          <fieldset class="form__step" v-if="currentStep == 1">
            <div class="form-field">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input
                  type="text"
                  id="firstName"
                  required
                  v-model="formData.firstName"
                />
                <label for="firstName">First name</label>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-field">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input
                  type="text"
                  id="lastName"
                  required
                  v-model="formData.lastName"
                />
                <label for="lastName">Last name</label>
                <span class="form-field__error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-field">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input
                  type="text"
                  id="username"
                  required
                  v-model="formData.username"
                />
                <label for="username">Github username</label>
                <span class="form-field__error">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </fieldset>
        </transition>
        <fieldset class="form__step" v-if="currentStep == 2">
          <div class="form-field">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                required
                v-model="formData.email"
              />
              <ul>
                <li v-for="error in errors" :key="error">
                  <span class="form-field__error">{{ error }}</span>
                </li>
              </ul>
            </ValidationProvider>
          </div>
          <div class="form-field">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input
                type="checkbox"
                id="consent"
                required
                v-model="formData.consent"
              />
              <label for="consent">Agree with terms and services</label>
              <span class="form-field__error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </fieldset>
      </section>
      <p>{{ formData }}</p>
      <div class="form__action">
        <button class="btn" data-cy="btn-back" @click="previousStep">
          Back
        </button>
        <button
          class="btn"
          @click="nextStep"
          :disabled="isDisabled"
          data-cy="btn-next"
        >
          Next
        </button>
      </div>
    </form>
    <button @click="getUserGithub">get github</button>
  </section>
</template>

<script>
import { ValidationProvider, extend } from "vee-validate";
//import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import axios from "axios";
const getUsersUrl = "https://api.github.com/users/";
extend("required", {
  ...required,
  message: "This field is required"
});
export default {
  name: "MultistepForm",
  components: { ValidationProvider },
  props: {
    msg: String
  },
  data: function() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        consent: false,
        githubAvatar: ""
      },
      user: "",
      isValid: false,
      currentStep: 1,
      allSteps: 2,
      isDisabled: false,
      firstComplete: false,
      secondComplete: false
    };
  },
  methods: {
    async getUserGithub() {
      try {
        const response = await axios.get(getUsersUrl + this.formData.username);
        if (response.status === 200) {
          this.user = response.data;
          //this.loading = false;
        }
      } catch (error) {
        // this.errorText = 'No user found'
        // this.isError = true;
        // this.loading = false;
      }
    },
    previousStep() {
      this.currentStep = this.currentStep - 1;
    },
    nextStep() {
      if (this.currentStep < this.allSteps) {
        this.currentStep = this.currentStep + 1;
        // if (window.history.pushState) {
        //   window.history.pushState(
        //     "object or string",
        //     "Page Title",
        //     "/" + this.currentStep
        //   );
        // }
      }
      if (this.currentStep == this.allSteps) {
        this.$emit("getUserData", this.formData);
      }

      //alert(this.currentStep);
    },
    test(input) {
      this.firstComplete = true;
      console.log(input);
    },
    onSubmit() {
      this.isValid = true;
    }
  },
  created() {
    // this.getUsers();
  },
  mounted() {
    console.log(document.querySelectorAll(".form__step").length);
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
.form-field {
  margin-bottom: 1em;
}
.form-field label {
  display: block;
}
.form-field input {
  display: inline-block;
}
.form-field__error {
  display: none;
  color: red;
}
/*Slide down result*/
.slide-enter-active {
  transition: all cubic-bezier(0, 1, 0.5, 1) 0.3s;
}

.slide-leave-active {
  transition: all cubic-bezier(0, 1, 0.5, 1) 0.3s;
}

.slide-enter-to,
.slide-leave {
  transform: translateX(100%);
}

.slide-enter,
.slide-leave-to {
  transform: translateX(0);
}
input:invalid {
  border: 2px dashed red;
}

input:valid {
  border: 2px solid black;
}
input:required + label:after {
  content: "*";
  color: red;
}
</style>
