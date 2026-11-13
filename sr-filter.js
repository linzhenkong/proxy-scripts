function operator(proxies) {
  // 预编译正则，避免循环中重复创建
  const excludeRegex = /(过期|到期|剩余|重置|测试|官网|倍率)/i;
  
  return proxies.filter(proxy => {
    const name = proxy.name || '';
    
    // 1. 排除命中黑名单的节点
    if (excludeRegex.test(name)) return false;
    
    // 2. 过滤掉延迟异常或超标的节点（如果节点本身带有 delay 属性）
    if (typeof proxy.delay === 'number' && (proxy.delay <= 0 || proxy.delay > 1500)) {
      return false;
    }
    
    return true;
  });
}
