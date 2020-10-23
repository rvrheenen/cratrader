<template>
  <div v-if="currency != null" class="card">
    <div class="card-header">
      <h4>
        {{ currency.name }} <span class="shy">{{ currency.short }}</span>
      </h4>
    </div>

    <div class="card-body">
      <label for="buy">{{ mode | capitalize }} {{ currency.name }}</label>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Price</span>
        </div>

        <input
          type="number"
          class="form-control"
          placeholder=""
          aria-label="buy"
          aria-describedby="basic-addon1"
          v-model="price"
        />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">USD</span>
        </div>
        <!-- <button class="btn btn-secondary ml-1" @click="fillMax">Max</button> -->
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon2">Amount</span>
        </div>

        <input
          type="number"
          class="form-control"
          placeholder=""
          aria-label="buy"
          aria-describedby="basic-addon2"
          v-model="amount"
        />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon4">{{
            currency.short
          }}</span>
        </div>
        <!-- <button class="btn btn-secondary ml-1" @click="fillMax">Max</button> -->
      </div>

      <button class="btn btn-primary btn-success w-100" @click="purchase">
        <font-awesome-icon :icon="mode == 'buy' ? 'plus' : 'minus'" />
        {{ mode | capitalize }}
      </button>
    </div>
  </div>
</template>

<script>
  import socket from "~/plugins/socket.io.js";
  import { mapGetters } from "vuex";

  export default {
    props: {
      mode: {
        type: String,
      },
      currency: {
        type: Object,
      },
    },
    data() {
      return {
        price: 0,
        amount: 0,
      };
    },
    methods: {
      fillMax() {
        if (this.mode == "buy") {
          this.amount =
            Math.floor((this.money / this.currency.price) * 10000) / 10000;
        } else {
          this.amount = this.currency.owned;
        }
      },
      purchase() {
        let payload = {
          price: this.price,
          size: this.amount,
          pair: ["USD", this.currency.short],
          action: this.mode,
        };
        socket.emit("addOrder", payload);
      },
    },
    mounted() {},
  };
</script>

<style lang="scss" scoped>
  .card {
    .card-header {
      text-align: center;
      padding: 0;
      .shy {
        font-size: 60%;
        opacity: 0.7;
      }
    }
  }
</style>