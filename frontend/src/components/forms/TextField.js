import React from 'react';

export const textField = ({ input, type, label, meta: { touched, error } }) => {
  return (
    <div className={`field ${touched && error ? 'error' : ''}`}>
      <label>{label}</label>
      <input {...input} type = {type} autoComplete='off' />
      {touched && error && (
        <span className='ui pointing red basic label'>{error}</span>
      )}
    </div>
  );
};

export const hiddenField = ({label, type, meta: { error } }) => {
  return (
    <div className='field'>
      <input type={type} />
      {error && <div className='ui red message'>{error}</div>}
    </div>
  );
};
