import PropTypes from 'prop-types';
import './ImmediateCheckbox.css'

const ImmediateCheckbox = ({onChange}) => {
    return (
        <div className='input-group'>
            <div>Срочно</div>
            {/* <label htmlFor="immediate">Срочно</label> */}
            <div className="checkbox">
                <input onChange={onChange} type="checkbox" className="immediate" id="immediate" />
            </div>
        </div>
    )
}

ImmediateCheckbox.displayName = 'ImmediateCheckbox';

ImmediateCheckbox.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default ImmediateCheckbox;