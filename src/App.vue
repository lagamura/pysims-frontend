<template>
  <div class="common-layout" style="display:grid; grid-template-rows: auto 1fr auto;">
    <el-container>
      <NavMenu />
      <el-main style="display: flex">
        <router-view></router-view>
      </el-main>
      <el-footer class="flex"><FooterVue /></el-footer>
    </el-container>
  </div>
</template>

<script setup>
import NavMenu from './components/NavMenu.vue'
import FooterVue from './components/FooterVue.vue'
</script>
