<template>
  <div v-for="(component, index) in simulation.components" :key="index">
    <div v-if="component.Type == 'Constant'">
      <span class="demonstration">{{ component['Real Name'] }}</span>
      <el-switch
        v-model="component.student_control"
        class="switcher"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
      />
    </div>
  </div>
</template>

<script setup>
import { Check, Close } from '@element-plus/icons-vue'
import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'

const store = useStore()
const { simulation } = storeToRefs(store) //access params from store as ref
</script>

<style></style>
