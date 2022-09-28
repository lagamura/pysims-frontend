<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    :ellipsis="false"
    :router="true"
  >
    <el-menu-item index="/" h="full">
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--el-menu-item-height)"
      >
        <el-icon><HomeFilled /></el-icon>
      </button>
    </el-menu-item>
    <el-menu-item index="/about"> About </el-menu-item>
    <el-menu-item index="/dashboard"> Student Dashboard </el-menu-item>
    <el-menu-item index="/tutor-dashboard">Tutor Dashboard</el-menu-item>
    <el-menu-item index="/admin-panel/classrooms">Admin Panel</el-menu-item>
    <!-- <el-menu-item index="/signinuth">Signinuth</el-menu-item> -->

    <div class="flex-grow" />
    <el-menu-item>
      <div>
        <el-switch
          v-model="togglebind"
          style="--el-switch-on-color: #333333"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          @change="toggleDark()"
        />
      </div>
    </el-menu-item>
    <el-menu-item index="/sign-up"> Sign Up </el-menu-item>
    <el-sub-menu index="submenu">
      <template #title>
        <el-icon style="height: var(--el-menu-item-height)"><User /></el-icon>
      </template>
      <el-menu-item-group >
        <el-menu-item index="/logout" @click="authStore.logout()"> Logout </el-menu-item>
        <el-menu-item index="/profile"> Profile </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { toggleDark } from '../composables/dark';
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useAuthStore } from '@/store'

const authStore = useAuthStore();

const activeIndex = ref('1');
const togglebind = ref(true);
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.el-icon {
  color: aliceblue;
}

.flex-grow {
  flex-grow: 1;
  justify-content: flex-end;
}
</style>
