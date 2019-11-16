<template>
  <section>
    <h1>Step name</h1>
    <div class="form-field" v-for="(field, index) in fields" :key="index">
      <FormField :field="field" @onChange="saveInput" />
    </div>
  </section>
</template>

<script>
import FormField from "./FormField.vue";
export default {
  name: "FormStep",
  props: ["fields"],
  components: {
    FormField
  },
  data: function() {
    return {
      formData: []
    };
  },
  methods: {
    saveInput(input) {
      this.formData.push(input);
    },
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
</style>
