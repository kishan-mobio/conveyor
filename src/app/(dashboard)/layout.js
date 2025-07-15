import { Sidebar } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-10 ml-64">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
