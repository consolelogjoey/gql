<template>
  <div>
    <mapbox-marker @latlng="getLatlng" />
  </div>
</template>

<script>
import mapboxMarker from '~/components/mapbox/mapboxMarker.vue'

export default {
  components: { mapboxMarker },
  data: () => ({
    latlng: [],
  }),
  methods: {
    getLatlng(value) {
      this.latlng = value
      this.latlng = [value[1], value[0]]
      this.latlng = this.latlng.join(',')
      console.log('this.latlng:P :>> ', this.latlng)
    },
  },
}
</script>

<style>
</style>