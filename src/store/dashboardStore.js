import { create } from 'zustand';

const useDashboardStore = create((set) => ({
  stats: null,
  isLoading: true,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/dashboard/stats');
      const json = await response.json();

      if (json.success) {
        set({ stats: json.data, isLoading: false });
      } else {
        set({ error: json.error, isLoading: false });
      }
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));

export default useDashboardStore;
