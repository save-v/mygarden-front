export default {
  methods: {
    async saveProfile (data) {
      await this.$axios.post('/saveProfile', data).then(response => {
      //   // localStorage.setItem('token', response.data.accessToken)
      //   // this.$router.push('/')
      }).catch(errors => {
        this.notify(errors.response.data.reason)
      })
    },
    async sendMessage (data) {
      await this.$axios.post('/sendMessage', data).then(response => {
      //   // localStorage.setItem('token', response.data.accessToken)
      //   // this.$router.push('/')
      }).catch(errors => {
        this.notify(errors.response.data.reason)
      })
    }
  }
}
