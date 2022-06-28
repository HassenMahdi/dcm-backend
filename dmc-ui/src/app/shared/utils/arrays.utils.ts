  export const swapArrayElements = (array, oldIndex, newIndex) => {

  if(newIndex>=0 && newIndex<array.length) {
    var tmp = array[newIndex];
    array[newIndex] = array[oldIndex];
    array[oldIndex] = tmp;
  }

  return array
  }

  export const isArrayEmpty = (a) => {
    return !a || (a && a.length == 0 )
  }
  
  export const Arraylength = (a) => {
    return isArrayEmpty(a)? 0: a.length
  }

  export const permutation = (array) => {
    function p(array, temp) {
        var i, x;
        if (!array.length) {
            result.push(temp);
        }
        for (i = 0; i < array.length; i++) {
            x = array.splice(i, 1)[0];
            p(array, temp.concat(x));
            array.splice(i, 0, x);
          }
    }

    var result = [];
    p(array, []);
    return result;
}

export const arrangement = (array) => {
  function a(array) {
    var i, x, s;
    if (array.length) {
      result = result.concat(permutation(array))
      for (i = 0; i < array.length; i++) {
          s = [].concat(array);
          s.splice(i,1);
          a(s)        
      }
    }
  }

  var result = [];
  a(array);
  return result;
}

export function ArrayLast(array) {
  return array[array.length - 1];
}

export function DefaultArray(obj, key) {
  obj[key] = obj[key] || []
  return obj[key] 
}

export function ToMap(array, keyFn, valueFn){
  const m = {}

  for (const ele of array) {
    const key = keyFn(ele)
    const value = valueFn(ele)
    m[key]=value
  }

  return m
}



  
  
  
