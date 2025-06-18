import ErrorText from "../../Typography/ErrorText";

function InputFile({
  label,
  labelStyle,
  value,
  name,
  containerStyle,
  placeholder,
  disableValue,
  error,
  onInputChange,acceptType
}) {
  const _onChange = (e) => {
    if (e.target.name == "image") {
      onInputChange(e.target.name, e.target.files[0]);
    } else {
      onInputChange(e.target.name, e.target.value);
    }
  };
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {label}
        </span>
      </label>
      <input
        type={"file"}
        value={value}
        name={name}
        accept={acceptType}
        disabled={disableValue}
        placeholder={placeholder || ""}
        onChange={(e) => {
          _onChange(e);
        }}
        className={`file-input file-input-bordered w-full input-bordered file-input-primary`}
      />
      <ErrorText className="text-error">{error && error[0]}</ErrorText>
    </div>
  );
}

export default InputFile;
