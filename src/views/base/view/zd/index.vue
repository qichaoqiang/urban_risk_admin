<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<div class="title">请完善{{step == 1 ? '企业' : '风险'}}信息</div>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" ref="baseInfo" :rules="rules" hide-required-mark label-position="left" :label-width="140" style="width: 600px">
						<FormItem label="交叉点名称">
				            {{baseInfo.jcdmc}}
				        </FormItem>
				        <FormItem label="地址" prop="dz">
				        	<Input clearable v-model="baseInfo.dz" placeholder="地址"></Input>
				        </FormItem>
				        <FormItem label="所属辖区" prop="quyu">
				            <Cascader 
				            	readonly 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属辖区"></Cascader>
				        </FormItem>
				        <FormItem label="道路名称">
				        	<Input clearable v-model="baseInfo.dlmc" placeholder="道路名称"></Input>
				        </FormItem>
				        <FormItem label="经纬度" prop="lngAndLat">
				        	<lng id="lng_box" :lngAndLat.sync="baseInfo.lngAndLat" :dz="baseInfo.scdz"></lng>
				        </FormItem>
				        <FormItem label="管理单位">
				        	<Input clearable v-model="baseInfo.gldw" placeholder="管理单位"></Input>
				        </FormItem>
				        <FormItem label="管理单位负责人">
				        	<Input clearable v-model="baseInfo.gldwfzr" placeholder="管理单位负责人"></Input>
				        </FormItem>
				        <FormItem label="管理单位负责人电话">
				        	<Input clearable v-model="baseInfo.gldwfzrdh" placeholder="管理单位负责人电话"></Input>
				        </FormItem>
				        <FormItem label="设计单位">
				        	<Input clearable v-model="baseInfo.sjdw" placeholder="设计单位"></Input>
				        </FormItem>
				        <FormItem label="设计单位社会统一信用证代码">
				        	<Input clearable v-model="baseInfo.sjdwshtyxyzdm" placeholder="设计单位社会统一信用证代码"></Input>
				        </FormItem>
				        <FormItem label="施工单位">
				        	<Input clearable v-model="baseInfo.sgdw" placeholder="施工单位"></Input>
				        </FormItem>
				        <FormItem label="施工单位社会统一信用证代码">
				        	<Input clearable v-model="baseInfo.sgdwshtyxyzdm" placeholder="施工单位社会统一信用证代码"></Input>
				        </FormItem>
				        <FormItem label="维护保养单位">
				        	<Input clearable v-model="baseInfo.whbydw" placeholder="维护保养单位"></Input>
				        </FormItem>
				        <FormItem label="维护保养单位社会统一信用证代码">
				        	<Input clearable v-model="baseInfo.whbydwshtyxyzdm" placeholder="维护保养单位社会统一信用证代码"></Input>
				        </FormItem>
				        <FormItem label="地震区划等级">
				            <InputNumber :min="0" v-model="baseInfo.dzqhdj"></InputNumber>
				        </FormItem>
				        <FormItem label="竣工时间">
				            <DatePicker type="date" v-model="baseInfo.jgsj"  placeholder="竣工时间"></DatePicker>
				        </FormItem>
				        <FormItem label="主线设计速度（km/h）">
				            <InputNumber :min="0" v-model="baseInfo.zxsjsd"></InputNumber>
				        </FormItem>
				        <FormItem label="主线车道数">
				            <Input v-model="baseInfo.zxcds" placeholder="主线车道数"></Input>
				        </FormItem>
				        <FormItem label="跨主线桥梁最小净空">
				            <InputNumber :min="0" v-model="baseInfo.kzxqlzxjk"></InputNumber>
				        </FormItem>
				        <FormItem label="匝道护栏高度（m）">
				            <InputNumber :min="0" v-model="baseInfo.zdhlgd"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<!-- <div class="line"></div> -->
			<!-- <Row type="flex" justify="center">
				<Col>
					<part-title text="建筑物信息"></part-title>
					<Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="防空地下室掩蔽面积(㎡)">
				            <InputNumber :min="0" v-model="baseInfo.fkdxsybmj"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div> -->
			<!-- <Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="责任人员">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="baseInfo.zrry" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="baseInfo.zrrlxdh" placeholder="电话"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	 -->
			<Row type="flex" justify="center">
				<Col>
					<Button type="primary" style="margin: 0 auto; width: 200px;" @click="nextStep">完成</Button>
				</Col>
			</Row>
			<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}储存产品`" v-model="showTxxxModel" @on-visible-change="txxxModelChange">
				<div>
					<Form :model="txxxForm" label-position="left" :label-width="120">
						<FormItem label="名称">
				        	<Input clearable v-model="baseInfo.zrry" :data="areaList" placeholder="名称"></Input>
				        </FormItem>
				        <FormItem label="位置">
				        	<Input clearable v-model="baseInfo.zrry" :data="areaList" placeholder="位置"></Input>
				        </FormItem>
				        <FormItem label="图像">
				        	<Upload
								:before-upload="handleUpload"
								action="xxx">
						        <Button size="small" type="primary" ghost>选择图片</Button>
						    </Upload>
				        </FormItem>
				        <FormItem label="含药量(吨)">
				        	<InputNumber :min="0" v-model="txxxForm.hyl"></InputNumber>
				        </FormItem>
					</Form>
				</div>
				<div slot="footer">
		            <!-- <Button type="text" size="large" @click="showKcgmdxkModel = false">取消</Button> -->
			        <Button type="primary" size="large" @click="saveTxxx">保存</Button>
		        </div>
			</Modal>
		</div>
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import lng from '../../../baseInfo/components/lng'
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	import lngjs from '@/common/js/lng_'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs, lngjs, datePickerjs],
		components: { partTitle, lng },
		data() {
			return {
				id: '',
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				loading: true,
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showWhRiskModel: false,
				showSbfcgyModel: false,
				showDeviceModel: false,
				showMainRiskModel: false,
				showTxxxModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					jcdmc: '',
					tyshxydm: '',
					zcdz: '',
					sfzgyyq: '',
					yqmc: '',
					zgrs: 0,
					glrysl: 0,
					quyu: [],
					hyml: [],
					hydm: '',
					aqscbzh: '',
					qyjbjk: '',
					yxzt: '',
					jbr: '',
					jbrdh: '',
					jbryx: '',
					qyfzr: '',
					qyfzrdh: '',
					fgaqfzr: '',
					fgaqfzrdh: '',
					scdz: '',
					lngAndLat: '',
					qyfw: '',
					zdmj: 0,
					jzmj: 0,
					zddbrs: 0,
					sazlqylx: '',
				},
				sblxList: ['电动警报', '电声警报', '手摇警报'],
				sazlqylxList: ['纯冷库涉氨制冷企业', '涉及加工作业的涉氨制冷企业'],
				sfzgyyqList: [
					{
						value: 0,
						name: '否'
					}, {
						value: 1,
						name: '是'
					}
				],
				area: '',
				lng: '',
				lat: '',
				typeList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				statusList: [
					{
						value: '1',
						name: 'xxxx'
					}
				],
				areaList: [],
				whColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '化学品名称',
                        key: 'hxpm',
                    }, {
                        title: 'CAS号',
                        key: 'cas',
                    }, {
                        title: '是否重点监管',
                        slot: 'sfzdjg',
                    }, {
                        title: '是否爆炸品',
                        slot: 'sfbzp',
                    }, {
                        title: '火灾风险等级',
                        key: 'hzwxxdj',
                    }, {
                        title: 'MSDS',
                        key: 'msds',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				whData: [],
				whForm: {
					hxpm: '',
					bm: '',
					cas: '',
					sfzdjg: '',
					sfbzp: '',
					sfjdhxp: '',
					hzwxxdj: '',
					hxpzt: '',
					msds: '',
					nzzl: 0,
					nzzldw: '',
					zdccl: 0,
					zdccldw: '',
				},
				whPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				txxxForm: {
					mc: '',
					position: '',
					path: ''
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				ggjzlbList: [
					{
						value: '办公建筑',
	                    label: '办公建筑',
	                    children: [
	                    	{
	                    		value: '行政办公建筑',
	                    		label: '行政办公建筑',
	                    	}, {
	                    		value: '企事业单位',
	                    		label: '企事业单位',
	                    	}, {
	                    		value: '社会团体办公建筑',
	                    		label: '社会团体办公建筑',
	                    	}, {
	                    		value: '商务办公建筑',
	                    		label: '商务办公建筑',
	                    	}
	                    ],	
					}, {
						value: '商业建筑',
	                    label: '商业建筑',
	                    children: [
	                    	{
	                    		value: '大中型商场',
	                    		label: '大中型商场',
	                    	}, {
	                    		value: '市场',
	                    		label: '市场',
	                    	}, {
	                    		value: '超市',
	                    		label: '超市',
	                    	}, {
	                    		value: '专业服务商店',
	                    		label: '专业服务商店',
	                    	}, {
	                    		value: '旅游建筑',
	                    		label: '旅游建筑',
	                    	}
	                    ],
					}, {
						value: '科教文卫建筑',
	                    label: '科教文卫建筑',
	                    children: [
	                    	{
	                    		value: '高等院校',
	                    		label: '高等院校',
	                    	}, {
	                    		value: '中小学校',
	                    		label: '中小学校',
	                    	}, {
	                    		value: '科研单位',
	                    		label: '科研单位',
	                    	}, {
	                    		value: '会展建筑',
	                    		label: '会展建筑',
	                    	}, {
	                    		value: '公共文化建筑',
	                    		label: '公共文化建筑',
	                    	}, {
	                    		value: '体育场馆建筑',
	                    		label: '体育场馆建筑',
	                    	}, {
	                    		value: '医疗卫生建筑',
	                    		label: '医疗卫生建筑',
	                    	}, {
	                    		value: '公共媒体通信建筑',
	                    		label: '公共媒体通信建筑',
	                    	}
	                    ],
					}, {
						value: '市政公用建筑',
	                    label: '市政公用建筑',
	                    children: [
	                    	{
	                    		value: '城市供水',
	                    		label: '城市供水',
	                    	}, {
	                    		value: '供气',
	                    		label: '供气',
	                    	}, {
	                    		value: '供电',
	                    		label: '供电',
	                    	}, {
	                    		value: '消防',
	                    		label: '消防',
	                    	}
	                    ],
					}, {
						value: '交通站房建筑',
	                    label: '交通站房建筑',
	                    children: [
	                    	{
	                    		value: '城市汽车',
	                    		label: '城市汽车',
	                    	}, {
	                    		value: '火车',
	                    		label: '火车',
	                    	}, {
	                    		value: '轮船',
	                    		label: '轮船',
	                    	}, {
	                    		value: '飞机',
	                    		label: '飞机',
	                    	}
	                    ]
					}
				],
				txxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '名称',
                        key: 'mc',
                    }, {
                        title: '位置',
                        key: 'position',
                    }, {
                        title: '危险化学品',
                        slot: 'path',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				whRiskData: [],
				whRiskForm: {
					zdwxydymc: '',
					zdwxydj: '',
					wxhxp: '',
					tysj: '',
					dqzt: ''
				},
				dqztList: ['运行', '停运', '检修'],
				whRiskPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sbfcgyColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '涉粉工艺名称',
                        key: 'sfgymc',
                    }, {
                        title: '粉尘名称',
                        key: 'fcmc',
                    }, {
                        title: '粉尘类型',
                        key: 'fclx',
                    }, {
                        title: '作业人数',
                        key: 'zyrs',
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sbfcgyData: [],
				sbfcgyForm: {
					sfgymc: '',
					fcmc: '',
					fclx: '',
					zyrs: 0,
					ccss: '',
					dqzt: ''
				},
				ccssList: ['有', '无'],
				sbfcgyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sbfcgyNum: {
					gysl: 0,
					zyzrs: 0
				},
				deviceColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '除尘设施名称',
                        key: 'ccssmc',
                    }, {
                        title: '类型',
                        key: 'lx',
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                    }, {
                        title: '运行状态',
                        key: 'yxzt',
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				deviceData: [],
				lxList: ['湿式除尘', '干法布袋式除尘', '静电除尘', '旋风除尘', '其他'],
				devicePage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				deviceNum: {
					zsl: 0,
					yxsl: 0
				},
				mainRiskColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '工艺名称',
                        slot: 'gymc',
                    }, {
                        title: '危险工艺类型',
                        key: 'wxgylx',
                    }, {
                        title: '工艺操作人数',
                        key: 'sjczrs',
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				mainRiskData: [],
				mainRiskForm: {
					num: 0,
					name: '',
				},
				mainRiskPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				rimColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '敏感目标名称',
                        slot: 'name',
                    }, {
                        title: '方位',
                        key: 'cas',
                    }, {
                        title: '目标类型',
                        key: 'cas',
                    }, {
                        title: '人员数量',
                        key: 'cas',
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				rimData: [
					{	
						name: 'hahaha',
						cas: 1111,
						color: 'red'
					}
				],
				rimForm: {
					num: 0,
					name: '',
				},
				rimPage: {
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
			rules() {
				const validatorLng = (rule, value, callback) => {
					if (!this.baseInfo.lngAndLat) {
	                    callback(new Error('请输入'));
	                } else {
	                    callback();
	                }
				}
				return {
                	dz: [{ required: true, message: '请输入', trigger: 'change' }],
                	// lngAndLat: [{ required: true, validator: validatorLng, trigger: 'change' }],
                	quyu: [{ required: true, type: 'array', message: '请选择', trigger: 'change' }],
                }
            }
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getZdBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { jcdmc, dz, dlmc, ztjgjczt, jgsj, gldw, gldwfzr, gldwfzrdh, sjdw, sjdwshtyxyzdm, sgdw, sgdwshtyxyzdm, whbydw, whbydwshtyxyzdm, dzqhdj, zxsjsd, zxcds, kzxqlzxjk, zdhlgd } = this.form
					this.baseInfo = { jcdmc, dz, dlmc, ztjgjczt, gldw, gldwfzr, gldwfzrdh, sjdw, sjdwshtyxyzdm, sgdw, sgdwshtyxyzdm, whbydw, whbydwshtyxyzdm, zxcds }
					this.baseInfo.jgsj = jgsj ? new Date(jgsj) : ''
					this.baseInfo.dzqhdj = dzqhdj ? Number(dzqhdj) : 0
					this.baseInfo.zxsjsd = zxsjsd ? Number(zxsjsd) : 0
					this.baseInfo.kzxqlzxjk = kzxqlzxjk ? Number(kzxqlzxjk) : 0
					this.baseInfo.zdhlgd = zdhlgd ? Number(zdhlgd) : 0
					this.baseInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}` : ''
					this.getHy();
					this.getQy();
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
					quyu_id: this.baseInfo.quyu[this.baseInfo.quyu.length - 1],
					jgsj: this.baseInfo.jgsj ? getDate(new Date(this.baseInfo.jgsj).getTime(), 'date') : '',
					zysj: this.baseInfo.zysj ? getDate(new Date(this.baseInfo.zysj).getTime(), 'date') : '',
					jd: this.baseInfo.lngAndLat.split(' ')[0],
					wd: this.baseInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addZdBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.name == 'base') {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}
				}
			},
			saveInfo() {
				this.$Message.success('保存成功')
				if(this.$route.query.type == 2) {
					this.$router.back()
				}else {
					this.$router.replace('/baseInfo')
				}
			},
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new T.Geolocation();
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
			            if(this.baseInfo.lngAndLat) {
			            	this.map.centerAndZoom(new T.LngLat(this.baseInfo.lngAndLat.split(' ')[0] || e.lnglat.lng, this.baseInfo.lngAndLat.split(' ')[1] || e.lnglat.lat), 17);
			            }else {
			            	this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 17);
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
			            if(this.baseInfo.qyfw) {
			            	let qyfw = JSON.parse(this.baseInfo.qyfw)
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
					this.baseInfo.qyfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.baseInfo.qyfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.baseInfo.qyfw = this.qyfw || this.form.qyfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.qyfw = this.baseInfo.qyfw;
				this.form.qyfw = this.baseInfo.qyfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},

			openTxxxModel() {
				this.modeType2 = 1;
				this.showTxxxModel = true
			},
			editTxxxModel(row, index) {
				this.txxxForm = {
					mc: row.mc,
					position: row.position,
					path: row.path,
				}
				this.txxxId = index
				this.modeType2 = 2;
				this.showTxxxModel = true
			},
			txxxModelChange(status) {
				if(!status) {
					this.txxxForm = {
						mc: '',
						position: '',
						path: '',
					}
				}
			},
			async saveTxxx() {
				if(this.modeType2 == 2) {
					this.baseInfo.txxx.splice(this.txxxId, 1, this.txxxForm)
				}else {
					this.baseInfo.txxx.push(this.txxxForm)
				}
				this.showTxxxModel = false
			},
			removeTxxx(index) {
				this.baseInfo.txxx.splice(index, 1)
			},
	        handleUpload(file) {
	        	let list = ['image/jpeg', 'image/png', 'image/jpg']
	        	if(list.includes(file.type)) {
	        		console.log(file)
	        		// this.files = [file]
	        		let reader = new FileReader();
			        reader.readAsDataURL(file);
			        reader.onload = e => { 
						this.txxxForm.path = reader.result; 
						console.log(reader.result.length)
						// document.getElementById("data").innerText=this.result.substring(this.result.indexOf(',')+1); 
					}
	        	}else {
	        		this.$Message.error('文件类型错误')
	        	}
	        	return false
	        },
			handleChangeWhPage(val) {
				this.whPage.pageIndex = val
				this.getWhsbfcList()
			},
			handleChangeWhPageSize(val) {
				this.whPage.pageSize = val
				this.getWhsbfcList()
			},
			async getWhsbfcList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let { status_code, data } = await api.getWhsbfcList(params)
				if(status_code == 200) {
					this.whData = data.data
					this.whPage.totalRow = data.total
				}
			},
			openWhModel() {
				this.modeType = 1;
				this.showWhModel = true
			},
			editWhModel(row) {
				this.whForm = {
					hxpm: row.hxpm,
					bm: row.bm,
					cas: row.cas,
					sfzdjg: row.sfzdjg,
					sfbzp: row.sfbzp,
					sfjdhxp: row.sfjdhxp,
					hzwxxdj: row.hzwxxdj,
					hxpzt: row.hxpzt,
					msds: row.msds,
					nzzl: row.nzzl,
					nzzldw: row.nzzldw,
					zdccl: row.zdccl,
					zdccldw: row.zdccldw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showWhModel = true
			},
			whModelChange(status) {
				if(!status) {
					this.whForm = {
						hxpm: '',
						bm: '',
						cas: '',
						sfzdjg: '',
						sfbzp: '',
						sfjdhxp: '',
						hzwxxdj: '',
						hxpzt: '',
						msds: '',
						nzzl: 0,
						nzzldw: '',
						zdccl: 0,
						zdccldw: '',
					}
				}
			},
			async removeWh(row) {
				let { status_code } = await api.deleteWhsbfcInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhsbfcList()
			},
			async saveWh() {
				let params = {
					...this.whForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWhsbfcInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWhModel = false
					this.getWhsbfcList()
				}
			},
			handleChangeWhRiskPage(val) {
				this.whRiskPage.pageIndex = val
				this.getWhRiskList()
			},
			handleChangeWhRiskPageSize(val) {
				this.whRiskPage.pageSize = val
				this.getWhRiskList()
			},
			async getWhRiskList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.whRiskPage.pageSize,
					page: this.whRiskPage.pageIndex,
				}
				let { status_code, data } = await api.getWhRiskList(params)
				if(status_code == 200) {
					this.whRiskData = data.data
					this.whRiskPage.totalRow = data.total
				}
			},
			openWhRiskModel() {
				this.modeType = 1;
				this.showWhRiskModel = true
			},
			editWhRiskModel(row) {
				this.whRiskForm = {
					zdwxydymc: row.zdwxydymc,
					zdwxydj: row.zdwxydj,
					wxhxp: row.wxhxp,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showWhRiskModel = true
			},
			whRiskModelChange(status) {
				if(!status) {
					this.whRiskForm = {
						zdwxydymc: '',
						zdwxydj: '',
						wxhxp: '',
						tysj: '',
						dqzt: ''
					}
				}
			},
			async removeWhRisk(row) {
				let { status_code } = await api.deleteWhRiskInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhRiskList()
			},
			async saveWhRisk() {
				let params = {
					...this.whRiskForm,
					tysj: this.whRiskForm.tysj ? getDate(new Date(this.whRiskForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWhRiskInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWhRiskModel = false
					this.getWhRiskList()
				}
			},
			handleChangeSbfcgyPage(val) {
				this.sbfcgyPage.pageIndex = val
				this.getSbfcgyList()
			},
			handleChangeSbfcgyPageSize(val) {
				this.sbfcgyPage.pageSize = val
				this.getSbfcgyList()
			},
			async getSbfcgyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.sbfcgyPage.pageSize,
					page: this.sbfcgyPage.pageIndex,
				}
				let { status_code, data } = await api.getSbfcgyList(params)
				if(status_code == 200) {
					this.sbfcgyData = data.data
					this.sbfcgyPage.totalRow = data.total
				}
			},
			openSbfcgyModel() {
				this.modeType = 1;
				this.showSbfcgyModel = true
			},
			editSbfcgyModel(row) {
				this.sbfcgyForm = {
					sfgymc: row.sfgymc,
					fcmc: row.fcmc,
					fclx: row.fclx,
					zyrs: row.zyrs,
					ccss: row.ccss,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.modeType = 2;
				this.showSbfcgyModel = true
			},
			sbfcgyModelChange(status) {
				if(!status) {
					this.sbfcgyForm = {
						sfgymc: '',
						fcmc: '',
						fclx: '',
						zyrs: 0,
						ccss: '',
						dqzt: ''
					}
				}
			},
			async removeSbfcgy(row) {
				let { status_code } = await api.deleteSbfcgyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getSbfcgyList()
			},
			async saveSbfcgy() {
				let params = {
					...this.sbfcgyForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addSbfcgyInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showSbfcgyModel = false
					this.getSbfcgyList()
				}
			},
			handleChangeDevicePage(val) {
				this.devicePage.pageIndex = val
				this.getDeviceList()
			},
			handleChangeDevicePageSize(val) {
				this.devicePage.pageSize = val
				this.getDeviceList()
			},
			async getDeviceList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.devicePage.pageSize,
					page: this.devicePage.pageIndex,
				}
				let { status_code, data } = await api.getDeviceList(params)
				if(status_code == 200) {
					this.deviceData = data.data
					this.devicePage.totalRow = data.total
				}
			},
			openDeviceModel() {
				this.modeType = 1;
				this.showDeviceModel = true
			},
			editDeviceModel(row) {
				this.deviceForm = {
					sfgymc: row.sfgymc,
					fcmc: row.fcmc,
					fclx: row.fclx,
					zyrs: row.zyrs,
					ccss: row.ccss,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.modeType = 2;
				this.showDeviceModel = true
			},
			deviceModelChange(status) {
				if(!status) {
					this.deviceForm = {
						sfgymc: '',
						fcmc: '',
						fclx: '',
						zyrs: 0,
						ccss: '',
						dqzt: ''
					}
				}
			},
			async saveDevice() {
				let params = {
					...this.deviceForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addDeviceInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showDeviceModel = false
					this.getDeviceList()
				}
			},
			async removeDevice(row) {
				let { status_code } = await api.deleteDeviceInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getDeviceList()
			},
			handleChangeMainRiskPage(val) {
				this.mainRiskPage.pageIndex = val
				this.getMainRiskList()
			},
			handleChangeMainRiskPageSize(val) {
				this.mainRiskPage.pageSize = val
				this.getMainRiskList()
			},
			async getMainRiskList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.mainRiskPage.pageSize,
					page: this.mainRiskPage.pageIndex,
				}
				let { status_code, data } = await api.getMainRiskList(params)
				if(status_code == 200) {
					this.mainRiskData = data.data
					this.mainRiskPage.totalRow = data.total
				}
			},
			openMainRiskModel() {
				this.modeType = 1;
				this.showMainRiskModel = true
			},
			editMainRiskModel(row) {
				this.mainRiskForm = {
					zdwxydymc: row.zdwxydymc,
					zdwxydj: row.zdwxydj,
					wxhxp: row.wxhxp,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showMainRiskModel = true
			},
			mainRiskModelChange(status) {
				if(!status) {
					this.mainRiskForm = {
						zdwxydymc: '',
						zdwxydj: '',
						wxhxp: '',
						tysj: '',
						dqzt: ''
					}
				}
			},
			async removeMainRisk(row) {
				let { status_code } = await api.deleteMainRiskInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getMainRiskList()
			},
			async saveMainRisk() {
				let params = {
					...this.mainRiskForm,
					tysj: this.mainRiskForm.tysj ? getDate(new Date(this.mainRiskForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addMainRiskInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showMainRiskModel = false
					this.getMainRiskList()
				}
			},
			handleChangeRimPage(val) {
				this.rimPage.pageIndex = val
				this.getRimList()
			},
			handleChangeRimPageSize(val) {
				this.rimPage.pageSize = val
				this.getRimList()
			},
			async getRimList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.rimPage.pageSize,
					page: this.rimPage.pageIndex,
				}
				let { status_code, data } = await api.getRimList(params)
				if(status_code == 200) {
					this.rimData = data.data
					this.rimPage.totalRow = data.total
				}
			},
			openRimModel() {
				this.modeType = 1;
				this.showRimModel = true
			},
			editRimModel(row) {
				this.rimForm = {
					zdwxydymc: row.zdwxydymc,
					zdwxydj: row.zdwxydj,
					wxhxp: row.wxhxp,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showRimModel = true
			},
			rimModelChange(status) {
				if(!status) {
					this.rimForm = {
						zdwxydymc: '',
						zdwxydj: '',
						wxhxp: '',
						tysj: '',
						dqzt: ''
					}
				}
			},
			async removeRim(row) {
				let { status_code } = await api.deleteRimInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getRimList()
			},
			async saveRim() {
				let params = {
					...this.rimForm,
					tysj: this.rimForm.tysj ? getDate(new Date(this.rimForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addRimInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showRimModel = false
					this.getRimList()
				}
			},
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
				if(this.industryList.length > 0) {
					this.getBaseInfo()
				}
			})
			this.getIndustry('', list => {
				this.industryList = list
				if(this.areaList.length > 0) {
					this.getBaseInfo()
				}
			})
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.page {
		margin-bottom: 24px;
		.line {
			width: 100%;
			height: 10px;
			background: #f5f5f5;
		}
	}
</style>