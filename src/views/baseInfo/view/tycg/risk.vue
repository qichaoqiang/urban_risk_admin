<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="场馆容量" name="name1">
				        	<part-title text="场馆容量"></part-title>
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" label-position="left" inline>
				        		<FormItem label="场馆固定座位数" :label-width="118" style="margin-right: 24px">
						        	<InputNumber :min="0" v-model="baseInfo.cggdzws"></InputNumber>
						        </FormItem>
						        <FormItem label="设计最大容纳人数" :label-width="132" style="margin-right: 24px">
						        	<InputNumber :min="0" v-model="baseInfo.sjzdrnrs"></InputNumber>
						        </FormItem>
						    </Form>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="活动安排" name="name2">
				        	<part-title text="活动安排" :btns="['add']" @add="openHdapModel"></part-title>
							<Form :disabled="isDisEditInfo" :model="baseInfo" label-position="left">
				        		<FormItem label="可举办活动级别">
						        	<Select clearable multiple :transfer="true" v-model="baseInfo.kjbhdjb" placeholder="请选择">
						                <Option v-for="item in kjbhdjbList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
							</Form>
							<Table :columns="hdapColumns" :data="hdapData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editHdapModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeHdap(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="hdapPage.pageSize"
				                    :total="hdapPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeHdapPage"
				                    @on-page-size-change="handleChangeHdapPageSize"
				                />
							</Row>
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}营业状况`" v-model="showHdapModel" @on-visible-change="hdapModelChange">
			<div>
				<Form :model="hdapForm" label-position="left" :label-width="200">
			        <FormItem label="活动名称">
			        	<Input :min="0" v-model="hdapForm.hdmc"></Input>
			        </FormItem>
			        <FormItem label="活动级别">
			        	<Select clearable :transfer="true" v-model="hdapForm.hdjb" placeholder="请选择">
			                <Option v-for="item in kjbhdjbList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="参加人数">
			        	<InputNumber :min="0" v-model="hdapForm.cjrs"></InputNumber>
			        </FormItem>
			        <FormItem label="预计观看人数">
			        	<InputNumber :min="0" v-model="hdapForm.yjgkrs"></InputNumber>
			        </FormItem>
			        <FormItem label="举办时间">
			            <DatePicker type="date" v-model="hdapForm.jbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="hdapForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showHdapModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveHdap">保存</Button>
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
	            <!-- <Button type="text" size="large" @click="showHdapModel = false">取消</Button> -->
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
	            <!-- <Button type="text" size="large" @click="showHdapModel = false">取消</Button> -->
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
	            <!-- <Button type="text" size="large" @click="showHdapModel = false">取消</Button> -->
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
	            <!-- <Button type="text" size="large" @click="showHdapModel = false">取消</Button> -->
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
				showHdapModel: false,
				showGdtrqModel: false,
				showYhsyqModel: false,
				showCjrlModel: false,
				showElseModel: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					cggdzws: 0,
					sjzdrnrs: 0,
					kjbhdjb: []
				},
				kjbhdjbList: ['举办亚运会、奥运会及世界级比赛主场', '举办全国性和国际单项比赛', '举办地区性和全国单项比赛', '举办地方性、群众性运动会', '一般体育活动场馆'],
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
				hdapColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.hdapPage.pageIndex- 1) * this.hdapPage.pageSize + 1);
				        },
                    }, {
                        title: '活动名称',
                        key: 'hdmc',
                        minWidth: 100,
                    }, {
                        title: '活动级别',
                        key: 'hdjb',
                        minWidth: 200,
                    }, {
                        title: '参加人数',
                        key: 'cjrs',
                        minWidth: 80,
                    }, {
                        title: '预计观看人数',
                        key: 'yjgkrs',
                        minWidth: 120,
                    }, {
                        title: '举办时间',
                        key: 'jbsj',
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
				hdapData: [],
				hdapForm: {
					hdmc: '',
					hdjb: '',
					cjrs: 0,
					yjgkrs: 0,
					tbsj: '',
					jbsj: ''
				},
				hdapPage: {
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
				let hdapParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.hdapPage.pageSize,
					page: this.hdapPage.pageIndex,
				}
				Promise.all([api.getHdapList(hdapParams)]).then((result) => {
				  	let hdapRes = result[0]
				  	if(hdapRes.status_code == 200) {
				  		this.hdapData = hdapRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.hdapPage.totalRow = hdapRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getTycgBase(this.gkdx_id);
				if(status_code == 0) {
					console.log(data)
					this.baseInfo.cggdzws = data.cggdzws ? Number(data.cggdzws) : 0
					this.baseInfo.sjzdrnrs = data.sjzdrnrs ? Number(data.sjzdrnrs) : 0
					this.baseInfo.kjbhdjb = data.kjbhdjb ? data.kjbhdjb.split(',') : []
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
					cggdzws: this.baseInfo.cggdzws,
					sjzdrnrs: this.baseInfo.sjzdrnrs,
				}
				let { status_code, message } = await api.addTycgBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
				}
			},
			async saveInfo2() {
				let params = {
					gkdx_id: this.gkdx_id,
					kjbhdjb: this.baseInfo.kjbhdjb.join(','),
				}
				let { status_code, message } = await api.addTycgBase(params);
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
			async getHdapList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.hdapPage.pageIndex,
				}
				let { status_code, data } = await api.getHdapList(params)
				if(status_code == 200) {
					this.hdapList = data.data
				}
			},
			handleChangeHdapPage(val) {
				this.hdapPage.pageIndex = val
				this.getHdapList()
			},
			handleChangeHdapPageSize(val) {
				this.hdapPage.pageSize = val
				this.getHdapList()
			},
			async getHdapList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.hdapPage.pageSize,
					page: this.hdapPage.pageIndex,
				}
				let { status_code, data } = await api.getHdapList(params)
				if(status_code == 200) {
					this.hdapData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.hdapPage.totalRow = data.total
				}
			},
			openHdapModel() {
				this.modeType = 1;
				this.showHdapModel = true
			},
			editHdapModel(row) {
				this.hdapForm = {
					hdmc: row.hdmc,
					hdjb: row.hdjb,
					cjrs: row.cjrs ? Number(row.cjrs) : 0,
					yjgkrs: row.yjgkrs ? Number(row.yjgkrs) : 0,
					jbsj: row.jbsj ? new Date(row.jbsj) : '',
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showHdapModel = true
			},
			hdapModelChange(status) {
				if(!status) {
					this.hdapForm = {
						hdmc: '',
						hdjb: '',
						cjrs: 0,
						yjgkrs: 0,
						tbsj: '',
						jbsj: ''
					}
				}
			},
			async removeHdap(row) {
				let { status_code } = await api.deleteHdapInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getHdapList()
			},
			async saveHdap() {
				let params = {
					...this.hdapForm,
					tbsj: this.hdapForm.tbsj ? getDate(new Date(this.hdapForm.tbsj).getTime(), 'year') : '',
					jbsj: this.hdapForm.jbsj ? getDate(new Date(this.hdapForm.jbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addHdapInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showHdapModel = false
					this.getHdapList()
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