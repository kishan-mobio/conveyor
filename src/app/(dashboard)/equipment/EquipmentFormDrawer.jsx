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

export default function EquipmentFormDrawer({
  open,
  onClose,
  mode, // "add" or "edit"
  initialData,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    components: [""],
  });

  // Reset form when drawer opens/closes or mode changes
  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setFormData({
          name: initialData.name || "",
          components:
            initialData.components?.length > 0
              ? [...initialData.components]
              : [""],
        });
      } else {
        setFormData({
          name: "",
          components: [""],
        });
      }
    }
  }, [open, mode, initialData]);

  const handleNameChange = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleComponentChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      components: prev.components.map((comp, i) =>
        i === index ? value : comp
      ),
    }));
  };

  const addComponent = () => {
    setFormData((prev) => ({
      ...prev,
      components: [...prev.components, ""],
    }));
  };

  const removeComponent = (index) => {
    if (formData.components.length > 1) {
      setFormData((prev) => ({
        ...prev,
        components: prev.components.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name.trim()) {
      alert("Equipment name is required");
      return;
    }

    const validComponents = formData.components.filter(
      (comp) => comp.trim() !== ""
    );
    if (validComponents.length === 0) {
      alert("At least one component is required");
      return;
    }

    // Submit the form
    onSubmit({
      name: formData.name.trim(),
      components: validComponents,
    });
  };

  const isFormValid =
    formData.name.trim() && formData.components.some((comp) => comp.trim());

  return (
    <SideDrawer open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>
            {mode === "add" ? "Add New Equipment" : "Edit Equipment"}
          </SheetTitle>
          <SheetDescription>
            {mode === "add"
              ? "Enter the details for the new equipment."
              : "Update the equipment details below."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 py-6">
          {/* Equipment Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Equipment Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="Enter equipment name"
              required
            />
          </div>

          {/* Components */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Components</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addComponent}
                className="h-8 px-2"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.components.map((component, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={component}
                    onChange={(e) =>
                      handleComponentChange(index, e.target.value)
                    }
                    placeholder={`Component ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.components.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeComponent(index)}
                      className="h-9 w-9 p-0 text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="flex gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isFormValid}>
            {mode === "add" ? "Add Equipment" : "Update Equipment"}
          </Button>
        </SheetFooter>
      </form>
    </SideDrawer>
  );
}
