import axios from "axios"
export default {
  methods: {
    navTo(routeName, params) {
      this.$router.push({name: routeName, query: params});
    },
    get(pageType) {
      if (pageType == "increaseSalary") {
        const prevalue = {          
          "employeeID": this.$route.query.id,
          "dept": this.$route.query.dept,
          "name": this.$route.query.name,
          "position": this.$route.query.position,
          "edit": false};
        axios.get(this.$route.query.id+"/increaseSalary/").then(res => {
          if (res.status == 200) {
            let dept = res.data;
            dept.forEach(e => {
              Object.assign(e, prevalue);
            });
            this.tableData = dept;
            this.add("increaseSalary");
          }
        });
      } else if (pageType == "kpi") {
        const prevalue = {          
          "id": this.$route.query.id,
          "dept": this.$route.query.dept,
          "name": this.$route.query.name,
          "position": this.$route.query.position,
          "edit": false};
        axios.get("/"+this.$route.query.id).then(res => {
          if (res.status == 200) {
            let dept = res.data;
            dept.forEach(e => {
              Object.assign(e, prevalue);
            });
            this.tableData = dept;
            this.add("kpi");
          }
        });
      } else {
        axios.get("/").then(res => {
          if (res.status == 200) {
            let entities = res.data;
            entities.forEach(e => e["edit"] = false);
            this.tableData = entities;
          }
        })
      }
    },
    add(pageType) {
      let empty = {};
      switch(pageType) {
        case "dept":
          empty = {
            "id": "",
            "name": "",
            "manager": "",
            "edit": true
          };
          break;
        case "employee":
          empty = {
            "id": "",
            "name": "",
            "manager": "",
            "edit": true
          }; 
          break;
        case "increaseSalary":
          empty = {
            "employeeID": this.$route.query.id,
            "dept": this.$route.query.dept,
            "name": this.$route.query.name,
            "position": this.$route.query.position,
            "salaryIncrease": "",
            "reviewer": "",
            "comment": "",
            "edit": true
          };
          break;
        case "kpi":
          empty = {
            "id": this.$route.query.id,
            "dept": this.$route.query.dept,
            "name": this.$route.query.name,
            "position": this.$route.query.position,
            "kpi": "",
            "leader": this.$route.query.manager,
            "comments": "",
            "edit": true
          };
          break;
      }
      this.tableData.push(empty);
    },
    edit(row) {
      row.edit = true;
    },
    save(row, pageType) {
      let path = "/";
      if (pageType == "increaseSalary") {
        path = this.$route.query.id+"/increaseSalary/";
      } else if (pageType == "kpi") {
        path = this.$route.query.id;
      }
      row.edit = false;
      axios.post(path, row).then(() => this.get(pageType));
    },
    deleteSingle(index) {
      const entity = this.tableData[index];
      if(entity.id) {
        axios.delete("/" + entity.id).then(() => this.get());
      } else {
        this.get()
      }
    },
    deleteMulti() {
      const ids = this.multipleSelection.map(e => e.id);
      axios.delete("/", { data: ids }).then(() => this.get());
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search() {
      axios.get("/search?key=" + this.searchContent).then(res => {
        if (res.status == 200) {
          let entities = res.data;
          entities.forEach(e => e["edit"] = false);
          this.tableData = entities;
        }
      })
    },
    searchByDateRange() {
      if (!this.dateRange[0]){
        this.get("increaseSalary");
        return;
      }
      const prevalue = {          
        "employeeID": this.$route.query.id,
        "dept": this.$route.query.dept,
        "name": this.$route.query.name,
        "position": this.$route.query.position,
        "edit": false};
      axios.get(this.$route.query.id+"/increaseSalary/search?startDate="+this.dateRange[0].toJSON()+"&endDate="+this.dateRange[1].toJSON()).then(res => {
        if (res.status == 200) {
          let dept = res.data;
          dept.forEach(e => {
            Object.assign(e, prevalue);
          });
          this.tableData = dept;
        }
      });
    },
    analyze() {
      let inputData = this.tableData.split('\n');
      inputData = inputData.map(e => {
        const xy = e.split(',');
        return {"years": xy[0], "salary": xy[1]};
      })
      axios.post("/import", inputData).then(res => {
        this.varA = res.data[0];
        this.varB = res.data[1];
        this.varMSE = res.data[2];
      });
      console.log(inputData);
    },
    compute() {
      if (this.varA && this.varB && this.varX) {
        this.varY = this.varA * this.varX + this.varY;
      }
    }
  }
}