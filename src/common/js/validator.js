{
	const rules = () => {
		const validatorQuyu = (rule, value, callback) => {
			if (!value || value.length == 0) {
	            callback(new Error('请选择'));
	        } else {
	            callback();
	        }
		}
		const validatorCdfw = (rule, value, callback) => {
			if (!this.baseInfo.cdfw) {
	            callback(new Error('请选择'));
	        } else {
	            callback();
	        }
		}
		const validatorGyy = (rule, value, callback) => {
			if (this.baseInfo.sfzgyy && !this.baseInfo.gyymc) {
				callback(new Error('请输入工业园区名称'));
	        } else {
	            callback();
	        }
		}
		const validatorJbr = (rule, value, callback) => {
			if (!this.baseInfo.jbr || !this.baseInfo.jbrdh || !this.baseInfo.jbryx) {
				callback(new Error('请完成输入'));
	        } else {
	            callback();
	        }
		}
		const validatorQyfzr = (rule, value, callback) => {
			if (!this.baseInfo.qyfzr || !this.baseInfo.fzrdh) {
				callback(new Error('请完成输入'));
	        } else {
	            callback();
	        }
		}
		const validatorFgaqfzr = (rule, value, callback) => {
			if (!this.baseInfo.fgaqfzr || !this.baseInfo.fgaqfzrdh) {
				callback(new Error('请完成输入'));
	        } else {
	            callback();
	        }
		}
		return {
			yxzt: [{ required: true, message: '请选择', trigger: 'change' }],
	    	quyu: [{ required: true, validator: validatorQuyu, trigger: 'change' }],
	    	aqscbzh: [{ required: true, message: '请输入', trigger: 'change' }],
	    	scdz: [{ required: true, message: '请输入', trigger: 'change' }],
	    	lngAndLat: [{ required: true, message: '请选择', trigger: 'change' }],
	    	cdfw: [{ required: true, validator: validatorCdfw, trigger: 'change' }],
	    	sfzgyy: [{ required: true, validator: validatorGyy, trigger: 'change' }],
	    	hyml: [{ required: true, validator: validatorQuyu, trigger: 'change' }],
	    	hydm: [{ required: true, message: '请输入', trigger: 'change' }],
	    	tyshxydm: [{ required: true, message: '请输入', trigger: 'change' }],
	    	zcdz: [{ required: true, message: '请输入', trigger: 'change' }],
	    	qyjbjk: [{ required: true, message: '请输入', trigger: 'change' }],
	    	jbr: [{ required: true, validator: validatorJbr, trigger: 'change' }],
	    	qyfzr: [{ required: true, validator: validatorQyfzr, trigger: 'change' }],
	    	fgaqfzr: [{ required: true, validator: validatorFgaqfzr, trigger: 'change' }],
		}
	},
}