<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="桥梁信息" name="name1">
				        	<part-title text="桥梁信息"></part-title>
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo1" :rules="baseInfoRules1" hide-required-mark label-position="left" :label-width="170">
				        		<FormItem label="桥梁类别" prop="qllb">
						        	<Select clearable :transfer="true" v-model="baseInfo.qllb" placeholder="请选择">
						                <Option v-for="item in qllbList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="是否下穿桥梁" prop="sfxcql">
						            <Select clearable v-model="baseInfo.sfxcql" placeholder="请选择">
						                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="桥梁长度（米）">
						        	<InputNumber :min="0" v-model="baseInfo.qlcd"></InputNumber>
						        </FormItem>
						        <FormItem label="桥梁单孔跨径（米）">
						        	<InputNumber :min="0" v-model="baseInfo.qldkkj"></InputNumber>
						        </FormItem>
						        <FormItem label="桥梁设计承载能力（吨）">
						        	<InputNumber :min="0" v-model="baseInfo.qlsjcznl"></InputNumber>
						        </FormItem>
						        <FormItem label="桥梁养护等级" prop="qlyhdj">
						        	<Select clearable :transfer="true" v-model="baseInfo.qlyhdj" placeholder="请选择">
						                <Option v-for="item in qlyhdjList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
                    <FormItem label="完好状态等级">
                    	<Input clearable v-model="baseInfo.whztdj"></Input>
                    </FormItem>
					        	<FormItem label="日均通行量">
						        	<InputNumber :min="0" v-model="baseInfo.rjtxl"></InputNumber>
						        </FormItem>
					        	<FormItem label="重型车辆数量占日交通量的百分比（%）">
						        	<InputNumber :min="0" v-model="baseInfo.zxclslzb"></InputNumber>
						        </FormItem>
						        <FormItem label="桥梁技术状况等级">
						        	<Input clearable v-model="baseInfo.qljszkdj"></Input>
						        </FormItem>
						        <FormItem label="建设规模">
						        	<Input clearable v-model="baseInfo.jsgm"></Input>
						        </FormItem>
						        <FormItem label="地质灾害情况">
						        	<Input clearable type="textarea" v-model="baseInfo.zzzhqk"></Input>
						        </FormItem>
						        <FormItem label="病害情况">
						        	<Input clearable type="textarea" v-model="baseInfo.bhqk"></Input>
						        </FormItem>
						    </Form>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="养护信息" name="name2">
				        	<part-title text="养护信息" :btns="['add']" @add="openYhxxModel"></part-title>
							<Table :columns="yhxxColumns" :data="yhxxData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editYhxxModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeYhxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="yhxxPage.pageSize"
				                    :total="yhxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeYhxxPage"
				                    @on-page-size-change="handleChangeYhxxPageSize"
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}养护信息`" v-model="showYhxxModel" @on-visible-change="yhxxModelChange">
			<div>
				<Form :model="yhxxForm" ref="yhxx" :rules="yhxxRules" hide-required-mark label-position="left" :label-width="200">
					<FormItem label="养护时间" prop="yhsj">
			            <DatePicker type="date" v-model="yhxxForm.yhsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="养护单位" prop="yhdw">
			        	<Input clearable v-model="yhxxForm.yhdw"></Input>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="yhxxForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showYhxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="yhxxLoading" @click="saveYhxx">保存</Button>
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
				showYhxxModel: false,
				showGdtrqModel: false,
				showYhsyqModel: false,
				showCjrlModel: false,
				showElseModel: false,
				yhxxLoading: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					qllb: '',
					qlyhdj: '',
					sfxcql: 0
				},
				qllbList: ['梁式桥', '板拱桥', '刚架拱桥', '椼架拱桥', '钢-混凝土组合拱桥', '悬索桥', '斜拉桥', '其他'],
				qlyhdjList: ['一类', '二类', '三类', '四类', '五类', '未评定'],
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
				yhxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.yhxxPage.pageIndex- 1) * this.yhxxPage.pageSize + 1);
				        },
                    }, {
                        title: '养护时间',
                        key: 'yhsj',
                        minWidth: 100,
                    }, {
                        title: '养护单位',
                        key: 'yhdw',
                        minWidth: 160,
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
				yhxxData: [],
				yhxxForm: {
					yhsj: '',
					yhdw: '',
					tbsj: '',
				},
				yhxxPage: {
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
				            return h('span',params.index + (this.gdtrqPage.pageIndex- 1) * this.gdtrqPage.pageSize + 1);
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
				            return h('span',params.index + (this.yhsyqPage.pageIndex- 1) * this.yhsyqPage.pageSize + 1);
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
				            return h('span',params.index + (this.cjrlPage.pageIndex- 1) * this.cjrlPage.pageSize + 1);
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
				            return h('span',params.index + (this.elsePage.pageIndex- 1) * this.elsePage.pageSize + 1);
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
			baseInfoRules1() {
				return {
					qllb: [{ required: true, message: '请选择', trigger: 'change' }],
					sfxcql: [{ required: true, type: 'number', message: '请选择', trigger: 'change' }],
					qlyhdj: [{ required: true, message: '请选择', trigger: 'change' }],
				}
			},
			yhxxRules() {
				return {
					yhsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
					yhdw: [{ required: true, message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let yhxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.yhxxPage.pageSize,
					page: this.yhxxPage.pageIndex,
				}
				Promise.all([api.getYhxxList(yhxxParams)]).then((result) => {
				  	let yhxxRes = result[0]
				  	if(yhxxRes.status_code == 200) {
				  		this.yhxxData = yhxxRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.yhxxPage.totalRow = yhxxRes.data.total
				  	}
				  	this.loading = false
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getCsqlBase(this.gkdx_id);
				if(status_code == 0) {
					console.log(data)
					this.baseInfo.qllb = data.qllb
					this.baseInfo.sfxcql = data.sfxcql ? Number(data.sfxcql) : 0
					this.baseInfo.qlcd = data.qlcd ? Number(data.qlcd) : 0
					this.baseInfo.qldkkj = data.qldkkj ? Number(data.qldkkj) : 0
					this.baseInfo.qlsjcznl = data.qlsjcznl ? Number(data.qlsjcznl) : 0
					this.baseInfo.qlyhdj = data.qlyhdj
          this.baseInfo.whztdj = data.whztdj
					this.baseInfo.rjtxl = data.rjtxl ? Number(data.rjtxl) : 0
					this.baseInfo.zxclslzb = data.zxclslzb ? Number(data.zxclslzb) : 0
					this.baseInfo.qljszkdj = data.qljszkdj
					this.baseInfo.jsgm = data.jsgm
					this.baseInfo.zzzhqk = data.zzzhqk
					this.baseInfo.bhqk = data.bhqk
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
							qllb: this.baseInfo.qllb,
							sfxcql: this.baseInfo.sfxcql,
							qlcd: this.baseInfo.qlcd,
							qldkkj: this.baseInfo.qldkkj,
							qlsjcznl: this.baseInfo.qlsjcznl,
							qlyhdj: this.baseInfo.qlyhdj,
              whztdj: this.baseInfo.whztdj,
							rjtxl: this.baseInfo.rjtxl,
							zxclslzb: this.baseInfo.zxclslzb,
							qljszkdj: this.baseInfo.qljszkdj,
							jsgm: this.baseInfo.jsgm,
							zzzhqk: this.baseInfo.zzzhqk,
							bhqk: this.baseInfo.bhqk,
						}
						let { status_code, message } = await api.addCsqlBase(params);
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
				let { status_code, message } = await api.addCsqlBase(params);
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
			async getYhxxList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.yhxxPage.pageIndex,
				}
				let { status_code, data } = await api.getYhxxList(params)
				if(status_code == 200) {
					this.yhxxList = data.data
				}
			},
			handleChangeYhxxPage(val) {
				this.yhxxPage.pageIndex = val
				this.getYhxxList()
			},
			handleChangeYhxxPageSize(val) {
				this.yhxxPage.pageSize = val
				this.getYhxxList()
			},
			async getYhxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.yhxxPage.pageSize,
					page: this.yhxxPage.pageIndex,
				}
				let { status_code, data } = await api.getYhxxList(params)
				if(status_code == 200) {
					this.yhxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.yhxxPage.totalRow = data.total
				}
			},
			openYhxxModel() {
				this.modeType = 1;
				this.showYhxxModel = true
			},
			editYhxxModel(row) {
				this.yhxxForm = {
					yhsj: row.yhsj ? new Date(row.yhsj) : '',
					yhdw: row.yhdw,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showYhxxModel = true
			},
			yhxxModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.yhxxForm = {
							yhsj: '',
							yhdw: '',
							tbsj: '',
						}
						this.$refs.yhxx.resetFields();
					})
				}
			},
			async removeYhxx(row) {
				let { status_code } = await api.deleteYhxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getYhxxList()
			},
			async saveYhxx() {
				this.$refs.yhxx.validate(async valid => {
                    if (valid) {
                    	this.yhxxLoading = true
                       	let params = {
							...this.yhxxForm,
							yhsj: this.yhxxForm.yhsj ? getDate(new Date(this.yhxxForm.yhsj).getTime(), 'year') : '',
							tbsj: this.yhxxForm.tbsj ? getDate(new Date(this.yhxxForm.tbsj).getTime(), 'year') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addYhxxInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showYhxxModel = false
							this.getYhxxList()
						}
                    	this.yhxxLoading = false
                    }
                })
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
			if(this.isDisEditInfo) {
			  this.gdxxsyColumns.pop()
			  this.ghgqColumns.pop()
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
