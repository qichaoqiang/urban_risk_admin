<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="危险化学品" name="name1">
				        	<part-title text="危险化学品" ref="xxx" :btns="['add']" @add="openWhModel"></part-title>
							<Table :columns="whColumns" :data="whData">
								<template slot-scope="{ row }" slot="sfzdjg">
									<span>{{sfzgyyqList.find(item => item.value === row.sfzdjg).name}}</span>
								</template>
								<template slot-scope="{ row }" slot="sfbzp">
									<span>{{sfzgyyqList.find(item => item.value === row.sfbzp).name}}</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editWhModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWh(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="whPage.pageSize"
				                    :total="whPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeWhPage"
				                    @on-page-size-change="handleChangeWhPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="喷涂工艺" name="name2">
				        	<part-title text="喷涂工艺" :btns="['add']" @add="openPtgyModel"></part-title>
								<Table :columns="ptgyColumns" :data="ptgyData">
									<template slot-scope="{ row }" slot="action">
							            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editPtgyModel(row)">编辑</Button>
							            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removePtgy(row)">
									        <Button type="error" size="small" ghost>删除</Button>
									    </Poptip>
							        </template>
								</Table>
								<Row type="flex" justify="end">
									<Page
					                    size="small"
					                    style="margin-top: 10px"
					                    :page-size="ptgyPage.pageSize"
					                    :total="ptgyPage.totalRow"
					                    show-elevator
					                    show-total
					                    show-sizer
					                    @on-change="handleChangePtgyPage"
					                    @on-page-size-change="handleChangePtgyPageSize"
					                />
								</Row>
				        </TabPane>
				        <TabPane label="重大危险源" name="name3">
				        	<Form :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
					        	<FormItem label="重大危险源">
						        	<Select clearable v-model="baseInfo.zdwxy" placeholder="请选择">
						                <Option v-for="item in zdwxyList" :key="item" :value="item">{{item}}</Option>
						            </Select>
						        </FormItem>
						    </Form>
							<Row type="flex" justify="center" style="margin-top: 24px">
								<Col>
									<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
								</Col>
							</Row>
				        </TabPane>
				        <TabPane label="周边环境" name="name5">
				        	<part-title text="周边环境" :btns="['add']" @add="openRimModel"></part-title>
				        	<div style="margin-bottom: 16px;">说明：调查周边200m范围</div>
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}危险化学品`" v-model="showWhModel" @on-visible-change="whModelChange">
			<div>
				<Form :model="whForm" label-position="left" :label-width="140">
					<FormItem label="化学品名称">
			        	<Input clearable v-model="whForm.hxpm"></Input>
			        </FormItem>
			        <FormItem label="别名">
			        	<Input clearable v-model="whForm.bm"></Input>
			        </FormItem>
			        <FormItem label="CAS号">
			        	<Input clearable v-model="whForm.cas"></Input>
			        </FormItem>
			        <FormItem label="是否重点监管">
			            <Select clearable v-model="whForm.sfzdjg" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="是否爆炸品">
			            <Select clearable v-model="whForm.sfbzp" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="是否剧毒化学品">
			            <Select clearable v-model="whForm.sfjdhxp" placeholder="请选择">
			                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="火灾危险性等级">
			            <Select clearable v-model="whForm.hzwxxdj" placeholder="请选择">
			                <Option v-for="item in hzwxxdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="化学品状态">
			            <Select clearable v-model="whForm.hxpzt" placeholder="请选择">
			                <Option v-for="item in hxpztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="年中转量">
			        	<Row type="flex" align="middle">
	            			<Col>
	            				<InputNumber :min="0" v-model="whForm.nzzl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="whForm.nzzldw" placeholder="单位">
					                <Option v-for="item in nzzldwList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="最大存储量">
			            <Row type="flex" align="middle">
	            			<Col>
	            			<InputNumber :min="0" v-model="whForm.zdccl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="whForm.zdccldw" placeholder="单位">
					                <Option v-for="item in nzzldwList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="MSDS">
			        	<Input clearable v-model="whForm.msds"></Input>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveWh">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}喷涂工艺`" v-model="showPtgyModel" @on-visible-change="ptgyModelChange">
			<div>
				<Form :model="ptgyForm" label-position="left" :label-width="140">
					<FormItem label="工艺名称">
			        	<Input clearable v-model="ptgyForm.gymc"></Input>
			        </FormItem>
			        <FormItem label="场所封闭性">
			        	<Select clearable v-model="ptgyForm.csfbx" placeholder="请选择">
			                <Option v-for="item in csfbxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="喷涂方式">
			        	<Select clearable v-model="ptgyForm.ptfs" placeholder="请选择">
			                <Option v-for="item in ptfsList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="自动化程度">
			        	<Select clearable v-model="ptgyForm.zdhcd" placeholder="请选择">
			                <Option v-for="item in zdhcdList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="作业人数">
			            <InputNumber :min="0" v-model="ptgyForm.zyrs"></InputNumber>
			        </FormItem>
			        <FormItem label="涂料种类">
			            <Select clearable v-model="ptgyForm.tlzl" placeholder="请选择">
			                <Option v-for="item in tlzlList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>	
			        <FormItem label="当前状态">
			            <Select clearable v-model="ptgyForm.dqzt" placeholder="请选择">
			                <Option v-for="item in dqztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>	
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="savePtgy">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}周边环境`" v-model="showRimModel"  @on-visible-change="rimModelChange">
			<div>
				<Form :model="rimForm" label-position="left" :label-width="140">
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
				sjwxhxpId: '',
				sczz_id: '',	
				ccss_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showWhRiskModel: false,
				showSczzModel: false,
				showCcssModel: false,
				showSjwxhxpModel: false,
				showGqscModel: false,
				showPtgyModel: false,
				showRimModel: false,
				modeType: '',
				modeType2: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					zdwxy: '',
				},
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
				whColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '化学品名称',
                        key: 'hxpm',
                    }, {
                        title: 'CAS号',
                        key: 'cas',
                    }, {
                        title: '是否重点监管',
                        slot: 'sfzdjg',
                    }, {
                        title: '是否爆炸品',
                        slot: 'sfbzp',
                    }, {
                        title: '火灾风险等级',
                        key: 'hzwxxdj',
                    }, {
                        title: 'MSDS',
                        key: 'msds',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				whData: [],
				whForm: {
					hxpm: '',
					bm: '',
					cas: '',
					sfzdjg: '',
					sfbzp: '',
					sfjdhxp: '',
					hzwxxdj: '',
					hxpzt: '',
					msds: '',
					nzzl: 0,
					nzzldw: '',
					zdccl: 0,
					zdccldw: '',
				},
				whPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				hzwxxdjList: ['甲', '乙', '丙', '丁', '戊'],
				hxpztList: ['气体', '液化气体', '液体', '固体'],
				nzzldwList: ['吨', '立方', 'KG', 'L'],
				sxflList: ['最终产品', '中间产品', '原料'],
				whRiskColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '重大危险源单元名称',
                        key: 'zdwxydymc',
                    }, {
                        title: '重大危险源等级',
                        key: 'zdwxydj',
                    }, {
                        title: '危险化学品',
                        key: 'wxhxp',
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				whRiskData: [],
				whRiskForm: {
					zdwxydymc: '',
					zdwxydj: '',
					wxhxp: '',
					tysj: '',
					dqzt: ''
				},
				dqztList: ['运行', '停运', '检修'],
				whRiskPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sczzColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '装置单元名称',
                        key: 'zzdymc',
                    }, {
                        title: '重大危险源',
                        key: 'zdwxy',
                    }, {
                        title: '危险化学品',
                        slot: 'wxhxp',
                    }, {
                        title: '危险工艺',
                        key: 'wxgy',
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sczzData: [],
				sczzForm: {
					zzdymc: '',
					zdwxy: '',
					isWxgy: '',
					wxgy: '',
					zzyxyl: 0,
					zzyxyldw: '',
					zzyxwd: 0,
					tysj: '',
					lngAndLat: '',
					dtfw: '',
					dqzt: ''
				},
				ccssList: ['有', '无'],
				zzyxylList: ['Mpa', 'Kpa'],
				zdwxyList: ['否', '一级', '二级', '三级', '四级'],
				whList: [],
				fclxList: [],
				sczzPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sczzNum: {
					gysl: 0,
					zyzrs: 0
				},
				ccssColumns: [
					{
                        title: '序号',
                        type: 'index',
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
				lxList: ['地上罐区', '埋地罐区', '独立仓库', '中间仓库'],
				ccssPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sjwxhxpColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '化学品名',
                        key: 'hxpm',
                    }, {
                        title: '数量',
                        slot: 'sl',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sjwxhxpData: [],
				sjwxhxpForm: {
					hxpm: '',
					sl: 0,
					sldw: '',
				},
				sjwxhxpPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sjwxhxpNum: {
					zsl: 0,
					yxsl: 0
				},
				gqscColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '罐名',
                        key: 'gm',
                    }, {
                        title: '罐型',
                        key: 'gx',
                    }, {
                        title: '容积',
                        slot: 'rj',
                    }, {
                        title: '压力',
                        slot: 'yl',
                    }, {
                        title: '温度（℃）',
                        key: 'wd',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				gqscData: [],
				gqscForm: {
					gm: '',
					gx: '',
					rj: 0,
					rjdw: '',
					yl: 0,
					yldw: '',
					wd: 0,
				},
				gxList: ['球罐', '柱形罐', '卧罐'],
				rjdwList: ['立方', '吨'],
				gqscPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				ptgyColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '工艺名称',
                        key: 'gymc',
                    }, {
                        title: '场所封闭性',
                        key: 'csfbx',
                    }, {
                        title: '喷涂方式',
                        key: 'ptfs',
                    }, {
                        title: '自动化程度',
                        key: 'zdhcd',
                    }, {
                        title: '作业人数',
                        key: 'zyrs',
                    }, {
                        title: '涂料种类',
                        key: 'tlzl',
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                    },{
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				ptgyData: [],
				ptgyForm: {
					gymc: '',
					csfbx: '',
					ptfs: '',
					zdhcd: '',
					zyrs: 0,
					tlzl: '',
					dqzt: '',
				},
				csfbxList: ['封闭式', '半封闭式', '开放式（露天）'],
				ptfsList: ['高压喷涂', '静电喷涂', '中等压力喷涂', '浸涂、淋涂、滚涂', '其它'],
				zdhcdList: ['人工', '自动'],
				tlzlList: ['水性', '油性', '塑粉'],
				ptgyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
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
			async getBaseInfo() {
				this.loading = true
				let whParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let ptgyParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ptgyPage.pageSize,
					page: this.ptgyPage.pageIndex,
				}
				let rimParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.rimPage.pageSize,
					page: this.rimPage.pageIndex,
				}
				Promise.all([api.getWhsbfcList(whParams), api.getPtgyList(ptgyParams), api.getRimList(rimParams)]).then((result) => {
				  	let whRes = result[0], ptgyRes = result[1], rimRes = result[2]
				  	if(whRes.status_code == 200) {
				  		this.whData = whRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.whPage.totalRow = whRes.data.total
				  	}
				  	if(ptgyRes.status_code == 200) {
				  		this.ptgyData = ptgyRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.ptgyPage.totalRow = ptgyRes.data.total
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
				let { status_code, data, message } = await api.getSptqyBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					this.baseInfo = { zdwxy: data.zdwxy}
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
			async saveInfo() {
				let params = {
					gkdx_id: this.gkdx_id,
					...this.baseInfo
				}
				let { status_code, message } = await api.addSptqyBase(params);
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
			async getWhsbfcList_() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: 1000,
					page: this.whPage.pageIndex,
				}
				let { status_code, data } = await api.getWhsbfcList(params)
				if(status_code == 200) {
					this.whList = data.data
				}
			},
			handleChangeWhPage(val) {
				this.whPage.pageIndex = val
				this.getWhsbfcList()
			},
			handleChangeWhPageSize(val) {
				this.whPage.pageSize = val
				this.getWhsbfcList()
			},
			async getWhsbfcList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let { status_code, data } = await api.getWhsbfcList(params)
				if(status_code == 200) {
					this.whData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.whPage.totalRow = data.total
				}
			},
			openWhModel() {
				this.modeType = 1;
				this.showWhModel = true
			},
			editWhModel(row) {
				this.whForm = {
					hxpm: row.hxpm,
					bm: row.bm,
					cas: row.cas,
					sfzdjg: row.sfzdjg,
					sfbzp: row.sfbzp,
					sfjdhxp: row.sfjdhxp,
					hzwxxdj: row.hzwxxdj,
					hxpzt: row.hxpzt,
					msds: row.msds,
					nzzl: row.nzzl ? Number(row.nzzl) : 0,
					nzzldw: row.nzzldw,
					zdccl: row.zdccl ? Number(row.zdccl) : 0,
					zdccldw: row.zdccldw,
				}
				this.id = row.id
				this.modeType = 2;
				this.showWhModel = true
			},
			whModelChange(status) {
				if(!status) {
					this.whForm = {
						hxpm: '',
						bm: '',
						cas: '',
						sfzdjg: '',
						sfbzp: '',
						sfjdhxp: '',
						hzwxxdj: '',
						hxpzt: '',
						msds: '',
						nzzl: 0,
						nzzldw: '',
						zdccl: 0,
						zdccldw: '',
					}
				}
			},
			async removeWh(row) {
				let { status_code } = await api.deleteWhsbfcInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhsbfcList()
			},
			async saveWh() {
				let params = {
					...this.whForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWhsbfcInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWhModel = false
					this.getWhsbfcList()
				}
			},
			handleChangeWhRiskPage(val) {
				this.whRiskPage.pageIndex = val
				this.getWhRiskList()
			},
			handleChangeWhRiskPageSize(val) {
				this.whRiskPage.pageSize = val
				this.getWhRiskList()
			},
			async getWhRiskList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.whRiskPage.pageSize,
					page: this.whRiskPage.pageIndex,
				}
				let { status_code, data } = await api.getWhRiskList(params)
				if(status_code == 200) {
					this.whRiskData = data.data.filter(item => item.gkdx_id == this.gkdx_id)
					this.whRiskPage.totalRow = data.total
				}
			},
			openWhRiskModel() {
				this.modeType = 1;
				this.showWhRiskModel = true
			},
			editWhRiskModel(row) {
				this.whRiskForm = {
					zdwxydymc: row.zdwxydymc,
					zdwxydj: row.zdwxydj,
					wxhxp: row.wxhxp,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showWhRiskModel = true
			},
			whRiskModelChange(status) {
				if(!status) {
					this.whRiskForm = {
						zdwxydymc: '',
						zdwxydj: '',
						wxhxp: '',
						tysj: '',
						dqzt: ''
					}
				}
			},
			async removeWhRisk(row) {
				let { status_code } = await api.deleteWhRiskInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getWhRiskList()
			},
			async saveWhRisk() {
				let params = {
					...this.whRiskForm,
					tysj: this.whRiskForm.tysj ? getDate(new Date(this.whRiskForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addWhRiskInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showWhRiskModel = false
					this.getWhRiskList()
				}
			},
			handleChangeSczzPage(val) {
				this.sczzPage.pageIndex = val
				this.getSczzList()
			},
			handleChangeSczzPageSize(val) {
				this.sczzPage.pageSize = val
				this.getSczzList()
			},
			async getSczzList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.sczzPage.pageSize,
					page: this.sczzPage.pageIndex,
				}
				let { status_code, data } = await api.getSczzList(params)
				if(status_code == 200) {
					this.sczzData = data.data
					this.sczzPage.totalRow = data.total
				}
			},
			async openSczzModel() {
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
				this.showSczzModel = true
			},
			async editSczzModel(row) {
				this.sczzForm = {
					zzdymc: row.zzdymc,
					zdwxy: row.zdwxy,
					isWxgy: row.wxgy ? 1 : 0,
					wxgy: row.wxgy,
					zzyxyl: row.zzyxyl ? Number(row.zzyxyl) : 0,
					zzyxyldw: row.zzyxyldw,
					zzyxwd: row.zzyxwd ? Number(row.zzyxwd) : 0,
					tysj: row.tysj ? new Date(row.tysj) : '',
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(2)} ${(row.wd - 0).toFixed(2)}` : '',
					dtfw: row.dtfw,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.sczz_id = row.id
				this.sjwxhxpData = row.wxhxp ? JSON.parse(row.wxhxp) : []
				this.modeType = 2;
				this.showSczzModel = true
			},
			sczzModelChange(status) {
				if(!status) {
					this.sczzForm = {
						zzdymc: '',
						zdwxy: '',
						isWxgy: '',
						wxgy: '',
						zzyxyl: 0,
						zzyxyldw: '',
						zzyxwd: 0,
						tysj: '',
						lngAndLat: '',
						dtfw: '',
						dqzt: ''
					}
					this.sjwxhxpData = []
				}
			},
			async removeSczz(row) {
				let { status_code } = await api.deleteSczzInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getSczzList()
			},
			async saveSczz() {
				let params = {
					...this.sczzForm,
					tysj: this.sczzForm.tysj ? getDate(new Date(this.sczzForm.tysj).getTime(), 'date') : '',
					wxhxp: this.sjwxhxpData.length > 0 ? JSON.stringify(this.sjwxhxpData) : '',
					jd: this.sczzForm.lngAndLat.split(' ')[0],
					wd: this.sczzForm.lngAndLat.split(' ')[1],
					gkdx_id: this.gkdx_id
				}
				delete params.isWxgy
				delete params.lngAndLat
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addSczzInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showSczzModel = false
					this.getSczzList()
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
				this.sjwxhxpData = row.wxhxp ? JSON.parse(row.wxhxp) : []
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
					this.sjwxhxpData = []
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
					wxhxp: this.sjwxhxpData.length > 0 ? JSON.stringify(this.sjwxhxpData) : '',
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
			openSjwxhxpModel() {
				this.getWhsbfcList_()
				this.modeType2 = 1;
				this.showSjwxhxpModel = true
			},
			editSjwxhxpModel(row, index) {
				this.getWhsbfcList_()
				this.sjwxhxpForm = {
					hxpm: row.hxpm,
					sl: row.sl ? Number(row.sl) : 0,
					sldw: row.sldw,
				}
				this.sjwxhxpId = index
				this.modeType2 = 2;
				this.showSjwxhxpModel = true
			},
			sjwxhxpModelChange(status) {
				if(!status) {
					this.sjwxhxpForm = {
						hxpm: '',
						sl: 0,
						sldw: '',
					}
				}
			},
			async saveSjwxhxp() {
				if(this.modeType2 == 2) {
					this.sjwxhxpData.splice(this.sjwxhxpId, 1, this.sjwxhxpForm)
				}else {
					this.sjwxhxpData.push(this.sjwxhxpForm)
				}
				this.showSjwxhxpModel = false
			},
			removeSjwxhxp(index) {
				this.sjwxhxpData.splice(index, 1)
			},

			handleChangeGqscPage(val) {
				this.gqscPage.pageIndex = val
				this.getGqscList()
			},
			handleChangeGqscPageSize(val) {
				this.gqscPage.pageSize = val
				this.getGqscList()
			},
			async getGqscList() {
				let params = {
					wxhxpccss_id: this.ccss_id,
					per_page: this.gqscPage.pageSize,
					page: this.gqscPage.pageIndex,
				}
				let { status_code, data } = await api.getGqscList(params)
				if(status_code == 200) {
					this.gqscData = data.data
					this.gqscPage.totalRow = data.total
				}
			},
			openGqscModel() {
				if(this.modeType == 1) {
					this.$Message.error('请在编辑时添加罐区')
					return
				}
				this.modeType2 = 1;
				this.showGqscModel = true
			},
			editGqscModel(row) {
				this.gqscForm = {
					gm: row.gm,
					gx: row.gx,
					rj: row.rj ? Number(row.rj) : 0,
					rjdw: row.rjdw,
					yl: row.yl ? Number(row.yl) : 0,
					yldw: row.yldw,
					wd: row.wd ? Number(row.wd) : 0,
				}
				this.gqscId = row.id
				this.modeType2 = 2;
				this.showGqscModel = true
			},
			gqscModelChange(status) {
				if(!status) {
					this.gqscForm = {
						gm: '',
						gx: '',
						rj: 0,
						rjdw: '',
						yl: 0,
						yldw: '',
						wd: 0,
					}
				}
			},
			async saveGqsc() {
				let params = {
					...this.gqscForm,
					wxhxpccss_id: this.ccss_id
				}
				if(this.modeType2 == 2) {
					params.id = this.gqscId
				}
				let { status_code, message } = await api.addGqscInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showGqscModel = false
					this.getGqscList()
				}
			},
			async removeGqsc(row) {
				let { status_code } = await api.deleteGqscInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getGqscList()
			},
			handleChangePtgyPage(val) {
				this.ptgyPage.pageIndex = val
				this.getPtgyList()
			},
			handleChangePtgyPageSize(val) {
				this.ptgyPage.pageSize = val
				this.getPtgyList()
			},
			async getPtgyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.ptgyPage.pageSize,
					page: this.ptgyPage.pageIndex,
				}
				let { status_code, data } = await api.getPtgyList(params)
				if(status_code == 200) {
					this.ptgyData = data.data
					this.ptgyPage.totalRow = data.total
				}
			},
			openPtgyModel() {
				this.modeType = 1;
				this.showPtgyModel = true
			},
			editPtgyModel(row) {
				this.ptgyForm = {
					gymc: row.gymc,
					csfbx: row.csfbx,
					ptfs: row.ptfs,
					zdhcd: row.zdhcd,
					zyrs: row.zyrs ? Number(row.zyrs) : 0,
					tlzl: row.tlzl,
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showPtgyModel = true
			},
			ptgyModelChange(status) {
				if(!status) {
					this.ptgyForm = {
						gymc: '',
						csfbx: '',
						ptfs: '',
						zdhcd: '',
						zyrs: 0,
						tlzl: '',
						dqzt: '',
					}
				}
			},
			async removePtgy(row) {
				let { status_code } = await api.deletePtgyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getPtgyList()
			},
			async savePtgy() {
				let params = {
					...this.ptgyForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addPtgyInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showPtgyModel = false
					this.getPtgyList()
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