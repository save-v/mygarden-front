<template>
  <q-layout>
    <q-page-container>
      <q-page class=" bg-base-gingo_biloba window-width row justify-center items-center">
        <div class="column">
          <q-form @submit="onLogin">
            <div class="header text-center">
              <h5 class="text-h5 text-black q-my-md header-title" @click="onHome">Мій сад</h5>
            </div>
            <div class="row">
              <q-card class="q-pa-sm bg-base cnt">
                <div class="bg-base1 cnt opa"></div>
                <q-card-section>
                  <div class="q-pa-sm">
                    <div class="q-gutter-y-md column">

                      <q-input
                        placeholder="Електронна пошта"
                        color="black"
                        v-model="email"
                        clearable
                        no-error-icon
                        :rules="[
                          vEmail,
                          vRequired
                        ]"
                      >
                        <template v-slot:prepend>
                          <q-icon name="email" />
                        </template>
                      </q-input>

                      <q-input
                        :type="isPass ? 'password' : 'text'"
                        placeholder="Пароль"
                        color="black"
                        v-model="password"
                        clearable
                        no-error-icon
                        :rules="[
                          vRequired
                        ]"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isPass ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPass = !isPass"
                          />
                        </template>
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                      </q-input>

                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="text-center">
                  <q-btn
                    type="submit"
                    rounded
                    color="black"
                    text-color="white"
                    class="action-btn"
                    label="Увійти"
                  />
                </q-card-section>

                <q-card-section class="text-center q-pa-none">
                  <a href="#/registration" class="text-black">Реєстрація</a>
                </q-card-section>

              </q-card>
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { vEmail, vRequired } from '../utils/validations'
import helpers from '../utils/helpers'
import auth from '../utils/auth'

export default {
  name: 'Login',
  mixins: [
    helpers,
    auth
  ],
  data () {
    return {
      email: '',
      password: '',
      isPass: true
    }
  },
  methods: {
    vEmail,
    vRequired,
    onHome: function () {
      this.$router.push('/')
    },
    async onLogin () {
      this.showLoading()
      await this.login()
      this.hideLoading()
    }
  }
}
</script>

<style scoped src="../assets/css/auth.css" />
