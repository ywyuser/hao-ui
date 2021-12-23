/*
 * @Author: yuan wenyu
 * @Version: 1.0.1
 * @Date: 2021-09-16 15:37:48
 * @LastEditors: yuan wenyu
 * @LastEditTime: 2021-12-16 15:28:55
 * @Description: 
 */

function parseTag(sign) {
  let signre=sign.replace( /[\"|']([A-Za-z0-9]|_|-)+(?!\")(\s+)\S+[\"|']/g,(...a)=>{
  return a[0].replace(/\s+/g,"^")
  }).replace(/\"/g,"")

  sign=signre
  // sign = sign.replace(/^\s*/g, "").replace(/\"/g, "");
  console.log('sign',sign);
  
  let mark = sign.match(/([a-zA-Z0-9]|-)+\s*/)[0].replace(/\s/g, ""); // 记录标签
  console.log('mark',mark);
  
  // 标签上定义的属性获取
  let parse = RegExp("<"+mark + "|/>|>","g");
  let attributeStr = sign.replace(parse, '').replace(/\s+/g, ",").split(",");
  console.log('attributeStr',attributeStr);
  
  let attrbuteObj = {};
  let style = {};
  attributeStr.map(attr => {
    if (attr) {
      let value = attr.split("=")[1];
      let key = attr.split("=")[0];
      if (key === "style") {
        value.split(";").map(s => {
          if (s) {
      

              style[s.split(":")[0]] = s.split(':')[1]

          }
        })
        return attrbuteObj[key] = style;
      }
      attrbuteObj[key] = value.split('^');
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
  const htmlStr1 = htmlStr0.match(/<[^>]+>/gi) //获取标签
  let result = { nodeName: "root", children: [] };
  parseHtml(htmlStr1, result)
  console.log(htmlStr1);

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

