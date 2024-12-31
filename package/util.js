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

function listMap(list) {
  return list.map((data, index) => {
    return {
      id: data.id !== (void 0) ? data.id : index,
      index,
      data
    }
  })
}

export {
  listMap,
  throttle
}