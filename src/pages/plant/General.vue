<template>
  <q-page>
    <q-form @submit="onSubmit()">

      <q-toolbar>
        <q-toolbar-title><template v-if="$q.screen.gt.xs">Plant: </template>{{data.name}}</q-toolbar-title>
        <template v-if="!editMode">
          <q-btn label="Edit" color="black" rounded @click="editMode=true" v-if="$store.state.user" />
        </template>
        <template v-if="editMode">
          <q-btn label="Save" color="positive" rounded type="submit" />
          <q-btn label="Cancel" color="secondary" rounded @click="editMode=false; onReset()" class="q-ml-sm" v-if="!isNew" />
          <q-btn label="Reset" color="secondary" rounded @click="onReset()" class="q-ml-sm" v-if="isNew" />
        </template>
      </q-toolbar>

      <q-separator></q-separator>

      <template>
        <div class="row">

          <div class="col-xs-12 col-sm-6 col-md-4">
            <q-select
              filled
              v-model="data.category_id"
              label="Category"
              :options="categoryList"
              option-value="id"
              option-label="name"
              option-disable="inactive"
              emit-value
              map-options
              transition-show="flip-up"
              transition-hide="flip-down"
              :disable="!editMode"
            />
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-input
              filled
              v-model="data.name"
              label="Name *"
              :rules="[ val => val && val.length >= 8 || 'must be at least 8 characters' ]"
              :disable="!editMode"
            />
          </div>

          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-input
              filled
              type="textarea"
              v-model="data.notes"
              label="Notes"
              :disable="!editMode"
            />
          </div>

        </div>
      </template>

    </q-form>
  </q-page>
</template>

<script>
import helpers from '../../utils/helpers'

export default {
  name: 'General',
  mixins: [
    helpers
  ],
  props: {
    id: String
  },
  data () {
    return {
      editMode: false,
      data: {},
      initial_data: {},
      categoryList: []
    }
  },
  methods: {
    async onSubmit () {
      this.editMode = false
      this.showLoading()

      try {
        const result = await this.$axios.post('/plantSave/', this.data)
        if (this.isNew && result.data.id > 0) {
          this.$router.push('/plant/general/' + result.data.id)
        } else {
          this.getData()
        }
      } catch (error) {
        console.log(error.response.data.message)
      }

      this.hideLoading()
    },
    onReset () {
      this.data = JSON.parse(JSON.stringify(this.initial_data))
    },
    async getData () {
      this.editMode = this.isNew
      this.showLoading()

      this.$store.dispatch('getDictionary').then(() => {
        this.categoryList = this.$store.getters.dictionary.categoryList
      })

      if (!this.isNew) {
        try {
          const response = await this.$axios.get('/plant/' + this.id)
          this.data = response.data
          this.initial_data = JSON.parse(JSON.stringify(this.data))
        } catch (error) {
          console.log(error.response.data.message)
        }
      }

      this.hideLoading()
    }
  },
  computed: {
    isNew () {
      return this.id === 'new'
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
</style>
