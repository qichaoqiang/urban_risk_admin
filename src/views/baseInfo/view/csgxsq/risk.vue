<template>
  <div class="page">
    <Spin fix v-show="loading"></Spin>
    <div>
      <Row type="flex" justify="center" style="height: 100%">
        <Col span="22">
        <div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
        <Tabs value="name1">
          <TabPane label="管道信息" name="name1">
            <part-title text="管道信息" :btns="['add']" @add="openGdxxsqModel"></part-title>
            <Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo1" :rules="baseInfoRules1" hide-required-mark
              label-position="left" :label-width="220">
              <FormItem label="管道设计输送能力（亿立方/年）" prop="gdsjssnl">
                <InputNumber :min="0" v-model="baseInfo.gdsjssnl"></InputNumber>
              </FormItem>
              <FormItem label="管道总长度（m）" prop="gdzcd">
                <InputNumber :min="0" v-model="baseInfo.gdzcd"></InputNumber>
              </FormItem>
            </Form>
            <Table :columns="gdxxsqColumns" :data="gdxxsqData">
              <template slot-scope="{ row }" slot="action">
                <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px"
                  @click="editGdxxsqModel(row)">编辑</Button>
                <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？"
                  @on-ok="removeGdxxsq(row)">
                  <Button type="error" size="small" ghost>删除</Button>
                </Poptip>
              </template>
            </Table>
            <Row type="flex" justify="end">
              <Page size="small" style="margin-top: 10px" :page-size="gdxxsqPage.pageSize" :total="gdxxsqPage.totalRow"
                show-elevator show-total show-sizer @on-change="handleChangeGdxxsqPage"
                @on-page-size-change="handleChangeGdxxsqPageSize" />
            </Row>
            <Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
              <Col>
              <Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="高后果区" name="name5">
            <part-title text="高后果区" :btns="['add']" @add="openGhgqModel"></part-title>
            <div style="margin-bottom: 16px;">
              <span>合计总长：{{ghgqSum.hjzc}}km</span>
            </div>
            <Table :columns="ghgqColumns" :data="ghgqData">
              <template slot-scope="{ row }" slot="action">
                <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px"
                  @click="editGhgqModel(row)">编辑</Button>
                <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？"
                  @on-ok="removeGhgq(row)">
                  <Button type="error" size="small" ghost>删除</Button>
                </Poptip>
              </template>
            </Table>
            <Row type="flex" justify="end">
              <Page size="small" style="margin-top: 10px" :page-size="ghgqPage.pageSize" :total="ghgqPage.totalRow"
                show-elevator show-total show-sizer @on-change="handleChangeGhgqPage"
                @on-page-size-change="handleChangeGhgqPageSize" />
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
    <Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}管道信息`" v-model="showGdxxsqModel"
      @on-visible-change="gdxxsqModelChange">
      <div>
        <Form :model="gdxxsqForm" ref="gdxxsq" :rules="gdxxsqRules" hide-required-mark label-position="left"
          :label-width="130">
          <FormItem label="管段名称" prop="gdmc">
            <Input clearable v-model="gdxxsqForm.gdmc"></Input>
          </FormItem>
          <FormItem label="途径辖区" prop="tjxq">
            <Input clearable v-model="gdxxsqForm.tjxq"></Input>
          </FormItem>
          <FormItem label="长度（km）" prop="cd">
            <InputNumber :min="0" v-model="gdxxsqForm.cd"></InputNumber>
          </FormItem>
          <FormItem label="管道直径（mm）" prop="gdzj">
            <InputNumber :min="0" v-model="gdxxsqForm.gdzj"></InputNumber>
          </FormItem>
          <FormItem label="站场数量" prop="zcsl">
            <InputNumber :min="0" v-model="gdxxsqForm.zcsl"></InputNumber>
          </FormItem>
          <FormItem label="阀室数量" prop="fssl">
            <InputNumber :min="0" v-model="gdxxsqForm.fssl"></InputNumber>
          </FormItem>
          <FormItem label="运行压力（Mpa）" prop="yxyl">
            <InputNumber :min="0" v-model="gdxxsqForm.yxyl"></InputNumber>
          </FormItem>
          <FormItem label="影响半径（m）" prop="yxbj">
            <InputNumber :min="0" v-model="gdxxsqForm.yxbj"></InputNumber>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showGdxxsqModel = false">取消</Button> -->
        <Button type="primary" size="large" :loading="gdxxsqLoading" @click="saveGdxxsq">保存</Button>
      </div>
    </Modal>
    <Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}高后果区`" v-model="showGhgqModel"
      @on-visible-change="ghgqModelChange">
      <div>
        <Form :model="ghgqForm" ref="ghgq" :rules="ghgqRules" hide-required-mark label-position="left"
          :label-width="140">
          <FormItem label="管段起止点" prop="gdqzd">
            <Input clearable v-model="ghgqForm.gdqzd"></Input>
          </FormItem>
          <FormItem label="长度（km）" prop="cd">
            <InputNumber :min="0" v-model="ghgqForm.cd"></InputNumber>
          </FormItem>
          <FormItem label="高后果区等级" prop="ghgqdj">
            <Select clearable v-model="ghgqForm.ghgqdj" placeholder="请选择">
              <Option v-for="item in ghgqdjList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="高后果区类型" prop="ghgqlx">
            <Select clearable v-model="ghgqForm.ghgqlx" placeholder="请选择">
              <Option v-for="item in ghgqlxList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="经纬度" prop="lngAndLat">
            <lng :lngAndLat.sync="ghgqForm.lngAndLat"></lng>
          </FormItem>
          <FormItem label="区域范围" prop="qyfw">
            <qyfw :qyfw.sync="ghgqForm.qyfw"></qyfw>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
        <Button type="primary" size="large" :loading="ghgqLoading" @click="saveGhgq">保存</Button>
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
        showGdxxsqModel: false,
        showGhgqModel: false,
        showGdtrqModel: false,
        showYhsyqModel: false,
        showCjrlModel: false,
        showElseModel: false,
        gdxxsqLoading: false,
        ghgqLoading: false,
        modeType: '',
        modeType2: '',
        map: null,
        polygonTool: null,
        baseInfo: {
          gdzcd: 0,
          gdsjssnl: 0,
        },
        qllbList: ['梁式桥', '板拱桥', '刚架拱桥', '椼架拱桥', '钢-混凝土组合拱桥', '悬索桥', '斜拉桥', '其他'],
        qlyhdjList: ['一类', '二类', '三类', '四类', '五类', '未评定'],
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
        gdxxsqColumns: [{
          title: "序号",
          // fixed: 'left',
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + (this.gdxxsqPage.pageIndex - 1) * this.gdxxsqPage.pageSize + 1);
          },
        }, {
          title: '管段名称',
          key: 'gdmc',
          minWidth: 100,
        }, {
          title: '途径辖区',
          key: 'tjxq',
          minWidth: 100,
        }, {
          title: '长度（km）',
          key: 'cd',
          minWidth: 120,
        }, {
          title: '管道直径（mm）',
          key: 'gdzj',
          minWidth: 150,
        }, {
          title: '站场数量',
          key: 'zcsl',
          minWidth: 100,
        }, {
          title: '阀室数量',
          key: 'fssl',
          minWidth: 100,
        }, {
          title: '运行压力（Mpa）',
          key: 'yxyl',
          minWidth: 160,
        }, {
          title: '影响半径（m）',
          key: 'yxbj',
          minWidth: 140,
        }, {
          title: '操作',
          fixed: 'right',
          width: 150,
          slot: 'action',
        }, ],
        gdxxsqData: [],
        gdxxsqForm: {
          gdmc: '',
          tjxq: '',
          cd: 0,
          gdzj: 0,
          zcsl: 0,
          fssl: 0,
          yxyl: 0,
          yxbj: 0
        },
        gdxxsqPage: {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        },
        ghgqColumns: [{
          title: "序号",
          // fixed: 'left',
          key: "id",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h('span', params.index + (this.ghgqPage.pageIndex - 1) * this.ghgqPage.pageSize + 1);
          }
        }, {
          title: '管段起止点',
          key: 'gdqzd',
          minWidth: 110
        }, {
          title: '长度',
          key: 'cd',
          minWidth: 80
        }, {
          title: '高后果区等级',
          key: 'ghgqdj',
          minWidth: 120
        }, {
          title: '高后果区类型',
          key: 'ghgqlx',
          minWidth: 120
        }, {
          title: '操作',
          fixed: 'right',
          width: 150,
          slot: 'action',
        }, ],
        ghgqData: [],
        ghgqForm: {
          gdqzd: '',
          ghgqdj: '',
          ghgqlx: '',
          cd: 0,
          lngAndLat: '',
          qyfw: ''
        },
        ghgqdjList: ['Ⅰ级', 'Ⅱ级', 'Ⅲ级'],
        ghgqlxList: ['人员密集型', '环境敏感型', '易燃易爆场所', '交通设施'],
        ghgqPage: {
          pageSize: 10,
          pageIndex: 1,
          totalRow: 0
        },
        ghgqSum: {
          hjzc: 0,
        },
        form: {}
      }
    },
    watch: {

    },
    computed: {
      baseInfoRules1() {
        return {
          gdsjssnl: [{
            required: true,
            type: 'number',
            message: '请选择',
            trigger: 'change'
          }],
          gdzcd: [{
            required: true,
            type: 'number',
            message: '请选择',
            trigger: 'change'
          }],
        }
      },
      gdxxsqRules() {
        return {
          gdmc: [{
            required: true,
            message: '请输入',
            trigger: 'change'
          }],
          tjxq: [{
            required: true,
            message: '请输入',
            trigger: 'change'
          }],
          cd: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
          gdzj: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
          yxyl: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
          yxbj: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
          zcsl: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
          fssl: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
        }
      },
      ghgqRules() {
        const validatorCdfw = (rule, value, callback) => {
          if (!this.ghgqForm.qyfw) {
            callback(new Error('请选择'));
          } else {
            callback();
          }
        }
        return {
          gdqzd: [{
            required: true,
            message: '请输入',
            trigger: 'change'
          }],
          ghgqdj: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          ghgqlx: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          lngAndLat: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          qyfw: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          cd: [{
            required: true,
            type: 'number',
            message: '请输入',
            trigger: 'change'
          }],
        }
      },
    },
    methods: {
      async getBaseInfo() {
        this.loading = true
        let gdxxsqParams = {
          gkdx_id: this.gkdx_id,
          per_page: this.gdxxsqPage.pageSize,
          page: this.gdxxsqPage.pageIndex,
        }
        let ghgqParams = {
          gkdx_id: this.gkdx_id,
          per_page: this.ghgqPage.pageSize,
          page: this.ghgqPage.pageIndex,
        }
        Promise.all([api.getGdxxsqList(gdxxsqParams), api.getGhgqList(ghgqParams)]).then((result) => {
          let gdxxsqRes = result[0],
            ghgqRes = result[1]
          if (gdxxsqRes.status_code == 200) {
            this.gdxxsqData = gdxxsqRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
            this.gdxxsqPage.totalRow = gdxxsqRes.data.total
          }
          if (ghgqRes.status_code == 200) {
            this.ghgqData = ghgqRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
            this.ghgqPage.totalRow = ghgqRes.data.total
            this.ghgqSum.hjzc = ghgqRes.hjzc || 0
          }
          this.loading = false
        }).catch((error) => {
          console.log(error)
          this.loading = false
        })
        let {
          status_code,
          data,
          message
        } = await api.getCsgxsqBase(this.gkdx_id);
        if (status_code == 0) {
          this.baseInfo = {
            gdsjssnl: data.gdsjssnl ? Number(data.gdsjssnl) : 0,
            gdzcd: data.gdzcd ? Number(data.gdzcd) : 0
          }
        }
        this.loading = false
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
        this.$refs.baseInfo1.validate(async valid => {
          if (valid) {
            let params = {
              gkdx_id: this.gkdx_id,
              gdsjssnl: this.baseInfo.gdsjssnl,
              gdzcd: this.baseInfo.gdzcd,
            }
            let {
              status_code,
              message
            } = await api.addCsgxsqBase(params);
            if (status_code == 200) {
              this.$Message.success('保存成功')
            }
          }
        })
      },
      async saveInfo2() {
        let params = {
          gkdx_id: this.gkdx_id,
          fjs: this.baseInfo.fjs,
        }
        let {
          status_code,
          message
        } = await api.addCsgxsqBase(params);
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
      async getGdxxsqList_() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: 1000,
          page: this.gdxxsqPage.pageIndex,
        }
        let {
          status_code,
          data
        } = await api.getGdxxsqList(params)
        if (status_code == 200) {
          this.gdxxsqList = data.data
        }
      },
      handleChangeGdxxsqPage(val) {
        this.gdxxsqPage.pageIndex = val
        this.getGdxxsqList()
      },
      handleChangeGdxxsqPageSize(val) {
        this.gdxxsqPage.pageSize = val
        this.getGdxxsqList()
      },
      async getGdxxsqList() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: this.gdxxsqPage.pageSize,
          page: this.gdxxsqPage.pageIndex,
        }
        let {
          status_code,
          data
        } = await api.getGdxxsqList(params)
        if (status_code == 200) {
          this.gdxxsqData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
          this.gdxxsqPage.totalRow = data.total
        }
      },
      openGdxxsqModel() {
        this.modeType = 1;
        this.showGdxxsqModel = true
      },
      editGdxxsqModel(row) {
        this.gdxxsqForm = {
          gdmc: row.gdmc,
          tjxq: row.tjxq,
          cd: row.cd ? Number(row.cd) : 0,
          gdzj: row.gdzj ? Number(row.gdzj) : 0,
          zcsl: row.zcsl ? Number(row.zcsl) : 0,
          fssl: row.fssl ? Number(row.fssl) : 0,
          yxyl: row.yxyl ? Number(row.yxyl) : 0,
          yxbj: row.yxbj ? Number(row.yxbj) : 0
        }
        this.id = row.id
        this.modeType = 2;
        this.showGdxxsqModel = true
      },
      gdxxsqModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.gdxxsqForm = {
              gdmc: '',
              tjxq: '',
              cd: 0,
              gdzj: 0,
              zcsl: 0,
              fssl: 0,
              yxyl: 0,
              yxbj: 0
            }
            this.$refs.gdxxsq.resetFields();
          })
        }
      },
      async removeGdxxsq(row) {
        let {
          status_code
        } = await api.deleteGdxxsqInfo(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getGdxxsqList()
      },
      async saveGdxxsq() {
        this.$refs.gdxxsq.validate(async valid => {
          if (valid) {
            this.gdxxsqLoading = true
            let params = {
              ...this.gdxxsqForm,
              gkdx_id: this.gkdx_id
            }
            if (this.modeType == 2) {
              params.id = this.id
            }
            let {
              status_code,
              message
            } = await api.addGdxxsqInfo(params);
            if (status_code == 200) {
              this.$Message.success(message)
              this.showGdxxsqModel = false
              this.getGdxxsqList()
            }
            this.gdxxsqLoading = false
          }
        })
      },
      handleChangeGhgqPage(val) {
        this.ghgqPage.pageIndex = val
        this.getGhgqList()
      },
      handleChangeGhgqPageSize(val) {
        this.ghgqPage.pageSize = val
        this.getGhgqList()
      },
      async getGhgqList() {
        let params = {
          gkdx_id: this.gkdx_id,
          per_page: this.ghgqPage.pageSize,
          page: this.ghgqPage.pageIndex,
        }
        let res = await api.getGhgqList(params)
        let {
          status_code,
          data
        } = res
        if (status_code == 200) {
          this.ghgqData = data.data
          this.ghgqPage.totalRow = data.total
          this.ghgqSum.hjzc = res.hjzc
        }
      },
      openGhgqModel() {
        this.modeType = 1;
        this.showGhgqModel = true
      },
      editGhgqModel(row) {
        this.ghgqForm = {
          gdqzd: row.gdqzd,
          ghgqdj: row.ghgqdj,
          ghgqlx: row.ghgqlx,
          cd: row.cd ? Number(row.cd) : 0,
          lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(6)} ${(row.wd - 0).toFixed(6)}` : '',
          qyfw: row.qyfw,

        }
        this.id = row.id
        this.modeType = 2;
        this.showGhgqModel = true
      },
      ghgqModelChange(status) {
        if (!status) {
          this.$nextTick(() => {
            this.ghgqForm = {
              gdqzd: '',
              ghgqdj: '',
              ghgqlx: '',
              cd: 0,
              lngAndLat: '',
              qyfw: ''
            }
            this.$refs.ghgq.resetFields();
          })
        }
      },
      async removeGhgq(row) {
        let {
          status_code
        } = await api.deleteGhgqInfo(row.id)
        status_code == 200 && this.$Message.success('删除成功')
        this.getGhgqList()
      },
      async saveGhgq() {
        this.$refs.ghgq.validate(async valid => {
          if (valid) {
            this.ghgqLoading = true
            let params = {
              ...this.ghgqForm,
              jd: this.ghgqForm.lngAndLat.split(' ')[0],
              wd: this.ghgqForm.lngAndLat.split(' ')[1],
              gkdx_id: this.gkdx_id
            }
            delete params.lngAndLat
            if (this.modeType == 2) {
              params.id = this.id
            }
            let {
              status_code,
              message
            } = await api.addGhgqInfo(params);
            if (status_code == 200) {
              this.$Message.success(message)
              this.showGhgqModel = false
              this.getGhgqList()
            }
            this.ghgqLoading = false
          }
        })
      },
    },
    created() {
      this.getBaseInfo()
      if(this.isDisEditInfo) {
        this.gdxxsqColumns.pop()
        this.ghgqColumns.pop()
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
