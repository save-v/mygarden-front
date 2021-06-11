<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-black">

      <q-toolbar>
        <a href="/#/">
          <img class="header-logo" src="../statics/logo_white.png" />
        </a>
        <q-toolbar-title>
          Мій сад
        </q-toolbar-title>
        <div>
          <template v-if="!$store.state.user">
            <q-btn rounded color="black" text-color="white" label="Увійти" :to="{ name: 'Login'}" class="ml-10"></q-btn>
            <q-btn rounded color="black" text-color="white" label="Реєстрація" :to="{ name: 'Registration'}" class="ml-10"></q-btn>
          </template>
          <template v-else>
            <q-btn rounded color="black" text-color="white" :label="$store.state.user.email" icon="account_circle" :to="{ name: 'Profile'}" class="ml-10 ttn">
              <q-badge color="red" floating transparent>
                {{roles_title.join('/')}}
              </q-badge>
            </q-btn>
            <q-btn rounded color="black" text-color="white" :label="($q.screen.gt.xs)?'Вийти':''" icon="exit_to_app" v-on:click="onLogout" class="ml-10"></q-btn>
          </template>
        </div>
      </q-toolbar>

      <q-tabs
        v-model="tab"
        inline-label
        class="bg-base text-black shadow-2"
      >
        <q-route-tab name="search" icon="search" label="Пошук" :to="{ name: 'SearchList', params: { id: 'all' } }" />
        <q-route-tab v-if="$store.state.user && !roles.includes('admin')" name="list" icon="list" label="Мої рослини" :to="{ name: 'MyList'}" />
        <q-route-tab v-if="!roles.includes('admin')" name="feedback" icon="mail" label="Зворотній зв'язок" :to="{ name: 'Feedback'}" />
        <q-route-tab v-if="roles.includes('admin')" name="users" icon="account_circle" label="Користувачі" :to="{ name: 'Users'}" />
        <q-route-tab v-if="roles.includes('admin')" name="messages" icon="mail" label="Повідомлення" :to="{ name: 'Messages'}" />
        <q-route-tab name="about" icon="help_outline" label="Про проект" :to="{ name: 'About'}" />
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
  computed: {
    roles () {
      return (this.$store.state.user) ? this.$store.state.user.roles.map(t => t.name) : []
    },
    roles_title () {
      return (this.$store.state.user) ? this.$store.state.user.roles.map(t => t.title) : []
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
  /* background: #12ff6f; */
  background: #4caf50;
  /* background: url("../statics/map.png") repeat-x; */
}
.ml-10 {
  margin-left: 10px;
}
.ttn {
  text-transform: none;
}
</style>

<style>
.q-table tbody td{
  white-space: pre-line;
}
</style>
