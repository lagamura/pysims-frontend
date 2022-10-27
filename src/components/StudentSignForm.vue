<template>
  <el-form ref="formRef" :model="form" :rules="rules" status-icon label-width="100px">
    <el-form-item label="Surname" prop="surname">
      <el-input v-model="form.surname" />
    </el-form-item>
    <el-form-item label="Firstname" prop="firstname">
      <el-input v-model="form.firstname" />
    </el-form-item>
    <el-form-item label="Username" prop="username">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="Student ID" prop="id">
      <el-input-number v-model="form.id" :controls="false" />
    </el-form-item>
    <el-form-item label="password" prop="password">
      <el-input v-model="form.password" type="password" placeholder="type a password" show-password />
    </el-form-item>
    <el-form-item label="E-mail">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="Department">
      <el-select v-model="form.department" placeholder="your Department">
        <el-option label="Econ Department" value="Econ" />
        <el-option label="e-ce Department" value="e-ce" />
      </el-select>
    </el-form-item>
    <el-form-item label="Class">
      <el-select v-model="form.classroom_id" placeholder="ECE100">
        <el-option
          v-for="(classroom, index) in classrooms"
          :key="classroom"
          :label="classroom.id_name"
          :value="classroom.id_name"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)"> Register </el-button>
      <el-button @click="resetForm(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useMyFetch } from '@/composables/getjson';
import { ElMessage } from 'element-plus';
import { useStore } from '../store/SimStore';
import { storeToRefs } from 'pinia';
import { router } from '@/router';

const store = useStore();
const { classrooms } = storeToRefs(store);

async function fetchClasses() {
  const { data, onFetchError } = await useMyFetch('get_classrooms', {}).get().json();

  console.log(data.value);
  classrooms.value = data.value;
  console.log(classrooms);
}

onBeforeMount(() => {
  fetchClasses();
});

// do not use same name with ref
const formRef = ref<FormInstance>();
const form = reactive<formdata>({
  firstname: '',
  surname: '',
  username: '',
  id: 0,
  password: '',
  email: '',
  classroom_id: '',
  department: ''
});

interface formdata {
  surname: string;
  firstname: string;
  username: string;
  id: number;
  password: string;
  email: string;
  classroom_id: string;
  department: string;
}

const rules = reactive<FormRules>({
  firstname: [{ required: true, message: 'Please input your firstname', trigger: 'blur' }],
  surname: [{ required: true, message: 'Please input your surname', trigger: 'blur' }],
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('user_validated!');
      postStudent().then(() => {
        router.push('/')
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

async function postStudent(form_data?: formdata) {
  const { onFetchResponse } = await useMyFetch('/add_student', {}).post(form);
  onFetchResponse(() => {
    ElMessage.success({
      message: 'Results saved succesfully',
      type: 'success'
    });
  });
}
</script>
