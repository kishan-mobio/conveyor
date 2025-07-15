"use client";

import { Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import EquipmentFilterDropdown from "./EquipmentFilterDropdown";

export default function ComponentHeader({
  onAdd,
  equipmentList,
  selectedEquipment,
  onEquipmentChange,
}) {
  return (
    <div className="space-y-4">
      {/* Header with title and add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Components</h1>
            <p className="text-gray-600">Manage and monitor component specifications</p>
          </div>
        </div>
        <Button onClick={onAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Component
        </Button>
      </div>

      {/* Equipment Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <EquipmentFilterDropdown
          equipmentList={equipmentList}
          selectedEquipment={selectedEquipment}
          onEquipmentChange={onEquipmentChange}
        />
      </div>
    </div>
  );
}
