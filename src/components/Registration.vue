<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-base-gingo_biloba bg-base window-width row justify-center items-center">
        <div class="column">
          <q-form @submit="onRegistration">
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
                        placeholder="Ім'я"
                        color="black"
                        v-model="name"
                        clearable
                        no-error-icon
                        :rules="[
                          vRequired
                        ]"
                      >
                        <template v-slot:prepend>
                          <q-icon name="account_box" />
                        </template>
                      </q-input>

                      <q-input
                        placeholder="Телефон"
                        color="black"
                        v-model="phone"
                        clearable
                        no-error-icon
                        :rules="[
                          vRequired
                        ]"
                      >
                        <template v-slot:prepend>
                          <q-icon name="phone" />
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
                          vRequired,
                          vPassLength
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

                      <q-input
                        :type="isRePass ? 'password' : 'text'"
                        placeholder="Повторний пароль"
                        color="black"
                        v-model="repassword"
                        clearable
                        no-error-icon
                        :rules="[
                          vRequired,
                          vPassLength,
                          val => val === password || 'Паролі не співпадають'
                        ]"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isRePass ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isRePass = !isRePass"
                          />
                        </template>
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                      </q-input>

                      <span class="text-center q-pa-none pt-10">
                      Я приймаю <a href="javascript:void(0)" class="text-black" @click="showTerms">Умови надання послуг</a>
                      <q-toggle
                        v-model="accept"
                        color="primary"
                        checked-icon="check"
                      />
                      </span>

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
                    label="Реєстрація"
                  />
                </q-card-section>

                <q-card-section class="text-center q-pa-none">
                  <a href="#/login" class="text-black">Увійти</a>
                </q-card-section>

              </q-card>
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>

    <terms :dialog="termsModal" @close="hideTerms"></terms>

  </q-layout>
</template>

<script>
import terms from './Terms'

import { vEmail, vRequired, vPassLength } from '../utils/validations'
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
      name: '',
      phone: '',
      password: '',
      repassword: '',
      isPass: true,
      isRePass: true,
      accept: false,
      termsModal: false
    }
  },
  components: {
    'terms': terms
  },
  methods: {
    vEmail,
    vRequired,
    vPassLength,
    onHome: function () {
      this.$router.push('/')
    },
    showTerms () {
      this.termsModal = true
    },
    hideTerms (accept) {
      this.termsModal = false
      this.accept = accept
    },
    async onRegistration () {
      if (!this.accept) {
        this.notify('Ви не прийняли умови ліцензії!')
      } else {
        this.showLoading()
        await this.registration()
        this.hideLoading()
      }
    }
  }
}
</script>

<style scoped src="../assets/css/auth.css" />
