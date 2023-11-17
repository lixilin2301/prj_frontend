<template>
  <el-container>
      <el-header>
          <h1>涨薪信息管理</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="navTo('employee',$event)">返回</el-button>
          <el-date-picker
            v-model="dateRange"
            type="daterange">
          </el-date-picker>
          <el-button @click="searchByDateRange($event)">搜索</el-button>
        </el-row>
        <el-table :data="tableData">
          <el-table-column prop="employeeID" label="员工编号"></el-table-column>
          <el-table-column prop="dept" label="所在部门"></el-table-column>
          <el-table-column prop="name" label="员工姓名"></el-table-column>
          <el-table-column prop="position" label="员工职位"></el-table-column>
          <el-table-column prop="salaryIncrease" label="员工涨薪">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.salaryIncrease}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.salaryIncrease"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="reviewer" label="审批人">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.reviewer}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.reviewer"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="comment" label="审批意见">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.comment}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.comment"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="datetime" label="时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="save(scope.row, 'increaseSalary')" v-show="scope.row.edit">确认申请</el-button>
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
  name: "IncreaseSalary",
  data() {
    return {
      "tableData": [],
      dateRange: ''
    }
  },
  mounted() {
    axios.defaults.baseURL = "http://localhost:8080/api/employee";
    this.get("increaseSalary");
  },
  methods: apiUtils.methods
}
</script>