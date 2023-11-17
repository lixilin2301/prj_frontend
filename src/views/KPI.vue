<template>
  <el-container>
      <el-header>
          <h1>考核信息管理</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="navTo('kpiemployee',$event)">返回</el-button>
        </el-row>
        <el-table :data="tableData">
          <el-table-column prop="id" label="员工编号"></el-table-column>
          <el-table-column prop="dept" label="所在部门"></el-table-column>
          <el-table-column prop="name" label="员工姓名"></el-table-column>
          <el-table-column prop="position" label="员工职位"></el-table-column>
          <el-table-column prop="leader" label="评价人">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.leader}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.leader"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="kpi" label="当年KPI">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.kpi}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.kpi"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="comments" label="评价意见">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.comments}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.comments"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="checkDate" label="评价时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="save(scope.row, 'kpi')" v-show="scope.row.edit">确认考核</el-button>
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
  name: "KPI",
  data() {
    return {"tableData": []}
  },
  mounted() {
    axios.defaults.baseURL = "http://localhost:8080/api/employeeKPI";
    this.get("kpi");
  },
  methods: apiUtils.methods
}
</script>