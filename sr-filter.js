let body = $response.body;
try {
    let lines = body.split(/\r?\n/).filter(line => line.trim() !== "");
    let filteredLines = lines.filter(line => {
        let blacklist = /IPv6|回国|过期|官网|剩余|到期|测速|Kb|Mb|群|关注|定制/i;
        return !blacklist.test(line);
    });
    let limitedLines = filteredLines.slice(0, 50);
    let result = limitedLines.join("\n");
    $done({ body: result });
} catch (e) {
    console.log("Error: " + e);
    $done({ body: body });
}
