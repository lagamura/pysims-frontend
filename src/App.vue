<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <NavMenu />
      </el-header>
      <el-main style="flex: 1 0 auto; min-height: 70vh">
        <!-- <router-view>
        </router-view> -->
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
      <el-footer><FooterVue /></el-footer>
    </el-container>
  </div>
</template>

<script setup>
import NavMenu from './components/NavMenu.vue'
import FooterVue from './components/FooterVue.vue'
import { useStore } from './store/SimStore'

const store = useStore()
store.init() //init of the state
</script>

<style scoped></style>
