<template>
  <el-container>
      <el-header>
          <h1>数据分析管理</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="navTo('home',$event)">返回</el-button>
          <el-button type="success" @click="analyze()">分析</el-button>
        </el-row>
        <el-row>
          <h2>请填写数据：</h2>
          <el-input type="textarea" v-model="tableData" :autosize="{maxRows: 10, minRows: 2}">Content</el-input>
          <h2>计算结果：</h2>
          <label>y=ax+b, a={{ varA }}, b={{ varB }}, MSE={{ varMSE }}</label>
        </el-row>
        <el-row>
          <label>计算X:</label>
          <el-input v-model="varX" style="width: 100px;"></el-input>
          <label>结果Y: {{ varY }}</label>
          <el-button type="success" @click="compute()">计算</el-button>
        </el-row>
      </el-main>
  </el-container>
</template>

<script>
import axios from "axios"
import apiUtils from "../utils/apiUtils"
export default {
  name: "Analysis",
  data() {
    return {
      "tableData": "",
      "varA": "",
      "varB": "",
      "varMSE": "",
      "varX": "",
      "varY": ""
    }
  },
  mounted() {
    axios.defaults.baseURL = "http://localhost:8080/api/salaryData";

  },
  methods: apiUtils.methods
}
</script>