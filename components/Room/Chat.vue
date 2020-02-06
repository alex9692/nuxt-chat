<template>
  <div class="sub-grid">
    <section class="hero has-background-grey sub-hd">
      <div class="hero-body has-text-centered">
        <h3 class="heading is-size-5" style="padding:0.2rem">
          {{ activeRoom.roomName }}({{ messages.length }})
        </h3>
      </div>
    </section>
    <section
      ref="messages"
      class="container sub-chat chat"
      style="overflow-y: auto"
    >
      <Messages
        v-for="(message, index) in messages"
        :key="message._id"
        :index="index"
        :message="message.message"
        :username="message.user.username"
        :name="message.user.name"
        :avatar="message.user.avatar"
        :id="message.user._id"
        :date="message.createdAt"
      ></Messages>
    </section>
    <div class="field sub-inp">
      <div class="control">
        <input
          type="text"
          class="input no-border"
          placeholder="Type something here...."
          v-model="message"
          @input="$v.message.$touch()"
          @keyup.enter="submitMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Messages from "~/components/Room/Messages/Messages";
import { required } from "vuelidate/lib/validators";
export default {
  components: { Messages },
  computed: {
    ...mapState({
      messages: state => state.message.messages,
      activeRoom: state => state.room.activeRoom,
      firstLoad: state => state.room.firstLoad
    })
  },
  data() {
    return {
      message: ""
    };
  },
  validations: {
    message: {
      required
    }
  },
  methods: {
    submitMessage() {
      if (!this.$v.$invalid) {
        this.$store.dispatch("message/CREATE_MESSAGE", {
          message: this.message
        });
        this.scrollToBottom();
        this.message = "";
      }
    },
    scollauto() {
      // Create an observer and pass it a callback.
      var observer = new MutationObserver(this.scrollToBottom);
      // Tell it to look for new children that will change the height.
      var config = { childList: true };
      observer.observe(this.$refs.messages, config);
    },
    scrollToBottom() {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
    }
  },
  beforeCreate() {
    this.$socket.on("new-message", message => {
      if (this.activeRoom._id === message.room._id) {
        this.$store.dispatch("message/ADD_MESSAGE", message);
      }
    });
  },
  destroyed() {
    this.$socket.removeAllListeners(["new-message"]);
  },
  mounted() {
    this.scrollToBottom();
  },
  watch: {
    activeRoom() {
      this.scrollToBottom();
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0;
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
