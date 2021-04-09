<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="人员信息" name="name1">
							<part-title text="人员信息"></part-title>
							<Row type="flex" justify="end">
								<Col span="23">
					                <part-title text="工作负荷" :btns="['add']" @add="openGzfhModel"></part-title>
									<Table :columns="gzfhColumns" :data="gzfhData">
										<template slot-scope="{ row }" slot="name">
								            <span class="link">{{row.name}}</span>
								        </template>
										<template slot-scope="{ row }" slot="action">
								            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editGzfhModel(row)">编辑</Button>
								            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeGzfh(row)">
										        <Button type="error" size="small" ghost>删除</Button>
										    </Poptip>
								        </template>
									</Table>
									<part-title text="收住对象" :btns="['add']" @add="openSzdxModel"></part-title>
									<Table :columns="szdxColumns" :data="szdxData">
										<template slot-scope="{ row }" slot="name">
								            <span class="link">{{row.name}}</span>
								        </template>
										<template slot-scope="{ row }" slot="action">
								            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editSzdxModel(row)">编辑</Button>
								            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSzdx(row)">
										        <Button type="error" size="small" ghost>删除</Button>
										    </Poptip>
								        </template>
									</Table>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="场所危险性" name="name2">
							<part-title text="场所危险性"></part-title>
							<Form :disabled="isDisEditInfo" :model="mostForm" label-position="left" inline :label-width="100">
						        <FormItem label="消防重点单位" style="margin-right: 120px">
						            <Select clearable v-model="mostForm.xfzddw" placeholder="请选择">
						                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
						        <FormItem label="火灾高危单位" style="margin-right: 120px">
						            <Select clearable v-model="mostForm.hzgwdw" placeholder="请选择">
						                <Option v-for="item in xfzddwList" :key="item.value" :value="item.value">{{item.name}}</Option>
						            </Select>
						        </FormItem>
							</Form>
							<Row v-show="!isDisEditInfo" type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				    </Tabs>
				</Col>	
			</Row>	
		</div>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}工作负荷`" v-model="showGzfhModel" @on-visible-change="gzfhModelChange">
			<div>
				<Form :model="gzfhForm" ref="gzfh" :rules="gzfhRules" hide-required-mark label-position="left" :label-width="120">
					<FormItem label="从业人数" prop="cyrs">
			            <InputNumber :min="0" v-model="gzfhForm.cyrs"></InputNumber>
			        </FormItem>
			        <FormItem label="核定床位数" prop="hdcws">
			            <InputNumber :min="0" v-model="gzfhForm.hdcws"></InputNumber>
			        </FormItem>
			        <FormItem label="入住人数" prop="rzrs">
			            <InputNumber :min="0" v-model="gzfhForm.rzrs"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			        	<DatePicker type="date" v-model="gzfhForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showGzfhModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="gzfhLoading" @click="saveGzfh">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}收住对象`" v-model="showSzdxModel" @on-visible-change="szdxModelChange">
			<div>
				<Form :model="szdxForm" ref="szdx" :rules="szdxRules" hide-required-mark label-position="left" :label-width="120">
			        <FormItem label="自理型人数" prop="zlxrs">
			            <InputNumber :min="0" v-model="szdxForm.zlxrs"></InputNumber>
			        </FormItem>
					<FormItem label="护理型人数" prop="hlxrs">
			            <InputNumber :min="0" v-model="szdxForm.hlxrs"></InputNumber>
			        </FormItem>
			        <FormItem label="填报时间" prop="tbsj">
			        	<DatePicker type="date" v-model="szdxForm.tbsj"  placeholder="请选择"></DatePicker>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showSzdxModel = false">取消</Button> -->
		        <Button type="primary" size="large" :loading="szdxLoading" @click="saveSzdx">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>	
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import tablejs from '@/common/js/table'
	import { getDate } from '@/utils/tool'

	const levelChildren = [
		{
			value: 1, 
			label: '甲'
		}, {
			value: 2, 
			label: '乙'
		}, {
			value: 3, 
			label: '丙'
		}
	]

	export default {
		name: '',
		mixins: [tablejs],
		components: { partTitle },
		data() {
			return {
				step: 2,	
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				id: '',
				showAreaModel: false,
				showLngModel: false,
				showGzfhModel: false,
				showSzdxModel: false,
				showRiskLiauidModel: false,
				showXfModel: false,
				showMainRiskModel: false,
				showSpecialModel: false,
				gzfhLoading: false,
				szdxLoading: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					name: '',
					type: '',
					code: '',
					status: '',
					time: '',
					isIndustrialPark: false,
					industrialParkName: '',
					employees: null,
					manage: null,
					area: [],
					regArea: [],
					address: '',
					szdxType: []
				},
				addressInfo: {
					prodArea: '',
					prodAddress: '',
					area: '',
					lngAndLat: '',
					areaNum: '',
					buildNum: 0,	
				},
				contactInfo: {
					principalName: '',
					principalPhone: '',
					safeName: '',
					safePhone: '',
					managerName: '',
					managerPhone: '',
					managerEmail: ''
				},
				mostForm: {
					max: 0,
					average: 0
				},
				area: '',
				lng: '',
				lat: '',
				xfzddwList: [
					{
						value: 0,
						name: '否'
					}, {
						value: 1,
						name: '是'
					}
				],
				areaList: [],
				gzfhColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.gzfhPage.pageIndex- 1) * this.gzfhPage.pageSize + 1);
				        }
                    }, {
                        title: '从业人数',
                        key: 'cyrs',
                        minWidth: 100
                    }, {
                        title: '核定床位数',
                        key: 'hdcws',
                        minWidth: 110
                    }, {
                        title: '入住人数',
                        key: 'rzrs',
                        minWidth: 100
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
				gzfhData: [],
				gzfhForm: {
					cyrs: 0,
					hdcws: 0,
					rzrs: 0,
					tbsj: ''
				},
				gzfhPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				szdxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.szdxPage.pageIndex- 1) * this.szdxPage.pageSize + 1);
				        }
                    }, {
                        title: '自理型人数',
                        key: 'zlxrs',
                        minWidth: 110
                    }, {
                        title: '护理型人数',
                        key: 'hlxrs',
                        minWidth: 110
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
				szdxData: [],
				szdxForm: {
					zlxrs: 0,
					hlxrs: 0,
					tbsj: ''
				},
				szdxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				mostForm: {
					xfzddw: '',
					hzgwdw: ''
				},
			}
		},
		watch: {

		},
		computed: {
			gzfhRules() {
				return {
					cyrs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					hdcws: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					rzrs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
			szdxRules() {
				return {	
					zlxrs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					hlxrs: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
					tbsj: [{ required: true, type: 'date', message: '请选择', trigger: 'change' }],
				}
			},
		},
		methods: {
			async getBaseInfo() {
				this.loading = true
				let gzfhParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.gzfhPage.pageSize,
					page: this.gzfhPage.pageIndex,
				}
				let szdxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.szdxPage.pageSize,
					page: this.szdxPage.pageIndex,
				}
				Promise.all([api.getGzfhItemList(gzfhParams), api.getSzdxItemList(szdxParams), api.getNursBase(this.gkdx_id)]).then((result) => {
				  	let gzfhRes = result[0], szdxRes = result[1];
				  	if(gzfhRes.status_code == 200) {
				  		this.gzfhData = gzfhRes.data.data
				  		this.gzfhNum = gzfhRes.data.yxzt
				  		this.gzfhPage.totalRow = gzfhRes.data.total
				  	}
				  	if(szdxRes.status_code == 200) {
				  		this.szdxData = szdxRes.data.data
				  		this.szdxNum = szdxRes.data.jb
				  		this.szdxPage.totalRow = szdxRes.data.total
				  	}
				  	this.form = result[2].data
				  	let { xfzddw, hzgwdw} = this.form
				  	this.mostForm = { xfzddw, hzgwdw }
				  	this.loading = false   
				}).catch((error) => {
				  	console.log(error)
				  	this.loading = false
				})
			},
			async saveInfo() {
				let params = {
					gkdx_id: this.form.gkdx_id,
					...this.mostForm
				}
				let { status_code, message } = await api.addNursBase(params);
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
			                color: "blue", weight: 3, opacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0.5
			            };
			            //创建标注工具对象
			            this.polygonTool = new T.PolygonTool(this.map, config);
		            });
				})
			},
			openArea() {
				this.polygonTool.open();
				this.polygonTool.addEventListener('draw', (e) => {
					// 获取绘制的多边形信息
					console.log(e);
				})
			},
			saveArea() {

			},
			openLngModal() {
				this.showLngModel = true;
				this.$nextTick(() => {
					let self = this;
					let lo = new BMap.Geolocation();
		            lo.getCurrentPosition((e) => {
	                    this.lng = e.point.lng.toFixed(1);
	                    this.lat = e.point.lat.toFixed(1);
						this.map = new T.Map('lng_box');
	                    let marker = new T.Marker(e.lnglat);
	                    this.map.addOverLay(marker);
						this.map.centerAndZoom(new T.LngLat(e.point.lng, e.point.lat), 10);
						marker.enableDragging();
						marker.addEventListener('mouseup', (e) => {
							console.log(e.lnglat.getLng() + "," + e.lnglat.getLat());
							this.lng = e.lnglat.getLng().toFixed(1);
	                    	this.lat = e.lnglat.getLat().toFixed(1);
						})
		            });
				})
			},
			saveLng() {
				this.addressInfo.lngAndLat = `${this.lng} ${this.lat}`
				this.showLngModel = false
				this.$nextTick(() => {
					this.map = null;
					this.lng = '';
					this.lat = ''
				})
			},
			handleChangeGzfhPage(val) {
				this.gzfhPage.pageIndex = val
				this.getGzfhItemList()
			},
			handleChangeGzfhPageSize(val) {
				this.gzfhPage.pageSize = val
				this.getGzfhItemList()
			},
			gzfhModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.gzfhForm = {
							cyrs: 0,
							hdcws: 0,
							rzrs: 0,
							tbsj: ''
						}
						this.$refs.gzfh.resetFields();
					})
				}
			},
			async getGzfhItemList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.gzfhPage.pageSize,
					page: this.gzfhPage.pageIndex,
				}
				let { status_code, data } = await api.getGzfhItemList(params)
				if(status_code == 200) {
					this.gzfhData = data.data
					this.gzfhPage.totalRow = data.total
				}
			},
			openGzfhModel() {
				this.modeType = 1;
				this.showGzfhModel = true
			},
			editGzfhModel(row) {
				this.gzfhForm = {
					cyrs: row.cyrs,
					hdcws: row.hdcws,
					rzrs: row.rzrs,
					tbsj: row.tbsj ? new Date(row.tbsj) : ''
				}
				this.id = row.id
				this.modeType = 2;
				this.showGzfhModel = true
			},
			async removeGzfh(row) {
				let { status_code } = await api.deleteGzfhItem(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getGzfhItemList()
			},
			async saveGzfh() {
				this.$refs.gzfh.validate(async valid => {
                    if (valid) {
                    	this.gzfhLoading = true
						let params = {
							...this.gzfhForm,
							tbsj: this.gzfhForm.tbsj ? getDate(new Date(this.gzfhForm.tbsj).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addGzfhItem(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showGzfhModel = false
							this.getGzfhItemList()
						}
							this.gzfhLoading = false
                    }
                })
			},
			handleChangeSzdxPage(val) {
				this.szdxPage.pageIndex = val
				this.getSzdxItemList()
			},
			handleChangeSzdxPageSize(val) {
				this.szdxPage.pageSize = val
				this.getSzdxItemList()
			},
			szdxModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.szdxForm = {
							zlxrs: 0,
							hlxrs: 0,
							tbsj: ''
						}
						this.$refs.szdx.resetFields();
					})
				}
			},
			async getSzdxItemList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.szdxPage.pageSize,
					page: this.szdxPage.pageIndex,
				}
				let { status_code, data } = await api.getSzdxItemList(params)
				if(status_code == 200) {
					this.szdxData = data.data
					this.szdxPage.totalRow = data.total
				}
			},
			openSzdxModel() {
				this.modeType = 1;
				this.showSzdxModel = true
			},
			editSzdxModel(row) {
				this.szdxForm = {
					zlxrs: row.zlxrs,
					zlxrs: row.zlxrs,
					tbsj: row.tbsj ? new Date(row.tbsj) : ''
				}
				this.id = row.id
				this.modeType = 2;
				this.showSzdxModel = true
			},
			async removeSzdx(row) {
				let { status_code } = await api.deleteSzdxItem(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getSzdxItemList()
			},
			async saveSzdx() {
				this.$refs.szdx.validate(async valid => {
                    if (valid) {
                    	this.szdxLoading = true
						let params = {
							...this.szdxForm,
							tbsj: this.szdxForm.tbsj ? getDate(new Date(this.szdxForm.tbsj).getTime(), 'date') : '',
							gkdx_id: this.gkdx_id
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						let { status_code, message } = await api.addSzdxItem(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showSzdxModel = false
							this.getSzdxItemList()
						}
							this.szdxLoading = false
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

<style lang="less" scoped>
	.page {
		margin-bottom: 24px;
		.line {
			width: 100%;
			height: 10px;
			background: #f5f5f5;
		}
	}
	.tip {
		margin-bottom: 8px;
		color: #f92828;
	}
	.num_box {
		margin-bottom: 8px;
	}
</style>