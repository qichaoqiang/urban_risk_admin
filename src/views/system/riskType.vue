<template>
  <div class="user_container">
    <Row type="flex" justify="space-between" align="middle">
      <div class="title">风险源类别</div>
      <Button v-if="hasAuth('fengxianyuanleibie')" type="primary" @click="openFxylbModel" style="width: 60px">
        <Icon type="ios-add" size="28" />
      </Button>
    </Row>
    <div v-if="hasAuth('fengxianyuanleibie')">
      <Divider />
      <Row type="flex" justify="space-between" align="middle">
        <Breadcrumb separator=">">
          <BreadcrumbItem>
            <span class="link" @click="navigate(0)">顶级</span>
          </BreadcrumbItem>
          <BreadcrumbItem v-for="(item, index) in parents" :key="item.id">
            <span class="link" @click="navigate(index + 1)">{{item.fxylbmc}}</span>
          </BreadcrumbItem>
        </Breadcrumb>
        <Row type="flex" align="middle">
          <Col>显示隐藏风险源类别：</Col>
          <Col span="2">
          <i-switch v-model="show_yc" @on-change="handleShowYcChange" />
          </Col>
        </Row>
      </Row>
      <Table :loading="loading" :columns="fxylbColumns" :data="fxylbData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="fxylbmc">
          <span class="link" @click="open(row)">{{row.fxylbmc}}</span>
        </template>
        <template slot-scope="{ row }" slot="created_at">
          <span>{{row.created_at.split(' ')[0]}}</span>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" ghost style="margin-right: 5px" @click="viewFxylbModel(row)">查看</Button>
          <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editFxylbModel(row)">编辑</Button>
          <Button v-show="parents.length > 0" type="primary" size="small" ghost style="margin-right: 5px" @click="editFxyMethodsModel(row)">风险计算配置</Button>
          <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeFxylb(row)">
            <Button type="error" size="small" ghost>删除</Button>
          </Poptip>
        </template>
      </Table>
      <Row type="flex" justify="end">
        <Page size="small" style="margin-top: 10px" :page-size="fxylbPage.pageSize" :total="fxylbPage.totalRow"
          show-elevator show-total show-sizer @on-change="handleChangeFxylbPage"
          @on-page-size-change="handleChangeFxylbPageSize" />
      </Row>
    </div>
    <Modal width="820" :title="`${modelTypeList[modeType - 1]}风险源类别`" v-model="showFxylbModel"
      @on-visible-change="fxylbModelChange">
      <Form :disabled="modeType == 3" :model="fxylbForm" ref="fxylb" :rules="fxylbRules" hide-required-mark
        label-position="left" :label-width="120">
        <FormItem label="父风险源类别">
          <Cascader readonly change-on-select v-model="fxylbForm.parent_id" :data="fxylbList" :load-data="loadFxylb"
            :render-format="format" placeholder="请选择"></Cascader>
        </FormItem>
        <FormItem label="风险源类别名称" prop="fxylbmc">
          <Input clearable v-model="fxylbForm.fxylbmc"></Input>
        </FormItem>
        <FormItem label="代码" prop="dm">
          <Input clearable v-model="fxylbForm.dm"></Input>
        </FormItem>
        <FormItem label="图标" prop="icon">
          <Input clearable v-model="fxylbForm.icon"></Input>
        </FormItem>
        <FormItem label="排序" prop="px">
          <InputNumber :min="0" v-model="fxylbForm.px"></InputNumber>
        </FormItem>
        <FormItem label="风险计算方法" prop="px">
          <Select clearable v-model="fxylbForm.method_path">
            <Option v-for="item in fxjsData" :key="item.id" :value="item.method_path">{{item.method_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="图层可叠加" prop="px" v-show="parents.length > 0">
          <Select clearable v-model="fxylbForm.tckdj">
            <Option v-for="item in sfzgyyList" :key="item.value" :value="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否分级">
          <Select clearable v-model="fxylbForm.sffj" placeholder="是否隐藏">
            <Option v-for="item in sfzgyyList" :key="item.value" :value="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否隐藏">
          <Select clearable v-model="fxylbForm.yc" placeholder="是否隐藏">
            <Option v-for="item in sfzgyyList" :key="item.value" :value="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
        <Button v-if="modeType != 3" type="primary" size="large" :loading="fxylbLoading" @click="saveFxylb">保存</Button>
      </div>
    </Modal>
    <Modal width="820" :title="`${modelTypeList[modeType - 1]}风险计算方法`" :footer-hide="modeType === 3" v-model="showFxjsModel"
      @on-visible-change="fxjsModelChange">
      <div class="fxjs_box" style="min-height: 400px;">
        <div class="fxjs_head" style="display: flex;">
          <Button v-show="modeType !== 3" type="text" @click="fxjsBack" style="width: 60px">
            <Icon type="md-arrow-back" size="28" />
          </Button>
          <div class="fxjs_head_empty" style="flex: 1;"></div>
          <Button v-show="modeType === 3" type="primary" @click="openFxjsModel" style="width: 60px">
            <Icon type="ios-add" size="28" />
          </Button>
        </div>
        <div class="fxjs_table" v-show="modeType === 3">
          <Table :loading="loading" :columns="fxjsColumns" :data="fxjsData" style="margin-top: 16px">
            <template slot-scope="{ row }" slot="action">
              <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editFxjs(row)">编辑</Button>
              <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeFxjs(row)">
                <Button type="error" size="small" ghost>删除</Button>
              </Poptip>
            </template>
          </Table>
        </div>
        <div class="fxjs_table" v-show="modeType !== 3" style="padding: 24px; box-sizing: border-box;">
          <Form :model="fxjsForm" ref="fxylb" hide-required-mark
            label-position="left" :label-width="140">
            <FormItem label="风险源类别">{{this.fxjsRow.fxylbmc}}</FormItem>
            <FormItem label="计算方法名称">
              <Input clearable v-model="fxjsForm.method_name"></Input>
            </FormItem>
            <FormItem label="计算方法简要说明">
              <Input clearable type="textarea" v-model="fxjsForm.description"></Input>
            </FormItem>
            <FormItem label="排序">
              <InputNumber :min="0" v-model="fxjsForm.order_num"></InputNumber>
            </FormItem>
            <FormItem label="计算方法代码">
              <Input clearable type="textarea" :rows="6" v-model="fxjsForm.code"></Input>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
        <Button v-if="modeType != 3" type="primary" size="large" :loading="fxjsLoading" @click="saveFxjs">保存</Button>
      </div>
     </Modal>
  </div>
</template>

<script>
  import api from '@/api/api'
  import fxylbjs from '@/common/js/fxylb'
  export default {
    name: '',
    mixins: [fxylbjs],
    data() {
      return {
        id: '',
        loading: true,
        showFxylbModel: false,
        showFxjsModel: false,
        showfxylbDrawer1: false,
        showfxylbDrawer2: false,
        fxylbLoading: false,
        fxjsLoading: false,
        modeType: '',
        fxylbValue: 'id',
        rowItem: null,
        parents: [],
        fxjsRow: {},
        fxjsData: [],
        fxjsForm: {
          fxylb: '',
          method_name: '',
          description: '',
          order_num: 0,
          code: ''
        },
        fxjsId: '',
        fxjsColumns: [{
          title: "序号",
          // fixed: 'left',
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + 1);
          }
        }, {
          title: '计算方法名称',
          key: 'method_name',
          minWidth: 120
        }, {
          title: '排序',
          key: 'order_num',
          minWidth: 160
        }, {
          title: '操作',
          slot: 'action',
          fixed: 'right',
          width: 200
        }],
        fxylbData: [],
        fxylbColumns: [{
          title: "序号",
          // fixed: 'left',
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + (this.fxylbPage.pageIndex - 1) * this.fxylbPage.pageSize + 1);
          }
        }, {
          title: '风险源类别',
          slot: 'fxylbmc',
          minWidth: 160
        }, {
          title: '添加日期',
          slot: 'created_at',
          minWidth: 120
        }, {
          title: '操作',
          slot: 'action',
          fixed: 'right',
          width: 300
        }],
        show_yc: 0,
        fxylbForm: {
          parent_id: [],
          fxylbmc: '',
          dm: '',
          icon: '',
          px: 0,
          method_path: '',
          tckdj: 0,
          yc: 0,
          sffj: 0
        },
        fxylbPage: {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        },
        sfzgyyList: [{
          value: 0,
          name: '否'
        }, {
          value: 1,
          name: '是'
        }],
      }
    },
    watch: {},
    computed: {
      fxylbRules() {
        return {
          fxylbmc: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          dm: [{
            required: true,
            message: '请输入',
            trigger: 'change'
          }],
          // icon: [{ required: true, message: '请输入', trigger: 'change' }],
          px: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
        }
      },
    },
    methods: {
      handleShowYcChange() {
        this.getFxylbData()
      },
      format(labels, selectedData) {
        const index = labels.length - 1;
        const data = selectedData[index] || false;
        return labels[index];
      },
      handleChangeFxylbPage(val) {
        this.fxylbPage.pageIndex = val
        this.getFxylbData()
      },
      handleChangeFxylbPageSize(val) {
        this.fxylbPage.pageSize = val
        this.getFxylbData()
      },
      async getFxylbData() {
        this.loading = true
        let params = {
          per_page: this.fxylbPage.pageSize,
          page: this.fxylbPage.pageIndex,
          show_yc: this.show_yc ? 1 : 0
        }
        params.parent_id = this.parents[0] ? this.parents[this.parents.length - 1].id : ''
        let {
          status_code,
          data
        } = await api.getFxylbList(params)
        if (status_code == 200) {
          this.fxylbData = data.data
          this.fxylbPage.totalRow = data.total
        }
        this.loading = false
      },
      openFxylbModel() {
        this.modeType = 1;
        this.getFxylb()
      },
      editFxylbModel(row) {
        this.fxjsRow = row
        this.getFxjsList(1)
        this.fxylbForm = {
          parent_id: row.ffxylbbhc.split(',').map(item => item - 0),
          fxylbmc: row.fxylbmc,
          dm: row.dm,
          icon: row.icon,
          px: row.px ? Number(row.px) : 0,
          method_path: row.method_path,
          tckdj: row.tckdj ? Number(row.tckdj) : 0,
          yc: row.yc ? Number(row.yc) : 0,
          sffj: row.sffj ? Number(row.sffj) : 0,
        }
        this.id = row.id
        this.modeType = 2;
        this.showFxylbModel = true
      },
      viewFxylbModel(row) {
        this.fxylbForm = {
          parent_id: row.ffxylbbhc.split(','),
          fxylbmc: row.fxylbmc,
          dm: row.dm,
          icon: row.icon,
          px: row.px ? Number(row.px) : 0,
          method_path: row.method_path,
          tckdj: row.tckdj ? Number(row.tckdj) : 0,
          yc: row.yc ? Number(row.yc) : 0,
          sffj: row.sffj ? Number(row.sffj) : 0,
        }
        this.id = row.id
        this.modeType = 3;
        this.showFxylbModel = true
      },
      fxylbModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.fxylbForm = {
              parent_id: [],
              fxylbmc: '',
              dm: '',
              icon: '',
              px: 0,
              method_path: '',
              tckdj: 0,
              yc: 0,
              sffj: 0
            }
            this.$refs.fxylb.resetFields();
          })
        }
      },
      editFxyMethodsModel(row) {
        this.fxjsRow = row
        this.getFxjsList()
      },
      async getFxjsList(type) {
        let params = {
          fxylb: this.fxjsRow.dm
        }
        let {
          status_code,
          data
        } = await api.getFxjsList(params)
        if (status_code == 200) {
          this.fxjsData = data || []
          if(!type) {
            this.modeType = 3
            this.showFxjsModel = true
          }
        }
      },
      fxjsBack() {
        this.fxjsModelChange(false)
        this.modeType = 3
      },
      openFxjsModel() {
        this.modeType = 1
        this.fxjsForm.fxylb = this.fxjsRow.dm
      },
      editFxjs(row) {
        this.fxjsForm = {
          fxylb: row.fxylb,
          method_name: row.method_name,
          description: row.description,
          order_num: row.order_num ? Number(row.order_num) : 0,
          code: row.code,
        }
        this.fxjsId = row.id
        this.modeType = 2;
        this.showFxjsModel = true
      },
      fxjsModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.fxjsForm = {
              fxylb: '',
              method_name: '',
              description: '',
              order_num: 0,
              code: ''
            }
          })
        }
      },
      async removeFxjs(row) {
        let {
          status_code
        } = await api.deleteFxjsInfo(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getFxjsList()
        this.fxjsModelChange(false)
        this.modeType = 3
      },
      async saveFxjs() {
        this.fxjsLoading = true
        let params = {
          ...this.fxjsForm,
        }
        if (this.modeType == 2) {
          params.id = this.fxjsId
        }
        let {
          status_code,
          message
        } = await api.addFxjsInfo(params);
        if (status_code == 200) {
          this.$Message.success(message)
          // this.showFxjsModel = false
          this.getFxjsList()
        }
        this.fxjsLoading = false
        this.fxjsModelChange(false)
        this.modeType = 3
      },
      async removeFxylb(row) {
        let {
          status_code
        } = await api.deleteFxylbItem(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getFxylbData()
        this.getFxylbList('', list => {
          this.fxylbList = list
        })
      },
      async saveFxylb() {
        this.$refs.fxylb.validate(async valid => {
          if (valid) {
            this.fxylbLoading = true
            let params = {
              ...this.fxylbForm,
              parent_id: this.fxylbForm.parent_id[0] ? this.fxylbForm.parent_id[this.fxylbForm.parent_id
                .length - 1] : 0,
            }
            if (this.modeType == 2) {
              params.id = this.id
            }
            delete params.lngAndLat
            let {
              status_code,
              message
            } = await api.addFxylbItem(params);
            if (status_code == 200) {
              this.$Message.success(message)
              this.showFxylbModel = false
              this.getFxylbData()
              this.getFxylbList('', list => {
                this.fxylbList = list
              }, 'id')
            }
            this.fxylbLoading = false
          }
        })
      },
      open(row) {
        // if(!this.hasAuth(row.dm)) {
        // 	this.$Message.warning('暂无权限查看该项子列表')
        // 	return
        // }
        this.parents.push(row)
        this.getFxylbData()
      },
      navigate(index) {
        console.log(index)
        this.parents.splice(index)
        this.fxylbPage = {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        }
        this.getFxylbData()

      },
    },
    created() {
      this.getFxylbData()
      this.getFxylbList('', list => {
        this.fxylbList = list
      }, 'id')
    },
    mounted() {}
  }
</script>

<style lang="scss" scoped>
  .user_container {
  }
</style>
