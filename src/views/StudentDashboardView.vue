<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <h2>Model: {{ store.simulation.model_name }}</h2>
      <h3>Step 1 - Choose an Available Model</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget nunc faucibus,
        iaculis urna ut, feugiat nibh. Aliquam cursus tincidunt nunc, sit amet faucibus ligula
        convallis id. Morbi placerat nunc eu enim aliquet consectetur. In hac habitasse platea
        dictumst. Nulla ut nunc ac dolor vehicula pharetra. Sed eget volutpat magna. Cras id felis
        tincidunt, pulvinar metus in, commodo quam. Curabitur lobortis mi diam, nec congue purus
        scelerisque vel. Phasellus eu tellus ut neque scelerisque viverra. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget risus
        sapien. Sed pretium nisl non tortor rhoncus imperdiet. Morbi at vestibulum erat, a venenatis
        diam. Phasellus fringilla fermentum porttitor. Vestibulum laoreet sagittis augue id
        molestie. Duis neque est, porta non sodales vitae, molestie sed neque. Vivamus rhoncus
        sodales nulla, a efficitur odio congue tempor. Praesent non mauris malesuada, pharetra odio
        eget, accumsan lacus. Maecenas in eleifend metus. Integer in elit metus. In nec sapien
        purus. Fusce nisl metus, pellentesque eu tortor at, ultricies volutpat ipsum. Aenean
        ultrices augue et venenatis molestie. Praesent at facilisis purus, at fermentum tortor. Nunc
        tincidunt dui placerat nisl gravida consequat. Proin vel malesuada sem. Donec sit amet
        viverra quam. Maecenas malesuada venenatis dui, non tincidunt massa. Duis vulputate non urna
        at fringilla. Curabitur enim urna, placerat quis faucibus vitae, malesuada vestibulum dolor.
        Ut varius cursus efficitur. Donec nec felis at purus dictum posuere quis tincidunt lacus.
        Aliquam faucibus nisi et lectus viverra consectetur. Phasellus dictum lectus a turpis
        ullamcorper ultrices. Nam in erat orci. Integer malesuada non ex a euismod. Sed diam dolor,
        condimentum ut tempus sit amet, molestie ut nunc. Aenean turpis massa, finibus a aliquam
        sed, laoreet ut odio. Mauris nec purus volutpat, convallis est egestas, facilisis dolor.
        Maecenas pellentesque porta sem, et vehicula purus commodo sed. Ut aliquet nulla in elit
        lobortis varius. Sed elementum posuere ante in scelerisque. Vivamus nec odio interdum,
        mollis lacus ut, aliquet nulla. Morbi et gravida ex. Phasellus sed nisl dui. Phasellus sed
        consectetur ipsum. Vivamus vel ornare dolor, eget tempor nisi. Cras ut interdum eros.
        Phasellus mi enim, pulvinar eu erat eget, feugiat pretium tellus. Praesent in sollicitudin
        diam. Morbi luctus odio at dolor ornare, vel dapibus lacus interdum. Nunc aliquam ut felis
        ornare tempor. Morbi hendrerit risus orci, a tincidunt leo aliquam nec. Quisque maximus
        semper ipsum. In commodo, urna sed auctor elementum, quam lectus imperdiet tellus, ut
        imperdiet sem nisi a metus. Nunc vulputate sapien ac sapien placerat volutpat. Nulla eu dui
        ac nunc pellentesque dapibus. Donec vel felis eget nunc laoreet pretium. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
    </el-col>
    <el-col :span="8" id="border_class">
      <div class="m-4 ">
        <el-button title="Run next Step">
          <el-icon>
            <VideoPlay />
          </el-icon>
        </el-button>
        <el-button title="Run Simulation">
          <el-icon><ArrowRightBold /></el-icon>
        </el-button>
      </div>
      <div class="demo-progress ">
        <span>Progress Bar</span>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="50" />
      </div>
      <div class="inline-block justify-space-between mb-4 flex-wrap gap-4">
        <el-button v-for="button in buttons" :key="button.text" :type="button.type" text bg>{{
          button.text
        }}</el-button>
        <el-divider direction="vertical" />
        <span>duration:</span>
      </div>
      <p>
        lobortis varius. Sed elementum posuere ante in scelerisque. Vivamus nec odio interdum,
        mollis lacus ut, aliquet nulla. Morbi et gravida ex. Phasellus sed nisl dui. Phasellus sed
      </p>
    </el-col>
  </el-row>
</template>

<script setup>
import { useStore } from '../store/SimStore'

const store = useStore()

const buttons = [
  { type: 'info', text: 'info' },
  { type: 'primary', text: 'reset' }
]
</script>
<style scoped>
#border_class {
  border-left: 0.13rem solid white; /*this should be changed globally with theme's variable*/
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  margin-top: 15px;
  width: 350px;
}
</style>
