<template>
  <section v-if="classesOn">
    <el-row :gutter="20">
      <el-col
        :span="20"
        style="display: inline-flex; justify-content: space-around; flex-wrap: wrap"
      >
        <div v-for="(classroom, index) in classrooms" key:index>
          <el-card class="box-card">
            <template #header>
              <div class="header-card">
                <el-button link @click="ClassroomHandler(classroom)">
                  <el-icon :size="32"><DataBoard /></el-icon>
                </el-button>
                <el-popconfirm
                  confirm-button-text="Yes"
                  cancel-button-text="No"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="Are you sure to delete this?"
                  trigger="hover"
                  effect="light"
                  width="auto"
                  @confirm="deleteClassroom(classroom)"
                >
                  <template #reference>
                    <el-button size="small" type="danger" :icon="Delete"> </el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
            {{ classroom }}
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
  </section>
  <section v-if="!classesOn">
    <div text-50px>
      Text test
    </div>
    <div inline>
      <h2 inline>{{ classroom }}</h2>
      <h3 inline>Number of Students: {{ students_num }} </h3>
    </div>
    <el-row>
      <el-col
        :span="20"
        style="display: inline-flex; justify-content: space-around; flex-wrap: wrap"
      >
        <div v-for="(student, index) in students" key:index>
          <el-card class="box-card">
            <template #header>
              <div class="header-card"></div>
            </template>
          </el-card>
        </div>
      </el-col>

      <el-col :span="4">
        <el-button text @click="modal_flag = !modal_flag">
          <el-icon><Plus></Plus></el-icon>
          <span>Add Student</span>
        </el-button>
      </el-col>
    </el-row>
  </section>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useMyFetch } from '@/composables/getjson'
import { Delete, InfoFilled } from '@element-plus/icons-vue'

const modal_flag = ref(false)
const classesOn = ref(true)
const input = ref('')
const classrooms = ref({})
const students = ref()
const classroom = ref('')
const students_num = 13

async function fetchClasses() {
  const { data, onFetchError } = await useMyFetch('get_classrooms', {
    refetch: true
  })
    .get()
    .json()

  console.log(data.value)
  classrooms.value = data.value
  console.log(classrooms)
}

// lifecycle hook
onBeforeMount(() => {
  fetchClasses()
})

function ClassroomHandler(classroom_name) {
  classesOn.value = false
  classroom.value = classroom_name
}

async function addClassroom(classname) {
  await useMyFetch('/add_classroom?' + 'classroom_name=' + classname, {}).post({
    classroom_name: classname
  })

  fetchClasses()
}

async function deleteClassroom(classname) {
  await useMyFetch('/delete_classroom?' + 'classroom_name=' + classname, {}).delete({
    classroom_name: classname
  })

  fetchClasses()
}
</script>
<style scoped>
.header-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>