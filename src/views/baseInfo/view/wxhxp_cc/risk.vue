<template>
	<div class="page">
		<Spin fix v-show="loading"></Spin>
		<div v-show="step == 2">
			<Row type="flex" justify="center">
				<Col span="22">
					<div v-show="!isDisEditInfo" class="title">请完善风险信息</div>
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
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editWhModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeWh(row)">
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
				        <TabPane label="危险工艺" name="name2">
				        	<part-title text="危险工艺" :btns="['add']" @add="openMainRiskModel"></part-title>
								<Table :columns="mainRiskColumns" :data="mainRiskData">
									<template slot-scope="{ row }" slot="action">
							            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editMainRiskModel(row)">编辑</Button>
							            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeMainRisk(row)">
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
				        </TabPane>
				        <TabPane label="储存设施" name="name3">
				        	<!-- <part-title text="生产装置" :btns="['add']" @add="openSczzModel"></part-title>
							<Table :columns="sczzColumns" :data="sczzData">
								<template slot-scope="{ row }" slot="wxhxp">
									<span>{{row.wxhxp ? '有' : '无'}}</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editSczzModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSczz(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="sczzPage.pageSize"
				                    :total="sczzPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeSczzPage"
				                    @on-page-size-change="handleChangeSczzPageSize"
				                />
							</Row> -->
							<part-title text="储存设施" :btns="['add']" @add="openCcssModel"></part-title>
							<Table :columns="ccssColumns" :data="ccssData">
								<template slot-scope="{ row }" slot="wxhxp">
									<span>{{row.wxhxp ? '有' : '无'}}</span>
								</template>
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editCcssModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeCcss(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="ccssPage.pageSize"
				                    :total="ccssPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeCcssPage"
				                    @on-page-size-change="handleChangeCcssPageSize"
				                />
							</Row>
				        </TabPane>
				        <TabPane label="周边环境" name="name5">
				        	<part-title text="周边环境" :btns="['add']" @add="openRimModel"></part-title>
				        	<div style="margin-bottom: 16px;">说明：调查周边1000m范围</div>
							<Table :columns="rimColumns" :data="rimData">
								<template slot-scope="{ row }" slot="action">
						            <Button v-show="!isDisEditInfo" type="primary" size="small" ghost style="margin-right: 5px" @click="editRimModel(row)">编辑</Button>
						            <Poptip v-show="!isDisEditInfo" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRim(row)">
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
					<!-- <part-title text="危化品重大危险源" :btns="['add']" @add="openWhRiskModel"></part-title>
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
					</Row> -->
					<!-- <part-title text="工艺信息"></part-title>
					<Row type="flex" justify="end">
						<Col span="23">
							<part-title text="涉爆粉尘工艺" :btns="['add']" @add="openSczzModel"></part-title>
							<Row type="flex" :gutter="100">
								<Col>工艺数量：{{sczzNum.gysl || 0}}</Col>
								<Col>涉粉作业总人数：{{sczzNum.zyzrs || 0}}</Col>
							</Row>
							<Table :columns="sczzColumns" :data="sczzData">
								<template slot-scope="{ row }" slot="action">
						            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editSczzModel(row)">编辑</Button>
						            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSczz(row)">
								        <Button type="error" size="small" ghost>删除</Button>
								    </Poptip>
						        </template>
							</Table>
							<Row type="flex" justify="end">
								<Page
				                    size="small"
				                    style="margin-top: 10px"
				                    :page-size="sczzPage.pageSize"
				                    :total="sczzPage.totalRow"
				                    show-elevator
				                    show-total
				                    show-sizer
				                    @on-change="handleChangeSczzPage"
				                    @on-page-size-change="handleChangeSczzPageSize"
				                />
							</Row>
						</Col>
					</Row> -->
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}危险化学品`" v-model="showWhModel" @on-visible-change="whModelChange">
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}危险工艺`" v-model="showMainRiskModel" @on-visible-change="mainRiskModelChange">
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}危化品重大危险源`" v-model="showWhRiskModel" @on-visible-change="whRiskModelChange">
			<div>
				<Form :model="whRiskForm" label-position="left" :label-width="120">
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
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}生产装置`" width="800px" v-model="showSczzModel" @on-visible-change="sczzModelChange">
			<div>
				<Form :model="sczzForm" label-position="left" :label-width="120">
					<FormItem label="单元名称">
			        	<Input clearable v-model="sczzForm.zzdymc"></Input>
			        </FormItem>
			        <FormItem label="重大危险源">
			        	<Select clearable v-model="sczzForm.zdwxy" placeholder="请选择">
			                <Option v-for="item in zdwxyList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="是否危险工艺">
			        	<Row type="flex" :gutter="20">
			        		<Col span="6">
					        	<Select clearable v-model="sczzForm.isWxgy" placeholder="请选择">
					                <Option v-for="item in sfzgyyqList" :key="item.value" :value="item.value">{{item.name}}</Option>
					            </Select>
			        		</Col>
			        		<Col span="18">
			        			<Select v-show="sczzForm.isWxgy == 1" clearable v-model="sczzForm.wxgy" placeholder="请选择危险工艺类型">
					                <Option v-for="item in wxgylxList" :key="item" :value="item">{{item}}</Option>
					            </Select>
			        		</Col>
			        	</Row>
			        </FormItem>
			        <FormItem label="装置运行压力">
			        	<Row type="flex" align="middle">
	            			<Col>
	            				<InputNumber :min="0" v-model="sczzForm.zzyxyl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="sczzForm.zzyxyldw" placeholder="单位">
					                <Option v-for="item in zzyxylList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="装置运行温度（℃）">
			        	<InputNumber :min="0" v-model="sczzForm.zzyxwd"></InputNumber>
			        </FormItem>
			        <FormItem label="投用时间">
			            <DatePicker type="date" v-model="sczzForm.tysj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前状态">
			            <Select clearable v-model="sczzForm.dqzt" placeholder="请选择">
			                <Option v-for="item in dqztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="经纬度">
			        	<lng :lngAndLat.sync="sczzForm.lngAndLat"></lng>
			        	<!-- <div @click="openLngModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.lngAndLat" 
		        				icon="md-pin" 
		        				placeholder="经纬度" />
		        		</div> -->
			        </FormItem>
			        <FormItem label="区域范围">
			        	<qyfw :qyfw.sync="sczzForm.dtfw"></qyfw>
			        	<!-- <div @click.stop="openAreaModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.qyfw" 
		        				icon="md-pin" 
		        				placeholder="区域范围" />
		        		</div> -->
			        </FormItem>
				</Form>
				<div>
					<part-title text="危险化学品" :btns="['add']" @add="openSjwxhxpModel"></part-title>
					<Table :columns="sjwxhxpColumns" :data="sjwxhxpData">
						<template slot-scope="{ row, index }" slot="sl">
							<span>{{row.sl}}{{row.sldw}}</span>
						</template>
						<template slot-scope="{ row, index }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editSjwxhxpModel(row, index)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSjwxhxp(index)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
				</div>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveSczz">保存</Button>
	        </div>
		</Modal>

		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}储存设施`" width="800px" v-model="showCcssModel" @on-visible-change="ccssModelChange">
			<div>
				<Form :model="ccssForm" label-position="left" :label-width="120">
					<FormItem label="名称">
			        	<Input clearable v-model="ccssForm.ccssdymc"></Input>
			        </FormItem>
			        <FormItem label="类型">
			        	<Select clearable v-model="ccssForm.lx" placeholder="请选择">
			                <Option v-for="item in lxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="储存温度（℃）" v-if="ccssForm.lx == '独立仓库'">
			        	<InputNumber :min="0" v-model="ccssForm.ccwd"></InputNumber>
			        </FormItem>
			        <FormItem label="重大危险源">
			        	<Select clearable v-model="ccssForm.zdwxy" placeholder="请选择">
			                <Option v-for="item in zdwxyList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="投用时间">
			            <DatePicker type="date" v-model="ccssForm.tysj"  placeholder="请选择"></DatePicker>
			        </FormItem>
			        <FormItem label="当前状态">
			            <Select clearable v-model="ccssForm.dqzt" placeholder="请选择">
			                <Option v-for="item in dqztList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="经纬度">
			        	<lng :lngAndLat.sync="ccssForm.lngAndLat" id="lng_box_ccss"></lng>
			        	<!-- <div @click="openLngModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.lngAndLat" 
		        				icon="md-pin" 
		        				placeholder="经纬度" />
		        		</div> -->
			        </FormItem>
			        <FormItem label="区域范围">
			        	<qyfw :qyfw.sync="ccssForm.dtfw" id="area_box_ccss"></qyfw>
			        	<!-- <div @click.stop="openAreaModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.qyfw" 
		        				icon="md-pin" 
		        				placeholder="区域范围" />
		        		</div> -->
			        </FormItem>
				</Form>
				<div v-show="ccssForm.lx == '地上罐区' || ccssForm.lx == '埋地罐区'">
					<part-title text="罐区" :btns="['add']" @add="openGqscModel"></part-title>
					<Table :columns="gqscColumns" :data="gqscData">
						<template slot-scope="{ row }" slot="rj">
				            <span>{{row.rj}}{{row.rjdw}}</span>
				        </template>
						<template slot-scope="{ row }" slot="yl">
				            <span>{{row.yl}}{{row.yldw}}</span>
				        </template>
						<template slot-scope="{ row, index }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editGqscModel(row, index)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeGqsc(index)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
				</div>
				<div>
					<part-title text="涉及危险化学品" :btns="['add']" @add="openSjwxhxpModel"></part-title>
					<Table :columns="sjwxhxpColumns" :data="sjwxhxpData">
						<template slot-scope="{ row, index }" slot="sl">
							<span>{{row.sl}}{{row.sldw}}</span>
						</template>
						<template slot-scope="{ row, index }" slot="action">
				            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="editSjwxhxpModel(row, index)">编辑</Button>
				            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeSjwxhxp(index)">
						        <Button type="error" size="small" ghost>删除</Button>
						    </Poptip>
				        </template>
					</Table>
				</div>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveCcss">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}涉及危险化学品`" v-model="showSjwxhxpModel" @on-visible-change="sjwxhxpModelChange">
			<div>
				<Form :model="sjwxhxpForm" label-position="left" :label-width="120">
					<FormItem label="化学品名">
						<Select clearable v-model="sjwxhxpForm.hxpm" placeholder="请选择">
			                <Option v-for="item in whList" :key="item.id" :value="item.hxpm">{{item.hxpm}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="类型">
			        	<Row type="flex" align="middle">
	            			<Col>
	            				<InputNumber :min="0" v-model="sjwxhxpForm.sl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="sjwxhxpForm.sldw" placeholder="单位">
					                <Option v-for="item in nzzldwList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveSjwxhxp">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType2 == 1 ? '新增' : '编辑'}罐区`" v-model="showGqscModel" @on-visible-change="gqscModelChange">
			<div>
				<Form :model="gqscForm" label-position="left" :label-width="120">
					<FormItem label="罐区名称">
			        	<Input clearable v-model="gqscForm.gm"></Input>
			        </FormItem>
			        <FormItem label="类型">
			        	<Select clearable v-model="gqscForm.gx" placeholder="请选择">
			                <Option v-for="item in gxList" :key="item" :value="item">{{item}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="容积">
			            <Row type="flex" align="middle">
	            			<Col>
	            				<InputNumber :min="0" v-model="gqscForm.rj"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="gqscForm.rjdw" placeholder="单位">
					                <Option v-for="item in rjdwList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="压力">
			            <Row type="flex" align="middle">
	            			<Col>
	            				<InputNumber :min="0" v-model="gqscForm.yl"></InputNumber>
	            			</Col>
	            			<Col>
	            				<Select clearable v-model="gqscForm.yldw" placeholder="单位">
					                <Option v-for="item in zzyxylList" :key="item" :value="item">{{item}}</Option>
					            </Select>
	            			</Col>
	            		</Row>
			        </FormItem>
			        <FormItem label="温度（℃）">
			        	<InputNumber :min="0" v-model="gqscForm.wd"></InputNumber>
			        </FormItem>
				</Form>
			</div>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveGqsc">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}周边环境`" v-model="showRimModel"  @on-visible-change="rimModelChange">
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
			        	<lng :lngAndLat.sync="rimForm.lngAndLat" id="lng_box_wxhxpcc"></lng>
			        	<!-- <div @click="openLngModal">
		        			<Input 
		        				readonly 
		        				v-model="rimForm.lngAndLat" 
		        				icon="md-pin" 
		        				placeholder="经纬度" />
		        		</div> -->
			        </FormItem>
			        <FormItem label="区域范围">
			        	<qyfw :qyfw.sync="rimForm.qyfw" id="area_box_wxhxpcc"></qyfw>
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
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.sczzPage.pageIndex- 1) * this.sczzPage.pageSize + 1);
				        }
                    }, {
                        title: '装置单元名称',
                        key: 'zzdymc',
                        minWidth: 120
                    }, {
                        title: '重大危险源',
                        key: 'zdwxy',
                        minWidth: 110
                    }, {
                        title: '危险化学品',
                        slot: 'wxhxp',
                        minWidth: 110
                    }, {
                        title: '危险工艺',
                        key: 'wxgy',
                        minWidth: 100
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
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.ccssPage.pageIndex- 1) * this.ccssPage.pageSize + 1);
				        }
                    }, {
                        title: '储存设施单元名称',
                        key: 'ccssdymc',
                        minWidth: 160
                    }, {
                        title: '类型',
                        key: 'lx',
                        minWidth: 100
                    }, {
                        title: '重大危险源',
                        key: 'zdwxy',
                        minWidth: 110
                    }, {
                        title: '危险化学品',
                        slot: 'wxhxp',
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
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.sjwxhxpPage.pageIndex- 1) * this.sjwxhxpPage.pageSize + 1);
				        }
                    }, {
                        title: '化学品名',
                        key: 'hxpm',
                        minWidth: 100
                    }, {
                        title: '数量',
                        slot: 'sl',
                        minWidth: 80
                    }, {
                        title: '操作',
                        fixed: 'right',
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
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.gqscPage.pageIndex- 1) * this.gqscPage.pageSize + 1);
				        }
                    }, {
                        title: '罐名',
                        key: 'gm',
                        minWidth: 100
                    }, {
                        title: '罐型',
                        key: 'gx',
                        minWidth: 100
                    }, {
                        title: '容积',
                        slot: 'rj',
                        minWidth: 100
                    }, {
                        title: '压力',
                        slot: 'yl',
                        minWidth: 100
                    }, {
                        title: '温度（℃）',
                        key: 'wd',
                        minWidth: 110
                    }, {
                        title: '操作',
                        fixed: 'right',
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
                        minWidth: 110
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
				wxgylxList: ['光气及光气化工艺', '电解工艺（氯碱）', '氯化工艺', '硝化工艺', '合成氨工艺', '裂解（裂化）工艺', '氟化工艺', '加氢工艺', '重氮化工艺', '氧化工艺', '过氧化工艺', '胺基化工艺', '磺化工艺', '聚合工艺', '烷基化工艺', '新型煤化工工艺', '电石生产工艺', '偶氮化工艺',],
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
				let sczzParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.sczzPage.pageSize,
					page: this.sczzPage.pageIndex,
				}
				let ccssParams = {
					gkdx_id: this.gkdx_id,
					per_page: this.ccssPage.pageSize,
					page: this.ccssPage.pageIndex,
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
				Promise.all([api.getWhsbfcList(whParams), api.getSczzList(sczzParams), api.getCcssList(ccssParams), api.getMainRiskList(mainRiskParams), api.getRimList(rimParams)]).then((result) => {
				  	let whRes = result[0], sczzRes = result[1], ccssRes = result[2], mainRiskRes = result[3], rimRes = result[4]
				  	if(whRes.status_code == 200) {
				  		this.whData = whRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.whPage.totalRow = whRes.data.total
				  	}
				  	if(sczzRes.status_code == 200) {
				  		this.sczzData = sczzRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.sczzPage.totalRow = sczzRes.data.total
				  		let { gysl, zyzrs } = sczzRes
				  		this.sczzNum = { gysl, zyzrs }
				  	}
				  	if(ccssRes.status_code == 200) {
				  		this.ccssData = ccssRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.ccssPage.totalRow = ccssRes.data.total
				  	}
				  	if(mainRiskRes.status_code == 200) {
				  		this.mainRiskData = mainRiskRes.data.data.filter(item => item.gkdx_id == this.gkdx_id)
				  		this.mainRiskPage.totalRow = mainRiskRes.data.total
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
				this.gqscData = row.gqxx ? JSON.parse(row.gqxx) : []
				this.modeType = 2;
				this.showCcssModel = true
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
					this.gqscData = []
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
					gqxx: this.gqscData.length > 0 ? JSON.stringify(this.gqscData) : '',
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
				this.modeType2 = 1;
				this.showGqscModel = true
			},
			editGqscModel(row, index) {
				this.gqscForm = {
					gm: row.gm,
					gx: row.gx,
					rj: row.rj ? Number(row.rj) : 0,
					rjdw: row.rjdw,
					yl: row.yl ? Number(row.yl) : 0,
					yldw: row.yldw,
					wd: row.wd ? Number(row.wd) : 0,
				}
				this.gqscId = index
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
				if(this.modeType2 == 2) {
					this.gqscData.splice(this.gqscId, 1, this.gqscForm)
				}else {
					this.gqscData.push(this.gqscForm)
				}
				this.showGqscModel = false
			},
			async removeGqsc(index) {
				this.sjwxhxpData.splice(index, 1)
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