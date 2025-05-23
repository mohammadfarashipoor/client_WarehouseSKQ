import InputText from "@/components/Input/InputText";
import actions from "@/context/actions";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router";
function Register(props) {
  const {
    authenticated,
    signupFormData,
    formErrors,
    isLoading,
    isSubmitting,
    signupChange,
    signUp,
  } = props;
  if (authenticated) return <Navigate to="/" />;

  const handleSubmit = (event) => {
    event.preventDefault();
    signUp();
  };

  return (
    <div className="py-24 px-10">
      <h2 className="text-2xl font-semibold mb-2 text-center">ثبت نام</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputText
            type={"text"}
            error={formErrors["name"]}
            label={"نام"}
            containerStyle="mt-4"
            name={"name"}
            placeholder={"لطفا نام خود را وارد کنید"}
            value={signupFormData.name}
            onInputChange={(name, value) => {
              signupChange(name, value);
            }}
          />

          <InputText
            type={"emailId"}
            error={formErrors["email"]}
            label={"ایمیل"}
            containerStyle="mt-4"
            name={"email"}
            placeholder={"لطفا ایمیل خود را وارد کنید"}
            value={signupFormData.email}
            onInputChange={(name, value) => {
              signupChange(name, value);
            }}
          />

          <InputText
            type={"password"}
            error={formErrors["password"]}
            label={"رمز عبور"}
            containerStyle="mt-4"
            name={"password"}
            placeholder={"لطفا رمز عبور خود را وارد کنید"}
            value={signupFormData.password}
            onInputChange={(name, value) => {
              signupChange(name, value);
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={
            "btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")
          }
        >
          ثبت نام
        </button>

        <div className="text-center mt-4">
          حساب کاربری دارید؟
          <Link to="/login">
            <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
              ورود
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
    signupFormData: state.signup.signupFormData,
    formErrors: state.signup.formErrors,
    isLoading: state.signup.isLoading,
    isSubmitting: state.signup.isSubmitting,
    isSubscribed: state.signup.isSubscribed,
  };
};

export default connect(mapStateToProps, actions)(Register);
