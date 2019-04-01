<template>
  <div>
    <strong style="font-size: large">月支出</strong>
    <br>
    <br>
    <div style="margin-left: 40px">
      <!--开始日期：-->
        <el-date-picker
          v-model="spendingTime1"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="选择开始日期时间">
        </el-date-picker>
      <!--结束日期：-->
      —
      <el-date-picker
        v-model="spendingTime2"
        type="date"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        placeholder="选择结束日期时间">
      </el-date-picker>
      <el-button @click="getData"  type="primary">
        查询
      </el-button>
    </div>
    <br>
    <div style="margin-left: 40px">
    <!--<br>-->
    <el-table :data="tableData" style="width: 100%"  border stripe
              :default-sort = "{prop: 'spendingTime', order: 'descending'}"
              show-summary
    >
      <!--<el-table-column label="月支出" align='center'>-->
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
      <!--</el-table-column>-->
    </el-table>
    <el-button id="addButton" @click="showDialog()"
               size="medium" type="primary">
      添加
    </el-button>
  </div>

    <!--弹窗数据-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="费用名">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="费用类型">
          <!--<el-input v-model="form.type" auto-complete="off"></el-input>-->
          <!--addForm.edititem最后取得的label的值。-->
          <!--0:前期固定支出，1:月固定支出，2:浮动支出-->
          <!--<el-radio-group v-model="form.type">  -->
      <!--    <el-radio class="radio" label="0">前期固定支出</el-radio>-->
      <!--    <el-radio class="radio" label="1">月固定支出</el-radio>-->
            <!--<el-radio class="radio" label="2">浮动支出</el-radio>-->
          <!--</el-radio-group>-->
          <br>
          <el-select v-model="form.type"  width="100%" class="input-class"  placeholder="请选择">
            <!--<el-option label="前期固定支出" value="0"> </el-option>-->
            <el-option label="月固定支出" value="1"> </el-option>
            <el-option label="浮动支出" value="2"> </el-option>
          </el-select>
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
        dialogTitle:"添加月支出",
        isUpdate:false,
        spendingTime1:"",
        spendingTime2:""
      }
    },
    methods: {
      updateRow(index,data){
        this.dialogTitle="修改月支出项"
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
          // this.form.type=0
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
        this.isUpdate=false
        this.form={}
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
        console.log(this.spendingTime1)
        console.log(this.spendingTime2)
        let param ={ "type": [1,2],"spendingTime1": this.spendingTime1,"spendingTime2":this.spendingTime2}
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
