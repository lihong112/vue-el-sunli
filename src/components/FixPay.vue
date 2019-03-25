<template>
  <div>

    <el-table :data="tableData" style="width: 100%"  border stripe
              :default-sort = "{prop: 'spendingTime', order: 'descending'}"
    >
      <el-table-column label="固定投资列表" align='center'>
        <el-table-column   label="#" type="index"></el-table-column>
        <el-table-column  label="费用名" prop="name"></el-table-column>
        <!--<el-table-column  label="是否是固定开支" prop="type"></el-table-column>-->
        <el-table-column sortable label="金额" prop="money"></el-table-column>
        <el-table-column sortable  label="费用产生时间" prop="spendingTime"></el-table-column>
        <el-table-column  label="费用说明" prop="remark"></el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="updateRow(scope.$index, scope.row)"
              size="small" type="primary">
              修改
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-button id="addButton" @click="showDialog()"
               size="medium" type="primary">
      添加
    </el-button>

    <!--弹窗数据-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="费用名">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="费用">
          <el-input v-model="form.money" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出时间">
          <br>
            <el-date-picker
              class="input-class"
              v-model="form.spendingTime"
              width="100%"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMethod()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
  #addButton{
    margin-top: 20px;
    margin-left: 94%;
  }
  .input-class{
    width:100%;
  }

</style>

<script>
  export default {
    data () {
      return {
        tableData:[],
        dialogFormVisible:false,
        form:{},
        dialogTitle:"添加固定投资",
        isUpdate:false
      }
    },
    methods: {
      updateRow(index,data){
        this.dialogTitle="修改固定投资"
        this.dialogFormVisible=true
        this.form=data
        this.isUpdate=true
      },
      addMethod(){
        console.log(this.form)
        let url=""
        if(this.isUpdate){
          url="/rest/previous/sale/update/one"
        }else {
          url = "/rest/previous/sale/insert/list"
          this.form.type=0
        }
        this.$http.post(url, this.form)
          .then(result => {
            this.getData()
          })
          .catch(error => {
            console.log(error)
          })
        this.dialogFormVisible=false
      },
      showDialog(){
        this.dialogFormVisible=true
        console.log("enter showDialog")
      },
      deleteRow(index, row) {
        let url = "/rest/previous/sale/delete/one";
        this.$http.get(url,{params:{id:row.id}})
          .then(result => {
            this.getData()
          })
          .catch(error => {
            console.log(error)
          })
        console.log(index);
        console.log(row);
      },
      getData () {
        let url = "/rest/previous/sale/select/list";
        let param ={ "type": 0 }
        this.$http.post(url, param)
          .then(result => {
            this.tableData = result.data.data.list
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    mounted () {
      // 调用请求数据的方法
      this.getData()
    }
  }
</script>
