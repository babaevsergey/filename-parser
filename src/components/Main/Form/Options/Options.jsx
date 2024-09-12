import PropTypes from 'prop-types';
import classNames from 'classnames'

import './Options.css';

const Options = ({ sizes, onChange, value }) => {
    const selectClass = classNames('select', {
        'not-allow': !value
    })

    // console.log(value);

    return (
        <div className='input-group'>
            <label htmlFor="sizeW">Ширина сборки</label>
            <select onChange={onChange} className={selectClass} type="text" id="sizeW">
                {sizes.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
                ))}
            </select>
        </div>
    );
};

Options.displayName = 'Options';

Options.propTypes = {
    sizes: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    value: PropTypes.string
}

export default Options;