<template>
  <section class="section">
    <div class="columns">
      <div class="column is-3 is-offset-1">
        <ManageAvatar
          :avatar="user.avatar"
          :username="user.username"
        ></ManageAvatar>
      </div>
      <div class="column is-7">
        <div class="box">
          <ManageUser :user="user"></ManageUser>
          <ManageRoom :rooms="rooms"></ManageRoom>
          <div class="control save">
            <button class="button is-info">Save all changes</button>
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
import { mapGetters } from "vuex";
export default {
  components: {
    ManageUser,
    ManageRoom,
    ManageAvatar
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      rooms: "room/getMyRooms"
    })
  },
  async fetch({ store }) {
    await store.dispatch("room/FETCH_MYROOMS");
  }
};
</script>

<style lang="css" scoped>
.section.account {
  border-bottom: 2px solid #7a7a7a;
}
.control.save {
  text-align: right;
}
</style>
