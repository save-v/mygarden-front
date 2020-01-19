<template>
  <q-page padding>

    <div class="q-pa-md">
      <h5 class="text-h5 text-black mt-0">Profile</h5>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          disable
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
          disable
          filled
          label="Your name *"
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

        <q-btn label="Submit" type="submit" color="black" rounded disable />
      </q-form>
    </div>

  </q-page>
</template>

<script>
import { vEmail } from '../utils/validations'

export default {
  name: 'Profile',
  data () {
    return {
      email: '',
      message: ''
    }
  },
  methods: {
    vEmail,
    onSubmit () {
      // alert('onSubmit')
    }
  },
  async mounted () {
    this.email = this.$store.state.user.email
    this.name = this.$store.state.user.name
  }
}
</script>

<style scoped>
.mt-0 {
  margin-top: 0;
}
</style>
