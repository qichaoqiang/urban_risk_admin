<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center" style="height: 100%">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="水上货运船舶信息" name="name1">
						    <part-title text="水上货运船舶信息" :btns="['add']" @add="openSshycbxxModel"></part-title>
							<Table :columns="sshycbxxColumns" :data="sshycbxxData">
								<template slot-scope="{ row }" slot="sfhc">
						            <span>{{row.sfhc == 1 ? '是' : '否'}}</span>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editSshycbxxModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSshycbxx(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="sshycbxxPage.pageSize"
				                    :total="sshycbxxPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeSshycbxxPage"
				                    @on-page-size-change="handleChangeSshycbxxPageSize"
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}水上货运船舶信息`" v-model="showSshycbxxModel" @on-visible-change="sshycbxxModelChange">
			<div style="max-height: 600px; overflow-y: scroll;">
				<Form :model="sshycbxxForm" label-position="left" :label-width="210">
					<FormItem label="船名">
			        	<Input clearable v-model="sshycbxxForm.cm"></Input>
			        </FormItem>
			        <FormItem label="船龄（年份）">
			        	<InputNumber :min="0" v-model="sshycbxxForm.cl"></InputNumber>
			            <!-- <DatePicker type="date" v-model="sshycbxxForm.cl"  placeholder="请选择"></DatePicker> -->
			        </FormItem>
			        <FormItem label="辖区">
			        	<Input clearable v-model="sshycbxxForm.xq"></Input>
			        </FormItem>	
			        <FormItem label="航区">
			        	<Input clearable v-model="sshycbxxForm.hq"></Input>
			        </FormItem>	
			        <FormItem label="船舶类型">
			        	<Input v-model="sshycbxxForm.cblx"></Input>
			        </FormItem>	
			        <FormItem label="货物种类">
			        	<Input v-model="sshycbxxForm.hwzl"></Input>
			        </FormItem>	
			        <FormItem label="总吨">
			        	<InputNumber :min="0" v-model="sshycbxxForm.zd"></InputNumber>
			        </FormItem>
			        <FormItem label="载重吨">
			        	<InputNumber :min="0" v-model="sshycbxxForm.zzd"></InputNumber>
			        </FormItem>
			        <FormItem label="航线通航环境">
			        	<Input type="textarea" v-model="sshycbxxForm.hxthhj"></Input>
			        </FormItem>	
			        <FormItem label="水文气象预警">
			        	<Input type="textarea" v-model="sshycbxxForm.swqxyj"></Input>
			        </FormItem>	
			        <FormItem label="功率">
			        	<InputNumber :min="0" v-model="sshycbxxForm.gl"></InputNumber>
			        </FormItem>
			        <FormItem label="主尺寸">
			        	<Input v-model="sshycbxxForm.zcc"></Input>
			        </FormItem>
			        <FormItem label="航线许可范围">
			        	<Input type="textarea" v-model="sshycbxxForm.hxxkfw"></Input>
			        </FormItem>	
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showSshycbxxModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveSshycbxx">保存</Button>
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
				showSshycbxxModel: false,
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
				sshycbxxColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.sshycbxxPage.pageIndex- 1) * this.sshycbxxPage.pageSize + 1);
				        },
                    }, {
                        title: '船名',
                        key: 'cm',
                        minWidth: 120,
                    }, {
                        title: '船龄（年份）',
                        key: 'cl',
                        minWidth: 130,
                    }, {
                        title: '辖区',
                        key: 'xq',
                        minWidth: 120,
                    }, {
                        title: '航区',
                        key: 'hq',
                        minWidth: 120,
                    }, {
                        title: '船舶类型',
                        key: 'cblx',
                        minWidth: 120,
                    }, {
                        title: '总吨',
                        key: 'zd',
                        minWidth: 120,
                    }, {
                        title: '载重吨',
                        key: 'zzd',
                        minWidth: 120,
                    }, {
                        title: '功率',
                        key: 'gl',
                        minWidth: 120,
                    }, {
                        title: '主尺寸',
                        key: 'zcc',
                        minWidth: 120,
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sshycbxxData: [],
				sshycbxxForm: {
					cm: '',
					cl: 0,
					xq: '',
					hq: '',
					cblx: '',
					hwzl: '',
					zd: 0,
					zzd: 0,
					sgff: '',
					whjgxs: '',
					gl: 0,
					zcc: '',
					hxxkfw: '',
					hxthhj: '',
					swqxyj: ''
				},
				sshycbxxPage: {
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
				let sshycbxxParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.sshycbxxPage.pageSize,
					page: this.sshycbxxPage.pageIndex,
				}
				Promise.all([api.getSshycbxxList(sshycbxxParams)]).then((result) => {
				  	let sshycbxxRes = result[0], dtjsqjxxRes = result[1]
				  	if(sshycbxxRes.status_code == 200) {
				  		this.sshycbxxData = sshycbxxRes.data.data
				  		this.sshycbxxPage.totalRow = sshycbxxRes.data.total
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
			async getSshycbxxList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.sshycbxxPage.pageIndex,
				}
				let { status_code, data } = await api.getSshycbxxList(params)
				if(status_code == 200) {
					this.sshycbxxList = data.data
				}
			},
			handleChangeSshycbxxPage(val) {
				this.sshycbxxPage.pageIndex = val
				this.getSshycbxxList()
			},
			handleChangeSshycbxxPageSize(val) {
				this.sshycbxxPage.pageSize = val
				this.getSshycbxxList()
			},
			async getSshycbxxList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.sshycbxxPage.pageSize,
					page: this.sshycbxxPage.pageIndex,
				}
				let { status_code, data } = await api.getSshycbxxList(params)
				if(status_code == 200) {
					this.sshycbxxData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.sshycbxxPage.totalRow = data.total
				}
			},
			openSshycbxxModel() {
				this.modeType = 1;
				this.showSshycbxxModel = true
			},
			editSshycbxxModel(row) {
				this.sshycbxxForm = {
					cm: row.cm,
					cl: row.cl ? Number(row.cl) : 0,
					xq: row.xq,
					hq: row.hq,
					hwzl: row.hwzl,
					zd: row.zd ? Number(row.zd) : 0,
					zzd: row.zzd ? Number(row.zzd) : 0,
					sgff: row.sgff,
					whjgxs: row.whjgxs,
					gl: row.gl ? Number(row.gl) : 0,
					zcc: row.zcc,
					hxxkfw: row.hxxkfw,
					hxthhj: row.hxthhj,
					swqxyj: row.swqxyj
				}
				this.id = row.id
				this.modeType = 2;
				this.showSshycbxxModel = true
			},
			sshycbxxModelChange(status) {
				if(!status) {
					this.sshycbxxForm = {
						cm: '',
						cl: 0,
						xq: '',
						hq: '',
						cblx: '',
						hwzl: '',
						zd: 0,
						zzd: 0,
						sgff: '',
						whjgxs: '',
						gl: 0,
						zcc: '',
						hxxkfw: '',
						hxthhj: '',
						swqxyj: ''
					}
				}
			},
			async removeSshycbxx(row) {
				let { status_code } = await api.deleteSshycbxxInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getSshycbxxList()
			},
			async saveSshycbxx() {
				let params = {
					...this.sshycbxxForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addSshycbxxInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showSshycbxxModel = false
					this.getSshycbxxList()
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