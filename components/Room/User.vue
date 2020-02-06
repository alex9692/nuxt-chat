<template>
  <div class=" sub-grid">
    <div class="center sub-hd has-background-grey-dark">
      <article class="media user" style="align-items:center">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="currentUser.avatar" />
          </p>
        </figure>
        <div class="media-content">
          <div class="has-text-white">
            <p class=" has-text-weight-semibold">{{ currentUser.name }}</p>
            <small>@{{ currentUser.username }}</small>
          </div>
        </div>
      </article>
    </div>
    <div class="chat-users sub-chat">
      <aside class="menu">
        <p class="menu-label">
          AVAILABLE USERS
        </p>
        <p v-if="!roomUsers.length" class="has-text-weight-light">
          Click on a room to view the users
        </p>
        <ul v-if="roomUsers.length" class="menu-list">
          <li class="users" v-for="user in loggedUsers" :key="user._id">
            <figure class="image is-24x24">
              <img :src="user.avatar" alt="" />
            </figure>
            <p
              class="has-text-weight-medium"
              style="padding:0.25rem 1rem;flex-grow:1"
            >
              {{ user.name }}
            </p>
            <client-only>
              <span class="icon has-text-success"
                ><i class="fas fa-circle"></i
              ></span>
            </client-only>
          </li>
        </ul>
        <p class="menu-label" style="padding-top: 4rem;">
          ALL USERS
        </p>
        <ul class="menu-list">
          <li class="users" v-for="user in allUsers" :key="user._id">
            <figure class="image is-24x24">
              <img :src="user.avatar" alt="" />
            </figure>
            <p
              class="has-text-weight-medium"
              style="padding:0.25rem 1rem;flex-grow:1"
            >
              {{ user.name }}
            </p>
            <client-only>
              <span class="icon" :class="isOnline(user._id)"
                ><i class="fas fa-circle"></i
              ></span>
            </client-only>
          </li>
        </ul>
      </aside>
    </div>
    <div class="field sub-inp">
      <div class="control has-icons-right">
        <input
          type="text"
          class="input no-border"
          placeholder="Search Users"
        />
        <client-only>
          <span class="icon is-small is-right" style="height: 100%;">
            <i class="fas fa-search"></i>
          </span>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loggedUsers: []
    };
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.user,
      roomUsers: state => state.users.roomUsers,
      allUsers: state => state.users.allUsers
    })
  },
  methods: {
    isOnline(id) {
      const found = this.loggedUsers.find(el => el._id === id);
      return found ? "has-text-success" : "has-text-grey";
    }
  },
  created() {
    this.$store.dispatch("users/FETCH_ALLUSERS");
    this.$socket.emit("get-users");
    this.$socket.on("logged-users", data => {
      this.loggedUsers = data;
    });
  },
  destroyed() {
    this.$socket.removeAllListeners(["logged-users"]);
  }
};
</script>

<style lang="css" scoped>
.media.user {
  margin-left: 1rem;
  flex-grow: 1;
}
.chat-users {
  padding: 1rem;
}
.menu-list li:hover {
  color: #7a7a7a;
}
.menu-list li.users:hover {
  color: #fff;
  border-radius: 4px;
  background: #4a4a4a;
}
.menu-list li {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
}
.menu {
  padding: 3rem 0.5rem;
}
.media-left {
  margin-left: 1rem;
}
.center {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.field .control {
  height: 100%;
}
.field .control input.no-border,
.field .control input.no-border:focus {
  height: 100%;
  border: none;
  border-radius: 0;
  box-shadow: none;
}
</style>
