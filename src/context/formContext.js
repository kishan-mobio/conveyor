import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  return (
    <FormContext.Provider
      value={{
        selectedEquipment,
        setSelectedEquipment,
        selectedComponent,
        setSelectedComponent,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
