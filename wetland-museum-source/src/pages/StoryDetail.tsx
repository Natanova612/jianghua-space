import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { getStoryById, stories } from '../data/stories';
import { speciesList } from '../data/species';

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const story = getStoryById(id || '');

  if (!story) {
    return (
      <Layout title="故事详情" showBack>
        <div className="px-5 py-8 text-center">
          <p className="text-deep-marsh/60">未找到该故事</p>
        </div>
      </Layout>
    );
  }

  // Find related species
  const relatedSpecies = story.relatedSpeciesIds
    ? speciesList.filter((s) => story.relatedSpeciesIds?.includes(s.id))
    : [];

  // Find related stories
  const relatedStories = stories
    .filter(
      (s) =>
        s.id !== story.id &&
        (s.category === story.category || s.relatedHallId === story.relatedHallId)
    )
    .slice(0, 3);

  const categoryColor: Record<string, string> = {
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
  };

  return (
    <Layout title={story.title} showBack>
      {/* Hero Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(42,61,53,0.85) 0%, rgba(42,61,53,0.3) 50%, rgba(42,61,53,0.1) 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span
            className={`inline-block text-[11px] px-2.5 py-1 rounded-full mb-2 ${
              categoryColor[story.category] || 'bg-white/20 text-white'
            }`}
          >
            {story.category}
          </span>
          <h1 className="text-[22px] font-bold text-white leading-tight">
            {story.title}
          </h1>
          <p className="text-[14px] text-white/60 mt-1">{story.excerpt}</p>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 shadow-card mb-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-[#C4A76C]" />
            <h3 className="text-[16px] font-bold text-deep-marsh">故事正文</h3>
          </div>
          <p className="text-[15px] text-deep-marsh/85 leading-[1.8] whitespace-pre-line">
            {story.content}
          </p>
        </motion.div>

        {/* Related Species */}
        {relatedSpecies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5"
          >
            <h3 className="text-[16px] font-bold text-deep-marsh mb-3">
              相关物种
            </h3>
            <div className="flex flex-col gap-2">
              {relatedSpecies.map((species) => (
                <motion.button
                  key={species.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/species/${species.id}`)}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-card text-left"
                >
                  <img
                    src={species.image}
                    alt={species.name}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[15px] font-medium text-deep-marsh">
                        {species.name}
                      </p>
                      {species.protectionLevel && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#D4785C15] text-[#D4785C]">
                          {species.protectionLevel}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-deep-marsh/50">
                      {species.category} · {species.latinName}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-deep-marsh/20 flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Hall Link */}
        {story.relatedHallId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-5"
          >
            <button
              onClick={() => navigate(`/halls/${story.relatedHallId}`)}
              className="w-full flex items-center justify-between bg-[#3A6B5F10] rounded-xl p-4 text-left"
            >
              <div>
                <p className="text-[12px] text-[#3A6B5F]">查看所属展厅</p>
                <p className="text-[15px] font-medium text-deep-marsh mt-0.5">
                  {story.relatedHallId === 'hall-1'
                    ? '走进湿地厅'
                    : story.relatedHallId === 'hall-2'
                    ? '湿地洞天厅'
                    : story.relatedHallId === 'hall-3'
                    ? '湿地万象厅'
                    : story.relatedHallId === 'hall-4'
                    ? '只此西溪厅'
                    : '中国湿地厅'}
                </p>
              </div>
              <ChevronRight size={18} className="text-[#3A6B5F]" />
            </button>
          </motion.div>
        )}

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-[16px] font-bold text-deep-marsh mb-3">
              相关故事
            </h3>
            <div className="flex flex-col gap-2">
              {relatedStories.map((s) => (
                <motion.button
                  key={s.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/stories/${s.id}`)}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-card text-left"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        categoryColor[s.category] || 'bg-[#E8E4DE] text-deep-marsh/60'
                      }`}
                    >
                      {s.category}
                    </span>
                    <h4 className="text-[14px] font-medium text-deep-marsh mt-1 truncate">
                      {s.title}
                    </h4>
                    <p className="text-[12px] text-deep-marsh/50 truncate">
                      {s.excerpt}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="h-6" />
      </div>
    </Layout>
  );
}
