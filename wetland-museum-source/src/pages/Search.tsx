import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Compass, Database, Fish, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';
import { halls } from '../data/halls';
import { speciesList } from '../data/species';
import { knowledgeCards } from '../data/knowledgeCards';
import { stories } from '../data/stories';

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  type: '展厅' | '物种' | '知识卡片' | '故事';
  path: string;
  matchReason: string;
};

export default function SearchPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getResults = (): SearchResult[] => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    const results: SearchResult[] = [];

    // Search halls
    halls.forEach((hall) => {
      if (
        hall.name.includes(q) ||
        hall.subtitle.includes(q) ||
        hall.description.includes(q) ||
        hall.sections.some(
          (s) =>
            s.name.includes(q) ||
            s.content.some((c) => c.includes(q)) ||
            s.keyPoints.some((kp) => kp.title.includes(q) || kp.description.includes(q))
        )
      ) {
        results.push({
          id: `hall-${hall.id}`,
          title: hall.name,
          subtitle: hall.subtitle,
          type: '展厅',
          path: `/halls/${hall.id}`,
          matchReason: `${hall.sections.length}个板块`,
        });
      }
    });

    // Search species
    speciesList.forEach((s) => {
      if (
        s.name.includes(q) ||
        s.latinName.toLowerCase().includes(q) ||
        s.description.includes(q) ||
        s.category.includes(q) ||
        s.protectionLevel.includes(q) ||
        s.facts.some((f) => f.includes(q))
      ) {
        results.push({
          id: `species-${s.id}`,
          title: s.name,
          subtitle: `${s.category}${s.protectionLevel ? ' · ' + s.protectionLevel : ''}`,
          type: '物种',
          path: `/species/${s.id}`,
          matchReason: s.latinName,
        });
      }
    });

    // Search knowledge cards
    knowledgeCards.forEach((c) => {
      if (
        c.title.includes(q) ||
        c.summary.includes(q) ||
        c.detail.includes(q) ||
        c.tags.some((t) => t.includes(q))
      ) {
        results.push({
          id: `card-${c.id}`,
          title: c.title,
          subtitle: c.summary.slice(0, 40) + '...',
          type: '知识卡片',
          path: c.storyId ? `/stories/${c.storyId}` : '/cards',
          matchReason: c.type,
        });
      }
    });

    // Search stories
    stories.forEach((s) => {
      if (
        s.title.includes(q) ||
        s.excerpt.includes(q) ||
        s.content.includes(q) ||
        s.category.includes(q)
      ) {
        results.push({
          id: `story-${s.id}`,
          title: s.title,
          subtitle: s.excerpt,
          type: '故事',
          path: `/stories/${s.id}`,
          matchReason: s.category,
        });
      }
    });

    return results;
  };

  const results = getResults();

  const typeIcon = (type: string) => {
    switch (type) {
      case '展厅':
        return <Compass size={14} className="text-[#3A6B5F]" />;
      case '物种':
        return <Fish size={14} className="text-[#8CAEB5]" />;
      case '知识卡片':
        return <Database size={14} className="text-[#C4A76C]" />;
      case '故事':
        return <BookOpen size={14} className="text-[#A67B5B]" />;
      default:
        return null;
    }
  };

  const typeColor = (type: string) => {
    switch (type) {
      case '展厅':
        return 'bg-[#3A6B5F15] text-[#3A6B5F]';
      case '物种':
        return 'bg-[#8CAEB515] text-[#5A8A95]';
      case '知识卡片':
        return 'bg-[#C4A76C15] text-[#A67B5B]';
      case '故事':
        return 'bg-[#A67B5B15] text-[#8B6548]';
      default:
        return 'bg-[#E8E4DE] text-deep-marsh/60';
    }
  };

  const suggestions = [
    '中华鲟', '丹顶鹤', '红树林', 'POD模式',
    '三基鱼塘', '麋鹿', '儒艮', '32.5米巨幕',
  ];

  return (
    <Layout title="搜索" showBack showAssistant={false}>
      <div className="px-5 py-4">
        {/* Search Input */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-marsh/30"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索展厅、动植物、知识点..."
            className="w-full h-12 pl-11 pr-10 rounded-xl bg-[#E8E4DE] text-[15px] text-deep-marsh placeholder:text-deep-marsh/30 outline-none focus:ring-2 focus:ring-[#3A6B5F40]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-deep-marsh/10 flex items-center justify-center"
            >
              <X size={14} className="text-deep-marsh/40" />
            </button>
          )}
        </div>

        {/* Suggestions */}
        {!query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-[12px] text-deep-marsh/30 mb-2">热门搜索</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-2 rounded-full bg-white shadow-card text-[13px] text-deep-marsh/70"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '展厅', count: halls.length, icon: Compass, color: 'text-[#3A6B5F]' },
                { label: '物种', count: speciesList.length, icon: Fish, color: 'text-[#8CAEB5]' },
                { label: '知识点', count: knowledgeCards.length, icon: Database, color: 'text-[#C4A76C]' },
                { label: '故事', count: stories.length, icon: BookOpen, color: 'text-[#A67B5B]' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-xl p-3 shadow-card text-center"
                >
                  <item.icon size={18} className={`mx-auto mb-1 ${item.color}`} />
                  <p className="text-[18px] font-bold text-deep-marsh">{item.count}</p>
                  <p className="text-[11px] text-deep-marsh/40">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-[12px] text-deep-marsh/30 mb-3">
                找到 {results.length} 条结果
              </p>
              <div className="flex flex-col gap-2">
                {results.map((result) => (
                  <motion.button
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate(result.path)}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-card text-left"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColor(
                        result.type
                      )}`}
                    >
                      {typeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-[14px] font-medium text-deep-marsh truncate">
                          {result.title}
                        </h4>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${typeColor(
                            result.type
                          )}`}
                        >
                          {result.type}
                        </span>
                      </div>
                      <p className="text-[12px] text-deep-marsh/50 truncate">
                        {result.subtitle}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {results.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-deep-marsh/40 text-[15px]">
                    未找到"{query}"相关的内容
                  </p>
                  <p className="text-deep-marsh/30 text-[13px] mt-1">
                    试试其他关键词
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
