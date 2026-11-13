// Shadowrocket 高级过滤、重命名与数量限制脚本
let body = $response.body;

try {
    // 1. Base64 解码获取原始节点文本
    let decoded = decodeURIComponent(escape(atob(body)));
    let lines = decoded.split(/\r?\n/).filter(line => line.trim() !== "");
    
    // 2. 过滤逻辑：剔除包含 IPv6、回国、测速、广告等不需要的节点
    let filteredLines = lines.filter(line => {
        // 黑名单正则：匹配包含 IPv6、回国、过期、官网、剩余、到期、测速等字样的节点
        let blacklist = /IPv6|回国|过期|官网|剩余|到期|测速|Kb|Mb|群|关注|定制/i;
        return !blacklist.test(line);
    });
    
    // 3. 重命名逻辑（可根据需要添加或修改替换规则）
    let renamedLines = filteredLines.map(line => {
        // 示例：将某些特定后缀或词汇进行美化重命名
        return line
            .replace(/V2Server - /g, "") // 去除冗余前缀
            .replace(/\[原生\]/g, " ⚡原生"); // 统一美化“原生”标记
    });
    
    // 4. 数量限制：只保留前 50 个优质节点（可按需调整数字）
    let limitedLines = renamedLines.slice(0, 50);
    
    // 5. 重新拼合并进行 Base64 编码输出
    let result = limitedLines.join("\n");
    $done({ body: btoa(unescape(encodeURIComponent(result))) });

} catch (e) {
    console.log("Advanced Filter Error: " + e);
    $done({ body: body });
}
