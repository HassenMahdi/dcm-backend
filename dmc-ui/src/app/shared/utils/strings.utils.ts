export const capitalize = (s) => {
    if (typeof s !== 'string') { return ''; }
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const shortcutString = (shortcut) => {
  // tslint:disable-next-line: max-line-length
  return (shortcut) ? shortcut.split('.').map((e: string) => e.replace('control', 'ctrl')).map((e: string) => capitalize(e)).join('+') : null;
};

export const isStrEmpty = (s) => {
  return (s == null || s === '' );
};

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
}

export function randomPosition(max: number) {
  return Math.floor(Math.random() * (max) + 1).toString();
}

export function isInDateFormat(str) {
  const NUMERIC_REGEXP = /^[\d]{4}-[\d]{2}-[\d]{2}$/;
  return String(str).match(NUMERIC_REGEXP);
}

export function isInDoubleFormat(str: string) {
  const NUMERIC_REGEXP = /^[-]{0,1}[\d]*[.]{1}[\d]+(E[-]{0,1}[\d]+)?$/;
  return String(str).match(NUMERIC_REGEXP);
}


export function isInIntegerFormat(str) {
  return String(str).replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export function formatDate(str: string) {
    const parts: string[] = str.split('-');
    const yyyy = parts[0].substr(0,4);
    const mm = parts[1].substr(0,2);
    const dd = parts[2].substr(0,2);

    return `${[mm, dd, yyyy].join('/')}`;
}

export function stringToColour(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export function inferType(value: string) {
  if (isInDoubleFormat(value)) {
    return 'double';
  } else if (isInDateFormat(value)) {
    return 'date';
  } else if (isInIntegerFormat(value)) {
    return 'int';
  } else {
    return 'string';
  }
}

export function formatByType(value: string, type: string){
  if (type === 'double') {
    return parseFloat(value).toFixed(2);
  } else if (type === 'date') {
    return formatDate(value);
  } else {
    return value;
  }
}


