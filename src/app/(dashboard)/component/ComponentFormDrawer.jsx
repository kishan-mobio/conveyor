"use client";

import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SideDrawer from "@/components/common/SideDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { units, entryTypes } from "@/data/components";

export default function ComponentFormDrawer({
  open,
  onClose,
  mode, // "add" or "edit"
  initialData,
  equipmentList,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    inputs: [""],
    entryType: "",
    remarks: "",
    equipmentId: "",
  });
  console.log(formData.unit)
  // Reset form when drawer opens/closes or mode changes
  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setFormData({
          name: initialData.name || "",
          unit: initialData.unit || "",
          inputs: initialData.inputs?.length > 0 ? [...initialData.inputs] : [""],
          entryType: initialData.entryType || "",
          remarks: initialData.remarks || "",
          equipmentId: initialData.equipmentId?.toString() || "",
        });
      } else {
        setFormData({
          name: "",
          unit: "",
          inputs: [""],
          entryType: "",
          remarks: "",
          equipmentId: "",
        });
      }
    }
  }, [open, mode, initialData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputsChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      inputs: prev.inputs.map((input, i) => i === index ? value : input)
    }));
  };

  const addInput = () => {
    setFormData(prev => ({
      ...prev,
      inputs: [...prev.inputs, ""]
    }));
  };

  const removeInput = (index) => {
    if (formData.inputs.length > 1) {
      setFormData(prev => ({
        ...prev,
        inputs: prev.inputs.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      alert("Component name is required");
      return;
    }

    if (!formData.unit) {
      alert("Unit is required");
      return;
    }

    if (!formData.entryType) {
      alert("Entry type is required");
      return;
    }

    if (!formData.equipmentId) {
      alert("Equipment selection is required");
      return;
    }

    const validInputs = formData.inputs.filter(input => input.trim() !== "");
    if (validInputs.length === 0) {
      alert("At least one input is required");
      return;
    }

    // Submit the form
    onSubmit({
      name: formData.name.trim(),
      unit: formData.unit,
      inputs: validInputs,
      entryType: formData.entryType,
      remarks: formData.remarks.trim(),
      equipmentId: parseInt(formData.equipmentId),
    });
  };

  const isFormValid = formData.name.trim() && 
                     formData.unit && 
                     formData.entryType && 
                     formData.equipmentId &&
                     formData.inputs.some(input => input.trim());

  return (
    <SideDrawer open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>
            {mode === "add" ? "Add New Component" : "Edit Component"}
          </SheetTitle>
          <SheetDescription>
            {mode === "add"
              ? "Enter the details for the new component."
              : "Update the component details below."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 py-6">
          {/* Component Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Component Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter component name"
              required
            />
          </div>

          {/* Equipment Selection */}
          <div className="space-y-2">
            <Label htmlFor="equipment">Equipment</Label>
            <Select
              value={formData.equipmentId}
              onValueChange={(value) => handleInputChange("equipmentId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select equipment" />
              </SelectTrigger>
              <SelectContent>
                {equipmentList.map((equipment) => (
                  <SelectItem key={equipment.id} value={equipment.id.toString()}>
                    {equipment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Unit */}
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select
              value={formData.unit}
              onValueChange={(value) => handleInputChange("unit", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Entry Type */}
          <div className="space-y-2">
            <Label htmlFor="entryType">Entry Type</Label>
            <Select
              value={formData.entryType}
              onValueChange={(value) => handleInputChange("entryType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select entry type" />
              </SelectTrigger>
              <SelectContent>
                {entryTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Inputs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Inputs</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addInput}
                className="h-8 px-2"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.inputs.map((input, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => handleInputsChange(index, e.target.value)}
                    placeholder={`Input ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.inputs.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeInput(index)}
                      className="h-9 w-9 p-0 text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
              placeholder="Enter any additional remarks"
              rows={3}
            />
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isFormValid}>
            {mode === "add" ? "Add Component" : "Update Component"}
          </Button>
        </SheetFooter>
      </form>
    </SideDrawer>
  );
}
