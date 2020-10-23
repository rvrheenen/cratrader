const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

const http = require('http')
const app = require('express')()
const server = http.createServer(app)
const io = require('socket.io')(server)

const {
  Nuxt,
  Builder
} = require('nuxt')
// We instantiate Nuxt.js with the options
const config = require('../nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

// Listen the server
server.listen(port, '0.0.0.0')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console

// Socket.io
const orders = {
  sell: [],
  buy: [],
}
const performedTransactions = []

const processOrder = (order) => {
  order.price = parseFloat(order.price)
  order.size = parseFloat(order.size)
  let action = order.action;
  let otherAction = (action == "buy") ? "sell" : action;

  // logic that does actual selling
  let fulfilled = 0;
  if (action == 'buy') {
    for (let [i, otherOrder] of orders.sell.slice().reverse().entries()) {
      let remaining = order.size - fulfilled;
      if (remaining == 0) break;

      if (otherOrder.price <= order.price) {
        if (otherOrder.size >= remaining) {
          fulfilled += remaining;
          otherOrder.size -= remaining
          if (otherOrder.size == 0) {
            orders.sell.splice(orders.sell.length - 1 - i, 1)
          }
          processTransaction(order, remaining)
        } else {
          fulfilled += otherOrder.size;
          otherOrder.size = 0
          orders.sell.splice(orders.sell.length - 1 - i, 1)
          processTransaction(order, otherOrder.size)
        }
      } else {
        break;
      }
    }
  } else {
    for (let [i, otherOrder] of orders.buy.entries()) {
      let remaining = order.size - fulfilled
      if (remaining == 0) break;

      if (otherOrder.price >= order.price) {
        if (otherOrder.size >= remaining) {
          fulfilled += remaining;
          otherOrder.size -= remaining
          processTransaction(order, remaining)
        } else {
          fulfilled += otherOrder.size;
          otherOrder.size = 0
          processTransaction(order, otherOrder.size)
        }
      } else {
        break;
      }
    }
    orders.buy = orders.buy.filter(el => el.size > 0)
  }

  order.size -= fulfilled
  if (order.size > 0) {
    orders[order.action].push(order)
    orders[order.action].sort((o1, o2) => {
      return o2.price - o1.price
    })
  }

  return fulfilled;
}

const processTransaction = (order, amount) => {
  let transaction = {}
  Object.assign(transaction, order);
  // console.log
  transaction['amount'] = amount;
  performedTransactions.push(transaction)
  io.emit('addedTransaction', transaction)
}

io.on('connection', (socket) => {
  socket.on('addOrder', function (order) {
    let fulfilled = processOrder(order)
    socket.emit('addedOrder', {
      fulfilled: fulfilled
    })
    io.emit('updateOrders', orders)
  })

  socket.on('returnOrders', function () {
    socket.emit('updateOrders', orders)
  })

  socket.on('returnTransactions', function () {
    socket.emit('updateTransactions', performedTransactions)
  })


})
