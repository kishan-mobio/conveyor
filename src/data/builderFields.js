// builderFields.js

export const builderFieldsBase = [
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

export const builderFieldsByType = {
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
