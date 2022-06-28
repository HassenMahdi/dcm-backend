export const deepCopy = (obj) => {
  // TODO BETTER IMPLEMENTATION
  return JSON.parse(JSON.stringify(obj));
};

export const isEmpty = (obj) => {
  for(const prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};
