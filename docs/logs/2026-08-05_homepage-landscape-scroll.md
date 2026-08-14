# 日志：2026-08-05 —— 首页进化：从模块到「一纸长卷 · 纸上山水」

> **日期**：2026-08-05  
> **状态**：⚠️ 全部改动未提交 git；开发服务器已停止  
> **涉及**：首页 `/`（v3→v4→v5→v7 四版迭代）、导航、印章、全局样式、新增画卷背景  
> **明日待续**：用户对 v7 还有修改思路（"这版立体一些了，但我还有一些修改思路"）

---

## 今日成果总览

| 项 | 状态 | 说明 |
|---|------|------|
| 导航 v2「卷首题签」 | ✅ | 80px 高纸色导航，与首屏一纸；滚动收拢 56px + 墨线底边；MainNav.astro |
| 名章 v3 | ✅ | 中山王篆「华」+ 纸面钤印质感，public/seal.png（512px），scripts/generate-seal.py 可复现 |
| 首页 v7「纸上山水」 | ✅ 初版 | 富春山居图洗色全页背景 + 题画诗 + 画卷横移动效 |
| 微信读书数据接入 | ✅ | skill 手动安装成功；拉到 212 本笔记书、2,621 条划线；4 句入页 |
| 即刻二维码 | ✅ | 从分享卡裁出，public/images/jike-qr.png，挂在卷末 |
| 待办记录 | ✅ | 金句背景淡字 → 开发文档 P3-19a |

---

## 关键资产

### 印章（scripts/generate-seal.py → public/seal.png）
- 字体：**敬峰中山王篆**（SIL OFL 1.1），https://github.com/jeffi369/JFZSKSealScript
- TTF 在临时目录：`~/.tmp-seal-preview/JFZSKSealScript_V3.ttf`（未入库，重生成需先下载）
- 繁体「華」无字形，用简体「华」码位；质感管线：手抖边缘 + 印泥颗粒 + 磨损露纸 + 低频明暗 + 微洇 + -2.2° 歪斜

### 画卷背景（scripts/process-landscape.py → public/images/landscape-bg.jpg）
- 素材：黄公望《富春山居图》（公有领域），来源为微信文章图（mmbiz.qpic.cn），原图 7378×699 在临时目录 `fuchun2-h.jpg`（另有 fuchun1/3 备用）
- 处理：82% 纸色洗淡 + 顶部 45% 渐隐（保文字区）+ 0.6px 模糊 → 272KB
- 呈现：`.landscape-layer`（global.css）fixed 全屏层，宽 = 100vh × 10.555，320s `scroll-unroll` 横移往返（≈27px/s，肉眼可见）；纸纹叠加 + 四季微色调（--season-tint，BaseLayout 内联脚本按月份设 data-season）
- 层级：HumanLayout 根节点 `isolate`，画卷层 z-index:-1，内容自然在上

### 题画诗（4 句，原为"朱批"后改造）
| 位置 | 句 | 出处 |
|------|----|----|
| 承接段前 | 胜兵先胜而后求战，败兵先战而后求胜 | 善战者说 |
| 卷一前 | 静、幽、正、治 | 善战者说 |
| 卷二前 | 人的幸福，由日积月累的小惠而生者比比皆是 | 富兰克林自传 |
| 卷三前 | 只靠阅读别人的东西……不可能产出新知 | 置身事内 |

竖排多列（md+ `writing-mode: vertical-rl`），移动端横排；朱砂楷体（.font-kai 系统楷体栈）。

### 首页结构（v7）
卷首（姓名+名章+三行定位，无链接）→ 题画诗一 → 承接段（职业标签）→ 题画诗二 → 卷一「所愿」服务 → 题画诗三 → 卷二「所为」案例 → 题画诗四 → 卷三「所学」文章+在读 → 卷末（想跟这样的你聊 → 邮箱+即刻二维码 → 题跋草稿 → 落款「岁次丙午夏 · 姜华 谨识」→ 土壤厚度行）

- **题跋仍是草稿**，等用户改定（"操盘十五年，见惯起落……"）
- 土壤厚度行数据为手动硬编码（212 本/2,621 条/3 篇），更新时改 index.astro 底部
- 「在读」3 本：不连续的时代 / 孔子与论语 / 具身智能（各配一句批注，源于真实划线）

### 动效清单（均遵守 prefers-reduced-motion）
名章盖印（首屏 0.9s 延迟）、引首章盖印（滚动触发）、画卷横移 320s、文字淡入。原 Ridge 矢量山脊/雾气/视差方案已废弃，Ridge.astro 未删除（待画卷版定稿后清理）。

---

## 微信读书 skill（重要备忘）

- 官方 `npx skills add` 因 git clone github.com 被重置而失败；改为 raw.githubusercontent 手动下载 5 个 md 到 `~/.kimi-code/skills/WeChatReading/`
- API：`POST https://i.weread.qq.com/api/agent/gateway`，Header `Authorization: Bearer $WEREAD_API_KEY`（key 用户私发，**勿入库勿提交**）
- 每次请求必带 `"skill_version": "1.0.4"`；参数平铺勿包 params
- 数据缓存在临时目录：`weread_notebooks.json`（212 本概览）、`weread_marks.json`（8 本书 327 条划线）
- 用户阅读画像：商业战略（波特/德鲁克/查兰/华为系）+ 国学（论语/南怀瑾/钱穆/顾随）+ 前沿（具身智能/芯片）

## 工具链备忘

- **截图验证**：无头 Edge 可用——`"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --screenshot="<绝对路径>.png" --window-size=1440,950 --hide-scrollbars --virtual-time-budget=8000 <url>`（截图路径必须 Windows 绝对路径；全页用大 window-size 高度）
- **SVG/图像渲染**：`~/.tmp-seal-preview/` 里有 sharp（node）和 PIL 可用
- **网络**：github raw/API 通，github git clone 不通，wikimedia 不通，mmbiz 加 UA+Referer 可下载

---

## Git working tree 快照（8/5 收工）

```
 M src/components/Footer.astro        # 印章 + 新定位双语
 M src/components/MainNav.astro       # 卷首题签 v2
 M src/layouts/BaseLayout.astro       # 双语 + 四季 data-season
 M src/layouts/HumanLayout.astro      # paper-texture + isolate
 M src/pages/index.astro              # 首页 v7 纸上山水
 M src/styles/global.css              # 朱批/印章/纹理/画卷层等
 M tailwind.config.mjs                # 纸墨印 tokens
?? docs/logs/2026-08-04_p1-kickoff-homepage-bilingual.md
?? docs/logs/2026-08-05_homepage-landscape-scroll.md（本文件）
?? docs/site-development-plan-2026-08.md
?? docs/site-iteration-plan-2026-08.md
?? public/images/jike-qr.png
?? public/images/landscape-bg.jpg
?? public/seal.png
?? public/seal.svg（已被 seal.png 替代，待清理）
?? scripts/generate-seal.py
?? scripts/process-landscape.py
?? src/components/Lang.astro / LanguageSwitcher.astro / MainNav.astro / Ridge.astro（废弃待清理）
```

## 明日恢复点

1. 用户对 v7 有新一轮修改思路，等其提出后迭代
2. 题跋草稿待改定
3. 定稿后：清理 Ridge.astro / seal.svg、构建、提交（推送走 WSL）
4. 预览：`cd ~/jianghua-space && npm run dev`
