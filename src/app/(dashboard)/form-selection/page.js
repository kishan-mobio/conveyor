"use client";

import { useState } from "react";
import { FormProvider } from "@/context/formContext";
import Selection from "./selection";
import CreateForm from "./CreateForm";

const FormSelectionPageContent = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <FormProvider>
      <div className="w-full h-screen">
        {showForm ? (
          <CreateForm setShowForm={setShowForm} />
        ) : (
          <Selection setShowForm={setShowForm} />
        )}
      </div>
    </FormProvider>
  );
};

export default FormSelectionPageContent;
