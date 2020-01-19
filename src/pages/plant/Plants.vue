<template>
  <q-page>
      <div class="q-pa-md">

        <h5 class="text-h5 text-black q-my-md mt-0">My Plants</h5>

        <q-table
          flat
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          @row-click="onView"
        >
          <template v-slot:top>
            <q-btn icon="add" label="Add plant" color="black" rounded @click="onAdd" />

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
  name: 'Plants',
  mixins: [
    helpers
  ],
  data () {
    return {
      data: [],
      filter: '',
      columns: [
        {
          name: 'category_id',
          label: 'Category',
          align: 'left',
          field: row => row.category_name,
          sortable: true
        },
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'notes',
          label: 'Notes',
          align: 'left',
          field: row => row.notes,
          sortable: true
        },
        {
          name: 'created_at',
          label: 'Created',
          align: 'left',
          field: row => row.created_at,
          sortable: true
        },
        {
          name: 'updated_at',
          label: 'Updated',
          align: 'left',
          field: row => row.updated_at,
          sortable: true
        },
        {
          name: 'user_id',
          label: 'User',
          align: 'left',
          field: row => row.User.name,
          sortable: true
        }
      ]
    }
  },
  methods: {
    onView (evt, row) {
      this.$router.push('/plant/general/' + row.id)
    },
    onAdd () {
      this.$router.push('/plant/general/new')
    }
  },
  async mounted () {
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
