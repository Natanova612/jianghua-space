import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { halls } from '../data/halls';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const routeRecommendations = [
  {
    name: '经典路线',
    time: '约90分钟',
    route: '走进湿地 → 湿地洞天 → 中国湿地（中庭） → 湿地万象 → 只此西溪',
    color: 'bg-[#3A6B5F]',
  },
  {
    name: '快速路线',
    time: '约45分钟',
    route: '走进湿地 → 湿地洞天 → 湿地万象 → 只此西溪',
    color: 'bg-[#C4A76C]',
  },
  {
    name: '亲子路线',
    time: '约60分钟',
    route: '湿地洞天（巨幕） → 湿地万象（动物） → 只此西溪（农耕）',
    color: 'bg-[#8CAEB5]',
  },
];

export default function HallGuide() {
  const navigate = useNavigate();

  return (
    <Layout title="展厅导览">
      <div className="px-5 py-4">
        {/* Route Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-lg font-bold text-deep-marsh mb-3">推荐路线</h3>
          <div className="flex flex-col gap-2.5 mb-6">
            {routeRecommendations.map((r) => (
              <div
                key={r.name}
                className="bg-white rounded-xl p-3.5 shadow-card"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-2 h-2 rounded-full ${r.color}`} />
                  <span className="text-[15px] font-medium text-deep-marsh">
                    {r.name}
                  </span>
                  <span className="text-[12px] text-deep-marsh/50 flex items-center gap-1 ml-auto">
                    <Clock size={12} />
                    {r.time}
                  </span>
                </div>
                <p className="text-[13px] text-deep-marsh/60 leading-relaxed">
                  {r.route}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hall Cards */}
        <h3 className="text-lg font-bold text-deep-marsh mb-3">全部展厅</h3>
        <motion.div
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {halls.map((hall) => (
            <motion.button
              key={hall.id}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/halls/${hall.id}`)}
              className="relative overflow-hidden rounded-2xl shadow-card text-left"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={hall.image}
                  alt={hall.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(42,61,53,0.85) 0%, rgba(42,61,53,0.3) 50%, rgba(42,61,53,0.1) 100%)',
                  }}
                />
                {/* Atrium badge */}
                {hall.id === 'atrium' && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[#C4A76C] text-white text-[11px] font-medium">
                    中庭过渡区
                  </div>
                )}
                {/* Hall number */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MapPin size={14} className="text-white" />
                </div>
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="text-[18px] font-bold text-white leading-tight">
                    {hall.name}
                  </h4>
                  <p className="text-[13px] text-white/70 mt-1">
                    {hall.subtitle}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[11px] text-white/60">
                      {hall.sections.length} 个板块
                    </span>
                    <span className="text-[11px] text-white/60">
                      {hall.sections.reduce((sum, s) => sum + s.keyPoints.length, 0)} 个知识点
                    </span>
                  </div>
                </div>
              </div>
              {/* Bottom info bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-white">
                <span className="text-[12px] text-[#3A6B5F]">
                  查看讲解详情
                </span>
                <ChevronRight size={16} className="text-[#3A6B5F]" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-[#3A6B5F10] rounded-xl p-4"
        >
          <h4 className="text-[15px] font-medium text-[#3A6B5F] mb-2">
            讲解提示
          </h4>
          <ul className="text-[13px] text-deep-marsh/70 space-y-1.5">
            <li className="flex gap-2">
              <span className="text-[#3A6B5F] mt-0.5">•</span>
              <span>建议从第一展厅开始按顺序参观，中庭位于第二、三展厅之间</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#3A6B5F] mt-0.5">•</span>
              <span>第二展厅的32.5米巨幕是全馆亮点，建议预留15分钟</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#3A6B5F] mt-0.5">•</span>
              <span>第三展厅物种丰富，可根据观众兴趣重点展开</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#3A6B5F] mt-0.5">•</span>
              <span>第四展厅适合结合西溪实地游览进行讲解</span>
            </li>
          </ul>
        </motion.div>

        <div className="h-4" />
      </div>
    </Layout>
  );
}
