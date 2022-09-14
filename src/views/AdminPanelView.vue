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
                  <el-icon class="class-button" :size="32"><DataBoard /></el-icon>
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
    <div>
      <h2 inline pr>Classroom: {{ classroom }}</h2>
      <h3 inline pr italic>Number of Students: {{ students_num }}</h3>
    </div>
    <el-row>
      <el-col
        :span="20"
        style="display: inline-flex; justify-content: space-around; flex-wrap: wrap"
      >
        <div v-for="(student, index) in students" key:index>
          <el-card class="box-card">
            <template #header>
              <div class="header-card">
                <el-avatar :icon="UserFilled" />
                <div pl-3>
                  <h4 block>
                    {{ student.surname }}
                  </h4>
                  <h4 block>
                    {{ student.id }}
                  </h4>
                </div>
              </div>
            </template>
            <div text-center c-lightblue>
              <span>
                {{ student.department }}
              </span>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col :span="4">
        <el-button text @click="dialogFormVisible = true">
          <el-icon><Plus></Plus></el-icon>
          <span>Add Student</span>
        </el-button>
        <el-dialog v-model="dialogFormVisible" title="Add Student">
          <StudentSignForm />
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
            </span>
          </template>
        </el-dialog>
      </el-col>
    </el-row>
  </section>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useMyFetch } from '@/composables/getjson'
import { Delete, InfoFilled, UserFilled } from '@element-plus/icons-vue'
import StudentSignForm from '@/components/StudentSignForm.vue'
import { useStore } from '@/store/SimStore'
import { storeToRefs } from 'pinia'

const modal_flag = ref(false)
const dialogFormVisible = ref(false)
const classesOn = ref(true)
const input = ref('')
const students = ref()
const classroom = ref('')
const students_num = 13

const store = useStore()
const { classrooms } = storeToRefs(store)

async function fetchClasses() {
  const { data, onFetchError } = await useMyFetch('get_classrooms', {}).get().json()

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
  fetchStudents(classroom.value)
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

async function fetchStudents(classroom) {
  const { data, onFetchError } = await useMyFetch('/get_students/' + classroom, {})
    .get()
    .json()

  students.value = data.value
  console.log(students.value)
}
</script>
<style scoped>
.header-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
.class-button:hover {
  transform: scale(1.2);
}
</style>
