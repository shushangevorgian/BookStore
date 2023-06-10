import * as Yup from "yup";

export const addingSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Please input book name")
    .trim("The name can not include leading and trailing spaces")
    .strict(true),
  body: Yup.string()
    .min(8, "Too short")
    .max(400, "Too Long!")
    .required("Please input description")
    .trim("The name can not include leading and trailing spaces")
    .strict(true),
  prices: Yup.string()
    .max(200, "Too Long!")
    .required("Please input book  price")
    .strict(true),
  discount: Yup.string()
    .max(3, "Too Long!")
    .matches(/^[1-9][0-9]?$|^100$|^0$/gi)
    .required("Please input book  %")
    .strict(true),
});
