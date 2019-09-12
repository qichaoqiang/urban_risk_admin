# 税务师内嵌h5页面

## Project setup
```
yarn / npm install
```

### Compiles and hot-reloads for development
```
yarn serve / npm run serve
```

### Compiles and minifies for production
```
yarn build / npm run build
```

### Lints and fixes files
```
yarn lint / npm run lint
```

### 模块整合(本地开发环境,因微信支付、短信短链接、微信公众号等配置，需内网穿透)

```javascript

// 入口渠道
// 专家主页： http://tax-advisor-local.int.anniu-tech.com/ExpertHome?userId=%s
// 答题卡： http://tax-advisor-local.int.anniu-tech.com/answerSheet?id=%s
// 知识卡： http://tax-advisor-local.int.anniu-tech.com/knowledgeCards?id=%s
// 微信公众号 安全域名配置，授权网页域名配置，安全接口域名配置
// http://tax-advisor-local.int.anniu-tech.com
// 微信支付 商户服务地址目录配置
// http://tax-advisor-local.int.anniu-tech.com
// 短信短链接分享地址配置
// http://tax-advisor-local.int.anniu-tech.com/knowledgeCards?id=%s
// app端我的名片分享二维码对应链接地址
// http://tax-advisor-local.int.anniu-tech.com/ExpertHome?userId=%s

```

### 模块整合(外网测试环境，需微信支付、短信短链接、微信公众号等配置)

```javascript

// 入口渠道
// 专家主页：  http://h5-tax-advisor-wap.int.anniu-tech.com/ExpertHome?userId=%s
// 答题卡：  http://h5-tax-advisor-wap.int.anniu-tech.com/answerSheet?id=%s
// 知识卡：  http://h5-tax-advisor-wap.int.anniu-tech.com/knowledgeCards?id=%s
// 微信公众号 安全域名配置，授权网页域名配置，安全接口域名配置
// http://h5-tax-advisor-wap.int.anniu-tech.com
// 微信支付 商户服务地址目录配置
// http://h5-tax-advisor-wap.int.anniu-tech.com
// 短信短链接分享地址配置
// http://h5-tax-advisor-wap.int.anniu-tech.com/knowledgeCards?id=%s
// app端我的名片分享二维码对应链接地址
// http://h5-tax-advisor-wap.int.anniu-tech.com/ExpertHome?userId=%s

```

### 模块整合(正式环境，需微信支付、短信短链接、微信公众号等配置)

```javascript

// 入口渠道
// 专家主页：  https://wap.taxlioner.com/ExpertHome?userId=%s
// 答题卡：  https://wap.taxlioner.com/answerSheet?id=%s
// 知识卡：  https://wap.taxlioner.com/knowledgeCards?id=%s
// 微信公众号 安全域名配置，授权网页域名配置，安全接口域名配置
// https://wap.taxlioner.com
// 微信支付 商户服务地址目录配置
// https://wap.taxlioner.com
// 短信短链接分享地址配置
// https://wap.taxlioner.com/knowledgeCards?id=%s
// app端我的名片分享二维码对应链接地址
// https://wap.taxlioner.com/ExpertHome?userId=%s

```
