<template>
  <h3>Simulation Variables of Model:</h3>
  <div v-for="vars in simulVars">
    <div class="slider-demo-block">
      <span class="demonstration">{{ vars }}</span>
      <el-slider show-input />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch, ref } from 'vue'
import { useStore } from '../store/SimStore'

const store = useStore()

const url_namespace = 'http://127.0.0.1:8000/get_model_namespace/' + store.simulation.model_name

const params = ref([])

const data_namespace = ref('')
const namespace = ref(null)

async function getSimVars(event) {
  if (store.simulation.model_name) {
    try {
      const response = await fetch(url_namespace)
      namespace.value = await response.json()

      //console.log("namespace are:", namespace.value);
    } catch (error) {
      console.log('Error! Could not reach the API. ' + error)
    }
  }
}

const simulVars = computed(() => {
  if (namespace.value) {
    return Object.keys(namespace.value)
  }
})

onMounted(() => {
  getSimVars()
})
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
