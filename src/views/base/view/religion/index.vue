<template>
  <div class="page">
    <div v-show="step == 1">
      <Row type="flex" justify="center">
        <Col>
        <div class="title">请完善{{step == 1 ? '场所' : '风险'}}信息</div>
        <part-title text="基本信息"></part-title>
        <Form :model="baseInfo" ref="baseInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140"
          style="width: 600px">
          <FormItem label="场所名称">
            {{baseInfo.csmc}}
          </FormItem>
          <FormItem label="场所类型">
            <Select clearable v-model="baseInfo.cslx" placeholder="场所类型">
              <Option v-for="item in cslxList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="宗教类型" v-if="baseInfo.cslx == '宗教场所'">
            <Select clearable v-model="baseInfo.zjlb" placeholder="宗教类型">
              <Option v-for="item in zjlbList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
          <FormItem label="申请单位" v-if="baseInfo.cslx == '民间信仰'">
            <Input clearable v-model="baseInfo.sqdw" placeholder="申请单位"></Input>
          </FormItem>
          <FormItem label="登记编号" v-if="baseInfo.cslx == '民间信仰'">
            <Input clearable v-model="baseInfo.djbh" placeholder="登记编号"></Input>
          </FormItem>
          <FormItem label="在册人数">
            <InputNumber :min="0" v-model="baseInfo.zcrs" placeholder="在册人数"></InputNumber>
          </FormItem>
          <FormItem label="投用时间">
            <DatePicker type="date" v-model="baseInfo.tysj" placeholder="投用时间"></DatePicker>
          </FormItem>
          <FormItem label="场所地址" prop="csdz">
            <Input clearable v-model="baseInfo.csdz" placeholder="场所地址"></Input>
          </FormItem>
          <FormItem label="经纬度" prop="lngAndLat">
            <lng id="lng_box" :lngAndLat.sync="baseInfo.lngAndLat" :dz="baseInfo.csdz"></lng>
          </FormItem>
          <FormItem label="场所范围">
            <div @click.stop="openAreaModal">
              <Input readonly v-model="baseInfo.csfw" icon="md-pin" placeholder="场所范围" />
            </div>
          </FormItem>
          <FormItem label="行业代码">
            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
          </FormItem>
          <!-- <FormItem label="所辖管区">
				            <Cascader
				            	clearable
				            	change-on-select
				            	v-model="baseInfo.quyu"
				            	:data="areaList"
				            	:load-data="loadArea"
				            	placeholder="所属辖区"></Cascader>
				        </FormItem> -->
          <FormItem label="社会统一信用代码">
            <Input clearable v-model="baseInfo.tyshxydm" placeholder="社会统一信用代码"></Input>
          </FormItem>
          <FormItem label="法定代表人">
            <Input clearable v-model="baseInfo.fddbr" placeholder="法定代表人"></Input>
          </FormItem>
          <FormItem label="主要活动介绍">
            <Input clearable v-model="baseInfo.zyhdjs" type="textarea" placeholder="主要活动介绍"></Input>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <div class="line"></div>
      <Row type="flex" justify="center">
        <Col>
        <part-title text="建筑物信息"></part-title>
        <Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
          <FormItem label="占地面积（㎡）">
            <InputNumber :min="0" v-model="baseInfo.zdmj" placeholder="占地面积"></InputNumber>
          </FormItem>
          <FormItem label="建筑面积（㎡）">
            <InputNumber :min="0" v-model="baseInfo.jzmj" placeholder="建筑面积"></InputNumber>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <div class="line"></div>
      <Row type="flex" justify="center">
        <Col>
        <part-title text="联系人信息"></part-title>
        <Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
          <FormItem label="负责人">
            <Row type="flex" :gutter="20">
              <Col span="8">
              <Input clearable v-model="baseInfo.qyfzr" placeholder="姓名"></Input>
              </Col>
              <Col span="16">
              <Input type="tel" clearable v-model="baseInfo.qyfzrdh" placeholder="电话"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="经办人">
            <Row type="flex" :gutter="20">
              <Col span="8">
              <Input clearable v-model="baseInfo.jbr" placeholder="姓名"></Input>
              </Col>
              <Col span="16">
              <Input type="tel" clearable v-model="baseInfo.jbrdh" placeholder="电话"></Input>
              </Col>
              <Col span="24">
              <Input type="email" clearable v-model="baseInfo.jbryx" placeholder="邮箱"></Input>
              </Col>
            </Row>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <Col>
        <Button type="primary" style="margin: 0 auto; width: 200px;" @click="nextStep">完成</Button>
        </Col>
      </Row>
    </div>
    <div v-show="step == 2">
      <Row type="flex" justify="center">
        <Col span="22">
        <div class="title">请完善风险信息</div>
        <part-title text="人员活动"></part-title>
        <Form :model="mostForm" label-position="left" :label-width="140">
          <FormItem label="最多容纳人数">
            <InputNumber :min="0" v-model="mostForm.zdkrnrs"></InputNumber>
          </FormItem>
          <FormItem label="活动频次(次/月)">
            <InputNumber :min="0" v-model="mostForm.hdpc"></InputNumber>
          </FormItem>
        </Form>
        <part-title text="消防重点单位"></part-title>
        <Form :model="mostForm" label-position="left" :label-width="140">
          <FormItem label="消防重点单位">
            <Select clearable v-model="mostForm.xfzddw" placeholder="请选择">
              <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="火灾高危单位">
            <Select clearable v-model="mostForm.hzgwdw" placeholder="请选择">
              <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="A级景区内">
            <Select clearable v-model="mostForm.ajjqn" placeholder="请选择">
              <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="文物单位">
            <Select clearable v-model="mostForm.wbdw" placeholder="请选择">
              <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="文物等级" v-if="mostForm.wbdw == 1">
            <Select clearable v-model="mostForm.wbdj" placeholder="请选择">
              <Option v-for="item in jbList" :key="item" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <Row type="flex" justify="center" style="margin-top: 24px">
        <Col>
        <Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
        </Col>
      </Row>
    </div>
    <Modal width="1000" title="经纬度标注" v-model="showLngModel">
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
    <Modal width="1000" title="范围标注" v-model="showAreaModel">
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
  </div>
</template>

<script>
  import api from '@/api/api'
  import partTitle from '@/components/title'
  import lng from '../../../baseInfo/components/lng'
  import areajs from '@/common/js/area'
  import lngjs from '@/common/js/lng'
  import datePickerjs from '@/common/js/datePicker'
  import {
    getDate
  } from '@/utils/tool'
  export default {
    name: '',
    mixins: [areajs, lngjs, datePickerjs],
    components: {
      partTitle,
      lng
    },
    data() {
      return {
        gkdx_id: this.$storage.get('userInfo').gkdx_id,
        step: 1,
        showAreaModel: false,
        showLngModel: false,
        modeType: '',
        map: null,
        polygonTool: null,
        baseInfo: {
          csmc: '宗教',
          cslx: '',
          zjlb: '',
          fddbr: '',
          tyshxydm: '',
          sqdw: '',
          djbh: '',
          hydm: '',
          // quyu: [],
          tysj: '',
          zcrs: 0,
          zyhdjs: '',
        },
        baseInfo: {
          csdz: '',
          zdmj: 0,
          jzmj: 0,
          lngAndLat: '',
          csfw: ''
        },
        baseInfo: {
          jbr: '',
          jbrdh: '',
          jbryx: '',
          qyfzr: '',
          qyfzrdh: '',
        },
        mostForm: {
          zdkrnrs: 0,
          hdpc: 0,
          xfzddw: '',
          hzgwdw: '',
          ajjqn: '',
          wbdw: '',
          wbdj: ''
        },
        xfzddwList: [{
          value: 0,
          name: '否'
        }, {
          value: 1,
          name: '是'
        }],
        jbList: ['国家级', '省级', '市级', '县级'],
        lng: '',
        lat: '',
        cslxList: ['宗教场所', '民间信仰'],
        zjlbList: ['佛教', '道教', '基督教', '天主教'],
        areaList: [],
        form: {}
      }
    },
    watch: {

    },
    computed: {
      rules() {
        const validatorLng = (rule, value, callback) => {
          if (!this.baseInfo.lngAndLat) {
            callback(new Error('请输入'));
          } else {
            callback();
          }
        }
        return {
          csdz: [{
            required: true,
            message: '请输入',
            trigger: 'change'
          }],
          // lngAndLat: [{ required: true, validator: validatorLng, trigger: 'change' }],
          // quyu: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
        }
      }
    },
    methods: {
      async getBaseInfo() {
        let {
          status_code,
          data,
          message
        } = await api.getReligionBase(this.gkdx_id);
        if (status_code == 0) {
          this.form = data;
          let {
            csmc,
            cslx,
            zjlb,
            fddbr,
            tyshxydm,
            sqdw,
            djbh,
            hydm,
            quyu_id,
            tysj,
            zcrs,
            zyhdjs,
            jd,
            wd,
            csdz,
            zdmj,
            jzmj,
            csfw,
            jbr,
            jbrdh,
            jbryx,
            qyfzr,
            qyfzrdh,
            zdkrnrs,
            hdpc,
            xfzddw,
            hzgwdw,
            ajjqn,
            wbdw,
            wbdj
          } = this.form
          this.baseInfo = {
            csmc,
            cslx,
            zjlb,
            fddbr,
            tyshxydm,
            sqdw,
            djbh,
            hydm,
            zcrs,
            zyhdjs,
            csdz,
            csfw,
            jbr,
            jbrdh,
            jbryx,
            qyfzr,
            qyfzrdh
          }
          this.baseInfo.tysj = this.form.tysj ? new Date(this.form.tysj) : '';
          this.baseInfo.zdmj = zdmj ? Number(zdmj) : 0
          this.baseInfo.jzmj = jzmj ? Number(jzmj) : 0
          this.baseInfo.lngAndLat = this.form.jd && this.form.wd ?
            `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}` : ''
          this.mostForm = {
            zdkrnrs,
            hdpc,
            xfzddw,
            hzgwdw,
            ajjqn,
            wbdw,
            wbdj
          }
          // this.getQy()
          // this.getHy()
        }
      },
      nextStep() {
        this.$refs.baseInfo.validate((valid) => {
          if (valid) {
            this.submit()
          }
        })
      },
      async submit() {
        let params = {
          ...this.baseInfo,
          tysj: this.baseInfo.tysj ? getDate(new Date(this.baseInfo.tysj).getTime(), 'date') : '',
          // quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
          jd: this.baseInfo.lngAndLat.split(' ')[0],
          wd: this.baseInfo.lngAndLat.split(' ')[1],
        }
        if (this.$route.query.type == 2) {
          params.gkdx_id = this.form.gkdx_id
        }
        // delete params.quyu
        delete params.lngAndLat
        let {
          status_code,
          message
        } = await api.addReligionBase(params);
        if (status_code == 200) {
          this.$Message.success('保存成功')
          if (this.$route.name == 'base') {
            this.$storage.set('gkdx_id', this.form.gkdx_id)
            this.$router.back()
          }
        }
      },
      async saveInfo() {
        let params = {
          ...this.mostForm,
          gkdx_id: this.gkdx_id
        }
        let {
          status_code,
          message
        } = await api.addReligionBase(params);
        if (status_code == 200) {
          this.$Message.success(message)
          if (this.$route.query.type == 2) {
            this.$router.back()
          } else {
            this.$router.replace('/baseInfo')
          }
        }
      },
      openAreaModal() {
        this.showAreaModel = true;
        this.$nextTick(() => {
          let self = this;
          
          let lo = new BMap.Geolocation();
          lo.getCurrentPosition((e) => {
            this.map = new T.Map('area_box');
            let ctrl = new T.Control.MapType();
            this.map.addControl(ctrl); // 增加地图类型控件
            //移除图层
            this.map.removeControl(TMAP_NORMAL_MAP);
            //添加图层
            this.map.addControl(TMAP_HYBRID_MAP);
            let zoomCtrl = new T.Control.Zoom({
              position: T_ANCHOR_BOTTOM_RIGHT
            })
            this.map.addControl(zoomCtrl);
            if (this.baseInfo.lngAndLat) {
              this.map.centerAndZoom(new T.LngLat(this.baseInfo.lngAndLat.split(' ')[0] || e.point.lng, this.baseInfo
                .lngAndLat.split(' ')[1] || e.point.lat), 17);
            } else {
              this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 17);
            }
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
            if (this.baseInfo.csfw) {
              let csfw = JSON.parse(this.baseInfo.csfw)
              let points = csfw.map(item => {
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
          this.baseInfo.csfw = JSON.stringify(e.currentLnglats)
        })
      },
      clearArea() {
        this.baseInfo.csfw = ''
        this.map.clearOverLays()
      },
      cancelArea() {
        this.map.clearOverLays();
        this.map = null;
        this.polygonTool = null;
        this.baseInfo.csfw = this.csfw || this.form.csfw || '';
        this.showAreaModel = false
      },
      saveArea() {
        this.csfw = this.baseInfo.csfw;
        this.form.csfw = this.baseInfo.csfw;
        this.map.clearOverLays();
        this.map = null;
        this.polygonTool = null;
        this.showAreaModel = false
      },
    },
    created() {
      this.getArea('', list => {
        this.areaList = list
        this.getBaseInfo()
      })
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  .page {
    margin-bottom: 24px;

    .line {
      width: 100%;
      height: 10px;
      background: #f5f5f5;
    }
  }

  .tip {
    margin-bottom: 8px;
    color: #f92828;
  }

  .num_box {
    margin-bottom: 8px;
  }
</style>
