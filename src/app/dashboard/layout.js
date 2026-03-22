import { Sidebar } from '../../components/dashboard/Sidebar';
import { Header } from '../../components/dashboard/Header';

export const metadata = {
  title: 'Dashboard | Moda y Estilo',
  description: 'Admin dashboard para gestionar la plataforma Web',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-scope min-h-screen flex text-(--dash-text) antialiased">
      <Header />
      <Sidebar />
      <main className="flex-1 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-20 pb-10 sm:ml-64 w-full min-h-screen"
            style={{ backgroundColor: 'var(--dash-bg)' }}>
        {children}
      </main>
    </div>
  );
}
