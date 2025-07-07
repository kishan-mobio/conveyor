"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const initialFormData = (formFields) =>
  formFields.reduce((acc, field) => {
    acc[field.id] = field.defaultValue ?? "";
    return acc;
  }, {});

export default function FormPreview({ formFields }) {
  const [formData, setFormData] = useState(initialFormData(formFields));

  const handleChange = useCallback((id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded border border-gray-200">
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
                  <SelectItem key={option.value} value={String(option.value)}>
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
  );
}
