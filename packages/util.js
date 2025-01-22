function throttle(delay, func) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

function generateUUID() {
  const template = 'xxxxxxxxxxxxaxxxyxxxxxxxxxxxxxxx';
  return template.replace(/[xy]/g, function (char) {
    const random = Math.random() * 16 | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

const uuid = () => {
  return generateUUID().replaceAll('-', '');
}

function duplicateId(list) {
  const seen = new Set();
  const duplicates = new Set();

  list.forEach(item => {
    if (seen.has(item.id)) {
      duplicates.add(item);
    } else {
      seen.add(item.id);
    }
  });
  if (duplicates.size > 0) {
    list.forEach(item => {
      item.id = uuid();
    });
  }

  return list;
}

/**
 * 
 * @param {Array} list 
 * @returns {Array}
 */
function listMap(list) {
  return list.map((data, index) => {
    return {
      id: uuid(),
      index,
      data
    }
  })
}

export {
  listMap,
  throttle,
  duplicateId,
  uuid
}