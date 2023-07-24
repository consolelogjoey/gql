
<template>
<div>
  <div id="map"></div>
  
</div>

</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  data() {
    return {
      loading: false,
      zoom: 12,
      map: {},
      marker: '',
      // locations: [102.6260342, 17.9699722],
      accessToken: "YOUR_ACCESS_TOKEN",
      latlng: this.locations,
    }
  },
  props: {
    locations: {
      type: Array,
      default: () => [102.6260342, 17.9699722],
    },
    height: {
      type: String,
      default: '100vh',
    },
  },
  // computed: {
  //   // centerPoint() {
  //   //   // console.log(' this.locations  :>> ', this.locations)
  //   //   return this.locations
  //   // },
  // },

  methods: {
    createMap() {
      mapboxgl.accessToken = this.accessToken
      const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: this.locations,
        zoom: this.zoom,
      })
      map.on('load', () => {
        let clickCounter = 0

        // create a marker object
        // console.log('this.locations :>> ', this.locations)
        const marker = new mapboxgl.Marker({
          color: '#D80739',
        })
          .setLngLat(this.locations)
          .addTo(map)

        // add the marker to the map
        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          }),
          'bottom-right'
        )

        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav, 'top-left')

        map.on('click', (e) => {
          if (clickCounter < 10) {
            this.latlng = [e.lngLat.lng, e.lngLat.lat]
            marker.setLngLat(this.latlng)
            clickCounter += 1
            this.$emit('latlng', this.latlng)
            // console.log('this.latlng :>> ', this.latlng);
          }
        })
      })
    },
    // props: {
    //   getLatlng: Function,
    // },
  },
  created() {
    // this.createMap()
  },
  mounted() {
    this.createMap()
    setTimeout(() => {
      this.createMap()
    }, 500)
  },
}
</script>

<style scoped>
#map {
  width: 100%;
  height: v-bind('height');
}
</style>