<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-black">

      <q-toolbar>
        <a href="/#/">
          <img class="header-logo" src="../statics/logo_white.png" />
        </a>
        <q-toolbar-title>
          MyGarden
        </q-toolbar-title>
        <div>
          <template v-if="!$store.state.user">
            <q-btn rounded color="black" text-color="white" label="Sign In" :to="{ name: 'Login'}" class="ml-10"></q-btn>
            <q-btn rounded color="black" text-color="white" label="Registration" :to="{ name: 'Registration'}" class="ml-10"></q-btn>
          </template>
          <template v-else>
            <q-btn rounded color="black" text-color="white" :label="$store.state.user.email" icon="account_circle" :to="{ name: 'Profile'}" class="ml-10 ttn"></q-btn>
            <q-btn rounded color="black" text-color="white" :label="($q.screen.gt.xs)?'LogOut':''" icon="exit_to_app" v-on:click="onLogout" class="ml-10"></q-btn>
          </template>
        </div>
      </q-toolbar>

      <q-tabs
        v-model="tab"
        inline-label
        class="bg-base text-black shadow-2"
      >
        <!-- <q-route-tab name="search" icon="search" label="Global Search" :to="{ name: 'Search'}" /> -->
        <q-route-tab name="search" icon="search" label="Global Search" :to="{ name: 'General1', params: { id: 'all' } }" />
        <q-route-tab v-if="$store.state.user" name="list" icon="list" label="My Plants" :to="{ name: 'Plants'}" />
        <q-route-tab name="feedback" icon="mail" label="Feedback" :to="{ name: 'Feedback'}" />
        <q-route-tab name="about" icon="help_outline" label="About" :to="{ name: 'About'}" />
      </q-tabs>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import helpers from '../utils/helpers'
import auth from '../utils/auth'

export default {
  name: 'AppLayout',
  mixins: [
    helpers,
    auth
  ],
  data () {
    return {
      tab: 'list'
    }
  },
  methods: {
    async onLogout () {
      this.showLoading()
      await this.logout()
      this.$router.push('/')
      this.hideLoading()
    }
  },
  async mounted () {
    this.showLoading()
    await this.checkUser()
    this.hideLoading()
  }
}
</script>

<style scoped>
.header-logo {
  width: 32px;
  height: 32px;
  margin-top: 0px;
}
.bg-base {
  background: #f0c755;
}
.ml-10 {
  margin-left: 10px;
}
.ttn {
  text-transform: none;
}
</style>
