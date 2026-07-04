export default function SearchBar() {
  return (
    <div className="relative flex-1 max-w-md mx-4">
      <input
        type="text"
        placeholder="Search for dishes, groceries..."
        className="w-full px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-food-primary text-sm"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </span>
    </div>
  );
}