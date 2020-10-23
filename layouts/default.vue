<template>
  <div class="default-layout">
    <div class="layout-header">
      <Header />
    </div>
    <div class="layout_content">
      <nuxt />
    </div>
    <div class="layout_footer">
      <Footer />
    </div>
  </div>
</template>
<script>
</script>

<style lang="scss">
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html,
  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  .default-layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .layout_header,
    .layout_content {
      flex: 1 0 auto;
    }

    .layout_footer {
      flex-shrink: 0;
    }
  }
</style>
