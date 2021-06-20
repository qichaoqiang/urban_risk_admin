<template>
  <div class="container">
    <div v-show="hasReload">
      <div class="top">
        <Row type="flex" justify="space-between">
          <!-- <Button type="primary" ghost icon="md-arrow-back" @click="$router.back()"></Button> -->
          <RadioGroup v-model="tab" type="button">
            <Radio label="基本信息"></Radio>
            <Radio label="风险信息" v-if="!noRisk.includes(path)"></Radio>
            <Radio label="风险评估" v-if="$route.query.fxdj !== 'bfj'"></Radio>
          </RadioGroup>
        </Row>
      </div>

      <base-info v-if="tab == '基本信息'"></base-info>
      <risk-info v-if="tab == '风险信息'"></risk-info>
      <div class="fx_content" :style="{'padding-top': '16px', height: tab == '风险评估' ? '500px' : '0px'}">
        <Row type="flex" justify="center">
          <Col>
          <Form :disabled="isDisEditInfo" :model="form" ref="fxy" hide-required-mark label-position="left" :label-width="120"
            style="width: 600px">
            <FormItem label="风险值">
              <InputNumber :min="0" v-model="form.fxz"></InputNumber>
            </FormItem>
            <FormItem label="风险等级">
              <Select clearable v-model="form.fxdj" placeholder="请选择">
                <Option v-for="item in fxdjList" :key="item" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
          </Form>
          </Col>
        </Row>
        <div class="radar" id="radar" v-show="fxgc.length > 0">

        </div>
        <div v-show="fxgc.length === 0" style="text-align: center;">暂无风险图像信息</div>
      </div>
    </div>
  </div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  	// 引入柱状图组件
  	require('echarts/lib/chart/radar')
  	// 引入提示框和title组件
  	require('echarts/lib/component/tooltip')
  import api from '@/api/api'
  import storage from 'good-storage'
  import store from '@/store/index'
  const path = store.state.path[storage.get('userInfo').fxylb]
  console.log(path)
  // resolve => require([`@/views/base/${path}/index.vue`], resolve)
  var baseInfo = resolve => require([`@/views/baseInfo/view/${path}/base.vue`], resolve)
  var riskInfo = resolve => require([`@/views/baseInfo/view/${path}/risk.vue`], resolve)
  // import baseInfo from `@/views/base/${path}/index.vue`
  export default {
    components: {
      baseInfo,
      riskInfo
    },
    props: {
      type: {
        default: 2,
        type: Number
      }
    },
    data() {
      return {
        tab: '基本信息',
        hasReload: false,
        form: {
          fxz: this.$storage.get('fxyInfo') ? this.$storage.get('fxyInfo').fxz - 0 : 0,
          fxdj: this.$storage.get('fxyInfo') ? this.$storage.get('fxyInfo').fxdj : '',
        },
        fxgc: this.$storage.get('fxyInfo') ? (this.$storage.get('fxyInfo').fxgc || []) : [],
        fxdjList: ['重大风险', '较大风险', '一般风险', '低风险'],
        noRisk: ['rfgc', 'fkjbq', 'wf', 'hp', 'dwyldd', 'dzzhyhd', 'yjjyzb', 'bncs'],
        path,
      }
    },
    methods: {
      async submit() {
        let params = {
          ...this.form,
          gkdx_id: this.$storage.get('userInfo').gkdx_id,
        }
        let {
          status_code,
          data,
          message
        } = await api.fxfj(params)
        if (status_code == 200) {
          this.$Message.success(message)
        }
      },
      drawRadar() {
        // let list = data.fengxiangoucheng.map(item => {
        // 				return {
        // 					name: item.mc,
        // 					max: Math.ceil(item.value * 1.5) + 1,
        // 					value: item.value
        // 				}
        // 			})

        let list = this.fxgc.map(item => {
          return {
            name: item.mc,
            max: Math.ceil(item.value * 1.5) + 1,
            value: item.value
          }
        })
        let myChart = echarts.init(document.getElementById('radar'));
        myChart.setOption({
          radar: {
            indicator: list,
            shape: 'circle',
            radius: 100,
            splitNumber: 3,
            name: {
              textStyle: {
                color: 'rgba(16, 56, 140, 0.5)',
                fontSize: 18
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(16, 56, 140, 0.5)'
              }
            },
            splitArea: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(16, 56, 140, 0.5)'
              }
            }
          },
          tooltip: {
            position: ['50%', '50%'],
            // trigger: 'axis'
            // backgroundColor: 'rgba(16, 56, 140, 0.5)'
          },
          series: [{
            name: '风险点信息',
            type: 'radar',
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0.5
              }
            },
            data: [{
              value: list.map(item => item.value)
            }],
            symbol: 'none',
            itemStyle: {
              color: '#10388C'
            },
            lineStyle: {
              color: '#10F6FF'
            },
            areaStyle: {
              opacity: 0.8
            }
          }]
        });
      }
    },
    created() {
      // location.reload()
      if (!this.$storage.get('hasReload')) {
        this.$storage.set('hasReload', 1)
        location.reload()
        // location.replace(location.href + '?type=1')
      } else {
        this.hasReload = true
      }
    },
    mounted() {
      this.drawRadar()
    }
  }
</script>

<style lang="scss" scoped>
  .container::v-deep {
    padding-top: 40px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;

    .top {
      position: absolute;
      top: 0;
      z-index: 1000;
      padding: 8px 0px;
      width: 100%;
      background: #f4f7f9;
    }

    .fx_content {
      overflow: hidden;
      .radar {
        width: 100%!important;
        height: 400px;
        div {
          width: 60%!important;
        }
      }
    }

    .ivu-form-item {
      .ivu-form-item-content {
        .ivu-select-disabled {
          .ivu-select-selection {
            background-color: transparent;
            border: none;
            cursor: default;

            .ivu-select-placeholder {
              padding: 0;
              color: #f4f7f9;
            }

            .ivu-select-selected-value {
              padding: 0;
              color: #515a6e;
            }
          }
        }

        .ivu-input-wrapper {
          .ivu-input {
            padding: 0;
            background-color: transparent;
            border: none;
            color: #515a6e;
            outline: 0;
            box-shadow: none;
            cursor: default;

            &::-webkit-input-placeholder {
              color: #f4f7f9;
            }

            &:focus {
              outline: none;
              border: none;
              box-shadow: none;
            }
          }
        }

        .ivu-input-number {
          border: none;
          background-color: transparent;

          .ivu-input-number-input-wrap {
            .ivu-input-number-input {
              padding: 0;
              background-color: transparent;
              border: none;
              color: #515a6e;
              outline: 0;
              box-shadow: none;

              &::-webkit-input-placeholder {
                color: #f4f7f9;
              }

              &:focus {
                outline: none;
                border: none;
                box-shadow: none;
              }
            }
          }
        }

        .ivu-icon {
          display: none;
        }
      }
    }
  }
</style>
