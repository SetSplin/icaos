var asmEditor = CodeMirror.fromTextArea(document.getElementById("asm"), {
    lineNumbers: true,
    matchBrackets: true,
    // viewportMargin: Infinity,
    autoCloseBrackets: '()[]{}\'\'""',
    mode:  "gas",
});

var cEditor = CodeMirror.fromTextArea(document.getElementById("c"), {
    lineNumbers: true,
    matchBrackets: true,
    // viewportMargin: Infinity,
    autoCloseBrackets: '()[]{}\'\'""',
    mode:  "text/x-csrc",
});

cEditor.on('change', function() {
  localStorage.setItem('c', cEditor.getValue());
});

asmEditor.on('change', function() {
  localStorage.setItem('asm', asmEditor.getValue());
});

function run() {
  axios.post('/run', {
      asm: asmEditor.getValue(),
      c: cEditor.getValue(),
    })
    .then(function (response) {
      document.getElementById('result').innerText = response.data;
    })
}

document.querySelector("#run").addEventListener('click', run);

if (localStorage.getItem('c')) {
  cEditor.setValue(localStorage.getItem('c'));
}

if (localStorage.getItem('asm')) {
  asmEditor.setValue(localStorage.getItem('asm'));
}


document.body.onkeydown = function(key) {
  if ((key.key === 'Enter') && (key.ctrlKey)) {
    run();
  }
};
