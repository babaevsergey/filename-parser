import { forwardRef } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from "./Button/Button";
import Input from "./Input/Input";
import Options from "./Options/Options";
import TextArea from "./TextArea/TextArea";
import ImmediateCheckbox from "./ImmediateCheckbox/ImmediateCheckbox";

import './Form.css'

import { handleCheckbox } from '../../../features/appSlice'


const Form = forwardRef(({...props}, ref) => {
    const dispatch = useDispatch();
    const {
        value,
        onChange,
        error,
        sizes,
        onChangeOption,
        settingHeight,
        settingRepeat,
        height,
        repeat,
        onClear,
        onCopy,
    } = props;

    return (
        <form className="form" id="form">
            <TextArea 
                ref={ref} 
                value={value} 
                onChange={onChange} 
                error={error.string} />
            <div className="inputs">
                <Options 
                    sizes={sizes} 
                    value={value} 
                    onChange={onChangeOption} />
                <Input 
                    value={height} 
                    error={error.height} 
                    onChange={settingHeight} 
                    htmlFor={'sizeH'} 
                    id={'sizeH'} 
                    fieldName={'Длина сборки'} />
                <Input 
                    value={repeat} 
                    error={error.repeat} 
                    onChange={settingRepeat} 
                    htmlFor={'repeat'} 
                    id={'repeat'} 
                    fieldName={'Повтор'} />
                <ImmediateCheckbox onChange={(event) => {
                    const isChecked = event.target.checked;
                    dispatch(handleCheckbox(isChecked))}}>
                </ImmediateCheckbox>
            </div>
            <div className="buttons">
                <Button onClick={onClear} name={'CLEAR'} className='btn clear'></Button>
                <Button onClick={onCopy} name={'COPY'} className='btn copy'></Button>
            </div>
        </form>
    )
});

Form.displayName = 'Form';

Form.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    sizes: PropTypes.array.isRequired,
    onChangeOption: PropTypes.func.isRequired,
    settingHeight: PropTypes.func.isRequired,
    settingRepeat: PropTypes.func.isRequired,
    height: PropTypes.string.isRequired,
    repeat: PropTypes.string.isRequired,
    onClear: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
};

export default Form;