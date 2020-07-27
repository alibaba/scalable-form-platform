// fixed jsdom miss
if (typeof window !== 'undefined') {
  const noop = function() {};
  const matchMediaPolyfill = function matchMediaPolyfill() {
    return {
      matches: false,
      addListener() {
      },
      removeListener() {
      },
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  // 为全局添加XT函数
  window.XT = noop;
}
