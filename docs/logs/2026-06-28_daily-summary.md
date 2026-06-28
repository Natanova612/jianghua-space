# 日志：2026-06-28 —— 今日收尾总结

> **日期**：2026-06-28  
> **状态**：已本地提交，待用户 push  
> **涉及页面**：`/ai-footprint`、`/starfield`

---

## 今日提交清单

| 提交 | 主题 | 文件 |
|------|------|------|
| `0599e74` | AI应用足迹：新增 c-018 Prompt灵感 + 压缩所有案例图片 | `src/content/cases/c-018.json`、`public/images/cases/*`、`scripts/compress-case-images.mjs` |
| `3bab04e` | 更新日志：c-018 与图片压缩详情 | `docs/logs/2026-06-28_ai-footprint-images.md` |
| `a667a1a` | AI应用足迹：统一字体、隐藏日期、按分类排序 | `src/pages/ai-footprint.astro`、`src/layouts/BaseLayout.astro`、`tailwind.config.mjs` |
| `cee1857` | 更新日志：字体统一与排序调整 | `docs/logs/2026-06-28_ai-footprint-images.md` |
| `1b118a4` | 星河篇 v0.2.1：HUD 仪器面板 + 实验手册 Tabs | `src/layouts/StarLayout.astro`、`src/pages/starfield.astro` |
| `24661b6` | 新增日志：starfield v0.2.1 仪器面板与 Tabs | `docs/logs/2026-06-28_starfield-v021.md` |
| `b88aa47` | 星河篇：导航栏移至 HUD 面板上方 | `src/layouts/StarLayout.astro` |
| `085e98f` | 更新日志：导航栏位置修正 | `docs/logs/2026-06-28_starfield-v021.md` |

---

## 主要变更摘要

### `/ai-footprint`

1. **图片全部替换为真实截图**
   - 15 张占位图替换为用户提供的 2026-06-25 工作作品截图。
   - 新增 `c-018` Prompt灵感 小应用案例，对应新截图 `06_手搓案例_Prompt灵感.jpg`。
2. **图片压缩**
   - 最大边长限制 1600px，JPEG 质量 85，PNG 截图转 JPEG。
   - `public/images/cases/` 总大小从 8.15MB 降至 1.7MB。
   - 新增 `scripts/compress-case-images.mjs` 脚本供后续复用。
3. **字体统一**
   - 移除手写体 Long Cang / LXGW WenKai，`font-human` 回退到无衬线字体栈。
   - `/ai-footprint` 页面所有标题、侧边栏标题改用统一 sans-serif。
4. **日期隐藏 + 分类排序**
   - 案例卡片和弹窗不再显示日期。
   - 排序改为：应用 → 心得 → 研究 → 坑点；同一分类内新案例（c-009+）优先。

### `/starfield`

1. **HUD Header 仪器化**
   - 改为居中 `max-w-[600px]` 仪器面板。
   - 1px 蓝色边框 + 20px faint grid + Courier New 数字 + 仪器刻字标签 + 竖线分隔 + SYNC 时间戳 + 在线光点外发光。
2. **实验说明书改为横向 Tabs**
   - 三个标签：🧬 这是什么？ / ⚡ 为什么值得关注？ / 🧭 怎么阅读？
   - 直接切换，无手风琴动画，内容压缩到 ≤3 句话 + 1 个小视觉元素。
3. **导航栏位置修正**
   - `DualHeader` 移到页面最顶部，与人类场页面一致。
   - HUD 仪器面板改为 `sticky top-14`，滚动时吸附在导航下方。

---

## 待用户确认 / 待上线验证

- [ ] 从 WSL push 到 GitHub，触发 Vercel 自动部署。
- [ ] 线上验证 `/ai-footprint` 图片加载、字体统一感、分类排序、日期隐藏。
- [ ] 线上验证 `/starfield` HUD 仪器面板、Tabs 切换、导航位置、滚动吸附效果。
- [ ] 确认移动端显示是否正常（HUD 面板宽度、Tabs 文字换行、导航堆叠）。

---

## 下一步（待新需求）

- 根据用户上线后的反馈继续微调 `/ai-footprint` 或 `/starfield`。
- 其他待办项（全站搜索、RSS、深色模式、OG 图、懒加载等）按用户优先级推进。

---

> "今天的代码先写到这里。星河，晚安。" —— 协作者
