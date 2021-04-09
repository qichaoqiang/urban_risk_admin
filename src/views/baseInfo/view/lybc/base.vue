<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="基本信息"></part-title>
					<Form :model="baseInfo" label-position="left" disabled :label-width="140" style="width: 600px">
						<FormItem label="企业名称">
				            {{baseInfo.qymc}}
				        </FormItem>
				        <FormItem label="注册地址">
				        	<Input clearable v-model="baseInfo.zcdz"></Input>
				        </FormItem>
				        <FormItem label="所属区域">
				            <Cascader 
				            	readonly 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder=""></Cascader>
				        </FormItem>
				        <FormItem label="经纬度">
				        	<div>
			        			<Input 
			        				readonly 
			        				v-model="baseInfo.lngAndLat" 
			        				icon="md-pin" 
			        				placeholder="经纬度" />
			        		</div>
				        </FormItem>
				        <FormItem label="经营地址">
				            <Input clearable v-model="baseInfo.jydz"></Input>
				        </FormItem>
				        <FormItem label="经营范围">
				            <Input readonly v-model="baseInfo.jyfw"></Input>
				        </FormItem>
				        <FormItem label="成立时间">
				            <DatePicker clearble type="date" v-model="baseInfo.clsj"></DatePicker>
				        </FormItem>
				        <FormItem label="职工人数">
				            <InputNumber :min="0" v-model="baseInfo.zgrs"></InputNumber>
				        </FormItem>
				        <FormItem label="管理人员数量">
				            <InputNumber :min="0" v-model="baseInfo.glrysl"></InputNumber>
				        </FormItem>
				        <FormItem label="行业门类">
				        	<Cascader 
				        		readonly 
				        		change-on-select
			        			v-model="baseInfo.hyml" 
			        			:data="industryList"  
			        			placeholder=""></Cascader>
				        </FormItem>
				        <FormItem label="行业代码">
				            <Input readonly v-model="baseInfo.hydm"></Input>
				        </FormItem>
				        <FormItem label="统一社会信用代码">
				            <Input readonly v-model="baseInfo.tyshxydm"></Input>
				        </FormItem>
				        <FormItem label="运行状态">
				            <Select readonly v-model="baseInfo.yxzt">
				                <Option v-for="item in yxztList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form :model="baseInfo" label-position="left" :disabled="true" :label-width="140" style="width: 600px">
				        <FormItem label="企业负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input readonly v-model="baseInfo.qyfzr" :data="areaList"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input readonly v-model="baseInfo.qyfzrdh"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="分管安全负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input readonly v-model="baseInfo.fgaqfzr"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input readonly v-model="baseInfo.fgaqfzrdh"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input readonly v-model="baseInfo.jbr"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input readonly v-model="baseInfo.jbrdh"></Input>
				        		</Col>
				        		<Col span="24">
				        			<Input readonly v-model="baseInfo.jbryx"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
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
	            <!-- <Row type="flex" align="middle" justify="space-between">
	            	<Col style="text-align: left">
	            		<Button type="info" size="small" ghost @click="openArea">开启标注</Button>
	            		<Button type="warning" size="small" ghost @click="map.clearOverLays()">清除标注</Button>
	            	</Col>
	            	<Col>
	            		<Button type="text" size="large" @click="cancelArea">取消</Button>
		                <Button type="primary" size="large" @click="saveArea">保存</Button>
	            	</Col>
	            </Row> -->
	        </div>
		</Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import tablejs from '@/common/js/table'
	import areajs from '@/common/js/area'
	import industryjs from '@/common/js/industry'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs],
		components: { partTitle },
		data() {
			return {
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				loading: true,
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showYaModel: false,
				showSbfcgyModel: false,
				showZaqModel: false,
				showMainRiskModel: false,
				showRimModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					qymc: '',
					tyshxydm: '',
					clsj: '',
					zgrs: 0,
					glrysl: 0,
					hyml: [],
					hydm: '',
					yxzt: '',
					tyshxydm: '',
					jyfw: '',
					zcdz1: [],
					zcdz2: '',
					quyu: [],
					jbr: '',
					jbrdh: '',
					jbryx: '',
					qyfzr: '',
					qyfzrdh: '',
					fgaqfzr: '',
					fgaqfzrdh: '',
					lngAndLat: '',
				},
				area: '',
				lng: '',
				lat: '',
				typeList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				form: null,
				statusList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				yxztList: ['运行', '停运'],
			}
		},
		watch: {

		},
		computed: {
			
		},
		methods: {
			async getBaseInfo() {
				let { status_code, data, message } = await api.getLybcBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { jbr, jbrdh, jbryx, qymc, tyshxydm, zcdz, jyfw, quyu_id, jd, wd, qyfzr, qyfzrdh, fgaqfzr, fgaqfzrdh, zgrs, glrysl, hyml, hydm, yxzt, jydz, clsj } = this.form
					this.baseInfo = { qymc, hydm, jyfw, tyshxydm, yxzt, zcdz, qyfzr, qyfzrdh, fgaqfzr, fgaqfzrdh, jbr, jbrdh, jbryx, jydz }
					this.baseInfo.zgrs = zgrs ? Number(zgrs) : 0
					this.baseInfo.glrysl = glrysl ? Number(glrysl) : 0
					this.baseInfo.clsj = this.form.clsj ? new Date(this.form.clsj) : '';
					this.baseInfo.lngAndLat = `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}`
					this.getQy()
					this.getHy()
				}
			},
			saveInfo() {

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
			cancelArea() {
				this.map.clearOverLays()
				this.showAreaModel = false
			},
			saveArea() {
				this.showAreaModel = false
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
			edit() {
				this.$storage.set('baseInfo', this.baseInfo);
				this.$storage.set('form', this.form);
				this.$router.push({
					path: '/base',
					query: {
						type: 2
					}
				})
			}
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
				if(this.industryList.length > 0) {
					this.getBaseInfo()
				}
			})
			this.getIndustry('', list => {
				this.industryList = list
				if(this.areaList.length > 0) {
					this.getBaseInfo()
				}
			})
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