//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { addingSchema } from "@utils/index";
import { IValidationSchemeValues } from "@models/index";
import { gettingBooksData } from "@store/index";
import style from "./update.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { TextField, Input } from "@mui/material";
import {
  changeUpdatingState,
  updateingBook,
} from "@store/slices/requests/updatinDataRequest";

const UpdateingBookInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const isSuccess = useAppSelector((state) => state.updatingData);
  const data = useAppSelector((state) => state.gettingData);
  const [bookData, setBookData] = useState();

  useEffect(() => {
    dispatch(
      gettingBooksData(() => {
        dispatch(gettingBooksData());
      })
    );
  }, []);
  useEffect(() => {
    if (data.data) {
      const book = data.data.find((el) => el.id === Number(params["id"]));
      setBookData(book);
      serFileUploaded(book.image);
    }
  }, [data]);
  const [fileUploaded, serFileUploaded] = useState<File | string | undefined>();

  const MuiTextField = ({ field, form, ...props }) => {
    return <TextField {...field} {...props} />;
  };
  const MuiInputField = ({ field, form, ...props }) => {
    return (
      <label>
        <span>REPLACE</span>
        <Input style={{ display: "none" }} {...field} {...props} value={""} />
      </label>
    );
  };

  return bookData ? (
    <div className={style.parentDiv}>
      <Formik
        validateOnMount={true}
        initialValues={{
          title: bookData.title,
          body: bookData.body,
          prices: bookData.price,
          discount: bookData.discount,
          image: bookData.image,
        }}
        validationSchema={addingSchema}
        onSubmit={(values: IValidationSchemeValues, { resetForm }) => {
          if (fileUploaded) {
            dispatch(
              updateingBook({
                ...values,
                fileUploaded,
                id: params["id"],
                callback: () => {
                  dispatch(gettingBooksData());
                  navigate("/");
                },
              })
            );
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className={style.form}>
            <div className={style.parent}>
              <div className={style.edit}>
                <div className={style.information}>
                  <div className={style.marginDiv} />

                  <Field
                    name="title"
                    type="text"
                    component={MuiTextField}
                    variant="outlined"
                    autoComplete="off"
                    label="Title *"
                    className={style.inputField}
                  />
                  {errors.title && touched.title ? (
                    <div className={style.error}>{errors.title}</div>
                  ) : null}
                  <div className={style.marginDiv} />
                  <Field
                    name="body"
                    type="text"
                    multiline
                    rows={10}
                    component={MuiTextField}
                    variant="outlined"
                    autoComplete="off"
                    label="Description *"
                    className={style.inputField}
                  />
                  {errors.body && touched.body ? (
                    <div className={style.error}>{errors.body}</div>
                  ) : null}
                  <div className={style.marginDiv} />

                  <div className={style.pricesDisCount}>
                    <Field
                      name="prices"
                      component={MuiTextField}
                      type="text"
                      variant="outlined"
                      autoComplete="off"
                      label="Price *"
                      className={style.inputFieldPrice}
                    />
                    {errors.prices && touched.prices ? (
                      <div className={style.error}>{errors.body}</div>
                    ) : null}
                    <Field
                      name="discount"
                      type="text"
                      component={MuiTextField}
                      variant="outlined"
                      autoComplete="off"
                      label="Discount *"
                      className={style.inputFieldPrice}
                    />
                    {errors.discount && touched.discount ? (
                      <div className={style.error}>{errors.discount}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={style.image}>
                {fileUploaded ? (
                  <img
                    src={
                      typeof fileUploaded !== "string"
                        ? URL.createObjectURL(fileUploaded)
                        : fileUploaded
                    }
                    alt="picture"
                    className={style.uploadedImg}
                  />
                ) : (
                  <></>
                )}
                <Field
                  name="image"
                  component={MuiInputField}
                  variant="outlined"
                  id="file"
                  type="file"
                  onChange={(event) => {
                    serFileUploaded(event.currentTarget.files[0]);
                  }}
                />
                <button className={style.removeBtn}  onClick={() => serFileUploaded("")}>REMOVE</button>
              </div>
            </div>
            <div className={style.btnsParent}>
              <button
                className={style.cancelButton}
                type="button"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button className={style.submitButton} type="submit">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <></>
  );
};

export default UpdateingBookInfo;
