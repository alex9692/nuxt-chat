<template>
  <section class="section">
    <div class="columns">
      <div class="column is-3 is-offset-1">
        <ManageAvatar
          :avatar="(user && user.avatar) || ''"
          :username="(user && user.username) || ''"
        ></ManageAvatar>
      </div>
      <div class="column is-7">
        <div class="box">
          <ManageUser :user="user || {}"></ManageUser>
          <div class="control save user">
            <button
              :disabled="!allowSaveUser"
              @click="saveUserChanges"
              class="button is-info"
            >
              Save User changes
            </button>
          </div>
          <ManageRoom :rooms="rooms || {}"></ManageRoom>
          <div class="control save">
            <button
              :disabled="!allowSaveRoom"
              @click="saveRoomChanges"
              class="button is-info"
            >
              Save Room changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ManageUser from "~/components/Manage/User";
import ManageRoom from "~/components/Manage/Room";
import ManageAvatar from "~/components/Manage/Avatar";
import { mapGetters, mapState } from "vuex";
export default {
  middleware: "auth",
  components: {
    ManageUser,
    ManageRoom,
    ManageAvatar
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      rooms: "room/getMyRooms"
    }),
    ...mapState({
      allowSaveUser: state => state.manage.user.allowSave,
      allowSaveRoom: state => state.manage.room.allowSave,
      updatedValuesUser: state => state.manage.user.updatedValues,
      updatedValuesRoom: state => state.manage.room.updatedValues
    })
  },
  async fetch({ store }) {
    await store.dispatch("room/FETCH_MYROOMS");
  },
  methods: {
    saveUserChanges() {
      this.$store.dispatch("manage/user/SAVE_USERCHANGES");
    },
    saveRoomChanges() {
      this.$store.dispatch("manage/room/SAVE_ROOMCHANGES");
    }
  },
  watch: {
    updatedValuesUser(val) {
      if (Object.keys(val).length === 0)
        this.$store.commit("manage/user/SET_ALLOWSAVE", false);
    },
    updatedValuesRoom(val) {
      if (Object.keys(val).length === 0)
        this.$store.commit("manage/room/SET_ALLOWSAVE", false);
    }
  }
};
</script>

<style lang="css" scoped>
.control.save {
  text-align: right;
}
.control.save.user {
  border-bottom: 2px solid #7a7a7a;
  padding: 1.5rem 0;
}
</style>
