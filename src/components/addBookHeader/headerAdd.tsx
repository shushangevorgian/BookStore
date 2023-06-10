import React from "react";
import style from "./header.module.css";

function AddHead() {
  return (
    <div className={style.parent}>
      <h1 className={style.title}>ADD BOOKS</h1>
    </div>
  );
}

export default AddHead;
