import ErrorText from "../../Typography/ErrorText";

function InputSelect({
  label,
  labelStyle,
  selectedValue,
  name,
  containerStyle,
  disableValue,
  error,
  options,
  onInputChange,
  placeholder
}) {
  const handleChange = (e) => {
    onInputChange(e.target.name, e.target.value);
  };
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      {label && (
        <label className="label">
          <span className={`label-text text-base-content ${labelStyle}`}>
            {label}
          </span>
        </label>
      )}
      <select
        name={name}
        value={selectedValue}
        disabled={disableValue}
        onChange={handleChange}
        className="select select-bordered"
      >
        {placeholder && (
          <option value="" selected disabled>
            {placeholder}
          </option>
        )}
        {options?.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && error.length > 0 && (
        <ErrorText className="text-error">{error[0]}</ErrorText>
      )}
    </div>
  );
}

export default InputSelect;
