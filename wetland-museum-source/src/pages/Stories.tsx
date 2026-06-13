import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';
import Layout from '../components/Layout';
import { stories } from '../data/stories';

const categoryColors: Record<string, string> = {
  '生态工程': 'bg-[#3A6B5F15] text-[#3A6B5F]',
  '历史人文': 'bg-[#C4A76C15] text-[#A67B5B]',
  '濒危物种': 'bg-[#D4785C15] text-[#D4785C]',
  '鸟类故事': 'bg-[#8CAEB515] text-[#5A8A95]',
  '生态保护': 'bg-[#6B8F7115] text-[#4A7A52]',
  '海洋生态': 'bg-[#3A6B5F15] text-[#3A6B5F]',
  '植物故事': 'bg-[#A67B5B15] text-[#8B6548]',
  '农耕智慧': 'bg-[#C4A76C15] text-[#A67B5B]',
  '文化艺术': 'bg-[#8CAEB515] text-[#5A8A95]',
  '城市治理': 'bg-[#3A6B5F15] text-[#3A6B5F]',
  '鸟类保护': 'bg-[#6B8F7115] text-[#4A7A52]',
  '生态修复': 'bg-[#6B8F7115] text-[#4A7A52]',
  '科学人文': 'bg-[#8CAEB515] text-[#5A8A95]',
  '文化抢救': 'bg-[#C4A76C15] text-[#A67B5B]',
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function Stories() {
  const navigate = useNavigate();

  return (
    <Layout title="科普故事">
      <div className="px-5 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <p className="text-[14px] text-deep-marsh/60 leading-relaxed">
            {stories.length} 个生动有趣的湿地故事，让讲解更加引人入胜。涵盖生态保护、历史人文、濒危物种等主题。
          </p>
        </motion.div>

        {/* Stories List */}
        <motion.div
          className="flex flex-col gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stories.map((story) => (
            <motion.button
              key={story.id}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/stories/${story.id}`)}
              className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-card text-left"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0 py-0.5">
                <span
                  className={`inline-block text-[10px] px-2 py-0.5 rounded-full mb-1.5 ${
                    categoryColors[story.category] || 'bg-[#E8E4DE] text-deep-marsh/60'
                  }`}
                >
                  {story.category}
                </span>
                <h4 className="text-[15px] font-bold text-deep-marsh leading-snug line-clamp-1">
                  {story.title}
                </h4>
                <p className="text-[13px] text-deep-marsh/60 mt-1 line-clamp-2 leading-relaxed">
                  {story.excerpt}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Category Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white rounded-xl p-4 shadow-card"
        >
          <h3 className="text-[15px] font-bold text-deep-marsh mb-3 flex items-center gap-2">
            <Feather size={16} className="text-[#C4A76C]" />
            故事分类
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(
              stories.reduce((acc, s) => {
                acc[s.category] = (acc[s.category] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([cat, count]) => (
              <span
                key={cat}
                className={`text-[12px] px-3 py-1.5 rounded-full ${
                  categoryColors[cat] || 'bg-[#E8E4DE] text-deep-marsh/60'
                }`}
              >
                {cat} ({count})
              </span>
            ))}
          </div>
        </motion.div>

        <div className="h-4" />
      </div>
    </Layout>
  );
}
