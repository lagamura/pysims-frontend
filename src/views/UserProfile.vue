<template>
  <div class="flex flex-row">
    <div class="basis-1/4 p-8">
      <h3 class="text-lg">
        Welcome <span class="italic">{{ user.surname + ' ' + user.firstname }}</span>
      </h3>
      <div class="rounded-xl p-6 text-white block bg-slate-200 w-80 shadow-md mt-2">
        <a class="block"> Your ID: {{ user.id }} </a>
        <a class="block"> Department: {{ user.department }} </a>
        <a class="block"> Classroom: {{ user.classroom }} </a>
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

const user = {
  id: '1828',
  surname: 'Lagaras',
  firstname: 'Stelios',
  department: 'Ece',
  classroom: 'ece-101'
};
</script>
