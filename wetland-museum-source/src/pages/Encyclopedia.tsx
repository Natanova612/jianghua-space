import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, ShieldAlert, Filter } from 'lucide-react';
import Layout from '../components/Layout';
import { speciesList, categories } from '../data/species';

const protectionFilters = ['全部', '国家一级', '国家二级', '无'] as const;

export default function Encyclopedia() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [activeProtection, setActiveProtection] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = speciesList.filter((s) => {
    const matchCategory = activeCategory === '全部' || s.category === activeCategory;
    const matchProtection = activeProtection === '全部' || (activeProtection === '无' ? s.protectionLevel === '' : s.protectionLevel === activeProtection);
    const matchSearch =
      !searchQuery ||
      s.name.includes(searchQuery) ||
      s.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.includes(searchQuery);
    return matchCategory && matchProtection && matchSearch;
  });

  const categoryColor = (cat: string) => {
    const map: Record<string, string> = {
      '哺乳类': 'bg-[#C4A76C20] text-[#A67B5B]',
      '鸟类': 'bg-[#8CAEB520] text-[#5A8A95]',
      '爬行类': 'bg-[#6B8F7120] text-[#4A7A52]',
      '鱼类': 'bg-[#3A6B5F20] text-[#3A6B5F]',
      '植物': 'bg-[#A67B5B20] text-[#8B6548]',
      '生态系统': 'bg-[#D4785C20] text-[#B85E44]',
    };
    return map[cat] || 'bg-[#E8E4DE] text-deep-marsh/60';
  };

  return (
    <Layout title="动植物百科">
      <div className="px-5 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-marsh/30"
          />
          <input
            type="text"
            placeholder="搜索物种名称、拉丁学名..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-full bg-[#E8E4DE] text-[14px] text-deep-marsh placeholder:text-deep-marsh/30 outline-none focus:ring-2 focus:ring-[#3A6B5F40]"
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Filter size={14} className="text-deep-marsh/40" />
            <span className="text-[12px] text-deep-marsh/40">分类</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[13px] transition-all ${
                  activeCategory === cat
                    ? 'bg-[#3A6B5F] text-white'
                    : 'bg-[#E8E4DE] text-deep-marsh/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Protection Tabs */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Shield size={14} className="text-deep-marsh/40" />
            <span className="text-[12px] text-deep-marsh/40">保护级别</span>
          </div>
          <div className="flex gap-1.5">
            {protectionFilters.map((p) => (
              <button
                key={p}
                onClick={() => setActiveProtection(p)}
                className={`px-3 py-1.5 rounded-full text-[13px] transition-all ${
                  activeProtection === p
                    ? 'bg-[#D4785C] text-white'
                    : 'bg-[#E8E4DE] text-deep-marsh/60'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-[12px] text-deep-marsh/40 mb-3">
          共 {filtered.length} 个物种
        </p>

        {/* Species Grid */}
        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((species) => (
              <motion.button
                key={species.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/species/${species.id}`)}
                className="bg-white rounded-xl shadow-card overflow-hidden text-left"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={species.image}
                    alt={species.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${categoryColor(
                        species.category
                      )}`}
                    >
                      {species.category}
                    </span>
                  </div>
                  {/* Protection badge */}
                  {species.protectionLevel && (
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4785C] text-white flex items-center gap-0.5">
                        <ShieldAlert size={10} />
                        {species.protectionLevel}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="text-[15px] font-bold text-deep-marsh">
                    {species.name}
                  </h4>
                  <p className="text-[11px] text-deep-marsh/40 italic">
                    {species.latinName}
                  </p>
                  <p className="text-[12px] text-deep-marsh/60 mt-1 line-clamp-2">
                    {species.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-deep-marsh/40 text-[15px]">未找到匹配的物种</p>
            <button
              onClick={() => {
                setActiveCategory('全部');
                setActiveProtection('全部');
                setSearchQuery('');
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
