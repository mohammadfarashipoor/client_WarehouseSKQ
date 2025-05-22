import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ErrorText from "@/components/Typography/ErrorText";
import InputText from "@/components/Input/InputText";
import { connect } from "react-redux";
import actions from "@/context/actions";

function Login(props) {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = (e) => {
    e.preventDefault();
    // setErrorMessage("");

    // if (loginObj.emailId.trim() === "")
    //   return setErrorMessage("Email Id is required! (use any value)");
    // if (loginObj.password.trim() === "")
    //   return setErrorMessage("Password is required! (use any value)");
    // else {
    //   setLoading(true);
    //   // Call API to check user credentials and save token in localstorage
    //   localStorage.setItem("token", "DumyTokenHere");
    //   setLoading(false);
    window.location.href = "/";
    // }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="py-24 px-10">
      <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
      <form onSubmit={(e) => submitForm(e)}>
        <div className="mb-4">
          <InputText
            type="emailId"
            defaultValue={loginObj.emailId}
            updateType="emailId"
            containerStyle="mt-4"
            labelTitle="Email Id"
            updateFormValue={updateFormValue}
          />

          <InputText
            defaultValue={loginObj.password}
            type="password"
            updateType="password"
            containerStyle="mt-4"
            labelTitle="Password"
            updateFormValue={updateFormValue}
          />
        </div>

        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
        <button
          type="submit"
          className={
            "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
          }
        >
          Login
        </button>

        <div className="text-center mt-4">
          Don't have an account yet?{" "}
          <Link to="/register">
            <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
              Register
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loginFormData: state.login.loginFormData,
    formErrors: state.login.formErrors,
    isLoading: state.login.isLoading,
    isSubmitting: state.login.isSubmitting,
  };
};
export default connect(mapStateToProps, actions)(Login);
