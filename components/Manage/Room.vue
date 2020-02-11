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
        <p v-if="rooms.length === 0" class="has-text-danger">
          You currently dont have any rooms
        </p>
        <form v-if="rooms.length > 0">
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
          <div v-if="selectedRoom">
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
                  @blur="$v.roomName.$touch()"
                />
                <div v-if="$v.roomName.$error">
                  <span class="help is-danger" v-if="!$v.roomName.minLength">
                    Room name must be atleast
                    {{ $v.roomName.$params.minLength.min }} characters long.
                  </span>
                </div>
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
                @blur="$v.newRoomName.$touch()"
              />
              <div v-if="$v.newRoomName.$error">
                <span class="help is-danger" v-if="!$v.newRoomName.minLength">
                  Room name must be atleast
                  {{ $v.newRoomName.$params.minLength.min }} characters long.
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { minLength } from "vuelidate/lib/validators";
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
      newRoomName: ""
    };
  },
  validations: {
    roomName: {
      minLength: minLength(4)
    },
    newRoomName: {
      minLength: minLength(4)
    }
  },
  methods: {
    emitUpdatedValues(val) {
      this.$store.dispatch("manage/room/SET_UPDATEDVALUES", val);
      this.$store.commit("manage/room/SET_ALLOWSAVE", !this.$v.$invalid);
    }
  },
  watch: {
    selectedRoom(val) {
      if (val) {
        this.roomName = val.roomName;
        this.status = val.status;
        this.$store.commit("manage/room/SET_ROOMID", val._id);
      }
    },
    roomName(val, oldVal) {
      if (oldVal) {
        this.emitUpdatedValues({ roomName: val });
      }
    },
    newRoomName(val) {
      this.$store.commit("manage/room/SET_NEWROOM", val);
      this.$store.commit("manage/room/SET_ALLOWSAVE", !this.$v.$invalid);
    },
    status(val, oldVal) {
      if (oldVal) {
        this.emitUpdatedValues({ status: val });
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
