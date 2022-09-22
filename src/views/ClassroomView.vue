<template>
  <div>
    <h2>Classroom: {{ classroom.id_name }}</h2>
    <h3 italic>Number of Students: {{ classroom.num_students }}</h3>
  </div>
  <el-row>
    <el-col :span="20" style="display: inline-flex; justify-content: space-around; flex-wrap: wrap">
      <div v-for="(student, index) in students" :key="students">
        <el-card class="box-card">
          <template #header>
            <div class="header-card">
              <el-avatar :icon="UserFilled" />
              <div pl-3>
                <span class="Studentname">
                  {{ student.surname }}
                </span>
                <span class="Studentname" block>
                  {{ student.id }}
                </span>
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
            <el-button
              type="primary"
              @click="
                dialogFormVisible = false;
                fetchStudents(classroom);
              "
              >Confirm</el-button
            >
          </span>
        </template>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useMyFetch } from '@/composables/getjson';
import { Delete, InfoFilled, UserFilled } from '@element-plus/icons-vue';
import StudentSignForm from '@/components/StudentSignForm.vue';
import { useStore } from '@/store/SimStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useStore();
const { classrooms } = storeToRefs(store);
const classroom = ref()
const dialogFormVisible = ref(false);
console.log(`param from router is: ${route.params.classname}`);
const students = ref();

//const classroom = store.classrooms.find((classroom) => classroom.id_name == route.params.classname);
//console.log(`classroom same as router is: ${classroom.id_name}`);

async function fetchStudents(classroom) {
  const { data, onFetchError } = await useMyFetch('/get_students/' + classroom.id_name, {})
    .get()
    .json();

  students.value = data.value;
  console.log(students.value);
}
//Every router should fetch again
watch(
  () => route.params.classname,
  (new_classname) => {
    console.log(`Params change catched ${new_classname}`);
    classroom.value = classrooms.value.find((classroom) => classroom.id_name == new_classname);
    fetchStudents(classroom.value);
  },
  { immediate: true }
);
</script>

<style scoped>
.header-card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Studentname {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.Studentname:hover {
  text-overflow: clip;
  white-space: normal;
  word-break: break-all;
}
</style>