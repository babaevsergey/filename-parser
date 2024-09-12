import { createSlice } from "@reduxjs/toolkit";

import parseString from "../helpers/parseString";
import disassembleString from "../helpers/disassembleString";

const initialStringState = {
    date: '',
    orderNumbers: [],
    material: '',
    quality: '',
    lamination: '',
    ufmark: '',
    urgency: '',
    immediate: '',
}

const initialParameters = {
    width: '',
    height: '',
    repeat: ''
}

const initialErrors = {
    string: true, 
    height: true, 
    repeat: true
}

const initialErrorsMsg = {
    string: '',
    height: '',
    repeat: '',
}

const appSlice = createSlice({
    name: 'app',
    initialState: {
        inputString: '',
        parsedString: initialStringState,
        parameters: initialParameters,
        error: initialErrors,
        errorMsg: initialErrorsMsg,
        warnings: [],
        materialSize: [],
        finalText: '',
        isCorrect: false,
        totalLength: ''
    },
    reducers: {
        // setInputString: (state, action) => {
        //     state.inputString = action.payload;
        // },
        // setParsedString: (state, action) => {
        //     state.parsedString = action.payload;
        // },
        // setParameters: (state, action) => {
        //     state.parameters = action.payload;
        // },
        // setError: (state, action) => {
        //     state.error = action.payload;
        // },
        // setErrorMsg: (state, action) => {
        //     state.errorMsg = action.payload;
        // },
        // setWarnings: (state, action) => {
        //     state.warnings = action.payload;
        // },
        // setMaterialSize: (state, action) => {
        //     state.materialSize = action.payload;
        // },
        // setFinalText: (state, action) => {
        //     state.finalText = action.payload;
        // },
        // setIsCorrect: (state, action) => {
        //     state.isCorrect = action.payload;
        // },

        handlePasteText: {
            reducer: (state, action) => {
                const {pastedString, materials} = action.payload;
                state.inputString = pastedString;
            
                const regexp = /^\d{2}-\d{2}_\d{7}/;
            
                if (pastedString && !regexp.test(pastedString.slice(0, 13))) {
                    state.error.string = false;
                    state.errorMsg.string = 'Неверная строка';
                
                    return;
                } else if (!pastedString) {
                    state.error.string = true;
                    state.errorMsg.string = '';
                    state.parameters.width = '';
                    state.parsedString = initialStringState;
                    state.warnings = [];
                    state.materialSize = [];
                    state.finalText = '';
                    
                    return;
                } else if (pastedString) {
                    state.errorMsg.string = '';
                    state.error.string = true;
                
                    const disassembledString = disassembleString(pastedString, Object.keys(materials));
                    const parsed = parseString(disassembledString, materials);
                
                    state.parsedString = parsed.parsedString;
                    state.warnings = parsed.warningsArray;
                    state.materialSize = parsed.sizesArray;
                    state.parameters.width = parsed.sizesArray[0];
                }
            },
            prepare: (pastedString, materials) => {
                return { payload: { pastedString, materials } };
            }
        },

        handleWidthInput(state, action) {
            state.isCopied = false;
            state.parameters.width = action.payload;
        },

        handleHeightInput(state, action) {
            state.parameters.height = action.payload;
            state.isCopied = false;
            
            if (action.payload && isNaN(+action.payload) || action.payload === '0') {
                state.error.height = false;
                state.errorMsg.height = 'Неверная длина сборки';
                
                return;
            } else if (!action.payload) {
                state.error.height = true;
                state.errorMsg.height = '';

                return;
            } else if (action.payload) {
                state.error.height = true;
                state.errorMsg.height = '';
            }
        },

        handleRepeatInput(state, action) {
            state.parameters.repeat = action.payload;
            state.isCopied = false;

            if (action.payload && isNaN(+action.payload) || action.payload === '0') {
                state.error.repeat = false;
                state.errorMsg.repeat = 'Неверное количество повторов';

                return;
            } else if (!action.payload) {
                state.error.repeat = true;
                state.errorMsg.repeat = '';

                return;
            } else if (action.payload) {
                state.error.repeat = true;
                state.errorMsg.repeat = '';
            }
        },

        updateFinalText(state) {
            const {
                date, 
                orderNumbers, 
                material, 
                quality, 
                lamination, 
                ufmark, 
                urgency, 
                immediate
            } = state.parsedString;

            let text = `${date} ${orderNumbers.join(' ')} ` + 
                `${state.parameters.width}x${state.parameters.height} ${material} ${quality} ` +
                `${ufmark} ${lamination} ${urgency} ${state.parameters.repeat}r ${immediate}`
            
            if (text) {
                state.finalText = text.replace(/\s+/g, ' ').trim();
            }
            
            state.totalLength = (+state.parameters.height/1000*+state.parameters.repeat).toFixed(2);
        },

        handleCheckbox(state, action) {
            if (action.payload) {
                state.parsedString.immediate = 'SROCHNO';
            } else {
                state.parsedString.immediate = '';
            }
        },

        handleCopy(state) {
            if (state.error.string && state.parameters.width === '') {
                state.error.string = false;
                state.errorMsg.string = 'Пустая строка';
                state.isCorrect = false;

                return;
            }
        
            if (state.error.height && state.parameters.height === '') {
                state.error.height = false;
                state.errorMsg.height = 'Пустая длина сборки';
                state.isCorrect = false;

                return;
            }
        
            if (state.error.repeat && state.parameters.repeat === '') {
                state.error.repeat = false;
                state.errorMsg.repeat = 'Пустое количество повторов';
                state.isCorrect = false;

                return;
            }
        
            if (state.error.string && state.error.height && state.error.repeat) {
                state.isCorrect = true;
                state.error = initialErrors;
                navigator.clipboard.writeText(state.finalText);
            }
        },

        handleClear(state) {
            state.materialSize = [];
            state.warnings = [];
            state.finalText = '';
            state.isCorrect = false;
            state.error = initialErrors;
            state.errorMsg = initialErrorsMsg;
            state.parsedString = initialStringState;
            state.parameters = initialParameters;
            state.inputString = '';
        }
    },
});

export const {
    // setInputString,
    // setParsedString,
    // setParameters,
    // setError,
    // setErrorMsg,
    // setWarnings,
    // setMaterialSize,
    // setFinalText,
    // setIsCorrect,
    handlePasteText,
    handleWidthInput,
    handleHeightInput,
    handleRepeatInput,
    updateFinalText,
    handleCheckbox,
    handleCopy,
    handleClear
} = appSlice.actions;

export default appSlice.reducer;