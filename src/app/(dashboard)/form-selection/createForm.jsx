"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import selectionData from "@/data/selection.json";
import { useFormContext } from "@/context/formContext";
import { formFields } from "@/data/field";
import FormPreview from "./formPreview";

// For the form builder: fields to create a new form field
const builderFieldsBase = [
  {
    id: "id",
    label: "Field ID",
    type: "text",
    required: true,
    placeholder: "Enter field id (e.g. first_name)",
  },
  {
    id: "label",
    label: "Label",
    type: "text",
    required: true,
    placeholder: "Enter field label",
  },
  {
    id: "type",
    label: "Type",
    type: "dropdown",
    required: true,
    options: [
      { label: "Text", value: "text" },
      { label: "Number", value: "number" },
      { label: "Textarea", value: "textarea" },
      { label: "Dropdown", value: "dropdown" },
      { label: "Email", value: "email" },
      { label: "Password", value: "password" },
      { label: "Date", value: "date" },
      { label: "File", value: "file" },
    ],
    placeholder: "Select field type",
  },
  {
    id: "required",
    label: "Required",
    type: "checkbox",
    required: false,
    placeholder: "",
  },
];

const builderFieldsByType = {
  text: [
    {
      id: "placeholder",
      label: "Placeholder",
      type: "text",
      required: false,
      placeholder: "Enter placeholder text",
    },
    {
      id: "minLength",
      label: "Min Length",
      type: "number",
      required: false,
      placeholder: "Minimum length",
    },
    {
      id: "maxLength",
      label: "Max Length",
      type: "number",
      required: false,
      placeholder: "Maximum length",
    },
  ],
  email: [
    {
      id: "placeholder",
      label: "Placeholder",
      type: "text",
      required: false,
      placeholder: "Enter email placeholder",
    },
  ],
  password: [
    {
      id: "placeholder",
      label: "Placeholder",
      type: "text",
      required: false,
      placeholder: "Enter password placeholder",
    },
    {
      id: "minLength",
      label: "Min Length",
      type: "number",
      required: false,
      placeholder: "Minimum length",
    },
  ],
  number: [
    {
      id: "placeholder",
      label: "Placeholder",
      type: "text",
      required: false,
      placeholder: "Enter number placeholder",
    },
    {
      id: "min",
      label: "Min",
      type: "number",
      required: false,
      placeholder: "Minimum value",
    },
    {
      id: "max",
      label: "Max",
      type: "number",
      required: false,
      placeholder: "Maximum value",
    },
  ],
  textarea: [
    {
      id: "placeholder",
      label: "Placeholder",
      type: "text",
      required: false,
      placeholder: "Enter textarea placeholder",
    },
    {
      id: "maxLength",
      label: "Max Length",
      type: "number",
      required: false,
      placeholder: "Maximum length",
    },
  ],
  dropdown: [
    {
      id: "options",
      label: "Options (comma separated value:label)",
      type: "text",
      required: true,
      placeholder: "india:India,usa:USA,germany:Germany",
    },
  ],
  date: [],
};

const getInitialBuilderData = () => {
  const base = builderFieldsBase.reduce((acc, field) => {
    acc[field.id] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
  return base;
};

const initialBuilderData = getInitialBuilderData();

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
      fieldToAdd.options = builderData.options
        .split(",")
        .map((opt) => {
          const [value, label] = opt.split(":");
          return { value: value?.trim(), label: (label || value)?.trim() };
        })
        .filter((opt) => opt.value);
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
        <div className="flex justify-between items-start pt-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="h-12 text-sm font-semibold border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Selection
          </Button>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-4">
              <h6 className="font-semibold text-blue-900">Your Selections:</h6>
              <div className="text-sm text-blue-700">
                <span className="font-medium capitalize">
                  {selectionData.find((item) => item.id === selectedEquipment)
                    ?.name || selectedEquipment?.replace("-", " ")}
                </span>
                <span className="mx-2">|</span>
                <span className="font-medium capitalize">
                  {selectionData
                    .find((item) => item.id === selectedEquipment)
                    ?.components.find(
                      (component) => component.id === selectedComponent
                    )?.name || selectedComponent}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Preview of created fields (Form Preview) */}
        {fields.length > 0 && (
          <div className="pt-6 w-full">
            <h4 className="font-bold mb-2">Form Preview:</h4>
            <FormPreview formFields={fields} />
          </div>
        )}
            
        

        {/* Form Builder Fields */}
        <div className="grid grid-cols-2 gap-4">
          {builderFieldsBase.map((field) => (
            <div className="space-y-2" key={field.id}>
              <Label
                htmlFor={field.id}
                className="text-md font-semibold text-gray-700"
              >
                {field.label}
              </Label>
              {field.type === "checkbox" ? (
                <input
                  id={field.id}
                  type="checkbox"
                  checked={builderData[field.id]}
                  onChange={() =>
                    handleBuilderChange(field.id, null, "checkbox")
                  }
                  className="h-5 w-5 border-2 border-gray-200 focus:border-blue-500"
                />
              ) : field.type === "dropdown" ? (
                <select
                  id={field.id}
                  value={builderData[field.id]}
                  onChange={(e) =>
                    handleBuilderChange(field.id, e.target.value, "dropdown")
                  }
                  required={field.required}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 text-sm rounded w-full px-2"
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={builderData[field.id]}
                  onChange={(e) =>
                    handleBuilderChange(field.id, e.target.value, field.type)
                  }
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 text-sm"
                />
              )}
            </div>
          ))}

          {/* Show additional fields based on type */}
          {builderData.type &&
            builderFieldsByType[builderData.type]?.map((field) => (
              <div className="space-y-2" key={field.id}>
                <Label htmlFor={field.id} className="text-md font-semibold text-gray-700">
                  {field.label}
                </Label>
                {builderData.type === "dropdown" && field.id === "options" ? (
                  <>
                    {/* For dropdown, show multiple value/label pairs */}
                    {(builderData.optionsArr || [""]).map((opt, idx) => (
                      <div className="flex gap-2 mb-2" key={idx}>
                        <Input
                          type="text"
                          value={opt.value || ""}
                          placeholder="Value"
                          onChange={e => {
                            const arr = builderData.optionsArr ? [...builderData.optionsArr] : [""];
                            arr[idx] = { ...arr[idx], value: e.target.value };
                            setBuilderData(prev => ({ ...prev, optionsArr: arr, options: arr.map(o => `${o.value}:${o.label}`).join(",") }));
                          }}
                          className="w-1/2 h-10 border-2 border-gray-200 text-sm"
                        />
                        <Input
                          type="text"
                          value={opt.label || ""}
                          placeholder="Label"
                          onChange={e => {
                            const arr = builderData.optionsArr ? [...builderData.optionsArr] : [""];
                            arr[idx] = { ...arr[idx], label: e.target.value };
                            setBuilderData(prev => ({ ...prev, optionsArr: arr, options: arr.map(o => `${o.value}:${o.label}`).join(",") }));
                          }}
                          className="w-1/2 h-10 border-2 border-gray-200 text-sm"
                        />
                        <Button
                          type="button"
                          className="h-8 px-2 text-xs bg-red-100 text-red-700 border border-red-200 rounded"
                          onClick={() => {
                            const arr = builderData.optionsArr ? [...builderData.optionsArr] : [];
                            arr.splice(idx, 1);
                            setBuilderData(prev => ({ ...prev, optionsArr: arr, options: arr.map(o => `${o.value}:${o.label}`).join(",") }));
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      className="h-8 px-2 text-xs bg-blue-100 text-blue-700 border border-blue-200 rounded"
                      onClick={() => {
                        const arr = builderData.optionsArr ? [...builderData.optionsArr] : [];
                        arr.push({ value: "", label: "" });
                        setBuilderData(prev => ({ ...prev, optionsArr: arr, options: arr.map(o => `${o.value}:${o.label}`).join(",") }));
                      }}
                    >
                      + Add Option
                    </Button>
                  </>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={builderData[field.id] || ""}
                    onChange={e => handleBuilderChange(field.id, e.target.value, field.type)}
                    className="h-10 border-2 border-gray-200 focus:border-blue-500 text-sm"
                  />
                )}
              </div>
            ))}
        </div>
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
