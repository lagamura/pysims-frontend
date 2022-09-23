<template>
  <el-row justify="center">
    <el-col :lg="6" :xl="3">
      <el-form ref="formRef" :model="form" :rules="rules" status-icon label-width="120px">
        <el-form-item label="Surname" prop="surname" required>
          <el-input v-model="form.surname" />
        </el-form-item>
        <el-form-item label="Firstname" prop="firstname" required>
          <el-input v-model="form.firstname" />
        </el-form-item>
        <el-form-item label="Student ID" required>
          <el-input-number v-model="form.id" :controls="false" />
        </el-form-item>
        <el-form-item label="E-mail" prop="email" required>
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Department" required>
          <el-select v-model="form.department" placeholder="your Department">
            <el-option label="Econ Department" value="Econ" />
            <el-option label="e-ce Department" value="e-ce" />
          </el-select>
        </el-form-item>
        <el-form-item label="Class" required>
          <el-select v-model="form.classroom_id" placeholder="ECE100">
            <el-option label="System Dynamics 101" value="ECE101" />
            <el-option label="System Dynamics 102" value="ECE102" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)"> Sign In </el-button>
          <el-button @click="resetForm(formRef)">Reset</el-button>
          <el-checkbox class="ml" label="I agree with the terms of use " name="type" />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="UthSignInhandler()" color="#E82E46">
          Uth Sign in
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

// do not use same name with ref
const formRef = ref<FormInstance>();
const form = reactive({
  firstname: '',
  surname: '',
  id: 0,
  email: '',
  classroom_id: '',
  department: '',
  type: []
});

const rules = reactive<FormRules>({
  firstname: [{ required: true, message: 'Please input your firstname', trigger: 'blur' }],
  surname: [{ required: true, message: 'Please input your surname', trigger: 'blur' }]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

</script>