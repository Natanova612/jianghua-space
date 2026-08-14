# 日志：2026-08-06 —— 三层架构定稿 + P1 全部完成

> **日期**：2026-08-06  
> **状态**：⚠️ 全部改动未提交 git；dev 服务器**仍在后台运行**（task bash-4i03hlgs，http://localhost:4321/）供用户走查  
> **当前阶段**：P1（门面）9 项任务全部完成，等用户全站走查反馈 → 微调 → 构建提交

---

## 今日主线

### 1. 首页三层架构（画 / 字 / 人）定稿

用户提出的架构：**底层「画」**（富春山居图卷轴）→ **中层「字」**（读书划线轮播）→ **上层「人」**（现状内容）。

- **字层组件** `src/components/ReadingDrift.astro`：15 条真实微信读书划线，竖排朱砂小楷，2800px 幅宽双副本无缝轮播，190s 线性单向；与画轴（320s ease-in-out 往返，≈27px/s）**异速异律**（≈15px/s），肉眼可辨两层
- 排版规则：摘要主列 + 出处独立细列（`display:block` 在 vertical-rl 下自动分列）；列高按句长分配（top+h ≤ 88vh），避免半句截断
- 换句子：改 ReadingDrift.astro 的 `excerpts` 数组（源数据 `~/.tmp-seal-preview/weread_marks.json`，327 条备选）
- 原 4 处题画诗间奏已从内容流移除（内容并入字层）

### 2. 人层字体层级（用户反馈后调整）

章节标题 `text-2xl md:text-3xl font-medium` → 条目标题 `text-xl md:text-2xl font-medium` → 描述 `text-[15px] leading-7` → 辅助小字。四级可辨。

### 3. 「在读」撤出首页 + 卷末纳入章节体系

- 「在读」板块从首页删除（与字层功能重复）；书单数据留档于 index.astro 注释，P3 /notes 重构时取用
- 卷末补第四枚引首章「**所期**」（所愿/所为/所学/所期成组），圆点列表改行文，按钮改方角（与印章一致的 `rounded-[3px]`）

### 4. P1 剩余任务完成

| 任务 | 要点 |
|------|------|
| #9 starfield 降级 | 页顶琥珀色存档说明条；导航入口早已移除，深链可访问 |
| #8 contact 重写 | 旧「问星河」Q&A 删除；三来意分流（mailto 预填主题：经营顾问咨询/个人教练预约/合作机会）；邮箱点击复制 + 即刻二维码 + 微信占位（**待用户提供微信二维码**） |
| #6 about 更新 | 自传保留并全文双语；新增「现在 · 二〇二六，我的新一章」（带「现在」引首章）；结尾简历/服务/联系三入口卡；全页换纸墨印 tokens；Chart.js 轨迹图配色+双语 |
| #7 resume 更新 | 双轨「当前方向」（主业顾问/开放 AI 岗）；新增「AI 能力画像」（产出导向 5 条）；工作经历顶部加独立顾问 2026—至今（含某苏州文旅集团脱敏项目）；蚂蚁离职时间写「2024.07 — 2026」**待用户确认月份**；全文双语 |

---

## 待办 / 悬而未决

1. **用户全站走查中**（中/英/移动端），优化点待反馈
2. 蚂蚁离职月份待确认（resume 现写「2024.07 — 2026」）
3. 微信二维码待用户提供（现在 contact 页是"邮件或即刻索取"占位）
4. 题跋草稿仍未改定（首页卷末）
5. 定稿后清理：`src/components/Ridge.astro`（废弃矢量山脊）、`public/seal.svg`（已被 seal.png 替代）、global.css 里 ridge/mist 相关 CSS
6. 走查通过后：构建 + git 提交（提交方案先给用户确认；推送走 WSL）

## 技术备忘（增量）

- **无头 Edge 截图的盲区**：`--virtual-time-budget` 不会推进 CSS 动画，连拍对比法验证动效无效；动效只能真人肉眼验证
- **三层叠放规则**：HumanLayout 根节点 `isolate`；landscape-layer 与 reading-layer 均 `z-index:-1`，DOM 序后者在上；内容正常流
- **字层换列机制**：`writing-mode: vertical-rl` 容器内设 max-height，超长自动向左另起一列；`display:block` 子元素强制新列
- about 页自传英译已完成；resume 全页英译已完成

## Git working tree 快照（8/6 中午）

```
 M src/components/Footer.astro
 M src/layouts/BaseLayout.astro / HumanLayout.astro
 M src/pages/index.astro / about.astro / resume.astro / contact.astro / starfield.astro
 M src/styles/global.css / tailwind.config.mjs
?? public/seal.png / public/images/landscape-bg.jpg / public/images/jike-qr.png
?? scripts/generate-seal.py / scripts/process-landscape.py
?? src/components/Lang.astro / LanguageSwitcher.astro / MainNav.astro / ReadingDrift.astro / Ridge.astro（废弃）
?? docs/logs/2026-08-04/05/06 三份 + 两份规划文档
```

构建状态：`npm run build` 11 页全部通过。
