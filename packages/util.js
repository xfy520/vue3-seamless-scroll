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

const uuid = () => {
  return crypto.randomUUID().replaceAll('-', '');
}

function duplicateId(list) {
  const seen = new Set();

  // 同一数据在渲染窗口内出现多次时（短列表无缝滚动，窗口长度大于列表长度），
  // 为除第一次出现外的每次出现生成独立 id，保证 v-for 的 key 唯一
  return list.map((item) => {
    if (seen.has(item.id)) {
      return {
        ...item,
        id: uuid()
      };
    }
    seen.add(item.id);
    return item;
  });
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
