import PropTypes from 'prop-types';
import classNames from 'classnames';
import "./Result.css";

const Result = ({ value, isCorrect, error }) => {
    const resultClass = classNames('result', {
        'error': error.string || error.height || error.repeat,
        'no-errors': !error.string && !error.height && !error.repeat && !isCorrect,
        'copied': isCorrect
    })

    const errorMessages = Object.values(error).filter(err => err);

    return (
        <div className={resultClass} id="result">
            {errorMessages.length > 0 ? (
                <ul>
                    {errorMessages.map((errMsg, index) => (
                        <li key={index}>{errMsg}</li>
                    ))}
                </ul>
            ) : (
                isCorrect ? value : null
            )}
        </div>
    );
}

Result.displayName = "Result";

Result.propTypes = {
    value: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired
};

export default Result;