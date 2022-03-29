// 获取唯一 ID
function getUuiD() {
  return Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
}

function addLanguage() {
  // 获取所有 figure.highlight 元素
  var hs = $("figure.highlight");
  for (var i = 0; i < hs.length; i++) {
    // 获取代码语言
    var lang = hs[i].firstChild.firstChild.firstChild.lastChild.firstChild.firstChild.classList[1];
    // 折叠块的 id
    var id = `kiyan-collapse-${getUuiD()}`;
    // 折叠按钮
    var btn = `<i class="fas fa-angle-down" type="button" data-toggle="collapse" data-target="#${id}"></i>`;
    // 代码语言
    var span = `<span>${lang}</span>`;
    // 折叠块包裹原来的内容
    var div = `<div class="collapse show" id="${id}">${hs[i].innerHTML}</div>`;
    var btndiv=`<div class="highlight-btn-container">`+btn+span+`</div>`;
    hs[i].innerHTML = btndiv + div;
  }
}

$(document).ready(addLanguage);