<template>
  <section>
    <ValidationObserver v-slot="{ invalid, passes }" slim>
      <h1>Step {{ currentStep }} from {{ allSteps }}</h1>
      <form @submit.prevent="passes(nextStep)">
        <ValidationProvider
          v-for="field in activeStep"
          :key="field.label"
          :name="field.id"
          :rules="field.validation"
          v-slot="{ errors }"
          persist
          slim
        >
          <div class="form-field">
            <input v-model="field.value" :type="field.type" :id="field.id" />
            <label :for="field.id">{{ field.label }}</label>
            <ul>
              <li v-for="error in errors" :key="error">
                <span class="form-field__error">{{ error }}</span>
              </li>
            </ul>
          </div>
        </ValidationProvider>

        <section class="form__content" :id="currentStep">
          <!-- <transition name="slide">
         
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
          </fieldset>-->
        </section>

        <div class="form__action">
          <button class="btn" data-cy="btn-back" @click.prevent="previousStep">Back</button>
          <button
            class="btn"
            @click="nextStep"
            :disabled="invalid"
            data-cy="btn-next"
          >{{ isLastStep ? "Submit" : "Next" }}</button>
        </div>
      </form>
    </ValidationObserver>
    <!-- <button @click="getUserGithub">get github</button> -->
    <code>this is all data: {{ formSteps }} This is current data: {{ activeStep }}</code>
    <p v-for="field in formSteps" :key="field.label">
      {{ field.label }}
      {{ field.value }}
    </p>
    <p v-for="field in activeStep" :key="field.label">
      {{ field.label }}
      {{ field.value }}
    </p>
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import axios from "axios";
const getUsersUrl = "https://api.github.com/users/";
extend("required", {
  ...required,
  message: "This field is required"
});
extend("email", {
  ...email,
  message: "Email should be valid"
});
export default {
  name: "MultistepForm",
  components: { ValidationProvider, ValidationObserver },
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
      isVisible: true,
      close: false,
      isValid: false,
      currentStep: 1,
      allSteps: 2,
      isDisabled: false,
      firstComplete: false,
      secondComplete: false,

      formSteps: [
        [
          {
            label: "First name",
            id: "firstName",
            type: "text",
            validation: "required",
            value: ""
          },
          {
            label: "Last name",
            id: "lastName",
            type: "text",
            validation: "required",
            value: ""
          },
          {
            label: "Github username",
            id: "username",
            type: "text",
            validation: "required",
            value: ""
          }
        ],
        [
          {
            label: "Agree with terms and services",
            id: "consent",
            type: "checkbox",
            validation: "required",
            value: ""
          },
          {
            label: "Email",
            id: "email",
            type: "email",
            validation: "required|email",
            value: ""
          }
        ]
      ]
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
      if (this.currentStep < 1) {
        this.close = true;
        return;
      }
      console.log(this.currentStep);
    },
    nextStep() {
      if (this.isLastStep) {
        this.$emit("getUserData", this.formData);
        return this.onSubmit();
      }
      //console.log(this.formData);
      this.currentStep = this.currentStep + 1;
    },
    test(input) {
      this.firstComplete = true;
      console.log(input);
    },
    onSubmit() {
      this.isValid = true;
      this.close = true;
    }
  },
  computed: {
    activeStep() {
      return this.formSteps[this.currentStep - 1];
    },
    isLastStep() {
      return this.currentStep === this.formSteps.length;
    }
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
