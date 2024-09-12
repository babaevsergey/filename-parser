import PropTypes from 'prop-types';
import "./OrderNumbers.css";

const OrderNumbers = ({ value }) => {
    const sortedNumbers = value ? [...value].sort((a, b) => a - b) : null;
    
    const formattedNumbers = sortedNumbers.map(item => {
        const part1 = item.slice(0, 3);
        const part2 = item.slice(3);
        return `${part1}-${part2}`;
    });
    return (
        <div className="numbers" id="numbers">
            {value ? (
                <ul>
                    {formattedNumbers.map((item, index) => (
                        <li key={index}>
                            <span>{`${index+1}.`}</span>{item}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}

OrderNumbers.displayName = 'OrderNumbers';

OrderNumbers.propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
}

export default OrderNumbers;
