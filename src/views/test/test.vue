<template>

  <div id="evalContainer">
    <el-row :gutter="20">
      <el-col :span="6"><div id="middleBox3" class="colBox3 grid-content bg-purple left"></div></el-col>
      <el-col :span="6"><div id="middleBox4" class="colBox3 grid-content bg-purple "></div></el-col>
      <el-col :span="6"><div id="middleBox5" class="colBox3 grid-content bg-purple "></div></el-col>
      <el-col :span="6"><div id="middleBox6" class="colBox3 grid-content bg-purple right"></div></el-col>
    </el-row>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'effectEvaluation',
    components: {},
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
      ])
    }
  }
</script>

<style>

</style>
