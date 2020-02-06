<template>
  <div class="space">
    <article class="media" :class="[myMessages ? 'right' : 'left']">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="avatar" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <div :class="[myMessages ? 'col-right' : 'col-left']">
            <div>
              <strong>{{ name }}</strong> <small>@{{ username }}</small>
              <small>{{ formatDate(date) }}</small>
            </div>
            <p class="content has-background-light">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      moment
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    myMessages() {
      return this.user._id === this.id;
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return this.moment(date).fromNow();
    }
  }
};
</script>

<style lang="css" scoped>
.space {
  margin: 1rem 0.2rem;
}
.space:first-child {
  margin-top: 0;
}
.chat {
  overflow-y: auto;
}
.menu {
  padding: 3rem 0.5rem;
}
.left {
  flex-direction: row;
}
.right {
  flex-direction: row-reverse;
}
.col-left,
.col-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.media-left {
  margin-left: 1rem;
}
.col-left {
  align-items: flex-start;
  text-align: left;
}
.col-right {
  align-items: flex-end;
  text-align: right;
}
p.content {
  max-width: 80%;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
}
</style>
