<template>
  <div>
    <template>
      <div>

        <q-drawer show-if-above behavior="desktop" side="left" bordered :width="250">
          <q-list>

            <q-item v-ripple clickable :to="{ name: 'SearchList', params: { id: 'all' } }">
              <q-item-section>
                <q-item-label>Всі категорії</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-ripple clickable v-for="item in categoryList" v-bind:key="item.id" :to="{ name: 'SearchList', params: { id: item.id } }">
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-drawer>

        <q-page style="padding:20px">
          <router-view />
        </q-page>

      </div>
    </template>
  </div>
</template>

<script>
import helpers from '../../utils/helpers'

export default {
  name: 'SearchMenu',
  mixins: [
    helpers
  ],
  data () {
    return {
      categoryList: {}
    }
  },
  mounted () {
    this.showLoading()
    this.$store.dispatch('getDictionary').then(() => {
      this.categoryList = this.$store.getters.dictionary.categoryList
      console.log(this.$store.getters.dictionary)
    })
    this.hideLoading()
  }
}

</script>
