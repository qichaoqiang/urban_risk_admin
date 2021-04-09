<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="管道信息" name="name1">
				        	<part-title text="管道信息" :btns="['add']" @add="openGdxxsyModel"></part-title>
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo1" :rules="baseInfoRules1" hide-required-mark label-position="left" :label-width="180">
				        		<FormItem label="输送介质" prop="ssjz">
						            <Select clearable v-model="baseInfo.ssjz" placeholder="请选择" style="width: 160px">
						                <Option v-for="item in ssjzList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
					        	<FormItem label="管道设计输送能力（吨/a）" prop="gdsjssnl">
						        	<InputNumber :min="0" v-model="baseInfo.gdsjssnl" style="width: 160px"></InputNumber>
						        </FormItem>
						        <FormItem label="管道总长度（m）" prop="gdzcd">
						        	<InputNumber :min="0" v-model="baseInfo.gdzcd" style="width: 160px"></InputNumber>
						        </FormItem>
						    </Form>
							<Table :columns="gdxxsyColumns" :data="gdxxsyData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editGdxxsyModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeGdxxsy(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="gdxxsyPage.pageSize"
				                    :total="gdxxsyPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeGdxxsyPage"
				                    @on-page-size-change="handleChangeGdxxsyPageSize"
				                />
							</Row>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="高后果区" name="name5">
				        	<part-title text="高后果区" :btns="['add']" @add="openGhgqModel"></part-title>
							<Table :columns="ghgqColumns" :data="ghgqData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editGhgqModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeGhgq(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="ghgqPage.pageSize"
				                    :total="ghgqPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeGhgqPage"
				                    @on-page-size-change="handleChangeGhgqPageSize"
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}管道信息`" v-model="showGdxxsyModel" @on-visible-change="gdxxsyModelChange">
			<div>
				<Form :model="gdxxsyForm" ref="gdxxsy" :rules="gdxxsyRules" hide-required-mark label-position="left" :label-width="130">
					<FormItem label="管段名称" prop="gdmc">
			        	<Input clearable v-model="gdxxsyForm.gdmc"></Input>
			        </FormItem>
			        <FormItem label="途径辖区" prop="tjxq">
			        	<Input clearable v-model="gdxxsyForm.tjxq"></Input>
			        </FormItem>
					<FormItem label="长度（km）" prop="cd">
			        	<InputNumber :min="0" v-model="gdxxsyForm.cd"></InputNumber>
			        </FormItem>
			        <FormItem label="管道直径（mm）" prop="gdzj">
			        	<InputNumber :min="0" v-model="gdxxsyForm.gdzj"></InputNumber>
			        </FormItem>
			        <FormItem label="泵站数量" prop="bzsl">
			        	<InputNumber :min="0" v-model="gdxxsyForm.bzsl"></InputNumber>
			        </FormItem>
			        <FormItem label="阀室数量" prop="fssl">
			        	<InputNumber :min="0" v-model="gdxxsyForm.fssl"></InputNumber>
			        </FormItem>
			        <FormItem label="运行压力（Mpa）" prop="yxyl">
			        	<InputNumber :min="0" v-model="gdxxsyForm.yxyl"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showGdxxsyModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="gdxxsyLoading" @click="saveGdxxsy">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}高后果区`" v-model="showGhgqModel"  @on-visible-change="ghgqModelChange">
			<div>
				<Form :model="ghgqForm" ref="ghgq" :rules="ghgqRules" hide-required-mark label-position="left" :label-width="140">
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
				showGdxxsyModel: false,
				showGhgqModel: false,
				gdxxsyLoading: false,
				ghgqLoading: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					ssjz: '',
					gdzcd: 0,
					gdsjssnl: 0,
				},
				ssjzList: ['原油', '汽油', '柴油', '航空煤油', '多种成品油顺序输送', '其他'],
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
				gdxxsyColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.gdxxsyPage.pageIndex- 1) * this.gdxxsyPage.pageSize + 1);
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
                        title: '泵站数量',
                        key: 'bzsl',
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
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				gdxxsyData: [],
				gdxxsyForm: {
					gdmc: '',
					tjxq: '',
					cd: 0,
					gdzj: 0,
					bzsl: 0,
					fssl: 0,
					yxyl: 0,
				},
				gdxxsyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				ghgqColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.ghgqPage.pageIndex- 1) * this.ghgqPage.pageSize + 1);
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
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
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
				form: {}
			}
		},
		watch: {

		},
		computed: {
			baseInfoRules1() {
				return {
					ssjz: [{ required: true, message: '请选择', trigger: 'change' }],
					gdsjssnl: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					gdzcd: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
				}
			},
			gdxxsyRules() {
				return {
					gdmc: [{ required: true, message: '请输入', trigger: 'change' }],
					tjxq: [{ required: true, message: '请输入', trigger: 'change' }],
					cd: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					gdzj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					yxyl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					bzsl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					fssl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
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
					gdqzd: [{ required: true, message: '请输入', trigger: 'change' }],
					ghgqdj: [{ required: true, message: '请选择', trigger: 'change' }],
					ghgqlx: [{ required: true, message: '请选择', trigger: 'change' }],
					lngAndLat: [{ required: true, message: '请选择', trigger: 'change' }],
					qyfw: [{ required: true, validator: validatorCdfw, trigger: 'change' }],
					cd: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let gdxxsyParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.gdxxsyPage.pageSize,
					page: this.gdxxsyPage.pageIndex,
				}
				let ghgqParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ghgqPage.pageSize,
					page: this.ghgqPage.pageIndex,
				}
				Promise.all([api.getGdxxsyList(gdxxsyParams), api.getGhgqList(ghgqParams)]).then((result) => {
				  	let gdxxsyRes = result[0], ghgqRes = result[1]
				  	if(gdxxsyRes.status_code == 200) {
				  		this.gdxxsyData = gdxxsyRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.gdxxsyPage.totalRow = gdxxsyRes.data.total
				  	}
				  	if(ghgqRes.status_code == 200) {
				  		this.ghgqData = ghgqRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.ghgqPage.totalRow = ghgqRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getCsgxsyBase(this.gkdx_id);
				if(status_code == 0) {
					this.baseInfo = {
						ssjz: data.ssjz,
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
				this.$refs.baseInfo1.validate(async valid => {
                    if (valid) {
                        let params = {
							gkdx_id: this.gkdx_id,
							ssjz: this.baseInfo.ssjz,
							gdsjssnl: this.baseInfo.gdsjssnl,
							gdzcd: this.baseInfo.gdzcd,
						}
						let { status_code, message } = await api.addCsgxsyBase(params);
						if(status_code == 200) {
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
				let { status_code, message } = await api.addCsgxsyBase(params);
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
			async getGdxxsyList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.gdxxsyPage.pageIndex,
				}
				let { status_code, data } = await api.getGdxxsyList(params)
				if(status_code == 200) {
					this.gdxxsyList = data.data
				}
			},
			handleChangeGdxxsyPage(val) {
				this.gdxxsyPage.pageIndex = val
				this.getGdxxsyList()
			},
			handleChangeGdxxsyPageSize(val) {
				this.gdxxsyPage.pageSize = val
				this.getGdxxsyList()
			},
			async getGdxxsyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.gdxxsyPage.pageSize,
					page: this.gdxxsyPage.pageIndex,
				}
				let { status_code, data } = await api.getGdxxsyList(params)
				if(status_code == 200) {
					this.gdxxsyData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.gdxxsyPage.totalRow = data.total
				}
			},
			openGdxxsyModel() {
				this.modeType = 1;
				this.showGdxxsyModel = true
			},
			editGdxxsyModel(row) {
				this.gdxxsyForm = {
					gdmc: row.gdmc,
					tjxq: row.tjxq,
					cd: row.cd ? Number(row.cd) : 0,
					gdzj: row.gdzj ? Number(row.gdzj) : 0,
					bzsl: row.bzsl ? Number(row.bzsl) : 0,
					fssl: row.fssl ? Number(row.fssl) : 0,
					yxyl: row.yxyl ? Number(row.yxyl) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showGdxxsyModel = true
			},
			gdxxsyModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.gdxxsyForm = {
							gdmc: '',
							tjxq: '',
							cd: 0,
							gdzj: 0,
							bzsl: 0,
							fssl: 0,
							yxyl: 0,
						}
						this.$refs.gdxxsy.resetFields();
					})
				}
			},
			async removeGdxxsy(row) {
				let { status_code } = await api.deleteGdxxsyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getGdxxsyList()
			},
			async saveGdxxsy() {
				this.$refs.gdxxsy.validate(async valid => {
                    if (valid) {
                    	this.gdxxsyLoading = true
                       	let params = {
							...this.gdxxsyForm,
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addGdxxsyInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showGdxxsyModel = false
							this.getGdxxsyList()
						} 
						this.gdxxsyLoading = false
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
				let { status_code, data } = await api.getGhgqList(params)
				if(status_code == 200) {
					this.ghgqData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.ghgqPage.totalRow = data.total
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
				if(!status) {
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
				let { status_code } = await api.deleteGhgqInfo(row.id)
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
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addGhgqInfo(params);
						if(status_code == 200) {
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