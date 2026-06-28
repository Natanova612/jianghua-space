# 日志：2026-06-28 —— AI应用足迹真实截图替换

> **时间**：2026-06-28  
> **提交**：`b2bef24`  
> **文件**：`public/images/cases/*`（15 张图片）

---

## 今日目标

将 `/ai-footprint` 页面中 c-009 ~ c-017 案例的占位图替换为用户提供的真实截图。

截图源目录：`C:\Users\Natalie Jiang\Desktop\工作作品截图_2026-06-25\工作作品截图_2026-06-25`

---

## 完成内容

### 1. 图片映射与替换

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
| `14_50QuestionsChina_使用指南.png` | `50questions-guide.png` | c-009 50 Questions China |
| `15_50QuestionsChina_问题卡片.png` | `50questions-card.png` | c-009 50 Questions China |
| `湿地讲解员站点.png` | `wetland-museum.png` | c-010 湿地博物馆讲解员学习平台 |

共替换 15 张占位图。原占位图为 `sharp` 生成的 5~7KB 占位图，已全部覆盖为真实截图。

### 2. 未映射文件

源目录中还有一张截图未对应到现有案例：

- `06_手搓案例_Prompt灵感.jpg`

该文件标题包含 "Prompt"，可能属于 c-014 Prompt换框法，但 c-014 当前 JSON 只配置了一张图。待用户确认是否要作为 c-014 的第二张图加入。

### 3. 构建验证

- `npm run build` 通过。
- `dist/images/cases/` 下 15 张图片已正确输出。

---

## 关键决策

1. **保持 JSON 引用不变**：案例 JSON 中 `images` 数组路径不变，只替换目标文件内容，避免改代码。
2. **按文件名语义映射**：根据截图标题中的关键词匹配到对应案例，例如 HOMI→OpenClaw、Muse→Codex、画眉→AI漫画、灵管平台→内部业务经营管理后台。
3. **未确认文件暂不处理**：`06_手搓案例_Prompt灵感.jpg` 未强行加入，避免破坏现有单图布局。

---

## 待确认事项

- [ ] `06_手搓案例_Prompt灵感.jpg` 是否加入 c-014 作为第二张图？
- [ ] `50questions-card.png` 为 2.5MB，是否需要压缩以优化加载速度？
- [ ] 用户从 WSL push 后，线上 `/ai-footprint` 图片展示效果是否需要微调（如弹窗画廊高度 `max-h-[360px]`）？

---

## 当前提交

```
b2bef24 content(ai-footprint): replace placeholder case screenshots with real images
```

---

> "自动补全的优雅，不如手动确认的可靠。" —— 来自 c-008 的反思
