<template>
  <div>
    <h1 class="my-6">
      {{ $t('welcome') }}
    </h1>
    
    <v-switch @click="changeLanguage" v-model="dark" :label="label_lang" inset></v-switch>
  </div>
</template>

<script>
const Swal = require('sweetalert2')
export default {
  name: 'IndexPage',
  data: () => ({
    dark: false,
    locale: '',
    Language: 'Language',
  }),
  computed: {
    label_lang() {
      return this.$i18n.locale === 'en' ? 'English' : 'ລາວ'
    },
  },
  methods: {
    changeLanguage() {
      const Clang = this.dark ? 'en' : 'la'
      localStorage.setItem('lang', Clang)
      // console.log("localStorage.getItem :>> ", localStorage.getItem("lang"));
      const lang = localStorage.getItem('lang')
      this.$i18n.locale = lang
      Swal.fire({
        icon: 'success',
        title: 'Language changed',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // window.location.reload()
      })
    },
    checkLanguage() {
      const locale = localStorage.getItem('lang')
      this.$i18n.locale = locale
      if (locale === 'la') {
        this.dark = false
      } else {
        this.dark = true
      }
    },
  },
  mounted() {
    this.checkLanguage()
  },
}
</script>
