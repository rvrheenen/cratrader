<template>
  <table class="table table-dark table-sm">
    <thead>
      <tr>
        <th>Pair</th>
        <th>Price</th>
        <th>Size</th>
        <th>Total</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, i) in orders.sell" :key="'sell_' + i" class="sellrow">
        <td>{{ order.pair[0] }} {{ order.pair[1] }}</td>
        <td>{{ order.price }}</td>
        <td>{{ order.size }}</td>
        <td>{{ order.size * order.price }}</td>
        <td>
          <font-awesome-icon icon="caret-down" :style="{ color: 'red' }" />
          {{ order.action }}
        </td>
      </tr>
      <tr v-for="(order, i) in orders.buy" :key="'buy_' + i" class="buyrow">
        <td>{{ order.pair[0] }} / {{ order.pair[1] }}</td>
        <td>{{ order.price }}</td>
        <td>{{ order.size }}</td>
        <td>{{ order.size * order.price }}</td>
        <td>
          <font-awesome-icon icon="caret-up" :style="{ color: 'green' }" />
          {{ order.action }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import socket from "~/plugins/socket.io.js";
  export default {
    data() {
      return {
        orders: {},
      };
    },
    methods: {},
    beforeMount() {
      socket.emit("returnOrders");
      socket.on("updateOrders", (orders) => {
        this.orders = orders;
      });
    },
  };
</script>

<style lang="scss" scoped>
  table {
    .sellrow {
      color: red;
    }
    .buyrow {
      color: limegreen;
    }
  }
</style>