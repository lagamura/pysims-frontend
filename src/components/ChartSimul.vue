<template>
  <canvas :id="props.chartid"></canvas>
</template>
<script setup>
import { ref, onMounted, watch, toRef } from 'vue'
import { Chart, registerables } from 'chart.js'
import { storeToRefs } from 'pinia'
import { useStore } from '../store/SimStore'

Chart.register(...registerables)

const store = useStore()
const { simulation } = storeToRefs(store)

const props = defineProps({
  simResults: Object | String,
  curSimulCounter: Number,
  chartid: String
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
      backgroundColor: rgba[1],
      borderColor: rgba[0],
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
          text:
            'time: ' +
            simulation.value.components.find((element) => element['Real Name'] == 'FINAL TIME')
              .Units
        }
      },
      y: {
        title: {
          display: true,
          text: simulation.value.components.find((element) => element['Real Name'] == props.chartid)
            .Units,
          color: '#FFFFFF'
        }
      }
    },
    pointRadius: 2,
    pointHoverRadious: 7,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        position: 'bottom'
      }
    }
  }
}

onMounted(() => {
  //document.getElementById('mychart').setAttribute('id', props.chartid)
  const myChart = new Chart(document.getElementById(props.chartid), config)
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
</script>
