window.f = window.fetch;
window.downloaded = [];
var __MUSIC_TYPES = ['m4a', 'mp3'];
var __NODE_SERVER = 'http://localhost:3000';
function _downloadFile(url, fileType) {
  const a = document.querySelector('#g_player .name');
  const name = a.innerHTML;
  const b = document.querySelector('#g_player .by > span');
  const songer = b.getAttribute('title').replace(/\//g, ',');

  const filename = `${name}-${songer}.${fileType}`;

  console.log('检测到歌曲信息: ' + `${name}-${songer}`);
  console.log('歌曲地址：' + url);

  window.downloaded.push(url);
  window.f(`${__NODE_SERVER}/download?filename=${filename}&url=${url}`)
}
function _isMusic(url) {
  if (window.downloaded.includes(url)) {
    return;
  }
  const fileType = (url.split('.') || []).pop();
  if (__MUSIC_TYPES.includes(fileType)) {
    _downloadFile(url, fileType);
  }
}
window.fetch = function (...args) {
  const url = args[0];
  _isMusic(url);
  return window.f(...args);
}