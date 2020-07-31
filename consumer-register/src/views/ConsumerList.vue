<template>
  <div class="container">
          <div class="form-row align-items-center">
          <label class="col-1" foor="page-size" style="color:black">
            Page Size:
          </label>
          <select
            v-on:change="onPageSizeChanged()" 
            class="custom-select col-1"
            name="page-size"
            id="page-size"
          >
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
    <ag-grid-vue
      style="width: 100%; height: 400px;"
      class="ag-theme-alpine mt-2"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :gridOptions="gridOptions"
      @grid-ready="onGridReady"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import { getConsumers, deleteConsumer } from "../services/consumerService";
export default {
  name: "ConsumerList",
  data() {
    return {
      rowData: [],
      columnDefs: null,
      gridOptions: null
    };
  },
  components: {
    AgGridVue
  },
  beforeMount() {
    this.getGridOpts();
    this.fetchConsumers();
    this.getColomnDef();
  },

  methods: {
    onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  },

  onPageSizeChanged(){
    var value = document.getElementById("page-size").value;
    console.log(value);
    this.gridApi.paginationSetPageSize(Number(value));
  },
    getColomnDef() {
      this.columnDefs = [
        {
          headerName: "Id",
          field: "id",
          checkboxSelection: true,
          headerCheckboxSelection: true
        },
        {
          headerName: "Username",
          field: "name"
        },
        {
          field: "email"
        },
        {
          cellRenderer: object => {
            const route = {
              name: "Detail",
              params: { id: object.data.id }
            };
            const link = document.createElement("a");
            link.href = this.$router.resolve(route).href;
            link.innerText = "View";
            link.addEventListener("click", e => {
              e.preventDefault();
              this.$router.push(route);
            });
            return link;
          }
        },
        {
          cellRenderer: object => {
            const route = {
              name: "Edit",
              params: { id: object.data.id }
            };
            const link = document.createElement("a");
            link.href = this.$router.resolve(route).href;
            link.innerText = "Edit";
            link.style.color = "green";
            link.addEventListener("click", e => {
              e.preventDefault();
              this.$router.push(route);
            });
            return link;
          }
        },
        {
          cellRenderer: object => {
            const id = object.data.id;
            const link = document.createElement("a");
            link.style.color = "red";
            link.style.cursor = "pointer";
            link.innerText = "Delete";
            link.addEventListener("click", e => {
              e.preventDefault();
              if (confirm("Are you sure ?")) {
                this.deleteConsumer(id);
              }
            });
            return link;
          }
        }
      ];
    },
    getGridOpts() {
      this.gridOptions = {
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1,
          minWidth: 100
        },
        paginationPageSize: 5,
        pagination: true,
        rowSelection: "multiple"
      };
    },
    async fetchConsumers() {
      try {
        const response = await getConsumers();
        this.rowData = response.data;
        this.$toasted.info("table loaded successfully !");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteConsumer(id) {
      try {
        await deleteConsumer(id);
        this.$toasted.info("deleted successfully !");
        window.location = "/consumers";
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
@import "../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
