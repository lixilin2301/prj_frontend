<template>
    <el-container>
        <el-header>
            <h1>部门信息管理</h1>
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
            <el-table-column prop="id" label="部门编号">
              <template slot-scope="scope">
                <span v-show="!scope.row.edit">{{scope.row.id}}</span>
                <el-input v-show="scope.row.edit" v-model="scope.row.id"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="部门名称">
              <template slot-scope="scope">
                <span v-show="!scope.row.edit">{{scope.row.name}}</span>
                <el-input v-show="scope.row.edit" v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="manager" label="部门经理">
              <template slot-scope="scope">
                <span v-show="!scope.row.edit">{{scope.row.manager}}</span>
                <el-input v-show="scope.row.edit" v-model="scope.row.manager"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success" @click="editDep(scope.row)" v-show="!scope.row.edit">编辑</el-button>
                <el-button type="primary" @click="saveDep(scope.row)" v-show="scope.row.edit">保存</el-button>
                <el-button type="danger" @click="deleteDep(scope.$index, $event)">删除</el-button>
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
          "name": "技术部门",
          "manager": "李哥",
          "edit": false
        },
        {
          "id": "2",
          "name": "财务部门",
          "manager": "王哥",
          "edit": false
        },
        {
          "id": "3",
          "name": "物流部门",
          "manager": "四哥",
          "edit": false
        }],
        multipleSelection: [],
        searchContent: ""
      }
    },
    methods: {
        navTo(routeName) {
            this.$router.push({name: routeName});
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