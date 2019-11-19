<template>
  <div id="app">
    <div class="l-site-wrapper">
      <transition name="fade" mode="out-in">
        <div>
          <section class="l-column center" v-if="isIntroVisible">
            <h1>Fill user information</h1>
            <p>Start to fill out user information</p>
            <button class="btn" @click="start">Start</button>
          </section>
          <div v-if="isFormVisible">
            <MultistepForm @sendUserData="showUserData" @closeForm="showIntro" />
          </div>
          <aside v-if="isUserProfileVisible" class="l-user-profile l-column">
            <UserProfile :user="userData" @close="closeProfile" heading="Your information" />
          </aside>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import MultistepForm from "./components/MultistepForm.vue";
import UserProfile from "./components/UserProfile.vue";
export default {
  name: "app",
  components: {
    MultistepForm,
    UserProfile
  },
  data: function() {
    return {
      userData: {},
      isUserProfileVisible: false,
      isIntroVisible: true,
      isFormVisible: false
    };
  },
  methods: {
    start() {
      this.isIntroVisible = false;
      this.isFormVisible = true;
      this.isUserProfileVisible = false;
    },
    showIntro() {
      this.isIntroVisible = true;
      this.isFormVisible = false;
    },
    showUserData(data) {
      this.userData = data;
      this.isUserProfileVisible = true;
      this.isFormVisible = false;
      this.isIntroVisible = false;
    },
    closeProfile() {
      this.isIntroVisible = true;
      this.isUserProfileVisible = false;
    }
  }
};
</script>

<style>
:root {
  --accent: #ad1457;
  --erorr: #e35183;
  --text: #263238;
  --basefont-size: 90%;
}
* {
  box-sizing: border-box;
}
html {
  font-size: 100%;
}
body {
  font-family: Helvetica, Arial, sans-serif;
  color: #263238;
  line-height: 1.5;
  margin: 0;
}
#app {
  font-size: var(--basefont-size);
}
.center {
  text-align: center;
}
.l-site-wrapper {
  overflow: hidden;
  margin: 10vmin;
}
h1,
h2 {
  font-weight: normal;
  font-size: 200%;
  color: var(--accent);
  text-align: center;
  margin-top: 0;
  margin-bottom: 1em;
  line-height: 1.1;
}

.btn {
  font-size: 120%;
  background: #ad1457;
  background: var(--accent);
  color: #fff;
  border-radius: 5px;
  padding: 0.5em 1.5em;
  border: none;
  cursor: pointer;
  transition: background 0.2s linear;
}
.btn:not(:disabled):hover,
.btn:focus {
  background: #e35183;
}
.l-column {
  max-width: 20em;
  margin: 0 auto;
}
.l-user-profile {
  margin-top: 3em;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media screen and (min-width: 70em) {
  :root {
    --basefont-size: 100%;
  }
  .l-site-wrapper {
    max-width: 50em;
    margin: 25vh auto 0 auto;
    min-height: 50vh;
  }
}
</style>
