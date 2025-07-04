import { Cpu } from "lucide-react";

export default function ComponentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
          <Cpu className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Component</h1>
          <p className="text-gray-600">Manage system components and parts</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Cpu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Component Management</h2>
          <p className="text-gray-600">
            This section will contain component management functionality.
          </p>
        </div>
      </div>
    </div>
  );
}
