// import isImmediate from './isImmediate';

function disassembleString(inputString, materials) {
    const disassembledString = {
        date: '',
        orderNumbers: [],
        materials: [],
        qualities: [],
        laminations: [],
        ufmarks: [],
        urgencies: [],
        quantities: [],
        // immediate: '',
    };

    const laminations = ['lamOrajet3640GL', 'lamOrajet3640MAT', 'lamOraguardMAT', 'lamOraguardGL', 'lamRitramaGL',  'lamRitramaMAT', 'lamARBGL', 'lamARBMAT']

    const string = inputString.replace(/[\n\r]/g, '');

    const dateArray = string.match(/\d{2}-\d{2}/g);

    const sortedDates = dateArray.sort((a, b) => { //sorting dates
        const dateA = new Date(`2022-${a}`);
        const dateB = new Date(`2022-${b}`);
        return dateA - dateB;
    });

    disassembledString.date = sortedDates[0].replace('-', ' ');

    disassembledString.orderNumbers = string.match(/\d{7}/g);

    materials.forEach (material => {
        if (string.includes(material)) {
            disassembledString.materials.push(material);
        }
    })

    disassembledString.qualities = string.match(/_1080_|_1440_|_720_|NO_PRINT/g);

    laminations.forEach (lamination => {
        if (string.includes(lamination)) {
            disassembledString.laminations.push(lamination);
        }
    });

    disassembledString.ufmarks = string.match(/UF/g);

    disassembledString.urgencies = string.match(/6v/g);

    disassembledString.quantities = string.match(/\d+\.tif|\d+sht\.tif/g);

    // const immediateCheck = isImmediate();

    // if (immediateCheck) {
    //     disassembledString.immediate = 'SROCHNO';
    // }

    return disassembledString;
}

export default disassembleString