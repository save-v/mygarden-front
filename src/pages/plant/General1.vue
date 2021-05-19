<template>
  <q-page>
    <div v-if="$route.params.id">
      <!-- <div v-for="item in data" v-bind:key="item.id" style="border-bottom: 2px solid black">
        {{item}}
      </div> -->
      <q-table
          flat
          :data="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          @row-click="onView"
        >
          <template v-slot:top>
            <!-- <q-btn icon="add" label="Add plant" color="black" rounded @click="onAdd" /> -->

            <q-space />
            <q-input borderless dense filled debounce="300" color="primary" clearable v-model="filter" style="width: 220px">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

      </q-table>
     <!-- <div v-if="!data.length">
        Not Found!
      </div>  -->
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
      data: [],
      filter: '',
      columns: [
        {
          name: 'category_id',
          label: 'Category',
          align: 'left',
          field: row => row.Category.name,
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
    async getData () {
      try {
        const response = await this.$axios.get('/catplants/' + this.$route.params.id)
        this.data = response.data
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    onView (evt, row) {
      this.$router.push('/plant/general/' + row.id)
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
