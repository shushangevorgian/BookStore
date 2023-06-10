import React from "react";
import { useAppSelector } from "@hooks/index";
import { useNavigate } from "react-router-dom";
import style from "./home.module.css";

function List(props: any) {
  const navigate = useNavigate();
  const books = useAppSelector((state) => state.gettingData);
  const filteredData = books.data?.filter((el: any) => {
    if (props.input === "") {
      return "";
    } else {
      return el.title.toLowerCase().includes(props.input);
    }
  });
  return (
    <ul className={style.btnsParentSearch}>
      {filteredData?.map((item: any) => (
        <button
          onClick={() => navigate(`/info/${item.id}`)}
          className={style.searchingBtn}
          key={item.id}
        >
          {item.title}
          <div className={style.border} />
        </button>
      ))}
    </ul>
  );
}

export default List;
