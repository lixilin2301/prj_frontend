<template>
  <el-container>
    <el-header>
      <h1>部门信息管理</h1>
    </el-header>
    <el-main>
      <el-row>
        <el-button @click="navTo('home', $event)">返回</el-button>
        <el-button @click="add('dept',$event)">新增</el-button>
        <el-button @click="deleteMulti($event)">删除</el-button>
        <el-input v-model="searchContent" style="width: 150px;"></el-input>
        <el-button @click="search($event)">搜索</el-button>
      </el-row>
      <el-table :data="tableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column prop="id" label="部门编号">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{ scope.row.id }}</span>
            <el-input v-show="scope.row.edit" v-model="scope.row.id"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="部门名称">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{ scope.row.name }}</span>
            <el-input v-show="scope.row.edit" v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="manager" label="部门经理">
          <template slot-scope="scope">
            <span v-show="!scope.row.edit">{{ scope.row.manager }}</span>
            <el-input v-show="scope.row.edit" v-model="scope.row.manager"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="edit(scope.row)" v-show="!scope.row.edit">编辑</el-button>
            <el-button type="primary" @click="save(scope.row)" v-show="scope.row.edit">保存</el-button>
            <el-button type="danger" @click="deleteSingle(scope.$index, $event)">删除</el-button>
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
  name: "Department",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      searchContent: ""
    }
  },
  mounted() {
    axios.defaults.baseURL = "http://localhost:8080/api/department";
    this.get();
  },
  methods: apiUtils.methods
}
</script>