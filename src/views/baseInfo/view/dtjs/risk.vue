<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="地铁建设站点信息" name="name1">
						    <part-title text="地铁建设站点信息" :btns="['add']" @add="openDtjszdxxModel"></part-title>
							<Table :columns="dtjszdxxColumns" :data="dtjszdxxData">
								<template slot-scope="{ row }" slot="sfhc">
						            <span>{{row.sfhc == 1 ? '是' : '否'}}</span>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editDtjszdxxModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeDtjszdxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="dtjszdxxPage.pageSize"
				                    :total="dtjszdxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeDtjszdxxPage"
				                    @on-page-size-change="handleChangeDtjszdxxPageSize"
				                />
							</Row>
							<Row type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo1">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="地铁建设区间信息" name="name3">
				        	<part-title text="地铁建设区间信息" :btns="['add']" @add="openDtjsqjxxModel"></part-title>
							<Table :columns="dtjsqjxxColumns" :data="dtjsqjxxData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editDtjsqjxxModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeDtjsqjxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="dtjsqjxxPage.pageSize"
				                    :total="dtjsqjxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeDtjsqjxxPage"
				                    @on-page-size-change="handleChangeDtjsqjxxPageSize"
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}地铁建设站点信息`" v-model="showDtjszdxxModel" @on-visible-change="dtjszdxxModelChange">
			<div style="max-height: 600px; overflow-y: scroll;">
				<Form :model="dtjszdxxForm" label-position="left" :label-width="210">
					<FormItem label="车站名称">
			        	<Input clearable v-model="dtjszdxxForm.czmc"></Input>
			        </FormItem>
			        <FormItem label="地址">
			        	<Input clearable v-model="dtjszdxxForm.dz"></Input>
			        </FormItem>	
			        <FormItem label="经纬度">
			        	<lng :lngAndLat.sync="dtjszdxxForm.lngAndLat"></lng>
			        </FormItem>	
			        <FormItem label="是否换乘" prop="sfhc">
			            <Select clearable v-model="dtjszdxxForm.sfhc" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="换乘线路">
			        	<Input v-model="dtjszdxxForm.hcxl"></Input>
			        </FormItem>	
			        <FormItem label="主体结构形式">
			        	<Input v-model="dtjszdxxForm.ztjgxs"></Input>
			        </FormItem>	
			        <FormItem label="施工方法">
			        	<Input v-model="dtjszdxxForm.sgff"></Input>
			        </FormItem>	
			        <FormItem label="围护结构形式">
			        	<Input v-model="dtjszdxxForm.whjgxs"></Input>
			        </FormItem>	
			        <FormItem label="基坑宽度（m）">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.jkkd"></InputNumber>
			        </FormItem>
			        <FormItem label="基坑深度（m）">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.jksd"></InputNumber>
			        </FormItem>
			        <FormItem label="自身风险Ⅰ级数量">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.zsfx1"></InputNumber>
			        </FormItem>
			        <FormItem label="自身风险II级数量">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.zsfx2"></InputNumber>
			        </FormItem>
			        <FormItem label="自身风险ⅠII级数量">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.zsfx3"></InputNumber>
			        </FormItem>
			        <FormItem label="自身风险ⅠV级数量">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.zsfx4"></InputNumber>
			        </FormItem>
			        <FormItem label="环境风险Ⅰ级数量">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.hjfx1"></InputNumber>
			        </FormItem>
			        <FormItem label="环境风险II级数量">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.hjfx2"></InputNumber>
			        </FormItem>
			        <FormItem label="环境风险ⅠII级数量">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.hjfx3"></InputNumber>
			        </FormItem>
			        <FormItem label="环境风险ⅠV级数量">
			        	<InputNumber :min="0" v-model="dtjszdxxForm.hjfx4"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showDtjszdxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveDtjszdxx">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}地铁建设区间信息`" v-model="showDtjsqjxxModel"  @on-visible-change="dtjsqjxxModelChange">
			<div style="max-height: 600px; overflow-y: scroll;">
				<Form :model="dtjsqjxxForm" label-position="left" :label-width="140">
					<FormItem label="区间">
			        	<Input clearable v-model="dtjsqjxxForm.qj"></Input>
			        </FormItem>
			        <FormItem label="双线长度（m）">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.sxcd"></InputNumber>
			        </FormItem>
			        <FormItem label="隧道底埋深（m）">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.sddms"></InputNumber>
			        </FormItem>
			        <FormItem label="结构形式">
			        	<Input v-model="dtjsqjxxForm.jgxs"></Input>
			        </FormItem>	
			        <FormItem label="施工方法">
			        	<Input v-model="dtjsqjxxForm.sgff"></Input>
			        </FormItem>	
			        <FormItem label="自身风险Ⅰ级数量">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.zsfx1"></InputNumber>
			        </FormItem>
			        <FormItem label="自身风险II级数量">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.zsfx2"></InputNumber>
			        </FormItem>
			        <FormItem label="自身风险ⅠII级数量">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.zsfx3"></InputNumber>
			        </FormItem>
			        <FormItem label="自身风险ⅠV级数量">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.zsfx4"></InputNumber>
			        </FormItem>
			        <FormItem label="环境风险Ⅰ级数量">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.hjfx1"></InputNumber>
			        </FormItem>
			        <FormItem label="环境风险II级数量">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.hjfx2"></InputNumber>
			        </FormItem>
			        <FormItem label="环境风险ⅠII级数量">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.hjfx3"></InputNumber>
			        </FormItem>
			        <FormItem label="环境风险ⅠV级数量">
			        	<InputNumber :min="0" v-model="dtjsqjxxForm.hjfx4"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveDtjsqjxx">保存</Button>
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
				showDtjszdxxModel: false,
				showDtjsqjxxModel: false,
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
				dtjszdxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.dtjszdxxPage.pageIndex- 1) * this.dtjszdxxPage.pageSize + 1);
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
                        title: '基坑宽度（m）',
                        key: 'jkkd',
                        minWidth: 140,
                    }, {
                        title: '基坑深度（m）',
                        key: 'jksd',
                        minWidth: 140,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				dtjszdxxData: [],
				dtjszdxxForm: {
					czmc: '',
					dz: '',
					lngAndLat: '',
					sfhc: 0,
					hcxl: '',
					ztjgxs: '',
					sgff: '',
					whjgxs: '',
					jkkd: 0,
					jksd: 0,
					zsfx1: 0,
					zsfx2: 0,
					zsfx3: 0,
					zsfx4: 0,
					hjfx1: 0,
					hjfx2: 0,
					hjfx3: 0,
					hjfx4: 0,
				},
				dtjszdxxPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				dtjsqjxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.dtjsqjxxPage.pageIndex- 1) * this.dtjsqjxxPage.pageSize + 1);
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
                        title: '隧道底埋深（m）',
                        key: 'sddms',
                        minWidth: 150,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				dtjsqjxxData: [],
				dtjsqjxxForm: {
					qj: '',
					sxcd: 0,
					sddms: 0,
					jgxs: '',
					sgff: '',
					zsfx1: 0,
					zsfx2: 0,
					zsfx3: 0,
					zsfx4: 0,
					hjfx1: 0,
					hjfx2: 0,
					hjfx3: 0,
					hjfx4: 0,
				},
				fwList: ['东', '南', '西', '北', '东北', '东南', '西北', '西南'],
				mgmblxList: ['医院', '养老院', '学校', '政府机构', '商场', '居住区', '监狱', '宗教', '车站', '码头', '铁路', '公路', '林区', '工厂', '矿山', '河流', '其他'],
				dtjsqjxxPage: {
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
				let dtjszdxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtjszdxxPage.pageSize,
					page: this.dtjszdxxPage.pageIndex,
				}
				let dtjsqjxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtjsqjxxPage.pageSize,
					page: this.dtjsqjxxPage.pageIndex,
				}
				Promise.all([api.getDtjszdxxList(dtjszdxxParams), api.getDtjsqjxxList(dtjsqjxxParams)]).then((result) => {
				  	let dtjszdxxRes = result[0], dtjsqjxxRes = result[1]
				  	if(dtjszdxxRes.status_code == 200) {
				  		this.dtjszdxxData = dtjszdxxRes.data.data
				  		this.dtjszdxxPage.totalRow = dtjszdxxRes.data.total
				  	}
				  	if(dtjsqjxxRes.status_code == 200) {
				  		this.dtjsqjxxData = dtjsqjxxRes.data.data
				  		this.dtjsqjxxPage.totalRow = dtjsqjxxRes.data.total
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
			async getDtjszdxxList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.dtjszdxxPage.pageIndex,
				}
				let { status_code, data } = await api.getDtjszdxxList(params)
				if(status_code == 200) {
					this.dtjszdxxList = data.data
				}
			},
			handleChangeDtjszdxxPage(val) {
				this.dtjszdxxPage.pageIndex = val
				this.getDtjszdxxList()
			},
			handleChangeDtjszdxxPageSize(val) {
				this.dtjszdxxPage.pageSize = val
				this.getDtjszdxxList()
			},
			async getDtjszdxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtjszdxxPage.pageSize,
					page: this.dtjszdxxPage.pageIndex,
				}
				let { status_code, data } = await api.getDtjszdxxList(params)
				if(status_code == 200) {
					this.dtjszdxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.dtjszdxxPage.totalRow = data.total
				}
			},
			openDtjszdxxModel() {
				this.modeType = 1;
				this.showDtjszdxxModel = true
			},
			editDtjszdxxModel(row) {
				this.dtjszdxxForm = {
					czmc: row.czmc,
					dz: row.dz,
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
					sfhc: row.sfhc ? Number(row.sfhc) : 0,
					hcxl: row.hcxl,
					ztjgxs: row.ztjgxs,
					sgff: row.sgff,
					whjgxs: row.whjgxs,
					jkkd: row.jkkd ? Number(row.jkkd) : 0,
					jksd: row.jksd ? Number(row.jksd) : 0,
					zsfx1: row.zsfx1 ? Number(row.zsfx1) : 0,
					zsfx2: row.zsfx2 ? Number(row.zsfx2) : 0,
					zsfx3: row.zsfx3 ? Number(row.zsfx3) : 0,
					zsfx4: row.zsfx4 ? Number(row.zsfx4) : 0,
					hjfx1: row.hjfx1 ? Number(row.hjfx1) : 0,
					hjfx2: row.hjfx2 ? Number(row.hjfx2) : 0,
					hjfx3: row.hjfx3 ? Number(row.hjfx3) : 0,
					hjfx4: row.hjfx4 ? Number(row.hjfx4) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showDtjszdxxModel = true
			},
			dtjszdxxModelChange(status) {
				if(!status) {
					this.dtjszdxxForm = {
						czmc: '',
						dz: '',
						lngAndLat: '',
						sfhc: 0,
						hcxl: '',
						ztjgxs: '',
						sgff: '',
						whjgxs: '',
						jkkd: 0,
						jksd: 0,
						zsfx1: 0,
						zsfx2: 0,
						zsfx3: 0,
						zsfx4: 0,
						hjfx1: 0,
						hjfx2: 0,
						hjfx3: 0,
						hjfx4: 0,
					}
				}
			},
			async removeDtjszdxx(row) {
				let { status_code } = await api.deleteDtjszdxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getDtjszdxxList()
			},
			async saveDtjszdxx() {
				let params = {
					...this.dtjszdxxForm,
					jd: this.dtjszdxxForm.lngAndLat.split(' ')[0],
					wd: this.dtjszdxxForm.lngAndLat.split(' ')[1],
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addDtjszdxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showDtjszdxxModel = false
					this.getDtjszdxxList()
				}
			},	
			handleChangeDtjsqjxxPage(val) {
				this.dtjsqjxxPage.pageIndex = val
				this.getDtjsqjxxList()
			},
			handleChangeDtjsqjxxPageSize(val) {
				this.dtjsqjxxPage.pageSize = val
				this.getDtjsqjxxList()
			},
			async getDtjsqjxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.dtjsqjxxPage.pageSize,
					page: this.dtjsqjxxPage.pageIndex,
				}
				let { status_code, data } = await api.getDtjsqjxxList(params)
				if(status_code == 200) {
					this.dtjsqjxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.dtjsqjxxPage.totalRow = data.total
				}
			},
			openDtjsqjxxModel() {
				this.modeType = 1;
				this.showDtjsqjxxModel = true
			},
			editDtjsqjxxModel(row) {
				this.dtjsqjxxForm = {
					qj: row.qj,
					sxcd: row.sxcd ? Number(row.sxcd) : 0,
					sddms: row.sddms ? Number(row.sddms) : 0,
					jgxs: row.jgxs,
					sgff: row.sgff,
					zsfx1: row.zsfx1 ? Number(row.zsfx1) : 0,
					zsfx2: row.zsfx2 ? Number(row.zsfx2) : 0,
					zsfx3: row.zsfx3 ? Number(row.zsfx3) : 0,
					zsfx4: row.zsfx4 ? Number(row.zsfx4) : 0,
					hjfx1: row.hjfx1 ? Number(row.hjfx1) : 0,
					hjfx2: row.hjfx2 ? Number(row.hjfx2) : 0,
					hjfx3: row.hjfx3 ? Number(row.hjfx3) : 0,
					hjfx4: row.hjfx4 ? Number(row.hjfx4) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showDtjsqjxxModel = true
			},
			dtjsqjxxModelChange(status) {
				if(!status) {
					this.dtjsqjxxForm = {
						qj: '',
						sxcd: 0,
						sddms: 0,
						jgxs: '',
						sgff: '',
						zsfx1: 0,
						zsfx2: 0,
						zsfx3: 0,
						zsfx4: 0,
						hjfx1: 0,
						hjfx2: 0,
						hjfx3: 0,
						hjfx4: 0,
					}
				}
			},
			async removeDtjsqjxx(row) {
				let { status_code } = await api.deleteDtjsqjxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getDtjsqjxxList()
			},
			async saveDtjsqjxx() {
				let params = {
					...this.dtjsqjxxForm,
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addDtjsqjxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showDtjsqjxxModel = false
					this.getDtjsqjxxList()
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