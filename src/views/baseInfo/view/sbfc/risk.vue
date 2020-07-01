<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
					<Tabs value="name1">
				        <TabPane label="危险化学品" name="name1">
							<part-title text="危险化学品" :btns="['add']" @add="openWhModel"></part-title>
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
						<TabPane label="危化品重大危险源" name="name2">
						 	<part-title text="危化品重大危险源" :btns="['add']" @add="openWhRiskModel"></part-title>
							<Table :columns="whRiskColumns" :data="whRiskData">
								<template slot-scope="{ row }" slot="name">
						            <span class="link">{{row.name}}</span>
						        </template>
						        <template slot-scope="{ row }" slot="level">
						            <div :style="{ margin: '0 auto', width: '40px', height: '20px', background: row.color}"></div>
						        </template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editWhRiskModel(row)">编辑</Button>
						            
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWhRisk(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="whRiskPage.pageSize"
				                    :total="whRiskPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeWhRiskPage"
				                    @on-page-size-change="handleChangeWhRiskPageSize"
				                />
							</Row>	
						</TabPane>
						<TabPane label="工艺信息" name="name3">
							<part-title text="工艺信息"></part-title>
							<Row type="flex" justify="end">
								<Col span="23">
									<part-title text="涉爆粉尘工艺" :btns="['add']" @add="openSbfcgyModel"></part-title>
									<Row type="flex" :gutter="100">
										<Col>工艺数量：{{sbfcgyNum.gysl || 0}}</Col>
										<Col>涉粉作业总人数：{{sbfcgyNum.zyzrs || 0}}</Col>
									</Row>
									<Table :columns="sbfcgyColumns" :data="sbfcgyData">
										<template slot-scope="{ row }" slot="action">
								            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editSbfcgyModel(row)">编辑</Button>
								            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSbfcgy(row)">
										        <Button type="error" size="small" ghost>删除</Button>
										    </Poptip>
								        </template>
									</Table>
									<Row type="flex" justify="end">
										<Page
						                    size="small"
						                    style="margin-top: 10px"
						                    :page-size="sbfcgyPage.pageSize"
						                    :total="sbfcgyPage.totalRow"
						                    show-elevator
						                    show-total
						                    show-sizer
						                    @on-change="handleChangeSbfcgyPage"
						                    @on-page-size-change="handleChangeSbfcgyPageSize"
						                />
									</Row>
									<!-- <part-title text="重点监管危险工艺" :btns="['add']" @add="openMainRiskModel"></part-title>
									<Table :columns="mainRiskColumns" :data="mainRiskData">
										<template slot-scope="{ row }" slot="name">
								            <span class="link">{{row.name}}</span>
								        </template>
										<template slot-scope="{ row }" slot="action">
								            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editMainRiskModel(row)">编辑</Button>
								            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeMainRisk(row)">
										        <Button type="error" size="small" ghost>删除</Button>
										    </Poptip>
								        </template>
									</Table>
									<Row type="flex" justify="end">
										<Page
						                    size="small"
						                    style="margin-top: 10px"
						                    :page-size="mainRiskPage.pageSize"
						                    :total="mainRiskPage.totalRow"
						                    show-elevator
						                    show-total
						                    show-sizer
						                    @on-change="handleChangeMainRiskPage"
						                    @on-page-size-change="handleChangeMainRiskPageSize"
						                />
									</Row> -->
								</Col>
							</Row>
						</TabPane>
						<TabPane label="周边环境" name="name4">
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
			<!-- <Row type="flex" justify="center" style="margin-top: 24px">
				<Col>
					<Button type="primary" style="margin: 0 auto; width: 200px;" @click="saveInfo">完成</Button>
				</Col>
			</Row> -->
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
				<Form :model="whForm" label-position="left" :label-width="120">
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
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}危化品重大危险源`" v-model="showWhRiskModel" @on-visible-change="whRiskModelChange">
			<div>
				<Form :model="whRiskForm" label-position="left" :label-width="140">
					<FormItem label="重大危险单元名称">
			        	<Input clearable v-model="whRiskForm.zdwxydymc"></Input>
			        </FormItem>
			        <FormItem label="重大危险源等级">
			        	<Select clearable v-model="whRiskForm.zdwxydj" placeholder="请选择">
			                <Option v-for="item in hzwxxdjList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="危险化学品">
			        	<Input clearable v-model="whRiskForm.wxhxp"></Input>
			        </FormItem>
			        <FormItem label="投用时间">
			        	<DatePicker type="date" v-model="whRiskForm.tysj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前状态">
			            <Select clearable v-model="whRiskForm.dqzt" placeholder="请选择">
			                <Option v-for="item in dqztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="经纬度">
			        	<lng id="lng_box_whrisk" :lngAndLat.sync="whRiskForm.lngAndLat"></lng>
			        </FormItem>
			        <FormItem label="区域范围">
			        	<qyfw id="area_box_whrisk" :qyfw.sync="whRiskForm.qyfw"></qyfw>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveWhRisk">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}涉爆粉尘工艺`" v-model="showSbfcgyModel" @on-visible-change="sbfcgyModelChange">
			<div>
				<Form :model="sbfcgyForm" label-position="left" :label-width="120">
					<FormItem label="粉尘工艺名称">
			        	<Input clearable v-model="sbfcgyForm.sfgymc"></Input>
			        </FormItem>
			        <FormItem label="粉尘名称">
			        	<Input clearable v-model="sbfcgyForm.fcmc"></Input>
			        </FormItem>
			        <FormItem label="粉尘类型">
			        	<Cascader 
			        		clearable 
		        			v-model="sbfcgyForm.fclx" 
		        			:data="fclxList" 
		        			placeholder="粉尘类型"></Cascader>
			        </FormItem>
			        <FormItem label="作业人数">
			            <InputNumber :min="0" v-model="sbfcgyForm.zyrs"></InputNumber>
			        </FormItem>
			        <FormItem label="当前状态">
			            <Select clearable v-model="sbfcgyForm.dqzt" placeholder="请选择">
			                <Option v-for="item in dqztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="除尘设施">
			        	<Select clearable v-model="sbfcgyForm.ccss" placeholder="请选择">
			                <Option v-for="item in ccssList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem v-if="sbfcgyForm.ccss == '有'" label="添加除尘设施">
			        	<Button type="primary" icon="ios-add" ghost @click="openDeviceModel"></Button>
			        </FormItem>
				</Form>
				
				<div v-show="modeType == 2 && sbfcgyForm.ccss == '有'">
					<part-title text="除尘设施"></part-title>
					<Row type="flex" :gutter="100">
						<Col>数量：{{deviceNum.zsl || 0}}</Col>
						<Col>运行数量：{{deviceNum.yxsl || 0}}</Col>
					</Row>
					<Table v-if="sbfcgyForm.ccss == '有'" :columns="deviceColumns" :data="deviceData">
						<template slot-scope="{ row }" slot="name">
				            <span class="link">{{row.name}}</span>
				        </template>
						<template slot-scope="{ row }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editDeviceModel(row)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeDevice(row)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
					<Row type="flex" justify="end">
						<Page
		                    size="small"
		                    style="margin-top: 10px"
		                    :page-size="devicePage.pageSize"
		                    :total="devicePage.totalRow"
		                    show-elevator
		                    show-total
		                    show-sizer
		                    @on-change="handleChangeDevicePage"
		                    @on-page-size-change="handleChangeDevicePageSize"
		                />
					</Row>
				</div>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveSbfcgy">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType2 == 1 ? '新增' : '编辑'}除尘设施`" v-model="showDeviceModel" @on-visible-change="deviceModelChange">
			<div>
				<Form :model="deviceForm" label-position="left" :label-width="120">
					<FormItem label="除尘设施名称">
			        	<Input clearable v-model="deviceForm.ccssmc"></Input>
			        </FormItem>
			        <FormItem label="类型">
			        	<Select clearable v-model="deviceForm.lx" placeholder="请选择">
			                <Option v-for="item in lxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="投用时间">
			            <DatePicker type="date" v-model="deviceForm.tysj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="运行状态">
			            <Select clearable v-model="deviceForm.yxzt" placeholder="请选择">
			                <Option v-for="item in dqztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveDevice">保存</Button>
	        </div>
		</Modal>
		<Modal width="820" :title="`${modeType == 1 ? '新增' : '编辑'}重点监管危险工艺`" v-model="showMainRiskModel" @on-visible-change="mainRiskModelChange">
			<div>
				<Form :model="mainRiskForm" label-position="left" :label-width="120">
					<FormItem label="工艺名称">
			        	<Input clearable v-model="mainRiskForm.gymc"></Input>
			        </FormItem>
			        <FormItem label="危险工艺类型">
			        	<Select clearable v-model="mainRiskForm.wxgylx" placeholder="请选择">
			                <Option v-for="item in wxgylxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="工艺操作人数">
			            <InputNumber :min="0" v-model="mainRiskForm.sjczrs"></InputNumber>
			        </FormItem>
			        <FormItem label="自控系统">
			            <Select clearable v-model="mainRiskForm.zkxt" placeholder="请选择">
			                <Option v-for="item in zkxtList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>	
			        <FormItem label="安全系统">
			            <Select clearable v-model="mainRiskForm.aqxt" placeholder="请选择">
			                <Option v-for="item in aqxtList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveMainRisk">保存</Button>
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
			        </FormItem>
			        <FormItem label="区域范围">
			        	<qyfw :qyfw.sync="rimForm.qyfw"></qyfw>
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
				deviceId: '',
				sbfcgy_id: '',
				loading: true,
				step: 2,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showWhRiskModel: false,
				showSbfcgyModel: false,
				showDeviceModel: false,
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
					status: '',
					sfzgyyq: '',
					yqmc: '',
					zgrs: 0,
					glrysl: 0,
					hyml: [],
					hydm: '',
					aqscbzh: '',
					qyjbjk: '',
					yxzt: ''
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
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.whPage.pageIndex- 1) * this.whPage.pageSize + 1);
				        }
                    }, {
                        title: '化学品名称',
                        key: 'hxpm',
                        minWidth: 110
                    }, {
                        title: 'CAS号',
                        key: 'cas',
                        minWidth: 100
                    }, {
                        title: '是否重点监管',
                        slot: 'sfzdjg',
                        minWidth: 120
                    }, {
                        title: '是否爆炸品',
                        slot: 'sfbzp',
                        minWidth: 110
                    }, {
                        title: '火灾风险等级',
                        key: 'hzwxxdj',
                        minWidth: 120
                    }, {
                        title: 'MSDS',
                        key: 'msds',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
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
				whRiskColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.whRiskPage.pageIndex- 1) * this.whRiskPage.pageSize + 1);
				        }
                    }, {
                        title: '重大危险源单元名称',
                        key: 'zdwxydymc',
                        minWidth: 160
                    }, {
                        title: '重大危险源等级',
                        key: 'zdwxydj',
                        minWidth: 140
                    }, {
                        title: '危险化学品',
                        key: 'wxhxp',
                        minWidth: 110
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                        minWidth: 120
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
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
					dqzt: '',
					lngAndLat: '',
					qyfw: ''
				},
				dqztList: ['运行', '停运', '检修'],
				whRiskPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sbfcgyColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.sbfcgyPage.pageIndex- 1) * this.sbfcgyPage.pageSize + 1);
				        }
                    }, {
                        title: '涉粉工艺名称',
                        key: 'sfgymc',
                        minWidth: 120
                    }, {
                        title: '粉尘名称',
                        key: 'fcmc',
                        minWidth: 100
                    }, {
                        title: '粉尘类型',
                        key: 'fclx',
                        minWidth: 100
                    }, {
                        title: '作业人数',
                        key: 'zyrs',
                        minWidth: 100
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                        minWidth: 100
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sbfcgyData: [],
				sbfcgyForm: {
					sfgymc: '',
					fcmc: '',
					fclx: [],
					zyrs: 0,
					ccss: '',
					dqzt: ''
				},
				ccssList: ['有', '无'],
				fclxList: [],
				sbfcgyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				sbfcgyNum: {
					gysl: 0,
					zyzrs: 0
				},
				deviceColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.devicePage.pageIndex- 1) * this.devicePage.pageSize + 1);
				        }
                    }, {
                        title: '除尘设施名称',
                        key: 'ccssmc',
                        minWidth: 120
                    }, {
                        title: '类型',
                        key: 'lx',
                        minWidth: 80
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                        minWidth: 100
                    }, {
                        title: '运行状态',
                        key: 'yxzt',
                        minWidth: 100
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				deviceData: [],
				deviceForm: {
					ccssmc: '',
					lx: '',
					tysj: '',
					yxzt: ''
				},
				lxList: ['湿式除尘', '干法布袋式除尘', '静电除尘', '旋风除尘', '其他'],
				devicePage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				deviceNum: {
					zsl: 0,
					yxsl: 0
				},
				mainRiskColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.mainRiskPage.pageIndex- 1) * this.mainRiskPage.pageSize + 1);
				        }
                    }, {
                        title: '工艺名称',
                        key: 'gymc',
                        minWidth: 100
                    }, {
                        title: '危险工艺类型',
                        key: 'wxgylx',
                        minWidth: 120
                    }, {
                        title: '工艺操作人数',
                        key: 'sjczrs',
                        minWidth: 120
                    },{
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				mainRiskData: [],
				mainRiskForm: {
					gymc: '',
					wxgylx: '',
					sjczrs: 0,
					zkxt: '',
					aqxt: '',
				},
				wxgylxList: [],
				zkxtList: ['DCS', 'PLC', '其他'],
				aqxtList: ['SIS', 'ESD', '其他'],
				mainRiskPage: {
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
			getBaseInfo() {
				this.loading = true
				let whParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.whPage.pageSize,
					page: this.whPage.pageIndex,
				}
				let whRiskParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.whRiskPage.pageSize,
					page: this.whRiskPage.pageIndex,
				}
				let sbfcgyParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.sbfcgyPage.pageSize,
					page: this.sbfcgyPage.pageIndex,
				}
				let mainRiskParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.mainRiskPage.pageSize,
					page: this.mainRiskPage.pageIndex,
				}
				let rimParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.rimPage.pageSize,
					page: this.rimPage.pageIndex,
				}
				Promise.all([api.getWhsbfcList(whParams), api.getWhRiskList(whRiskParams), api.getSbfcgyList(sbfcgyParams), api.getMainRiskList(mainRiskParams), api.getRimList(rimParams)]).then((result) => {
				  	let whRes = result[0], whRiskRes = result[1], sbfcgyRes = result[2], mainRiskRes = result[3], rimRes = result[4]
				  	if(whRes.status_code == 200) {
				  		this.whData = whRes.data.data
				  		this.whPage.totalRow = whRes.data.total
				  	}
				  	if(whRiskRes.status_code == 200) {
				  		this.whRiskData = whRiskRes.data.data
				  		this.whRiskPage.totalRow = whRiskRes.data.total
				  	}
				  	if(sbfcgyRes.status_code == 200) {
				  		this.sbfcgyData = sbfcgyRes.data.data
				  		this.sbfcgyPage.totalRow = sbfcgyRes.data.total
				  		let { gysl, zyzrs } = sbfcgyRes
				  		this.sbfcgyNum = { gysl, zyzrs }
				  	}
				  	if(mainRiskRes.status_code == 200) {
				  		this.mainRiskData = mainRiskRes.data.data
				  		this.mainRiskPage.totalRow = mainRiskRes.data.total
				  	}
				  	if(rimRes.status_code == 200) {
				  		this.rimData = rimRes.data.data
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
					this.whData = data.data
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
					this.whRiskData = data.data
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
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(6)} ${(row.wd - 0).toFixed(6)}` : '',
					qyfw: row.qyfw,
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
						dqzt: '',
						lngAndLat: '',
						qyfw: '',
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
					jd: this.whRiskForm.lngAndLat.split(' ')[0],
					wd: this.whRiskForm.lngAndLat.split(' ')[1],
					tysj: this.whRiskForm.tysj ? getDate(new Date(this.whRiskForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				delete params.lngAndLat
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
			handleChangeSbfcgyPage(val) {
				this.sbfcgyPage.pageIndex = val
				this.getSbfcgyList()
			},
			handleChangeSbfcgyPageSize(val) {
				this.sbfcgyPage.pageSize = val
				this.getSbfcgyList()
			},
			async getSbfcgyList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.sbfcgyPage.pageSize,
					page: this.sbfcgyPage.pageIndex,
				}
				let { status_code, data } = await api.getSbfcgyList(params)
				if(status_code == 200) {
					this.sbfcgyData = data.data
					this.sbfcgyPage.totalRow = data.total
				}
			},
			async openSbfcgyModel() {
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
				this.showSbfcgyModel = true
			},
			async editSbfcgyModel(row) {
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
				this.sbfcgyForm = {
					sfgymc: row.sfgymc,
					fcmc: row.fcmc,
					fclx: row.fclx.split('/'),
					zyrs: row.zyrs,
					ccss: row.ccss,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.sbfcgy_id = row.id
				this.getDevicesbfcList()
				this.modeType = 2;
				this.showSbfcgyModel = true
			},
			sbfcgyModelChange(status) {
				if(!status) {
					this.sbfcgyForm = {
						sfgymc: '',
						fcmc: '',
						fclx: [],
						zyrs: 0,
						ccss: '',
						dqzt: ''
					}
					this.deviceData = []
				}
			},
			async removeSbfcgy(row) {
				let { status_code } = await api.deleteSbfcgyInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getSbfcgyList()
			},
			async saveSbfcgy() {
				let params = {
					...this.sbfcgyForm,
					fclx: this.sbfcgyForm.fclx.join('/'),
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addSbfcgyInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showSbfcgyModel = false
					this.getSbfcgyList()
				}
			},
			handleChangeDevicePage(val) {
				this.devicePage.pageIndex = val
				this.getDevicesbfcList()
			},
			handleChangeDevicePageSize(val) {
				this.devicePage.pageSize = val
				this.getDevicesbfcList()
			},
			async getDevicesbfcList() {
				let params = {
					sbfcgy_id: this.sbfcgy_id,
					per_page: this.devicePage.pageSize,
					page: this.devicePage.pageIndex,
				}
				let { status_code, data } = await api.getDevicesbfcList(params)
				if(status_code == 200) {
					this.deviceData = data.data
					this.devicePage.totalRow = data.total
				}
			},
			openDeviceModel() {
				if(this.modeType == 1) {
					this.$Message.error('请在编辑时添加除尘设施')
					return
				}
				this.modeType2 = 1;
				this.showDeviceModel = true
			},
			editDeviceModel(row) {
				this.deviceForm = {
					ccssmc: row.ccssmc,
					lx: row.lx,
					tysj: row.tysj ? new Date(row.tysj) : '',
					yxzt: row.yxzt
				}
				this.deviceId = row.id
				this.modeType2 = 2;
				this.showDeviceModel = true
			},
			deviceModelChange(status) {
				if(!status) {
					this.deviceForm = {
						ccssmc: '',
						lx: '',
						tysj: '',
						yxzt: '',
					}
				}
			},
			async saveDevice() {
				let params = {
					...this.deviceForm,
					tysj: this.deviceForm.tysj ? getDate(new Date(this.deviceForm.tysj).getTime(), 'date') : '',
					sbfcgy_id: this.sbfcgy_id
				}
				if(this.modeType2 == 2) {
					params.id = this.deviceId
				}
				let { status_code, message } = await api.addDevicesbfcInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showDeviceModel = false
					this.getDevicesbfcList()
				}
			},
			async removeDevice(row) {
				let { status_code } = await api.deleteDevicesbfcInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getDevicesbfcList()
			},
			handleChangeMainRiskPage(val) {
				this.mainRiskPage.pageIndex = val
				this.getMainRiskList()
			},
			handleChangeMainRiskPageSize(val) {
				this.mainRiskPage.pageSize = val
				this.getMainRiskList()
			},
			async getMainRiskList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.mainRiskPage.pageSize,
					page: this.mainRiskPage.pageIndex,
				}
				let { status_code, data } = await api.getMainRiskList(params)
				if(status_code == 200) {
					this.mainRiskData = data.data
					this.mainRiskPage.totalRow = data.total
				}
			},
			openMainRiskModel() {
				this.modeType = 1;
				this.showMainRiskModel = true
			},
			editMainRiskModel(row) {
				this.mainRiskForm = {
					gymc: row.gymc,
					wxgylx: row.wxgylx,
					sjczrs: row.sjczrs,
					zkxt: row.zkxt,
					aqxt: row.aqxt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showMainRiskModel = true
			},
			mainRiskModelChange(status) {
				if(!status) {
					this.mainRiskForm = {
						gymc: '',
						wxgylx: '',
						sjczrs: 0,
						zkxt: '',
						aqxt: '',
					}
				}
			},
			async removeMainRisk(row) {
				let { status_code } = await api.deleteMainRiskInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getMainRiskList()
			},
			async saveMainRisk() {
				let params = {
					...this.mainRiskForm,
					tysj: this.mainRiskForm.tysj ? getDate(new Date(this.mainRiskForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addMainRiskInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showMainRiskModel = false
					this.getMainRiskList()
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
					this.rimData = data.data
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
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(6)} ${(row.wd - 0).toFixed(6)}` : '',
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