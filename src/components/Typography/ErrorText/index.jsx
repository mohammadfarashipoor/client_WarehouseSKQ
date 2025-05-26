function ErrorText({ styleClass = '', children }) {
  return <span className={`text-error ${styleClass}`}>{children}</span>;
}

export default ErrorText;
