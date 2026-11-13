// Sub-Store 脚本处理函数示例
function operator(proxies) {
  // 1. 在外部预编译正则和过滤条件，避免在循环中重复创建
  const excludeRegex = /(过期|到期|剩余|重置|测试|官网)/i;
  
  // 2. 使用单次 filter 完成所有校验
  return proxies.filter(proxy => {
    const name = proxy.name || '';
    
    // 排除包含特定黑名单词汇的节点
    if (excludeRegex.test(name)) return false;
    
    // 排除延迟过高或无效的节点（假设存在 delay 字段）
    if (typeof proxy.delay === 'number' && (proxy.delay <= 0 || proxy.delay > 1000)) {
      return false;
    }
    
    return true;
  });
}
