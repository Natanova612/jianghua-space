import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, RotateCcw, Database, Eye, Lightbulb } from 'lucide-react';
import Layout from '../components/Layout';
import { knowledgeCards } from '../data/knowledgeCards';
import { halls } from '../data/halls';

const hallFilters = [
  { id: 'all', name: '全部' },
  ...halls.map((h) => ({ id: h.id, name: h.name.replace('厅', '') })),
];

const typeFilters = ['全部', '数据型', '展板型', '科普型'] as const;

export default function KnowledgeCards() {
  const navigate = useNavigate();
  const [activeHall, setActiveHall] = useState('all');
  const [activeType, setActiveType] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const filtered = knowledgeCards.filter((card) => {
    const matchHall = activeHall === 'all' || card.hallId === activeHall;
    const matchType = activeType === '全部' || card.type === activeType;
    const matchSearch =
      !searchQuery ||
      card.title.includes(searchQuery) ||
      card.summary.includes(searchQuery) ||
      card.detail.includes(searchQuery);
    const matchFav = !showFavoritesOnly || favorites.has(card.id);
    return matchHall && matchType && matchSearch && matchFav;
  });

  const toggleFavorite = (e: React.MouseEvent, cardId: string) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      return next;
    });
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case '数据型':
        return <Database size={12} />;
      case '展板型':
        return <Eye size={12} />;
      case '科普型':
        return <Lightbulb size={12} />;
      default:
        return null;
    }
  };

  const typeColor = (type: string) => {
    switch (type) {
      case '数据型':
        return 'bg-[#3A6B5F15] text-[#3A6B5F]';
      case '展板型':
        return 'bg-[#C4A76C15] text-[#A67B5B]';
      case '科普型':
        return 'bg-[#8CAEB515] text-[#5A8A95]';
      default:
        return 'bg-[#E8E4DE] text-deep-marsh/60';
    }
  };

  return (
    <Layout title="知识卡片">
      <div className="px-5 py-4">
        {/* Search */}
        <div className="relative mb-3">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-marsh/30"
          />
          <input
            type="text"
            placeholder="搜索知识点..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-full bg-[#E8E4DE] text-[14px] text-deep-marsh placeholder:text-deep-marsh/30 outline-none focus:ring-2 focus:ring-[#3A6B5F40]"
          />
        </div>

        {/* Hall Filters */}
        <div className="mb-2">
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {hallFilters.map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveHall(h.id)}
                className={`px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-all flex-shrink-0 ${
                  activeHall === h.id
                    ? 'bg-[#3A6B5F] text-white'
                    : 'bg-[#E8E4DE] text-deep-marsh/60'
                }`}
              >
                {h.name}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filters + Favorites toggle */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1.5">
            {typeFilters.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-3 py-1.5 rounded-full text-[12px] transition-all ${
                  activeType === t
                    ? 'bg-[#C4A76C] text-white'
                    : 'bg-[#E8E4DE] text-deep-marsh/60'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[12px] transition-all ${
              showFavoritesOnly
                ? 'bg-[#D4785C] text-white'
                : 'bg-[#E8E4DE] text-deep-marsh/60'
            }`}
          >
            <Heart size={12} />
            收藏
          </button>
        </div>

        {/* Results count */}
        <p className="text-[12px] text-deep-marsh/40 mb-3">
          共 {filtered.length} 张卡片
          {favorites.size > 0 && ` · 已收藏 ${favorites.size} 张`}
        </p>

        {/* Cards Grid */}
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="relative cursor-pointer"
                style={{ perspective: '1000px' }}
                onClick={() => setFlippedCard(flippedCard === card.id ? null : card.id)}
              >
                <motion.div
                  className="relative w-full"
                  animate={{ rotateY: flippedCard === card.id ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* === Front === */}
                  <div
                    className="bg-white rounded-xl shadow-card overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${typeColor(
                                card.type
                              )}`}
                            >
                              {typeIcon(card.type)}
                              {card.type}
                            </span>
                            <span className="text-[10px] text-deep-marsh/30">
                              {card.sectionName}
                            </span>
                          </div>
                          <h4 className="text-[15px] font-bold text-deep-marsh leading-snug">
                            {card.title}
                          </h4>
                          <p className="text-[13px] text-deep-marsh/60 mt-1.5 leading-relaxed">
                            {card.summary}
                          </p>
                        </div>
                        <button
                          onClick={(e) => toggleFavorite(e, card.id)}
                          className="p-1 ml-2 flex-shrink-0"
                        >
                          <Heart
                            size={18}
                            className={
                              favorites.has(card.id)
                                ? 'text-[#D4785C] fill-[#D4785C]'
                                : 'text-[#2A3D354D]'
                            }
                          />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#8CAEB510] text-[#5A8A95]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* === Back === */}
                  <div
                    className="absolute inset-0 bg-white rounded-xl shadow-card overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="p-4 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[14px] font-bold text-deep-marsh">
                          详细内容
                        </h4>
                        <RotateCcw size={14} className="text-deep-marsh/30" />
                      </div>
                      <div className="flex-1 overflow-y-auto">
                        <p className="text-[13px] text-deep-marsh/80 leading-relaxed">
                          {card.detail}
                        </p>
                      </div>
                      {card.storyId && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/stories/${card.storyId}`);
                          }}
                          className="mt-3 text-[12px] text-[#3A6B5F] font-medium"
                        >
                          查看相关故事 →
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-deep-marsh/40 text-[15px]">未找到匹配的卡片</p>
            <button
              onClick={() => {
                setActiveHall('all');
                setActiveType('全部');
                setSearchQuery('');
                setShowFavoritesOnly(false);
              }}
              className="mt-3 text-[13px] text-[#3A6B5F]"
            >
              清除筛选条件
            </button>
          </div>
        )}

        <div className="h-4" />
      </div>
    </Layout>
  );
}
