// Shadowrocket http-response 脚本模板
let body = $response.body;

try {
    // 1. 对返回的订阅内容进行 Base64 解码
    let decoded = decodeURIComponent(escape(atob(body)));
    
    // 2. 按行分割节点
    let lines = decoded.split(/\r?\n/).filter(line => line.trim() !== "");
    
    // 3. 过滤掉包含特定垃圾关键词的节点
    let filteredLines = lines.filter(line => {
        let blacklist = /过期|官网|剩余|测速|到期|Kb|Mb/;
        return !blacklist.test(line);
    });
    
    // 4. 重新拼合并进行 Base64 编码
    let result = filteredLines.join("\n");
    $done({ body: btoa(unescape(encodeURIComponent(result))) });

} catch (e) {
    console.log("Filter Error: " + e);
    $done({ body: body });
}
