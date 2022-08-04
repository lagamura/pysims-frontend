<template>
  <div>
    <!-- Conditional Rendering of the component -->
    <ChartSimul v-if="flag" :sim-results="JsonObj" />
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import ChartSimul from './ChartSimul.vue'
import { useStore } from '../store/SimStore'
import { postSim } from '../composables/getjson'

const store = useStore()

let flag = ref(false)
let data = ref('')
const JsonObj = ref(null)

const url = 'http://127.0.0.1:8000/add_new_simulation'

async function getJsonData(event) {
  // this needs to run asychronous
  if (event) {
    //console.log("button event triggered");

    try {
      const response = await fetch(url)
      data.value = await response.json()
      JsonObj.value = JSON.parse(data.value)
      flag.value = true

      //console.log("SimulVars are:", simulVars.value);
    } catch (error) {
      console.log('Error! Could not reach the API. ' + error)
    }
  }
}


// instead, use a getter:
watch(data, (newData) => {
  console.log(`newData are ${JSON.parse(newData)}`)
})

// onMounted(() => {
//   getJsonData()
// })
</script>
