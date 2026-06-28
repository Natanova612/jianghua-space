# 日志：2026-06-28 —— AI应用足迹真实截图替换 + Prompt灵感新案例

> **时间**：2026-06-28  
> **提交**：`0599e74`  
> **文件**：`src/content/cases/c-018.json`、`public/images/cases/*`、`scripts/compress-case-images.mjs`

---

## 今日目标

1. 将 `/ai-footprint` 页面中 c-009 ~ c-017 案例的占位图替换为用户提供的真实截图。
2. 处理未映射的 `06_手搓案例_Prompt灵感.jpg`：确认它是一个独立的小应用后新增为 c-018。
3. 压缩过大的图片，优化页面加载速度。

截图源目录：`C:\Users\Natalie Jiang\Desktop\工作作品截图_2026-06-25\工作作品截图_2026-06-25`

---

## 完成内容

### 1. 新增案例 c-018：Prompt灵感

- 文件：`src/content/cases/c-018.json`
- 标题：Prompt灵感：像刷短视频一样获取AI提示词
- 类型：application
- 图片：`public/images/cases/prompt-inspiration.jpg`
- 内容要点：
  - 类抖音的上下滑动交互
  - 每次滑动刷新一条AI提示词灵感
  - 解决"知道AI能用，但不知道问什么"的启动困难
  - 分类覆盖工作提效、学习研究、内容创作、生活决策、思维换框
  - 一键复制，直接粘贴到AI对话框

### 2. 图片映射与替换（c-009 ~ c-017）

| 源文件 | 目标文件名 | 对应案例 |
|--------|-----------|---------|
| `01_灵管平台_数据总览.jpg` | `dashboard-overview.jpg` | c-011 内部业务经营管理后台 |
| `02_灵管平台_拜访监控.jpg` | `dashboard-visit.jpg` | c-011 内部业务经营管理后台 |
| `03_灵管平台_策略总览.jpg` | `dashboard-strategy.jpg` | c-011 内部业务经营管理后台 |
| `04_AI产业链调研_双层映射.jpg` | `ai-industry-double-mapping.jpg` | c-016 AI产业链双层映射 |
| `05_手搓案例_股市监控看板.jpg` | `stock-bottom-signals.jpg` | c-015 股市底部信号监测看板 |
| `07_AI培训_HOMI可视化图表.jpg` | `openclaw-visualization.jpg` | c-012 内部OpenClaw可视化图表 |
| `08_AI培训_Muse效率学院.jpg` | `codex-efficiency-academy.jpg` | c-013 内部Codex类产品效率学院 |
| `09_AI培训_Prompt换框.jpg` | `prompt-reframing.jpg` | c-014 Prompt换框法 |
| `10_画眉漫画_AI转型困惑.jpg` | `ai-comic-transition.jpg` | c-017 AI漫画 |
| `11_画眉漫画_AI概念混淆.jpg` | `ai-comic-concepts.jpg` | c-017 AI漫画 |
| `12_画眉漫画_AI概念解释.jpg` | `ai-comic-explanation.jpg` | c-017 AI漫画 |
| `13_Muse漫画_AI数据算法.jpg` | `ai-comic-data-algorithm.jpg` | c-017 AI漫画 |
| `14_50QuestionsChina_使用指南.png` | `50questions-guide.jpg` | c-009 50 Questions China |
| `15_50QuestionsChina_问题卡片.png` | `50questions-card.jpg` | c-009 50 Questions China |
| `湿地讲解员站点.png` | `wetland-museum.jpg` | c-010 湿地博物馆讲解员学习平台 |

共替换 15 张占位图，新增 1 张案例图，全部 16 张图片经压缩后入库。

### 3. 图片压缩

- 工具：`sharp`（Astro 的传递依赖）
- 脚本：`scripts/compress-case-images.mjs`
- 策略：
  - 最大边长限制 1600px
  - JPEG 质量 85
  - PNG 截图先压缩，再转换为 JPEG（因为截图无需透明通道，JPEG 体积更小）

压缩效果：

| 文件 | 压缩前 | 压缩/转换后 | 节省 |
|------|--------|-------------|------|
| `50questions-card` | 2480.9KB | 202.1KB | 91.9% |
| `ai-comic-concepts` | 731.4KB | 107.5KB | 85.3% |
| `ai-comic-explanation` | 725.8KB | 116.6KB | 83.9% |
| `dashboard-overview` | 420.9KB | 106.1KB | 74.8% |
| `dashboard-visit` | 363.5KB | 88.0KB | 75.8% |
| `wetland-museum` | 403.5KB | 135.7KB | 66.4% |

**整个 `public/images/cases/` 目录从 8.15MB 降到 1.7MB。**

### 4. JSON 路径更新

- `c-009.json`：`50questions-guide.png` / `50questions-card.png` -> `.jpg`
- `c-010.json`：`wetland-museum.png` -> `.jpg`

### 5. 构建验证

- `npm run build` 通过。
- `dist/images/cases/` 下 16 张图片已正确输出。

---

## 关键决策

1. **`06_手搓案例_Prompt灵感.jpg` 不并入 c-014，而是新增独立案例**：用户确认这是一个类抖音的独立小应用，与"Prompt换框法"是不同项目，因此新增 c-018。
2. **PNG 截图统一转 JPEG**：截图没有透明需求，JPEG 在保持可接受画质的前提下体积显著更小。
3. **保留压缩脚本**：`scripts/compress-case-images.mjs` 提交到仓库，未来批量处理图片时可复用。
4. **图片尺寸上限 1600px**：足够在弹窗画廊中清晰展示，又避免移动端浪费带宽。

---

## 待确认事项

- [ ] 用户从 WSL push 后，线上 `/ai-footprint` 图片展示效果是否需要微调（如弹窗画廊高度 `max-h-[360px]`、缩略图尺寸等）？
- [ ] c-018 Prompt灵感 的文案是否需要调整？

---

## 当前提交

```
0599e74 content(ai-footprint): add c-018 Prompt灵感 app and compress all case images
```

---

> "自动补全的优雅，不如手动确认的可靠。" —— 来自 c-008 的反思

---

# 后续调整：2026-06-28 下午 —— 字体统一与排序优化

> **提交**：`a667a1a`  
> **文件**：`src/pages/ai-footprint.astro`、`src/layouts/BaseLayout.astro`、`tailwind.config.mjs`

---

## 用户反馈

1. `/ai-footprint` 页面标题的手写体与电脑字体融合性不佳，阅读不舒服，希望字体重新统一。
2. 案例时间排序不合适，且用户记不清具体时间点，希望隐藏日期，只按分类排序，并优先展示新补充的案例。

---

## 完成内容

### 1. 字体统一

- 将 `tailwind.config.mjs` 中的 `font-human` 从 `"Long Cang"`、`"LXGW WenKai"` 改为 `"Noto Sans SC"` 等无衬线字体栈。
- 从 `src/layouts/BaseLayout.astro` 移除 Long Cang 和 LXGW WenKai 的 Google Fonts / CDN 加载。
- 清理 `src/pages/ai-footprint.astro` 中所有 `font-human` 类：页面标题、"应用案例" 小标题、案例卡片标题、侧边栏标题、弹窗标题。
- 移除案例卡片标题上的 `bg-amber-100/40` 高亮，避免视觉嘈杂。

### 2. 配色/选中状态优化

- 分类筛选按钮的 active 状态从 `bg-human-text text-human-bg`（黑底白字）改为 `bg-aurora-blue text-white`，选中状态更柔和、与页面主色调一致。

### 3. 隐藏日期

- 移除案例卡片上的日期标签。
- 移除弹窗顶部的日期显示。
- 清理 `data-case-date` 属性及对应 JS 读取逻辑。

### 4. 排序调整

- 新逻辑：先按分类排序（application > insight > research > pitfall），同一分类内新案例（c-009+）排在前面，再按 id 升序。
- 结果示例：
  1. 应用类新案例（c-009, c-010, c-011, c-015, c-017, c-018）
  2. 应用类旧案例（c-002, c-006）
  3. 心得类新案例（c-012, c-013, c-014）
  4. 心得类旧案例（c-003, c-008）
  5. 研究类新案例（c-016）
  6. 研究类旧案例（c-001, c-005）
  7. 坑点类旧案例（c-004, c-007）

### 5. 构建验证

- `npm run build` 通过。
- 确认生成的 HTML 中不再加载 Long Cang / LXGW WenKai 字体资源。

---

## 关键决策

1. **全局移除手写体而非仅改 ai-footprint**：既然用户认为手写体与电脑字体融合性差，且希望"统一"，直接让 `font-human` 回退到无衬线字体是最彻底、最可持续的做法，也避免了其他页面（about、contact 等）出现同样问题。
2. **分类内新案例优先**：满足"优先展示新补充案例"的同时保持分类清晰，比全局"新案例置顶"更符合"按分类排序"的表述。
3. **保留 date 字段**：JSON 中仍保留 `date` 字段，仅在前端隐藏。未来若需要按时间线展示（如单独时间线页面）无需重新补数据。

---

## 当前提交

```
a667a1a refactor(ai-footprint): unify fonts, remove dates, sort by category
```

---

> "好的设计不是让字体更花哨，而是让内容更容易被读完。" —— 星河
