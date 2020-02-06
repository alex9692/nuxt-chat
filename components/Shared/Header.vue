<template>
  <nav class="nav has-background-link">
    <div class="columns is-mobile is-variable is-1">
      <div class="column center">
        <figure class="image is-64x64">
          <img
            src="https://image.flaticon.com/icons/svg/1453/1453476.svg"
            alt=""
          />
        </figure>
        <nuxt-link style="margin-left:0.6rem" to="/"
          ><h1 class="heading is-size-3 has-text-grey-dark">
            Nuxt<strong class="has-text-grey-darker">Chat</strong>
          </h1></nuxt-link
        >
      </div>
      <div class="column left">
        <ul class="nav-list left" v-show="isAuth">
          <nuxt-link class="nav-list-item text-nobreak" to="/createRoom"
            ><li>Create Chat Room</li></nuxt-link
          >
          <nuxt-link class="nav-list-item text-nobreak" to="/room"
            ><li>Enter Chat Room</li></nuxt-link
          >
        </ul>
      </div>
      <div class="column center">
        <ul class="nav-list center">
          <nuxt-link v-if="!isAuth" class="nav-list-item" to="/register"
            ><li>Register</li></nuxt-link
          >
          <nuxt-link v-if="!isAuth" class="nav-list-item" to="/login"
            ><li>Login</li></nuxt-link
          >
          <li v-if="isAuth" class="center nav-list-item">
            <figure class="image is-48x48">
              <img :src="user.avatar" alt="" />
            </figure>
            <p style="margin-left: 0.5rem">Welcome {{ user.username }}!</p>
          </li>
          <li
            v-if="isAuth"
            class="nav-list-item logout"
            style="cursor:pointer"
            @click="logout"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    ...mapGetters({
      isAuth: "auth/isAuth"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/LOGOUT");
    }
  }
};
</script>

<style scoped>
.nav {
  padding: 1.5rem 4.5rem;
  color: #fff !important;
}
.nav-list {
  width: 100%;
  height: 100%;
  list-style: none;
}
.nav-list-item {
  color: #cecece !important;
  margin: 0 1rem;
}
.nav-list-item:hover li {
  color: #3f3f3f !important;
}
.nav-list-item.nuxt-link-exact-active,
.nav-list-item.logout:hover,
.nav-list-item.logout:active {
  color: #363636 !important;
}
.center,
.left,
.right {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.left {
  justify-content: flex-start;
}
.right {
  justify-content: flex-end;
}
.text-nobreak {
  white-space: nowrap;
}
</style>
