"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import selectionData from "@/data/selection.json";
import { useFormContext } from "@/context/formContext";
import { useFormSelections } from "@/hooks/form";

const initialFormData = (formFields) =>
  formFields.reduce((acc, field) => {
    acc[field.id] = field.defaultValue ?? "";
    return acc;
  }, {});

export default function FormPage({ setShowForm }) {
  const { selectedComponent, selectedEquipment } = useFormContext();
  const { getFormFields } = useFormSelections();
  const formFields = getFormFields();
  const [formData, setFormData] = useState(initialFormData(formFields));

  const handleChange = useCallback((id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);

  const handleSubmit = () => {
    alert("Form Submitted! Check console for data.");
  };

  const handleBack = () => {
    setShowForm(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      {/* Form Content */}
      <div className="w-full space-y-8 p-4">
        {/* Back Button */}
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
                    ?.name || selectedEquipment.replace("-", " ")}
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
        <div className="grid grid-cols-2 gap-4">
          {formFields.map((field) => (
            <div className="space-y-2" key={field.id}>
              <Label
                htmlFor={field.id}
                className="text-md font-semibold text-gray-700"
              >
                {field.label}
              </Label>
              {field.type === "dropdown" ? (
                <Select
                  onValueChange={(value) => handleChange(field.id, value)}
                  value={String(
                    formData[field.id] ||
                      (field.options && field.options.length > 0
                        ? field.options[0].value
                        : "")
                  )}
                >
                  <SelectTrigger className="h-10 border-2 border-gray-200 focus:border-blue-500 text-sm">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={String(formData[field.id])}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={String(formData[field.id])}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  min={field.min}
                  max={field.max}
                  minLength={field.minLength}
                  maxLength={field.maxLength}
                  className="h-10 border-2 border-gray-200 focus:border-blue-500 text-sm"
                />
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            onClick={handleSubmit}
            className="w-full h-16 text-xl font-semibold gradient-primary border-0 text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Submit Form
          </Button>
        </div>
      </div>
    </div>
  );
}
