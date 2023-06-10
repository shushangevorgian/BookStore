//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { addingSchema } from "@utils/index";
import { IValidationSchemeValues } from "@models/index";
import style from "./adding.module.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { TextField, Input } from "@mui/material";
import {
  addingBook,
  changeAddingState,
} from "@store/slices/requests/addingDataRequest";
import { gettingBooksData } from "@store/index";

const AddingBookValidationSchema = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSuccess = useAppSelector((state) => state.addingData.isSuccess);

  useEffect(() => {
    if (isSuccess) {
      dispatch(gettingBooksData());
      dispatch(changeAddingState());
    }
  }, [isSuccess]);
  const [fileUploaded, serFileUploaded] = useState<File | undefined>();

  const MuiTextField = ({ field, form, ...props }) => {
    return <TextField {...field} {...props} />;
  };
  const MuiInputField = ({ field, form, ...props }) => {
    return (
      <label>
        <span>CLICK HERE OR DRAG AND DROP TO UPLOAD THE IMAGE</span>
        <Input style={{ display: "none" }} {...field} {...props} value={""} />
      </label>
    );
  };
  return (
    <div className={style.parentDiv}>
      <Formik
        validateOnMount={true}
        initialValues={{
          title: "",
          body: "",
          prices: "",
          discount: "",
          image: "",
        }}
        validationSchema={addingSchema}
        onSubmit={(values: IValidationSchemeValues) => {
          if (fileUploaded) {
            dispatch(
              addingBook({
                ...values,
                fileUploaded,
                callback: () => {
                  dispatch(gettingBooksData());
                  navigate("/");
                },
              })
            );
          }
        }}
      >
        {({ errors, touched, isSubmitting, isValid }) => (
          <Form className={style.form}>
            <div className={style.parent}>
              <div className={style.add}>
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
                <div className={style.image}>
                  {fileUploaded && (
                    <img
                      src={URL.createObjectURL(fileUploaded)}
                      alt=""
                      className={style.uploadedImg}
                    />
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
                </div>
              </div>
            </div>
            <div className={style.btnsParent}>
              <button
                className={style.cancelButton}
                type="button"
                onClick={() => navigate("/")}
              >
                CANCEL
              </button>
              <button
                className={style.submitButton}
                type="submit"
                disabled={isSubmitting || !{ isValid }}
              >
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddingBookValidationSchema;
