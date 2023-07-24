<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Apex Chart</h4>
          </div>
          <div class="card-content">
            <div class="card-body">
              <apexchart
                type="line"
                height="350"
                :options="chartOptions"
                :series="chartSeries"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
    data() {
        return {
        chartOptions: {
            chart: {
            id: 'vuechart-example',
            },
            xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            },
        },
        chartSeries: [
            {
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91],
            },
        ],
        }
    },


}
</script>

<style>

</style>