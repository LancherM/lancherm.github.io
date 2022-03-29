function getPercent(){
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight=document.documentElement.scrollHeight
  const clientHeight=document.documentElement.clientHeight
  document.getElementById('top-scroll-bar').innerHTML= ((scrollTop/(scrollHeight-clientHeight))*100).toFixed(0) + '%'
}

getPercent();
document.addEventListener('scroll', getPercent)


