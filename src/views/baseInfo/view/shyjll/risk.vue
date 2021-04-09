<template>
  <div class="page">
    <Spin fix v-show="loading"></Spin>
    <div>
      <Row type="flex" justify="center" style="height: 100%">
        <Col span="22">
        <div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
        <Tabs value="name1">
          <TabPane label="队伍构成" name="name1">
            <part-title text="队伍构成" :btns="['add']" @add="openShyjdwgcModel"></part-title>
            <Table :columns="shyjdwgcColumns" :data="shyjdwgcData">
              <template slot-scope="{ row }" slot="action">
                <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editShyjdwgcModel(row)">编辑</Button>
                <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeShyjdwgc(row)">
                  <Button type="error" size="small" ghost>删除</Button>
                </Poptip>
              </template>
            </Table>
            <Row type="flex" justify="end">
              <Page size="small" style="margin-top: 10px" :page-size="shyjdwgcPage.pageSize" :total="shyjdwgcPage.totalRow"
                show-elevator show-total show-sizer @on-change="handleChangeShyjdwgcPage" @on-page-size-change="handleChangeShyjdwgcPageSize" />
            </Row>
          </TabPane>
          <TabPane label="救援经历" name="name2">
            <part-title text="救援经历" :btns="['add']" @add="openShyjjyjlModel"></part-title>
            <Table :columns="shyjjyjlColumns" :data="shyjjyjlData">
              <template slot-scope="{ row }" slot="action">
                <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editShyjjyjlModel(row)">编辑</Button>
                <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeShyjjyjl(row)">
                  <Button type="error" size="small" ghost>删除</Button>
                </Poptip>
              </template>
            </Table>
            <Row type="flex" justify="end">
              <Page size="small" style="margin-top: 10px" :page-size="shyjjyjlPage.pageSize" :total="shyjjyjlPage.totalRow"
                show-elevator show-total show-sizer @on-change="handleChangeShyjjyjlPage" @on-page-size-change="handleChangeShyjjyjlPageSize" />
            </Row>
          </TabPane>
        </Tabs>
        </Col>
      </Row>
    </div>
    <Modal width="1000" title="企业经纬度标注" v-model="showLngModel">
      <div id="lng_box" class="area_box"></div>
      <div slot="footer">
        <Row type="flex" align="middle" justify="space-between">
          <Col style="text-align: left">
          <span style="font-size: 14px; color: rgba(0,0,0,0.87);">{{lat}} {{lng}}</span>
          <br />
          <span style="font-size: 12px; color: rgba(0,0,0,0.26);">地图上拖动或点击光标，修改企业位置</span>
          </Col>
          <Col>
          <Button type="text" size="large" @click="showLngModel = false">取消</Button>
          <Button type="primary" size="large" @click="saveLng">保存</Button>
          </Col>
        </Row>
      </div>
    </Modal>
    <Modal width="1000" title="企业范围标注" v-model="showAreaModel">
      <div id="area_box" class="area_box"></div>
      <div slot="footer">
        <Row type="flex" align="middle" justify="space-between">
          <Col style="text-align: left">
          <Button type="info" size="small" ghost @click="openArea">开启标注</Button>
          <!-- <Button type="warning" size="small" ghost @click="polygonTool.close()">关闭标注</Button> -->
          <Button type="warning" size="small" ghost @click="map.clearOverLays()">清除标注</Button>
          </Col>
          <Col>
          <Button type="text" size="large" @click="showAreaModel = false">取消</Button>
          <Button type="primary" size="large" @click="saveArea">保存</Button>
          </Col>
        </Row>
      </div>
    </Modal>
    <Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}救援经历`" v-model="showShyjjyjlModel" @on-visible-change="shyjjyjlModelChange">
      <div>
        <Form :model="shyjjyjlForm" ref="shyjjyjl" :rules="shyjjyjlRules" hide-required-mark label-position="left"
          :label-width="160">
          <FormItem label="年度">
            <InputNumber :min="0" v-model="shyjjyjlForm.nd"></InputNumber>
          </FormItem>
          <FormItem label="累计救援救灾次数">
            <InputNumber :min="0" v-model="shyjjyjlForm.ljjyjzcs"></InputNumber>
          </FormItem>
          <FormItem label="累计救援救灾出动人次">
            <InputNumber :min="0" v-model="shyjjyjlForm.ljjyjzcdrc"></InputNumber>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showShyjjyjlModel = false">取消</Button> -->
        <Button type="primary" size="large" :loading="shyjjyjlLoading" @click="saveShyjjyjl">保存</Button>
      </div>
    </Modal>
    <Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}线路信息`" v-model="showXlxxModel" @on-visible-change="xlxxModelChange">
      <div>
        <Form :model="xlxxForm" ref="xlxx" :rules="xlxxRules" hide-required-mark label-position="left" :label-width="140">
          <FormItem label="线路名称">
            <Row type="flex" :gutter="20">
              <Col :span="12">
              <FormItem prop="xlqd">
                <Input clearable v-model="xlxxForm.xlqd" placeholder="起点"></Input>
              </FormItem>
              </Col>
              <Col :span="12">
              <FormItem prop="xlzd">
                <Input clearable v-model="xlxxForm.xlzd" placeholder="终点"></Input>
              </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="线路类型" prop="xllx">
            <Select clearable v-model="xlxxForm.xllx">
              <Option v-for="item in xllxList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="运行时长（小时）" prop="yxszxs">
            <InputNumber :min="0" v-model="xlxxForm.yxszxs"></InputNumber>
          </FormItem>
          <FormItem label="线路地质灾害情况" prop="xldzzhqk">
            <Select clearable multiple v-model="xlxxForm.xldzzhqk">
              <Option v-for="item in xldzzhqkList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="线路交通组成" prop="xljtzc">
            <Select clearable multiple v-model="xlxxForm.xljtzc">
              <Option v-for="item in xljtzcList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="填报时间" prop="tbsj">
            <DatePicker type="date" v-model="xlxxForm.tbsj" placeholder="请选择"></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
        <Button type="primary" size="large" :loading="xlxxLoading" @click="saveXlxx">保存</Button>
      </div>
    </Modal>
    <Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}队伍构成`" v-model="showShyjdwgcModel" @on-visible-change="shyjdwgcModelChange">
      <div>
        <Form :model="shyjdwgcForm" ref="shyjdwgc" :rules="shyjdwgcRules" hide-required-mark label-position="left" :label-width="140">
          <FormItem label="专职人数">
            <InputNumber :min="0" v-model="shyjdwgcForm.zzrs"></InputNumber>
          </FormItem>
          <FormItem label="队员人数">
            <InputNumber :min="0" v-model="shyjdwgcForm.dyrs"></InputNumber>
          </FormItem>
          <FormItem label="志愿者人数">
            <InputNumber :min="0" v-model="shyjdwgcForm.zyzrs"></InputNumber>
          </FormItem>
          <FormItem label="承保公司">
            <Input v-model="shyjdwgcForm.cbgs"></Input>
          </FormItem>
          <FormItem label="所购险种">
            <Input v-model="shyjdwgcForm.sgxz"></Input>
          </FormItem>
          <FormItem label="被保险人数">
            <InputNumber :min="0" v-model="shyjdwgcForm.bbxrs"></InputNumber>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
        <Button type="primary" size="large" :loading="shyjdwgcLoading" @click="saveShyjdwgc">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import api from '@/api/api'
  import partTitle from '@/components/title'
  import lng from '../../components/lng'
  import qyfw from '../../components/qyfw'
  import tablejs from '@/common/js/table'
  import areajs from '@/common/js/area'
  import industryjs from '@/common/js/industry'
  import lngjs from '@/common/js/lng'
  import datePickerjs from '@/common/js/datePicker'
  import {
    getDate
  } from '@/utils/tool'
  export default {
    name: '',
    mixins: [tablejs, areajs, industryjs, lngjs, datePickerjs],
    components: {
      partTitle,
      lng,
      qyfw
    },
    data() {
      return {
        id: '',
        gkdx_id: this.$storage.get('userInfo').gkdx_id,
        zaqId: '',
        gdtrq_id: '',
        ccss_id: '',
        loading: true,
        step: 2,
        showAreaModel: false,
        showLngModel: false,
        showShyjjyjlModel: false,
        showXlxxModel: false,
        showShyjdwgcModel: false,
        shyjjyjlLoading: false,
        xlxxLoading: false,
        shyjdwgcLoading: false,
        modeType: '',
        modeType2: '',
        map: null,
        polygonTool: null,
        baseInfo: {
          sjdcgd: 0,
          sjdctfl: 0
        },
        sdxsList: ['单向交通', '双向交通', '人车混行'],
        sdcdList: ['特长隧道', '长隧道', '中长隧道', '短隧道'],
        jxxsList: ['毗邻隧道', '连续隧道', '桥隧相接', '坡路隧道相连（上坡）', '坡路隧道相连（下坡）'],
        sdyhdjList: ['一类', '二类', '三类', '四类', '五类', '未评定'],
        sfzgyyqList: [{
          value: 0,
          name: '否'
        }, {
          value: 1,
          name: '是'
        }],
        area: '',
        lng: '',
        lat: '',
        typeList: [{
          value: 1,
          name: 'xxxx'
        }],
        statusList: [{
          value: '1',
          name: 'xxxx'
        }],
        areaList: [],
        shyjjyjlColumns: [{
          title: "序号",
          // fixed: 'left',
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + (this.shyjjyjlPage.pageIndex - 1) * this.shyjjyjlPage.pageSize + 1);
          },
        }, {
          title: '年度',
          key: 'nd',
          minWidth: 100,
        }, {
          title: '累计救援救灾次数',
          key: 'ljjyjzcs',
          minWidth: 160,
        }, {
          title: '累计救援救灾出动人次',
          key: 'ljjyjzcdrc',
          minWidth: 200,
        }, {
          title: '操作',
          fixed: 'right',
          width: 150,
          slot: 'action',
        }, ],
        shyjjyjlData: [],
        shyjjyjlForm: {
          nd: 0,
          ljjyjzcs: 0,
          ljjyjzcdrc: 0,
        },
        cllxList: ['大型', '中型', '小型'],
        cljsdjList: ['一级', '二级', '三级'],
        shyjjyjlPage: {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        },
        clslhj: 0,
        xlxxColumns: [{
          title: "序号",
          // fixed: 'left',
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + (this.xlxxPage.pageIndex - 1) * this.xlxxPage.pageSize + 1);
          }
        }, {
          title: '线路名称',
          key: 'xlmc',
          minWidth: 100
        }, {
          title: '线路类型',
          key: 'xllx',
          minWidth: 100
        }, {
          title: '运行时长（小时）',
          key: 'yxszxs',
          minWidth: 160
        }, {
          title: '线路地质灾害情况',
          key: 'xldzzhqk',
          minWidth: 160
        }, {
          title: '线路交通组成',
          key: 'xljtzc',
          minWidth: 120
        }, {
          title: '填报时间',
          key: 'tbsj',
          minWidth: 100,
        }, {
          title: '操作',
          fixed: 'right',
          width: 150,
          slot: 'action',
        }, ],
        xlxxData: [],
        xlxxForm: {
          xlqd: '',
          xlzd: '',
          xllx: '',
          yxszxs: 0,
          xldzzhqk: [],
          xljtzc: [],
          tbsj: ''
        },
        xllxList: ['旅游客车'],
        xldzzhqkList: ['地震活动频繁区', '滑坡', '泥石流', '塌方', '临水区域'],
        xljtzcList: ['高速公路', '国省道路', '普通公路'],
        xlxxPage: {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        },
        xlsl: 0,
        shyjdwgcColumns: [{
          title: "序号",
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + (this.shyjdwgcPage.pageIndex - 1) * this.shyjdwgcPage.pageSize + 1);
          }
        }, {
          title: '专职人数',
          key: 'zzrs',
          minWidth: 100
        }, {
          title: '队员人数',
          key: 'dyrs',
          minWidth: 80
        }, {
          title: '志愿者人数',
          key: 'zyzrs',
          minWidth: 100
        }, {
          title: '承保公司',
          key: 'cbgs',
          minWidth: 100
        }, {
          title: '所购险种',
          key: 'sgxz',
          minWidth: 130
        }, {
          title: '被保险人数',
          key: 'bbxrs',
          minWidth: 80
        }, {
          title: '操作',
          fixed: 'right',
          width: 150,
          slot: 'action',
        }, ],
        shyjdwgcData: [],
        shyjdwgcForm: {
          zzrs: 0,
          dyrs: 0,
          zyzrs: 0,
          cbgs: '',
          sgxz: '',
          bbxrs: 0,
        },
        shyjdwgcPage: {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        },
        form: {}
      }
    },
    watch: {

    },
    computed: {
      shyjjyjlRules() {
        return {
          cllx: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          zkrs: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
          cljsdj: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          cltysj: [{
            required: true,
            type: 'date',
            message: '请选择',
            trigger: 'change'
          }],
          tbsj: [{
            required: true,
            type: 'date',
            message: '请选择',
            trigger: 'change'
          }],
        }
      },
      xlxxRules() {
        return {
          xlqd: [{
            required: true,
            message: '请输入',
            trigger: 'change'
          }],
          xlzd: [{
            required: true,
            message: '请输入',
            trigger: 'change'
          }],
          xllx: [{
            required: true,
            message: '请输入',
            trigger: 'change'
          }],
          yxszxs: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
          cljsdj: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          xldzzhqk: [{
            required: true,
            type: 'array',
            message: '请选择',
            trigger: 'change'
          }],
          xljtzc: [{
            required: true,
            type: 'array',
            message: '请选择',
            trigger: 'change'
          }],
          tbsj: [{
            required: true,
            type: 'date',
            message: '请选择',
            trigger: 'change'
          }],
        }
      },
      shyjdwgcRules() {
        return {
          jwrpjfkl: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
          tbsj: [{
            required: true,
            type: 'date',
            message: '请选择',
            trigger: 'change'
          }],
        }
      },
    },
    methods: {
      async getBaseInfo() {
        this.loading = true
        let shyjdwgcParams = {
          gkdx_id: this.gkdx_id,
          per_page: this.shyjdwgcPage.pageSize,
          page: this.shyjdwgcPage.pageIndex,
        }
        Promise.all([api.getShyjdwgcList(shyjdwgcParams)]).then((result) => {
          let shyjdwgcRes = result[0]
          if (shyjdwgcRes.status_code == 200) {
            this.shyjdwgcData = shyjdwgcRes.data.data
            this.shyjdwgcPage.totalRow = shyjdwgcRes.data.total
          }
          this.loading = false
        }).catch((error) => {
          this.loading = false
        })
      },
      async nextStep() {
        let params = {
          ...this.baseInfo,
          ...this.addressInfo,
          ...this.contactInfo,
          hyml: this.baseInfo.hyml[this.baseInfo.hyml.length - 1],
          jd: this.addressInfo.lngAndLat.split(' ')[0],
          wd: this.addressInfo.lngAndLat.split(' ')[1],
        }
        if (this.$route.query.type == 2) {
          params.gkdx_id = this.form.gkdx_id
        }
        delete params.quyu
        delete params.lngAndLat
        let {
          status_code,
          message
        } = await api.addSbfcBase(params);
        if (status_code == 200) {
          this.$Message.success('保存成功')
          if (this.$route.query.type == 2) {
            this.$router.back()
          } else {
            this.$router.replace('/baseInfo')
          }
        }
      },
      async saveInfo1() {
        let params = {
          gkdx_id: this.gkdx_id,
          sjdcgd: this.baseInfo.sjdcgd,
          sjdctfl: this.baseInfo.sjdctfl,
        }
        let {
          status_code,
          message
        } = await api.addSkdbBase(params);
        if (status_code == 200) {
          this.$Message.success('保存成功')
        }
      },
      async saveInfo2() {
        let params = {
          gkdx_id: this.gkdx_id,
          fjs: this.baseInfo.fjs,
        }
        let {
          status_code,
          message
        } = await api.addSkdbBase(params);
        if (status_code == 200) {
          this.$Message.success('保存成功')
        }
      },
      openAreaModal() {
        this.showAreaModel = true;
        this.$nextTick(() => {
          let self = this;
          let lo = new BMap.Geolocation();
          lo.getCurrentPosition((e) => {
            this.map = new T.Map('area_box');
            this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
            var config = {
              showLabel: true,
              color: "blue",
              weight: 3,
              opacity: 0.5,
              fillColor: "#FFFFFF",
              fillOpacity: 0.5
            };
            //创建标注工具对象
            this.polygonTool = new T.PolygonTool(this.map, config);
            if (this.addressInfo.qyfw) {
              let qyfw = JSON.parse(this.addressInfo.qyfw)
              let points = qyfw.map(item => {
                return new T.LngLat(item.lng, item.lat)
              })
              this.map.addOverLay(new T.Polygon(points, config));
            }
          });
        })
      },
      openArea() {
        let self = this
        this.polygonTool.open();
        this.polygonTool.addEventListener('draw', (e) => {
          // 获取绘制的多边形信息
          console.log(e);
          this.addressInfo.qyfw = JSON.stringify(e.currentLnglats)
        })
      },
      clearArea() {
        this.addressInfo.qyfw = ''
        this.map.clearOverLays()
      },
      cancelArea() {
        this.map.clearOverLays();
        this.map = null;
        this.polygonTool = null;
        this.addressInfo.qyfw = this.qyfw || this.form.qyfw || '';
        this.showAreaModel = false
      },
      saveArea() {
        this.qyfw = this.addressInfo.qyfw;
        this.form.qyfw = this.addressInfo.qyfw;
        this.map.clearOverLays();
        this.map = null;
        this.polygonTool = null;
        this.showAreaModel = false
      },
      async getShyjjyjlList_() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: 1000,
          page: this.shyjjyjlPage.pageIndex,
        }
        let {
          status_code,
          data
        } = await api.getShyjjyjlList(params)
        if (status_code == 200) {
          this.shyjjyjlList = data.data
        }
      },
      handleChangeShyjjyjlPage(val) {
        this.shyjjyjlPage.pageIndex = val
        this.getShyjjyjlList()
      },
      handleChangeShyjjyjlPageSize(val) {
        this.shyjjyjlPage.pageSize = val
        this.getShyjjyjlList()
      },
      async getShyjjyjlList() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: this.shyjjyjlPage.pageSize,
          page: this.shyjjyjlPage.pageIndex,
        }
        let res = await api.getShyjjyjlList(params)
        let {
          status_code,
          data
        } = res
        if (status_code == 200) {
          this.shyjjyjlData = data.data
          this.clslhj = res.clslhj || 0
          this.shyjjyjlPage.totalRow = data.total
        }
      },
      openShyjjyjlModel() {
        this.modeType = 1;
        this.showShyjjyjlModel = true
      },
      editShyjjyjlModel(row) {
        this.shyjjyjlForm = {
          nd: row.nd ? Number(row.nd) : 0,
          ljjyjzcs: row.ljjyjzcs ? Number(row.ljjyjzcs) : 0,
          ljjyjzcdrc: row.ljjyjzcdrc ? Number(row.ljjyjzcdrc) : 0,
        }
        this.id = row.id
        this.modeType = 2;
        this.showShyjjyjlModel = true
      },
      shyjjyjlModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.shyjjyjlForm = {
              nd: 0,
              ljjyjzcs: 0,
              ljjyjzcdrc: 0,
            }
            this.$refs.shyjjyjl.resetFields();
          })
        }
      },
      async removeShyjjyjl(row) {
        let {
          status_code
        } = await api.deleteShyjjyjlInfo(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getShyjjyjlList()
      },
      async saveShyjjyjl() {
        this.$refs.shyjjyjl.validate(async valid => {
          if (valid) {
            this.shyjjyjlLoading = true
            let params = {
              ...this.shyjjyjlForm,
              cltysj: this.shyjjyjlForm.cltysj ? getDate(new Date(this.shyjjyjlForm.cltysj).getTime(), 'year') : '',
              tbsj: this.shyjjyjlForm.tbsj ? getDate(new Date(this.shyjjyjlForm.tbsj).getTime(), 'year') : '',
              gkdx_id: this.gkdx_id
            }
            if (this.modeType == 2) {
              params.id = this.id
            }
            let {
              status_code,
              message
            } = await api.addShyjjyjlInfo(params);
            if (status_code == 200) {
              this.$Message.success(message)
              this.showShyjjyjlModel = false
              this.getShyjjyjlList()
            }
            this.shyjjyjlLoading = false
          }
        })
      },
      handleChangeXlxxPage(val) {
        this.xlxxPage.pageIndex = val
        this.getXlxxList()
      },
      handleChangeXlxxPageSize(val) {
        this.xlxxPage.pageSize = val
        this.getXlxxList()
      },
      async getXlxxList() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: this.xlxxPage.pageSize,
          page: this.xlxxPage.pageIndex,
        }
        let res = await api.getXlxxList(params)
        let {
          status_code,
          data
        } = res
        if (status_code == 200) {
          this.xlxxData = data.data
          this.xlsl = res.xlsl || 0
          this.xlxxPage.totalRow = data.total
        }
      },
      openXlxxModel() {
        this.modeType = 1;
        this.showXlxxModel = true
      },
      editXlxxModel(row) {
        this.xlxxForm = {
          xlqd: row.xlmc ? row.xlmc.split('-')[0] : '',
          xlzd: row.xlmc ? row.xlmc.split('-')[1] : '',
          xllx: row.xllx,
          yxszxs: row.yxszxs ? Number(row.yxszxs) : 0,
          xldzzhqk: row.xldzzhqk ? row.xldzzhqk.split(',') : [],
          xljtzc: row.xljtzc ? row.xljtzc.split(',') : [],
          tbsj: row.tbsj ? new Date(row.tbsj) : '',
        }
        this.id = row.id
        this.modeType = 2;
        this.showXlxxModel = true
      },
      xlxxModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.xlxxForm = {
              xlqd: '',
              xlzd: '',
              xllx: '',
              yxszxs: 0,
              xldzzhqk: [],
              xljtzc: [],
              tbsj: ''
            }
            this.$refs.xlxx.resetFields();
          })
        }
      },
      async removeXlxx(row) {
        let {
          status_code
        } = await api.deleteXlxxInfo(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getXlxxList()
      },
      async saveXlxx() {
        this.$refs.xlxx.validate(async valid => {
          if (valid) {
            this.xlxxLoading = true
            let params = {
              ...this.xlxxForm,
              xlmc: `${this.xlxxForm.xlqd}-${this.xlxxForm.xlzd}`,
              xldzzhqk: this.xlxxForm.xldzzhqk.join(','),
              xljtzc: this.xlxxForm.xljtzc.join(','),
              tbsj: this.xlxxForm.tbsj ? getDate(new Date(this.xlxxForm.tbsj).getTime(), 'year') : '',
              gkdx_id: this.gkdx_id
            }
            delete params.lngAndLat
            if (this.modeType == 2) {
              params.id = this.id
            }
            let {
              status_code,
              message
            } = await api.addXlxxInfo(params);
            if (status_code == 200) {
              this.$Message.success(message)
              this.showXlxxModel = false
              this.getXlxxList()
            }
            this.xlxxLoading = false
          }
        })
      },
      handleChangeShyjdwgcPage(val) {
        this.shyjdwgcPage.pageIndex = val
        this.getShyjdwgcList()
      },
      handleChangeShyjdwgcPageSize(val) {
        this.shyjdwgcPage.pageSize = val
        this.getShyjdwgcList()
      },
      async getShyjdwgcList() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: this.shyjdwgcPage.pageSize,
          page: this.shyjdwgcPage.pageIndex,
        }
        let {
          status_code,
          data
        } = await api.getShyjdwgcList(params)
        if (status_code == 200) {
          this.shyjdwgcData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
          this.shyjdwgcPage.totalRow = data.total
        }
      },
      openShyjdwgcModel() {
        this.modeType = 1;
        this.showShyjdwgcModel = true
      },
      editShyjdwgcModel(row) {
        this.shyjdwgcForm = {
          zzrs: row.zzrs ? Number(row.zzrs) : 0,
          dyrs: row.dyrs ? Number(row.dyrs) : 0,
          zyzrs: row.zyzrs ? Number(row.zyzrs) : 0,
          cbgs: row.cbgs,
          sgxz: row.sgxz,
          bbxrs: row.bbxrs ? Number(row.bbxrs) : 0,
        }
        this.id = row.id
        this.modeType = 2;
        this.showShyjdwgcModel = true
      },
      shyjdwgcModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.shyjdwgcForm = {
              zzrs: 0,
              dyrs: 0,
              zyzrs: 0,
              cbgs: '',
              sgxz: '',
              bbxrs: 0,
            }
            this.$refs.shyjdwgc.resetFields();
          })
        }
      },
      async removeShyjdwgc(row) {
        let {
          status_code
        } = await api.deleteShyjdwgcInfo(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getShyjdwgcList()
      },
      async saveShyjdwgc() {
        this.$refs.shyjdwgc.validate(async valid => {
          if (valid) {
            this.shyjdwgcLoading = true
            let params = {
              ...this.shyjdwgcForm,
              gkdx_id: this.gkdx_id
            }
            delete params.lngAndLat
            if (this.modeType == 2) {
              params.id = this.id
            }
            let {
              status_code,
              message
            } = await api.addShyjdwgcInfo(params);
            if (status_code == 200) {
              this.$Message.success(message)
              this.showShyjdwgcModel = false
              this.getShyjdwgcList()
            }
            this.shyjdwgcLoading = false
          }
        })
      },
    },
    created() {
      this.getBaseInfo()
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
    margin-bottom: 24px;

    .line {
      width: 100%;
      height: 10px;
      background: #f5f5f5;
    }
  }
</style>
