module.exports = {
    
    validateInputString: (value, isRequired) => {
    if(isRequired) {
        if(!value) {
            return false;
        }
    }
    if(value && value.toString().trim() != "") {
        return true;
    }
    return false;
},
    validateInputNumber: (value, isRequired) => {
    if(isRequired) {
        if(!value) {
            return false;
        }
    }
    if(value && !Number.isNaN(Number(value))) {
        return true;
    }
    return false;
}
};