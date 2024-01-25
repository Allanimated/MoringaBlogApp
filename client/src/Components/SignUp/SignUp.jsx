import React from "react";
import "./signup.css";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  //   const initialValues = {
  //     username: "",
  //     fullName: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   };

  //   const validationSchema = yup.object({
  //     username: yup.string().required("Username required"),
  //     fullName: yup.string().required("Full Name required"),
  //     email: yup.string()
  //       .email("Invalid email address")
  //       .required("Email required"),
  //     password: yup.string()
  //       .min(8, "Password must be atleast 8 characters")
  //       .required("Password required"),
  //     confirmPassword: yup.string()
  //       .oneOf([yup.ref("password"), null], "Passwords must match")
  //       .required("Please confirm password"),
  //   });

  //   const onSubmit = (values) => {
  //     console.log(values);
  //   };

  // 3 args => initialValues, validationSchema, onSubmit
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Username required"),
      fullName: yup.string().required("Full Name required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email required"),
      password: yup
        .string()
        .min(8, "Password must be atleast 8 characters")
        .required("Password required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        // .oneOf(["password"])
        .required("Please confirm password"),
    }),
    onSubmit: (values) => {
      console.log(values);
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application.json",
            Accept: "application.json",
          },
          body: JSON.stringify(values),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
    },
  });

  return (
    <div className="container">
      <div className="sign-up-form-container">
        {/* left side */}
        <div className="left">
          <img src={logo} alt="" />
        </div>

        {/* right side */}
        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <h2 className="primary-title">Register</h2>
          <p className="secondary-title">It's completely free</p>

          <div className="form-control">
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="fullName">Full Name</label>
            <br />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="error">{formik.errors.fullName}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>

          <div className="terms-and-conditions">
            <input type="checkbox" /> I have read and agreed to be bound by the
            terms and conditions of using this application.
          </div>

          <div className="create-account-container">
            {/* <input type="submit" /> */}
            <button className="create-account-btn" type="submit">
              Create Account
            </button>
          </div>

          <p className="already-have-account">
            Already have an account?
            <span
              onClick={() => {
                navigate("/signin");
              }}
            >
              {" "}
              Sign in.
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;