<template>
  <footer class="has-background-link">
    <div class="columns is-variable is-0">
      <div class="column">
        <h1 class="title is-4 has-text-weight-normal">COMPANY</h1>
        <nuxt-link
          to="#"
          class="has-text-weight-normal is-size-6 has-text-grey-light"
          >About</nuxt-link
        >
        <nuxt-link
          to="#"
          class="has-text-weight-normal is-size-6 has-text-grey-light"
          >Contact Us</nuxt-link
        >
        <nuxt-link
          to="#"
          class="has-text-weight-normal is-size-6 has-text-grey-light"
          >Career</nuxt-link
        >
        <nuxt-link
          to="#"
          class="has-text-weight-normal is-size-6 has-text-grey-light"
          >Terms & Services</nuxt-link
        >
        <nuxt-link
          to="#"
          class="has-text-weight-normal is-size-6 has-text-grey-light"
          >Our Community</nuxt-link
        >
      </div>
      <div class="column">
        <h1 class="title is-4 has-text-weight-normal">HELP</h1>
        <nuxt-link
          to="#"
          class="has-text-weight-normal is-size-6 has-text-grey-light"
          >Support</nuxt-link
        >
        <nuxt-link
          to="#"
          class="has-text-weight-normal is-size-6 has-text-grey-light"
          >FAQs</nuxt-link
        >
        <nuxt-link
          to="#"
          class="has-text-weight-normal is-size-6 has-text-grey-light"
          >Feedback</nuxt-link
        >
        <nuxt-link
          to="#"
          class="has-text-weight-normal is-size-6 has-text-grey-light"
          >Blog</nuxt-link
        >
      </div>
      <div class="column">
        <h1 class="title is-4 has-text-weight-normal">ADDRESS</h1>
        <p class="has-text-weight-normal is-size-6 has-text-grey-light">
          71 Plumb Branch Street Morristown, NJ 07960
        </p>
      </div>
      <div class="column">
        <h1 class="title is-4 has-text-weight-normal has-text-centered">
          Social
        </h1>
        <div class="icons">
          <nuxt-link to="#">
            <span class="icon fb has-text-white">
              <i class="fab fa-facebook-f"></i>
            </span>
          </nuxt-link>
          <nuxt-link to="#">
            <span class="icon twt has-text-white">
              <i class="fab fa-twitter"></i>
            </span>
          </nuxt-link>
          <nuxt-link to="#">
            <span class="icon ig has-text-white"
              ><i class="fab fa-instagram"></i>
            </span>
          </nuxt-link>
          <nuxt-link to="#">
            <span class="icon has-background-dark has-text-white">
              <i class="fab fa-github"></i>
            </span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom start">
        <h2 class="is-size-4 has-text-weight-normal has-text-grey-light">
          nuxt<strong>Chat</strong>
        </h2>
        <p class="has-text-weight-semibold is-size-6 has-text-dark">
          Copyright © 2010-2020
        </p>
      </div>
      <div class="bottom end">
        <nuxt-link to="#" class="has-text-weight-normal has-text-grey-lighter"
          >Terms & conditions</nuxt-link
        >
        <nuxt-link to="#" class="has-text-weight-normal has-text-grey-lighter"
          >Privacy policy</nuxt-link
        >
        <nuxt-link to="#" class="has-text-weight-normal has-text-grey-lighter"
          >Cookies policy</nuxt-link
        >
        <nuxt-link to="#" class="has-text-weight-normal has-text-grey-lighter"
          >Copyrights Notification</nuxt-link
        >
      </div>
    </div>
  </footer>
</template>

<style lang="css" scoped>
.bottom {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
}
a:hover {
  color: #fff !important;
}
.start {
  flex-grow: 1;
}
.start p {
  margin-left: 1rem;
}
.end a {
  font-size: 0.85rem;
  margin: 0 0.5rem;
}
footer {
  padding: 5rem 5rem 4rem 5rem;
}
h1 {
  margin-bottom: 2rem;
}
.column {
  display: flex;
  flex-direction: column;
}
.icon {
  padding: 1.5rem;
  border-radius: 3px;
}
.icon.fb {
  background: #3b5998;
}
.icon.twt {
  background: #55acee;
}
.icon.ig {
  background: #c32aa3;
}
.icons {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
}
.columns {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #b5b5b5;
}
</style>
