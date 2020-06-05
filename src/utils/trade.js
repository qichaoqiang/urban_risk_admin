export const list = [
	{
		"id": 1,
		"info": "工业风险源",
		"parentId": null,
		"icon": 'industrial-1',
		'index': 1,
	},
	{
		"id": 2,
		"info": "危险化学品",
		"parentId": 1,
		"icon": 'industrial-2',
		'index': 2,
	},
	{
		"id": 3,
		"info": "生产企业",
		"parentId": 2,
		"icon": null,
		'index': 3,
	},
	{
		"id": 4,
		"info": "储存企业(带仓储经营)",
		"parentId": 2,
		"icon": null,
		'index': 3,
	},
	{
		"id": 5,
		"info": "使用企业",
		"parentId": 2,
		"icon": null,
		'index': 3,
	},
	{
		"id": 6,
		"info": "三场所三企业",
		"parentId": 1,
		"icon": 'industrial-3',
		'index': 2,
	},
	{
		"id": 7,
		"info": "涉氨制冷企业",
		"parentId": 6,
		"icon": null,
		'index': 3,
	},
	{
		"id": 8,
		"info": "人员密集场所",
		"parentId": null,
		"icon": 'people-1',
		'index': 1,
	},
	{
		"id": 9,
		"info": "餐饮",
		"parentId": 8,
		"icon": 'people-2',
		'index': 2,
	},
	{
		"id": 10,
		"info": "生产企业1",
		"parentId": 9,
		"icon": null,
		'index': 3,
	},
	{
		"id": 11,
		"info": "储存企业(带仓储经营)1",
		"parentId": 9,
		"icon": null,
		'index': 3,
	},
	{
		"id": 12,
		"info": "使用企业1",
		"parentId": 9,
		"icon": null,
		'index': 3,
	},
	{
		"id": 13,
		"info": "酒店",
		"parentId": 8,
		"icon": 'people-3',
		'index': 2,
	},
	{
		"id": 14,
		"info": "涉氨制冷企业1",
		"parentId": 13,
		"icon": null,
		'index': 3,
	},
	{
		"id": 15,
		"info": "金属冶炼企业1",
		"parentId": 13,
		"icon": null,
		'index': 3,
	},
	{
		"id": 16,
		"info": "城市综合体",
		"parentId": 8,
		"icon": 'people-3',
		'index': 2,
	},
	{
		"id": 17,
		"info": "涉氨制冷企业2",
		"parentId": 16,
		"icon": null,
		'index': 3,
	},
	{
		"id": 18,
		"info": "金属冶炼企业2",
		"parentId": 16,
		"icon": null,
		'index': 3,
	}
]

function toTree(data, index) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function(item) {
    	item.selected = false
    	item.showChildren = false
        delete item.children
    })
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {}
    data.forEach(function(item) {
        map[item.id] = item
    })
    var val = []
    data.forEach(function(item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentId]
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            ;(parent.children || (parent.children = [])).push(item)
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item)
        }
    })
    return val
}

export default toTree(list, 1)
