
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EquipmentHeader({ onAdd }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipment</h1>
          <p className="text-gray-600">Manage and monitor equipment inventory</p>
        </div>
      </div>
      <Button onClick={onAdd} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Equipment
      </Button>
    </div>
  );
}
