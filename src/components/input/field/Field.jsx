import React from "react";
const styles = {
    width : '100%',
    padding : '.4rem',
    border : '1px solid #ccc',
    outline : 'none'
}

const Field = ({ type,value,change,placeholder,required,classnames,name,label,disabled }) => {
  return (
    <>
      <div>
        <label className="form-label">
          {label}
        </label>
        <input 
            type={type}
            value={value}
            onChange={change}
            placeholder={placeholder}
            required={required}
            className={classnames}
            style={styles}
            name={name}
            disabled={disabled}
        /> 
      </div>
    </>
  );
};

export default Field;
