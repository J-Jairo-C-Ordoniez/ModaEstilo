import { ChevronDown } from 'lucide-react';

export function FilterBar() {
  return (
    <div className="w-full flex flex-col mb-12">
      {/* Breadcrumb */}
      <div className="text-[10px] font-bold tracking-widest text-[#999999] mb-8 pb-4 border-b border-gray-100 flex items-center justify-between uppercase">
        <div className="flex gap-2">
          <span>PÁGINA DE INICIO</span>
          <span>|</span>
          <span className="text-black">HOMBRE</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between text-xs font-bold tracking-widest">
        {/* Left Filter */}
        <button className="flex items-center gap-2 group hover:text-black transition-colors uppercase">
          COLOR
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
        </button>

        {/* Right Filter */}
        <button className="flex items-center gap-2 group hover:text-black transition-colors uppercase">
          CLASIFICAR POR: TODO
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
        </button>
      </div>
    </div>
  );
}
