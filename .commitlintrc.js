module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-empty': [2, 'never'],
		'type-case': [2, 'always', 'lower-case'],
		'subject-empty': [2, 'never'],
		'subject-case': [2, 'never', []],
	},
	messages: {
		type: '请选择提交的类型',
		subject: '请简要描述提交（必填）',
		confirmCommit: '确认要使用以上信息提交？（Y/n）',
	},
	types: [
		{ value: 'feat', name: 'feat:新增功能' },
		{ value: 'fix', name: 'fix:修复缺陷' },
		{ value: 'build', name: 'build:项目打包' },
		{ value: 'revert', name: 'revert:回退代码 ' },
		{ value: 'docs', name: 'docs:文档更新' },
		{ value: 'style', name: 'style:代码格式' },
		{ value: 'chore', name: 'chore:其他修改' },
	],
	skipQuestions: ['scope', 'customScope', 'body', 'footer', 'footerPrefix'],
}
