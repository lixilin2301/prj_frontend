<template>
  <el-container>
      <el-header>
          <h1>考核信息管理</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="navTo('home',$event)">返回</el-button>
          <label>员工编号:</label>
          <el-input v-model="searchIdContent" style="width: 150px;"></el-input>
          <el-button @click="search('id')">搜索</el-button>
          <label>员工姓名:</label>
          <el-input v-model="searchNameContent" style="width: 150px;"></el-input>
          <el-button @click="search('name')">搜索</el-button>
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
export default {
  name: "Home",
  data() {
    return {"tableData": [],
      searchIdContent: "",
      searchNameContent: ""
    }
  },
  mounted() {
    axios.defaults.baseURL = "http://localhost:9090/api/employee";
    axios.get("/").then(res => {
      if (res.status == 200) {
        let dept = res.data;
        dept.forEach(e => e["edit"] = false);
        this.tableData = dept;
      }
    })
  },
  methods: {
      navTo(routeName, params) {
          this.$router.push({name: routeName, query: params});
      },
      search(searchBy) {
        if(searchBy === "id") {
          axios.get("/"+this.searchIdContent).then(res => {
            if (res.status == 200) {
              let dept = res.data;
              dept["edit"] = false;
              this.tableData = [dept];
            }
          });
        } else {
          axios.get("/search?key="+this.searchNameContent).then(res => {
            if (res.status == 200) {
              let dept = res.data;
              dept.forEach(e => e["edit"] = false);
              this.tableData = dept;
            }
          });
        }
      }
  }
}
</script>