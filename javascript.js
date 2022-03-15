const API = 'https://api.adviceslip.com/advice'
const myappcomponent = {
  data() {
    return {
      responsedata: {},
      id: '',
      text: '',
    }
  },
  methods: {
    async fetchApi() {
      await axios.get(API)
        .then((response) => {
          this.responsedata = response.data
          this.id = response.data.slip.id,
            this.text = response.data.slip.advice
        })

        .catch((error) => {
          console.log(error)
        })

    }
  },
  mounted() {
    this.fetchApi()
  }

}

const myapp = Vue.createApp(myappcomponent).mount('#myapp')