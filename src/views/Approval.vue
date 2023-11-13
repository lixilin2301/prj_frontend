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
        <el-table :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column prop="id" label="员工编号"></el-table-column>
          <el-table-column prop="dept" label="所在部门"></el-table-column>
          <el-table-column prop="name" label="员工姓名"></el-table-column>
          <el-table-column prop="position" label="员工职位"></el-table-column>
          <el-table-column prop="approvalOriginalSalary" label="员工原始薪资"></el-table-column>
          <el-table-column prop="approvalSalaryIncrease" label="员工涨薪">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.approvalSalaryIncrease}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.approvalSalaryIncrease"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="approver" label="审批人">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.approver}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.approver"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="approvalReview" label="审批意见">
            <template slot-scope="scope">
              <span v-show="!scope.row.edit">{{scope.row.approvalReview}}</span>
              <el-input v-show="scope.row.edit" v-model="scope.row.approvalReview"></el-input>
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
export default {
  name: "Home",
  data() {
    return {"tableData": [
      {
        "id": this.$route.query.id,
        "dept": this.$route.query.dept,
        "name": this.$route.query.name,
        "position": this.$route.query.position,
        "approvalOriginalSalary": "12323",
        "approvalSalaryIncrease": "1000",
        "approver": "王哥",
        "approvalReview": "我觉得行",
        "edit": false
      },
      {
        "id": this.$route.query.id,
        "dept": this.$route.query.dept,
        "name": this.$route.query.name,
        "position": this.$route.query.position,
        "approvalOriginalSalary": "13323",
        "approvalSalaryIncrease": "1000",
        "approver": "李哥",
        "approvalReview": "我觉得也行",
        "edit": false
      },
      {
        "id": this.$route.query.id,
        "dept": this.$route.query.dept,
        "name": this.$route.query.name,
        "position": this.$route.query.position,
        "approvalOriginalSalary": "13323",
        "approvalSalaryIncrease": "1000",
        "approver": "超哥",
        "approvalReview": "我觉得不行",
        "edit": false
      }],
      dateRange: ''
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
          "approvalOriginalSalary": this.$route.query.salary,
          "approvalSalaryIncrease": "",
          "approver": "",
          "approvalReview": "",
          "edit": true
        });
      },
      saveDep(row) {
        row.edit = false;
      },
      search() {
        console.log(this.dateRange[0]);
        console.log(this.dateRange[1]);
      }
  }
}
</script>