"use client";

import { useState } from "react";
import { FormProvider } from "@/context/formContext";
import Selection from "./selection";
import FormPage from "./form";
import CreateForm from "./createForm";

const FormSelectionPageContent = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <FormProvider>
      <div className="w-full h-screen">
        {true ? (
          <CreateForm setShowForm={setShowForm} />
        ) : (
          <Selection setShowForm={setShowForm} />
        )}
      </div>
    </FormProvider>
  );
};

export default FormSelectionPageContent;
