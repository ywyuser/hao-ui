
function parseTag(sign) {
  sign = sign.replace(/^\s*/g, "").replace(/\"/g, "");
  let mark = sign.match(/([a-zA-Z0-9]|-)+\s*/)[0].replace(/\s/g, ""); // 记录标签
  // 标签上定义的属性获取
  let parse = RegExp("<"+mark + "|/>|>","g");
  let attributeStr = sign.replace(parse, '').replace(/\s+/g, ",").split(",");
  let attrbuteObj = {};
  let style = {};
  attributeStr.map(attr => {
    if (attr) {
      let value = attr.split("=")[1];
      let key = attr.split("=")[0];
      if (key === "style") {
        value.split(";").map(s => {
          if (s) {
            style[s.split(":")[0]] = s.split(":")[1]
          }
        })
        return attrbuteObj[key] = style;
      }
      attrbuteObj[key] = value;
    }
  })
  return { nodeName: mark, children: [], ...attrbuteObj }
}
function parseHtml(htmlStr, result,head=0) {
  while (head <= htmlStr.length - 1) {
    if(htmlStr[head].indexOf("</")> -1 ){
      head = head + 1
      break
    } else if (htmlStr[head].match(/\/\s*>/)) {
      result.children.push(parseTag(htmlStr[head]))
      head = head + 1
    }else if (head < htmlStr.length - 1 && htmlStr[head + 1].indexOf("</") > -1 && (htmlStr[head + 1].match(/^[a-zA-Z0-9]*\s*/)[0].replace(/\s/g, "") === htmlStr[head].match(/^[a-zA-Z0-9]*\s*/)[0].replace(/\s/g, ""))) {
      result.children.push(parseTag(htmlStr[head]))
      head = head + 2
    } else{
      result.children.push(parseTag(htmlStr[head]))
      head = parseHtml(htmlStr,result.children[result.children.length-1],head+1)
    }
  }
  return head
}
function htmlToObj(htmlStr0) {
  const htmlStr1 = htmlStr0.match(/<[^>]+>/gi)
  let result = { nodeName: "root", children: [] };
  console.log(htmlStr1);
   parseHtml(htmlStr1, result)
   return result
}
// console.dir(htmlStrParser(htmlStr))
// fs.writeFileSync("htmlObj.text", JSON.stringify(htmlStrParser(htmlStr)))

function objToHtml(obj) {
  let htmlStr = "";
  function work(obj) {
    const children = obj.children;
    let attrStr = "";
    Object.keys(obj).map(key => {
      if (key !== 'nodeName' && key !== 'text' && key !== "children") {
        if (key !== 'style') {
          attrStr += ` ${key}=${obj[key]}`
        } else if (key === 'style') {
          let styleStr = '';
          Object.keys(obj[key]).map(k => {
            styleStr += ` ${k}:${obj[key][k]};`
          })
          attrStr += styleStr;
        }
      }
    })
    htmlStr += `<${obj.nodeName}${attrStr}>${obj.text ? obj.text : ''}`;
    if (children && children.length) {
      children.map(c => {
        work(c)
      });
    }
    htmlStr += `</${obj.nodeName}>`;
  }
  work(obj);
  return htmlStr;
}
// objToHtml(require("demo.text"))


export {
  htmlToObj,
  objToHtml
};

