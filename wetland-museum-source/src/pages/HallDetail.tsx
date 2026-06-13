import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Award, Eye, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';
import { getHallById } from '../data/halls';
import { speciesList } from '../data/species';

export default function HallDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hall = getHallById(id || '');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedKeyPoint, setExpandedKeyPoint] = useState<string | null>(null);

  if (!hall) {
    return (
      <Layout title="展厅详情" showBack>
        <div className="px-5 py-8 text-center">
          <p className="text-deep-marsh/60">未找到该展厅</p>
        </div>
      </Layout>
    );
  }

  // Get related species for this hall
  const relatedSpeciesIds: Record<string, string[]> = {
    'hall-3': ['otter', 'dugong', 'seal', 'sea-lion', 'milu', 'yangtze', 'turtle', 'hawksbill', 'sturgeon', 'crane', 'curlew', 'godwit', 'plover', 'mangrove', 'coral', 'suaeda', 'seagrass', 'swan', 'black-necked-crane', 'reed-parrotbill', 'vetch', 'willow'],
    'hall-4': ['milu', 'swan', 'black-necked-crane', 'reed-parrotbill', 'daylily', 'wormwood'],
  };
  const relatedSpecies = relatedSpeciesIds[hall.id]
    ? speciesList.filter((s) => relatedSpeciesIds[hall.id].includes(s.id))
    : [];

  const toggleSection = (name: string) => {
    setExpandedSection(expandedSection === name ? null : name);
  };

  const typeColor = (type: string) => {
    switch (type) {
      case 'data':
        return 'bg-[#3A6B5F15] text-[#3A6B5F] border-[#3A6B5F30]';
      case 'exhibit':
        return 'bg-[#C4A76C15] text-[#A67B5B] border-[#C4A76C30]';
      case 'panel':
        return 'bg-[#8CAEB515] text-[#5A8A95] border-[#8CAEB530]';
      default:
        return 'bg-[#E8E4DE] text-deep-marsh/60';
    }
  };

  const typeLabel = (type: string) => {
    switch (type) {
      case 'data':
        return '数据';
      case 'exhibit':
        return '展品';
      case 'panel':
        return '展板';
      default:
        return type;
    }
  };

  return (
    <Layout title={hall.name} showBack>
      {/* Hero Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={hall.image}
          alt={hall.name}
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
          <p className="text-[13px] text-white/60 mb-1">{hall.subtitle}</p>
          <h1 className="text-[22px] font-bold text-white leading-tight">
            {hall.name}
          </h1>
          <p className="text-[13px] text-white/70 mt-2 leading-relaxed line-clamp-2">
            {hall.description}
          </p>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mb-5"
        >
          <div className="flex-1 bg-white rounded-xl p-3 shadow-card text-center">
            <p className="text-[22px] font-bold text-[#3A6B5F]">{hall.sections.length}</p>
            <p className="text-[12px] text-deep-marsh/50">讲解板块</p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-3 shadow-card text-center">
            <p className="text-[22px] font-bold text-[#C4A76C]">
              {hall.sections.reduce((sum, s) => sum + s.keyPoints.length, 0)}
            </p>
            <p className="text-[12px] text-deep-marsh/50">知识点</p>
          </div>
          {relatedSpecies.length > 0 && (
            <div className="flex-1 bg-white rounded-xl p-3 shadow-card text-center">
              <p className="text-[22px] font-bold text-[#8CAEB5]">{relatedSpecies.length}</p>
              <p className="text-[12px] text-deep-marsh/50">相关物种</p>
            </div>
          )}
        </motion.div>

        {/* Narration Sections */}
        <h3 className="text-lg font-bold text-deep-marsh mb-3 flex items-center gap-2">
          <BookOpen size={20} className="text-[#3A6B5F]" />
          讲解词
        </h3>
        <div className="flex flex-col gap-3">
          {hall.sections.map((section, sectionIdx) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIdx * 0.05 }}
              className="bg-white rounded-xl shadow-card overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.name)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-[#3A6B5F] bg-[#3A6B5F15] px-2 py-0.5 rounded-full">
                      {String(sectionIdx + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-[16px] font-bold text-deep-marsh">
                      {section.name}
                    </h4>
                  </div>
                  <p className="text-[12px] text-deep-marsh/50 mt-1">
                    {section.keyPoints.length} 个知识点 · {section.content.length} 段讲解
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === section.name ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-deep-marsh/40" />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedSection === section.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t border-[#E8E4DE]">
                      {/* Narration Text */}
                      <div className="pt-3 space-y-3">
                        {section.content.map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-[14px] text-deep-marsh/80 leading-relaxed"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Key Points */}
                      <div className="mt-4 space-y-2">
                        <p className="text-[13px] font-medium text-deep-marsh/60 flex items-center gap-1.5">
                          <Award size={14} className="text-[#C4A76C]" />
                          重点提示
                        </p>
                        {section.keyPoints.map((kp) => (
                          <div
                            key={kp.title}
                            className={`rounded-lg border p-3 ${typeColor(kp.type)}`}
                          >
                            <button
                              onClick={() =>
                                setExpandedKeyPoint(
                                  expandedKeyPoint === kp.title ? null : kp.title
                                )
                              }
                              className="w-full flex items-center justify-between text-left"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <Eye size={14} className="flex-shrink-0 opacity-70" />
                                <span className="text-[14px] font-medium truncate">
                                  {kp.title}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/50 flex-shrink-0">
                                  {typeLabel(kp.type)}
                                </span>
                              </div>
                            </button>
                            <p className="text-[13px] mt-1.5 leading-relaxed opacity-80 pl-6">
                              {kp.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Related Species */}
        {relatedSpecies.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-deep-marsh mb-3">
              相关物种
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedSpecies.map((species) => (
                <motion.button
                  key={species.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/species/${species.id}`)}
                  className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-card"
                >
                  <img
                    src={species.image}
                    alt={species.name}
                    className="w-8 h-8 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <p className="text-[13px] font-medium text-deep-marsh">
                      {species.name}
                    </p>
                    {species.protectionLevel && (
                      <p className="text-[10px] text-[#D4785C]">
                        {species.protectionLevel}
                      </p>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <div className="h-6" />
      </div>
    </Layout>
  );
}
