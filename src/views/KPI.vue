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
              <el-button type="primary" @click="saveDep(scope.row)" v-show="scope.row.edit">确认考核</el-button>
            </template>
          </el-table-column>
          
        </el-table>
      </el-main>
  </el-container>
</template>

<script>
import axios from "axios"
export default {
  name: "Home",
  data() {
    return {"tableData": []
    }
  },
  mounted() {
    axios.defaults.baseURL = "http://localhost:9090/api/employeeKPI";
    const prevalue = {          
      "id": this.$route.query.id,
      "dept": this.$route.query.dept,
      "name": this.$route.query.name,
      "position": this.$route.query.position,
      "edit": false};
    axios.get("/"+this.$route.query.id).then(res => {
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
          "id": this.$route.query.id,
          "dept": this.$route.query.dept,
          "name": this.$route.query.name,
          "position": this.$route.query.position,
          "kpi": "",
          "leader": this.$route.query.manager,
          "comments": "",
          "edit": true
        });
      },
      saveDep(row) {
        row.edit = false;
        axios.post("/" + this.$route.query.id, row);
      }
  }
}
</script>