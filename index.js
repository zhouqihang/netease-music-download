const fs = require('fs');
const path = require('path');
const request = require('request');
const http = require('http');
const querystring = require('querystring');

const PORT = 3000;

function download(url, filename) {

  const req = request(url, { timeout: 10000, pool: false });
  req.setMaxListeners(50);
  req.setHeader('user-agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36');
  req.on('error', function (err) {
    throw err;
  });
  req.on('response', function (res) {
    res.setEncoding("binary");
    let fileData = "";

    res.on('data', function (chunk) {
      fileData += chunk;
    });
    res.on('end', function () {
      fs.writeFile(path.resolve(__dirname, 'musics', filename), fileData, "binary", function (err) {
        if (err) {
          console.log("[downloadPic]文件   " + filename + "  下载失败.");
          console.log(err);
        } else {
          console.log("文件" + filename + "下载成功");
        }
      });
    });
  })

}
const server = http.createServer((req, res) => {
  const [p, query] = req.url.split('?');
  if (p === '/download') {
    const { url, filename } = querystring.parse(query);
    download(url, filename);
  }

  // 告诉客户端，我的话说完了，你可以呈递给用户了
  res.end()
});

server.listen(PORT, () => {
  console.log('ok');
})