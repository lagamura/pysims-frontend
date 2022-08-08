<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <h2>Model: {{ store.simulation.model_name }}</h2>
      <el-divider />
      <h3>Output</h3>
      <div>
        <!-- v-for should be checked for correct key -->
        <div v-for="(Obj, index) in JsonObj" key:index>
            <div
              v-if="!CONST_VARS.includes(index)"
              class="chart-container"
              style="position: relative"
            >
              <ChartSimul v-if="JsonObj" :chartid="index" :sim-results="JsonObj" />
            </div>
        </div>
      </div>

      <div class="chart-container" style="position: relative">
        <ChartSimul v-if="JsonObj" chartid="mychart" :sim-results="JsonObj" />
      </div>
    </el-col>
    <el-col :span="8" id="border_class">
      <div class="m-4">
        <el-button title="Run next Step">
          <el-icon>
            <VideoPlay />
          </el-icon>
        </el-button>
        <el-button title="Run Simulation" @click="PostSimulation">
          <el-icon><ArrowRightBold /></el-icon>
        </el-button>
        <el-divider direction="vertical" />
        <span>Step:0</span>
      </div>
      <div class="demo-progress">
        <span class="pa-30">Progress Bar</span>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="50" />
      </div>
      <div class="inline-block justify-space-between mb-4 flex-wrap gap-4">
        <el-button v-for="button in buttons" :key="button.text" :type="button.type" text bg>{{
          button.text
        }}</el-button>
        <el-divider direction="vertical" />
        <span>duration:</span>
      </div>
      <el-divider />
      <h3>Inputs</h3>
      <div
        class="inline-block justify-space-between gap-4"
        v-for="(component, index) in store.simulation.components"
        :key="index"
      >
        <span class="control-vars m-2" v-if="component.student_control">
          <el-tooltip class="box-item" effect="dark" placement="top-start">
            <template #content> {{ component.Units }}</template>
            {{ component['Real Name'] }}
          </el-tooltip>
        </span>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import ChartSimul from '@/components/ChartSimul.vue'

import { storeToRefs } from 'pinia'
import { useFetch } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useStore } from '../store/SimStore'

const store = useStore()
const { simulation } = storeToRefs(store)

const JsonObj = ref()

const url = 'http://127.0.0.1:8000/add_new_simulation/'

const CONST_VARS = ['FINAL TIME', 'INITIAL TIME', 'TIME STEP', 'SAVEPER']

const buttons = [
  { type: 'info', text: 'info' },
  { type: 'primary', text: 'reset' }
]

async function PostSimulation(event) {
  if (event) {
    console.log('Posting Simulation...')
    const date = new Date()
    simulation.value.timestamp = formatDate(date)
    simulation.value.user = 'to-be-implemented'
    simulation.value.simulation_name = 'hardcoded for test'
    simulation.value.model_name = 'Teacup'
    for (const component in store.components) {
      if (component._value) {
        store.params_obj.push({ param_name: component['Py Name'], param_value: component._value })
      }
    }

    Object.entries(store.params_obj).forEach(([key, value]) => {
      simulation.value.params[value.param_name] = value.param_value
    })

    const { components, ...payload } = simulation.value

    const { data, onFetchResponse, onFetchError } = await useFetch(url, {
      onFetchError(ctx) {
        console.log('Something went wrong on Posting-Run Simulation') + ctx.error
      }
    })
      .post(payload)
      .json()

    onFetchResponse((response) => {
      console.log(`data Fetched! ${response.status}`)
      //console.log(`data on Fetch Response ${model_doc.value}`)
    })

    onFetchError((ctx) => {
      console.log('Something went wrong on Posting-Run Simulation') + ctx.error
    })

    JsonObj.value = data.value.json_data
  }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0')
}

function formatDate(date) {
  return (
    [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join(
      '-'
    ) +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds())
    ].join(':')
  )
}
</script>

<style scoped>
#border_class {
  border-left: 0.13rem solid white; /*this should be changed globally with theme's variable*/
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  margin-top: 15px;
  width: 350px;
}

.control-vars {
  display: inline-flex;
  border: 0 solid var(--el-color-primary-light-9);
  background-color: var(--el-color-primary-light-9);
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  color: var(--el-button-text-color);
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  transition: 0.1s;
  font-weight: var(--el-button-font-weight);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  padding: 8px 15px;
  font-size: var(--el-font-size-base);
  border-radius: var(--el-border-radius-base);
}
</style>
