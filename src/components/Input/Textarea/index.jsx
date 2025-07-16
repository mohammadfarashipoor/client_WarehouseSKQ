import ErrorText from "../../Typography/ErrorText";

function Textarea({
  label,
  labelStyle,
  value,
  name,
  containerStyle,
  placeholder,
  disableValue,
  error,
  onInputChange, 
}) {
  const _onChange = (e) => {
    onInputChange(e.target.name,e.target.value);
  };
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {label}
        </span>
      </label>
      <textarea className="textarea textarea-bordered" 
        name={name}
        value={value}
        placeholder={placeholder || ""}
        disabled={disableValue}
        onChange={(e) => {
            _onChange(e);
        }}
      ></textarea>
      <ErrorText className="text-error">{error && error[0]}</ErrorText>
    </div>
  );
}

export default Textarea;
