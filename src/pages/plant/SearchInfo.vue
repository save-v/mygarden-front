<template>
  <q-page>
    <q-form @submit="onSubmit()">

      <q-toolbar>
        <q-toolbar-title>
          <template v-if="$q.screen.gt.xs">Рослина: </template>{{data.name}}
        </q-toolbar-title>
      </q-toolbar>

      <q-separator></q-separator>

      <template>
        <div class="row">

          <div class="col-xs-12 col-sm-6 col-md-4">
            Категорія: {{data.Category ? data.Category.name : ''}}
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12">
            Назва: {{data.name}}
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12">
            Примітки: {{data.notes}}
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12">
            Створено: {{data.created_at}}
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12">
            Оновлено: {{data.updated_at}}
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12">
            Користувач: {{data.User ? data.User.name : ''}}
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12">
            Електронна пошта: {{data.User ? data.User.email : ''}}
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12">
            Телефон: {{data.User ? data.User.phone : ''}}
          </div>

        </div>
      </template>

    </q-form>
  </q-page>
</template>

<script>
import helpers from '../../utils/helpers'

export default {
  name: 'SearchInfo',
  mixins: [
    helpers
  ],
  props: {
    id: String
  },
  data () {
    return {
      data: {}
    }
  },
  methods: {
    async getData () {
      this.showLoading()

      try {
        const response = await this.$axios.get('/plant/' + this.id)
        this.data = response.data
        this.data.created_at = new Date(this.data.created_at).toLocaleDateString(undefined, { hour: 'numeric', minute: 'numeric' })
        this.data.updated_at = new Date(this.data.updated_at).toLocaleDateString(undefined, { hour: 'numeric', minute: 'numeric' })
      } catch (error) {
        console.log(error.response.data.message)
      }

      this.hideLoading()
    }
  },
  watch: {
    id: function () {
      this.getData()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
.row > div {
  padding: 10px 15px;
}
.row {
  font-size: 17px;
}
</style>
