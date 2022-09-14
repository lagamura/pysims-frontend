<template>
  <el-row>
    <el-col>
      <h3 text-center>user_simulations history</h3>
      <div flex justify-center>
        <suspense>
          <TableVue />
          <template #fallback>
            <el-icon class="is-loading"> <Loading /> </el-icon
          ></template>
        </suspense>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import TableVue from '../components/TableVue.vue'

import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'
import { watch, computed } from 'vue'

const store = useStore()

const { simulation, cur_simul } = storeToRefs(store)

console.log(`State user_simulations:${simulation.value}`)

watch(cur_simul, (newvalue) => {
  console.log(`cur_simul has changed ${newvalue}`)
  //console.log(user_simulations.value[cur_simul.value - 1].results)
})
</script>
