<template>
  <el-container>
      <el-header>
          <h1>员工信息管理</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="navTo('home',$event)">返回</el-button>
          <el-button @click="addDep($event)">新增</el-button>
          <el-button @click="deleteMultiDep($event)">删除</el-button>
          <el-input v-model="searchContent" style="width: 150px;"></el-input>
          <el-button @click="search($event)">搜索</el-button>
        </el-row>
        <el-table :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection"/>
          <el-table-column prop="id" label="员工编号">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.id}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.id"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dept" label="所在部门">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.dept}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.dept"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="员工姓名">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.name}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="position" label="员工职位">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.position}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.position"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="salary" label="员工薪资">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.salary}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.salary"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button type="success" @click="editDep(scope.row)" v-show="!scope.row.edit">编辑</el-button>
              <el-button type="primary" @click="saveDep(scope.row)" v-show="scope.row.edit">保存</el-button>
              <el-button type="danger" @click="deleteDep(scope.$index, $event)">删除</el-button>
              <el-button type="primary" @click="navTo('approval', scope.row)">涨薪</el-button>
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
        "edit": false
      },
      {
        "id": "2",
        "dept": "财务部门",
        "name": "王哥",
        "position": "经理",
        "salary": "12345",
        "edit": false
      },
      {
        "id": "3",
        "dept": "财务部门",
        "name": "拉哥",
        "position": "开发",
        "salary": "12345",
        "edit": false
      }],
      multipleSelection: [],
      searchContent: ""
    }
  },
  methods: {
      navTo(routeName, params) {
          this.$router.push({name: routeName, query: params});
      },
      addDep() {
        this.tableData.push({
          "id": "",
          "name": "",
          "manager": "",
          "edit": true
        });
      },
      editDep(row) {
        row.edit = true;
      },
      saveDep(row) {
        row.edit = false;
      },
      deleteDep(index) {
        this.tableData.splice(index,1);
      },
      deleteMultiDep() {
        this.tableData = this.tableData.filter(e => this.multipleSelection.indexOf(e) == -1);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      search() {
        this.tableData = this.tableData.filter(e => (e.id.indexOf(this.searchContent) != -1) || (e.name.indexOf(this.searchContent) != -1) || e.manager.indexOf(this.searchContent) != -1);
      }
  }
}
</script>