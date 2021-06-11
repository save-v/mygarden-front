<template>
  <q-page>
      <div class="q-pa-md">

        <h5 class="text-h5 text-black q-my-md mt-0">Мої рослини</h5>

        <q-table
          flat
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          @row-click="onView"
        >
          <template v-slot:top>
            <q-btn icon="add" label="Додати рослину" color="black" rounded @click="onAdd" />

            <q-space />
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
import helpers from '../../utils/helpers'

export default {
  name: 'MyList',
  mixins: [
    helpers
  ],
  data () {
    return {
      data: [],
      filter: '',
      columns: [
        {
          label: 'Категорія',
          align: 'left',
          field: row => row.category_name,
          sortable: true
        },
        {
          label: 'Назва',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        {
          label: 'Примітки',
          align: 'left',
          field: row => row.notes,
          sortable: true
        },
        {
          label: 'Створено',
          align: 'left',
          field: row => row.created_at,
          sortable: true
        },
        {
          label: 'Оновлено',
          align: 'left',
          field: row => row.updated_at,
          sortable: true
        }
      ]
    }
  },
  methods: {
    onView (evt, row) {
      this.$router.push('/plant/info/' + row.id)
    },
    onAdd () {
      this.$router.push('/plant/info/new')
    }
  },
  async mounted () {
    this.tr()
    this.showLoading()
    try {
      const response = await this.$axios.get('/plants')
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
