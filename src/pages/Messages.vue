<template>
  <q-page>
      <div class="q-pa-md">

        <h5 class="text-h5 text-black q-my-md mt-0">Повідомлення від користувачів</h5>

        <q-table
          flat
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
        >
          <template v-slot:top>
            <q-input borderless dense filled debounce="300" color="primary" clearable v-model="filter" style="width: 220px">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

        </q-table>

      </div>
  </q-page>
</template>

<script>
import helpers from '../utils/helpers'

export default {
  name: 'Messages',
  mixins: [
    helpers
  ],
  data () {
    return {
      data: [],
      filter: '',
      columns: [
        {
          label: 'Дата',
          align: 'left',
          field: row => row.created_at,
          sortable: true
        },
        {
          label: 'Користувач',
          align: 'left',
          field: row => (row.User) ? row.User.name : '-',
          sortable: true
        },
        {
          label: 'Повідомлення',
          align: 'left',
          field: row => row.message,
          sortable: true
        },
        {
          label: 'Контактні дані',
          align: 'left',
          // field: row => row.email,
          field: row => row.email + ((row.User && row.email !== row.User.email) ? ', ' + row.User.email : '') + ((row.User) ? ', ' + row.User.phone : ''),
          sortable: true
        }
      ]
    }
  },
  async mounted () {
    this.tr()
    this.showLoading()
    try {
      const response = await this.$axios.get('/messages')
      this.data = response.data.map(item => {
        item.category_name = (item.Category) ? item.Category.name : ''
        item.created_at = new Date(item.created_at).toLocaleDateString(undefined, { hour: 'numeric', minute: 'numeric' })
        item.updated_at = new Date(item.updated_at).toLocaleDateString(undefined, { hour: 'numeric', minute: 'numeric' })
        return item
      })
    } catch (error) {
      console.log(error.response.data.message)
    }
    this.hideLoading()
  }
}
</script>

<style scoped>
.mt-0 {
  margin-top: 0 !important;
}
</style>
