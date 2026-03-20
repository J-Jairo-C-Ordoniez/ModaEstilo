import Link from 'next/link';

export function Pagination() {
  return (
    <div className="w-full flex justify-center items-center gap-4 mt-24 mb-10 text-xs font-bold tracking-widest text-gray-500 uppercase">
      {/* Active Page */}
      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer">
        1
      </span>
      {/* Inactive Pages */}
      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-400 transition-colors cursor-pointer">
        2
      </span>
      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-400 transition-colors cursor-pointer">
        3
      </span>
      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white hover:bg-gray-400 transition-colors cursor-pointer">
        4
      </span>
      
      {/* Next Text */}
      <Link href="#" className="ml-4 hover:text-black transition-colors flex items-center gap-1">
        SIGUIENTE <span className="text-[10px] sm:text-xs">&gt;</span>
      </Link>
    </div>
  );
}
