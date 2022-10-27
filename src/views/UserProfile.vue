<template>
  <div class="flex flex-row">
    <div class="basis-1/4 p-8">
      <h3 class="text-lg">
        Welcome <span class="italic">{{ user_details.surname + ' ' + user_details.firstname }}</span>
      </h3>
      <div class="rounded-xl p-6 text-white block bg-slate-200 w-80 shadow-md mt-2">
        <a class="block"> Your ID: {{ user_details.id }} </a>
        <a class="block"> Department: {{ user_details.department }} </a>
        <a class="block"> Classroom: {{ user_details.classroom_id }} </a>
      </div>
    </div>
    <div class="basis-3/4 p-8">
      <h3 class="text-lg text-center font-bold pb-2">History Table</h3>
      <suspense>
        <TableVue />
        <template #fallback>
          <el-icon class="is-loading"> <Loading /> </el-icon
        ></template>
      </suspense>
    </div>
  </div>
</template>

<script setup>
import TableVue from '../components/TableVue.vue';
import { useAuthStore } from '@/store';


const { user_details } = useAuthStore()

</script>
