import AppRoutes from "./routes";
import { Provider } from "react-redux";
import history from "@/context/history";
import store from "@/context/store";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import SuspenseContent from "./components/SuspenseContent";
import { Suspense } from "react";
import Toast from "./containers/Toast";
import setToken from "./utils/token";
import { SET_AUTH } from "./containers/Authentication/constants";

const token = localStorage.getItem("token");
setToken(token);
store.dispatch({ type: SET_AUTH });
const App = () => {
  return (
    <HistoryRouter history={history}>
      <Provider store={store}>
        <Toast />
        <Suspense fallback={<SuspenseContent />}>
          <AppRoutes />
        </Suspense>
      </Provider>
    </HistoryRouter>
  );
};

export default App;
