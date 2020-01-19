<template>
  <q-page>
    <div v-if="$route.params.id">
      <div v-for="item in data" v-bind:key="item.id" style="border-bottom: 2px solid black">
        {{item}}
      </div>
      <div v-if="!data.length">
        Not Found!
      </div>
    </div>
    <div v-else>
      News...
    </div>
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
  methods: {
    async getData () {
      try {
        const response = await this.$axios.get('/catplants/' + this.$route.params.id)
        this.data = response.data
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  },
  watch: {
    $route (to, from) {
      this.getData()
    }
  },
  async mounted () {
    this.getData()
  }
}
</script>
