<template>
  <div>
   <mapbox-display-one :latlng_org="latlng_org" />
  </div>
</template>

<script>
import MapboxDisplayOne from '~/components/mapbox/mapboxDisplayOne.vue'
export default {
  components: {MapboxDisplayOne  },
  data: () => ({
    latlng_org: [102.6160342, 17.9699722],
  }),
  
}
</script>

<style>

</style>