"use client";

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SideDrawer from "@/components/common/SideDrawer";
import { Badge } from "@/components/ui/badge";
import { getEntryTypeConfig, getUnitLabel } from "@/data/components";

export default function ComponentViewDrawer({
  open,
  onClose,
  data,
  equipmentList,
}) {
  if (!data) return null;

  const entryTypeConfig = getEntryTypeConfig(data.entryType);
  const equipment = equipmentList.find((eq) => eq.id === data.equipmentId);

  return (
    <SideDrawer open={open} onClose={onClose}>
      <SheetHeader>
        <SheetTitle>Component Details</SheetTitle>
        <SheetDescription>
          View the complete information for this component.
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-6 py-6">
        {/* Component Name */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Component Name</h3>
          <p className="text-lg font-semibold text-gray-800">{data.name}</p>
        </div>

        {/* Equipment */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Equipment</h3>
          <p className="text-base text-gray-700">
            {equipment ? equipment.name : "Unknown Equipment"}
          </p>
        </div>

        {/* Unit */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Unit</h3>
          <p className="text-base text-gray-700">{getUnitLabel(data.unit)}</p>
        </div>

        {/* Entry Type */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Entry Type</h3>
          <Badge
            className={`${entryTypeConfig.color} border`}
            variant="outline"
          >
            {entryTypeConfig.label}
          </Badge>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">Inputs</h3>
          <div className="flex flex-wrap gap-2">
            {data.inputs?.map((input, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm"
              >
                {input}
              </Badge>
            ))}
          </div>
          {(!data.inputs || data.inputs.length === 0) && (
            <p className="text-sm text-gray-500 italic">No inputs listed</p>
          )}
        </div>

        {/* Remarks */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Remarks</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              {data.remarks || "No remarks provided"}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Summary</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Component ID:</span>
              <span className="font-medium">#{data.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Inputs:</span>
              <span className="font-medium">{data.inputs?.length || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Entry Method:</span>
              <span className="font-medium">{entryTypeConfig.label}</span>
            </div>
          </div>
        </div>
      </div>
    </SideDrawer>
  );
}
