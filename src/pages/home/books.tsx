import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { DeletBook, gettingBooksData, changeDeleteState } from "@store/index";
import ClearIcon from "@mui/icons-material/Clear";
import CreateIcon from "@mui/icons-material/Create";
import style from "./home.module.css";
import { useNavigate } from "react-router-dom";
function GettingBook() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const books = useAppSelector((state) => state.gettingData);
  const deleteingSucces = useAppSelector(
    (state) => state.deletingData.isSuccess
  );

  useEffect(() => {
    dispatch(gettingBooksData());
  }, []);

  useEffect(() => {
    if (deleteingSucces) {
      dispatch(gettingBooksData());
      dispatch(changeDeleteState());
    }
  }, [deleteingSucces]);

  return (
    <div className={style.parent}>
      {books.data?.map((item: any) => {
        return (
          <div key={item.id} className={style.children}>
            <div className={style.fixing}>
              <div className={style.priceBtns}>
                <span className={style.discount}>
                  {Number(item.discount) > 0 ? `${item.discount}%` : ""}
                </span>

                <div className={style.btnsParent}>
                  <button className={style.btns}>
                    <CreateIcon
                      onClick={() => navigate(`/editing/${item.id}`)}
                    />
                  </button>
                  <button
                    className={style.btns}
                    onClick={() => dispatch(DeletBook(item.id))}
                  >
                    <ClearIcon />
                  </button>
                </div>
              </div>
              <div className={style.picTitleParent}>
                <img className={style.image} src={item.image} alt="img" />
                <div className={style.titleParent}>
                  <button
                    className={style.title}
                    onClick={() => navigate(`/info/${item.id}`)}
                  >
                    {item.title}
                  </button>
                  <div className={style.pricesParent}>
                    {+item.discount > 0 ? (
                      <>
                        <s className={style.price}>{item.price} $</s>
                        <p className={style.priceDiscount}>
                          {+item.price * (1 - +item.discount / 100)} $
                        </p>
                      </>
                    ) : (
                      <p className={style.price}>{item.price} $</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GettingBook;
