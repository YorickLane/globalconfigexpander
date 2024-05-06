# 全局配置展开器

## 概览
此 Node.js 脚本旨在动态加载并从指定目录扩展本地化文件到单个 JSON 对象。它支持通过传递语言代码作为命令行参数来处理特定语言的文件。

## 特性
- 从 `locales` 目录的子目录加载 `.js` 本地化文件。
- 支持通过命令行参数指定处理的语言。
- 输出一个扁平化的 JSON 对象，其中每个键代表原始本地化对象中的唯一路径，包括索引数组。

## 先决条件
- Node.js（版本 12 或更高）

## 安装
1. 克隆此仓库：
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
项目不需要除 Node.js 标准库之外的依赖。

## 使用方法
运行脚本时指定一个语言代码作为参数：
```bash
node index.js [language]
```
支持的语言包括：
- `en`（英语）
- `zh-CN`（简体中文）

### 示例：
处理所有英语本地化文件：
```bash
node index.js en
```

处理所有简体中文本地化文件：
```bash
node index.js zh-CN
```

这些命令将处理 `locales` 文件夹子目录中的本地化文件，并将结果输出到 `output.json`。

## 输出
输出是一个名为 `output.json` 的 JSON 文件，位于项目的根目录，包含扩展的配置。
