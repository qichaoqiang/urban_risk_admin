<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<!-- <Row type="flex" justify="end" style="margin-top: 12px" v-show="this.$route.name !== 'disEditInfo'">
						<Col>
							<Button type="primary" @click="edit">编辑</Button>
						</Col>
					</Row> -->
					<part-title text="基本信息"></part-title>
					<Form disabled :model="baseInfo" label-position="left" :label-width="120" style="width: 600px">
						<FormItem label="名称">
				            {{baseInfo.mc}}
				        </FormItem>
				        <FormItem label="所属区域">
				            <Cascader 
				            	readonly 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属区域"></Cascader>
				        </FormItem>
				        <FormItem label="起点">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="baseInfo.qd" placeholder="名称"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input 
			        				readonly 
			        				v-model="baseInfo.lngAndLat" 
			        				icon="md-pin" 
			        				placeholder="经纬度" />
				        			<!-- <lng :lngAndLat.sync="baseInfo.lngAndLat"></lng> -->
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="终点">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="baseInfo.zd" placeholder="名称"></Input>
				        		</Col>
				        		<Col span="16">
					        		<Input 
				        				readonly 
				        				v-model="baseInfo.zdlngAndLat" 
				        				icon="md-pin" 
				        				placeholder="经纬度" />
				        			<!-- <lng :lngAndLat.sync="baseInfo.zdlngAndLat"></lng> -->
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="途径辖区">
				        	<Input clearable v-model="baseInfo.tjxq" placeholder="途径辖区"></Input>
				        </FormItem>
				        <FormItem label="管理单位">
				        	<Row type="flex" :gutter="20">
					        	<Col span="12">
				        			<Input clearable v-model="baseInfo.gldw" placeholder="单位名称"></Input>
				        		</Col>
				        		<Col span="12">
				        			<Input clearable v-model="baseInfo.tyshxydm" placeholder="统一社会信用代码"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="设计单位">
				        	<Row type="flex" :gutter="20">
					        	<Col span="12">
				        			<Input clearable v-model="baseInfo.sjdw" placeholder="单位名称"></Input>
				        		</Col>
				        		<Col span="12">
				        			<Input clearable v-model="baseInfo.sjdwtyshxydm" placeholder="统一社会信用代码"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="施工单位">
				        	<Row type="flex" :gutter="20">
					        	<Col span="12">
				        			<Input clearable v-model="baseInfo.sgdw" placeholder="单位名称"></Input>
				        		</Col>
				        		<Col span="12">
				        			<Input clearable v-model="baseInfo.sgdwtyshxydm" placeholder="统一社会信用代码"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="竣工投用时间">
				            <DatePicker type="date" v-model="baseInfo.jgtysj"  placeholder="请选择"></DatePicker>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form disabled :model="baseInfo" label-position="left" :label-width="120" style="width: 600px">
				        <FormItem label="负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="baseInfo.fzr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="baseInfo.fzrdh" placeholder="电话"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="分管安全负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="baseInfo.fgaqfzr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="baseInfo.fgaqfzrdh" placeholder="电话"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="baseInfo.jbr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="baseInfo.jbrdh" placeholder="电话"></Input>
				        		</Col>
				        		<Col span="24">
				        			<Input clearable v-model="baseInfo.jbryx" placeholder="邮箱"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
		</div>
		<Modal width="1000" title="企业范围标注" v-model="showAreaModel">
			<div id="area_box" class="area_box"></div>
			<div slot="footer"></div>
		</Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import lng from '../../components/lng'
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs, datePickerjs],
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
				showRimModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					mc: '',
					tyshxydm: '',
					zcdz: '',
					sfzgyy: '',
					gyymc: '',
					zgrs: 0,
					dzqhdjfzjsdg: 0,
					hyml: [],
					hydm: '',
					szgqmc: '',
					qyjbjk: '',
					yxzt: '',
					jbr: '',
					jbrdh: '',
					jbryx: '',
					qyfzr: '',
					fzrdh: '',
					fgaqfzr: '',
					fgaqfzrdh: '',
					scdz: '',
					lngAndLat: '',
					zdlngAndLat: '',
					cdfw: '',
					cdzymj: 0,
					jzmj: 0,
					zddbrs: 0,
					cwg: 0,
					cwk: 0,
					cwc: 0
				},
				yxztList: ['运行', '停运'],
				sazlqylxList: ['纯冷库涉氨制冷企业', '涉及加工作业的涉氨制冷企业'],
				sfzgyyList: [
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
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				whRiskColumns: [
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
                        title: '重大危险源单元名称',
                        key: 'zdwxydymc',
                    }, {
                        title: '重大危险源等级',
                        key: 'zdwxydj',
                    }, {
                        title: '危险化学品',
                        key: 'wxhxp',
                    }, {
                        title: '投用时间',
                        key: 'tysj',
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
				deviceForm: {
					sbfcgy_id: '',
					ccssmc: '',
					lx: '',
					tysj: '',
					yxzt: ''
				},
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

		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getCzrqBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { mc, jbr, jbrdh, jbryx, fzr, fzrdh, fgaqfzr, fgaqfzrdh, jgtysj, dz, sjdw, sjdwtyshxydm, sgdw, sgdwtyshxydm, gldw, tyshxydm, tjxq, qd, zd } = this.form
					this.baseInfo = { mc, jbr, jbrdh, jbryx, fzr, fzrdh, fgaqfzr, fgaqfzrdh, dz, sjdw, sjdwtyshxydm, sgdw, sgdwtyshxydm, gldw, tyshxydm, tjxq, qd, zd }
					this.baseInfo.jgtysj = jgtysj ? new Date(jgtysj) : ''
					this.baseInfo.lngAndLat = this.form.jd && this.form.wd ? `${this.form.jd} ${this.form.wd}` : ''
					this.baseInfo.zdlngAndLat = this.form.zdjd && this.form.zdwd ? `${this.form.zdjd} ${this.form.zdwd}` : ''
					// this.getHy();
					this.getQy();
				}
			},
			async nextStep() {
				let params = {
					...this.baseInfo,
					...this.baseInfo,
					...this.baseInfo,
					hyml: this.baseInfo.hyml[this.baseInfo.hyml.length - 1],
					jd: this.baseInfo.lngAndLat.split(' ')[0],
					wd: this.baseInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addCzrqBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.query.type == 2) {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}else {
						let { status_code, data } = await api.getCzrqBase()
						if(status_code == 200) {
							this.$storage.set('gkdx_id', data.data[0].gkdx_id)
						}
						this.$router.replace('/baseInfo')
					}
					// if(this.$route.query.type == 2) {
					// 	this.$storage.set('gkdx_id', this.form.gkdx_id)
					// }else {
					// 	let { status_code, data } = await api.getCzrqBase()
					// 	if(status_code == 200) {
					// 		this.$storage.set('gkdx_id', data.data[0].gkdx_id)
					// 	}
					// }
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
			edit() {
				this.$storage.set('baseInfo', this.baseInfo);
				this.$storage.set('addressInfo', this.addressInfo);
				this.$storage.set('contactInfo', this.contactInfo);
				this.$storage.set('mostForm', this.mostForm);
				this.$storage.set('form', this.form);
				this.$router.push({
					path: '/base',
					query: {
						type: 2
					}
				})
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
			            if(this.baseInfo.cdfw) {
			            	let cdfw = JSON.parse(this.baseInfo.cdfw)
			            	let points = cdfw.map(item => {
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
					this.baseInfo.cdfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.baseInfo.cdfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.baseInfo.cdfw = this.cdfw || this.form.cdfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.cdfw = this.baseInfo.cdfw;
				this.form.cdfw = this.baseInfo.cdfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
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
					this.whData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
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
					this.whRiskData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
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