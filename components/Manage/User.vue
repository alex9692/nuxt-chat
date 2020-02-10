<template>
  <section class="section account">
    <h1 class="title is-3 has-text-dark has-text-weight-semibold">
      Account information
    </h1>
    <form>
      <div class="field">
        <div class="control">
          <label class="label has-text-grey has-text-weight-medium"
            >Username</label
          >
          <input
            type="text"
            class="input"
            v-model="username"
            placeholder="change username"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label has-text-grey has-text-weight-medium">Name</label>
          <input
            type="text"
            class="input"
            v-model="name"
            placeholder="change name"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label has-text-grey has-text-weight-medium"
            >Email</label
          >
          <input
            type="email"
            class="input"
            v-model="email"
            placeholder="change email"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label has-text-grey has-text-weight-medium"
            >New Password</label
          >
          <input type="password" class="input" placeholder="change password" />
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      username: this.user.username,
      name: this.user.name,
      email: this.user.email
    };
  }
};
</script>

<style lang="css" scoped>
.input {
  width: 65%;
}
</style>
