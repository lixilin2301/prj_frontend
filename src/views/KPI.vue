<template>
  <el-container>
      <el-header>
          <h1>考核信息管理</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="navTo('kpiemployee',$event)">返回</el-button>
        </el-row>
        <el-table :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column prop="id" label="员工编号"></el-table-column>
          <el-table-column prop="dept" label="所在部门"></el-table-column>
          <el-table-column prop="name" label="员工姓名"></el-table-column>
          <el-table-column prop="position" label="员工职位"></el-table-column>
          <el-table-column prop="reviewer" label="评价人">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.reviewer}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.reviewer"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="kpi" label="当年KPI">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.kpi}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.kpi"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="review" label="评价意见">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.review}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.review"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="评价时间"></el-table-column>
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
export default {
  name: "Home",
  data() {
    return {"tableData": [
      {
        "id": this.$route.query.id,
        "dept": this.$route.query.dept,
        "name": this.$route.query.name,
        "position": this.$route.query.position,
        "kpi": "12323",
        "reviewer": "王哥",
        "review": "我觉得行",
        "time": "1992-09-09",
        "edit": false
      },
      {
        "id": this.$route.query.id,
        "dept": this.$route.query.dept,
        "name": this.$route.query.name,
        "position": this.$route.query.position,
        "kpi": "12323",
        "reviewer": "王哥",
        "review": "我觉得行",
        "time": "1992-09-09",
        "edit": false
      },
      {
        "id": this.$route.query.id,
        "dept": this.$route.query.dept,
        "name": this.$route.query.name,
        "position": this.$route.query.position,
        "kpi": "12323",
        "reviewer": "王哥",
        "review": "我觉得行",
        "time": "1992-09-09",
        "edit": false
      }]
    }
  },
  beforeMount() {
   this.addDep()
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
          "reviewer": this.$route.query.manager,
          "review": "",
          "edit": true
        });
      },
      saveDep(row) {
        row.edit = false;
      }
  }
}
</script>