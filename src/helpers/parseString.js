import uniqueValuesArray from "./uniqueValuesArray";

function parseString(inputArray, materials) {
    const parsedString = {
        date: '',
        orderNumbers: [],
        material: [],
        quality: [],
        lamination: [],
        ufmark: [],
        urgency: [],
        immediate: '',
    };

    const warningsArray = [];
    let sizesArray = [];

    parsedString.date = inputArray.date;

    const presentDate = new Date();
    const month = String(presentDate.getMonth() + 1).padStart(2, '0');
    const day = String(presentDate.getDate()).padStart(2, '0');
    const formattedDate = `${month} ${day}`;
    
    if (inputArray.date === formattedDate) {
        warningsArray.push('⚠ ВОЗМОЖНО СРОЧНЫЙ ЗАКАЗ');
    }

    parsedString.orderNumbers = uniqueValuesArray(inputArray.orderNumbers);

    const uniqueMaterial = uniqueValuesArray(inputArray.materials);
        
    if (uniqueMaterial.length > 1) {
        parsedString.material = uniqueMaterial.join(' ').replaceAll(/_|-|\.\s/g, ' ');
        sizesArray = materials.default;
        warningsArray.push('⚠ Разный материал');
    } else {
        parsedString.material = uniqueMaterial[0].replace(/_|-|\.\s/g, ' ');
        sizesArray = materials[uniqueMaterial[0]];
    }

    const uniqueQuality = uniqueValuesArray(inputArray.qualities); //quality handler

    if (uniqueQuality.length > 1) {
        warningsArray.push('⚠ Разное качество печати');
    }

    if (uniqueQuality.includes('_720_')) {
        warningsArray.push('⚠ Качество печати 720 dpi');
    }

    if (uniqueQuality[0] === 'NO_PRINT') {
        if (uniqueQuality.includes('_1440_')) {
            parsedString.quality = '1440';
        } else {
            parsedString.quality = '1080';
        }
    } else {
        parsedString.quality = uniqueQuality[0].replaceAll('_', '');
    }

    if (inputArray.laminations.length >= 1) {
        parsedString.lamination = 'lam'

        const uniqueLamination = uniqueValuesArray(inputArray.laminations);

        if (uniqueLamination.length > 1) {
            warningsArray.push('⚠ Разная ламинация');
        }
    }

    if (inputArray.ufmarks && inputArray.orderNumbers.length === inputArray.ufmarks.length) { //UF mark presence handler
        parsedString.ufmark = 'UF'
    } else if (inputArray.ufmarks && inputArray.ufmarks.length < inputArray.orderNumbers.length) {
        warningsArray.push('⚠ Есть UF');
    }

    if (inputArray.urgencies != null && inputArray.orderNumbers.length === inputArray.urgencies.length) { //urgency handler
        parsedString.urgency = '6v'
    }

    if (!inputArray.quantities || inputArray.quantities.length !== inputArray.orderNumbers.length) {
        warningsArray.push('⚠ Не TIF формат либо неверный номер заказа');
    } else {
        const quantity = inputArray.quantities.map(sheet => sheet.replace(/\.tif|sht\.tif/, '')); //quantity handler
        for (const sheet of quantity) {
            if (sheet !== '1') {
                warningsArray.push('⚠ Некоторых макетов больше одного');
                break;
            }
        }
    }

    return {
        parsedString,
        warningsArray,
        sizesArray
    };
}

export default parseString
