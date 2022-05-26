export default [
  {
    url: '/api/getProjectName',
    method: 'get',
    status: '200',
    response: () => {
      return {
        code: '200',
        data: {
          projectName: '这里显示项目名称'
        }
      }
    }
  }
]
