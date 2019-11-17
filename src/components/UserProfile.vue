<template>
  <section>
    <ul>
      <li><img :src="avatar" class="user-avatar" /></li>
      <li v-for="data in user" :key="data + 1">
        {{ data }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "UserProfile",
  props: ["user", "avatar"]
};
</script>

<style scoped>
.user-avatar {
  max-width: 200px;
  width: 100%;
  height: auto;
}
</style>
