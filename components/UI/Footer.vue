<template>
  <footer>
    <p>&copy; 2020 Rick van Rheenen</p>
  </footer>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $dark-color;
    color: $primary-color;
    padding: 0.4rem;
    p {
      margin-bottom: 0;
    }
  }
</style>