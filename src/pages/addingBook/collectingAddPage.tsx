import React from "react";
import AddHead from "@components/addBookHeader/headerAdd";
import AddingBookValidationSchema from "./addingLogic";

function AddPage() {
  return (
    <div>
      <AddHead />
      <AddingBookValidationSchema />
    </div>
  );
}

export default AddPage;
