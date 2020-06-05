<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="仓储信息" name="name1">
				        	<part-title text="仓储信息" :btns="['add']" @add="openCcxxModel"></part-title>
							<Table :columns="ccxxColumns" :data="ccxxData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editCcxxModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCcxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="ccxxPage.pageSize"
				                    :total="ccxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeCcxxPage"
				                    @on-page-size-change="handleChangeCcxxPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="周边环境" name="name2">
				        	<part-title text="周边环境" :btns="['add']" @add="openRimModel"></part-title>
							<Table :columns="rimColumns" :data="rimData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editRimModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRim(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="rimPage.pageSize"
				                    :total="rimPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeRimPage"
				                    @on-page-size-change="handleChangeRimPageSize"
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}仓储信息`" v-model="showCcxxModel" @on-visible-change="ccxxModelChange">
			<div>
				<Form :model="ccxxForm" label-position="left" :label-width="160">
					<FormItem label="名称">
			        	<Input clearable v-model="ccxxForm.ckmc"></Input>
			        </FormItem>
			        <FormItem label="占地面积（平方千米）">
			        	<InputNumber :min="0" v-model="ccxxForm.zdmj"></InputNumber>
			        </FormItem>
			        <FormItem label="危险等级">
			        	<Select clearable v-model="ccxxForm.wxdj" placeholder="请选择">
			                <Option v-for="item in wxdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="重大危险源">
			        	<Select clearable v-model="ccxxForm.zdwxy" placeholder="请选择">
			                <Option v-for="item in zdwxyList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="核定药量（吨）">
			            <InputNumber :min="0" v-model="ccxxForm.hdyl"></InputNumber>
			        </FormItem>
			        <FormItem label="最大储存药量（吨）">
			            <InputNumber :min="0" v-model="ccxxForm.zdccyl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间">
			            <DatePicker type="date" v-model="ccxxForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="经纬度">
			        	<div @click="openLngModal">
		        			<Input 
		        				readonly 
		        				v-model="ccxxForm.lngAndLat" 
		        				icon="md-pin" 
		        				placeholder="经纬度" />
		        		</div>
			        </FormItem>
			        <FormItem label="仓库范围">
			        	<div @click.stop="openAreaModal">
		        			<Input 
		        				readonly 
		        				v-model="ccxxForm.ckfw" 
		        				icon="md-pin" 
		        				placeholder="仓库范围" />
		        		</div>
			        </FormItem>
				</Form>
				<part-title text="储存产品" :btns="['add']" @add="openCccpModel"></part-title>
				<Row type="flex" :gutter="100">
					<Col>合计药量：{{cccpForm.dqyl || 0}}</Col>
				</Row>
				<Table :columns="cccpColumns" :data="cccpData">
					<template slot-scope="{ row }" slot="action">
			            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editCccpModel(row)">编辑</Button>
			            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCccp(row)">
					        <Button type="error" size="small" ghost>删除</Button>
					    </Poptip>
			        </template>
				</Table>
				<Row type="flex" justify="end">
					<Page
	                    size="small"
	                    style="margin-top: 10px"
	                    :page-size="cccpPage.pageSize"
	                    :total="cccpPage.totalRow"
	                    show-elevator
	                    show-total
	                    show-sizer
	                    @on-change="handleChangeCccpPage"
	                    @on-page-size-change="handleChangeCccpPageSize"
	                />
				</Row>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCcxx">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}储存产品`" v-model="showCccpModel" @on-visible-change="cccpModelChange">
			<div>
				<Form :model="cccpForm" label-position="left" :label-width="120">
					<FormItem label="产品类别">
			        	<Input clearable v-model="cccpForm.cplb"></Input>
			        </FormItem>
			        <FormItem label="产品分级">
			        	<Input clearable v-model="cccpForm.cpfj"></Input>
			        </FormItem>
			        <FormItem label="当前数量（吨/万发）">
			        	<InputNumber :min="0" v-model="cccpForm.dqsl"></InputNumber>
			        </FormItem>
			        <FormItem label="含药量（吨）">
			        	<InputNumber :min="0" v-model="cccpForm.hyl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCccp">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}周边环境`" v-model="showRimModel"  @on-visible-change="rimModelChange">
			<div>
				<Form :model="rimForm" label-position="left" :label-width="120">
					<FormItem label="敏感目标名称">
			        	<Input clearable v-model="rimForm.mgmbmc"></Input>
			        </FormItem>
			        <FormItem label="方位">
			        	<Select clearable v-model="rimForm.fw" placeholder="请选择">
			                <Option v-for="item in fwList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="敏感目标类型">
			            <Select clearable v-model="rimForm.mgmblx" placeholder="请选择">
			                <Option v-for="item in mgmblxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="敏感目标距离(m)">
			        	<InputNumber :min="0" v-model="rimForm.mgmbjl"></InputNumber>
			        </FormItem>	
			        <FormItem label="人员数量">
			        	<InputNumber :min="0" v-model="rimForm.rysl"></InputNumber>
			        </FormItem>
			        <FormItem label="经纬度">
			        	<lng :lngAndLat.sync="rimForm.lngAndLat"></lng>
			        	<!-- <div @click="openLngModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.lngAndLat" 
		        				icon="md-pin" 
		        				placeholder="经纬度" />
		        		</div> -->
			        </FormItem>
			        <FormItem label="区域范围">
			        	<qyfw :qyfw.sync="rimForm.qyfw"></qyfw>
			        	<!-- <div @click.stop="openAreaModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.qyfw" 
		        				icon="md-pin" 
		        				placeholder="区域范围" />
		        		</div> -->
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveRim">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import lng from './components/lng'
	import qyfw from './components/qyfw'
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	import lngjs from '@/common/js/lng2'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs, lngjs, datePickerjs],
		components: { partTitle, lng, qyfw },
		data() {
			return {
				id: '',
				gkdx_id: this.$storage.get('gkdx_id'),
				cccpId: '',
				sbfcgy_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showWhRiskModel: false,
				showCcxxModel: false,
				showCccpModel: false,
				showMainRiskModel: false,
				showRimModel: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					qymc: '企业名称',
					tyshxydm: '',
					zcdz: '',
					jyfw: '',
					xsxkz: '',
					ccdz: '',
					zgrs: '',
					glrysl: '',
					hyml: [],
					hydm: '',
					qyjbjk: '',
					yxzt: '',
					lngAndLat: '',
					ckfw: '',
					zdmj: 0,
					jzmj: 0,
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
				ccxxColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '仓库名称',
                        key: 'ckmc',
                    }, {
                        title: '占地面积（平方千米）',
                        key: 'zdmj',
                    }, {
                        title: '危险等级',
                        key: 'wxdj',
                    }, {
                        title: '核定药量（吨）',
                        key: 'hdyl',
                    }, {
                        title: '最大储存药量（吨）',
                        key: 'zdccyl',
                    }, {
                        title: '当前药量（吨）',
                        key: 'dqyl',
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				ccxxData: [],
				ccxxForm: {
					ckmc: '',
					zdmj: 0,
					wxdj: '',
					hdyl: 0,
					zdccyl: 0,
					dqyl: 0,
					zdwxy: '',
					lngAndLat: '',
					ckfw: '',
					tbsj: ''
				},
				ccssList: ['有', '无'],
				wxdjList: ['10﹣²', '1.1﹣²', '1.3'],
				zdwxyList: ['否', '一级', '二级', '三级', '四级'],
				ccxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				ccxxNum: {
					gysl: 0,
					zyzrs: 0
				},
				cccpColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '产品类别',
                        key: 'cplb',
                    }, {
                        title: '产品分级',
                        key: 'cpfj',
                    }, {
                        title: '当前数量（吨/万发）',
                        key: 'dqsl',
                        width: 180
                    }, {
                        title: '含药量（吨）',
                        key: 'hyl',
                        width: 120
                    },{
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				cccpData: [],
				ccxx_id: '',
				cccpForm: {
					cplb: '',
					cpfj: '',
					dqsl: 0,
					hyl: 0
				},
				lxList: ['湿式除尘', '干法布袋式除尘', '静电除尘', '旋风除尘', '其他'],
				cccpPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				cccpNum: {
					zsl: 0,
					yxsl: 0
				},
				rimColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '敏感目标名称',
                        key: 'mgmbmc',
                    }, {
                        title: '方位',
                        key: 'fw',
                    }, {
                        title: '目标类型',
                        key: 'mgmblx',
                    }, {
                        title: '人员数量',
                        key: 'rysl',
                    },{
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				rimData: [],
				rimForm: {
					mgmbmc: '',
					mgmblx: '',
					fw: '',
					mgmbjl: 0,
					rysl: 0,
					lngAndLat: '',
					qyfw: ''
				},
				fwList: ['东', '南', '西', '北'],
				mgmblxList: ['医院', '养老院', '学校', '政府机构', '商场', '居住区', '监狱', '宗教', '车站', '码头', '铁路', '公路', '林区', '工厂', '矿山', '河流', '其他'],
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
			getBaseInfo() {
				this.loading = true
				let ccxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccxxPage.pageSize,
					page: this.ccxxPage.pageIndex,
				}
				let rimParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.rimPage.pageSize,
					page: this.rimPage.pageIndex,
				}
				Promise.all([api.getCcxxList(ccxxParams), api.getRimList(rimParams)]).then((result) => {
				  	let ccxxRes = result[0], rimRes = result[1]
				  	if(ccxxRes.status_code == 200) {
				  		this.ccxxData = ccxxRes.data.data
				  		this.ccxxPage.totalRow = ccxxRes.data.total
				  	}
				  	if(rimRes.status_code == 200) {
				  		this.rimData = rimRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.rimPage.totalRow = rimRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
			},
			async nextStep() {
				let params = {
					...this.baseInfo,
					hyml: this.baseInfo.hyml[this.baseInfo.hyml.length - 1],
					jd: this.baseInfo.lngAndLat.split(' ')[0],
					wd: this.baseInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.lngAndLat
				let { status_code, message } = await api.addMbqyBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.query.type == 2) {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}else {
						let { status_code, data } = await api.getMbqyBase()
						if(status_code == 200) {
							this.$storage.set('gkdx_id', data.data[0].gkdx_id)
						}
						this.$router.replace('/baseInfo')
					}
					// if(this.$route.query.type == 2) {
					// 	this.$storage.set('gkdx_id', this.form.gkdx_id)
					// }else {
					// 	let { status_code, data } = await api.getMbqyBase()
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
			            if(this.ccxxForm.ckfw) {
			            	let ckfw = JSON.parse(this.ccxxForm.ckfw)
			            	let points = ckfw.map(item => {
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
					this.ccxxForm.ckfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.ccxxForm.ckfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.ccxxForm.ckfw = this.ckfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.ckfw = this.ccxxForm.ckfw;
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.showAreaModel = false
			},
			handleChangeCcxxPage(val) {
				this.ccxxPage.pageIndex = val
				this.getCcxxList()
			},
			handleChangeCcxxPageSize(val) {
				this.ccxxPage.pageSize = val
				this.getCcxxList()
			},
			async getCcxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccxxPage.pageSize,
					page: this.ccxxPage.pageIndex,
				}
				let { status_code, data } = await api.getCcxxList(params)
				if(status_code == 200) {
					this.ccxxData = data.data
					this.ccxxPage.totalRow = data.total
				}
			},
			openCcxxModel() {
				this.modeType = 1;
				this.showCcxxModel = true
			},
			editCcxxModel(row) {
				this.ccxxForm = {
					ckmc: row.ckmc,
					zdmj: row.zdmj ? Number(row.zdmj) : 0,
					wxdj: row.wxdj,
					hdyl: row.hdyl ? Number(row.hdyl) : 0,
					zdccyl: row.zdccyl ? Number(row.zdccyl) : 0,
					dqyl: row.dqyl ? Number(row.dqyl) : 0,
					zdwxy: row.zdwxy,
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
					ckfw: row.ckfw,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.cccpData = row.cccp ? JSON.parse(row.cccp) : []
				this.id = row.id
				this.modeType = 2;
				this.showCcxxModel = true
			},
			ccxxModelChange(status) {
				if(!status) {
					this.ccxxForm = {
						ckmc: '',
						zdmj: 0,
						wxdj: '',
						hdyl: 0,
						zdccyl: 0,
						dqyl: 0,
						zdwxy: '',
						lngAndLat: '',
						ckfw: '',
						tbsj: ''
					}
				}
			},
			async removeCcxx(row) {
				let { status_code } = await api.deleteCcxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCcxxList()
			},
			async saveCcxx() {
				let params = {
					...this.ccxxForm,
					jd: this.ccxxForm.lngAndLat.split(' ')[0],
					wd: this.ccxxForm.lngAndLat.split(' ')[1],
					tbsj: this.ccxxForm.tbsj ? getDate(new Date(this.ccxxForm.tbsj).getTime(), 'date') : '',
					cccp: JSON.stringify(this.cccpData),
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addCcxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showCcxxModel = false
					this.getCcxxList()
				}
			},
			handleChangeCccpPage(val) {
				this.cccpPage.pageIndex = val
				this.getCccpList()
			},
			handleChangeCccpPageSize(val) {
				this.cccpPage.pageSize = val
				this.getCccpList()
			},
			async getCccpList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.cccpPage.pageSize,
					page: this.cccpPage.pageIndex,
				}
				let { status_code, data } = await api.getCccpList(params)
				if(status_code == 200) {
					this.cccpData = data.data
					this.cccpPage.totalRow = data.total
				}
			},
			openCccpModel() {
				this.modeType2 = 1;
				this.showCccpModel = true
			},
			editCccpModel(row) {
				this.cccpForm = {
					cplb: row.cplb,
					cpfj: row.cpfj,
					dqsl: row.dqsl ? Number(row.dqsl) : 0,
					hyl: row.hyl ? Number(row.hyl) : 0,
				}
				this.id = row.id
				this.modeType2 = 2;
				this.showCccpModel = true
			},
			cccpModelChange(status) {
				if(!status) {
					this.cccpForm = {
						cplb: '',
						cpfj: '',
						dqsl: 0,
						hyl: 0
					}
				}
			},
			async saveCccp() {
				this.cccpData.push(this.cccpForm)
				this.ccxxForm.dqyl += this.cccpForm.hyl
				this.showCccpModel = false
				// let params = {
				// 	...this.cccpForm,
				// 	gkdx_id: this.gkdx_id
				// }
				// if(this.modeType2 == 2) {
				// 	params.id = this.id
				// }
				// let { status_code, message } = await api.addCccpInfo(params);
				// if(status_code == 200) {
				// 	this.$Message.success(message)
				// 	this.showCccpModel = false

				// 	this.getCccpList()
				// }
			},
			async removeCccp(row) {
				let { status_code } = await api.deleteCccpInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCccpList()
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
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
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