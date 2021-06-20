<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2" style="height: 100%">
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="营业位置" name="name1">
				        	<part-title text="营业位置"></part-title>
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" label-position="left" inline>
					        	<FormItem label="所在建筑名称" :label-width="104" style="margin-right: 24px">
						        	<Input clearable v-model="baseInfo.szjzmc"></Input>
						        </FormItem>
						        <FormItem label="业主单位" :label-width="76" style="margin-right: 24px">
						        	<Input clearable v-model="baseInfo.yzdw"></Input>
						        </FormItem>
						        <FormItem label="联系人" :label-width="62" style="margin-right: 24px">
						        	<Input clearable v-model="baseInfo.yzdwlxr"></Input>
						        </FormItem>
						        <FormItem label="消防重点单位" :label-width="104" style="margin-right: 24px">
						            <Select clearable v-model="baseInfo.xfzddw" placeholder="请选择">
						                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
				        		<FormItem label="营业楼层" :label-width="76" style="margin-right: 24px">
						        	<Select clearable :transfer="true" v-model="baseInfo.yylc" placeholder="请选择">
						                <Option v-for="item in yylcList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						    </Form>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="使用负荷" name="name2">
				        	<part-title text="使用负荷"></part-title>
							<Form :disabled="isDisEditInfo" :model="baseInfo" label-position="left" inline>
						        <FormItem label="设备数量（台）" :label-width="118" style="margin-right: 24px">
						        	<InputNumber :min="0" v-model="baseInfo.sbsl"></InputNumber>
						        </FormItem>
						        <FormItem label="日均使用数量（台）" :label-width="146" style="margin-right: 24px">
						        	<InputNumber :min="0" v-model="baseInfo.rjsysl"></InputNumber>
						        </FormItem>
							</Form>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo2">完成</Button>
								</Col>
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
	            		<br/>
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}人流信息`" v-model="showRltzModel" @on-visible-change="rltzModelChange">
			<div>
				<Form :model="rltzForm" label-position="left" :label-width="200">
			        <FormItem label="近一个月的平均日流量">
			        	<InputNumber :min="0" v-model="rltzForm.jygydpjrll"></InputNumber>
			        </FormItem>
			        <FormItem label="当日人流量">
			        	<InputNumber :min="0" v-model="rltzForm.drrll"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="rltzForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRltzModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveRltz">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}燃料信息`" v-model="showGdtrqModel" @on-visible-change="gdtrqModelChange">
			<div>
				<Form :model="gdtrqForm" label-position="left" :label-width="180">
					<FormItem label="近一月用气量（立方/月）">
			        	<InputNumber :min="0" v-model="gdtrqForm.jyyyql"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="gdtrqForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRltzModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveGdtrq">保存</Button>
	        </div>
		</Modal>

		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}燃料信息`" v-model="showYhsyqModel" @on-visible-change="yhsyqModelChange">
			<div>
				<Form :model="yhsyqForm" label-position="left" :label-width="140">
					<FormItem label="钢瓶规格（L）">
			        	<InputNumber :min="0" v-model="yhsyqForm.gpgg"></InputNumber>
			        </FormItem>
			        <FormItem label="数量">
			            <InputNumber :min="0" v-model="yhsyqForm.sl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="yhsyqForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRltzModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveYhsyq">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}燃料信息`" v-model="showCjrlModel"  @on-visible-change="cjrlModelChange">
			<div>
				<Form :model="cjrlForm" label-position="left" :label-width="180">
					<FormItem label="近一月使用量（kg/月）">
			        	<InputNumber :min="0" v-model="cjrlForm.jyysyl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="cjrlForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRltzModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCjrl">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}燃料信息`" v-model="showElseModel"  @on-visible-change="elseModelChange">
			<div>
				<Form :model="elseForm" label-position="left" :label-width="180">
					<FormItem label="近一月使用量（kg/月）">
			        	<InputNumber :min="0" v-model="elseForm.jyysyl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="elseForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRltzModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveElse">保存</Button>
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
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs, lngjs, datePickerjs],
		components: { partTitle, lng, qyfw },
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
				showRltzModel: false,
				showGdtrqModel: false,
				showYhsyqModel: false,
				showCjrlModel: false,
				showElseModel: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					zdwxy: '',
				},
				addressInfo: {
					scdz: '',
					lngAndLat: '',
					qyfw: '',
					zdmj: 0,
					jzmj: 0,
				},
				contactInfo: {
					jbr: '',
					jbrdh: '',
					jbryx: '',
					qyfzr: '',
					qyfzrdh: '',
					fgaqfzr: '',
					fgaqfzrdh: ''
				},
				yxztList: ['生产', '停工', '改造', '搬迁'],
				yylcList: ['-5', '-4', '-3', '-2', '-1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
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
				rltzColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        },
                    }, {
                        title: '近一个月的平均日流量',
                        key: 'jygydpjrll',
                        minWidth: 200,
                    }, {
                        title: '当日人流量',
                        key: 'drrll',
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
                    }, 
				],
				rltzData: [],
				rltzForm: {
					jygydpjrll: 0,
					drrll: 0,
					tbsj: '',
				},
				rltzPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				sxflList: ['最终产品', '中间产品', '原料'],
				dqztList: ['运行', '停运', '检修'],
				gdtrqColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        },
                    }, {
                        title: '近一月用气量（立方/月）',
                        key: 'jyyyql',
                        minWidth: 100,
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				gdtrqData: [],
				gdtrqForm: {
					jyyyql: 0,
					tbsj: '',
				},
				ksldzzList: [
					{
						value: 0,
						name: '无'
					}, {
						value: 1,
						name: '有'
					}
				],
				gdtrqPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				gdtrqNum: {
					gysl: 0,
					zyzrs: 0
				},
				yhsyqColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        },
                    }, {
                        title: '钢瓶规格（L）',
                        key: 'gpgg',
                        minWidth: 120,
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 60,
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100,
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				yhsyqData: [],
				yhsyqForm: {
					gpgg: 0,
					sl: 0,
					tbsj: '',
				},
				yhsyqPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				cjrlColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        },
                    }, {
                        title: '近一月使用量（kg/月）',
                        key: 'jyysyl',
                        minWidth: 100,
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				cjrlData: [],
				cjrlForm: {
					jyysyl: 0,
					tbsj: '',
				},
				cjrlPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				elseColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        },
                    }, {
                        title: '近一月使用量（kg/月）',
                        key: 'jyysyl',
                        minWidth: 100,
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				elseData: [],
				elseForm: {
					jyysyl: 0,
					tbsj: '',
				},
				elsePage: {
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
				this.loading = true
				// let rltzParams = {
				// 	gkdx_id: this.gkdx_id,
				// 	per_page: this.rltzPage.pageSize,
				// 	page: this.rltzPage.pageIndex,
				// }
				// Promise.all([api.getRltzList(rltzParams)]).then((result) => {
				//   	let rltzRes = result[0], gdtrqRes = result[1], yhsyqRes = result[2], cjrlRes = result[3], elseRes = result[4]
				//   	if(rltzRes.status_code == 200) {
				//   		this.rltzData = rltzRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				//   		this.rltzPage.totalRow = rltzRes.data.total
				//   	}
				//   	this.loading = false   
				// }).catch((error) => {
				//   	console.log(error)
				//   	this.loading = false
				// })
				let { status_code, data, message } = await api.getWbBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { 
						szjzmc: data.szjzmc , 
						yzdw: data.yzdw, 
						yzdwlxr: data.yzdwlxr, 
						xfzddw: data.xfzddw ? Number(data.xfzddw) : 0,
						yylc: data.yylc, 
						sbsl: data.sbsl ? Number(data.sbsl) : 0, 
						rjsysl: data.rjsysl ? Number(data.rjsysl) : 0 
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
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addSbfcBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.query.type == 2) {
						this.$router.back()
					}else {
						this.$router.replace('/baseInfo')
					}
				}
			},
			async saveInfo1() {
				let params = {
					gkdx_id: this.gkdx_id,
					szjzmc: this.baseInfo.szjzmc,
					yzdw: this.baseInfo.yzdw,
					yzdwlxr: this.baseInfo.yzdwlxr,
					xfzddw: this.baseInfo.xfzddw,
					yylc: this.baseInfo.yylc,
				}
				let { status_code, message } = await api.addWbBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
				}
			},
			async saveInfo2() {
				let params = {
					gkdx_id: this.gkdx_id,
					sbsl: this.baseInfo.sbsl,
					rjsysl: this.baseInfo.rjsysl,
				}
				let { status_code, message } = await api.addWbBase(params);
				if(status_code == 200) {
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
			            if(this.addressInfo.qyfw) {
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
			async getRltzList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.rltzPage.pageIndex,
				}
				let { status_code, data } = await api.getRltzList(params)
				if(status_code == 200) {
					this.rltzList = data.data
				}
			},
			handleChangeRltzPage(val) {
				this.rltzPage.pageIndex = val
				this.getRltzList()
			},
			handleChangeRltzPageSize(val) {
				this.rltzPage.pageSize = val
				this.getRltzList()
			},
			async getRltzList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.rltzPage.pageSize,
					page: this.rltzPage.pageIndex,
				}
				let { status_code, data } = await api.getRltzList(params)
				if(status_code == 200) {
					this.rltzData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.rltzPage.totalRow = data.total
				}
			},
			openRltzModel() {
				this.modeType = 1;
				this.showRltzModel = true
			},
			editRltzModel(row) {
				this.rltzForm = {
					jygydpjrll: row.jygydpjrll ? Number(row.jygydpjrll) : 0,
					drrll: row.drrll ? Number(row.drrll) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showRltzModel = true
			},
			rltzModelChange(status) {
				if(!status) {
					this.rltzForm = {
						jygydpjrll: 0,
						drrll: 0,
						tbsj: '',
					}
				}
			},
			async removeRltz(row) {
				let { status_code } = await api.deleteRltzInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getRltzList()
			},
			async saveRltz() {
				let params = {
					...this.rltzForm,
					tbsj: this.rltzForm.tbsj ? getDate(new Date(this.rltzForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addRltzInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showRltzModel = false
					this.getRltzList()
				}
			},
			handleChangeGdtrqPage(val) {
				this.gdtrqPage.pageIndex = val
				this.getGdtrqList()
			},
			handleChangeGdtrqPageSize(val) {
				this.gdtrqPage.pageSize = val
				this.getGdtrqList()
			},
			async getGdtrqList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.gdtrqPage.pageSize,
					page: this.gdtrqPage.pageIndex,
				}
				let { status_code, data } = await api.getGdtrqList(params)
				if(status_code == 200) {
					this.gdtrqData = data.data
					this.gdtrqPage.totalRow = data.total
				}
			},
			async openGdtrqModel() {
				this.modeType = 1;
				this.showGdtrqModel = true
			},
			async editGdtrqModel(row) {
				this.gdtrqForm = {
					jyyyql: row.jyyyql ? Number(row.jyyyql) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showGdtrqModel = true
			},
			gdtrqModelChange(status) {
				if(!status) {
					this.gdtrqForm = {
						jyyyql: 0,
						tbsj: '',
					}
				}
			},
			async removeGdtrq(row) {
				let { status_code } = await api.deleteGdtrqInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getGdtrqList()
			},
			async saveGdtrq() {
				let params = {
					...this.gdtrqForm,
					tbsj: this.gdtrqForm.tbsj ? getDate(new Date(this.gdtrqForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				delete params.isWxgy
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addGdtrqInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showGdtrqModel = false
					this.getGdtrqList()
				}
			},
			handleChangeYhsyqPage(val) {
				this.yhsyqPage.pageIndex = val
				this.getYhsyqList()
			},
			handleChangeYhsyqPageSize(val) {
				this.yhsyqPage.pageSize = val
				this.getYhsyqList()
			},
			async getYhsyqList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.yhsyqPage.pageSize,
					page: this.yhsyqPage.pageIndex,
				}
				let { status_code, data } = await api.getYhsyqList(params)
				if(status_code == 200) {
					this.yhsyqData = data.data
					this.yhsyqPage.totalRow = data.total
				}
			},
			openYhsyqModel() {
				this.modeType = 1;
				this.showYhsyqModel = true
			},
			editYhsyqModel(row) {
				this.yhsyqForm = {
					gpgg: row.gpgg ? Number(row.gpgg) : 0,
					sl: row.sl ? Number(row.sl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showYhsyqModel = true
			},
			yhsyqModelChange(status) {
				if(!status) {
					this.yhsyqForm = {
						gpgg: 0,
						sl: 0,
						tbsj: '',
					}
				}
			},
			async removeYhsyq(row) {
				let { status_code } = await api.deleteYhsyqInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getYhsyqList()
			},
			async saveYhsyq() {
				let params = {
					...this.yhsyqForm,
					tbsj: this.yhsyqForm.tbsj ? getDate(new Date(this.yhsyqForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addYhsyqInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showYhsyqModel = false
					this.getYhsyqList()
				}
			},
			handleChangeCjrlPage(val) {
				this.cjrlPage.pageIndex = val
				this.getCjrlList()
			},
			handleChangeCjrlPageSize(val) {
				this.cjrlPage.pageSize = val
				this.getCjrlList()
			},
			async getCjrlList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.cjrlPage.pageSize,
					page: this.cjrlPage.pageIndex,
				}
				let { status_code, data } = await api.getCjrlList(params)
				if(status_code == 200) {
					this.cjrlData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.cjrlPage.totalRow = data.total
				}
			},
			openCjrlModel() {
				this.modeType = 1;
				this.showCjrlModel = true
			},
			editCjrlModel(row) {
				this.cjrlForm = {
					jyysyl: row.jyysyl ? Number(row.jyysyl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showCjrlModel = true
			},
			cjrlModelChange(status) {
				if(!status) {
					this.cjrlForm = {
						jyysyl: 0,
						tbsj: '',
					}
				}
			},
			async removeCjrl(row) {
				let { status_code } = await api.deleteCjrlInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCjrlList()
			},
			async saveCjrl() {
				let params = {
					...this.cjrlForm,
					tbsj: this.cjrlForm.tbsj ? getDate(new Date(this.cjrlForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addCjrlInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showCjrlModel = false
					this.getCjrlList()
				}
			},
			handleChangeElsePage(val) {
				this.elsePage.pageIndex = val
				this.getElseList()
			},
			handleChangeElsePageSize(val) {
				this.elsePage.pageSize = val
				this.getElseList()
			},
			async getElseList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.elsePage.pageSize,
					page: this.elsePage.pageIndex,
				}
				let { status_code, data } = await api.getElseList(params)
				if(status_code == 200) {
					this.elseData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.elsePage.totalRow = data.total
				}
			},
			openElseModel() {
				this.modeType = 1;
				this.showElseModel = true
			},
			editElseModel(row) {
				this.elseForm = {
					jyysyl: row.jyysyl ? Number(row.jyysyl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showElseModel = true
			},
			elseModelChange(status) {
				if(!status) {
					this.elseForm = {
						jyysyl: 0,
						tbsj: '',
					}
				}
			},
			async removeElse(row) {
				let { status_code } = await api.deleteElseInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getElseList()
			},
			async saveElse() {
				let params = {
					...this.elseForm,
					tbsj: this.elseForm.tbsj ? getDate(new Date(this.elseForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addElseInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showElseModel = false
					this.getElseList()
				}
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