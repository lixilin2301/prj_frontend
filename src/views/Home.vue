<template>
    <el-container>
        <el-header>
            <h1>员工信息管理系统</h1>
        </el-header>
        <el-main>
            <el-row>
                <el-button @click="navTo('department',$event)">部门信息管理</el-button>
                <el-button @click="navTo('employee',$event)">员工信息管理</el-button>
            </el-row>
            <el-row>
                <el-button @click="navTo('kpiemployee',$event)">员工考核管理</el-button>
                <el-button @click="navTo('dataanalysis',$event)">数据分析管理</el-button>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "Home",
    methods: {
        navTo(routeName) {
            this.$router.push({name: routeName});
        }
    }
}
</script>