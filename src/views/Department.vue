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
import axios from "axios"
axios.defaults.baseURL = "http://localhost:9090/api/department";
export default {
    name: "Home",
    data() {
      return {"tableData": [],
        multipleSelection: [],
        searchContent: ""
      }
    },
    mounted() {
      axios.get("/").then(res => {
        if (res.status == 200) {
          let dept = res.data;
          dept.forEach(e => e["edit"] = false);
          this.tableData = dept;
        }
      })
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
          axios.post("/", row);
        },
        deleteDep(index) {
          let that = this;
          const dep = this.tableData[index];
          axios.delete("/" + dep.id).then(function() {
            that.tableData.splice(index,1);
          });
        },
        deleteMultiDep() {
          let that = this;
          const ids = this.multipleSelection.map(e => e.id);
          axios.delete("/", {data: ids}).then(function() {
            that.tableData = that.tableData.filter(e => ids.indexOf(e.id) == -1);
          });
          this.multipleSelection = [];
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        search() {
          axios.get("/search?key=" + this.searchContent).then(res => {
            if (res.status == 200) {
              let dept = res.data;
              dept.forEach(e => e["edit"] = false);
              this.tableData = dept;
            }
          })
        }
    }
}
</script>