export default {
  methods: {
    async login () {
      let data = {
        email: this.email,
        password: this.password
      }
      await this.$axios.post('/auth/signin', data).then(response => {
        localStorage.setItem('token', response.data.accessToken)
        this.$router.push('/')
      }).catch(errors => {
        this.notify(errors.response.data.reason)
      })
    },
    async registration () {
      let data = {
        name: this.name,
        email: this.email,
        // roles: ['user', 'admin'], // при создании юзер получит группу 'user'
        password: this.password
      }
      await this.$axios.post('/auth/signup', data).then(response => {
        localStorage.setItem('token', response.data.accessToken)
        this.$router.push('/')
      }).catch(errors => {
        this.notify(errors.response.data.reason)
      })
    },
    async checkUser () {
      await this.$axios.get('/auth/access').then(response => {
        this.$store.commit('set', {
          name: 'user',
          value: response.data.user
        })
        // var user = this.$store.state.user.id
        // this.$socket.client.emit('user', user)
      }).catch(errors => {
        this.$store.commit('set', {
          name: 'user',
          value: false
          // value: errors // !!!
        })
      })
    },
    async logout () {
      localStorage.removeItem('token')
      this.$store.commit('set', {
        name: 'user',
        value: false
      })
    }
  }
}
