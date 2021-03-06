<template>
  <section>
    <h1 v-if="!hideForm">Step {{ currentStep }} from {{ formStepCount }}</h1>
    <div class="l-column">
      <ValidationObserver v-slot="{ invalid, passes }" slim novalidate>
        <form @submit.prevent="passes(nextStep)" :class="{'hide':hideForm}">
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
              <ul class="l-error-list">
                <li v-for="error in errors" :key="error">
                  <span class="form-field__error">{{ error }}</span>
                </li>
              </ul>
            </div>
          </ValidationProvider>
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
      <aside v-if="isGithubError">
        <p>{{githubErrorText}}</p>
      </aside>
      <aside v-if="loading">
        <p>Loading...</p>
      </aside>
    </div>
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
  data: function() {
    return {
      userData: {},
      githubUserAvatar: "",
      hideForm: false,
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
    /*
			[1]:emit data to parent from here, to be sure user is fetched before form submit on slow connection 
			*/
    async getUserGithub(username) {
      try {
        const response = await axios.get(getUsersUrl + username);
        if (response.status === 200) {
          this.loading = false;
          this.githubUserAvatar = response.data.avatar_url;
          this.sendData(); //[1]
          this.$emit("closeForm");
        }
      } catch (error) {
        this.loading = false;
        this.isGithubError = true;
        this.$emit("closeForm");
      }
    },
    previousStep() {
      this.currentStep = this.currentStep - 1;
      this.transition = !this.transition;
      if (this.currentStep < 1) {
        this.$emit("closeForm");
      }
    },
    nextStep() {
      if (this.isLastStep) {
        this.hideForm = true;
        this.loading = true;
        this.formatUserInput();
        this.getUserGithub(this.githubUser);
      }
      this.currentStep = this.currentStep + 1;
      this.transition = true;
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
      return (this.githubUser = this.userData.username);
    },
    /*
			[1]: add avatar to user object;
			*/
    sendData() {
      //[1]
      this.userData.avatar = this.githubUserAvatar;
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

<style>
.hide {
  display: none;
}
ul {
  list-style-type: none;
  padding: 0;
}

.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.7em;
}
.form__action {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.btn:first-child {
  margin-right: 1em;
}
.btn {
  margin-bottom: 1em;
}
.form-field label {
  display: block;
  order: -1;
  margin-bottom: 0.2em;
}

.l-error-list,
.l-error-list li {
  margin: 0;
  line-height: 1;
}

input {
  background: white;
  border: 2px solid var(--text);
}
input[type="text"],
input[type="email"] {
  display: block;
  background: inherit;
  padding: 0.5em 1em;
  font-size: inherit;
  font-family: inherit;
}
input[type="checkbox"] {
  padding: 1em;
  display: inline-flex;
  max-width: 20px;
  max-width: min-content;
}
input:focus {
  background: inherit;
  border: 2px solid #e35183;
}
input.invalid {
  border: 2px solid #e35183;
}
.form-field__error {
  color: #e35183;
  color: var(--erorr);
}
input:valid {
  border: 2px solid var(--text);
}
button:disabled {
  background: #9f9f9f;
}
input:required + label:after {
  content: "*";
}
.l-error-list {
  padding-top: 5px;
  min-height: calc(24 / 16 * 1em);
}
</style>
