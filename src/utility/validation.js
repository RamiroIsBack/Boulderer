export const validate = (val, rules) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(val);
        break;
      default:
        isValid = true;
    }
  }
  
  return isValid;
};

const emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    val
  );
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};


const notEmptyValidator = val =>{
  return val.trim() !== '';
}


export const contained=(str1,str2)=>{ 
    
  var regexAnd=str2.toUpperCase().split("").join(")(?=.*");
  var regexStr="^"+"(?=.*"+regexAnd+").*$";
  
  
  var re = new RegExp(regexStr,"gm");

  return re.test(str1.toUpperCase());

}

