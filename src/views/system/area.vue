<template>
  <div class="user_container">
    <Row type="flex" justify="space-between" align="middle">
      <div class="title">区域管理</div>
      <Button v-if="hasAuth('quyu_store')" type="primary" @click="openQuyuModel" style="width: 60px">
        <Icon type="ios-add" size="28" />
      </Button>
    </Row>
    <div v-if="hasAuth('quyu')">
      <Divider />
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <span class="link" @click="navigate(0)">顶级</span>
        </BreadcrumbItem>
        <BreadcrumbItem v-for="(item, index) in parents" :key="item.id">
          <span class="link" @click="navigate(index + 1)">{{item.mc}}</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Table :loading="loading" :columns="quyuColumns" :data="quyuData" style="margin-top: 16px">
        <template slot-scope="{ row }" slot="mc">
          <span class="link" @click="open(row)">{{row.mc}}</span>
        </template>
        <template slot-scope="{ row }" slot="created_at">
          <span>{{row.created_at.split(' ')[0]}}</span>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button v-if="hasAuth('quyu_show')" type="primary" size="small" ghost style="margin-right: 5px" @click="viewQuyuModel(row)">查看</Button>
          <Button v-if="hasAuth('quyu_update')" type="primary" size="small" ghost style="margin-right: 5px" @click="editQuyuModel(row)">编辑</Button>
          <Poptip v-if="hasAuth('quyu_destroy')" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？"
            @on-ok="removeQuyu(row)">
            <Button type="error" size="small" ghost>删除</Button>
          </Poptip>
        </template>
      </Table>
      <Row type="flex" justify="end">
        <Page size="small" style="margin-top: 10px" :page-size="quyuPage.pageSize" :total="quyuPage.totalRow"
          show-elevator show-total show-sizer @on-change="handleChangeQuyuPage" @on-page-size-change="handleChangeQuyuPageSize" />
      </Row>
    </div>
    <Modal width="820" :title="`${modelTypeList[modeType - 1]}区域`" v-model="showQuyuModel" @on-visible-change="quyuModelChange">
      <Form :disabled="modeType == 3" :model="quyuForm" ref="quyu" :rules="quyuRules" hide-required-mark label-position="left"
        :label-width="120">
        <FormItem label="所属区域">
          <Cascader readonly change-on-select v-model="quyuForm.parent_id" :data="quyuList" :load-data="loadQuyu"
            :render-format="format" placeholder="请选择"></Cascader>
        </FormItem>
        <FormItem label="区域名称" prop="mc">
          <Input clearable v-model="quyuForm.mc"></Input>
        </FormItem>
        <FormItem label="排序" prop="px">
          <InputNumber :min="0" v-model="quyuForm.px"></InputNumber>
        </FormItem>
        <FormItem label="边界" prop="bj">
          <div style="display: flex; align-items: center;">
            <span v-if="quyuForm.map_file" style="margin-right: 16px;">{{typeof quyuForm.map_file === 'string' ? quyuForm.map_file : quyuForm.map_file.name}}</span>
            <Upload
            v-show="modeType !== 3"
            :before-upload="handleUpload"
            accept="application/json"
            action="xxx">
              <Button size="small" type="primary" ghost>选择文件</Button>
            </Upload>
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
        <Button v-if="modeType != 3" type="primary" size="large" :loading="quyuLoading" @click="saveQuyu">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import api from '@/api/api'
  import quyujs from '@/common/js/quyu'
  export default {
    name: '',
    mixins: [quyujs],
    data() {
      return {
        id: '',
        loading: true,
        showQuyuModel: false,
        quyuLoading: false,
        modeType: '',
        quyuValue: 'id',
        rowItem: null,
        parents: [],
        quyuData: [],
        quyuColumns: [{
          title: "序号",
          // fixed: 'left',
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + (this.quyuPage.pageIndex - 1) * this.quyuPage.pageSize + 1);
          }
        }, {
          title: '所属区域',
          slot: 'mc',
          minWidth: 100
        }, {
          title: '添加日期',
          slot: 'created_at',
          minWidth: 120
        }, {
          title: '操作',
          slot: 'action',
          fixed: 'right',
          width: 200
        }],
        quyuForm: {
          parent_id: [],
          mc: '',
          px: 0,
          map_file: null
        },
        quyuPage: {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        },
      }
    },
    watch: {

    },
    computed: {
      quyuRules() {
        return {
          mc: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
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
      handleUpload(file) {
        console.log(file)
      	let list = ['application/json']
      	if(list.includes(file.type)) {
      		this.quyuForm.map_file = file
      	}else {
      		this.$Message.error('请选择json文件')
      	}
      	return false
      },
      format(labels, selectedData) {
        const index = labels.length - 1;
        const data = selectedData[index] || false;
        return labels[index];
      },
      handleChangeQuyuPage(val) {
        this.quyuPage.pageIndex = val
        this.getQuyuData()
      },
      handleChangeQuyuPageSize(val) {
        this.quyuPage.pageSize = val
        this.getQuyuData()
      },
      async getQuyuData() {
        this.loading = true
        let params = {
          per_page: this.quyuPage.pageSize,
          page: this.quyuPage.pageIndex,
        }
        params.parent_id = this.parents[0] ? this.parents[this.parents.length - 1].id : ''
        let {
          status_code,
          data
        } = await api.getAreaList(params)
        if (status_code == 200) {
          this.quyuData = data.data
          this.quyuPage.totalRow = data.total
        }
        this.loading = false
      },
      openQuyuModel() {
        this.modeType = 1;
        this.getQy()
      },
      editQuyuModel(row) {
        this.quyuForm = {
          parent_id: row.fqybhc.split(','),
          mc: row.mc,
          px: row.px ? Number(row.px) : 0,
          map_file: row.map_file
        }
        this.id = row.id
        this.modeType = 2;
        this.getQy()
      },
      viewQuyuModel(row) {
        this.quyuForm = {
          parent_id: row.fqybhc.split(','),
          mc: row.mc,
          px: row.px ? Number(row.px) : 0,
          map_file: row.map_file
        }
        this.id = row.id
        this.modeType = 3;
        this.getQy()
      },
      quyuModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.quyuForm = {
              parent_id: [],
              mc: '',
              px: 0,
            }
            this.$refs.quyu.resetFields();
          })
        }
      },
      async removeQuyu(row) {
        let {
          status_code
        } = await api.deleteQuyuItem(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getQuyuData()
        this.getArea('', list => {
          this.quyuList = list
        })
      },
      async saveQuyu() {
        this.$refs.quyu.validate(async valid => {
          if (valid) {
            this.quyuLoading = true
            console.log(this.quyuForm)
            let params = new FormData()
            for(let key in this.quyuForm) {
              if(key === 'map_file') {
                if(this.quyuForm[key] && typeof this.quyuForm[key] !== 'string') {
                  params.append(key, this.quyuForm[key])
                }
              }else {
                params.append(key, this.quyuForm[key])
              }
            }
            params.append('parent_id', this.quyuForm.parent_id[0] ? this.quyuForm.parent_id[this.quyuForm.parent_id.length -
                1] : 0)
            if (this.modeType == 2) {
              params.append('id', this.id)
            }
            // let params = {
            //   ...this.quyuForm,
            //   parent_id: this.quyuForm.parent_id[0] ? this.quyuForm.parent_id[this.quyuForm.parent_id.length -
            //     1] : 0,
            // }
            // if (this.modeType == 2) {
            //   params.id = this.id
            // }
            // delete params.lngAndLat
            let {
              status_code,
              message
            } = await api.addQuyuItem(params);
            if (status_code == 200) {
              this.$Message.success(message)
              this.showQuyuModel = false
              this.getQuyuData()
              this.getArea('', list => {
                this.quyuList = list
              }, 'id')
            }
            this.quyuLoading = false
          }
        })
      },
      open(row) {
        // this.showquyuDrawer1 = true
        this.parents.push(row)
        this.quyuPage = {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        }
        this.getQuyuData()
      },
      navigate(index) {
        console.log(index)
        this.parents.splice(index)
        this.quyuPage = {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        }
        this.getQuyuData()

      },
    },
    created() {
      this.getQuyuData()
      this.getArea('', list => {
        this.quyuList = list
      }, 'id')
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .user_container {}
</style>
