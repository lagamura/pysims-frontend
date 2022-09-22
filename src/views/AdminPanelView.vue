<template>
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
                  @confirm="deleteClassroom(classroom.id_name)"
                >
                  <template #reference>
                    <el-button size="small" type="danger" :icon="Delete"> </el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
            <span class="ClassName">{{ classroom.id_name }}</span>
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
import { ref, computed, watch, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMyFetch } from '@/composables/getjson';
import { Delete, InfoFilled, UserFilled } from '@element-plus/icons-vue';
import StudentSignForm from '@/components/StudentSignForm.vue';
import { useStore } from '@/store/SimStore';
import { storeToRefs } from 'pinia';

const router = useRouter();
const route = useRoute();

const modal_flag = ref(false);
const dialogFormVisible = ref(false);
const input = ref('');
const students = ref();
const classroom = ref('');
const students_num = 13;

const store = useStore();
const { classrooms } = storeToRefs(store);

async function fetchClasses() {
  const { data, onFetchError } = await useMyFetch('get_classrooms', {}).get().json();

  console.log(data.value);
  classrooms.value = data.value;
  console.log(classrooms);
}

// lifecycle hook
onBeforeMount(() => {
  fetchClasses();
});

function ClassroomHandler(classroom_choosen) {
  classroom.value = classroom_choosen;
  router.push({ path: '/admin-panel/classes/' + classroom.value.id_name });

}

async function addClassroom(classname) {
  await useMyFetch('/add_classroom?' + 'classroom_name=' + classname, {}).post({
    classroom_name: classname
  });

  fetchClasses();
}

async function deleteClassroom(classname) {
  await useMyFetch('/delete_classroom?' + 'classroom_name=' + classname, {}).delete({
    classroom_name: classname
  });

  fetchClasses();
}



// watch(
//   () => route.params.classname,
//   (new_classname) => {
//     if (new_classname == 'classrooms') {
//       classesOn.value = true;
//     } else {
//       classesOn.value = false;
//     }
//   }
// );
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

.ClassName {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  display: block;
  width: 95px;
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