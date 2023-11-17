<template>
  <el-container>
      <el-header>
          <h1>考核信息管理</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="navTo('home',$event)">返回</el-button>
          <label>员工编号/姓名:</label>
          <el-input v-model="searchContent" style="width: 150px;"></el-input>
          <el-button @click="search()">搜索</el-button>
        </el-row>
        <el-table :data="tableData">
          <el-table-column prop="id" label="员工编号">
          </el-table-column>
          <el-table-column prop="dept" label="所在部门">
          </el-table-column>
          <el-table-column prop="name" label="员工姓名">
          </el-table-column>
          <el-table-column prop="position" label="员工职位">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="navTo('kpi', scope.row)">考核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
  </el-container>
</template>

<script>
import axios from "axios"
import apiUtils from "../utils/apiUtils"
export default {
  name: "KPIEmployee",
  data() {
    return {
      "tableData": [],
      searchContent: ""
    }
  },
  mounted() {
    axios.defaults.baseURL = "http://localhost:8080/api/employee";
    this.get();
  },
  methods: apiUtils.methods
}
</script>