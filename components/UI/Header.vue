<template>
  <header>
    <div class="logo">CRATRader</div>
    <ul>
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/exchange">Exchange</nuxt-link></li>
      <li><nuxt-link to="/about">About</nuxt-link></li>
    </ul>
  </header>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $dark-color;
    .logo {
      font-family: "Courier New", Courier, monospace;
      font-weight: 900;
      font-size: 1.6rem;
      color: $primary-color;
      padding: 0.4rem;
    }

    ul {
      list-style: None;
      display: flex;
      justify-content: center;
      flex-direction: row;
      margin: 0;

      li {
        padding: 0 0.6rem;
        a {
          color: white;
        }
      }
    }
  }
</style>