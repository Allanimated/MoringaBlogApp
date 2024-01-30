import React from "react";
import "./userAccount.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useGlobalUserContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const UserAccount = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const formik = useFormik({
    initialValues: {
      username: currentUser.username,
      full_name: currentUser.full_name,
      email: currentUser.email,
      password: "",
    },

    validationSchema: yup.object().shape({
      username: yup.string(),
      full_name: yup.string(),
      email: yup.string().email("Invalid email"),
      password: yup.string().min(8, "Password must be at least 8 characters!"),
    }),

    onSubmit: (values) => {
      console.log(values);

      //   fetch API
      fetch(`/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              localStorage.setItem("user", JSON.stringify(data));
              console.log(data);
            });
            alert("Account updated successfully");
            navigate("/profile");
          } else {
            response.json().then((data) => console.log(data));
          }
        })
        .catch((error) => {
          console.log(`Error ${error}`);
        });
    },
  });
  return (
    <div className="user-account-container">
      <form action="" className="user-patch" onSubmit={formik.handleSubmit}>
        <h1>Personal Info</h1>
        <h2>Username</h2>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          id="username"
          name="username"
          className="input"
        />
        <h2>Full Name</h2>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.full_name}
          id="full_name"
          name="full_name"
          className="input"
        />
        <h2>Email</h2>
        <input
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
          id="email"
          name="email"
          className="input"
        />
        <h2>Password</h2>
        <input
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          id="password"
          name="password"
          className="input"
          placeholder="Enter new password.."
        />
        <br />
        <button className="btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UserAccount;
