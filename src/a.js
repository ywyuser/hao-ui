let _ = require('lodash');

console.log(_.assign({d:2},{g:3}));
var clone = function(obj){
  if(obj === null) return null;
  if(obj.constructor !== 'object') return obj;
  if(obj.constructor === Date) return new Date(obj);
  if(obj.constructor === RegExp) return new RegExp(obj);
  var newObj = new obj.constructor(); //保持继承的原型
  for(var key in obj){
      if(obj.hasOwnProperty(key)){
          var val = obj[key];
          newObj[key] = typeof val === 'object' ? arguments.callee(val):val;
      }
  }
  return newObj;
}
var a = {
  a:function(){console.log('hello world')},
  b:{c:1},
  c:[1,2,3],
  d:'tang',
  e:new Date(),
  f:null,
  g:undefined
}
var b = clone(a);
console.log(b)
var value = `
  <img11 class="item1"></img11>
  <img11/>
  <div11 class="item2" info="质感边框">
     <div22 class="item3" style="bd:dd;d:dd" ><div33></div33></div22>
  </div11>
  <img11 class="item4"/>
  `

  console.log('dddd'.indexOf(""));
