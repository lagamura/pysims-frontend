<template>
  <h3>Select the control variables of the user</h3>
  <div v-for="(component, index) in simulation.components" :key="index">
    <div class="slider-demo-block">
      <li>
        <span class="demonstration">{{ component['Real Name'] }}</span>
        <Toggle v-model="component.student_control" />
      </li>
    </div>
  </div>
</template>

<script setup>
import Toggle from '@vueform/toggle'
import { useStore } from '../store/SimStore'
import { storeToRefs } from 'pinia'

const store = useStore()
const { simulation } = storeToRefs(store) //access params from store as ref
</script>

<style src="@vueform/toggle/themes/default.css"></style>
