# 日志：2026-05-06 —— Vercel 部署

## 今日目标
- 将项目部署到 Vercel，实现线上可访问

## 完成内容
1. ✅ 本地构建验证通过（9 页面零错误）
2. ✅ 安装 Vercel CLI 到项目 devDependencies
3. ✅ 用户通过 Vercel Dashboard 完成 New Project → Import GitHub Repository
4. ⏳ 线上验证：当前环境网络限制，无法直接访问 vercel.app，待用户确认

## 部署信息

| 项目 | 值 |
|------|-----|
| 部署平台 | Vercel |
| 项目域名 | https://jianghua-space.vercel.app/ |
| 代码源 | GitHub `Natanova612/jianghua-space` |
| 构建输出 | Static (Astro default) |
| 输出目录 | `dist/` |

## 已知问题

1. **本地 commit 未同步到 GitHub**
   - Commit `fecf6b5`（Phase 1 migration log）仅在本地，未 push 到 origin
   - 原因：Git HTTPS 凭据未持久化配置
   - 影响：Vercel 当前部署的代码缺少这份日志文件，但不影响站点功能
   - 解决：待用户提供 GitHub PAT 后推送，或用户手动在 GitHub 网页端补传

2. **当前服务器无法访问 vercel.app**
   - `curl` / `ping` 均无法连通，100% packet loss
   - 推测为服务器网络出口限制
   - 不影响实际部署，仅影响我这边直接验证

## 待用户确认

- [ ] 浏览器访问 https://jianghua-space.vercel.app/ 是否正常显示？
- [ ] Vercel Dashboard → 该项目 → Deployments 里最新一条状态是 ✅ Ready 还是 ❌ Error？
- [ ] 如果构建失败，请把错误日志截图或复制给我

## 追加记录（21:10）— Phase 2 启动：简历在线版

用户提供了完整个人简历文字内容，已完成在线简历页面制作。

### 完成内容
1. 新建 `src/pages/resume.astro` — 完整在线简历页面
2. 更新 `about.astro` — 简历 CTA 从 PDF 下载改为链接到 `/resume`
3. 构建验证：10 页面零错误（新增 `/resume`）

### 简历页面结构
- 头部：姓名 + 联系方式 + 基本信息
- 求职意向
- 核心能力四大支柱（卡片式）
- 工作经历时间线（蚂蚁 → 美团 → 同程艺龙 → 同程旅游）
- 三大核心项目（会员体系 / 出行AI助手 / 十元度周末）
- 教育背景
- 专业技能与语言

### 代码变更
- 新增：`src/pages/resume.astro` (~20KB)
- 修改：`src/pages/about.astro`（1 处链接变更）

## 下一步计划
1. 同步代码到 GitHub
2. 继续内容真实化：时间线、心愿、联系信息、学习文章等
