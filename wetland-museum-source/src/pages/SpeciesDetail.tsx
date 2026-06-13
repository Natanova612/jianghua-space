import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, Globe, Utensils, Heart, AlertTriangle, Leaf, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';
import { getSpeciesById, speciesList } from '../data/species';
import { stories } from '../data/stories';

export default function SpeciesDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const species = getSpeciesById(id || '');

  if (!species) {
    return (
      <Layout title="物种详情" showBack>
        <div className="px-5 py-8 text-center">
          <p className="text-deep-marsh/60">未找到该物种</p>
        </div>
      </Layout>
    );
  }

  // Find related stories
  const relatedStories = stories.filter(
    (s) =>
      s.relatedSpeciesIds?.includes(species.id) ||
      s.title.includes(species.name) ||
      species.relatedStoryIds?.includes(s.id)
  );

  // Find related species in same category
  const relatedSpecies = speciesList
    .filter(
      (s) =>
        s.category === species.category &&
        s.id !== species.id
    )
    .slice(0, 4);

  const protectionColor =
    species.protectionLevel === '国家一级'
      ? 'text-[#D4785C] bg-[#D4785C15]'
      : species.protectionLevel === '国家二级'
      ? 'text-[#C4A76C] bg-[#C4A76C15]'
      : 'text-deep-marsh/40 bg-[#E8E4DE]';

  return (
    <Layout title={species.name} showBack>
      {/* Hero Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={species.image}
          alt={species.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(42,61,53,0.85) 0%, rgba(42,61,53,0.2) 50%, transparent 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
              {species.category}
            </span>
            {species.protectionLevel && (
              <span className="text-[12px] px-2 py-0.5 rounded-full bg-[#D4785C] text-white">
                {species.protectionLevel}
              </span>
            )}
          </div>
          <h1 className="text-[24px] font-bold text-white">{species.name}</h1>
          <p className="text-[14px] text-white/60 italic">
            {species.latinName}
          </p>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-5"
        >
          {species.protectionLevel && (
            <div className={`flex-1 rounded-xl p-3 ${protectionColor} text-center`}>
              {species.protectionLevel === '国家一级' ? (
                <ShieldAlert size={18} className="mx-auto mb-1" />
              ) : (
                <Shield size={18} className="mx-auto mb-1" />
              )}
              <p className="text-[12px] font-medium">{species.protectionLevel}</p>
            </div>
          )}
          {species.iucnStatus && (
            <div className="flex-1 rounded-xl p-3 bg-[#D4785C15] text-[#D4785C] text-center">
              <AlertTriangle size={18} className="mx-auto mb-1" />
              <p className="text-[12px] font-medium">IUCN {species.iucnStatus}</p>
            </div>
          )}
          <div className="flex-1 rounded-xl p-3 bg-[#3A6B5F15] text-[#3A6B5F] text-center">
            <Globe size={18} className="mx-auto mb-1" />
            <p className="text-[12px] font-medium">{species.category}</p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 shadow-card mb-4"
        >
          <h3 className="text-[16px] font-bold text-deep-marsh mb-2">
            物种简介
          </h3>
          <p className="text-[14px] text-deep-marsh/80 leading-relaxed">
            {species.description}
          </p>
        </motion.div>

        {/* Facts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-xl p-4 shadow-card mb-4"
        >
          <h3 className="text-[16px] font-bold text-deep-marsh mb-2">
            趣味知识
          </h3>
          <ul className="space-y-2">
            {species.facts.map((fact, idx) => (
              <li key={idx} className="flex gap-2 text-[14px] text-deep-marsh/80">
                <span className="text-[#C4A76C] mt-0.5 flex-shrink-0">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Habitat & Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-card mb-4"
        >
          <h3 className="text-[16px] font-bold text-deep-marsh mb-2 flex items-center gap-2">
            <Globe size={16} className="text-[#3A6B5F]" />
            栖息地与分布
          </h3>
          <p className="text-[14px] text-deep-marsh/80 leading-relaxed mb-2">
            <span className="font-medium">栖息地：</span>
            {species.habitat}
          </p>
          <p className="text-[14px] text-deep-marsh/80 leading-relaxed">
            <span className="font-medium">分布范围：</span>
            {species.distribution}
          </p>
        </motion.div>

        {/* Detailed Info */}
        {species.detailedInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-4"
          >
            <h3 className="text-[16px] font-bold text-deep-marsh mb-3">
              详细信息
            </h3>
            <div className="flex flex-col gap-3">
              {/* Physical */}
              <div className="bg-white rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf size={14} className="text-[#6B8F71]" />
                  <h4 className="text-[14px] font-bold text-deep-marsh">
                    形态特征
                  </h4>
                </div>
                <p className="text-[14px] text-deep-marsh/80 leading-relaxed">
                  {species.detailedInfo.physical}
                </p>
              </div>

              {/* Behavior */}
              <div className="bg-white rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={14} className="text-[#D4785C]" />
                  <h4 className="text-[14px] font-bold text-deep-marsh">
                    行为习性
                  </h4>
                </div>
                <p className="text-[14px] text-deep-marsh/80 leading-relaxed">
                  {species.detailedInfo.behavior}
                </p>
              </div>

              {/* Diet */}
              <div className="bg-white rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils size={14} className="text-[#C4A76C]" />
                  <h4 className="text-[14px] font-bold text-deep-marsh">
                    食性
                  </h4>
                </div>
                <p className="text-[14px] text-deep-marsh/80 leading-relaxed">
                  {species.detailedInfo.diet}
                </p>
              </div>

              {/* Threats */}
              <div className="bg-white rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={14} className="text-[#D4785C]" />
                  <h4 className="text-[14px] font-bold text-deep-marsh">
                    威胁因素
                  </h4>
                </div>
                <p className="text-[14px] text-deep-marsh/80 leading-relaxed">
                  {species.detailedInfo.threats}
                </p>
              </div>

              {/* Conservation */}
              <div className="bg-white rounded-xl p-4 shadow-card">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={14} className="text-[#3A6B5F]" />
                  <h4 className="text-[14px] font-bold text-deep-marsh">
                    保护现状
                  </h4>
                </div>
                <p className="text-[14px] text-deep-marsh/80 leading-relaxed">
                  {species.detailedInfo.conservation}
                </p>
              </div>

              {/* Cultural Significance */}
              {species.detailedInfo.culturalSignificance && (
                <div className="bg-white rounded-xl p-4 shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={14} className="text-[#8CAEB5]" />
                    <h4 className="text-[14px] font-bold text-deep-marsh">
                      文化意义
                    </h4>
                  </div>
                  <p className="text-[14px] text-deep-marsh/80 leading-relaxed">
                    {species.detailedInfo.culturalSignificance}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <h3 className="text-[16px] font-bold text-deep-marsh mb-3">
              相关故事
            </h3>
            <div className="flex flex-col gap-2">
              {relatedStories.map((story) => (
                <motion.button
                  key={story.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/stories/${story.id}`)}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-card text-left"
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#3A6B5F15] text-[#3A6B5F]">
                      {story.category}
                    </span>
                    <h4 className="text-[14px] font-medium text-deep-marsh mt-1 truncate">
                      {story.title}
                    </h4>
                    <p className="text-[12px] text-deep-marsh/50 truncate">
                      {story.excerpt}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Species */}
        {relatedSpecies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h3 className="text-[16px] font-bold text-deep-marsh mb-3">
              同类物种
            </h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-5 px-5">
              {relatedSpecies.map((s) => (
                <motion.button
                  key={s.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/species/${s.id}`)}
                  className="flex-shrink-0 w-[120px] snap-start"
                >
                  <div className="bg-white rounded-xl shadow-card overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-[13px] font-medium text-deep-marsh truncate">
                        {s.name}
                      </p>
                      {s.protectionLevel && (
                        <p className="text-[10px] text-[#D4785C]">
                          {s.protectionLevel}
                        </p>
                      )}
                    </div>
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
