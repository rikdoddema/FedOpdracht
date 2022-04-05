const API = 'https://api2.binance.com/api/v3/ticker/24hr'
const myappcomponent = {

  data() {
    return {
      coins: {},
      tempCoins: {},
      sortOrder: "Popularity",
    }
  },

  watch: {
    coins() {
      this.tempCoins = this.coins.filter((coin) => {
        coin.priceChangePercent = coin.priceChangePercent.substr(0, 5);
        coin.lastPrice = coin.lastPrice.substr(0, coin.lastPrice.length - 6);
        coin.highPrice = coin.highPrice.substr(0, coin.highPrice.length - 6);
        coin.lowPrice = coin.lowPrice.substr(0, coin.lowPrice.length - 6);
        return (coin.quoteVolume > 100000000);
      })
    }
  },

  computed: {
    orderedListOptions: function () {
      return {
        "Popularity": () => { return this.coins },
        "A tot Z": () => { return this.coins.slice().sort() },
        "Z tot A": () => { return this.coins.slice().sort().reverse() },
      }
    },
  },

  methods: {
    async fetchApi() {
      await axios.get(API)
        .then((response) => {
          this.coins = response.data
        })

        .catch((error) => {
          console.log(error)
        });
      setTimeout(this.fetchApi, 4000);
    },

    methods: {
      sort: function (sortOrder) {
        return this.orderedListOptions[sortOrder]()
      }
    }

  },

  mounted() {
    this.fetchApi()
  },

}


const myapp = Vue.createApp(myappcomponent).mount('#myapp')