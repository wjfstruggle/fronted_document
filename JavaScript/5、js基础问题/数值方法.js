let arr = [
  {
    a:1,
    b:2,
    c:3
  },{
    a:1,
    b:4,
    c:5
  }
]
function duplicates(arr) {
  return arr.filter((e,i) => arr.indexOf(e.a=1)!==arr.lastIndexOf(e.a=1) && arr.indexOf(e.a=1)===i);
}
// console.log(duplicates(arr));

//方式一 利用map判断
function isExistInObj1(arr,key) {
	if([new Set(arr.map(item=>item.a))].size < arr.length){
	    console.log('重复')
	}else{
		console.log('无重复');
	}
}
// isExistInObj1(arr)

var mapArr = arr.map(item=>item.a);
var setArr = new Set(mapArr);//去重复
console.log(setArr .size<mapArr.length?'有重复':'无重复');