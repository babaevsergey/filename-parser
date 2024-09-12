import PropTypes from 'prop-types';

import './Warnings.css';

const Warnings = ({ value }) => {
    if (value) {
        return <div className='warning'>
            <ul>
                {value.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    } else {
        return <div className='warning'></div>
    }
}

Warnings.displayName = "Warnings";

Warnings.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string)
}

export default Warnings;