// Shadowrocket 明文订阅过滤、重命名与数量限制脚本
let body = $response.body;

try {
    // 1. 因为 free18 返回的是明文，直接按行分割节点，不需要 atob 解码
    let lines = body.split(/\r?\n/).filter(line => line.trim() !== "");
    
    // 2. 过滤逻辑：剔除包含 IPv6、回国、测速、广告等不需要的节点
    let filteredLines = lines.filter(line => {
        let blacklist = /IPv6|回国|过期|官网|剩余|到期|测速|Kb|Mb|群|关注|定制/i;
        return !blacklist.test(line);
    });
    
    // 3. 重命名逻辑（可根据需要添加或修改替换规则）
    let renamedLines = filteredLines.map(line => {
        return line
            .replace(/V2Server - /g, "") 
            .replace(/\[原生\]/g, " ⚡原生"); 
    });
    
    // 4. 数量限制：只保留前 50 个优质节点
    let limitedLines = renamedLines.slice(0, 50);
    
    // 5. 直接拼合明文输出
    let result = limitedLines.join("\n");
    $done({ body: result });

} catch (e) {
    console.log("Plaintext Filter Error: " + e);
    $done({ body: body });
}
