<template>
  <section>
    <h1>{{heading}}</h1>
    <ul class="user-profile">
      <li v-if="user.avatar" class="user-profile__image">
        <figure>
          <img :src="user.avatar" :alt="user.username" class="user-avatar" />
        </figure>
        <figcaption>Github username: {{user.username}}</figcaption>
      </li>
      <li>{{user.firstName}} {{user.lastName}}</li>
      <li>{{user.email}}</li>
    </ul>
    <button class="btn" @click="close">Close</button>
  </section>
</template>

<script>
export default {
  name: "UserProfile",
  props: ["user", "heading"],
  data: function() {
    return {
      isVisible: true
    };
  },
  methods: {
    close() {
      this.isVisible = false;
      this.$emit("close", this.isVisible);
    }
  }
};
</script>

<style scoped>
figure {
  margin: 0;
}
figcaption {
  font-size: 90%;
}
.user-avatar {
  display: block;
  max-width: 10em;
  width: 100%;
  height: auto;
}
/* .user-profile {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-column-gap: 1rem;
}
.user-profile__image {
  grid-row: 1/-1;
} */
</style>
