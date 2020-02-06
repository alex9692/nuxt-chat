<template>
  <div class="sub-grid">
    <section class="hero sub-hd">
      <div class="hero-body has-text-centered">
        <span class="is-size-3 has-text-weight-semibold has-text-grey-light"
          >nuxt</span
        ><span class="is-size-3 has-text-weight-semibold has-text-grey"
          >Chat</span
        >
      </div>
    </section>
    <div class="container sub-chat">
      <div class="field" style="padding-top:1.5rem;">
        <div class="control has-icons-right">
          <input
            type="text"
            v-model="searchText"
            class="input is-small"
            placeholder="Search Rooms"
          />
          <client-only>
            <span class="icon is-small is-right">
              <i class="fas fa-search"></i>
            </span>
          </client-only>
        </div>
      </div>
      <aside v-if="mode === 'normal'" class="menu">
        <p class="menu-label">
          YOUR CHAT ROOMS
        </p>
        <p
          class="has-text-weight-normal has-text-danger"
          style="font-size:0.85rem"
          v-if="myRooms.length === 0"
        >
          You don't have any rooms.
        </p>
        <ul v-if="myRooms.length > 0" class="menu-list">
          <li
            :class="{ 'menu-list-active': setActiveRoom(room._id) }"
            @click="setRoom(room._id)"
            v-for="room in myRooms"
            :key="room._id"
          >
            <p class="is-capitalized">{{ room.roomName }}</p>
          </li>
        </ul>
        <p class="menu-label" style="padding-top: 3rem;">
          OTHER CHAT ROOMS
        </p>
        <ul class="menu-list">
          <li
            :class="{ 'menu-list-active': setActiveRoom(room._id) }"
            @click="setRoom(room._id)"
            v-for="room in otherRooms"
            :key="room._id"
          >
            <p class="is-capitalized">{{ room.roomName }}</p>
          </li>
        </ul>
      </aside>
      <aside v-else>
        <ul class="menu-list">
          <li
            @click="setRoom(room._id)"
            v-for="room in filteredRooms"
            :key="room._id"
          >
            <p class="is-capitalized">{{ room.roomName }}</p>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      searchText: "",
      mode: "normal"
    };
  },
  computed: {
    ...mapState({
      myRooms: state => state.room.myRooms,
      allRooms: state => state.room.allRooms,
      activeRoom: state => state.room.activeRoom
    }),
    ...mapGetters({
      otherRooms: "room/otherRooms"
    }),
    filteredRooms() {
      return this.allRooms.filter(el => el.roomName.includes(this.searchText));
    }
  },
  watch: {
    searchText(val) {
      if (!val.length) {
        this.mode = "normal";
      } else {
        this.mode = "search";
      }
    },
    async activeRoom(val) {
      if (val) {
        await this.$store.dispatch("message/FETCH_ROOMMESSAGES");
        await this.$store.dispatch("users/FETCH_ROOMUSERS");
      }
    }
  },
  methods: {
    async setRoom(id) {
      await this.$store.dispatch("room/SET_ACTIVEROOM", id);
      await this.$store.dispatch("room/ADD_USER");
      await this.$store.dispatch("message/FETCH_ROOMMESSAGES");
      await this.$store.dispatch("users/FETCH_ROOMUSERS");
      this.searchText = "";
    },
    setActiveRoom(id) {
      if (this.activeRoom && this.activeRoom._id === id) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="css" scoped>
.menu-list li:hover,
.menu-list-active {
  color: #d3d3d3;
  background: #4a4a4a;
  border-radius: 4px;
}
.menu-list li {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin: 0.5rem 0;
}
.container {
  display: flex;
  flex-direction: column;
}
.menu {
  padding: 3rem 0.5rem;
}
</style>
