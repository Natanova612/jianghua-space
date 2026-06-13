import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Compass, Database, Fish, TreePine, Landmark, Droplets, Feather } from 'lucide-react';
import Layout from '../components/Layout';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const quickQuestions = [
  {
    icon: Compass,
    text: '请介绍四个展厅的内容',
    answer: `博物馆共有4个主题展厅和1个中庭：

**走进湿地厅**：了解湿地定义（5类34型）、形成原因、四大功能（调节/支持/供给/文化），以及全球湿地分布奇观。

**湿地洞天厅**：数字化沉浸式体验展厅，有32.5米180度巨幕、270个二维码艺术装置、11种灭绝生物立柱。

**湿地万象厅**：展示湿地生物多样性（水獭、儒艮、麋鹿等）和湿地大观（坎儿井、京杭大运河、红树林等）。

**只此西溪厅**：从文化、农耕、城市三个维度展现西溪湿地，包括三基鱼塘、POD模式、水质提升等。

**中庭（中国湿地厅）**：展示中国湿地5635万公顷资源现状和保护成就。`,
  },
  {
    icon: Fish,
    text: '国家一级保护动物有哪些？',
    answer: `本馆重点介绍的国家一级保护动物：

• **儒艮**："美人鱼"原型，2025年南沙重新发现
• **麋鹿**："四不像"，1986年引回39头，现8000+头
• **扬子鳄**：中国特有，野生种群不足200条
• **绿海龟**：以海草为食，体内脂肪呈绿色
• **中华鲟**：洄游5000+km，"水中大熊猫"
• **丹顶鹤**：一夫一妻制，古代神鸟
  • **黑颈鹤**：全球唯一高原繁殖鹤类，2020年IUCN从"易危"降为"近危"，种群超1.7万只

点击百科页面可查看每个物种的详细信息。`,
  },
  {
    icon: Database,
    text: '有哪些重要的数据需要记住？',
    answer: `讲解必备的核心数据：

**面积数据**：
• 全球湿地1280万km²，占陆地8.7%
• 中国湿地5635万公顷，亚洲第一世界第四
• 近50年损失率21.6%

**物种数据**：
• 湿地植物215科2173种
• 鱼类全球21700种，中国3000种，湿地1000+种
• 湿地鸟类280种

**新增物种数据**：
  • 天鹅：巴音布鲁克近1万只，中国最大天鹅繁殖栖息地
  • 黑颈鹤：全球种群超1.7万只，中国特有高原鹤类
  • 震旦鸦雀："鸟中熊猫"，中国特有珍稀鸟类，高度依赖芦苇生境

**保护数据**：
• 1992年加入《湿地公约》
• 82处国际重要湿地
• 累计投入198亿元

**西溪数据**：
• 面积10.38km²，鱼塘1066个，鱼类56种
• 综保工程150+亿元
• 水质从劣五类提升至II类`,
  },
  {
    icon: Landmark,
    text: '西溪湿地的POD模式是什么？',
    answer: `POD模式（Park Oriented Development）是西溪湿地保护的核心理念：

**"以玉为核，以金为边"**
- "玉" = 湿地公园（生态核心）
- "金" = 周边开发（经济支撑）

**"赋金于玉""金玉成碧"**
通过科学的周边开发，为保护提供资金，最终实现生态效益和经济效益的双赢。

**实际成效**：
• 综保工程累计投资150多亿元
• 水质从劣五类提升至II类
• 中国第一个国家湿地公园
• 2009年列入国际重要湿地名录
• 引领全国1000+处湿地公园建设

2020年3月，习近平总书记考察西溪，叮嘱"坚定不移把保护摆在第一位"。`,
  },
  {
    icon: TreePine,
    text: '红树林为什么被称为海岸卫士？',
    answer: `红树林被称为"海岸卫士"的原因：

**强大的消浪能力**：
• 消浪效率是人工防波堤的3-5倍
• 2004年印度洋海啸中，有红树林保护的村庄死亡率降低90%

**两大独特特性**：
• **泌盐**：通过叶片盐腺排出多余盐分
• **胎生**：种子在母树上发芽，提高成活率

**全球分布**：
• 118个国家，总面积1380万公顷
• 中国南至三亚，北至福建福鼎
• 截至2025年2月，中国红树林面积3.03万公顷

**生态功能**：
为鱼类提供育苗场，为鸟类提供栖息地，固碳能力强，是海岸生态系统的核心。`,
  },
  {
    icon: Droplets,
    text: '讲解时间有限，推荐快速路线',
    answer: `推荐45分钟快速路线：

**第1站：走进湿地厅（10分钟）**
重点讲解：湿地定义+四大功能+碳汇数据（6%陆地→30%有机碳）

**第2站：湿地洞天厅（15分钟）**
重点体验：32.5米巨幕+270个二维码装置（这是全馆最震撼的部分）

**第3站：湿地万象厅（12分钟）**
重点参观：麋鹿（8000+头）、中华鲟（洄游5000km）、丹顶鹤（一夫一妻）

**第4站：只此西溪厅（8分钟）**
重点讲解：POD模式+水质提升（劣五类→II类）+习近平考察

跳过中庭的中国湿地厅，保留四个核心展厅。`,
  },
  {
    icon: Feather,
    text: '介绍一下新增的鸟类物种',
    answer: `本馆新增介绍的鸟类物种：

**天鹅（Cygnus spp.）**：
  • 国家二级保护动物
  • 中国分布3种：大天鹅、小天鹅、疣鼻天鹅
  • 新疆巴音布鲁克天鹅湖是中国最大的天鹅繁殖栖息地，每年有近1万只栖息繁殖
  • 飞行高度可达8-9千米，能跨越珠穆朗玛峰
  • 实行严格的一夫一妻制

**黑颈鹤（Grus nigricollis）**：
  • 国家一级保护动物，中国特有物种
  • 全球15种鹤类中唯一终生栖息于高原的物种
  • 2020年IUCN保护级别从"易危"调整为"近危"
  • 全球种群已从约10,000只增长到现在的超1.7万只
  • 被藏族人民视为吉祥鸟

**震旦鸦雀（Calamornis heudei）**：
  • 国家二级保护动物，IUCN近危
  • 中国特有珍稀鸟类，被誉为"鸟中熊猫"
  • 体型比麻雀还小，黄色嘴巴，黑色眉纹
  • 高度依赖芦苇生境，被称为"芦苇中的精灵"

这些物种都可以在「动植物百科」中查看详细信息。`,
  },
];

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是湿地博物馆讲解助手。我可以帮你：\n\n• 了解展厅布局和参观路线\n• 查询重点物种的详细信息\n• 记住关键数据和知识点\n• 获取生动有趣的讲解故事\n\n点击下方快捷问题，或直接输入你的问题。',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const userText = text || input.trim();
    if (!userText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Find matching quick question
    const matched = quickQuestions.find((q) => q.text === userText);

    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          matched?.answer ||
          `抱歉，我暂时无法回答这个问题。你可以尝试：

1. 查看「展厅导览」了解展厅布局
2. 查看「动植物百科」了解物种信息
3. 查看「知识卡片」获取关键数据
4. 查看「科普故事」获取生动案例

或尝试上方推荐的快捷问题。`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout title="讲解助手" showBack showNav={false} showAssistant={false}>
      {/* Messages */}
      <div className="px-4 py-3 space-y-3 pb-48">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-[#3A6B5F] text-white'
                  : 'bg-white shadow-card'
              }`}
            >
              <p
                className={`text-[14px] leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'text-white'
                    : 'text-deep-marsh/85'
                }`}
              >
                {msg.content}
              </p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white shadow-card rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-deep-marsh/30 animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-deep-marsh/30 animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-deep-marsh/30 animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions + Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F5F2ED] border-t border-[#E8E4DE] z-40">
        <div className="max-w-[430px] mx-auto">
          {/* Quick Questions */}
          <div className="px-4 pt-3 pb-2">
            <p className="text-[11px] text-deep-marsh/30 mb-1.5">
              快捷问题
            </p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory">
              {quickQuestions.map((q) => (
                <button
                  key={q.text}
                  onClick={() => handleSend(q.text)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white shadow-card text-[12px] text-deep-marsh/70 whitespace-nowrap snap-start flex-shrink-0"
                >
                  <q.icon size={13} className="text-[#3A6B5F]" />
                  {q.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 pb-4 pt-2 flex items-center gap-2">
            <div className="flex-1 flex items-center bg-white rounded-full px-4 shadow-card">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的问题..."
                className="flex-1 h-11 text-[14px] text-deep-marsh placeholder:text-deep-marsh/30 outline-none bg-transparent"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSend()}
              className="w-11 h-11 rounded-full bg-[#3A6B5F] flex items-center justify-center flex-shrink-0"
            >
              <Send size={18} className="text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
