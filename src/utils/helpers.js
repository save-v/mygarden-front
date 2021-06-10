import { QSpinnerFacebook } from 'quasar'

export default {
  methods: {
    notify: function (message, color = 'negative') {
      if (message) {
        if (typeof this.lastNotification === 'function') {
          this.lastNotification()
        }
        this.lastNotification = this.$q.notify({
          color: color,
          textColor: 'white',
          icon: 'info',
          message: message,
          position: 'top',
          timeout: 1500
        })
      }
    },
    showLoading () {
      const spinner = typeof QSpinnerFacebook !== 'undefined' ? QSpinnerFacebook : Quasar.components.QSpinnerFacebook // eslint-disable-line
      // const spinner = Quasar.components.QSpinnerFacebook // eslint-disable-line

      this.$q.loading.show({
        spinner,
        spinnerColor: 'black' // ,
        // spinnerSize: 100,
        // backgroundColor: 'black',
        // message: 'Loading...',
        // messageColor: 'black'
      })

      // hiding in 3s
      // this.timer = setTimeout(() => {
      //   this.$q.loading.hide()
      //   this.timer = void 0
      // }, 1000)
    },
    hideLoading () {
      /* This is for Codepen (using UMD) to work */
      // const spinner = typeof QSpinnerFacebook !== 'undefined'
      //   ? QSpinnerFacebook // Non-UMD, imported above
      //   : Quasar.components.QSpinnerFacebook // eslint-disable-line
      /* End of Codepen workaround */

      // this.$q.loading.show({
      //   spinner,
      //   spinnerColor: 'black',
      //   spinnerSize: 140,
      //   backgroundColor: 'black',
      //   message: 'Some important process is in progress. Hang on...',
      //   messageColor: 'black'
      // })

      // hiding in 3s
      // this.timer = setTimeout(() => {
      this.$q.loading.hide()
      // this.timer = void 0
      // }, 1000)
    },
    tr () {
      this.$q.lang.table.noData = 'Дані відсутні'
      this.$q.lang.table.noResults = 'Відповідних записів не знайдено'
      this.$q.lang.table.loading = 'Завантаження...'
      this.$q.lang.table.selectedRecords = function (rows) {
        return rows === 1
          ? '1 запис вибрано.'
          : (rows === 0 ? 'Немає' : rows) + ' записів вибрано.'
      }
      this.$q.lang.table.recordsPerPage = 'Записів на сторінці:'
      this.$q.lang.table.allRows = 'Всі'
      this.$q.lang.table.pagination = function (start, end, total) {
        return start + '-' + end + ' з ' + total
      }
      this.$q.lang.table.columns = 'Стовпці'
    }
  }
}
