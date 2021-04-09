<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="匝道信息" name="name1">
						    <part-title text="匝道信息" :btns="['add']" @add="openZdxxModel"></part-title>
							<Table :columns="zdxxColumns" :data="zdxxData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editZdxxModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeZdxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="zdxxPage.pageSize"
				                    :total="zdxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeZdxxPage"
				                    @on-page-size-change="handleChangeZdxxPageSize"
				                />
							</Row>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}匝道信息`" v-model="showZdxxModel" @on-visible-change="zdxxModelChange">
			<div>
				<Form :model="zdxxForm" label-position="left" :label-width="210">
			        <FormItem label="匝道段名称">
			        	<Input clearable v-model="zdxxForm.zddmc"></Input>
			        </FormItem>
			        <FormItem label="匝道车道数">
			        	<Input clearable v-model="zdxxForm.zdcds"></Input>
			        </FormItem>
					<FormItem label="路基宽度（m）">
			        	<InputNumber :min="0" v-model="zdxxForm.ljkd"></InputNumber>
			        </FormItem>	
			        <FormItem label="设计速度（km/h）">
			        	<InputNumber :min="0" v-model="zdxxForm.sjsd"></InputNumber>
			        </FormItem>	
			        <FormItem label="转弯半径（m）">
			        	<InputNumber :min="0" v-model="zdxxForm.zwbj"></InputNumber>
			        </FormItem>	
			        <FormItem label="最大纵坡（%）">
			        	<InputNumber :min="0" v-model="zdxxForm.zdzp"></InputNumber>
			        </FormItem>	
			        <FormItem label="坡长（m）">
			        	<InputNumber :min="0" v-model="zdxxForm.pc"></InputNumber>
			        </FormItem>	
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showZdxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveZdxx">保存</Button>
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
				showZdxxModel: false,
				showRimModel: false,
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
				zdxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.zdxxPage.pageIndex- 1) * this.zdxxPage.pageSize + 1);
				        },
                    }, {
                        title: '匝道段名称',
                        key: 'zddmc',
                        minWidth: 120,
                    }, {
                        title: '匝道车道数',
                        key: 'zdcds',
                        minWidth: 120,
                    }, {
                        title: '路基宽度（m）',
                        key: 'ljkd',
                        minWidth: 140,
                    }, {
                        title: '设计速度（km/h）',
                        key: 'sjsd',
                        minWidth: 200,
                    }, {
                        title: '转弯半径（m）',
                        key: 'zwbj',
                        minWidth: 140,
                    }, {
                        title: '最大纵坡（%）',
                        key: 'zdzp',
                        minWidth: 140,
                    }, {
                        title: '坡长（m）',
                        key: 'pc',
                        minWidth: 120,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				zdxxData: [],
				zdxxForm: {
					zddmc: '',
					zdcds: '',
					ljkd: 0,
					sjsd: 0,
					zwbj: 0,
					zdzp: 0,
					pc: 0,
				},
				zdxxPage: {
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
				            return h('span',params.index + (this.rimPage.pageIndex- 1) * this.rimPage.pageSize + 1);
				        }
                    }, {
                        title: '敏感目标名称',
                        key: 'mgmbmc',
                        minWidth: 120
                    }, {
                        title: '方位',
                        key: 'fw',
                        minWidth: 80
                    }, {
                        title: '目标类型',
                        key: 'mgmblx',
                        minWidth: 100
                    }, {
                        title: '人员数量',
                        key: 'rysl',
                        minWidth: 100
                    },{
                        title: '操作',
                        fixed: 'right',
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
				fwList: ['东', '南', '西', '北', '东北', '东南', '西北', '西南'],
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
			async getBaseInfo() {
				this.loading = true
				let zdxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.zdxxPage.pageSize,
					page: this.zdxxPage.pageIndex,
				}
				Promise.all([api.getZdxxList(zdxxParams)]).then((result) => {
				  	let zdxxRes = result[0], rimRes = result[1]
				  	if(zdxxRes.status_code == 200) {
				  		this.zdxxData = zdxxRes.data.data
				  		this.zdxxPage.totalRow = zdxxRes.data.total
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
			async getZdxxList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.zdxxPage.pageIndex,
				}
				let { status_code, data } = await api.getZdxxList(params)
				if(status_code == 200) {
					this.zdxxList = data.data
				}
			},
			handleChangeZdxxPage(val) {
				this.zdxxPage.pageIndex = val
				this.getZdxxList()
			},
			handleChangeZdxxPageSize(val) {
				this.zdxxPage.pageSize = val
				this.getZdxxList()
			},
			async getZdxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.zdxxPage.pageSize,
					page: this.zdxxPage.pageIndex,
				}
				let { status_code, data } = await api.getZdxxList(params)
				if(status_code == 200) {
					this.zdxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.zdxxPage.totalRow = data.total
				}
			},
			openZdxxModel() {
				this.modeType = 1;
				this.showZdxxModel = true
			},
			editZdxxModel(row) {
				this.zdxxForm = {
					zddmc: row.zddmc,
					zdcds: row.zdcds,
					ljkd: row.ljkd ? Number(row.ljkd) : 0,
					sjsd: row.sjsd ? Number(row.sjsd) : 0,
					zwbj: row.zwbj ? Number(row.zwbj) : 0,
					zdzp: row.zdzp ? Number(row.zdzp) : 0,
					pc: row.pc ? Number(row.pc) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showZdxxModel = true
			},
			zdxxModelChange(status) {
				if(!status) {
					this.zdxxForm = {
						zddmc: '',
						zdcds: '',
						ljkd: 0,
						sjsd: 0,
						zwbj: 0,
						zdzp: 0,
						pc: 0,
					}
				}
			},
			async removeZdxx(row) {
				let { status_code } = await api.deleteZdxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getZdxxList()
			},
			async saveZdxx() {
				let params = {
					...this.zdxxForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addZdxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showZdxxModel = false
					this.getZdxxList()
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
		height: 100%;
		margin-bottom: 24px;
		.line {
			width: 100%;
			height: 10px;
			background: #f5f5f5;
		}
	}
</style>