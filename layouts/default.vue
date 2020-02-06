<template>
  <div class="grid-main">
    <header class="grid-main-hd ">
      <Header></Header>
    </header>
    <main class="grid-main-main">
      <nuxt />
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

  <script>
import Header from "~/components/Shared/Header";
import Footer from "~/components/Shared/Footer";
export default {
  components: { Header, Footer }
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.grid-main {
  display: grid;
  min-height: 100vh;
  grid-template-rows: [hd-start] 112px [hd-end main-start] 1fr [main-end ft-start] auto [ft-end];
}

.grid-main-hd {
  grid-row: hd;
}

.grid-main-main {
  grid-row: main;
}

.grid-main-ft {
  grid-row: ft;
}
</style>
