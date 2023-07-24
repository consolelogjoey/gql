<template>
  <div>
    <div id="map"></div>
    <br />
    <div class="mt-6 ml-4" id="box">
      <v-card class="my-4 rounded-xl" elevation="0">
        <v-row>
          <v-col cols="12">
            <v-row v-for="(x, index) in details" :key="index" class="mx-2">
              <v-col cols="2">
                <v-icon :color="x.color"> mdi-map-marker </v-icon>
              </v-col>
              <v-col>
                <h4>{{ x.title }}</h4>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
// import { getStorage, ref, getDownloadURL } from 'firebase/storage'

export default {
  data() {
    return {
      load: true,
      data: [
        {
          locations: [102.6160342, 17.9699722],
          title: 'Mark 1',
          icon: 'mdi-map-marker',
          color: '#08B89D',
          cus_address: 'ZoybadVTE',
          tel: '856-123-0000',
          name: 'Zoybad',
          to: '/',
        },
        {
          locations: [102.6220342, 17.9609722],
          title: 'Mark 2',
          icon: 'mdi-map-marker',
          color: '#08B81A',
          cus_address: 'ZoybadVTE',
          tel: '856-123-0000',
          name: 'Zoybad',
          to: '/',
        },
        {
          locations: [102.6210342, 17.9699722],
          title: 'Mark 3',
          icon: 'mdi-map-marker',
          color: '#2B3FFF',
          cus_address: 'ZoybadVTE',
          tel: '856-123-0000',
          name: 'Zoybad',
          to: '/',
        },
      ],
      zoom: 14,
      description: '',
      map: {},
      marker: '',
      locations: [17.9699722, 102.6260342],
      accessToken:
      "YOUR_ACCESS_TOKEN",
      latlng: this.locations,
      //   latlng: '13.736717,100.523186',
      details: [
        {
          title: 'Mark 1',
          icon: 'mdi-map-marker',
          color: '#08B89D',
        },
        {
          title: 'Mark 2',
          icon: 'mdi-map-marker',
          color: '#08B81A',

        },
        {
          title: 'Mark 3',
          icon: 'mdi-map-marker',
          color: '#2B3FFF',
        },
      ],
    }
  },
  methods: {
    async createMap() {
      // Get image URLs for each item in the data array

      // for (const item of this.data) {
      //   // Get the image URL
      //   const functions = getStorage()
      //   const storageRef = ref(functions, item.image)
      //   item.images = await getDownloadURL(storageRef)
      // }

      // console.log(
      //   '🚀 ~ file: mapboxDisplay.vue:115 ~ createMap ~ this.data',
      //   this.data
      // )
      mapboxgl.accessToken = this.accessToken
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [102.6260342, 17.9699722],
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

      for (const item of this.data) {
        const marker = new mapboxgl.Marker({ color: item.color })
          .setLngLat(item.locations)
          .addTo(map)

        marker.getElement().addEventListener('click', () => {
          map.flyTo({
            center: item.locations,
            essential: true,
          })
        })
        marker.setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="
                  font-family: 'Noto Sans Lao Looped', sans-serif;
                  width: auto;
                  border-radius: 15px;">
                  <h3 style="text-align:center">${item.title}</h3>
                  <hr style="margin:4px">
                    <div style="  display: flex;
                    flex-wrap: wrap;">
                    <div style=" flex: 20%;
                    padding: 0 8px;   display: flex;

          align-items: center;">
                     <img src="${item.images}" alt="Avatar" style="width:50px">
                      </div>
                      <div style="flex: 60%;">
                        <span><b>Name</b>: ${item.name}</span>
                        <p><b>Address</b>:
                        ${item.cus_address}
                        </p>
                        <p><b>Phone</b>:  ${item.tel}</p>
                      </div>

                      <div style="flex: 100%; text-align: center;">
                      <hr style="margin:4px">
                        <a href="${item.to}">
                         <button id="view_more" style="background-color: ${item.color};
                        color: white;
                        border-radius: 15px;
                        padding: 5px 20px;
                        margin: 5px 5px;">
                        View more
                        </button>
                        </a>
                        </div>
                      </div>`
          )
        )
      }
    },
  },

  beforeMount() {},
  mounted() {
    this.createMap()
  },
}
</script>

<style scoped>
#map {
  width: auto;
  height: 100vh;
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

