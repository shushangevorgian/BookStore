import React from "react";
import style from "./header.module.css";

function Head() {
  return (
    <div className={style.parent}>
      <div className={style.children}>
        <h1 className={style.title}>BOOK STORE</h1>
      </div>
    </div>
  );
}

export default Head;
