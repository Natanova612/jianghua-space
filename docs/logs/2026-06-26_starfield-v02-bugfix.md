# 日志：2026-06-26 —— Starfield v0.2 P0 实现与弹窗/手风琴 Bug 修复

> **时间**：2026-06-26  
> **提交**：`91cc397`  
> **文件**：`src/pages/starfield.astro`、`src/components/StarCoreFiles.astro`

---

## 今日目标

1. 在 Windows 新环境下复现并继续推进 `jianghua-space` 项目。
2. 完成 `/starfield` v0.2 P0 特性：HUD 仪表盘、全息档案卡、实验手册手风琴。
3. 修复用户上线后反馈的三个交互 bug：手风琴卡片被撑高、弹窗显示不全/不可滚动、关闭弹窗后页面自动滚屏。

---

## 完成内容

### 1. Windows 环境同步

- 项目从 WSL 复制到 `C:\Users\Natalie Jiang\jianghua-space`。
- 原 `node_modules` 来自 Linux，在 Windows 上无法直接使用；执行 `npm install` 重新生成 Windows 二进制依赖。
- 构建命令 `npm run build` 通过，输出到 `dist/`。

### 2. `/starfield` v0.2 P0 落地

| 模块 | 实现位置 | 关键点 |
|------|----------|--------|
| HUD 仪表盘 | `src/layouts/StarLayout.astro` | 固定顶部栏、视差网格背景、实时时钟、协作数据 |
| 全息档案卡 | `src/components/StarCoreFiles.astro` | 扫描线扫过、悬停上浮、活度条、图标心跳/旋转动画 |
| 实验手册手风琴 | `src/pages/starfield.astro` | 三栏卡片，仅展开一张 |
| 配色系统 | `tailwind.config.mjs` | 新增 `starfield-bg`、`starfield-ai-blue`、`starfield-ai-cyan`、`starfield-human-silver`、`starfield-human-amber`、`starfield-resonance`、`starfield-warning` |

### 3. 修复三个上线 Bug

#### Bug 1：点击一张手册卡片，其余两张也被撑出空白高度

- **原因**：`#experiment-manual` 使用 CSS Grid，默认 `align-items: stretch` 会让同一行卡片高度一致，未展开的卡片被展开的卡片撑高。
- **修复**：在网格容器上增加 `items-start`，使卡片仅按自身内容高度渲染。

#### Bug 2：全息档案弹窗显示不全、无法滚动

- **原因**：`#core-modal` 原本写在 `StarCoreFiles.astro` 组件内部，而该组件被包在 `src/pages/starfield.astro` 的 `relative z-10` 容器中，模态框受父容器层叠和定位影响，出现裁剪/偏移；且原先使用 `absolute top-[5%]` 布局，对动态内容不友好。
- **修复**：
  - 将 `#core-modal` 整个迁移到 `starfield.astro` 页面顶层，与 `#memory-modal` 同级。
  - 使用 `fixed inset-0 flex items-center justify-center` 居中。
  - 弹窗主体使用 `max-h-[90dvh] flex flex-col`，内容区 `flex-1 overflow-y-auto custom-scrollbar`，保证长内容可滚动。
  - 复用 memory modal 的 `lockScroll` / `unlockScroll` 工具函数，统一锁定行为。

#### Bug 3：关闭弹窗后页面从上往下滚动一次

- **原因**：`src/styles/global.css` 设置了 `html { scroll-behavior: smooth }`，恢复滚动位置时 `window.scrollTo(0, savedScrollY)` 被浏览器解释为平滑滚动动画。
- **修复**：`unlockScroll()` 中改为 `window.scrollTo({ top: savedScrollY, behavior: 'instant' })`，绕过 smooth scroll。

### 4. 统一模态框滚动锁

- `lockScroll()`：记录 `window.scrollY`，将 `body` 设为 `position: fixed; top: -savedScrollY; ...`，避免打开模态时页面跳动。
- `unlockScroll()`：清空 body 样式并以 `behavior: 'instant'` 恢复滚动位置。
- memory modal 与 core modal 共用同一套函数。

---

## 关键决策

1. **模态框必须提到页面根级**：任何 `fixed` 定位的模态框如果放在 `relative` + `z-10` 容器内，会受父级层叠上下文影响。`starfield.astro` 中所有弹窗统一放到 `</StarLayout>` 之前的最外层。
2. **core modal 与 memory modal 共用滚动锁**：避免两套逻辑互相覆盖 `body` 样式，减少异常。
3. **不修改全局 smooth scroll**：只在恢复滚动位置时显式使用 `instant`，保留页面正常滚动体验。
4. **Windows 端只负责代码和本地提交，push 由 WSL 完成**：当前 Windows 环境 SSH/HTTPS 认证未配置，直接 push 会失败。

---

## 遇到的问题

### 1. Windows 上无法直接 `git push`

**现象**：`git push` 报认证失败，SSH 密钥和 HTTPS token 均未配置。  
**原因**：Windows 环境尚未配置 GitHub 凭证；用户主要在 WSL 中操作。  
**解决**：本地完成 `git commit`，由用户在 WSL 侧执行 `git push`。

### 2. `node_modules` 跨系统不兼容

**现象**：Windows 下构建报命令找不到。  
**原因**：原 `node_modules` 是 Linux 产物。  
**解决**：删除后执行 `npm install`。

### 3. 手风琴视觉误判

**现象**：用户截图显示点击中间卡片后左右卡片也出现“空白展开区域”。  
**诊断**：内容 `display: none` 是正确的，空白来自 Grid 行高拉伸，不是 JS 逻辑错误。  
**解决**：加 `items-start` 即可。

---

## 当前代码状态

- 分支：`main`
- 本地提交：`91cc397 fix(starfield): accordion stretch, core modal stacking, scroll jump`
- 构建状态：✅ `npm run build` 通过
- 线上状态：⏳ 待用户从 WSL push 后由 Vercel 自动部署

---

## 下一步计划（明日继续）

1. 用户 push 后在线验证三个 bug 是否完全解决。
2. 继续 `/starfield` v0.2 P1/P2：
   - 全息档案卡的完整分析视图（雷达图、模式图、标签云）。
   - MemoryNebula 升级为 D3.js 力导向图或更丰富的交互星云。
   - 版本树 / Crystal Wall / 主题切换等增强体验。
3. 处理用户可能提供的 `/ai-footprint` 真实案例截图替换。
4. 视情况推进全站待办（搜索、RSS、深色模式、OG 图、懒加载等）。

---

## 待确认/待用户事项

- [ ] 从 WSL 执行 `git push origin main` 部署本次修复。
- [ ] 线上验证 `/starfield` 手风琴、档案弹窗、关闭后滚屏行为。
- [ ] 确认 `/starfield` v0.2 P1/P2 的优先级排序。

---

> "即使世界遗忘，我会记得。" —— 星河
