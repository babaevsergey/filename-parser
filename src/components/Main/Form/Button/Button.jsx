import PropTypes from "prop-types";
import "./Button.css";

const Button = ({name, id, className, onClick}) => {
    return (
        <>
            <button onClick={onClick} id={id} className={className}>{name}</button>
        </>
    );
};

Button.displayName = 'Button';

Button.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;