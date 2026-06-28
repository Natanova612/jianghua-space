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
