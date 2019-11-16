<template>
  <section>
    <div class="form-field">
      <label :for="field.id">{{field.label}}</label>
      <input :type="field.type" :id="field.id" @change="onInput" v-model="input" />
      <span class="form-field__error">error text</span>
    </div>
  </section>
</template>

<script>
const formFields = [
  [
    { label: "First name", id: "firstName", type: "text", required: true },
    { label: "Last name", id: "lastName", type: "text", required: true },
    {
      label: "Github username",
      id: "username",
      type: "text",
      required: true
    }
  ],
  [
    {
      label: "Agree with terms and services",
      id: "consent",
      type: "checkbox",
      required: true
    },
    { label: "Email", id: "email", type: "email", required: true }
  ]
];
export default {
  name: "FormField",
  props: ["field"],
  data: function() {
    return {
      formFields: formFields,
      input: "",
      isValid: true
    };
  },
  methods: {
    onInput() {
      if (this.isValid) {
        this.$emit("onChange", this.input);
      }
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
</style>
