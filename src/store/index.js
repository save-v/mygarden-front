import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state: {
      user: false,
      dictionaryLoaded: false,
      categoryList: []
    },
    mutations: {
      set (state, { name, value }) {
        Vue.set(state, name, value)
      }
    },
    getters: {
      dictionary: state => {
        return {
          categoryList: state.categoryList
        }
      }
    },
    actions: {
      getDictionary ({ commit }) {
        if (!this.dictionaryLoaded) {
          return Vue.prototype.$axios.get('/dictionary', {})
            .then(response => {
              commit('set', { name: 'categoryList', value: response.data.categoryList })
              commit('set', { name: 'dictionaryLoaded', value: true })
            }, error => {
              if (error.status === 400) {
                commit('set', { name: 'dictionaryLoaded', value: false })
              }
            })
        } else {
          return new Promise((resolve, reject) => { resolve() })
        }
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
