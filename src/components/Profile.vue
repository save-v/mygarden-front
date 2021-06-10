<template>
  <q-page padding>

    <div class="q-pa-md">
      <h5 class="text-h5 text-black mt-0">Профіль</h5>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          disable
          filled
          label="Електронна пошта *"
          color="black"
          v-model="email"
          clearable
          no-error-icon
          :rules="[
            vEmail
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>

        <q-input
          filled
          label="Ім'я *"
          color="black"
          v-model="name"
          clearable
          no-error-icon
          :rules="[
            vRequired
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>

        <q-input
          filled
          label="Телефон *"
          color="black"
          v-model="phone"
          clearable
          no-error-icon
          :rules="[
            vRequired
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="account_circle" />
          </template>
        </q-input>

        <q-btn label="Зберегти" type="submit" color="black" rounded />
      </q-form>
    </div>

  </q-page>
</template>

<script>
import { vEmail, vRequired } from '../utils/validations'
import helpers from '../utils/helpers'
import auth from '../utils/add'

export default {
  name: 'Profile',
  mixins: [
    helpers,
    auth
  ],
  data () {
    return {
      email: '',
      name: '',
      phone: '',
      message: ''
    }
  },
  methods: {
    vEmail,
    vRequired,
    async onSubmit () {
      this.showLoading()
      await this.saveProfile({ name: this.name, phone: this.phone })
      this.hideLoading()
      this.notify('Ваш профіль збережено', 'green')
    },
    setFields () {
      this.email = this.$store.state.user.email
      this.name = this.$store.state.user.name
      this.phone = this.$store.state.user.phone
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    user (val) {
      if (val) {
        this.setFields()
      }
    }
  },
  mounted () {
    this.setFields()
  }
}
</script>

<style scoped>
.mt-0 {
  margin-top: 0;
}
</style>
