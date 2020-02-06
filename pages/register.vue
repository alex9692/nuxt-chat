<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="box">
              <figure class="image is-128x128 center-element">
                <img
                  src="https://image.flaticon.com/icons/svg/1265/1265427.svg"
                  alt=""
                />
              </figure>
              <h1 class="title has-text-grey has-text-centered">Register</h1>
              <p class="subtitle has-text-grey has-text-centered">
                Registering to this website, you accept our Terms of Use and our Privacy Policy.
              </p>
              <form @submit.prevent="onSubmit">
                <div class="field">
                  <label class="subtitle" for="">Username</label>
                  <div class="control">
                    <input
                      type="text"
                      class="input is-medium"
                      v-model="username"
                      placeholder="Enter username"
                      @blur="$v.username.$touch()"
                    />
                    <div v-if="$v.username.$dirty">
                      <span v-if="!$v.username.required" class="help is-danger"
                        >Username is required</span
                      >
                      <span v-if="!$v.username.minLength" class="help is-danger"
                        >Username should be
                        {{ $v.username.$params.minLength.min }} characters
                        minimum</span
                      >
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="subtitle" for="">Name</label>
                  <div class="control">
                    <input
                      type="text"
                      class="input is-medium"
                      v-model="name"
                      placeholder="Enter name"
                      @blur="$v.name.$touch()"
                    />
                    <div v-if="$v.name.$dirty">
                      <span v-if="!$v.name.required" class="help is-danger"
                        >Name is required</span
                      >
                      <span v-if="!$v.name.minLength" class="help is-danger"
                        >Name should be
                        {{ $v.name.$params.minLength.min }} characters
                        minimum</span
                      >
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="subtitle" for="">Email</label>
                  <div class="control">
                    <input
                      type="text"
                      class="input is-medium"
                      v-model="email"
                      placeholder="Enter email address"
                      @blur="$v.email.$touch()"
                    />
                    <div v-if="$v.email.$dirty">
                      <span v-if="!$v.email.required" class="help is-danger"
                        >Email is required</span
                      >
                      <span v-if="!$v.email.email" class="help is-danger"
                        >Email is invalid</span
                      >
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="subtitle" for="">Avatar</label>
                  <div class="control">
                    <input
                      type="text"
                      class="input is-medium"
                      v-model="avatar"
                      placeholder="Enter avatar url"
                      @blur="$v.avatar.$touch()"
                    />
                    <div v-if="$v.avatar.$dirty">
                      <span v-if="!$v.avatar.url" class="help is-danger"
                        >Url is invalid</span
                      >
                      <span
                        v-if="$v.avatar.url && !$v.avatar.supportedFileTypes"
                        class="help is-danger"
                        >Image not supported</span
                      >
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="subtitle" for="">Password</label>
                  <div class="control">
                    <input
                      type="password"
                      class="input is-medium"
                      v-model="password"
                      placeholder="Enter password"
                      @blur="$v.password.$touch()"
                    />
                    <div v-if="$v.password.$dirty">
                      <span v-if="!$v.password.required" class="help is-danger"
                        >Password is required</span
                      >
                      <span v-if="!$v.password.minLength" class="help is-danger"
                        >Password should be
                        {{ $v.password.$params.minLength.min }} characters
                        minimum</span
                      >
                    </div>
                  </div>
                </div>
                <div class="field">
                  <label class="subtitle" for="">Confirm Password</label>
                  <div class="control">
                    <input
                      type="password"
                      class="input is-medium"
                      v-model="confirmPassword"
                      placeholder="Enter confirmation password"
                      @blur="$v.confirmPassword.$touch()"
                    />
                    <div v-if="$v.confirmPassword.$dirty">
                      <span
                        v-if="!$v.confirmPassword.required"
                        class="help is-danger"
                        >Confirmation Password is required</span
                      >
                      <span
                        v-if="
                          $v.confirmPassword.required &&
                            !$v.confirmPassword.sameAs
                        "
                        class="help is-danger"
                        >Passwords do not match</span
                      >
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  class="button is-fullwidth is-link is-outlined"
                  :disabled="$v.$invalid"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  minLength,
  required,
  email,
  sameAs,
  url
} from "vuelidate/lib/validators";
import { supportedFileTypes } from "~/helpers/supportedFileType";
export default {
  middleware: "isLoggedIn",
  data() {
    return {
      username: "",
      name: "",
      email: "",
      avatar: "",
      password: "",
      confirmPassword: ""
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(5)
    },
    name: {
      required,
      minLength: minLength(5)
    },
    email: {
      email,
      required
    },
    avatar: {
      url,
      supportedFileTypes
    },
    password: {
      required,
      minLength: minLength(8)
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password")
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("auth/REGISTER", {
        username: this.username,
        name: this.name,
        email: this.email,
        avatar: this.avatar,
        password: this.password
      });
    }
  }
};
</script>

<style scoped>
.hero-body {
  justify-content: center;
}
.image {
  margin: 0 auto;
  margin-top: -70px;
  margin-bottom: 20px;
}
.image img {
  background-color: #fff;
  padding: 1.5rem;
  /* -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1); */
}
form > button {
  margin-top: 1.5rem;
}
.box > p {
  padding-bottom: 2rem;
}
</style>
