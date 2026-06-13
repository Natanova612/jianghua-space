import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onClick?: () => void;
  className?: string;
}

export default function SearchBar({
  placeholder = '搜索展厅、动植物、知识点...',
  onClick,
  className = '',
}: SearchBarProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center h-11 rounded-full bg-[#E8E4DE] px-4 cursor-pointer transition-all duration-200 ${className}`}
    >
      <Search size={18} className="text-[#2A3D3566] flex-shrink-0" />
      <span className="ml-2 text-[13px] text-[#2A3D3566] truncate">
        {placeholder}
      </span>
    </div>
  );
}
