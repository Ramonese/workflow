<template>
  <section>
    <ValidationObserver v-slot="{ invalid, passes }" slim novalidate>
      <h1>Step {{ currentStep }} from {{ formStepCount }}</h1>
      <form @submit.prevent="passes(nextStep)">
        <ValidationProvider
          v-for="field in activeStep"
          :key="field.label"
          :name="field.id"
          :rules="field.validation"
          v-slot="{ errors, classes}"
          eager
          slim
        >
          <div class="form-field">
            <input
              v-model="field.value"
              :type="field.type"
              :id="field.id"
              :class="classes"
              required="field.validation"
            />
            <label :for="field.id">{{ field.label }}</label>
            <ul>
              <li v-for="error in errors" :key="error">
                <span class="form-field__error">{{ error }}</span>
              </li>
            </ul>
          </div>
        </ValidationProvider>

        <!-- <transition name="slide"> </transition>-->

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
    <button @click="getUserGithub">get github</button>
    <aside v-if="isGithubError">
      <p>{{githubErrorText}}</p>
    </aside>
    <aside v-if="loading">
      <p>Loading...</p>
    </aside>
  </section>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import axios from "axios";
extend("required", {
  ...required,
  message: "This is a required field"
});

extend("email", {
  ...email,
  message: "Email address is not correct"
});
//Custom validation for required checkbox (vee validate "false" is treated as valid)
extend("checkboxRequired", {
  validate: value => value == true,
  message: "You have to agree with terms and services"
});
//Github endpoint single user + username
const getUsersUrl = "https://api.github.com/users/";
export default {
  name: "MultistepForm",
  components: { ValidationProvider, ValidationObserver },
  props: {
    msg: String
  },
  data: function() {
    return {
      userData: {},
      githubUsername: "",
      githubUserAvatar: "",
      isVisible: true,
      close: false,
      currentStep: 1, //start with 1 (used in h1)
      isGithubError: false,
      githubErrorText: "Github username is not correct",
      loading: false,
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
            label: "Email",
            id: "email",
            type: "email",
            validation: "required",
            value: ""
          },
          {
            label: "Agree with terms and services",
            id: "consent",
            type: "checkbox",
            validation: "checkboxRequired",
            value: false
          }
        ]
      ]
    };
  },
  methods: {
    async getUserGithub(username) {
      //username = "ramonese";
      /*
			[1]:emit data to parent from here, to be sure user is fetched before form submit on slow connection 
			*/
      try {
        const response = await axios.get(getUsersUrl + username);
        if (response.status === 200) {
          this.loading = false;
          console.log(response.data);
          this.githubUserAvatar = response.data.avatar_url;
          this.sendData(); //[1]
          this.close = true;
        }
      } catch (error) {
        this.loading = false;
        this.isGithubError = true;
        this.close = true;
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
        this.loading = true;
        this.formatUserInput();
        this.getUserGithub(this.githubUser);
      }
      this.currentStep = this.currentStep + 1;
    },
    /*
			[1]: create array from user submited data;
			[2]: push array values into one object: {label: value}
			*/
    formatUserInput() {
      let data = [];
      //[1]
      this.formSteps.forEach(el => {
        el.forEach(value => {
          data.push({ name: value.id, value: value.value });
        });
      });
      //[2]
      this.userData = Object.assign(
        {},
        ...data.map(item => ({ [item.name]: item.value }))
      );
      console.log(this.userData);
      return (this.githubUser = this.userData.username);
    },
    /*
			[1]: add avatar to user object;
			[2]: push array values into one object: {label: value}
			*/
    sendData() {
      console.log(this.githubUserAvatar);
      //[1]
      this.userData.avatar = this.githubUserAvatar;
      console.log("%%%%%%%%%%%%%%%%%%%%%%", this.userData);
      this.$emit("sendUserData", this.userData);
    }
  },
  computed: {
    /*
			[1]: add + 1 to corect this.currentStep = 1
			*/
    activeStep() {
      //[1]
      return this.formSteps[this.currentStep - 1];
    },
    isLastStep() {
      return this.currentStep === this.formSteps.length;
    },
    formStepCount() {
      return this.formSteps.length;
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
input.invalid {
  border: 2px solid brown;
}

input:valid {
  border: 2px solid black;
}

input:required + label:after {
  content: "*";
  color: red;
}
</style>
