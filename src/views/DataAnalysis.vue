<template>
  <el-container>
      <el-header>
          <h1>数据分析管理</h1>
      </el-header>
      <el-main>
        <el-row>
          <el-button @click="navTo('home',$event)">返回</el-button>
          <el-button type="success" @click="analyze()">分析</el-button>
        </el-row>
        <el-row>
          <label>结论：</label>
          <label>y=ax+b, a={{ varA }}, b={{ varB }}</label>
        </el-row>
        <el-row>
          <label>计算X:</label>
          <el-input v-model="varX" style="width: 100px;"></el-input>
          <label>结果Y: {{ varY }}</label>
          <el-button type="success" @click="compute()">计算</el-button>
        </el-row>
        <el-table :data="tableData">
          <el-table-column prop="x" label="x">
          </el-table-column>
          <el-table-column prop="y" label="y">
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
        "x": "1",
        "y": "2"
      },
      {
        "x": "3",
        "y": "4"
      }],
      "varA":10,
      "varB":12,
      "varX":0,
      "varY":0
    }
  },
  methods: {
      navTo(routeName) {
          this.$router.push({name: routeName});
      },
      analyze() {
        console("abc");
      },
      compute() {
        this.varY = this.varA * this.varX + this.varB;
      }
  }
}
</script>