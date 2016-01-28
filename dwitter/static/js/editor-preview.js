document.addEventListener('DOMContentLoaded', function() {
     // your code here
  var editor = document.querySelector('#editor');
  oldCode = editor.value;
  replaceIframe(oldCode);
  editor.addEventListener('keyup', function() {
    if(editor.value == oldCode) {
      return;
    }
    editor.size = Math.max(editor.value.length, 1);
    replaceIframe(editor.value);
    oldCode = editor.value;
  });

  function replaceIframe(code) {
    var iframe = document.createElement('iframe');
    iframe.sandbox = 'allow-scripts';
    var iframeContent = encodeURIComponent(
      '<!DOCTYPE html>' +
      '<head>' +
      '<style>' +
      '* {padding:0;margin:0;border:0;outline:0;overflow:hidden}' +
      'canvas {' +
        'width: 100%;' +
      'background: white;' +
      '}' +
      '</style>' +
      '</head>' +
      '<body>' +
      '<canvas id=c></canvas>' +
      '<script>' +
      'var c = document.querySelector("#c");' +
      'c.width = 1920;' +
      'c.height = 1080;' +
      'var S = Math.sin;' +
      'var C = Math.cos;' +
      'var T = Math.tan;' +
      'var R = function(r,g,b,a) {' +
        'a = a === undefined ? 1 : a;' +
          'return "rgba("+(r|0)+","+(g|0)+","+(b|0)+","+a+")";' +
          '};' +
          'var x = c.getContext("2d");' +
          'var startT = +new Date(); ' +
          'function u(t) {' +
            code +
              '};' +
              'function loop() {' +
                'requestAnimationFrame(loop);' +
                  'u((new Date() - startT) / 1000);' +
                  '};' +
                  'loop();' +
                  '</scr' + 'ipt>');
    iframe.src = 'data:text/html;charset=utf-8,' + iframeContent;
    var container = document.querySelector('#iframe-container-submit');
    container.innerHTML = '';
    container.appendChild(iframe);
      }
  }, false);

