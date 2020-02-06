<template>
  <div class="grid-room">
    <section
      class="grid-col-1 has-background-white"
      style="box-shadow: 3px 5px 6px rgba(0,0,0, 0.1);z-index:2"
    >
      <RoomMenu></RoomMenu>
    </section>
    <section v-if="!activeRoom" class="grid-col-2 has-background-grey-darker">
      <section class="hero is-large has-text-centered">
        <div class="hero-head">
          <div class="content" style="padding: 2rem">
            <p class="title is-3 has-text-weight-light has-text-grey-light">
              Start Chatting
            </p>
            <p class="subtitle is-5 has-text-weight-normal has-text-grey">
              Go to a room to start chatting with your friends
            </p>
          </div>
        </div>
        <div class="hero-body bg-main"></div>
      </section>
    </section>
    <section v-else class="grid-col-2 has-background-grey-lighter">
      <Chat></Chat>
    </section>
    <section class="grid-col-3 has-background-grey-light">
      <UserMenu></UserMenu>
    </section>
  </div>
</template>

<script>
import RoomMenu from "~/components/Room/RoomMenu";
import Chat from "~/components/Room/Chat";
import UserMenu from "~/components/Room/User";
import { mapState } from "vuex";
export default {
  layout: "chat",
  middleware: "auth",
  components: {
    RoomMenu,
    Chat,
    UserMenu
  },
  async fetch({ store }) {
    store.dispatch("room/FETCH_MYROOMS");
    store.dispatch("room/FETCH_ALLROOMS");
    store.dispatch("users/FETCH_ALLUSERS");
  },
  computed: {
    ...mapState({
      activeRoom: state => state.room.activeRoom,
      addMessage: state => state.addMessage
    })
  }
};
</script>

<style lang="css">
.bg-main {
  background: url("https://image.flaticon.com/icons/svg/745/745271.svg");
  background-repeat: no-repeat;
  opacity: 0.5;
  background-position: center;
}
.grid-room {
  display: grid;
  height: 100vh;
  grid-template-columns: [col-1-start]0.7fr [col-1-end col-2-start] 3.2fr [col-2-end col-3-start] 1fr [col-3-end];
  /* grid-template-rows: minmax(min-content, 100vh); */
}
.grid-col-1 {
  grid-column: col-1;
}
.grid-col-2 {
  grid-column: col-2;
}
.grid-col-3 {
  grid-column: col-3;
}
.grid-col-2 .container {
  padding: 1.2rem;
}
.grid-col-3 .hero-body {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.center {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.sub-grid {
  display: grid;
  height: 100vh;
  grid-template-rows: [sub-hd-start]8.5rem[sub-hd-end chat-start] 1fr [chat-end inp-start] 3rem [inp-end];
}
.sub-hd {
  grid-row: sub-hd;
}
.sub-chat {
  grid-row: chat;
}
.sub-inp {
  grid-row: inp;
}
</style>
