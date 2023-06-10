import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { gettingOneBooksData } from "@store/slices/requests/gettingOneBookInfoRequest";
import { useParams } from "react-router-dom";
import Head from "@components/header/header";
import style from "./info.module.css";

type IParams = {
  id: string;
};
function Info() {
  const { id } = useParams<IParams>();
  const dispatch = useAppDispatch();
  const info = useAppSelector((state) => state.oneInfo.single);
  useEffect(() => {
    if (id) {
      dispatch(gettingOneBooksData(id));
    }
  }, [id]);

  return (
    <>
      <Head />
      <div className={style.parent}>
        <div className={style.imgParent}>
          <img className={style.image} src={info?.image} alt="img" />
        </div>
        <div className={style.infoParent}>
          <h1 className={style.title}>{info?.title}</h1>
          <div className={style.counts}>
            {/* < className={style.price}> */}
            {info && +info.discount > 0 ? (
              <>
                <s>{info?.price}$</s>{" "}
                <span className={style.infoPrice}>{info ? +info.price * (1 - +info.discount / 100) : 0}$</span>
              </>
            ) : (
              <p>{info?.price}$</p>
            )}
          </div>
          <h5 className={style.desc}>Description</h5>
          <div className={style.bodyParent}>
            <h3>{info?.body}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
