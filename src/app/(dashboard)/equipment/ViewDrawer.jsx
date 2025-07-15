"use client";

import {
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import SideDrawer from "@/components/common/SideDrawer";
import { Badge } from "@/components/ui/badge";

export default function ViewDrawer({ open, onClose, data }) {
  if (!data) return null;

  return (
    <SideDrawer open={open} onClose={onClose}>
      <SheetHeader>
        <SheetTitle className="text-2xl font-bold text-gray-900 mb-1">
          Equipment Details
        </SheetTitle>
        <SheetDescription className="text-base text-gray-500 mb-4">
          View the complete information for this equipment.
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-8 sm:px-0">
        {/* Equipment Name */}
        <div className="space-y-1 pb-2 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 tracking-wide">
            Equipment Name
          </h3>
          <p className="text-xl font-bold text-gray-900 mt-1">{data.name}</p>
        </div>

        {/* Components */}
        <div className="space-y-2 pb-2 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 tracking-wide">
            Components
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.components?.map((component, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm bg-gray-200 text-gray-800 border border-gray-300 shadow-sm"
              >
                {component}
              </Badge>
            ))}
          </div>
          {(!data.components || data.components.length === 0) && (
            <p className="text-sm text-gray-400 italic mt-2">
              No components listed
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 tracking-wide">
            Summary
          </h3>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Components:</span>
              <span className="font-semibold text-blue-700">
                {data.components?.length || 0}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Equipment ID:</span>
              <span className="font-semibold text-blue-700">#{data.id}</span>
            </div>
          </div>
        </div>
      </div>
    </SideDrawer>
  );
}
