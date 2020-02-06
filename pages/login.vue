<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="box">
              <figure class="image is-128x128 center-element">
                <img
                  src="https://image.flaticon.com/icons/svg/2052/2052688.svg"
                  alt=""
                />
              </figure>
              <h1 class="title has-text-grey has-text-centered">Login</h1>
              <p class="subtitle has-text-grey has-text-centered">
                Please login to proceed.
              </p>
              <form @submit.prevent="onSubmit">
                <div class="field">
                  <label class="subtitle" for="">Email</label>
                  <div class="control">
                    <input
                      type="text"
                      class="input is-medium"
                      placeholder="Enter your Email address"
                      v-model="email"
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
                  <label class="subtitle" for="">Password</label>
                  <div class="control">
                    <input
                      type="password"
                      class="input is-medium"
                      placeholder="Enter your password"
                      v-model="password"
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
                <button
                  type="submit"
                  class="button is-fullwidth is-link is-outlined"
                  :disabled="$v.$invalid"
                >
                  Login
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
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  middleware: 'isLoggedIn',
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("auth/LOGIN", {
        email: this.email,
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
