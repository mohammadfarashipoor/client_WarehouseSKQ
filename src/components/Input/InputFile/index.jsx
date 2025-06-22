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
  onInputChange, acceptType,
  progress=false
}) {
  const _onChange = (e) => {
    onInputChange(e.target);
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
      {progress!==0 && <progress className="progress progress-primary my-2" value={progress} max="100"></progress>}
      <ErrorText className="text-error">{error && error[0]}</ErrorText>
    </div>
  );
}

export default InputFile;
