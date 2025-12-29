// 导出一个函数，用于注册所有组件
export function registerComponents(app) {
  // 使用import.meta.glob自动引入所有的组件
  const componentModules = import.meta.glob('../components/**/*.vue', { eager: true })

  // 遍历并注册组件
  Object.entries(componentModules).forEach(([filePath, componentModule]) => {
    console.log(filePath, 'component module')
    
    const componentConfig = componentModule.default || componentModule
    const componentName = componentConfig.name || generateComponentName(filePath)
    
    // 注册组件
    if (componentName) {
      app.component(componentName, componentConfig)
    }
  });
}

// 从文件路径生成组件名称的辅助函数
function generateComponentName(filePath) {
  // 从文件路径中提取组件名，例如: ../components/MyComponent/index.vue -> MyComponent
  const pathParts = filePath.split('/')
  const fileName = pathParts[pathParts.length - 1].replace('.vue', '')
  const folderName = pathParts[pathParts.length - 2]
  
  // 如果是index.vue，使用父目录名；否则使用文件名
  const componentName = fileName === 'index' ? folderName : fileName
  
  // 转换为PascalCase
  return componentName.charAt(0).toUpperCase() + componentName.slice(1)
}