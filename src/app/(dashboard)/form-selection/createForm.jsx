"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import FormHeader from "./FormHeader";
import { useFormContext } from "@/context/formContext";
import FormPreview from "./FormPreview";
import {
  initialBuilderData,
  parseDropdownOptions,
  getInitialBuilderData,
} from "@/utils/formMethods";
import FormBuilder from "./FormBuilder";

const CreateForm = ({ setShowForm }) => {
  const { selectedComponent, selectedEquipment } = useFormContext();
  const [fields, setFields] = useState([]); // List of created fields
  const [builderData, setBuilderData] = useState(initialBuilderData);

  const handleBuilderChange = useCallback((id, value, type) => {
    setBuilderData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? !prev[id] : value,
    }));
  }, []);

  const handleAddField = () => {
    if (!builderData.id || !builderData.label || !builderData.type) return;
    let fieldToAdd = { ...builderData };
    // Parse options for dropdown
    if (builderData.type === "dropdown" && builderData.options) {
      fieldToAdd.options = parseDropdownOptions(builderData.options);
    }
    setFields((prev) => [...prev, fieldToAdd]);
    setBuilderData(getInitialBuilderData());
  };

  const handleSubmit = () => {
    alert("Form Structure Created! Check console for fields array.");
    console.log(fields);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <div className="w-full space-y-8 p-4">
        <FormHeader
          handleBack={handleBack}
          selectedEquipment={selectedEquipment}
          selectedComponent={selectedComponent}
        />
        {/* Preview of created fields (Form Preview) */}
        {fields.length > 0 && (
          <div className="pt-6 w-full">
            <h4 className="font-bold mb-2">Form Preview:</h4>
            <FormPreview formFields={fields} />
          </div>
        )}

        {/* Form Builder Fields */}
        <FormBuilder
          builderData={builderData}
          setBuilderData={setBuilderData}
          handleBuilderChange={handleBuilderChange}
        />
        <div className="pt-2">
          <Button
            onClick={handleAddField}
            className="w-full h-12 text-lg font-semibold bg-green-600 border-0 text-white hover:opacity-90 transition-all duration-300 shadow hover:shadow-lg"
          >
            Add Field
          </Button>
        </div>

        {/* Preview of created fields */}
        {fields.length > 0 && (
          <div className="pt-6">
            <h4 className="font-bold mb-2">Response Preview:</h4>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto max-h-48">
              {JSON.stringify(fields, null, 2)}
            </pre>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            onClick={handleSubmit}
            className="w-full h-16 text-xl font-semibold gradient-primary border-0 text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Create Form Structure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
