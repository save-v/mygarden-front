<template>
  <q-page padding>

    <div class="q-pa-md">
      <h5 class="text-h5 text-black mt-0 mb-20">Зворотній зв'язок</h5>
      <p>Шановні Користувачі порталу!</p>
      <p>Через цей розділ Ви можете звернутися до адміністрації сайту з побажаннями або пропозиціями щодо роботи сайту. Всі Ваші пропозиції та зауваження будуть розглянуті Адміністрацією порталу, а найкращі пропозиції будуть втілені в життя!</p>
      <p>З повагою, Адміністрація</p>
      <br />
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
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
          type="textarea"
          label="Повідомлення *"
          color="black"
          v-model="message"
          clearable
          no-error-icon
          :rules="[ val => val && val.length > 16 || 'Повідомлення має містити щонайменше 16 символів']"
        >
          <template v-slot:prepend>
            <q-icon name="mail_outline" />
          </template>
        </q-input>

        <q-btn label="Відправити" type="submit" color="black" rounded />
      </q-form>
    </div>

  </q-page>
</template>

<script>
import { vEmail } from '../utils/validations'
import helpers from '../utils/helpers'
import auth from '../utils/add'

export default {
  name: 'Feedback',
  mixins: [
    helpers,
    auth
  ],
  data () {
    return {
      email: '',
      message: ''
    }
  },
  methods: {
    vEmail,
    async onSubmit () {
      this.showLoading()
      await this.sendMessage({ email: this.email, message: this.message })
      this.hideLoading()
      this.notify('Ваше повідомлення відправлено', 'green')
    },
    setFields () {
      this.email = this.$store.state.user.email
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
  async mounted () {
    this.setFields()
  }
}
</script>

<style scoped>
.mt-0 {
  margin-top: 0;
}
.mb-20 {
  margin-bottom: 20px;
}
p {
  font-size: 17px;
}
</style>
