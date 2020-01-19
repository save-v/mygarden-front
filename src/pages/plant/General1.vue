<template>
  <q-page>
    Test {{ $route.params.id }}
    !!!{{data}}!!!
  </q-page>
</template>

<script>
export default {
  name: 'General1',
  data () {
    return {
      data: {}
    }
  },
  async mounted () {
    try {
      const response = await this.$axios.get('/catplants/' + this.$route.params.id)
      this.data = response.data
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
}
</script>
