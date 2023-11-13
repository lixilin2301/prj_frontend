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
export default {
  name: "Home",
  data() {
    return {"tableData": [
      {
        "id": "1",
        "dept": "研发部门",
        "name": "李哥",
        "position": "开发",
        "salary": "12345",
        "manager": "渣渣辉",
        "edit": false
      },
      {
        "id": "2",
        "dept": "财务部门",
        "name": "王哥",
        "position": "经理",
        "salary": "12345",
        "manager": "渣渣辉",
        "edit": false
      },
      {
        "id": "3",
        "dept": "财务部门",
        "name": "拉哥",
        "position": "开发",
        "salary": "12345",
        "manager": "渣渣辉",
        "edit": false
      }],
      searchIdContent: "",
      searchNameContent: ""
    }
  },
  methods: {
      navTo(routeName, params) {
          this.$router.push({name: routeName, query: params});
      },
      search(searchBy) {
        if(searchBy === "id") {
          this.tableData = this.tableData.filter(e => (e.id.indexOf(this.searchIdContent) != -1));
        } else {
          this.tableData = this.tableData.filter(e => (e.name.indexOf(this.searchNameContent) != -1));
        }
      }
  }
}
</script>