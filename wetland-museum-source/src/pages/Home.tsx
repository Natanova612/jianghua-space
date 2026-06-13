import { useNavigate } from 'react-router';
import { Map, Lightbulb, BookOpen, Feather, ChevronRight, Heart } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import FloatingAssistantButton from '../components/FloatingAssistantButton';
import Footer from '../components/Footer';
import { knowledgeCards } from '../data/knowledgeCards';
import { halls } from '../data/halls';
import { speciesList } from '../data/species';

/* ---------- helpers ---------- */
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return '早安，讲解员';
  if (hour < 18) return '午安，讲解员';
  return '晚安，讲解员';
}

function formatDate() {
  const now = new Date();
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${days[now.getDay()]}`;
}

function getDailySpeciesIndex() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return dayOfYear % speciesList.length;
}

/* ---------- animation variants ---------- */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ---------- section component ---------- */
function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: 'easeOut', delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- quick access grid ---------- */
const quickAccessItems = [
  {
    icon: Map,
    title: '展厅导览',
    subtitle: '4大主题展厅+中庭',
    bg: 'bg-[#3A6B5F15]',
    iconColor: 'text-[#3A6B5F]',
    path: '/halls',
  },
  {
    icon: Lightbulb,
    title: '知识卡片',
    subtitle: `${knowledgeCards.length}个精华知识点`,
    bg: 'bg-[#C4A76C15]',
    iconColor: 'text-[#C4A76C]',
    path: '/cards',
  },
  {
    icon: BookOpen,
    title: '动植物百科',
    subtitle: `${speciesList.length}个重点物种`,
    bg: 'bg-[#8CAEB515]',
    iconColor: 'text-[#8CAEB5]',
    path: '/encyclopedia',
  },
  {
    icon: Feather,
    title: '科普故事',
    subtitle: '生动有趣的湿地故事',
    bg: 'bg-[#A67B5B15]',
    iconColor: 'text-[#A67B5B]',
    path: '/stories',
  },
];

/* ---------- home page ---------- */
export default function Home() {
  const navigate = useNavigate();
  const [greeting] = useState(getGreeting);
  const dailySpecies = speciesList[getDailySpeciesIndex()];

  /* re-compute greeting on mount */
  useEffect(() => {
    /* no-op, just ensuring consistent hook order */
  }, []);

  /* recommended cards: data-rich ones */
  const dataCards = knowledgeCards.filter((c) => c.type === '数据型');
  const recommendedCards = dataCards.slice(0, 4);

  return (
    <Layout
      title="湿地讲解助手"
      showBack={false}
      showSearch={true}
      showAssistant={true}
    >
      {/* ====== Hero Section ====== */}
      <section className="relative w-full h-60 overflow-hidden">
        <motion.img
          src="/hero-wetland.jpg"
          alt="西溪湿地清晨全景"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        />
        {/* gradient overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-20"
          style={{
            background:
              'linear-gradient(to top, #F5F2ED 0%, #F5F2ED00 100%)',
          }}
        />
        {/* text content */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
          <motion.h2
            className="font-display text-[28px] font-bold text-white leading-tight"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            {greeting}
          </motion.h2>
          <motion.p
            className="text-[15px] text-white/80 mt-1"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.25)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            {formatDate()}
          </motion.p>
          <motion.p
            className="text-[13px] text-white/70 mt-0.5"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.25)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            今日已准备 {recommendedCards.length} 个知识点，祝你讲解顺利
          </motion.p>
        </div>
      </section>

      <div className="px-5 py-4">
        {/* ====== Search Bar ====== */}
        <AnimatedSection>
          <SearchBar onClick={() => navigate('/search')} />
        </AnimatedSection>

        {/* ====== Quick Access Grid ====== */}
        <AnimatedSection className="mt-4">
          <h3 className="text-xl font-bold text-deep-marsh mb-3">快速开始</h3>
          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {quickAccessItems.map((item) => (
              <motion.button
                key={item.path}
                variants={fadeInUp}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                onClick={() => navigate(item.path)}
                className={`${item.bg} rounded-2xl p-4 flex flex-col items-start gap-2 aspect-[1.2/1]`}
              >
                <item.icon size={32} className={item.iconColor} />
                <div className="mt-auto">
                  <p className="text-[17px] font-medium text-deep-marsh">
                    {item.title}
                  </p>
                  <p className="text-[13px] text-deep-marsh/60 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatedSection>

        {/* ====== Today's Recommended Cards ====== */}
        <AnimatedSection className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-deep-marsh">今日推荐</h3>
            <button
              onClick={() => navigate('/cards')}
              className="text-[13px] text-[#3A6B5F] font-medium"
            >
              查看全部 →
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-5 px-5">
            {recommendedCards.map((card) => (
              <motion.div
                key={card.id}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 w-[280px] snap-start cursor-pointer"
                onClick={() => {
                  if (card.storyId) navigate(`/stories/${card.storyId}`);
                  else navigate(`/cards`);
                }}
              >
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  {card.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#3A6B5F15] text-[#3A6B5F]">
                        {card.type}
                      </span>
                      {card.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-[#8CAEB515] text-[#5A8A95]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-base font-bold text-deep-marsh truncate">
                      {card.title}
                    </h4>
                    <p className="text-[13px] text-deep-marsh/70 mt-1 line-clamp-2">
                      {card.summary}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <button className="p-1">
                        <Heart
                          size={18}
                          className="text-[#2A3D354D]"
                        />
                      </button>
                      <span className="text-[13px] text-[#3A6B5F] font-medium">
                        去学习 →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* ====== Hall Guide Section ====== */}
        <AnimatedSection className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-deep-marsh">展厅导览</h3>
            <button
              onClick={() => navigate('/halls')}
              className="text-[13px] text-[#3A6B5F] font-medium"
            >
              全部展厅 →
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {halls.map((hall, index) => (
              <motion.button
                key={hall.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                  delay: index * 0.05,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/halls/${hall.id}`)}
                className="flex items-center gap-3 bg-white rounded-xl p-2 shadow-card text-left"
              >
                <img
                  src={hall.image}
                  alt={hall.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0 py-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[15px] font-medium text-deep-marsh truncate">
                      {hall.name}
                    </p>
                    {hall.id === 'atrium' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#C4A76C20] text-[#A67B5B] flex-shrink-0">
                        中庭
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-deep-marsh/60 truncate mt-0.5">
                    {hall.subtitle}
                  </p>
                  <p className="text-[11px] text-deep-marsh/40 mt-1">
                    {hall.sections.length}个板块 · {hall.sections.reduce((sum, s) => sum + s.keyPoints.length, 0)}个知识点
                  </p>
                </div>
                <ChevronRight
                  size={24}
                  className="text-deep-marsh/30 flex-shrink-0 mr-1"
                />
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* ====== Recent Learning Section ====== */}
        <AnimatedSection className="mt-6">
          <h3 className="text-xl font-bold text-deep-marsh mb-3">最近学习</h3>
          <div className="bg-white rounded-2xl shadow-card p-4 text-center">
            <p className="text-[15px] text-deep-marsh/60">
              还没有学习记录，去探索吧
            </p>
            <button
              onClick={() => navigate('/halls')}
              className="mt-3 px-5 py-2 rounded-full border border-[#3A6B5F] text-[#3A6B5F] text-[14px] font-medium"
            >
              开始探索
            </button>
          </div>
        </AnimatedSection>

        {/* ====== Daily Image ====== */}
        <AnimatedSection className="mt-8 mb-4">
          <h3 className="text-xl font-bold text-deep-marsh mb-3">每日一图</h3>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/species/${dailySpecies.id}`)}
            className="w-full rounded-2xl overflow-hidden shadow-card relative"
          >
            <div className="aspect-[16/10]">
              <img
                src={dailySpecies.image}
                alt={dailySpecies.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  'linear-gradient(to top, rgba(42,61,53,0.8) 0%, transparent 100%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
              <div className="flex items-center gap-2">
                <p className="text-[17px] font-medium text-white">{dailySpecies.name}</p>
                {dailySpecies.protectionLevel && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#D4785C] text-white">
                    {dailySpecies.protectionLevel}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-white/70">
                {dailySpecies.category} · {dailySpecies.latinName}
              </p>
            </div>
          </motion.button>
        </AnimatedSection>
      </div>

      <Footer />

      {/* ====== FAB ====== */}
      <FloatingAssistantButton />
    </Layout>
  );
}
