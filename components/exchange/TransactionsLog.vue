<template>
  <table class="table table-dark table-sm">
    <thead>
      <tr>
        <th>Time</th>
        <th>Pair</th>
        <th>Price</th>
        <th>Amount</th>
        <th>Total</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(transaction, i) in transactions"
        :key="i"
        :class="transaction.action + 'row'"
      >
        <td>{{ transaction.timestamp | formatDate }}</td>
        <td>{{ transaction.pair[0] }} {{ transaction.pair[1] }}</td>
        <td>{{ transaction.price }}</td>
        <td>{{ transaction.amount }}</td>
        <td>{{ transaction.size * transaction.price }}</td>
        <td>
          <font-awesome-icon
            :icon="transaction.action == 'sell' ? 'caret-down' : 'caret-up'"
          />
          {{ transaction.action }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import socket from "~/plugins/socket.io.js";
  import moment from "moment";
  export default {
    data() {
      return {
        transactions: [],
      };
    },
    methods: {},
    beforeMount() {
      socket.emit("returnTransactions");
      socket.on("updateTransactions", (transactions) => {
        this.transactions = transactions;
      });
      socket.on("addedTransaction", (transaction) => {
        this.transactions.push(transaction);
        this.$swal({
          toast: true,
          position: "top-end",
          timer: 2500,
          timerProgressBar: true,
          icon: "success",
          title: `${transaction.pair[0]} : ${transaction.pair[1]}`,
          text: `${transaction.action} ${transaction.amount}`,
        });
      });
    },
    filters: {
      formatDate: function (value) {
        if (value) {
          return moment.unix(String(value)).format("YYYY/MM/DD hh:mm:ss");
        }
      },
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