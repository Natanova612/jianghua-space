# 日志：2026-08-16 —— M2 双库知识库上线（语料盘点 → 蒸馏 → 终审 → 部署）

> **日期**：2026-08-16
> **状态**：✅ 已上线（www.jiangpipa.com）；kbase 仅本地，不入库
> **前置**：08-14 V2-M1 上线 + 灰度 10/10（见 `2026-08-14_ask-jianghua-m1.md`、`2026-08-14_m1-graytest.md`）

---

## 一、今日成果

### 1. 语料盘点（只读授权：桌面 + D 盘）
- 姜华授权只读桌面与 D 盘；**铁律：任何写入先问后做**（一直有效）
- 全量盘点报告要点：金矿 = 沟通大纲（诊断方法论）、PKM Obsidian 库（150+ 篇）、星河core/USER.md（现成人生传记）、新版简历、模拟酒店项目、知识卡片、4 国语言项目
- 密级表经姜华审定：**个人财务整体排除**；星河/J 文件夹按混合语料处理（只取姜华原话）；东方水城全套绝不外泄（方法论脱敏内化）

### 2. 双库架构（关键设计决策）
- 问题：内化语料不能进公开 GitHub 仓库
- 方案：**公开层** `profile.json`（入库）+ **私有层** `src/data/kbase/`（gitignore，仅本地，随 CLI 部署打包进 serverless 函数）
- `vercel.json` 关闭 GitHub 自动部署 → **以后部署统一走本地 CLI**（GitHub push 只做代码存档）
- `VERCEL_TOKEN` 存本地 `.env`（长期复用，不上传）

### 3. kbase 四卷（src/data/kbase/，本地）
| 文件 | 内容 | 字数 |
|------|------|------|
| bio.md | 她是谁：职业叙事主线 | ~890 |
| cases-private.md | 案例手感 10 条（情境→怎么看→怎么解→结果） | ~3250 |
| voice.md | 姜华原话 21 条（AI 伙伴产出全剔除） | ~2140 |
| faq.md | 高频问题真实口径 6 条（收费/合作/base/时间等） | ~1230 |

- 脱敏纪律：客户真名与数据、财务、家庭、他人隐私全部剔除；涉及家人的原话忍痛未收
- 姜华终审：仅一处修改——**base 杭州 → 苏州**（工作地点不设限，可长期驻外/远程），bio/faq/profile/resume 四处同步更正

### 4. chat.ts 接入
- `import.meta.glob('../../data/kbase/*.md', eager)` 打包；fresh clone 无 kbase 时自动降级为仅公开层
- prompt 增加内化语料使用规则（融入表达、禁止大段复述、隐私按护栏处理）

### 5. 验证与部署
- 冒烟：收费问题答出「无价目表、先诊断后定形式、准备期未注册公司」+ 原话化用「不是来要预算的，是来要授权的」；文旅二消答出脱敏诊断逻辑（SKU 盘点/对标/「不是客流不够，是产品层级不够」）
- CLI 部署 26s；线上实测 base/收费口径正确
- commits：`d102e1d`（双库架构+base 更正，已 push）；kbase 确认不在 git（ls-files 验证）

## 二、当前站点状态

- 线上：V2 + M2 知识库全量生效
- GitHub：main 同步至 `d102e1d`（纯代码层）
- 本地独有：kbase 四卷 + .env（MOONSHOT_API_KEY / VERCEL_TOKEN）

## 三、待办（下阶段）

1. **深度访谈**（五主题：转型叙事/做事方法/合作现状/文旅观点/人）——增厚 voice 与 cases，姜华有聊兴时开始
2. M3 运营闭环：对话日志存储（脱 IP）+ 每周巡检 harness + 精选对话墙动态化（管理员置顶/删除）
3. M4 栏目杂志化：/work 案例志、/notes 思考集（文旅平话范式）
4. 精选存档目前为整理稿，待真实运营后替换扩充
5. 知识库日常更新流程：姜华投喂 → 蒸馏 → 确认 → 重新部署
6. V1 遗留（优先级待定）：Pagefind 搜索 / RSS / OG 图 / 照片墙懒加载

## 四、运维备忘

- **部署**：`npx vercel deploy --prod --yes --token $VERCEL_TOKEN`（项目根目录，token 在 .env）
- **push**：`wsl -d Ubuntu -- bash -lc 'cd "/mnt/c/Users/Natalie Jiang/jianghua-space" && git push'`（Windows 侧网络/密钥不通，走 WSL+SSH）
- **一键下线分身**：Vercel 环境变量 `CHAT_DISABLED=1`
- **Moonshot 免费额度耗尽**时分身自动显示降级文案，充值即恢复
