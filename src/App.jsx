import AppRoutes from "./routes";
import { Provider } from "react-redux";
import history from "@/context/history";
import store from "@/context/store";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import SuspenseContent from "./components/SuspenseContent";
import { Suspense } from "react";
const App = () => {
  return (
    <HistoryRouter history={history}>
      <Provider store={store}>
        <Suspense fallback={<SuspenseContent />}>
          <AppRoutes />
        </Suspense>
      </Provider>
    </HistoryRouter>
  );
};

export default App;
