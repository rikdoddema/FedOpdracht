const API = 'https://jsonplaceholder.typicode.com/todos'
const myappcomponent = {
  data() {
    return {
      responsedata: {},
      id: '',
      name: '',
    }
  },
  methods: {
    async fetchApi() {
      await axios.get(API)
        .then((response) => {
          this.responsedata = response.data
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