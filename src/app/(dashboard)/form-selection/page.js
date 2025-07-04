"use client";

import { useState } from "react";
import { useFormSelections } from "@/hooks/form";
import Selection from "./selection";
import FormPage from "./form";

export default function FormSelectionPage() {
  const [showForm, setShowForm] = useState(false);
  const {
    selectedEquipment,
    selectedComponent,
    setSelectedEquipment,
    setSelectedComponent,
    getComponents,
    getEquipments,
  } = useFormSelections();

  return (
    <div className="w-full h-screen">
      {showForm ? (
        <FormPage
          setShowForm={setShowForm}
          selectedEquipment={selectedEquipment}
          selectedComponent={selectedComponent}
        />
      ) : (
        <Selection
          setShowForm={setShowForm}
          selectedEquipment={selectedEquipment}
          selectedComponent={selectedComponent}
          setSelectedEquipment={setSelectedEquipment}
          setSelectedComponent={setSelectedComponent}
          getComponents={getComponents}
          getEquipments={getEquipments}
        />
      )}
    </div>
  );
}
