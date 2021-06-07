import zznhImg from '../img/zznh.png'
export const documentHtml =() =>{
  let div = document.createElement('div')
  div.innerHTML = "hello world"
  div.className = 'box'
  document.body.appendChild(div);
  // 图片加载
  let img = new Image();
  img.src = zznhImg;
  document.body.appendChild(img);
  return div;
}