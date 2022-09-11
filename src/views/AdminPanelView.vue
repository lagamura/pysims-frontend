<template>
  <el-row :gutter="20">
    <el-col :span="20" style="display: inline-flex; justify-content: space-around; flex-wrap: wrap">
      <div v-for="(classroom, index) in classrooms" key:index>
        <el-card class="box-card">
          <template #header>
            <div class="header-card">
              <el-button link @click="ClassroomHandler()">
                <el-icon :size="32"><DataBoard /></el-icon>
              </el-button>
            </div>
          </template>
          {{ classroom.id_name }}
        </el-card>
      </div>
    </el-col>
    <el-col :span="4">
      <el-button text @click="modal_flag = !modal_flag">
        <el-icon><Plus></Plus></el-icon>
        <span>Add Classroom</span>
      </el-button>
      <el-input
        v-if="modal_flag"
        v-model="input"
        placeholder="Classroom Name"
        @keyup.enter="addClassroom(input)"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const modal_flag = ref(false)
const input = ref('')

const classrooms = ref([
  {
    id_name: 'classroom1'
  },
  {
    id_name: 'classroom2'
  },
  {
    id_name: 'classroom3'
  },
  {
    id_name: 'classroom4'
  }
])

const students = ref()

function ClassroomHandler() {
  const router = useRouter()

  router.push('/admin-panel/classroom1')
}

function addClassroom(name) {
  classrooms.value.push({ id_name: name })
}
</script>
<style scoped>
.header-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
