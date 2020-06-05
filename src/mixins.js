import Vue from 'vue';
import App from './App';
import storage from 'good-storage';

Vue.mixin({
	data() {
		return {
			modelTypeList: ['新增', '编辑', '查看'],
		}
	},
	methods: {
		hasAuth(value) {
			let authList = storage.get('authList') || []
			return authList.includes(value)
		}
	}
});