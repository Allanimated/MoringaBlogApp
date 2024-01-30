import React from "react";
import Header from "../Header/Header";
import "./create.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGlobalUserContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function Create() {
  const { token } = useGlobalUserContext();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phase: "",
      title: "",
      content: "",
      resources: "",
    },
    validationSchema: Yup.object({
      phase: Yup.number().required("Phase required"),
      title: Yup.string().required("Title required"),
      content: Yup.string().required("Content required"),
      resources: Yup.string().url("Invalid URL"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      console.log(token);

      // fetch API
      fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            resetForm();
            navigate("/dashboard");
            return response.json();
          }
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
    <>
      <Header />
      <div className="create">
        <h3 className="title">Write a Public Blog</h3>
        <div className="info" id="info">
          <h5 className="info-title">Writing a good blog</h5>
          <p className="info-body">
            Welcome to Moringa! Well, it's great to have you here. Our main goal
            here is to build an active community of Moringa students where we
            can help each other learn faster, debug easily and share new trends
            and perspectives. If you are here, it means you are ready to write a
            programming-related blog and these steps will guide you through the
            process.
          </p>
          <ul className="guidelines">
            <span>Steps</span>
            <li>Summarize your blog in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Add the phase related to the blog you are writing.</li>
            <li>Share resources that you used to solve the issue.</li>
            <li>Review your blog and post it to the site.</li>
          </ul>
        </div>
        <form className="create-form" onSubmit={formik.handleSubmit} action="">
          <div className="title-box">
            <h5>Title</h5>
            <em>Be specific and avoid being too word.</em>
            <input
              placeholder="e.g. How to install python using pyenv"
              type="text"
              name="title"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched && formik.errors.title ? (
              <div className="error">*{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="phase-select">
            <h5>Phase</h5>
            <em>
              Select a phase that relates to the problem or solution you are
              blogging about
            </em>
            <select
              name="phase"
              id="phase"
              value={formik.values.phase}
              onChange={formik.handleChange}
            >
              <option value="">Choose phase</option>
              <option value="0">Phase 0</option>
              <option value="1">Phase 1</option>
              <option value="2">Phase 2</option>
              <option value="3">Phase 3</option>
              <option value="4">Phase 4</option>
              <option value="5">Phase 5</option>
            </select>
            {formik.touched && formik.errors.title ? (
              <div className="error">*{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="content-box">
            <h5>What are the details about your problem?</h5>
            <em>
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </em>
            <textarea
              type="text"
              name="content"
              id="content"
              value={formik.values.content}
              onChange={formik.handleChange}
            ></textarea>
            {formik.touched && formik.errors.content ? (
              <div className="error">*{formik.errors.content}</div>
            ) : null}
          </div>
          <div className="resources-box">
            <h5>Here you can share links to some of the resources you used</h5>
            <input
              type="url"
              placeholder="Enter link to resource"
              name="resources"
              id="resources"
              value={formik.values.resources}
              onChange={formik.handleChange}
            ></input>
            {formik.touched && formik.errors.title ? (
              <div className="error">*{formik.errors.title}</div>
            ) : null}
          </div>
          <button className="publish" type="submit">
            Post
          </button>
        </form>
      </div>
    </>
  );
}

export default Create;
