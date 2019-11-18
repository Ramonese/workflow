<template>
  <section>
    <ul>
      <li v-if="user.avatar">
        <figure>
          <img :src="user.avatar" :alt="user.username" />
        </figure>
        <figcaption>Github username: {{user.username}}</figcaption>
      </li>
      <li>{{user.firstName}} {{user.lastName}}</li>
      <li>{{user.email}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "UserProfile",
  props: ["user"]
};
</script>

<style scoped>
.user-avatar {
  max-width: 200px;
  width: 100%;
  height: auto;
}
</style>
