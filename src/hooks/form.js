import { useState } from "react";
import selectionData from "@/data/selection.json";

export function useFormSelections() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const getEquipmentss = () => {
    return selectionData;
  };

  const getComponentss = () => {
    const selectedEquipmentObj = selectionData.find(
      (item) => item.id === selectedEquipment
    );
    return selectedEquipmentObj?.components || [];
  };

  return {
    selectedEquipment,
    setSelectedEquipment,
    selectedComponent,
    setSelectedComponent,
    getEquipments: getEquipmentss,
    getComponents: getComponentss,
  };
}
