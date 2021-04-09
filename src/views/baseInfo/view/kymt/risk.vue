<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="码头容量" name="name1">
				        	<part-title text="码头容量" ref="xxx" :btns="['add']" @add="openMtrlModel"></part-title>
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo1" :rules="baseInfoRules" hide-required-mark label-position="left" :label-width="130">
						        <FormItem label="停车场面积（㎡）" prop="tccmj">
						        	<InputNumber :min="0" v-model="baseInfo.tccmj"></InputNumber>
						        </FormItem>
						        <FormItem label="车位数" prop="cws">
						        	<InputNumber :min="0" v-model="baseInfo.cws"></InputNumber>
						        </FormItem>
						        <FormItem label="一次最大接待人数" prop="yczdjdrs">
						        	<InputNumber :min="0" v-model="baseInfo.yczdjdrs"></InputNumber>
						        </FormItem>
						        <FormItem label="年最大发客数量" prop="nzdfksl">
						        	<InputNumber :min="0" v-model="baseInfo.nzdfksl"></InputNumber>
						        </FormItem>
						    </Form>
							<Table :columns="mtrlColumns" :data="mtrlData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editMtrlModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeMtrl(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="mtrlPage.pageSize"
				                    :total="mtrlPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeMtrlPage"
				                    @on-page-size-change="handleChangeMtrlPageSize"
				                />
							</Row>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="码头安全信息" name="name2">
				        	<part-title text="码头安全信息"></part-title>
				        	<Form :disabled="isDisEditInfo" :model="baseInfo" ref="baseInfo2" :rules="baseInfoRules" hide-required-mark label-position="left" :label-width="150">
						        <FormItem label="码头耐火等级" prop="mtnhdj">
						        	<Select clearable :transfer="true" v-model="baseInfo.mtnhdj" placeholder="请选择" style="width: 100px">
						                <Option v-for="item in mtnhdjList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="与危货码头距离（m）" prop="ywhmtjl">
						        	<InputNumber :min="0" v-model="baseInfo.ywhmtjl"></InputNumber>
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
			<!-- <Row type="flex" justify="center" style="margin-top: 24px">
				<Col>
					<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
				</Col>
			</Row> -->
		</div>
		<Modal title="企业经纬度标注" v-model="showLngModel">
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
		<Modal title="企业范围标注" v-model="showAreaModel">
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}码头容量`" v-model="showMtrlModel" @on-visible-change="mtrlModelChange">
			<div>
				<Form :model="mtrlForm" ref="mtrl" :rules="mtrlRules" hide-required-mark label-position="left" :label-width="180">
					<FormItem label="近1月日平均停车数量" prop="jyrpjtcsl">
			        	<InputNumber :min="0" v-model="mtrlForm.jyrpjtcsl"></InputNumber>
			        </FormItem>
			        <FormItem label="近1月日平均发客数量" prop="jyrpjfksl">
			        	<InputNumber :min="0" v-model="mtrlForm.jyrpjfksl"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			            <DatePicker type="date" v-model="mtrlForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showMtrlModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="mtrlLoading" @click="saveMtrl">保存</Button>
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
				sjwxhwzlId: '',
				bwxx_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showMtrlModel: false,
				showMtrlRiskModel: false,
				showBwxxModel: false,
				showCcssModel: false,
				showSjwxhwzlModel: false,
				showGqscModel: false,
				showMainRiskModel: false,
				showCcxxwhModel: false,
				mtrlLoading: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					tccmj: 0,
					cws: 0,
					yczdjdrs: 0,
					nzdfksl: 0,
					mtnhdj: '',
					ywhmtjl: 0,
				},
				mtnhdjList: ['二级', '三级', '四级'],
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
				mtrlColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.mtrlPage.pageIndex- 1) * this.mtrlPage.pageSize + 1);
				        }
                    }, {
                        title: '近1月日平均停车数量',
                        key: 'jyrpjtcsl',
                        minWidth: 200
                    }, {
                        title: '近1月日平均发客数量',
                        key: 'jyrpjfksl',
                        minWidth: 200
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
				mtrlData: [],
				mtrlForm: {
					jyrpjtcsl: 0,
					jyrpjfksl: 0,
					tbsj: '',
				},
				mtrlPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				bwxxColumns: [
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
                        title: '泊位名称',
                        key: 'bwmc',
                    }, {
                        title: '靠泊吨级（DWT）',
                        key: 'kbdw',
                    }, {
                        title: '危险货物种类',
                        slot: 'wxhwzl',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				bwxxData: [],
				bwxxForm: {
					bwmc: '',
					kbdw: '',
					sfkzyjzy: 0,
				},
				ccssList: ['有', '无'],
				zzyxylList: ['Mpa', 'Kpa'],
				mtrlList: [],
				fclxList: [],
				bwxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				bwxxNum: {
					gysl: 0,
					zyzrs: 0
				},
				ccssColumns: [
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
                        title: '储存设施单元名称',
                        key: 'ccssdymc',
                    }, {
                        title: '类型',
                        key: 'lx',
                    }, {
                        title: '重大危险源',
                        key: 'zdwxy',
                    }, {
                        title: '危险化学品',
                        slot: 'wxhxp',
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
				ccssData: [],
				ccssForm: {
					ccssdymc: '',
					lx: '',
					ccwd: 0,
					zdwxy: '',
					tysj: '',
					lngAndLat: '',
					dtfw: '',
					dqzt: ''
				},
				wxdjList: ['10﹣²', '1.1﹣²', '1.3'],
				ccssPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sjwxhwzlColumns: [
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
                        title: '危险货物名称',
                        key: 'wxhwmc',
                        minWidth: 120
                    }, {
                        title: '最大年吞吐量（吨/年）',
                        key: 'zdnzzl',
                        minWidth: 200
                    }, {
                        title: '近1月日平均吞吐量（吨）',
                        key: 'jyyrpjzz',
                        minWidth: 200
                    }, {
                        title: '填报时间',
                        key: 'tbsj',
                        minWidth: 120
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sjwxhwzlData: [],
				sjwxhwzlForm: {
					wxhwmc: '',
					zdnzzl: 0,
					jyyrpjzz: 0,
					tbsj: '',
				},
				dqsldwList: ['箱', '吨'],
				sjwxhwzlPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sjwxhwzlNum: {
					zsl: 0,
					yxsl: 0
				},
				ccxxwhColumns: [
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
                        title: '容器名称',
                        key: 'rqmc',
                        minWidth: 100
                    }, {
                        title: '容积（m³）',
                        key: 'rj',
                        minWidth: 120
                    }, {
                        title: '数量',
                        key: 'sl',
                        minWidth: 80
                    }, {
                        title: '危险货物名称',
                        key: 'wxhwmc',
                        minWidth: 120
                    }, {
                        title: '存储量',
                        key: 'ccl',
                        minWidth: 80
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				ccxxwhData: [],
				ccxxwhForm: {
					rqmc: '',
					rj: 0,
					sl: 0,
					wxhwmc: '',
					ccl: 0
				},
				ccxxwhPage: {
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
			baseInfoRules() {
				return {
					tccmj: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					cws: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					yczdjdrs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					nzdfksl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					mtnhdj: [{ required: true, message: '请选择', trigger: 'change' }],
					ywhmtjl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
			mtrlRules() {
				return {
					jyrpjtcsl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					jyrpjfksl: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let mtrlParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.mtrlPage.pageSize,
					page: this.mtrlPage.pageIndex,
				}
				Promise.all([api.getMtrlList(mtrlParams)]).then((result) => {
				  	let mtrlRes = result[0], bwxxRes = result[1], ccxxwhRes = result[2]
				  	if(mtrlRes.status_code == 200) {
				  		this.mtrlData = mtrlRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.mtrlPage.totalRow = mtrlRes.data.total
				  	}
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
				let { status_code, data, message } = await api.getKymtBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { 
						tccmj: data.tccmj ? Number(data.tccmj) : 0,
						cws: data.cws ? Number(data.cws) : 0,
						yczdjdrs: data.yczdjdrs ? Number(data.yczdjdrs) : 0,
						nzdfksl: data.nzdfksl ? Number(data.nzdfksl) : 0,
						mtnhdj: data.mtnhdj || '',
						ywhmtjl: data.ywhmtjl ? Number(data.ywhmtjl) : 0,
					}
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
				this.$refs.baseInfo1.validate(async valid => {
                    if (valid) {
						let params = {
							gkdx_id: this.gkdx_id,
							tccmj: this.baseInfo.tccmj,
							cws: this.baseInfo.cws,
							yczdjdrs: this.baseInfo.yczdjdrs,
							nzdfksl: this.baseInfo.nzdfksl
						}
						let { status_code, message } = await api.addKymtBase(params);
						if(status_code == 200) {
							this.$Message.success('保存成功')
						}
                    }
                })
			},
			async saveInfo2() {
				this.$refs.baseInfo2.validate(async valid => {
                    if (valid) {
						let params = {
							gkdx_id: this.gkdx_id,
							mtnhdj: this.baseInfo.mtnhdj,
							ywhmtjl: this.baseInfo.ywhmtjl
						}
						let { status_code, message } = await api.addKymtBase(params);
						if(status_code == 200) {
							this.$Message.success('保存成功')
						}
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
			handleChangeMtrlPage(val) {
				this.mtrlPage.pageIndex = val
				this.getMtrlList()
			},
			handleChangeMtrlPageSize(val) {
				this.mtrlPage.pageSize = val
				this.getMtrlList()
			},
			async getMtrlList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.mtrlPage.pageSize,
					page: this.mtrlPage.pageIndex,
				}
				let { status_code, data } = await api.getMtrlList(params)
				if(status_code == 200) {
					this.mtrlData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.mtrlPage.totalRow = data.total
				}
			},
			openMtrlModel() {
				this.modeType = 1;
				this.showMtrlModel = true
			},
			editMtrlModel(row) {
				this.mtrlForm = {
					jyrpjtcsl: row.jyrpjtcsl ? Number(row.jyrpjtcsl) : 0,
					jyrpjfksl: row.jyrpjfksl ? Number(row.jyrpjfksl) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.id = row.id
				this.modeType = 2;
				this.showMtrlModel = true
			},
			mtrlModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.mtrlForm = {
							jyrpjtcsl: 0,
							jyrpjfksl: 0,
							tbsj: '',
						}
						this.$refs.mtrl.resetFields();
					})
				}
			},
			async removeMtrl(row) {
				let { status_code } = await api.deleteMtrlInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getMtrlList()
			},
			async saveMtrl() {
				this.$refs.mtrl.validate(async valid => {
                    if (valid) {
                    	this.mtrlLoading = true
						let params = {
							...this.mtrlForm,
							tbsj: this.mtrlForm.tbsj ? getDate(new Date(this.mtrlForm.tbsj).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addMtrlInfo(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showMtrlModel = false
							this.mtrlLoading = false
							this.getMtrlList()
						}
                    }
                })
			},
			handleChangeBwxxPage(val) {
				this.bwxxPage.pageIndex = val
				this.getBwxxList()
			},
			handleChangeBwxxPageSize(val) {
				this.bwxxPage.pageSize = val
				this.getBwxxList()
			},
			async getBwxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.bwxxPage.pageSize,
					page: this.bwxxPage.pageIndex,
				}
				let { status_code, data } = await api.getBwxxList(params)
				if(status_code == 200) {
					this.bwxxData = data.data
					this.bwxxPage.totalRow = data.total
				}
			},
			async openBwxxModel() {
				this.modeType = 1;
				this.showBwxxModel = true
			},
			async editBwxxModel(row) {
				this.bwxxForm = {
					bwmc: row.bwmc,
					kbdw: row.kbdw,
					sfkzyjzy: row.sfkzyjzy ? Number(row.sfkzyjzy) : 0,
				}
				this.id = row.id
				this.bwxx_id = row.id
				this.sjwxhwzlData = row.wxhwzl ? JSON.parse(row.wxhwzl) : []
				this.modeType = 2;
				this.showBwxxModel = true
			},
			bwxxModelChange(status) {
				if(!status) {
					this.bwxxForm = {
						bwmc: '',
						kbdw: '',
						sfkzyjzy: 0,
					}
					this.sjwxhwzlData = []
				}
			},
			async removeBwxx(row) {
				let { status_code } = await api.deleteBwxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getBwxxList()
			},
			async saveBwxx() {
				let params = {
					...this.bwxxForm,
					wxhwzl: this.sjwxhwzlData.length > 0 ? JSON.stringify(this.sjwxhwzlData) : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addBwxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showBwxxModel = false
					this.getBwxxList()
				}
			},
			handleChangeCcssPage(val) {
				this.ccssPage.pageIndex = val
				this.getCcssList()
			},
			handleChangeCcssPageSize(val) {
				this.ccssPage.pageSize = val
				this.getCcssList()
			},
			async getCcssList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccssPage.pageSize,
					page: this.ccssPage.pageIndex,
				}
				let { status_code, data } = await api.getCcssList(params)
				if(status_code == 200) {
					this.ccssData = data.data
					this.ccssPage.totalRow = data.total
				}
			},
			async openCcssModel() {
				if(this.fclxList.length == 0) {
					let { status_code, data } = await api.getFclxList()
					if(status_code == 200) {
						this.fclxList = []
						for(let key in data) {
							let item = {
								value: key,
			                    label: key,
							}
							item.children = data[key].map(item_ => {
								return {
									value: item_,
			                    	label: item_,
								}
							})
							this.fclxList.push(item)
						}
						// this.fclxList
					}
				}
				this.modeType = 1;
				this.showCcssModel = true
			},
			async editCcssModel(row) {
				this.ccssForm = {
					ccssdymc: row.ccssdymc,
					lx: row.lx,
					ccwd: row.ccwd ? Number(row.ccwd) : 0,
					zdwxy: row.zdwxy,
					tysj: row.tysj ? new Date(row.tysj) : '',
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
					dtfw: row.dtfw,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.ccss_id = row.id
				this.sjwxhwzlData = row.wxhxp ? JSON.parse(row.wxhxp) : []
				this.modeType = 2;
				this.showCcssModel = true
				this.getGqscList();
			},
			ccssModelChange(status) {
				if(!status) {
					this.ccssForm = {
						ccssdymc: '',
						lx: '',
						ccwd: 0,
						zdwxy: '',
						tysj: '',
						lngAndLat: '',
						dtfw: '',
						dqzt: ''
					}
					this.sjwxhwzlData = []
				}
			},
			async removeCcss(row) {
				let { status_code } = await api.deleteCcssInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCcssList()
			},
			async saveCcss() {
				let params = {
					...this.ccssForm,
					tysj: this.ccssForm.tysj ? getDate(new Date(this.ccssForm.tysj).getTime(), 'date') : '',
					wxhxp: this.sjwxhwzlData.length > 0 ? JSON.stringify(this.sjwxhwzlData) : '',
					jd: this.ccssForm.lngAndLat.split(' ')[0],
					wd: this.ccssForm.lngAndLat.split(' ')[1],
					gkdx_id: this.gkdx_id
				}
				delete params.isWxgy
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addCcssInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showCcssModel = false
					this.getCcssList()
				}
			},
			handleWxhwzl(row) {
				if(row.wxhwzl) {
					let list = JSON.parse(row.wxhwzl)
					console.log(list)
					return list.map(item => item.wxhwmc).join(',')
				}else {
					return '--'
				}
				
			},
			openSjwxhwzlModel() {
				this.modeType2 = 1;
				this.showSjwxhwzlModel = true
			},
			editSjwxhwzlModel(row, index) {
				this.sjwxhwzlForm = {
					wxhwmc: row.cplb,
					zdnzzl: row.zdnzzl ? Number(row.zdnzzl) : 0,
					jyyrpjzz: row.jyyrpjzz ? Number(row.jyyrpjzz) : 0,
					tbsj: row.tbsj ? new Date(row.tbsj) : '',
				}
				this.sjwxhwzlId = index
				this.modeType2 = 2;
				this.showSjwxhwzlModel = true
			},
			sjwxhwzlModelChange(status) {
				if(!status) {
					this.sjwxhwzlForm = {
						wxhwmc: '',
						zdnzzl: 0,
						jyyrpjzz: 0,
						tbsj: '',
					}
				}
			},
			async saveSjwxhwzl() {
				let sjwxhwzlForm = {...this.sjwxhwzlForm, tbsj: this.sjwxhwzlForm.tbsj ? getDate(new Date(this.sjwxhwzlForm.tbsj).getTime(), 'date') : '',}
				if(this.modeType2 == 2) {
					this.sjwxhwzlData.splice(this.sjwxhwzlId, 1, sjwxhwzlForm)
				}else {
					this.sjwxhwzlData.push(sjwxhwzlForm)
				}
				this.showSjwxhwzlModel = false
			},
			removeSjwxhwzl(index) {
				this.sjwxhwzlData.splice(index, 1)
			},
			handleChangeCcxxwhPage(val) {
				this.ccxxwhPage.pageIndex = val
				this.getCcxxwhList()
			},
			handleChangeCcxxwhPageSize(val) {
				this.ccxxwhPage.pageSize = val
				this.getCcxxwhList()
			},
			async getCcxxwhList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccxxwhPage.pageSize,
					page: this.ccxxwhPage.pageIndex,
				}
				let { status_code, data } = await api.getCcxxwhList(params)
				if(status_code == 200) {
					this.ccxxwhData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.ccxxwhPage.totalRow = data.total
				}
			},
			openCcxxwhModel() {
				this.modeType = 1;
				this.showCcxxwhModel = true
			},
			editCcxxwhModel(row) {
				this.ccxxwhForm = {
					rqmc: row.rqmc,
					rj: row.rj ? Number(row.rj) : 0,
					sl: row.sl ? Number(row.sl) : 0,
					wxhwmc: row.wxhwmc,
					ccl: row.ccl ? Number(row.ccl) : 0
				}
				this.id = row.id
				this.modeType = 2;
				this.showCcxxwhModel = true
			},
			ccxxwhModelChange(status) {
				if(!status) {
					this.ccxxwhForm = {
						rqmc: '',
						rj: 0,
						sl: 0,
						wxhwmc: '',
						ccl: 0
					}
				}
			},
			async removeCcxxwh(row) {
				let { status_code } = await api.deleteCcxxwhInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getCcxxwhList()
			},
			async saveCcxxwh() {
				let params = {
					...this.ccxxwhForm,
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addCcxxwhInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showCcxxwhModel = false
					this.getCcxxwhList()
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