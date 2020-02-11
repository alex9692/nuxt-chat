<template>
  <section class="section account">
    <h1 class="title is-3 has-text-dark has-text-weight-semibold">
      Account information
    </h1>
    <h1
      class="is-size-7 has-text-right has-text-info"
      style="margin-bottom:1rem"
    >
      <strong>Note: </strong>You will be automatically logged out after updating
      your account information.
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
            @blur="$v.username.$touch()"
          />
          <div v-if="$v.username.$error">
            <span class="help is-danger" v-if="!$v.username.minLength"
              >Username should be
              {{ $v.username.$params.minLength.min }} characters minimum.</span
            >
          </div>
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
            @blur="$v.name.$touch()"
          />
          <div v-if="$v.name.$error">
            <span class="help is-danger" v-if="!$v.name.minLength"
              >Name should be {{ $v.name.$params.minLength.min }} characters
              minimum.</span
            >
          </div>
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
            @blur="$v.email.$touch()"
          />
          <div v-if="$v.email.$error">
            <span class="help is-danger" v-if="!$v.email.email"
              >Email is invalid</span
            >
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label class="label has-text-grey has-text-weight-medium"
            >New Password</label
          >
          <input
            type="password"
            v-model="newPassword"
            class="input"
            placeholder="change password"
            @blur="$v.newPassword.$touch()"
          />
          <div v-if="$v.newPassword.$error">
            <span class="help is-danger" v-if="!$v.newPassword.minLength"
              >Password should be
              {{ $v.newPassword.$params.minLength.min }} characters
              minimum.</span
            >
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { minLength, email } from "vuelidate/lib/validators";
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
      email: this.user.email,
      newPassword: ""
    };
  },
  validations: {
    username: {
      minLength: minLength(5)
    },
    name: {
      minLength: minLength(5)
    },
    email: {
      email
    },
    newPassword: {
      minLength: minLength(8)
    }
  },
  methods: {
    emitUpdatedValues(val) {
      this.$store.dispatch("manage/user/SET_UPDATEDVALUES", val);
      this.$store.commit("manage/user/SET_ALLOWSAVE", !this.$v.$invalid);
    }
  },
  watch: {
    username(val) {
      this.emitUpdatedValues({ username: val });
    },
    name(val) {
      this.emitUpdatedValues({ name: val });
    },
    email(val) {
      this.emitUpdatedValues({ email: val });
    },
    newPassword(val) {
      this.emitUpdatedValues({ password: val });
    }
  }
};
</script>

<style lang="css" scoped>
.input {
  width: 65%;
}
</style>
