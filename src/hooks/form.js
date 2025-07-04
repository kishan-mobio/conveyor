import { useState } from "react";
import selectionData from "@/data/selection.json";

export function useFormSelections() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const getEquipment = () => {
    return selectionData;
  };

  const getComponent = () => {
    const selectedEquipmentObj = selectionData.find(
      (item) => item.id === selectedEquipment
    );
    return selectedEquipmentObj?.components || [];
  };

  console.log(selectedEquipment, selectedComponent);
  return {
    selectedEquipment,
    setSelectedEquipment,
    selectedComponent,
    setSelectedComponent,
    getEquipment,
    getComponent,
  };
}
