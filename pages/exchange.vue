<template>
  <div class="container">
    <section id="main">
      <h1>Exchange</h1>
      <div class="trade-cards">
        <TradeCard mode="buy" :currency="currency" />
        <TradeCard mode="sell" :currency="currency" />
      </div>
      <OrderBook />
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currency: {
          name: "Bitcoin",
          short: "BTC",
        },
      };
    },
  };
</script>

<style lang="scss" scoped>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .trade-cards {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      flex-direction: row;
      margin-bottom: 2rem;

      @media (max-width: 767px) {
        flex-direction: column;
        > * {
          margin: 0 auto;
        }
        & > :first-child {
          margin-bottom: 1rem;
        }
      }
    }
  }
</style>