import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Department from '../views/Department.vue'
import Employee from '../views/Employee.vue'
import Approval from '../views/Approval.vue'
import KPIEmployee from '../views/KPIEmployee.vue'
import KPI from '../views/KPI.vue'
import DataAnalysis from '../views/DataAnalysis.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/department',
    name: 'department',
    component: Department
  },
  {
    path: '/employee',
    name: 'employee',
    component: Employee
  },
  {
    path: '/approval',
    name: 'approval',
    component: Approval
  },
  {
    path: '/kpiemployee',
    name: 'kpiemployee',
    component: KPIEmployee
  },
  {
    path: '/kpi',
    name: 'kpi',
    component: KPI
  },
  {
    path: '/dataanalysis',
    name: 'dataanalysis',
    component: DataAnalysis
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
