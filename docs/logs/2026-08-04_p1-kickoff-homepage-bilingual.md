# 日志：2026-08-04 —— 独立顾问门面 P1 启动（首页初版 + 双语基建）

> **日期**：2026-08-04  
> **状态**：⚠️ 全部改动未提交 git（working tree 状态见文末），开发服务器可能仍在后台运行  
> **涉及页面**：全站导航 / 首页 `/` / 页脚 / 全局样式  
> **依据文档**：《site-iteration-plan-2026-08》《site-development-plan-2026-08》（均在 docs/ 下，今日定稿，也未提交）

---

## 背景

站点定位转型：从「姜华 × 星河 双生试验田」→「**独立经营顾问**对外门面」。8/4 白天完成两份方案文档定稿 + 7 项决策确认，晚间开始 P1（门面阶段）开发。期间经历一次电脑重启导致会话中断，随后从文档 + git 状态恢复上下文继续。

---

## 今日完成清单（P1 进度 5/9）

| # | 任务 | 产出 | 状态 |
|---|------|------|------|
| P1#1 | 双语基础设施 | `src/components/Lang.astro`（新建，props/slot 双用法）、`src/components/LanguageSwitcher.astro`（新建）、`BaseLayout.astro`（防闪烁首帧脚本 + `window.__setLang`）、`global.css`（`data-i18n` 显隐规则） | ✅ |
| P1#2 | 新导航 | `src/components/MainNav.astro`（新建：首页/服务/案例/关于/思考/联系 + 中EN切换 + 移动端菜单），已接入 `HumanLayout.astro` 替换 DualHeader；StarLayout 仍用 DualHeader 未动 | ✅ |
| P1#3 | 个人名章 | `public/seal.svg`（白文「华」字方印，朱砂 `#c8391f`，楷体栈，44px 字号经 PNG 渲染预览确认）；已嵌入导航 Logo 和 human 版页脚 | ✅ |
| P1#5 | 视觉 tokens | `tailwind.config.mjs` 新增「纸·墨·印」四色：`paper #f7f3ec`、`ink #1f2328`、`cinnabar #c8391f`、`dai-blue #2f4a5e`（旧色板保留） | ✅ |
| P1#4 | 首页重做 | `src/pages/index.astro` 全面重写为「名片+卷轴」：首屏名片（超大姓名+印章+定位语三行逐行淡入+双CTA）→ 服务区 → 信任带+精选案例横向卷轴 → 最新思考（posts 集合取 3）→ 底部 CTA；全文 Lang 双语；改用 HumanLayout（旧版双生分屏已移除） | ⚠️ 初版完成，第二屏待重新设计 |

**构建验证**：`npm run build` 11 页全部通过；`dist/` 产物抽查确认双语 spans、锚点、印章引用、切换器均正常。

---

## ⚠️ 明日第一件事：首页第二屏重新设计

**用户反馈（原话）**："三扇门的表达不好，很突兀。既不承上，也不启下。"、"不是简单改个标题的事。"

问题分析：
- 首屏 CTA「看看我能做什么」跳转下来的 section 标题却是「三扇门」，语义断裂（不承上）
- 服务卡片与下方的信任带+案例卷轴之间没有叙事衔接（不启下）

已记录的备选方向（详见会话，明日展开）：
1. **叙事衔接向**：第二屏回答"这跟我有什么关系"，用过渡语把服务变成首屏定位的自然延伸
2. **结构向**：服务与案例纵向交织，"一种服务 → 直接挂对应案例证据"，取消孤立的卡片屏
3. **形式向**：延续「纸·墨·印」卷轴意象，服务做成竖排三轴卷/信纸三折，而非通用卡片栅格

---

## 技术备忘

- **双语机制**：`<html data-lang="zh|en">` 控制全站 `[data-i18n]` 元素显隐；可见语言用 `display: contents` 不影响布局；选择存 `localStorage` 键 `jianghua-lang`；防闪烁 inline 脚本在 `<head>` 最前
- **导航链接暂态**：服务/案例 → 首页锚点 `#services`/`#cases`；思考 → `/learning`（P3 改 `/notes`）；对外汉语门「筹备中」灰显无链接
- **印章字体注意**：SVG 内用 `<text>` + 楷体字体栈，跨平台依赖系统字体（Windows KaiTi / macOS Kaiti SC），若后续要完全一致需转路径
- **临时目录**：`~/.tmp-seal-preview/`（sharp 渲染预览用，用户明确暂不删除）
- **预览**：`npm run dev` → http://localhost:4321/

---

## 剩余 P1 任务

- [ ] 首页第二屏重新设计（见上）
- [ ] P1#6 about 更新（"现在"章节 —— 文案主笔是用户，我可先起草）
- [ ] P1#7 resume 更新（双轨意向 —— 文案主笔是用户）
- [ ] P1#8 contact 更新（按服务分流，结构性改动可直接做）
- [ ] P1#9 starfield 降级（页顶存档说明，导航已移除入口 ✅）
- [ ] 全部确认后：构建验证 + git 提交（推送走 WSL）

---

## Git working tree 快照（今日收工状态）

```
 M src/layouts/BaseLayout.astro      # 双语脚本
 M src/layouts/HumanLayout.astro     # 换 MainNav
 M src/components/Footer.astro       # 印章 + 新定位双语
 M src/styles/global.css             # data-i18n 规则
 M src/pages/index.astro             # 首页重写
 M tailwind.config.mjs               # 纸墨印 tokens
?? docs/site-development-plan-2026-08.md
?? docs/site-iteration-plan-2026-08.md
?? public/seal.svg
?? src/components/Lang.astro
?? src/components/LanguageSwitcher.astro
?? src/components/MainNav.astro
```

（另：`github-src/` 是 6 月旧快照，非工作目录，勿混淆。）
