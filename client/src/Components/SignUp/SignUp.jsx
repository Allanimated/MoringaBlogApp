import React from "react";
import "./signup.css";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Username required"),
      full_name: yup.string().required("Full Name required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email required"),
      password: yup
        .string()
        .min(8, "Password must be atleast 8 characters")
        .required("Password required"),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        // .oneOf(["password"])
        .required("Please confirm password"),
    }),
    onSubmit: (values) => {
      console.log(values);
      fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          // clear out form fields
          formik.resetForm();
          //set success message
          setSuccess("Successfully created account!!");
          //navigate user to home page
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
          response.json().then((data) => console.log(data));
        } else {
          return response.json().then((err) => setError(err.error[0]));
        }
      });
    },
  });

  return (
    <div className="container">
      <div className="sign-up-form-container">
        {/* left side */}
        <div className="left">
          <img src={logo} alt="" onClick={(e) => navigate("/")} />
        </div>
        {/* right side */}
        <form className="signup-form" onSubmit={formik.handleSubmit}>
          {error ? <h3 className="error">{error}</h3> : null}
          {success ? <h4 className="secondary-title">{success}</h4> : null}
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
            <label htmlFor="full_name">Full Name</label>
            <br />
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
            />
            {formik.touched.full_name && formik.errors.full_name ? (
              <div className="error">{formik.errors.full_name}</div>
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
            <label htmlFor="confirm_password">Confirm Password</label>
            <br />
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <div className="error">{formik.errors.confirm_password}</div>
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
