// initialBuilderData.js
import { builderFieldsBase } from "@/data/builderFields";

export const getInitialBuilderData = () => {
  const base = builderFieldsBase.reduce((acc, field) => {
    acc[field.id] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
  return base;
};

export const initialBuilderData = getInitialBuilderData();

// dropdownHelpers.js

// Helper to parse dropdown options from string to array
export function parseDropdownOptions(optionsString) {
  return optionsString
    .split(",")
    .map((opt) => {
      const [value, label] = opt.split(":");
      return { value: value?.trim(), label: (label || value)?.trim() };
    })
    .filter((opt) => opt.value);
}

export const initialFormData = (formFields) =>
  formFields.reduce((acc, field) => {
    acc[field.id] = field.defaultValue ?? "";
    return acc;
  }, {});