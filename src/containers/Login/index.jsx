import InputText from "@/components/Input/InputText";
import { connect } from "react-redux";
import actions from "@/context/actions";
import { Link, Navigate } from "react-router";

function Login(props) {
  const {
    authenticated,
    loginFormData,
    loginChange,
    login,
    formErrors,
    isLoading,
    isSubmitting,
  } = props;
  if (authenticated) return <Navigate to="/" />;
  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };
  return (
    <div className="py-24 px-10">
      <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <InputText
            type="emailId"
            error={formErrors["email"]}
            placeholder={"لطفا ایمیل خود را وارد کنید"}
            name={"email"}
            containerStyle="mt-4"
            label={"ایمیل"}
            value={loginFormData.email}
            onInputChange={(name, value) => {
              loginChange(name, value);
            }}
            disableValue={isSubmitting}
          />

          <InputText
            type="password"
            error={formErrors["password"]}
            placeholder={"لطفا رمز عبور خود را وارد کنید"}
            name={"password"}
            containerStyle="mt-4"
            label={"رمز عبور"}
            value={loginFormData.password}
            onInputChange={(name, value) => {
              loginChange(name, value);
            }}
            disableValue={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={
            "btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")
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
    authenticated: state.authentication.authenticated,
    loginFormData: state.login.loginFormData,
    formErrors: state.login.formErrors,
    isLoading: state.login.isLoading,
    isSubmitting: state.login.isSubmitting,
  };
};
export default connect(mapStateToProps, actions)(Login);
