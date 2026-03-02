const categories = ['', 'عاجل', 'سياسي', 'عسكري', 'اقتصادي'];

export default function Filters({ filters, setFilters }) {
  return (
    <section className="filters">
      <input
        placeholder="بحث"
        value={filters.search}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
      />
      <select value={filters.category} onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}>
        {categories.map((cat) => (
          <option key={cat || 'all'} value={cat}>
            {cat || 'كل التصنيفات'}
          </option>
        ))}
      </select>
      <input
        placeholder="الدولة (مثال: Egypt)"
        value={filters.country}
        onChange={(e) => setFilters((prev) => ({ ...prev, country: e.target.value }))}
      />
    </section>
  );
}
