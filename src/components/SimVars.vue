<template>
  <h3>Step 2 - Choose Simulation Variables of Model:</h3>
  <div v-for="(component, index) in simulation.components" :key="index">
    <div v-if="component.student_control" class="slider-demo-block">
      <span class="demonstration">{{ component['Real Name'] }}</span>
      <el-slider v-model="component._value" show-input />
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue'
import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'

const store = useStore()
const { simulation, params_obj, dropdown_trigger } = storeToRefs(store) //access params from store as ref

const namespace = ref(null)

function getSimVars() {
  console.log(`Fetching getSimVars for model ${simulation.value.model_name}...`)

  fetch('http://127.0.0.1:8000/get_model_namespace/' + simulation.value.model_name)
    .then((response) => response.json())
    .then((data) => {
      simulation.value.params = data
      Object.keys(simulation.value.params).forEach((key) => {
        simulation.value.params[key] = 0
        params_obj.value.push({ param_name: key, param_value: 0 })
      })

      console.log(`successfully fetched model_namespace ${JSON.stringify(data)}`)
    })
    .catch((error) => {
      console.log('Error! Could not reach the API. ' + error)
    })
}

watch(dropdown_trigger, (newvalue) => {
  console.log(`state simulation has changed ${newvalue.model_name}`)
  getSimVars()
})

const py_namespace = computed(() => {
  if (namespace.value) {
    return Object.values(namespace.value)
  }
})

/* watch props https://stackoverflow.com/questions/59125857/how-to-watch-props-change-with-vue-composition-api-vue-3
watch(
  () => props.modelName,
  (before, after) => {
    console.log('url_namespace has changed')
    url_namespace.value = 'http://127.0.0.1:8000/get_model_namespace/' + props.modelName
    getSimVars()
  }
)
*/

// https://stackoverflow.com/questions/1117916/merge-keys-array-and-values-array-into-an-object-in-javascript
/*
const keys = ['height', 'width'];
const values = ['12px', '24px'];
const merged = keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
*/
</script>

<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: clip;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>
