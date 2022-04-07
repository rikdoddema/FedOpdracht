const API = 'https://api2.binance.com/api/v3/ticker/24hr'
const myappcomponent = {

  data() {
    return {
      coins: {},
      tempCoins: {},
      sortOrder: "Standaard",
      searchValue: "",
    }
  },

  watch: {
    coins() {
      this.tempCoins = this.coins.filter((coin) => {
        coin.priceChangePercent = coin.priceChangePercent.substr(0, coin.priceChangePercent.length - 2);
        coin.lastPrice = coin.lastPrice.substr(0, coin.lastPrice.length - 5);
        coin.highPrice = coin.highPrice.substr(0, coin.highPrice.length - 5);
        coin.lowPrice = coin.lowPrice.substr(0, coin.lowPrice.length - 5);
        coin.quoteVolume = coin.quoteVolume.substr(0, coin.quoteVolume.length - 3);
        return coin.symbol.includes("USDT") && (coin.quoteVolume > 0);

      })
    }
  },

  computed: {
    orderedListOptions: function () {
      return {
        "Standaard": () => { return this.tempCoins },
        "Stijgers 24u": () => { return this.tempCoins.slice().sort((a, b) => b.priceChangePercent - a.priceChangePercent) },
        "Dalers 24u": () => { return this.tempCoins.slice().sort((a, b) => a.priceChangePercent - b.priceChangePercent) },
        "Meeste Volume": () => { return this.tempCoins.slice().sort((a, b) => b.quoteVolume - a.quoteVolume) },
        "Hoogste prijs": () => { return this.tempCoins.slice().sort((a, b) => b.lastPrice - a.lastPrice) },
      }
    },
  },

  methods: {
    async fetchApi() {
      await axios.get(API)
        .then((response) => {
          this.coins = response.data
          setTimeout(this.fetchApi, 4000);
        })
        .catch((error) => {
          console.log(error)
        });

    },
    sort: function (sortOrder) {
      return this.orderedListOptions[sortOrder]()
    },
    submit() {
      if (this.searchValue != '' && this.searchValue) {
        this.tempCoins = this.coins.filter((coin) => {
          return coin.symbol
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        })
      }

    }
  },
  mounted() {
    this.fetchApi()
  },

}


const myapp = Vue.createApp(myappcomponent).mount('#myapp')