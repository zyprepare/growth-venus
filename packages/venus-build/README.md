组件打包工具
====

## 支持功能
- [x] es和cjs模块
- [x] ts编译
- [x] 图片打包base64
- [x] postcss
- [x] 环境变量
- [x] 别名
- [x] 打包ui库
- [x] 将样式文件统一转换为 xx.module.xx 格式的文件

## venus.config.js 配置说明

| 参数   | 说明           | 类型    | 是否必选 | 默认值 |
| ------ | -------------- | ------- | ------ | ------ |
| input  | 入口文件     | String  | 否      | src/index.ts      |
| output   | 编译后生成目录 | String  | 否      | lib      |
| cssModules  | postcss-modules options   | Boolean or Object  | 否      | -      |
| plugins | rollup插件 | Array | 否      | - |  
| tsconfig  | 项目中tsconfig文件 | String  | 否      | 项目根目录/tsconfig.json      |
| ENV | 设置环境变量 | Object | 否      | {WEB_ENV: process.env.WEB_ENV,NODE_ENV: process.env.NODE_ENV} | 
| aliasEntries | 设置目录别名       | Object | 否      | {'~': resolveFile('src'),'@': resolveFile('src')}      |
| externalPackages | 打包排除的包       | Array | 否      | ['react','react-dom','@tarojs/components','@tarojs/runtime','@tarojs/taro','@tarojs/react']      |

## 命令说明
```bash
# 全局安装
npm install -g @venus/build --registry=http://registry.m.jd.com

# 创建组件项目
venus init 项目名称

# 打包业务组件
venus build

# 打包ui组件库
venus build -t ui

# 将样式文件统一转换为 xx.module.xx 格式的文件
venus convert -t cssModule -f css|less|scss|sass
```
