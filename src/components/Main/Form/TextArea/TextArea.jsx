import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './TextArea.css';

const TextArea = forwardRef(({value, onChange, error}, ref) => {
    const textAreaClass = !error ? 'filenames error' : 'filenames no-errors';

    return (
        <textarea value={value} 
            ref={ref} 
            onChange={onChange} 
            className={textAreaClass} 
            name="filenames" 
            id="filenames" 
            cols="30" 
            rows="10" 
            placeholder="Input filenames"
        ></textarea>
    );
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
};

export default TextArea;