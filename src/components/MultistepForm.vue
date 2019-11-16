<template>
  <section>
    <h1>Step {{ currentStep }} from {{ allSteps }}</h1>
    <form @submit.prevent="onSubmit">
      <section class="form__content" :id="currentStep">
        <transition name="slide">
          <fieldset v-if="currentStep == 1">
            <div class="form-field">
              <label for="firstName">First Name</label>
              <input type="input" id="firstName" v-model="formData.firstName" />
              <span class="form-field__error">error text</span>
            </div>
            <div class="form-field">
              <label for="lastName">Last Name</label>
              <input type="input" id="lastName" v-model="formData.lastName" />
              <span class="form-field__error">error text</span>
            </div>
            <div class="form-field">
              <label for="username">Github username</label>
              <input type="input" id="username" v-model="formData.username" />
              <span class="form-field__error">error text</span>
            </div>
          </fieldset>
        </transition>
        <fieldset v-if="currentStep == 2">
          <div class="form-field">
            <label for="email">Email</label>
            <input type="input" id="email" v-model="formData.email" />
            <span class="form-field__error">error text</span>
          </div>
          <div class="form-field">
            <label for="consent">Agree with terms and services</label>
            <input type="checkbox" id="consent" v-model="formData.consent" />
            <span class="form-field__error">error text</span>
          </div>
        </fieldset>
      </section>
      {{ formData }}
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
    <aside class="user-profile">
      <ul v-for="data in formData" :key="data + 1">
        <li>{{ data }}</li>
      </ul>
      <img :src="this.user.avatar_url" />
    </aside>
  </section>
</template>

<script>
//import FormStep from "./FormStep.vue";
import axios from "axios";
const getUsersUrl = "https://api.github.com/users/ramonese";
export default {
  name: "MultistepForm",
  components: {
    //FormStep
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        consent: false
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
    async getUsers() {
      try {
        const response = await axios.get(getUsersUrl);
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
      //alert(this.currentStep);
    },
    test(input) {
      this.firstComplete = true;
      console.log(input);
    },
    //Send request to github
    onSubmit() {
      this.isValid = true;
    }
  },
  mounted() {
    this.getUsers();
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
</style>
