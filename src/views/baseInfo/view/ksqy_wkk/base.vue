<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 1">
			<Row type="flex" justify="center">
				<Col>
					<Row type="flex" justify="end" style="margin-top: 12px">
						<Col>
							<Button type="primary" @click="edit">编辑</Button>
						</Col>
					</Row>
					<part-title text="基本信息"></part-title>
					<Form disabled :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
						<FormItem label="企业名称">
				            {{baseInfo.qymc}}
				        </FormItem>
				        <FormItem label="经营范围">
				        	<Input clearable v-model="baseInfo.jyfw" placeholder="经营范围"></Input>
				        </FormItem>
				        <FormItem label="运行状态">
				            <Select clearable v-model="baseInfo.yxzt" placeholder="运行状态">
				                <Option v-for="item in yxztList" :key="item" :value="item">{{item}}</Option>
				            </Select>
				        </FormItem>
				        <FormItem label="所属区域">
				            <Cascader 
				            	readonly 
				            	change-on-select
				            	v-model="baseInfo.quyu" 
				            	:data="areaList" 
				            	:load-data="loadArea" 
				            	placeholder="所属区域"></Cascader>
				        </FormItem>
				        <FormItem label="安全生产许可证">
				        	<Input clearable v-model="baseInfo.aqscxkz" placeholder="安全生产许可证"></Input>
				        </FormItem>
				        <FormItem label="尾矿库地址">
				        	<Input clearable v-model="baseInfo.wkkdz" placeholder="尾矿库地址"></Input>
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
				        <FormItem label="尾矿库范围">
				        	<div @click.stop="openAreaModal">
			        			<span class="link">查看</span>
			        		</div>
				        </FormItem>
				        <FormItem label="职工人数">
				            <InputNumber :min="0" v-model="baseInfo.zgrs"></InputNumber>
				        </FormItem>
				        <FormItem label="管理人员">
				            <InputNumber :min="0" v-model="baseInfo.glrysl"></InputNumber>
				        </FormItem>
				        <FormItem label="开采时间">
				        	<DatePicker type="date" v-model="baseInfo.kcsj"  placeholder="请选择"></DatePicker>
				        </FormItem>
				        <FormItem label="行业门类">
				        	<Cascader 
				        		clearable 
				        		change-on-select
			        			v-model="baseInfo.hyml" 
			        			:data="industryList" 
			        			:load-data="loadIndustry" 
			        			placeholder="行业门类"></Cascader>
				        </FormItem>
				        <FormItem label="行业代码">
				            <Input clearable v-model="baseInfo.hydm" placeholder="行业代码"></Input>
				        </FormItem>
				        <FormItem label="统一社会信用代码">
				            <Input clearable v-model="baseInfo.tyshxydm" placeholder="统一社会信用代码"></Input>
				        </FormItem>
				        <FormItem label="注册地址">
				        	<Input clearable v-model="baseInfo.zcdz" placeholder="注册地址"></Input>
				        </FormItem>
				        <FormItem label="矿山简况">
				            <Input clearable v-model="baseInfo.ksjk" type="textarea" placeholder="矿山简况"></Input>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="建筑物信息"></part-title>
					<Form disabled :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="占地面积（㎡）">
				        	<InputNumber clearable v-model="baseInfo.zdmj" placeholder="占地面积"></InputNumber>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<div class="line"></div>
			<Row type="flex" justify="center">
				<Col>
					<part-title text="联系人信息"></part-title>
					<Form disabled :model="baseInfo" label-position="left" :label-width="140" style="width: 600px">
				        <FormItem label="企业负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="baseInfo.qyfzr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="baseInfo.qyfzrdh" placeholder="电话"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="分管安全负责人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="baseInfo.fgaqfzr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="baseInfo.fgaqfzrdh" placeholder="电话"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
				        <FormItem label="经办人">
				        	<Row type="flex" :gutter="20">
					        	<Col span="8">
				        			<Input clearable v-model="baseInfo.jbr" :data="areaList" placeholder="姓名"></Input>
				        		</Col>
				        		<Col span="16">
				        			<Input clearable v-model="baseInfo.jbrdh" placeholder="电话"></Input>
				        		</Col>
				        		<Col span="24">
				        			<Input clearable v-model="baseInfo.jbryx" placeholder="邮箱"></Input>
				        		</Col>
				        	</Row>
				        </FormItem>
					</Form>
				</Col>	
			</Row>	
			<!-- <Row type="flex" justify="center">
				<Col>
					<Button type="primary" style="margin: 0 auto; width: 200px;" @click="nextStep">完成</Button>
				</Col>
			</Row> -->
		</div>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div class="title">请完善风险信息</div>
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
							<part-title text="重点监管危险工艺" :btns="['add']" @add="openMainRiskModel"></part-title>
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
							</Row>
						</Col>
					</Row>
					<part-title text="周边情况" :btns="['add']" @add="openRimModel"></part-title>
					<Table :columns="rimColumns" :data="rimData">
						<template slot-scope="{ row }" slot="name">
				            <span class="link">{{row.name}}</span>
				        </template>
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
	            <Row type="flex" align="middle" justify="space-between" v-show="$route.path == 'base'">
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}危险化学品`" v-model="showWhModel" @on-visible-change="whModelChange">
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
			        			<Input clearable v-model="whForm.nzzl"></Input>
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
			        			<Input clearable v-model="whForm.zdccl"></Input>
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}危化品重大危险源`" v-model="showWhRiskModel" @on-visible-change="whRiskModelChange">
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
			        <FormItem label="地图">
			            <Button type="primary" ghost>编辑</Button>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveWhRisk">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}涉爆粉尘工艺`" width="800px" v-model="showSbfcgyModel" @on-visible-change="sbfcgyModelChange">
			<div>
				<Form :model="sbfcgyForm" label-position="left" :label-width="140">
					<FormItem label="粉尘工艺名称">
			        	<Input clearable v-model="sbfcgyForm.sfgymc"></Input>
			        </FormItem>
			        <FormItem label="粉尘名称">
			        	<Input clearable v-model="sbfcgyForm.fcmc"></Input>
			        </FormItem>
			        <FormItem label="粉尘类型">
			        	<Select clearable v-model="sbfcgyForm.fclx" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
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
				<part-title text="除尘设施" :btns="['add']" @add="openRimModel"></part-title>
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
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveSbfcgy">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}除尘设施`" v-model="showDeviceModel" @on-visible-change="deviceModelChange">
			<div>
				<Form :model="deviceForm" label-position="left" :label-width="140">
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}重点监管危险工艺`" v-model="showMainRiskModel">
			<div>
				<Form :model="mainRiskForm" label-position="left" :label-width="140">
					<FormItem label="工艺名称">
			        	<Input clearable v-model="mainRiskForm.name"></Input>
			        </FormItem>
			        <FormItem label="危险工艺类型">
			        	<Select clearable v-model="mainRiskForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="工艺操作人数">
			            <InputNumber :min="0" v-model="mainRiskForm.num"></InputNumber>
			        </FormItem>
			        <FormItem label="自控系统">
			            <Select clearable v-model="mainRiskForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>	
			        <FormItem label="安全系统">
			            <Select clearable v-model="mainRiskForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveMainRisk">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}周边情况`" v-model="showRimModel">
			<div>
				<Form :model="rimForm" label-position="left" :label-width="140">
					<FormItem label="敏感目标名称">
			        	<Input clearable v-model="rimForm.name"></Input>
			        </FormItem>
			        <FormItem label="方位">
			        	<Select clearable v-model="rimForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="目标类型">
			            <Select clearable v-model="rimForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="目标距离(m)">
			        	<InputNumber :min="0" v-model="rimForm.num"></InputNumber>
			        </FormItem>	
			        <FormItem label="人员数量">
			        	<InputNumber :min="0" v-model="rimForm.num"></InputNumber>
			        </FormItem>
			        <FormItem label="地图">
			            <Button type="primary" ghost>编辑</Button>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveMainRisk">保存</Button>
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
	import lngjs from '@/common/js/lng_'
	import datePickerjs from '@/common/js/datePicker'
	import { getDate } from '@/utils/tool'
	export default {
		name: '',
		mixins: [tablejs, areajs, industryjs, lngjs, datePickerjs],
		components: { partTitle },
		data() {
			return {
				id: '',
				gkdx_id: this.$storage.get('userInfo').gkdx_id,
				loading: true,
				step: 1,	
				showAreaModel: false,
				showLngModel: false,
				showWhModel: false,
				showWhRiskModel: false,
				showSbfcgyModel: false,
				showDeviceModel: false,
				showMainRiskModel: false,
				showRimModel: false,
				modeType: '',
				map: null,
				polygonTool: null,
				baseInfo: {
					qymc: '企业名称',
					tyshxydm: '',
					zcdz: '',
					zgrs: 0,
					glrysl: 0,
					hyml: [],
					hydm: '',
					aqscxkz: '',
					ksjk: '',
					yxzt: '',
					jbr: '',
					jbrdh: '',
					jbryx: '',
					qyfzr: '',
					qyfzrdh: '',
					fgaqfzr: '',
					fgaqfzrdh: '',
					wkkdz: '',
					lngAndLat: '',
					wkkfw: '',
					jyfw: '',
					kcsj: '',
					zdmj: 0
				},
				yxztList: ['在用', '闭库'],
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
				sbfcgyColumns: [
					{
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '涉粉工艺名称',
                        key: 'sfgymc',
                    }, {
                        title: '粉尘名称',
                        key: 'fcmc',
                    }, {
                        title: '粉尘类型',
                        key: 'fclx',
                    }, {
                        title: '作业人数',
                        key: 'zyrs',
                    }, {
                        title: '当前状态',
                        key: 'dqzt',
                    }, {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				sbfcgyData: [],
				sbfcgyForm: {
					sfgymc: '',
					fcmc: '',
					fclx: '',
					zyrs: 0,
					ccss: '',
					dqzt: ''
				},
				ccssList: ['有', '无'],
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
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '除尘设施名称',
                        key: 'ccssmc',
                    }, {
                        title: '类型',
                        key: 'lx',
                    }, {
                        title: '投用时间',
                        key: 'tysj',
                    }, {
                        title: '运行状态',
                        key: 'yxzt',
                    },{
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				deviceData: [],
				deviceForm: {
					sbfcgy_id: '',
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
                        title: '序号',
                        type: 'index',
                    }, {
                        title: '工艺名称',
                        slot: 'gymc',
                    }, {
                        title: '危险工艺类型',
                        key: 'wxgylx',
                    }, {
                        title: '工艺操作人数',
                        key: 'sjczrs',
                    },{
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				mainRiskData: [],
				mainRiskForm: {
					num: 0,
					name: '',
				},
				mainRiskPage: {
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
                        slot: 'name',
                    }, {
                        title: '方位',
                        key: 'cas',
                    }, {
                        title: '目标类型',
                        key: 'cas',
                    }, {
                        title: '人员数量',
                        key: 'cas',
                    },{
                        title: '操作',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				rimData: [
					{	
						name: 'hahaha',
						cas: 1111,
						color: 'red'
					}
				],
				rimForm: {
					num: 0,
					name: '',
				},
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
				let { status_code, data, message } = await api.getKsqywkkBase(this.gkdx_id);
				if(status_code == 0) {
					this.form = data;
					let { qymc, tyshxydm, zcdz, sfzgyyq, yqmc, hyml, hydm, aqscxkz, zgrs, glrysl, ksjk, yxzt, jbr, jbrdh, jbryx, qyfzr, qyfzrdh, fgaqfzr, fgaqfzrdh, wkkdz, lngAndLat, wkkfw, zdmj, kcsj, jyfw } = this.form
					this.baseInfo = { qymc, tyshxydm, zcdz, sfzgyyq, yqmc, hydm, aqscxkz, zgrs, glrysl, ksjk, yxzt, jbr, jbrdh, jbryx, qyfzr, qyfzrdh, fgaqfzr, fgaqfzrdh, wkkdz, wkkfw, jyfw }
					this.baseInfo.zgrs = zgrs ? Number(zgrs) : 0
					this.baseInfo.glrysl = glrysl ? Number(glrysl) : 0
					this.baseInfo.kcsj = kcsj ? new Date(kcsj) : '',
					this.baseInfo.zdmj = zdmj ? Number(zdmj) : 0
					this.baseInfo.lngAndLat = this.form.jd && this.form.wd ? `${(this.form.jd - 0).toFixed(6)} ${(this.form.wd - 0).toFixed(6)}` : ''
					this.getHy();
					this.getQy();
				}
			},
			async nextStep() {
				let params = {
					...this.baseInfo,
					...this.baseInfo,
					...this.baseInfo,
					hyml: this.baseInfo.hyml[this.baseInfo.hyml.length - 1],
					jd: this.baseInfo.lngAndLat.split(' ')[0],
					wd: this.baseInfo.lngAndLat.split(' ')[1],
				}	 
				if(this.$route.query.type == 2) {
					params.gkdx_id = this.form.gkdx_id
				}
				delete params.quyu
				delete params.lngAndLat
				let { status_code, message } = await api.addKsqywkkBase(params);
				if(status_code == 200) {
					this.$Message.success('保存成功')
					if(this.$route.query.type == 2) {
						this.$storage.set('gkdx_id', this.form.gkdx_id)
						this.$router.back()
					}else {
						let { status_code, data } = await api.getKsqywkkBase()
						if(status_code == 200) {
							this.$storage.set('gkdx_id', data.data[0].gkdx_id)
						}
						this.$router.replace('/baseInfo')
					}
					// if(this.$route.query.type == 2) {
					// 	this.$storage.set('gkdx_id', this.form.gkdx_id)
					// }else {
					// 	let { status_code, data } = await api.getKsqywkkBase()
					// 	if(status_code == 200) {
					// 		this.$storage.set('gkdx_id', data.data[0].gkdx_id)
					// 	}
					// }
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
			edit() {
				this.$storage.set('baseInfo', this.baseInfo);
				this.$storage.set('addressInfo', this.addressInfo);
				this.$storage.set('contactInfo', this.contactInfo);
				this.$storage.set('mostForm', this.mostForm);
				this.$storage.set('form', this.form);
				this.$router.push({
					path: '/base',
					query: {
						type: 2
					}
				})
			},
			openAreaModal() {	
				this.showAreaModel = true;
				this.$nextTick(() => {
					let self = this;
					let geolocation = new BMap.Geolocation();
					geolocation.getCurrentPosition(e => {
						if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
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
				            if(this.baseInfo.wkkfw) {
				            	let wkkfw = JSON.parse(this.baseInfo.wkkfw)
				            	let points = wkkfw.map(item => {
				            		return new T.LngLat(item.lng, item.lat)
				            	})
				            	this.map.addOverLay(new T.Polygon(points, config));
				            }
						}else {
							alert('failed'+geolocation.getStatus());
						}        
					},{enableHighAccuracy: true})
					// let lo = new T.Geolocation();
		    //         lo.getCurrentPosition((e) => {
						// this.map = new T.Map('area_box');
						// this.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 10);
						// var config = {
			   //              showLabel: true,
			   //              color: "blue", 
			   //              weight: 3, 
			   //              opacity: 0.5, 
			   //              fillColor: "#FFFFFF", 
			   //              fillOpacity: 0.5
			   //          };	
			   //          //创建标注工具对象
			   //          this.polygonTool = new T.PolygonTool(this.map, config);
			   //          if(this.baseInfo.wkkfw) {
			   //          	let wkkfw = JSON.parse(this.baseInfo.wkkfw)
			   //          	let points = wkkfw.map(item => {
			   //          		return new T.LngLat(item.lng, item.lat)
			   //          	})
			   //          	this.map.addOverLay(new T.Polygon(points, config));
			   //          }
		    //         });
				})
			},
			openArea() {
				let self = this
				this.polygonTool.open();
				this.polygonTool.addEventListener('draw', (e) => {
					// 获取绘制的多边形信息
					console.log(e);
					this.baseInfo.wkkfw = JSON.stringify(e.currentLnglats)
				})
			},
			clearArea() {
				this.baseInfo.wkkfw = ''
				this.map.clearOverLays()
			},
			cancelArea() {
				this.map.clearOverLays();
				this.map = null;
				this.polygonTool = null;
				this.baseInfo.wkkfw = this.wkkfw || this.form.wkkfw || '';
				this.showAreaModel = false
			},
			saveArea() {
				this.wkkfw = this.baseInfo.wkkfw;
				this.form.wkkfw = this.baseInfo.wkkfw;
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
					nzzl: row.nzzl,
					nzzldw: row.nzzldw,
					zdccl: row.zdccl,
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
			openSbfcgyModel() {
				this.modeType = 1;
				this.showSbfcgyModel = true
			},
			editSbfcgyModel(row) {
				this.sbfcgyForm = {
					sfgymc: row.sfgymc,
					fcmc: row.fcmc,
					fclx: row.fclx,
					zyrs: row.zyrs,
					ccss: row.ccss,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.modeType = 2;
				this.showSbfcgyModel = true
			},
			sbfcgyModelChange(status) {
				if(!status) {
					this.sbfcgyForm = {
						sfgymc: '',
						fcmc: '',
						fclx: '',
						zyrs: 0,
						ccss: '',
						dqzt: ''
					}
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
				this.getDeviceList()
			},
			handleChangeDevicePageSize(val) {
				this.devicePage.pageSize = val
				this.getDeviceList()
			},
			async getDeviceList() {
				let params = {
					gkdx_id: this.gkdx_id,
					per_page: this.devicePage.pageSize,
					page: this.devicePage.pageIndex,
				}
				let { status_code, data } = await api.getDeviceList(params)
				if(status_code == 200) {
					this.deviceData = data.data
					this.devicePage.totalRow = data.total
				}
			},
			openDeviceModel() {
				this.modeType = 1;
				this.showDeviceModel = true
			},
			editDeviceModel(row) {
				this.deviceForm = {
					sfgymc: row.sfgymc,
					fcmc: row.fcmc,
					fclx: row.fclx,
					zyrs: row.zyrs,
					ccss: row.ccss,
					dqzt: row.dqzt
				}
				this.id = row.id
				this.modeType = 2;
				this.showDeviceModel = true
			},
			deviceModelChange(status) {
				if(!status) {
					this.deviceForm = {
						sfgymc: '',
						fcmc: '',
						fclx: '',
						zyrs: 0,
						ccss: '',
						dqzt: ''
					}
				}
			},
			async saveDevice() {
				let params = {
					...this.deviceForm,
					gkdx_id: this.gkdx_id
				}
				if(this.modeType == 2) {
					params.id = this.id
				}
				let { status_code, message } = await api.addDeviceInfo(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showDeviceModel = false
					this.getDeviceList()
				}
			},
			async removeDevice(row) {
				let { status_code } = await api.deleteDeviceInfo(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getDeviceList()
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
					zdwxydymc: row.zdwxydymc,
					zdwxydj: row.zdwxydj,
					wxhxp: row.wxhxp,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showMainRiskModel = true
			},
			mainRiskModelChange(status) {
				if(!status) {
					this.mainRiskForm = {
						zdwxydymc: '',
						zdwxydj: '',
						wxhxp: '',
						tysj: '',
						dqzt: ''
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
					zdwxydymc: row.zdwxydymc,
					zdwxydj: row.zdwxydj,
					wxhxp: row.wxhxp,
					tysj: row.tysj ? new Date(row.tysj) : '',
					dqzt: row.dqzt,
				}
				this.id = row.id
				this.modeType = 2;
				this.showRimModel = true
			},
			rimModelChange(status) {
				if(!status) {
					this.rimForm = {
						zdwxydymc: '',
						zdwxydj: '',
						wxhxp: '',
						tysj: '',
						dqzt: ''
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
					tysj: this.rimForm.tysj ? getDate(new Date(this.rimForm.tysj).getTime(), 'date') : '',
					gkdx_id: this.gkdx_id
				}
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