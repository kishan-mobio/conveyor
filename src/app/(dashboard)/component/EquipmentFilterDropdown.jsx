"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function EquipmentFilterDropdown({
  equipmentList,
  selectedEquipment,
  onEquipmentChange,
}) {
  console.log(selectedEquipment)
  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="equipment-filter" className="text-sm font-medium whitespace-nowrap">
        Filter by Equipment:
      </Label>
      <Select
        value={selectedEquipment}
        onValueChange={onEquipmentChange}
      >
        <SelectTrigger className="w-[250px]" id="equipment-filter">
          <SelectValue placeholder="All Equipment" />
        </SelectTrigger>
        <SelectContent>
          {equipmentList.map((equipment) => (
            <SelectItem key={equipment.id} value={equipment.id.toString()}>
              {equipment.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
