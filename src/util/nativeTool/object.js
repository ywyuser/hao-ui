/**
 * @description: 将第二个对象合并到第一个对象
 * @param {number} FirstOBJ
 * @param {number} SecondOBJ
 */

function mergeObject(FirstOBJ, SecondOBJ){
  for (var key in SecondOBJ) {
      FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() ===
      "[object Object]" ? mergeObject(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
  }
  return FirstOBJ;
}
mergeObject.code=`
/**
 * @description: 将第二个对象合并到第一个对象
 * @param {number} FirstOBJ
 * @param {number} SecondOBJ
 */

function mergeObject(FirstOBJ, SecondOBJ){
  for (var key in SecondOBJ) {
      FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() ===
      "[object Object]" ? mergeObject(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
  }
  return FirstOBJ;
}
`
function clone(obj){
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
clone.code=`
function clone(obj){
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
`

export default {
  mergeObject,
  clone
};
