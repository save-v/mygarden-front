<template>
  <q-page>
    <div v-if="$route.params.id">
      <q-table
          flat
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          @row-click="onView"
          class="test"
        >
          <template v-slot:top>
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
  name: 'SearchList',
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
          field: row => row.Category.name,
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
          label: 'Користувач',
          align: 'left',
          field: row => row.User.name,
          sortable: true
        }
      ]
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
    },
    onView (evt, row) {
      this.$router.push('/cat/info/' + row.id)
    }
  },
  watch: {
    $route (to, from) {
      this.getData()
    }
  },
  async mounted () {
    this.tr()
    this.getData()
  }
}
</script>
