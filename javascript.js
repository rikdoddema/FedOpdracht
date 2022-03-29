const API = 'https://api2.binance.com/api/v3/ticker/24hr'
const myappcomponent = {

  data() {
    return {
      coins: {},
      tempCoins: {}
    }
  },

  methods: {
    async fetchApi() {
      await axios.get(API)
        .then((response) => {
          this.coins = response.data

          let tempCoins = this.coins;

          tempCoins.map((coin) => {

            if (coin.lastPrice.length > 8) {
              coin.lastPrice = coin.lastPrice.substr(0, coin.lastPrice.length - 2);
            }
          })

        })
        .catch((error) => {
          console.log(error)
        });
      setTimeout(this.fetchApi, 5000);
    },

  },

  mounted() {
    this.fetchApi()
  },

}


const myapp = Vue.createApp(myappcomponent).mount('#myapp')