import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Forma = () => {
  // Define the validation schema using Yup
  const phoneRegExp = /^[0-9]{10}$/;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid. It must be 10 digits.")
      .required("Phone Number is required"),
  });

  // Initial form values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form data", values);
    resetForm();
  };

  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto bg-gray-200">
        <div className="flex flex-col py-5 justify-center items-center bg-gray-300/5">
          <h1 className="text-4xl py-5">Form Validation</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex justify-center flex-col gap-2 items-center">
                <div className="flex justify-center gap-2 items-center">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Name:
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded-md py-3 px-4 mb-3
                      focus:outline-none focus:border-gray-500"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email:
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded-md py-3 px-4 mb-3 focus:outline-none focus:border-gray-500"
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password:
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded-md py-3 px-4 mb-3 focus:outline-none focus:border-gray-500"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Confirm Password:
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded-md py-3 px-4 mb-3 focus:outline-none focus:border-gray-500"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your Password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Mobile No:
                    </label>
                    <Field
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded-md py-3 px-4 mb-3 focus:outline-none focus:border-gray-500"
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="Enter your Mobile No."
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-yellow-700 px-4 text-white py-2 rounded-md"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Forma;
