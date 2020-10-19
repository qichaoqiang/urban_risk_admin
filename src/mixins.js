import Vue from 'vue';
import App from './App';
import storage from 'good-storage';

Vue.mixin({
	data() {
		return {
	        // isDl: location.pathname.indexOf('dashboard') > -1 || process.env.NODE_ENV === 'development',
	        // isDl: location.pathname.indexOf('dashboard') > -1 || ['arae', 'industry', 'poi'].includes(this.$route.name),
			modelTypeList: ['新增', '编辑', '查看'],
		}
	},
	computed: {
		isDl() {
			console.log(this.$route.name)
			return location.pathname.indexOf('dashboard') > -1 || ['area', 'industry', 'poi'].includes(this.$route.name)
		}
	},
	methods: {
		hasAuth(value) {
			let authList = storage.get('authList') || []
			return authList.includes(value)
		}
	}
});