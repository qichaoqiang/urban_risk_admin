<template>
  <div class="page">
    <Spin fix v-show="loading"></Spin>
    <div>
      <Row type="flex" justify="center" style="height: 100%">
        <Col span="22">
        <div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
        <Tabs value="name1">
          <TabPane label="视频信号" name="name1">
            <part-title text="视频信号" :btns="['add']" @add="openSpxhModel"></part-title>
            <Table :columns="spxhColumns" :data="spxhData">
              <template slot-scope="{ row }" slot="action">
                <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editSpxhModel(row)">编辑</Button>
                <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSpxh(row)">
                  <Button type="error" size="small" ghost>删除</Button>
                </Poptip>
              </template>
            </Table>
            <Row type="flex" justify="end">
              <Page size="small" style="margin-top: 10px" :page-size="spxhPage.pageSize" :total="spxhPage.totalRow"
                show-elevator show-total show-sizer @on-change="handleChangeSpxhPage" @on-page-size-change="handleChangeSpxhPageSize" />
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
    <Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}车辆信息`" v-model="showClxxctModel" @on-visible-change="clxxctModelChange">
      <div>
        <Form :model="clxxctForm" ref="clxxct" :rules="clxxctRules" hide-required-mark label-position="left"
          :label-width="140">
          <FormItem label="车辆类型" prop="cllx">
            <Select readonly v-model="clxxctForm.cllx">
              <Option v-for="item in cllxList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="载客人数" prop="zkrs">
            <InputNumber :min="0" v-model="clxxctForm.zkrs"></InputNumber>
          </FormItem>
          <FormItem label="车辆技术等级" prop="cljsdj">
            <Select v-model="clxxctForm.cljsdj">
              <Option v-for="item in cljsdjList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="车辆投用时间" prop="cltysj">
            <DatePicker type="date" v-model="clxxctForm.cltysj" placeholder="请选择"></DatePicker>
          </FormItem>
          <FormItem label="填报时间" prop="tbsj">
            <DatePicker type="date" v-model="clxxctForm.tbsj" placeholder="请选择"></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showClxxctModel = false">取消</Button> -->
        <Button type="primary" size="large" :loading="clxxctLoading" @click="saveClxxct">保存</Button>
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
    <Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}运营状况`" v-model="showSpxhModel" @on-visible-change="spxhModelChange">
      <div>
        <Form :model="spxhForm" ref="spxh" :rules="spxhRules" hide-required-mark label-position="left" :label-width="140">
          <FormItem label="名称">
            <Input v-model="spxhForm.mc"></Input>
          </FormItem>
          <FormItem label="IP地址">
            <Input v-model="spxhForm.ip"></Input>
          </FormItem>
          <FormItem label="协议类型">
            <Input v-model="spxhForm.xylx"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
        <Button type="primary" size="large" :loading="spxhLoading" @click="saveSpxh">保存</Button>
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
        showClxxctModel: false,
        showXlxxModel: false,
        showSpxhModel: false,
        clxxctLoading: false,
        xlxxLoading: false,
        spxhLoading: false,
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
        clxxctColumns: [{
          title: "序号",
          // fixed: 'left',
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + (this.clxxctPage.pageIndex - 1) * this.clxxctPage.pageSize + 1);
          },
        }, {
          title: '车辆类型',
          key: 'cllx',
          minWidth: 100,
        }, {
          title: '载客人数',
          key: 'zkrs',
          minWidth: 100,
        }, {
          title: '车辆技术等级',
          key: 'cljsdj',
          minWidth: 120,
        }, {
          title: '车辆投用时间',
          key: 'cltysj',
          minWidth: 120,
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
        clxxctData: [],
        clxxctForm: {
          cllx: '',
          zkrs: 0,
          cljsdj: '',
          cltysj: '',
          tbsj: '',
        },
        cllxList: ['大型', '中型', '小型'],
        cljsdjList: ['一级', '二级', '三级'],
        clxxctPage: {
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
        spxhColumns: [{
          title: "序号",
          // fixed: 'left',
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + (this.spxhPage.pageIndex - 1) * this.spxhPage.pageSize + 1);
          }
        }, {
          title: '名称',
          key: 'mc',
          minWidth: 170
        }, {
          title: 'IP地址',
          key: 'ip',
          minWidth: 80
        }, {
          title: '协议类型',
          key: 'xylx',
          minWidth: 80
        }, {
          title: '操作',
          fixed: 'right',
          width: 150,
          slot: 'action',
        }, ],
        spxhData: [],
        spxhForm: {
          mc: '',
          ip: '',
          xylx: ''
        },
        spxhPage: {
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
      clxxctRules() {
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
      spxhRules() {
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
        let spxhParams = {
          gkdx_id: this.gkdx_id,
          per_page: this.spxhPage.pageSize,
          page: this.spxhPage.pageIndex,
        }
        Promise.all([api.getSpxhList(spxhParams)]).then((result) => {
          let spxhRes = result[0]
          if (spxhRes.status_code == 200) {
            this.spxhData = spxhRes.data.data
            this.spxhPage.totalRow = spxhRes.data.total
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
      async getClxxctList_() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: 1000,
          page: this.clxxctPage.pageIndex,
        }
        let {
          status_code,
          data
        } = await api.getClxxctList(params)
        if (status_code == 200) {
          this.clxxctList = data.data
        }
      },
      handleChangeClxxctPage(val) {
        this.clxxctPage.pageIndex = val
        this.getClxxctList()
      },
      handleChangeClxxctPageSize(val) {
        this.clxxctPage.pageSize = val
        this.getClxxctList()
      },
      async getClxxctList() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: this.clxxctPage.pageSize,
          page: this.clxxctPage.pageIndex,
        }
        let res = await api.getClxxctList(params)
        let {
          status_code,
          data
        } = res
        if (status_code == 200) {
          this.clxxctData = data.data
          this.clslhj = res.clslhj || 0
          this.clxxctPage.totalRow = data.total
        }
      },
      openClxxctModel() {
        this.modeType = 1;
        this.showClxxctModel = true
      },
      editClxxctModel(row) {
        this.clxxctForm = {
          cllx: row.cllx,
          zkrs: row.zkrs ? Number(row.zkrs) : 0,
          cljsdj: row.cljsdj,
          cltysj: row.cltysj ? new Date(row.cltysj) : '',
          tbsj: row.tbsj ? new Date(row.tbsj) : '',
        }
        this.id = row.id
        this.modeType = 2;
        this.showClxxctModel = true
      },
      clxxctModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.clxxctForm = {
              cllx: '',
              zkrs: 0,
              cljsdj: '',
              cltysj: '',
              tbsj: '',
            }
            this.$refs.clxxct.resetFields();
          })
        }
      },
      async removeClxxct(row) {
        let {
          status_code
        } = await api.deleteClxxctInfo(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getClxxctList()
      },
      async saveClxxct() {
        this.$refs.clxxct.validate(async valid => {
          if (valid) {
            this.clxxctLoading = true
            let params = {
              ...this.clxxctForm,
              cltysj: this.clxxctForm.cltysj ? getDate(new Date(this.clxxctForm.cltysj).getTime(), 'year') : '',
              tbsj: this.clxxctForm.tbsj ? getDate(new Date(this.clxxctForm.tbsj).getTime(), 'year') : '',
              gkdx_id: this.gkdx_id
            }
            if (this.modeType == 2) {
              params.id = this.id
            }
            let {
              status_code,
              message
            } = await api.addClxxctInfo(params);
            if (status_code == 200) {
              this.$Message.success(message)
              this.showClxxctModel = false
              this.getClxxctList()
            }
            this.clxxctLoading = false
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
      handleChangeSpxhPage(val) {
        this.spxhPage.pageIndex = val
        this.getSpxhList()
      },
      handleChangeSpxhPageSize(val) {
        this.spxhPage.pageSize = val
        this.getSpxhList()
      },
      async getSpxhList() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: this.spxhPage.pageSize,
          page: this.spxhPage.pageIndex,
        }
        let {
          status_code,
          data
        } = await api.getSpxhList(params)
        if (status_code == 200) {
          this.spxhData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
          this.spxhPage.totalRow = data.total
        }
      },
      openSpxhModel() {
        this.modeType = 1;
        this.showSpxhModel = true
      },
      editSpxhModel(row) {
        this.spxhForm = {
          mc: row.mc,
          ip: row.ip,
          xylx: row.xylx,
        }
        this.id = row.id
        this.modeType = 2;
        this.showSpxhModel = true
      },
      spxhModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.spxhForm = {
              mc: '',
              ip: '',
              xylx: ''
            }
            this.$refs.spxh.resetFields();
          })
        }
      },
      async removeSpxh(row) {
        let {
          status_code
        } = await api.deleteSpxhInfo(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getSpxhList()
      },
      async saveSpxh() {
        this.$refs.spxh.validate(async valid => {
          if (valid) {
            this.spxhLoading = true
            let params = {
              ...this.spxhForm,
              gkdx_id: this.gkdx_id
            }
            delete params.lngAndLat
            if (this.modeType == 2) {
              params.id = this.id
            }
            let {
              status_code,
              message
            } = await api.addSpxhInfo(params);
            if (status_code == 200) {
              this.$Message.success(message)
              this.showSpxhModel = false
              this.getSpxhList()
            }
            this.spxhLoading = false
          }
        })
      },
    },
    created() {
      this.getBaseInfo()
      if(this.isDisEditInfo) {
        this.spxhColumns.pop()
      }
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
