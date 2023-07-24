<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer color="white" :absolute="false" app>
      <span><b>{{ credit }} </b></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      credit:"​ZOYBAD14xx"
    }
  }
}
</script>


<style scoped>

</style>