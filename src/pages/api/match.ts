/**
 * POST /api/match —— JD 匹配器后端
 *
 * 输入：{ "jd": "岗位描述文本" }（50–6000 字）
 * 输出：{ score, verdict, matches: [{point, evidence}], gaps: [...], advice }
 *
 * 事实来源：src/data/profile.json（能力底稿，唯一事实源）
 * 模型：Moonshot/Kimi（OpenAI 兼容接口），key 走环境变量 MOONSHOT_API_KEY
 * 部署：Vercel Serverless（本路由 prerender=false，其余页面仍静态）
 */
import type { APIRoute } from 'astro';
import profileData from '../../data/profile.json';

export const prerender = false;

const MIN_LEN = 50;
const MAX_LEN = 6000;

/* 简易限流：每 IP 每分钟 5 次（serverless 实例内存级，尽力而为） */
const buckets = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.reset) {
    buckets.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  b.count += 1;
  return b.count > 5;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (rateLimited(clientAddress ?? 'unknown')) {
    return json({ error: '请求太频繁，请一分钟后再试。' }, 429);
  }

  let jd = '';
  try {
    const body = await request.json();
    jd = String(body?.jd ?? '').trim();
  } catch {
    return json({ error: '请求格式错误。' }, 400);
  }
  if (jd.length < MIN_LEN) return json({ error: `岗位描述太短（至少 ${MIN_LEN} 字），请粘贴完整 JD。` }, 400);
  if (jd.length > MAX_LEN) return json({ error: `岗位描述过长（最多 ${MAX_LEN} 字）。` }, 400);

  const apiKey = import.meta.env.MOONSHOT_API_KEY;
  if (!apiKey) return json({ error: '匹配服务未配置（缺少 API Key）。' }, 503);

  const profile = JSON.stringify(profileData, null, 2);

  const system = `你是姜华（独立经营顾问，前蚂蚁/美团/同程运营操盘手）个人站点上的「岗位匹配助手」。
访客（通常是面试官或 HR）会粘贴一份岗位 JD，你要基于下方【能力底稿】评估姜华与该岗位的匹配度。

【能力底稿（唯一事实来源，禁止超出其范围编造）】
${profile}

【输出要求】
严格输出 JSON（不要 markdown 代码块），结构如下：
{
  "score": 0-100 的整数匹配度,
  "verdict": "一句话总评（≤40字，坦诚）",
  "matches": [{"point": "匹配点", "evidence": "底稿中的具体证据"}, ... 最多3条],
  "gaps": ["差距或风险，坦诚写出", ... 最多3条],
  "advice": "给面试官的一句话建议：是否值得约聊、适合聊什么（≤50字）"
}
评分口径：80+ 高度匹配；60-79 值得深聊；40-59 部分匹配有缺口；40 以下不推荐。
语气：坦诚、具体、克制。不确定就说不确定。若 JD 与姜华明显不相关，score 给低分并直说。
各字段文本使用与 JD 相同的语言（中文 JD 用中文，英文 JD 用英文）。`;

  try {
    const resp = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: import.meta.env.MOONSHOT_MODEL || 'kimi-k2.6',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: `【岗位 JD】\n${jd}` },
        ],
      }),
    });

    if (!resp.ok) {
      return json({ error: `模型服务异常（${resp.status}），请稍后再试。` }, 502);
    }
    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content ?? '';
    const report = JSON.parse(content);

    // 基本结构校验
    if (typeof report?.score !== 'number' || !Array.isArray(report?.matches)) {
      return json({ error: '模型返回格式异常，请再试一次。' }, 502);
    }
    return json(report);
  } catch {
    return json({ error: '匹配服务暂时不可用，请稍后再试。' }, 502);
  }
};
