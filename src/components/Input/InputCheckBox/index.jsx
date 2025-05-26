import ErrorText from "../../Typography/ErrorText";

function InputCheckBox({
  label,
  labelStyle,
  checked,
  name,
  containerStyle,
  disableValue,
  error,
  onInputChange,
}) {
  const _onChange = (e) => {
    if (checked) {
      onInputChange(e.target.name, false);
    } else {
      onInputChange(e.target.name, e.target.value);
    }

  };
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="cursor-pointer label">
        <span className={"label-text text-base-content " + labelStyle}>
          {label}
        </span>
        <input
          type={"checkbox"}
          checked={checked}
          name={name}
          disabled={disableValue}
          onChange={(e) => {
            _onChange(e);
          }}
          className={`checkbox checkbox-primary`}
        />
      </label>

      <ErrorText className="text-error">{error && error[0]}</ErrorText>
    </div>
  );
}

export default InputCheckBox;
