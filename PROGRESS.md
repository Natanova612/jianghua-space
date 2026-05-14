# 姜华 × 星河 —— 项目1号（个人站点）

> 最后更新：2026-05-14
> 状态：持续迭代中，已上线 [jiangpipa.com](https://jiangpipa.com)
> 仓库：https://github.com/Natanova612/jianghua-space

---

## 项目概览

- **技术栈**：Astro v6 + Tailwind CSS + D3.js（CDN）
- **部署**：GitHub → Vercel 自动部署，自定义域名 jiangpipa.com
- **内容集合**：logs / posts / tools / memories / cases（Astro Content Collections）
- **布局系统**：HumanLayout（暖米色 #FAF6F1）/ StarLayout（深空蓝 #0B1120）/ BaseLayout
- **字体**：Long Cang（手写）/ Orbitron（星河）/ JetBrains Mono / Noto Sans SC

---

## 已完成模块

| 页面/模块 | 状态 | 关键特性 |
|-----------|------|----------|
| 首页 `/` | ✅ | 三区域分屏（左42%人类 + 右42%AI + 中间交融带）、渐变粒子动画、实时协作数据、"渣男"彩蛋 |
| 关于我 `/about` | ✅ | 自传散文、能量公式、Chart.js轨迹图（2006-2026）、心愿墙、照片墙、简历CTA |
| 简历 `/resume` | ✅ | 完整职业履历（蚂蚁/美团/同程）、核心项目、教育背景、技能标签、联系方式 |
| 星河篇 `/starfield` | ✅ | MemoryNebula星云组件、14颗真实记忆星星、时间螺旋布局、8色闪烁动画、Canvas粒子背景 |
| AI应用足迹 `/ai-footprint` | ✅ | 融合度进度条（5维度）、AI画像摘要4条、两层工具矩阵（核心工作层+生活层）、8个案例卡片+弹窗 |
| 学习与思考 `/learning` | ✅ | 33节点D3.js力导向网络图、禁用缩放、拖拽边界限制、暖米色信纸风格、详情右侧面板、列表/网络双视图 |
| 联系我 `/contact` | ✅ | 邮箱一键复制、星河Q&A交互（5个预设问题+动态对话渲染） |
| 商业计划挂载 `/businessidea/number1/` | ✅ | AI店长项目完整展示站点（项目2号内容通过路由挂载） |
| Content Collections | ✅ | memories（14条真实事件）、cases（8个应用案例）、logs（协作日志）、posts（思考文章）、tools（工具清单） |

---

## 近期优化记录

### 2026-05-14（今日）
- **隐私脱敏**：全站四级敏感扫描（🔴🟠🟡🟢），移除父亲手术病种/医院名称/科室/母亲复查等健康细节
- **职业表述优化**：logs/entry-001.md 中"职业转型，需要向市场证明自己"改为"探索AI时代的新工作方式，希望创建一个能真实展示人机协作思考过程的载体"
- **企业安全事件**：经用户确认保留（c-007/m-009），判断不涉及安全红线
- **推送**：commit `571e4ea`

### 2026-05-13（上轮三轮优化）
- **ai-footprint**：融合度百分比真实化（学习研究95%/代码开发90%等）、画像摘要4条重写、工具矩阵改为两层架构（核心工作层：KIMI矩阵/多模型/OpenClaw；生活层：千问/豆包/DeepSeek）
- **starfield**：14个虚构记忆碎片全部替换为真实事件（2026.04.03–2026.05.14）、Schema扩展8色枚举、星云螺旋布局、8色星星闪烁动画
- **learning**：从3篇文章列表升级为33节点D3.js力导向网络图、禁用滚轮缩放、拖拽边界限制、配色从深蓝星空改为暖米色信纸风格（与人类场一致）
- **隐私修复**：`财务规划`节点删除"现金流、保费、创业资金、45万安全垫"，改为"家庭收支管理与长期资金规划"
- **推送**：commit `29da96d`

---

## 待办事项

- [ ] 首页对话轮次计数器恢复或重新设计（当前已移除，原"龙虾"daemon因race condition不稳定）
- [ ] 全站搜索（Pagefind）
- [ ] RSS 订阅
- [ ] 深色模式切换
- [ ] 评论系统（Giscus）
- [ ] 照片墙加载优化（懒加载 / 压缩）
- [ ] OG 分享图自动生成

---

## 架构演进路径

```
Phase 1（当前）: 本地 Markdown/JSON + Git + Vercel 自动部署
Phase 2（内容增长）: Decap CMS（基于 Git 的无头 CMS）
Phase 3（动态交互）: Vercel Serverless + Upstash Redis
Phase 4（复杂管理）: Sanity / Strapi + Astro API 路由
```

> "即使世界遗忘，我会记得。" —— 星河
