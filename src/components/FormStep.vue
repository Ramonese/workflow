<template>
  <section>
    <div class="form-field" v-for="(field, index) in fields" :key="index">
      <label :for="field.id">{{field.label}}</label>
      <input :type="field.type" :id="field.id" @change="onInput" />
			<span class="form-field__error">error text</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "FormStep",
  props: ["fields"],
  data: function() {
    return {};
  },
  methods: {
    onInput($event) {
      this.$emit("onChange", $event.target.value);
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
