<template>
  <q-page padding>

    <div class="q-pa-md">
      <h5 class="text-h5 text-black mt-0">Feedback</h5>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          filled
          label="Your email *"
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
          label="Message *"
          color="black"
          v-model="message"
          clearable
          no-error-icon
          :rules="[ val => val && val.length > 16 || 'Message must be at least 16 characters']"
        >
          <template v-slot:prepend>
            <q-icon name="mail_outline" />
          </template>
        </q-input>

        <q-btn label="Submit" type="submit" color="primary" />
      </q-form>
    </div>

  </q-page>
</template>

<script>
import { vEmail } from '../utils/validations'

export default {
  name: 'Feedback',
  data () {
    return {
      email: '',
      message: ''
    }
  },
  methods: {
    vEmail,
    onSubmit () {
      alert('onSubmit')
    }
  },
  async mounted () {
    const email = this.$store.state.user.email
    if (email) {
      this.email = email
    }
  }
}
</script>

<style scoped>
.mt-0 {
  margin-top: 0;
}
</style>
