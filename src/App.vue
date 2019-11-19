<template>
  <div id="app">
    <div class="l-site-wrapper">
      <transition name="fade">
        <section class="l-column center" v-if="isIntroVisible">
          <h1>Fill user information</h1>
          <p class="step__text">Start to fill out user information</p>
          <button class="btn" @click="start">Start</button>
        </section>
        <v-else>
          <template v-if="isFormVisible">
            <MultistepForm @sendUserData="showUserData" @closeForm="closeForm" />
          </template>
        </v-else>
      </transition>
      <transition name="fade"></transition>
      <aside v-if="showUserProfile" class="l-user-profile">
        <UserProfile :user="userData" :avatar="userData.avatar" heading="Your information" />
      </aside>
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
      isFormVisible: false,
      showUserProfile: false,
      isIntroVisible: true,
      loading: true,
      isError: false,
      errorText: "No user found with this phone number"
    };
  },
  methods: {
    start() {
      this.isIntroVisible = false;
    },
    showUserData(data) {
      this.userData = data;
      this.showUserProfile = true;
    },
    closeForm(status) {
      this.isFormVisible = false;
      this.isIntroVisible = true;
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
html {
  font-size: 100%;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #263238;
  line-height: 1.5;
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
h1 {
  font-weight: normal;
  font-size: 200%;
  color: var(--accent);
  text-align: center;
  margin-top: 0;
  margin-bottom: 1em;
  line-height: 1.1;
}
@media screen and (min-width: 70em) {
  :root {
    --basefont-size: 100%;
  }
  .l-site-wrapper {
    border: 1px solid grey;
    max-width: 50em;
    margin: 25vh auto 0 auto;
    min-height: 50vh;
  }
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
.form__step,
.l-user-profile {
  border: 1px solid magenta;
  padding: 3em;
  max-width: 300px;
  margin: 0 auto;
}
.l-column {
  max-width: 20em;
  border: 1px solid grey;
  margin: 0 auto;
}
/* Slide left
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
} */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slideup-enter-active {
  transition: all ease-in 1s;
}

.slideup-leave-active {
  transition: all ease-in 2s;
}

.slideup-enter-to,
.slideup-leave {
  opacity: 1;
  transform: translateY(-100%);
}

.slideup-enter,
.slideup-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/*Slide down result*/
.slide-enter-active {
  transition: all ease-in 0.3s;
}

.slide-leave-active {
  transition: all ease-in 0.3s;
}

.slide-enter-to,
.slide-leave {
  max-height: 100em;
  overflow: hidden;
  opacity: 1;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  opacity: 0;
  max-height: 0;
}
</style>
