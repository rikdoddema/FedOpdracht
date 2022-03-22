const API = 'https://api2.binance.com/api/v3/ticker/24hr'
const myappcomponent = {
  data() {
    return {
      coins: {},
      symbol: '',
    }
  },


  methods: {
    async fetchApi() {
      await axios.get(API)
        .then((response) => {
          this.coins = response.data
          //location.reload();
        })
        .catch((error) => {
          console.log(error)
        })

    }
  },

  mounted() {
    this.fetchApi()
  },

}


const myapp = Vue.createApp(myappcomponent).mount('#myapp')