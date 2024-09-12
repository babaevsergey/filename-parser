import {useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import OrderNumbers from './OrderNumbers/OrderNumbers'
import Result from './Result/Result'
import Warnings from './Warnings/Warnings'
import Form from './Form/Form'
import { setMaterials } from '../../features/materialsSlice';

import './Main.css'

import {
  handlePasteText,
  handleHeightInput,
  handleWidthInput,
  handleRepeatInput,
  handleCopy,
  handleClear,
  updateFinalText
} from '../../features/appSlice'

function Main() {
    const textareaRef = useRef(null);

    const dispatch = useDispatch();
    const materials = useSelector((state) => state.materials);
    
    const {
      inputString,
      parsedString,
      parameters,
      error,
      errorMsg,
      warnings,
      materialSize,
      finalText,
      isCorrect,
      totalLength
    } = useSelector((state) => state.app);
  
    useEffect(() => {
      fetch('/resources.json')
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          dispatch(setMaterials(data));
      });
    }, []);
  
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, []);
  
    useEffect(() => {
      dispatch(updateFinalText());
    }, [parsedString, parameters, dispatch]);

    return (
        <>
          <div className="main">
            <Form 
              settingHeight={(event) => {
                const heightValue = event.target.value;
                dispatch(handleHeightInput(heightValue))
              }} 
              settingRepeat={(event) => {
                const repeatValue = event.target.value;
                dispatch(handleRepeatInput(repeatValue))
              }} 
              height={parameters.height}
              repeat={parameters.repeat}
              sizes={materialSize} 
              value={inputString} 
              error={error}
              onChange={(event) => {
                const stringValue = event.target.value;
                dispatch(handlePasteText(stringValue, materials))
              }}
              onChangeOption={(event) => {
                const widthValue = event.target.value;
                dispatch(handleWidthInput(widthValue))
              }}
              onCopy={(event) => {
                event.preventDefault();
                dispatch(handleCopy()
              )}}
              onClear={(event) => {
                event.preventDefault();
                dispatch(handleClear());
                
                if (textareaRef.current) {
                    textareaRef.current.focus();
                }
              }}
              ref={textareaRef}>
            </Form>

            <div className="sidebar">
              <OrderNumbers value={parsedString.orderNumbers} />
              <div className='total-length'>{totalLength}</div>
            </div>
          </div>

            <Result 
              value={finalText} 
              isCorrect={isCorrect} 
              error={errorMsg} />
              
            <Warnings value={warnings} />
        </>
    )
}

export default Main