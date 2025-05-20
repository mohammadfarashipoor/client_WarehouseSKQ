// routingMiddleware.js
import history from "./history";

const routingMiddleware = () => (next) => (action) => {
  if (action.type === "NAVIGATE") {
    history.push(action.payload);
  }
  return next(action);
};

export default routingMiddleware;
