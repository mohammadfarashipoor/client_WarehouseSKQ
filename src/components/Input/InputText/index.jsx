import ErrorText from "../../Typography/ErrorText";

function InputText({
  label,
  labelStyle,
  value,
  name,
  type,
  containerStyle,
  placeholder,
  disableValue,
  error,
  onInputChange,
  minLen=null,
  maxLen=null,
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
        type={type || "text"}
        value={value}
        name={name}
        disabled={disableValue}
        placeholder={placeholder || ""}
        min={minLen}
        max={maxLen}
        inputMode={type == "number" && "numeric"}
        onChange={(e) => {
          _onChange(e);
        }}
        className={`input input-bordered w-full `}
      />
      <ErrorText className="text-error">{error && error[0]}</ErrorText>
    </div>
  );
}

export default InputText;
