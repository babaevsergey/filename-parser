import PropTypes from 'prop-types';
import "./Input.css";

const Input = ({htmlFor, id, fieldName, onChange, value, error}) => {
    const inputClass = !error ? 'input error' : 'input no-errors';

    return (
        <div className="input-group">
            <label htmlFor={htmlFor}>{fieldName}</label>
            <input value={value} onChange={onChange} className={inputClass} type="text" id={id} />
        </div>
    );
};

Input.displayName = 'Input';

Input.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.bool
};

export default Input;