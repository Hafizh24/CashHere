import React from "react";
import CardProfile from "../components/profile/CardProfile";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  image: Yup.mixed().test("fileSize", "File size must be less than 1MB", (value) => {
    if (value) {
      return value.size <= 1145728;
    }
    return true;
  }),
});

const Profile = () => {
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <CardProfile />
    </>
  );
};

export default Profile;
