let body = $response.body || "";
try {
  let lines = body.split(/\r?\n/).filter(l => l.trim() !== "");
  let blacklist = /IPv6|回国|过期|官网|剩余|到期|测速|Kb|Mb|群|关注|定制|电报|日期|免费/i;
  let filtered = lines.filter(l => !blacklist.test(l)).slice(0, 50);
  $done({ body: filtered.join("\n") });
} catch (e) {
  $done({ body });
}
