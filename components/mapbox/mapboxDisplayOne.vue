<template>
  <div>
    <div id="map"></div>
    <!-- {{ latlng_org }} -->
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

export default {
  props: {
    latlng_org: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      load: true,
      data: [],
      zoom: 14,
      description: '',
      map: {},
      marker: '',
      locations: [17.9699722, 102.6260342],
      accessToken:
      "YOUR_ACCESS_TOKEN",
      latlng: this.locations,
      //   latlng: '13.736717,100.523186',
    }
  },
  methods: {
    async createMap() {
      mapboxgl.accessToken = this.accessToken
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: this.latlng_org,
        zoom: this.zoom,
      })

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
        'bottom-right'
      )

      const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(this.latlng_org)
        .addTo(map)

      marker.getElement().addEventListener('click', () => {
        map.flyTo({
          center: this.latlng_org,
          essential: true,
        })
      })
    },
  },
  created() {
    
  },
  beforeMount() {
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
  width: 98%;
  height: 100vh;
  border-radius: 10px;
}

#box {
  position: absolute;
  top: 0;
  left: 10;
}
#center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

