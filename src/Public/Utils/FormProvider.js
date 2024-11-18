import React from "react";
import { FormProvider } from "react-hook-form";

export default function FormProviderJs({ handleSubmit, methods, children }) {
  return (
    <FormProvider {...methods}>
      <form method="POST" onSubmit={handleSubmit}>
        {children}
      </form>
    </FormProvider>
  );
}
