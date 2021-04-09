<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="地铁运行站点信息" name="name1">
						    <part-title text="地铁运行站点信息" :btns="['add']" @add="openDtyxzdxxModel"></part-title>
							<Table :columns="dtyxzdxxColumns" :data="dtyxzdxxData">
								<template slot-scope="{ row }" slot="sfhc">
						            <span>{{row.sfhc == 1 ? '是' : '否'}}</span>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editDtyxzdxxModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeDtyxzdxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="dtyxzdxxPage.pageSize"
				                    :total="dtyxzdxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeDtyxzdxxPage"
				                    @on-page-size-change="handleChangeDtyxzdxxPageSize"
				                />
							</Row>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="地铁运行线路信息" name="name2">
				        	<part-title text="地铁运行线路信息" :btns="['add']" @add="openDtyxxlxxModel"></part-title>
							<Table :columns="dtyxxlxxColumns" :data="dtyxxlxxData">
								<template slot-scope="{ row }" slot="sfczcy">
						            <span>{{row.sfczcy == 1 ? '是' : '否'}}</span>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editDtyxxlxxModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeDtyxxlxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="dtyxxlxxPage.pageSize"
				                    :total="dtyxxlxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeDtyxxlxxPage"
				                    @on-page-size-change="handleChangeDtyxxlxxPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="地铁运行组织" name="name3">
				        	<part-title text="地铁运行组织" :btns="['add']" @add="openDtyxzzModel"></part-title>
							<Table :columns="dtyxzzColumns" :data="dtyxzzData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editDtyxzzModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeDtyxzz(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="dtyxzzPage.pageSize"
				                    :total="dtyxzzPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeDtyxzzPage"
				                    @on-page-size-change="handleChangeDtyxzzPageSize"
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}地铁运行站点信息`" v-model="showDtyxzdxxModel" @on-visible-change="dtyxzdxxModelChange">
			<div style="max-height: 600px; overflow-y: scroll;">
				<Form :model="dtyxzdxxForm" label-position="left" :label-width="210">
					<FormItem label="车站名称">
			        	<Input clearable v-model="dtyxzdxxForm.czmc"></Input>
			        </FormItem>
			        <FormItem label="地址">
			        	<Input clearable v-model="dtyxzdxxForm.dz"></Input>
			        </FormItem>	
			        <FormItem label="经纬度">
			        	<lng :lngAndLat.sync="dtyxzdxxForm.lngAndLat"></lng>
			        </FormItem>	
			        <FormItem label="是否换乘" prop="sfhc">
			            <Select clearable v-model="dtyxzdxxForm.sfhc" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="换乘线路">
			        	<Input v-model="dtyxzdxxForm.hcxl"></Input>
			        </FormItem>	
			        <FormItem label="站点类型">
			        	<Input v-model="dtyxzdxxForm.zdlx"></Input>
			        </FormItem>	
			        <FormItem label="出入口数量">
			        	<InputNumber :min="0" v-model="dtyxzdxxForm.crksl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showDtyxzdxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveDtyxzdxx">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}地铁运行线路信息`" v-model="showDtyxxlxxModel"  @on-visible-change="dtyxxlxxModelChange">
			<div style="max-height: 600px; overflow-y: scroll;">
				<Form :model="dtyxxlxxForm" label-position="left" :label-width="140">
					<FormItem label="区间">
			        	<Input clearable v-model="dtyxxlxxForm.qj"></Input>
			        </FormItem>
			        <FormItem label="双线长度（m）">
			        	<InputNumber :min="0" v-model="dtyxxlxxForm.sxcd"></InputNumber>
			        </FormItem>
			        <FormItem label="轨道类型">
			        	<Input v-model="dtyxxlxxForm.gdlx"></Input>
			        </FormItem>	
			        <FormItem label="高度（m）">
			        	<InputNumber :min="0" v-model="dtyxxlxxForm.gd"></InputNumber>
			        </FormItem>
			        <FormItem label="埋深（m）">
			        	<InputNumber :min="0" v-model="dtyxxlxxForm.ms"></InputNumber>
			        </FormItem>
			       	<FormItem label="是否存在穿越" prop="sfczcy">
			            <Select :transfer="true" clearable v-model="dtyxxlxxForm.sfczcy" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="穿越内容" v-show="dtyxxlxxForm.sfczcy === 1">
			        	<Input v-model="dtyxxlxxForm.cynr"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveDtyxxlxx">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}地铁运行组织`" v-model="showDtyxzzModel"  @on-visible-change="dtyxzzModelChange">
			<div style="max-height: 600px; overflow-y: scroll;">
				<Form :model="dtyxzzForm" label-position="left" :label-width="180">
			        <FormItem label="负荷强度">
			        	<InputNumber :min="0" v-model="dtyxzzForm.fhqd"></InputNumber>
			        </FormItem>
			        <FormItem label="高峰小时最大断面客流量">
			        	<InputNumber :min="0" v-model="dtyxzzForm.gfxszddmkll"></InputNumber>
			        </FormItem>
			        <FormItem label="线路列车正点率（%）">
			        	<InputNumber :min="0" v-model="dtyxzzForm.xllczdl"></InputNumber>
			        </FormItem>
			        <FormItem label="列车服务可靠度">
			        	<InputNumber :min="0" v-model="dtyxzzForm.lcfwkkd"></InputNumber>
			        </FormItem>
			        <FormItem label="高峰时段行车间隔">
			        	<InputNumber :min="0" v-model="dtyxzzForm.gfsdxcjg"></InputNumber>
			        </FormItem>
			        <FormItem label="线路平均满载率（%）">
			        	<InputNumber :min="0" v-model="dtyxzzForm.xlpjmzl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveDtyxzz">保存</Button>
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
				showDtyxzdxxModel: false,
				showDtyxxlxxModel: false,
				showDtyxzzModel: false,
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
				dtyxzdxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.dtyxzdxxPage.pageIndex- 1) * this.dtyxzdxxPage.pageSize + 1);
				        },
                    }, {
                        title: '车站名称',
                        key: 'czmc',
                        minWidth: 100,
                    }, {
                        title: '地址',
                        key: 'dz',
                        minWidth: 100,
                    }, {
                        title: '是否换乘',
                        key: 'sfhc',
                        minWidth: 100,
                        slot: 'sfhc',
                    }, {
                        title: '站点类型',
                        key: 'zdlx',
                        minWidth: 140,
                    }, {
                        title: '出入口数量',
                        key: 'crksl',
                        minWidth: 100,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				dtyxzdxxData: [],
				dtyxzdxxForm: {
					czmc: '',
					dz: '',
					lngAndLat: '',
					sfhc: 0,
					hcxl: '',
					zdlx: '',
					crksl: 0,
				},
				dtyxzdxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				dtyxxlxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.dtyxxlxxPage.pageIndex- 1) * this.dtyxxlxxPage.pageSize + 1);
				        }
                    }, {
                        title: '区间',
                        key: 'qj',
                        minWidth: 100,
                    }, {
                        title: '双线长度（m）',
                        key: 'sxcd',
                        minWidth: 100,
                    }, {
                        title: '轨道类型',
                        key: 'gdlx',
                        minWidth: 100,
                    }, {
                        title: '高度（m）',
                        key: 'gd',
                        minWidth: 150,
                    }, {
                        title: '埋深（m）',
                        key: 'ms',
                        minWidth: 150,
                    }, {
                        title: '是否存在穿越',
                        key: 'sfczcy',
                        minWidth: 150,
                        slot: 'sfczcy'
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				dtyxxlxxData: [],
				dtyxxlxxForm: {
					qj: '',
					sxcd: 0,
					gdlx: '',
					gd: 0,
					ms: 0,
					sfczcy: 0,
					cynr: '',
				},
				dtyxxlxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				fwList: ['东', '南', '西', '北', '东北', '东南', '西北', '西南'],
				mgmblxList: ['医院', '养老院', '学校', '政府机构', '商场', '居住区', '监狱', '宗教', '车站', '码头', '铁路', '公路', '林区', '工厂', '矿山', '河流', '其他'],
				dtyxzzColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.dtyxzzPage.pageIndex- 1) * this.dtyxzzPage.pageSize + 1);
				        }
                    }, {
                        title: '负荷强度',
                        key: 'fhqd',
                        minWidth: 100,
                    }, {
                        title: '高峰小时最大断面客流量',
                        key: 'gfxszddmkll',
                        minWidth: 200,
                    }, {
                        title: '线路列车正点率（%）',
                        key: 'xllczdl',
                        minWidth: 280,
                    }, {
                        title: '列车服务可靠度',
                        key: 'lcfwkkd',
                        minWidth: 150,
                    }, {
                        title: '高峰时段行车间隔',
                        key: 'gfsdxcjg',
                        minWidth: 150,
                    }, {
                        title: '线路平均满载率（%）',
                        key: 'xlpjmzl',
                        minWidth: 180,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				dtyxzzData: [],
				dtyxzzForm: {
					fhqd: 0,
					gfxszddmkll: 0,
					xllczdl: 0,
					lcfwkkd: 0,
					gfsdxcjg: 0,
					xlpjmzl: 0,
				},
				dtyxzzPage: {
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
				let dtyxzdxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtyxzdxxPage.pageSize,
					page: this.dtyxzdxxPage.pageIndex,
				}
				let dtyxxlxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtyxxlxxPage.pageSize,
					page: this.dtyxxlxxPage.pageIndex,
				}
				let dtyxzzParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtyxzzPage.pageSize,
					page: this.dtyxzzPage.pageIndex,
				}
				Promise.all([api.getDtyxzdxxList(dtyxzdxxParams), api.getDtyxxlxxList(dtyxxlxxParams), api.getDtyxzzList(dtyxzzParams)]).then((result) => {
				  	let dtyxzdxxRes = result[0], dtyxxlxxRes = result[1], dtyxzzRes = result[2]
				  	if(dtyxzdxxRes.status_code == 200) {
				  		this.dtyxzdxxData = dtyxzdxxRes.data.data
				  		this.dtyxzdxxPage.totalRow = dtyxzdxxRes.data.total
				  	}
				  	if(dtyxxlxxRes.status_code == 200) {
				  		this.dtyxxlxxData = dtyxxlxxRes.data.data
				  		this.dtyxxlxxPage.totalRow = dtyxxlxxRes.data.total
				  	}
				  	if(dtyxzzzRes.status_code == 200) {
				  		this.dtyxzzzData = dtyxzzzRes.data.data
				  		this.dtyxzzzPage.totalRow = dtyxzzzRes.data.total
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
				let { status_code, message } = await api.addZtxncBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
				}
			},
			async saveInfo2() {
				let params = {
					gkdx_id: this.gkdx_id,
					fjs: this.baseInfo.fjs,
				}
				let { status_code, message } = await api.addZtxncBase(params);
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
			async getDtyxzdxxList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.dtyxzdxxPage.pageIndex,
				}
				let { status_code, data } = await api.getDtyxzdxxList(params)
				if(status_code == 200) {
					this.dtyxzdxxList = data.data
				}
			},
			handleChangeDtyxzdxxPage(val) {
				this.dtyxzdxxPage.pageIndex = val
				this.getDtyxzdxxList()
			},
			handleChangeDtyxzdxxPageSize(val) {
				this.dtyxzdxxPage.pageSize = val
				this.getDtyxzdxxList()
			},
			async getDtyxzdxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtyxzdxxPage.pageSize,
					page: this.dtyxzdxxPage.pageIndex,
				}
				let { status_code, data } = await api.getDtyxzdxxList(params)
				if(status_code == 200) {
					this.dtyxzdxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.dtyxzdxxPage.totalRow = data.total
				}
			},
			openDtyxzdxxModel() {
				this.modeType = 1;
				this.showDtyxzdxxModel = true
			},
			editDtyxzdxxModel(row) {
				this.dtyxzdxxForm = {
					czmc: row.czmc,
					dz: row.dz,
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
					sfhc: row.sfhc ? Number(row.sfhc) : 0,
					hcxl: row.hcxl,
					zdlx: row.zdlx,
					crksl: row.crksl ? Number(row.crksl) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showDtyxzdxxModel = true
			},
			dtyxzdxxModelChange(status) {
				if(!status) {
					this.dtyxzdxxForm = {
						czmc: '',
						dz: '',
						lngAndLat: '',
						sfhc: 0,
						hcxl: '',
						zdlx: '',
						crksl: 0,
					}
				}
			},
			async removeDtyxzdxx(row) {
				let { status_code } = await api.deleteDtyxzdxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getDtyxzdxxList()
			},
			async saveDtyxzdxx() {
				let params = {
					...this.dtyxzdxxForm,
					jd: this.dtyxzdxxForm.lngAndLat.split(' ')[0],
					wd: this.dtyxzdxxForm.lngAndLat.split(' ')[1],
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addDtyxzdxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showDtyxzdxxModel = false
					this.getDtyxzdxxList()
				}
			},	
			handleChangeDtyxxlxxPage(val) {
				this.dtyxxlxxPage.pageIndex = val
				this.getDtyxxlxxList()
			},
			handleChangeDtyxxlxxPageSize(val) {
				this.dtyxxlxxPage.pageSize = val
				this.getDtyxxlxxList()
			},
			async getDtyxxlxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtyxxlxxPage.pageSize,
					page: this.dtyxxlxxPage.pageIndex,
				}
				let { status_code, data } = await api.getDtyxxlxxList(params)
				if(status_code == 200) {
					this.dtyxxlxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.dtyxxlxxPage.totalRow = data.total
				}
			},
			openDtyxxlxxModel() {
				this.modeType = 1;
				this.showDtyxxlxxModel = true
			},
			editDtyxxlxxModel(row) {
				this.dtyxxlxxForm = {
					qj: row.qj,
					sxcd: row.sxcd ? Number(row.sxcd) : 0,
					gdlx: row.gdlx,
					gd: row.gd ? Number(row.gd) : 0,
					ms: row.ms ? Number(row.ms) : 0,
					sfczcy: row.sfczcy ? Number(row.sfczcy) : 0,
					cynr: row.cynr
				}
				this.id = row.id
				this.modeType = 2;
				this.showDtyxxlxxModel = true
			},
			dtyxxlxxModelChange(status) {
				if(!status) {
					this.dtyxxlxxForm = {
						qj: '',
						sxcd: 0,
						gdlx: '',
						gd: 0,
						ms: 0,
						sfczcy: 0,
						cynr: '',
					}
				}
			},
			async removeDtyxxlxx(row) {
				let { status_code } = await api.deleteDtyxxlxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getDtyxxlxxList()
			},
			async saveDtyxxlxx() {
				let params = {
					...this.dtyxxlxxForm,
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addDtyxxlxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showDtyxxlxxModel = false
					this.getDtyxxlxxList()
				}
			},
			handleChangeDtyxzzPage(val) {
				this.dtyxzzPage.pageIndex = val
				this.getDtyxzzList()
			},
			handleChangeDtyxzzPageSize(val) {
				this.dtyxzzPage.pageSize = val
				this.getDtyxzzList()
			},
			async getDtyxzzList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtyxzzPage.pageSize,
					page: this.dtyxzzPage.pageIndex,
				}
				let { status_code, data } = await api.getDtyxzzList(params)
				if(status_code == 200) {
					this.dtyxzzData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.dtyxzzPage.totalRow = data.total
				}
			},
			openDtyxzzModel() {
				this.modeType = 1;
				this.showDtyxzzModel = true
			},
			editDtyxzzModel(row) {
				this.dtyxzzForm = {
					fhqd: row.fhqd ? Number(row.fhqd) : 0,
					gfxszddmkll: row.gfxszddmkll ? Number(row.gfxszddmkll) : 0,
					xllczdl: row.xllczdl ? Number(row.xllczdl) : 0,
					lcfwkkd: row.lcfwkkd ? Number(row.lcfwkkd) : 0,
					gfsdxcjg: row.gfsdxcjg ? Number(row.gfsdxcjg) : 0,
					xlpjmzl: row.xlpjmzl ? Number(row.xlpjmzl) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showDtyxzzModel = true
			},
			dtyxzzModelChange(status) {
				if(!status) {
					this.dtyxzzForm = {
						fhqd: 0,
						gfxszddmkll: 0,
						xllczdl: 0,
						lcfwkkd: 0,
						gfsdxcjg: 0,
						xlpjmzl: 0,
					}
				}
			},
			async removeDtyxzz(row) {
				let { status_code } = await api.deleteDtyxzzInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getDtyxzzList()
			},
			async saveDtyxzz() {
				let params = {
					...this.dtyxzzForm,
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addDtyxzzInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showDtyxzzModel = false
					this.getDtyxzzList()
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