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

export default {
  mergeObject
};
