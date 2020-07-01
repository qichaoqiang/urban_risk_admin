<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="人员信息" name="name1">
				        	<part-title text="人员信息" ref="xxx" :btns="['add']" @add="openRyxxModel"></part-title>
							<Table :columns="ryxxColumns" :data="ryxxData">
								<template slot-scope="{ row }" slot="sfzdjg">
									<span>{{sfzgyyqList.find(item => item.value === row.sfzdjg).name}}</span>
								</template>
								<template slot-scope="{ row }" slot="sfbzp">
									<span>{{sfzgyyqList.find(item => item.value === row.sfbzp).name}}</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editRyxxModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRyxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="ryxxPage.pageSize"
				                    :total="ryxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeRyxxPage"
				                    @on-page-size-change="handleChangeRyxxPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="车辆信息" name="name2">
				        	<part-title text="车辆信息" :btns="['add']" @add="openClxxModel"></part-title>
				        	<div>车辆数量合计：{{clslhj}}</div>
							<Table :columns="clxxColumns" :data="clxxData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editClxxModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeClxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="clxxPage.pageSize"
				                    :total="clxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeClxxPage"
				                    @on-page-size-change="handleChangeClxxPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="运输信息" name="name3">
				        	<part-title text="运输信息" :btns="['add']" @add="openYsxxModel"></part-title>
				        	<Form :model="baseInfo" label-position="left" :label-width="160">
						        <FormItem label="年运输总量（万吨/年）">
						        	<InputNumber :min="0" v-model="baseInfo.nyszl"></InputNumber>
						        </FormItem>
						    </Form>
							<Table :columns="ysxxColumns" :data="ysxxData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editYsxxModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeYsxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :transfer="true"
				                    :page-size="ysxxPage.pageSize"
				                    :total="ysxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeYsxxPage"
				                    @on-page-size-change="handleChangeYsxxPageSize"
				                />
							</Row>
							<Row type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}人员信息`" v-model="showRyxxModel" @on-visible-change="ryxxModelChange">
			<div>
				<Form :model="ryxxForm" label-position="left" :label-width="140">
					<FormItem label="危险货物驾驶员数量">
						<InputNumber :min="0" v-model="ryxxForm.wxhwjsysl"></InputNumber>
			        </FormItem>
			        <FormItem label="危货押运员数量">
						<InputNumber :min="0" v-model="ryxxForm.whyyysl"></InputNumber>
			        </FormItem>
			        <FormItem label="装卸管理人员数量">
						<InputNumber :min="0" v-model="ryxxForm.zxglrysl"></InputNumber>
			        </FormItem>
			        <FormItem label="人员合计">
						<InputNumber :min="0" v-model="ryxxForm.ryhj"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			        	<DatePicker type="date" v-model="ryxxForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRyxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveRyxx">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}车辆信息`" v-model="showClxxModel" @on-visible-change="clxxModelChange">
			<div>
				<Form :model="clxxForm" label-position="left" :label-width="160">
					<FormItem label="车牌号">
			        	<Input clearable v-model="clxxForm.cph"></Input>
			        </FormItem>
					<FormItem label="车辆类型">
			        	<Select clearable v-model="clxxForm.cllx" placeholder="请选择">
			                <Option v-for="item in cllxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
					<FormItem label="车辆级别">
			        	<Select clearable v-model="clxxForm.cljb" placeholder="请选择">
			                <Option v-for="item in cljbList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
					<FormItem label="车辆技术等级">
			        	<Select clearable v-model="clxxForm.cljsdj" placeholder="请选择">
			                <Option v-for="item in cljsdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="车辆额定载重量（吨）">
			        	<InputNumber :min="0" v-model="clxxForm.cledzzl"></InputNumber>
			        </FormItem>
			        <FormItem label="车辆投用时间">
			        	<DatePicker type="date" v-model="clxxForm.tysj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="填报时间">
			        	<DatePicker type="date" v-model="clxxForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRyxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveClxx">保存</Button>
	        </div>
		</Modal>

		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}运输信息`" v-model="showYsxxModel" @on-visible-change="ysxxModelChange">
			<div>
				<Form :model="ysxxForm" label-position="left" :label-width="160">
					<FormItem label="运输危险物品名称">
			        	<Input clearable v-model="ysxxForm.yswxwpmc"></Input>
			        </FormItem>
			        <FormItem label="危险货物种类">
			        	<Input clearable v-model="ysxxForm.wxhwzl"></Input>
			        </FormItem>
			        <FormItem label="包装形式/规格">
			        	<Input clearable v-model="ysxxForm.bzxsgg"></Input>
			        </FormItem>
			        <FormItem label="近1月主要物品">
			        	<Input clearable v-model="ysxxForm.jyzywp"></Input>
			        </FormItem>
			        <FormItem label="近1月日均运输量（吨）">
			        	<InputNumber :min="0" v-model="ysxxForm.jyrjysl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="ysxxForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showRyxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveYsxx">保存</Button>
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
				clxx_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showRyxxModel: false,
				showClxxModel: false,
				showCcssModel: false,
				showZaqModel: false,
				showGqscModel: false,
				showYsxxModel: false,
				showRimModel: false,
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
				ryxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.ryxxPage.pageIndex- 1) * this.ryxxPage.pageSize + 1);
				        }
                    }, {
                        title: '危险货物驾驶员数量',
                        key: 'wxhwjsysl',
                        minWidth: 180
                    }, {
                        title: '危货押运员数量',
                        key: 'whyyysl',
                        minWidth: 140
                    }, {
                        title: '装卸管理人员数量',
                        key: 'zxglrysl',
                        minWidth: 160
                    }, {
                        title: '人员合计',
                        key: 'ryhj',
                        minWidth: 100
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				ryxxData: [],
				ryxxForm: {
					wxhwjsysl: 0,
					whyyysl: 0,
					zxglrysl: 0,
					ryhj: 0,
					tbsj: '',
				},
				ryxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				sxflList: ['最终产品', '中间产品', '原料'],
				dqztList: ['运行', '停运', '检修'],
				clxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.clxxPage.pageIndex- 1) * this.clxxPage.pageSize + 1);
				        }
                    }, {
                        title: '车牌号',
                        key: 'cph',
                        minWidth: 100
                    }, {
                        title: '车辆类型',
                        key: 'cllx',
                        minWidth: 100
                    }, {
                        title: '车辆级别',
                        key: 'cljb',
                        minWidth: 100
                    }, {
                        title: '车辆技术等级',
                        key: 'cljsdj',
                        minWidth: 120
                    }, {
                        title: '车辆额定载重量（吨）',
                        key: 'cledzzl',
                        minWidth: 180
                    }, {
                        title: '车辆投用时间',
                        key: 'tysj',
                        minWidth: 120
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				clxxData: [],
				clxxForm: {
					cph: '',
					cllx: '',
					cljb: '',
					cljsdj: '',
					cledzzl: 0,
					tysj: '',
					tbsj: '',
				},
				cllxList: ['厢式货车', '罐式货车', '气瓶运输车', '仓栅式货车', '其他'],
				cljbList: ['重型', '中型', '轻型'],
				cljsdjList: ['一级', '二级', '三级'],
				zdwxyList: ['否', '一级', '二级', '三级', '四级'],
				ksldzzList: [
					{
						value: 0,
						name: '无'
					}, {
						value: 1,
						name: '有'
					}
				],
				rarsList: ['采用', '不采用'],
				clxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				clslhj: 0,
				ysxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.ysxxPage.pageIndex- 1) * this.ysxxPage.pageSize + 1);
				        }
                    }, {
                        title: '近1月主要物品',
                        key: 'jyzywp',
                        minWidth: 140
                    }, {
                        title: '近1月日均运输量（吨）',
                        key: 'jyrjysl',
                        minWidth: 160
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				ysxxData: [],
				ysxxForm: {
					yswxwpmc: '',
					wxhwzl: '',
					bzxsgg: '',
					jyzywp: '',
					jyrjysl: 0,
					tbsj: ''
				},
				csfbxList: ['封闭式', '半封闭式', '开放式（露天）'],
				ptfsList: ['高压喷涂', '静电喷涂', '中等压力喷涂', '浸涂、淋涂、滚涂', '其它'],
				zdhcdList: ['人工', '自动'],
				tlzlList: ['水性', '油性', '塑粉'],
				ysxxPage: {
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
				let ryxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ryxxPage.pageSize,
					page: this.ryxxPage.pageIndex,
				}
				let clxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.clxxPage.pageSize,
					page: this.clxxPage.pageIndex,
				}
				let ysxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ysxxPage.pageSize,
					page: this.ysxxPage.pageIndex,
				}
				Promise.all([api.getRyxxList(ryxxParams), api.getClxxList(clxxParams), api.getYsxxList(ysxxParams)]).then((result) => {
				  	let ryxxRes = result[0], clxxRes = result[1], ysxxRes = result[2], rimRes = result[3]
				  	if(ryxxRes.status_code == 200) {
				  		this.ryxxData = ryxxRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.ryxxPage.totalRow = ryxxRes.data.total
				  	}
				  	if(clxxRes.status_code == 200) {
				  		this.clxxData = clxxRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.clslhj = clxxRes.clslhj || 0
				  		this.clxxPage.totalRow = clxxRes.data.total
				  	}
				  	if(ysxxRes.status_code == 200) {
				  		this.ysxxData = ysxxRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.ysxxPage.totalRow = ysxxRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getWxhwysBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { nyszl: data.nyszl ? Number(data.nyszl) : 0}
				}
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
					nyszl: this.baseInfo.nyszl
				}
				let { status_code, message } = await api.addWxhwysBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
				}
			},
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new T.Geolocation();
		            lo.getCurrentPosition((e) => {
						this.map = new T.Map('area_box');
						this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
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
			handleChangeRyxxPage(val) {
				this.ryxxPage.pageIndex = val
				this.getRyxxList()
			},
			handleChangeRyxxPageSize(val) {
				this.ryxxPage.pageSize = val
				this.getRyxxList()
			},
			async getRyxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ryxxPage.pageSize,
					page: this.ryxxPage.pageIndex,
				}
				let { status_code, data } = await api.getRyxxList(params)
				if(status_code == 200) {
					this.ryxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.ryxxPage.totalRow = data.total
				}
			},
			openRyxxModel() {
				this.modeType = 1;
				this.showRyxxModel = true
			},
			editRyxxModel(row) {
				this.ryxxForm = {
					wxhwjsysl: row.wxhwjsysl ? Number(row.wxhwjsysl) : 0,
					whyyysl: row.whyyysl ? Number(row.whyyysl) : 0,
					zxglrysl: row.zxglrysl ? Number(row.zxglrysl) : 0,
					ryhj: row.ryhj ? Number(row.ryhj) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showRyxxModel = true
			},
			ryxxModelChange(status) {
				if(!status) {
					this.ryxxForm = {
						wxhwjsysl: 0,
						whyyysl: 0,
						zxglrysl: 0,
						ryhj: 0,
						tbsj: '',
					}
				}
			},
			async removeRyxx(row) {
				let { status_code } = await api.deleteRyxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getRyxxList()
			},
			async saveRyxx() {
				let params = {
					...this.ryxxForm,
					tbsj: this.ryxxForm.tbsj ? getDate(new Date(this.ryxxForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addRyxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showRyxxModel = false
					this.getRyxxList()
				}
			},
			handleChangeClxxPage(val) {
				this.clxxPage.pageIndex = val
				this.getClxxList()
			},
			handleChangeClxxPageSize(val) {
				this.clxxPage.pageSize = val
				this.getClxxList()
			},
			async getClxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.clxxPage.pageSize,
					page: this.clxxPage.pageIndex,
				}
				let res = await api.getClxxList(params)
				let { status_code, data } = res
				if(status_code == 200) {
					this.clxxData = data.data
					this.clslhj = res.clslhj || 0
					this.clxxPage.totalRow = data.total
				}
			},
			async openClxxModel() {
				this.modeType = 1;
				this.showClxxModel = true
			},
			async editClxxModel(row) {
				this.clxxForm = {
					cph: row.cph,
					cllx: row.cllx,
					cljb: row.cljb,
					cljsdj: row.cljsdj,
					cledzzl: row.cledzzl ? Number(row.cledzzl) : 0,
					tysj: row.tysj ? new Date(row.tysj) : '',
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showClxxModel = true
			},
			clxxModelChange(status) {
				if(!status) {
					this.clxxForm = {
						cph: '',
						cllx: '',
						cljb: '',
						cljsdj: '',
						cledzzl: 0,
						tysj: '',
						tbsj: '',
					}
				}
			},
			async removeClxx(row) {
				let { status_code } = await api.deleteClxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getClxxList()
			},
			async saveClxx() {
				let params = {
					...this.clxxForm,
					tysj: this.clxxForm.tysj ? getDate(new Date(this.clxxForm.tysj).getTime(), 'year') : '',
					tbsj: this.clxxForm.tbsj ? getDate(new Date(this.clxxForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				delete params.isWxgy
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addClxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showClxxModel = false
					this.getClxxList()
				}
			},
			handleChangeYsxxPage(val) {
				this.ysxxPage.pageIndex = val
				this.getYsxxList()
			},
			handleChangeYsxxPageSize(val) {
				this.ysxxPage.pageSize = val
				this.getYsxxList()
			},
			async getYsxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ysxxPage.pageSize,
					page: this.ysxxPage.pageIndex,
				}
				let { status_code, data } = await api.getYsxxList(params)
				if(status_code == 200) {
					this.ysxxData = data.data
					this.ysxxPage.totalRow = data.total
				}
			},
			openYsxxModel() {
				this.modeType = 1;
				this.showYsxxModel = true
			},
			editYsxxModel(row) {
				this.ysxxForm = {
					yswxwpmc: row.yswxwpmc,
					wxhwzl: row.wxhwzl,
					bzxsgg: row.bzxsgg,
					jyzywp: row.jyzywp,
					jyrjysl: row.jyrjysl ? Number(row.jyrjysl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showYsxxModel = true
			},
			ysxxModelChange(status) {
				if(!status) {
					this.ysxxForm = {
						yswxwpmc: '',
						wxhwzl: '',
						bzxsgg: '',
						jyzywp: '',
						jyrjysl: 0,
						tbsj: ''
					}
				}
			},
			async removeYsxx(row) {
				let { status_code } = await api.deleteYsxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getYsxxList()
			},
			async saveYsxx() {
				let params = {
					...this.ysxxForm,
					tbsj: this.ysxxForm.tbsj ? getDate(new Date(this.ysxxForm.tbsj).getTime(), 'year') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addYsxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showYsxxModel = false
					this.getYsxxList()
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
					this.rimData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.rimPage.totalRow = data.total
				}
			},
			openRimModel() {
				this.modeType = 1;
				this.showRimModel = true
			},
			editRimModel(row) {
				this.rimForm = {
					mgmbmc: row.mgmbmc,
					mgmblx: row.mgmblx,
					fw: row.fw,
					mgmbjl: row.mgmbjl - 0,
					rysl: row.rysl,
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(6)} ${(row.wd - 0).toFixed(6)}` : '',
					qyfw: row.qyfw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showRimModel = true
			},
			rimModelChange(status) {
				if(!status) {
					this.rimForm = {
						mgmbmc: '',
						mgmblx: '',
						fw: '',
						mgmbjl: 0,
						rysl: 0,
						lngAndLat: '',
						qyfw: ''
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
					jd: this.rimForm.lngAndLat.split(' ')[0],
					wd: this.rimForm.lngAndLat.split(' ')[1],
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
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
			this.getBaseInfo()
		},
		mounted() {
			this.$refs.xxx.onLoad();
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