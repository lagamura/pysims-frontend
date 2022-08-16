<template>
  <canvas :id="props.chartid" :width="props._width" :height="props._height"></canvas>
</template>
<script setup>
import { ref, computed, onMounted, watch, toRef } from 'vue'
import { Chart, registerables } from 'chart.js'
import { storeToRefs } from 'pinia'
import { useStore } from '../store/SimStore'

Chart.register(...registerables)

const store = useStore()
const { simulation } = storeToRefs(store)
const url = ref()

//store.simulation.components[1]._value = 200 // Warning - Is Final Time always in the 1st cell?

const props = defineProps({
  simResults: Object | String,
  curSimulCounter: Number,
  chartid: String,
  _width: { type: String, default: '450' },
  _height: { type: String, default: '300' }
})

const curSimulRef = toRef(props, 'curSimulCounter')
const SimResultsRef = toRef(props, 'SimResults')

console.log(`Chart Rendering...`)

watch(SimResultsRef, (newValue) => {
  console.log(`Sim Results has changed - new dataset is: ${newValue}`)
})

watch(curSimulRef, (newvalue) => {
  console.log(`curSimulCounter prop has changed ${newvalue}`)
})
/* Global configs
Chart.defaults.global = { }
*/

const Dataset = []

for (var key of Object.keys(props.simResults)) {
  if (key.toUpperCase() != key && key == props.chartid) {
    // in order to avoid constant values
    const rgba = getRandomRgba()
    Dataset.push({
      label: key,
      backgroundColor: stringToColour(props.chartid),
      borderColor: stringToColour(props.chartid),
      data: props.simResults[key]
    })
  }
}

const data = {
  //labels: props.labels,
  datasets: Dataset
}

const config = {
  type: 'line',
  data: data,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          type: 'time',
          text:
            'time: ' +
            simulation.value.components.find((element) => element['Real Name'] == 'FINAL TIME')
              .Units
        },
        suggestedMin: 0,
        suggestedMax: simulation.value.components[1]._value
      },
      y: {
        title: {
          display: true,
          text: simulation.value.components.find((element) => element['Real Name'] == props.chartid)
            .Units,
          color: '#808080'
        },
        suggestedMin: 0,
        suggestedMax: 200
      }
    },
    pointRadius: 2,
    pointHoverRadious: 7,
    plugins: {
      title: {
        display: true
      },
      legend: {
        position: 'bottom'
      }
    }
  },
  plugins: [
    {
      beforeDraw: (chart) => {
        const { ctx } = chart
        ctx.save()
        ctx.globalCompositeOperation = 'destination-over'
        ctx.fillStyle = 'White'
        ctx.fillRect(0, 0, chart.width, chart.height)
        ctx.restore()
      }
      /* Rendering Images */
      /*
      afterRender: function (chart) {
        //url.value = chart.toBase64Image()
        const src = chart.toBase64Image('image/png', 1)
        store.img_thumbnails.push({ img_id: img_id.value, bs64: src })
      }
      */
    }
  ]
}

onMounted(() => {
  const myChart = new Chart(document.getElementById(props.chartid), config)
})

const img_id = computed(() => {
  return 'thumbnail-chart-' + props.chartid
})

// Chart.defaults.elements.line.borderColor = "rgba(0.3, 0.5, 0.4, 0.1)"; // Change settings globaly
// Chart.defaults.elements.line.backgroundColor = "rgba(0.2, 0.2, 0.6, 0.1)"; // Change settings globaly

function getRandomRgba() {
  const r = Math.random() * 255
  const g = Math.random() * 255
  const b = Math.random() * 255
  const a = 0.4
  return [`rgb(${r},${g},${b})`, `rgba(${r},${g},${b},${a})`]
}

function stringToColour(str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  var colour = '#'
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}
</script>

<style scoped></style>
