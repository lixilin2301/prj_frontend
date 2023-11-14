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
          <el-button @click="search($event)">搜索</el-button>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="saveDep(scope.row)" v-show="scope.row.edit">确认申请</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
  </el-container>
</template>

<script>
import axios from "axios"
axios.defaults.baseURL = "http://localhost:9090/api/employee";
export default {
  name: "Home",
  data() {
    return {"tableData": [],
      dateRange: ''
    }
  },
  mounted() {
    const prevalue = {          
      "employeeID": this.$route.query.id,
      "dept": this.$route.query.dept,
      "name": this.$route.query.name,
      "position": this.$route.query.position,
      "edit": false};
    axios.get(this.$route.query.id+"/increaseSalary/").then(res => {
      if (res.status == 200) {
        let dept = res.data;
        dept.forEach(e => {
          Object.assign(e, prevalue);
        });
        this.tableData = dept;
        this.addDep();
      }
    });
  },
  methods: {
      navTo(routeName) {
          this.$router.push({name: routeName});
      },
      addDep() {
        this.tableData.push({
          "employeeID": this.$route.query.id,
          "dept": this.$route.query.dept,
          "name": this.$route.query.name,
          "position": this.$route.query.position,
          "salaryIncrease": "",
          "reviewer": "",
          "comment": "",
          "edit": true
        });
      },
      saveDep(row) {
        row.edit = false;
        axios.post(this.$route.query.id+"/increaseSalary/", row);
      },
      search() {
        if (!this.dateRange[0]){
          return;
        }
        const prevalue = {          
          "employeeID": this.$route.query.id,
          "dept": this.$route.query.dept,
          "name": this.$route.query.name,
          "position": this.$route.query.position,
          "edit": false};
        axios.get(this.$route.query.id+"/increaseSalary/search?startDate="+this.dateRange[0].toJSON()+"&endDate="+this.dateRange[1].toJSON()).then(res => {
          if (res.status == 200) {
            let dept = res.data;
            dept.forEach(e => {
              Object.assign(e, prevalue);
            });
            this.tableData = dept;
          }
        });
      }
  }
}
</script>