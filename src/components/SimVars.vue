<template>
  <h3>Simulation Variables of Model:</h3>
  <div v-for="(vars, index) in simulVars">
    <div class="slider-demo-block">
      <span class="demonstration">{{ vars }}</span>
      <el-slider v-model="params[index]" show-input />
    </div>
  </div>
  <div>{{params}}</div>
</template>

<script setup>
import {computed, watch, ref} from 'vue'

const props = defineProps({
  modelName: String
})

const url_namespace = ref('')
const namespace = ref(null)
const params = ref([])

async function getSimVars() {
  console.log('Fetching getSimVars...')
  console.log(url_namespace.value)
  try {
    const response = await fetch(url_namespace.value)
    namespace.value = await response.json()

    //console.log("namespace are:", namespace.value);
  } catch (error) {
    console.log('Error! Could not reach the API. ' + error)
  }
}

const simulVars = computed(() => {
  if (namespace.value) {
    return Object.keys(namespace.value)
  }
})

const py_namespace = computed(() => {
  if (namespace.value) {
    return Object.values(namespace.value)
  }
})

// watch props https://stackoverflow.com/questions/59125857/how-to-watch-props-change-with-vue-composition-api-vue-3
watch(
  () => props.modelName,
  (before, after) => {
    console.log('url_namespace has changed')
    url_namespace.value = 'http://127.0.0.1:8000/get_model_namespace/' + props.modelName
    getSimVars()
  }
)


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
