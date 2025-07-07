import { useState } from "react";
import selectionData from "@/data/selection.json";
import { formFields } from "@/data/field";

export function useFormSelections() {
  const getEquipments = () => {
    return selectionData;
  };

  const getComponents = (equipment) => {
    const selectedEquipmentObj = selectionData.find(
      (item) => item.id === equipment
    );
    return selectedEquipmentObj?.components || [];
  };

  const getFormFields = () => formFields;

  return {
    getEquipments,
    getComponents,
    getFormFields,
  };
}
