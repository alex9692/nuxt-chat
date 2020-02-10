<template>
  <section class="section room">
    <h1 class="title is-3 has-text-dark has-text-weight-semibold">
      Manage rooms
    </h1>
    <div class="columns">
      <div class="column">
        <h1 class="subtitle is-5 has-text-dark has-text-weight-normal">
          Update existing rooms
        </h1>
        <form>
          <div class="field">
            <div class="control">
              <label class="label has-text-grey has-text-weight-medium"
                >Select a room</label
              >
              <div class="select">
                <select v-model="selectedRoom">
                  <option disabled value="null">Select a room</option>
                  <option v-for="room in rooms" :key="room._id" :value="room">{{
                    room.roomName
                  }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label has-text-grey has-text-weight-medium"
                >Update room name</label
              >
              <input
                type="text"
                class="input"
                v-model="roomName"
                placeholder="enter a room name"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="label has-text-grey has-text-weight-medium"
                >Status</label
              >
              <div class="select">
                <select v-model="status">
                  <option disabled value="null">Change status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="column">
        <h1 class="subtitle is-5 has-text-dark has-text-weight-normal">
          Create a room
        </h1>
        <form>
          <div class="field">
            <div class="control">
              <label class="label has-text-grey has-text-weight-medium"
                >Room name</label
              >
              <input
                type="text"
                class="input"
                v-model="newRoomName"
                placeholder="enter new room name"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    rooms: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedRoom: null,
      roomName: "",
      status: null,
      newRoomName:''
    };
  },
  watch: {
    selectedRoom(val) {
      if (val) {
        this.roomName = val.roomName;
        this.status = val.status;
      }
    }
  }
};
</script>

<style lang="css" scoped>
.input {
  width: 65%;
}
</style>
