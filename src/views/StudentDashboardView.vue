<template :key="simulation.simulation_name">
  <el-row :gutter="20">
    <el-col :span="18">
      <section v-auto-animate flex justify-between style="width: 90%">
        <h2>Model: {{ store.simulation.model_name }}</h2>
        <div v-if="bar_percentage > 99" class="inline-flex justify-center gap-4">
          <div class="inline-flex justify-center gap-4 pl-20">
            <el-input
              v-model="simulation.simulation_name"
              placeholder=" Simulation Name"
              maxlength="30"
            >
            </el-input>
            <el-button @click="saveResults()"> Save Simulation </el-button>
            <el-button color="00A568" @click="getCsvResults()">Export csv</el-button>
          </div>
        </div>
      </section>
      <!--Populate Chart-->
      <section v-auto-animate v-if="choosenChart">
        <el-divider />
        <el-row class="chartCard">
          <div class="chartBox" style="width: 500px">
            <ChartSimul
              v-if="simulation.results"
              :chartid="choosenChart"
              :sim-results="simulation.results"
              :key="choosenChart"
            />
          </div>
        </el-row>
      </section>
      <el-divider />

      <el-row justify-center>
        <div v-auto-animate v-for="(Obj, index) in simulation.results" key:index>
          <div v-if="!CONST_VARS.includes(index)" class="chart-container">
            <el-col>
              <div class="chartCard">
                <div class="chartBox">
                  <ChartSimul
                    v-if="simulation.results"
                    :chartid="index"
                    :sim-results="simulation.results"
                    :key="simulation.results"
                    @click="Populate(index.toString())"
                  />
                </div>
              </div>
            </el-col>
          </div>
        </div>
      </el-row>
      <el-divider />
      <!-- <el-button @click="swipeDb()">Swipe Database</el-button> -->
    </el-col>
    <!-- This is the right side-section -->
    <el-col :span="6" id="border_class">
      <div class="m-4">
        <el-button
          title="Run next Step"
          :disabled="button_flag"
          @click="PostSimulation($event, true)"
        >
          <el-icon>
            <VideoPlay />
          </el-icon>
        </el-button>
        <el-button title="Run Simulation" @click="PostSimulation($event, false)">
          <el-icon><ArrowRightBold /></el-icon>
        </el-button>
        <el-divider direction="vertical" />
        <span>Step:{{ cur_step }}</span>
      </div>
      <div class="demo-progress">
        <span class="pa-30">Progress Bar</span>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="bar_percentage" />
      </div>
      <div class="inline-block justify-space-between mb-4 flex-wrap gap-4">
        <el-popover placement="left" :width="400" trigger="click">
          <template #reference>
            <el-button type="info" text bg> info </el-button>
          </template>
          <PopOver />
        </el-popover>
        <el-popconfirm title="Are you sure to reset the simulation?" @confirm="reset_time()">
          <template #reference>
            <el-button type="primary" text bg> reset</el-button>
          </template>
        </el-popconfirm>
        <el-divider direction="vertical" />
        <span>duration:</span>
      </div>
      <el-divider />
      <section>
        <h3 text-center pb-3>Inputs</h3>

        <div class="inputs-container">
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
        </div>
        <div class="mt-4" v-for="(component, index) in store.simulation.components" :key="index">
          <div class="slider-demo-block" v-if="component.student_control">
            <span> {{ component['Real Name'] }}</span>

            <el-slider v-model="component._value" show-input />
            <span style="font-size: smaller"> {{ component['Units'] }}</span>
          </div>
        </div>
      </section>
      <el-divider />
      <section>
        <h3 text-center pb-3>Constants</h3>
        <div class="constants-container">
          <div v-for="(component, index) in store.simulation.components" :key="index">
            <span class="control-vars m-2" v-if="component.Type == 'Constant'">
              <el-tooltip class="box-item" effect="dark" placement="top-start">
                <template #content> {{ component.Units }}</template>
                {{ component['Real Name'] }} =
                {{ component._value }}
              </el-tooltip>
            </span>
          </div>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script setup>
import ChartSimul from '@/components/ChartSimul.vue'
import PopOver from '@/components/PopOver.vue'

import { storeToRefs } from 'pinia'
import { watch, ref, watchEffect } from 'vue'
import { useStore } from '../store/SimStore'
import { computed } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
import { useMyFetch } from '@/composables/getjson'
import { resetdashboard } from '@/store/EventsStore'

const store = useStore()
const { simulation } = storeToRefs(store)
const choosenChart = ref('')
const button_flag = ref(false)
const cur_step = ref(0)

const FINAL_TIME = simulation.value.components.filter(
  (component) => component['Real Name'] == 'FINAL TIME'
)[0]._value
const TIME_STEP = simulation.value.components.filter(
  (component) => component['Real Name'] == 'TIME STEP'
)[0]._value

let url_endpoint = '/add_new_simulation/?step_run=false'

const CONST_VARS = ['FINAL TIME', 'INITIAL TIME', 'TIME STEP', 'SAVEPER']

function Populate(index) {
  choosenChart.value = index
}

function reset_time() {
  simulation.value.start_time = 0
  simulation.value.end_time = simulation.value.components.filter(
    (component) => component['Real Name'] == 'TIME STEP'
  )[0]._value
  cur_step.value = 0
  choosenChart.value = null
  simulation.value.results = null
  simulation.value.params = {}

  // Rerender page?
  // const instance = getCurrentInstance()
  // instance?.proxy?.$forceUpdate()
}

async function PostSimulation(event, step_run) {
  if (event) {
    console.log('Posting Simulation...')
    button_flag.value = true
    const date = new Date()
    simulation.value.timestamp = formatDate(date)
    simulation.value.user = 'to-be-implemented'

    simulation.value.components.forEach((component) => {
      if (component._value && component.student_control) {
        store.simulation.params[component['Real Name']] = component._value // here we access directly the object from store because we add properties in params - see more for references
      }
    })

    if (step_run) {
      url_endpoint = '/add_new_simulation/?step_run=true'
    } else {
      url_endpoint = '/add_new_simulation/?step_run=false'
      simulation.value.end_time = simulation.value.components.filter(
        (component) => component['Real Name'] == 'FINAL TIME'
      )[0]._value
    }
    const { components, ...payload } = simulation.value

    const { data, onFetchResponse, onFetchError } = await useMyFetch(url_endpoint, {
      afterFetch() {
        //const time_step = 0.125

        const time_step = simulation.value.components.filter(
          (component) => component['Real Name'] == 'TIME STEP'
        )[0]._value
        simulation.value.start_time += time_step
        simulation.value.end_time += time_step
        cur_step.value += 1
        console.log(`Updating start_time value ${simulation.value.start_time}`)
        button_flag.value = false
        if (!step_run) {
          cur_step.value = FINAL_TIME / TIME_STEP
          console.log(cur_step.value)
        }
      }
    })
      .post(payload)
      .json()

    onFetchError((error) => {
      console.log(error.message)
      console.error(error.message)
      ElMessage.error({
        message: 'Problem connecting to API',
        type: 'error'
      })
    })

    onFetchResponse((response) => {
      // THIS DOES NOT FIRE FOR SOME REASON
      console.log(`data Fetched! ${response.status}`)
    })

    simulation.value.results = data
  }
}

const bar_percentage = computed(() => Math.round((100 / (FINAL_TIME / TIME_STEP)) * cur_step.value))

function getCsvResults() {
  //const { data, onFetchResponse, onFetchError } = await useFetch(url).blob()
  //const { data, onFetchResponse, onFetchError } = await useMyFetch(url_endpoint).blob()
  let url = ''
  if (import.meta.env.DEV) {
    url = 'http://localhost:8000'
  } else {
    url = 'https://pysims-github.herokuapp.com'
  }

  //'/add_new_simulation/?step_run=false'

  fetch(url + '/get_csv_results/' + simulation.value.model_name)
    .then((res) => {
      return res.blob()
    })
    .then((data) => {
      var a = document.createElement('a')
      a.href = window.URL.createObjectURL(data)
      a.download = `${simulation.value.model_name}_${simulation.value.timestamp}`
      a.click()
    })
}

async function saveResults() {
  url_endpoint = '/save_results'
  const { onFetchError } = await useMyFetch(url_endpoint, {
    /* This maybe not work correctly, if fetch fails what happens?*/
    afterFetch() {
      ElMessage.success({
        message: 'Results saved succesfully',
        type: 'success'
      })
    }
  }).post(simulation.value)

  onFetchError((error) => {
    console.error(error.message)
    ElMessage.error({
      message: 'Problem connecting to API',
      type: 'error'
    })
  })
}

watchEffect(() => {
  if (resetdashboard) {
    reset_time()
    resetdashboard.value.set_reset(false)
    console.log('reset_completed')
  }
})

if (resetdashboard.value.reset) {
  console.log('reset-activated from store')
  reset_time()
  resetdashboard.set_reset(false)
}

async function swipeDb() {
  for (var i = 0; i <= 500; i++) {
    await useMyFetch(`/delete_simul_by_id/${i}`).delete()
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
  appearance: auto;
  padding: 8px 15px;
  font-size: var(--el-font-size-base);
  border-radius: var(--el-border-radius-base);
}

* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
.chartCard {
  /* height: calc(100vh - 40px); */
  flex: 1 0 25%;
  align-items: center;
  justify-content: center;
}
.chartBox {
  width: 400px;
  padding: 20px;
  border-radius: 20px;
  border: solid 3px var(--el-color-primary-light-3);
  /* flex: 1 0 ; */
  background: white;
  margin: 5px;
  cursor: pointer;
}

.slider-demo-block {
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.inputs-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.constants-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
