<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="库容信息" name="name1">
						    <part-title text="库容信息" :btns="['add']" @add="openKrxxModel"></part-title>
							<Table :columns="krxxColumns" :data="krxxData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editKrxxModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeKrxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="krxxPage.pageSize"
				                    :total="krxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeKrxxPage"
				                    @on-page-size-change="handleChangeKrxxPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="安全鉴定" name="name2">
				        	<part-title text="安全鉴定" :btns="['add']" @add="openAqjdModel"></part-title>
							<Table :columns="aqjdColumns" :data="aqjdData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editAqjdModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeAqjd(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="aqjdPage.pageSize"
				                    :total="aqjdPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeAqjdPage"
				                    @on-page-size-change="handleChangeAqjdPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="下游信息" name="name3">
				        	<part-title text="下游信息" :btns="['add']" @add="openXyxxModel"></part-title>
							<Table :columns="xyxxColumns" :data="xyxxData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editXyxxModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeXyxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="xyxxPage.pageSize"
				                    :total="xyxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeXyxxPage"
				                    @on-page-size-change="handleChangeXyxxPageSize"
				                />
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}库容信息`" v-model="showKrxxModel" @on-visible-change="krxxModelChange">
			<div>
				<Form :model="krxxForm" label-position="left" :label-width="140">
					<FormItem label="当前库容（万立方）">
			        	<InputNumber :min="0" v-model="krxxForm.dqkr"></InputNumber>
			        </FormItem>	<FormItem label="填报时间">
			            <DatePicker type="date" v-model="krxxForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showKrxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveKrxx">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}安全鉴定`" v-model="showAqjdModel"  @on-visible-change="aqjdModelChange">
			<div>
				<Form :model="aqjdForm" label-position="left" :label-width="140">
					<FormItem label="安全鉴定时间">
			        	<DatePicker type="date" v-model="aqjdForm.aqjdsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="鉴定单位">
			        	<Input clearable v-model="aqjdForm.jddw"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveAqjd">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}下游信息`" v-model="showXyxxModel"  @on-visible-change="xyxxModelChange">
			<div>
				<Form :model="xyxxForm" label-position="left" :label-width="140">
					<FormItem label="居住点名称">
			        	<Input clearable v-model="xyxxForm.jzdmc"></Input>
			        </FormItem>
			        <FormItem label="人数">
			        	<InputNumber :min="0" v-model="xyxxForm.rs"></InputNumber>
			        </FormItem>
			        <FormItem label="距离(m)">
			        	<InputNumber :min="0" v-model="xyxxForm.jl"></InputNumber>
			        </FormItem>	
			        <FormItem label="经纬度">
			        	<lng :lngAndLat.sync="xyxxForm.lngAndLat"></lng>
			        </FormItem>
			        <FormItem label="区域范围">
			        	<qyfw :qyfw.sync="xyxxForm.qyfw"></qyfw>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveXyxx">保存</Button>
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
				showKrxxModel: false,
				showAqjdModel: false,
				showXyxxModel: false,
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
				krxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.krxxPage.pageIndex- 1) * this.krxxPage.pageSize + 1);
				        },
                    }, {
                        title: '当前库容（万立方）',
                        key: 'dqkr',
                        minWidth: 140,
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
				krxxData: [],
				krxxForm: {
					dqkr: 0,
					tbsj: '',
				},
				krxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				aqjdColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.aqjdPage.pageIndex- 1) * this.aqjdPage.pageSize + 1);
				        }
                    }, {
                        title: '安全鉴定时间',
                        key: 'aqjdsj',
                        minWidth: 120
                    }, {
                        title: '鉴定单位',
                        key: 'jddw',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				aqjdData: [],
				aqjdForm: {
					aqjdsj: '',
					jddw: '',
				},
				aqjdPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				xyxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.xyxxPage.pageIndex- 1) * this.xyxxPage.pageSize + 1);
				        }
                    }, {
                        title: '居住点名称',
                        key: 'jzdmc',
                        minWidth: 110
                    }, {
                        title: '人数',
                        key: 'rs',
                        minWidth: 80
                    }, {
                        title: '距离（m）',
                        key: 'jl',
                        minWidth: 110
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				xyxxData: [],
				xyxxForm: {
					jzdmc: '',
					rs: 0,
					jl: 0,
					lngAndLat: '',
					qyfw: ''
				},
				xyxxPage: {
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
				let krxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.krxxPage.pageSize,
					page: this.krxxPage.pageIndex,
				}
				let aqjdParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.aqjdPage.pageSize,
					page: this.aqjdPage.pageIndex,
				}
				let xyxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.xyxxPage.pageSize,
					page: this.xyxxPage.pageIndex,
				}
				Promise.all([api.getKrxxList(krxxParams), api.getAqjdList(aqjdParams), api.getXyxxList(xyxxParams)]).then((result) => {
				  	let krxxRes = result[0], aqjdRes = result[1], xyxxRes = result[2]
				  	if(krxxRes.status_code == 200) {
				  		this.krxxData = krxxRes.data.data
				  		this.krxxPage.totalRow = krxxRes.data.total
				  	}
				  	if(aqjdRes.status_code == 200) {
				  		this.aqjdData = aqjdRes.data.data
				  		this.aqjdPage.totalRow = aqjdRes.data.total
				  	}
				  	if(xyxxRes.status_code == 200) {
				  		this.xyxxData = xyxxRes.data.data
				  		this.xyxxPage.totalRow = xyxxRes.data.total
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
					sjdcgd: this.baseInfo.sjdcgd,
					sjdctfl: this.baseInfo.sjdctfl,
				}
				let { status_code, message } = await api.addSkdbBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
				}
			},
			async saveInfo2() {
				let params = {
					gkdx_id: this.gkdx_id,
					fjs: this.baseInfo.fjs,
				}
				let { status_code, message } = await api.addSkdbBase(params);
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
			async getKrxxList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.krxxPage.pageIndex,
				}
				let { status_code, data } = await api.getKrxxList(params)
				if(status_code == 200) {
					this.krxxList = data.data
				}
			},
			handleChangeKrxxPage(val) {
				this.krxxPage.pageIndex = val
				this.getKrxxList()
			},
			handleChangeKrxxPageSize(val) {
				this.krxxPage.pageSize = val
				this.getKrxxList()
			},
			async getKrxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.krxxPage.pageSize,
					page: this.krxxPage.pageIndex,
				}
				let { status_code, data } = await api.getKrxxList(params)
				if(status_code == 200) {
					this.krxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.krxxPage.totalRow = data.total
				}
			},
			openKrxxModel() {
				this.modeType = 1;
				this.showKrxxModel = true
			},
			editKrxxModel(row) {
				this.krxxForm = {
					dqkr: row.dqkr ? Number(row.dqkr) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showKrxxModel = true
			},
			krxxModelChange(status) {
				if(!status) {
					this.krxxForm = {
						dqkr: 0,
						tbsj: '',
					}
				}
			},
			async removeKrxx(row) {
				let { status_code } = await api.deleteKrxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getKrxxList()
			},
			async saveKrxx() {
				let params = {
					...this.krxxForm,
					tbsj: this.krxxForm.tbsj ? getDate(new Date(this.krxxForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addKrxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showKrxxModel = false
					this.getKrxxList()
				}
			},
			handleChangeAqjdPage(val) {
				this.aqjdPage.pageIndex = val
				this.getAqjdList()
			},
			handleChangeAqjdPageSize(val) {
				this.aqjdPage.pageSize = val
				this.getAqjdList()
			},
			async getAqjdList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.aqjdPage.pageSize,
					page: this.aqjdPage.pageIndex,
				}
				let { status_code, data } = await api.getAqjdList(params)
				if(status_code == 200) {
					this.aqjdData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.aqjdPage.totalRow = data.total
				}
			},
			openAqjdModel() {
				this.modeType = 1;
				this.showAqjdModel = true
			},
			editAqjdModel(row) {
				this.aqjdForm = {
					aqjdsj: row.aqjdsj ? new Date(row.aqjdsj) : '',
					jddw: row.jddw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showAqjdModel = true
			},
			aqjdModelChange(status) {
				if(!status) {
					this.aqjdForm = {
						aqjdsj: '',
						jddw: '',
					}
				}
			},
			async removeAqjd(row) {
				let { status_code } = await api.deleteAqjdInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getAqjdList()
			},
			async saveAqjd() {
				let params = {
					...this.aqjdForm,
					aqjdsj: this.aqjdForm.aqjdsj ? getDate(new Date(this.aqjdForm.aqjdsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addAqjdInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showAqjdModel = false
					this.getAqjdList()
				}
			},
			handleChangeXyxxPage(val) {
				this.xyxxPage.pageIndex = val
				this.getXyxxList()
			},
			handleChangeXyxxPageSize(val) {
				this.xyxxPage.pageSize = val
				this.getXyxxList()
			},
			async getXyxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.xyxxPage.pageSize,
					page: this.xyxxPage.pageIndex,
				}
				let { status_code, data } = await api.getXyxxList(params)
				if(status_code == 200) {
					this.xyxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.xyxxPage.totalRow = data.total
				}
			},
			openXyxxModel() {
				this.modeType = 1;
				this.showXyxxModel = true
			},
			editXyxxModel(row) {
				this.xyxxForm = {
					jzdmc: row.jzdmc,
					rs: row.rs ? Number(row.rs) : 0,
					jl: row.jl ? Number(row.jl) : 0,
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
					qyfw: row.qyfw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showXyxxModel = true
			},
			xyxxModelChange(status) {
				if(!status) {
					this.xyxxForm = {
						jzdmc: '',
						rs: 0,
						jl: 0,
						lngAndLat: '',
						qyfw: ''
					}
				}
			},
			async removeXyxx(row) {
				let { status_code } = await api.deleteXyxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getXyxxList()
			},
			async saveXyxx() {
				let params = {
					...this.xyxxForm,
					jd: this.xyxxForm.lngAndLat.split(' ')[0],
					wd: this.xyxxForm.lngAndLat.split(' ')[1],
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addXyxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showXyxxModel = false
					this.getXyxxList()
				}
			},
		},
		created() {
			this.getBaseInfo()
      if(this.isDisEditInfo) {
        this.krxxColumns.pop()
        this.aqjdColumns.pop()
        this.xyxxColumns.pop()
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