# 日志：2026-06-25 —— AI应用足迹新增9个案例卡片

> **时间**：2026-06-25  
> **提交**：`9b31134`  
> **文件**：`src/content/cases/c-009.json` ~ `c-017.json`、`src/pages/ai-footprint.astro`、`src/content/config.ts`、`public/images/cases/*`

---

## 今日目标

按 PRD 要求在 `/ai-footprint` 页面新增 9 个案例卡片，支持图片展示，并推送到线上预览。

---

## 完成内容

### 1. 新增 9 个案例 JSON 文件

| 编号 | 标题 | 日期 | 类型 |
|------|------|------|------|
| c-009 | 50 Questions China：外国人来华旅游高频问答手册 | 2026.05 | 应用 |
| c-010 | 湿地博物馆讲解员学习平台 | 2026.05 | 应用 |
| c-011 | 内部业务经营管理后台：AI驱动的行业管理Dashboard | 2026.04 | 应用 |
| c-012 | 内部OpenClaw可视化图表：4轮对话完成从0到风格固化 | 2026.04 | 心得 |
| c-013 | 内部Codex类产品效率学院：让AI生产汇报材料效率超过人工 | 2026.04 | 心得 |
| c-014 | Prompt换框法：同一个问题，换个取景框 | 2026.04 | 心得 |
| c-015 | 股市底部信号监测看板：10维度雷达识别"底部区域" | 2026.05 | 应用 |
| c-016 | AI产业链双层映射：从传统互联网到AI创业公司的时空推演 | 2026.04 | 研究 |
| c-017 | AI漫画：用8格漫画降低AI认知门槛 | 2026.04 | 应用 |

所有文案已按脱敏规则处理：
- 灵管平台 → 内部业务经营管理后台
- HOMI → 内部OpenClaw
- Muse → 内部Codex类产品
- 画眉 → AI漫画（后续临时调整）

### 2. 页面改造：支持图片展示

- 案例卡片右侧增加缩略图，多图时显示 `+N` 标记
- 弹窗中增加图片轮播区，支持左右箭头切换和底部圆点指示
- 弹窗中增加外部链接入口（用于湿地博物馆案例的"访问站点"按钮）

### 3. 内容集合配置更新

`src/content/config.ts` 的 `cases` schema 新增两个可选字段：
- `images`: 图片路径数组
- `link`: 外部链接

### 4. 排序逻辑调整

旧案例（c-001~c-008）保持日期倒序，新案例（c-009~c-017）按 PRD 文档顺序接在后面。

### 5. 占位图片

使用 sharp 生成 15 张占位图（400×300），统一风格：虚线边框 + "图片待补充" 文字。晚上用户上传真实图片后直接替换即可。

### 6. 部署上线

已推送到 GitHub（`main` 分支 `9b31134`），Vercel 自动部署成功。线上地址：
https://www.jiangpipa.com/ai-footprint/

---

## 关键决策

1. **弹窗图片使用轮播而非网格**：案例截图尺寸不一，轮播更适合单张大图查看，避免布局混乱。
2. **外部链接用独立按钮**：湿地博物馆是实际可访问产品，在弹窗标题下方放置明显的"访问站点"按钮，与正文内容区分。
3. **占位图统一生成**：晚上用户传图时只需按文件名覆盖，无需改代码。
4. **画眉改名为 AI 漫画**：应用户要求，将内部工具名"画眉"脱敏为"AI 漫画"，图片文件名同步改为 `ai-comic-*.jpg`。

---

## 遇到的问题

### 1. JSON 文件多行字符串导致解析失败

**现象**：`npm run build` 时报 `Bad control character in string literal`。  
**原因**：WriteFile 写入的 JSON content 字段包含未转义的换行符。  
**解决**：用 Python `json.dump` 重新生成所有 JSON 文件，确保换行符被正确转义为 `\n`。

### 2. GitHub SSH 22 端口连接被拒绝

**现象**：`git push` 时报 `ssh: connect to host github.com port 22: Connection refused`。  
**原因**：当前网络环境限制 SSH 22 端口。  
**解决**：
- 在 `~/.ssh/config` 中配置 GitHub 使用 443 端口：
  ```
  Host github.com
    Hostname ssh.github.com
    Port 443
  ```
- `known_hosts` 中没有 `ssh.github.com` 条目，非交互式环境无法确认 host key。用 `ssh-keyscan -p 443 -t ed25519 ssh.github.com >> ~/.ssh/known_hosts` 预添加后推送成功。

### 3. Playwright Chromium 安装失败

**现象**：尝试自动截取湿地博物馆页面时，Chromium 浏览器下载多次超时。  
**原因**：当前环境网络下载 Chromium 二进制文件不稳定。  
**解决**：放弃自动截图，请用户晚上手动截取 `wetland-museum.png` 上传。

---

## 下一步计划

1. 晚上用户按文件名上传真实截图到 `public/images/cases/`
2. 替换占位图后重新构建并部署
3. 检查线上图片展示效果，必要时微调弹窗画廊样式

---

## 待上传图片清单

| 目标文件名 | 对应案例 |
|-----------|---------|
| `dashboard-overview.jpg` | 内部业务经营管理后台 |
| `dashboard-visit.jpg` | 内部业务经营管理后台 |
| `dashboard-strategy.jpg` | 内部业务经营管理后台 |
| `ai-industry-double-mapping.jpg` | AI产业链双层映射 |
| `stock-bottom-signals.jpg` | 股市底部信号监测看板 |
| `openclaw-visualization.jpg` | 内部OpenClaw可视化图表 |
| `codex-efficiency-academy.jpg` | 内部Codex类产品效率学院 |
| `prompt-reframing.jpg` | Prompt换框法 |
| `ai-comic-transition.jpg` | AI漫画 |
| `ai-comic-concepts.jpg` | AI漫画 |
| `ai-comic-explanation.jpg` | AI漫画 |
| `ai-comic-data-algorithm.jpg` | AI漫画 |
| `50questions-guide.png` | 50 Questions China |
| `50questions-card.png` | 50 Questions China |
| `wetland-museum.png` | 湿地博物馆讲解员学习平台 |

---

> "自动补全的优雅，不如手动确认的可靠。" —— 来自 c-008 的反思
