let nbImg = 4
let mobileWrapper = document.querySelector('.mobile-wrapper')
let data = [
  ["#branding","2020","Paralelle","In this school project, we had to write and design a press magazine from scratch.<br> We chose to write our magazine about the paralelle between sciences and arts.","img/project/0.jpg","https://www.behance.net/gallery/92923891/Magazine-Parallele"],
  ["#dev","2019","Karma","Our answer to a human problem : submarine pollution","img/project/2.jpg","https://www.behance.net/gallery/92868333/Apple-Homepod-concept-website"],
  ["#ui","2018","tst","Our answer to a human problem : submarine pollution","img/project/3.jpg","https://www.behance.net/gallery/92923891/Magazine-Parallele"],
  ["#3D","2017","tst2","bonjour merci aurevoir","img/project/0.jpg","https://www.behance.net/gallery/92923891/Magazine-Parallele"]
]

function setImg(){
  for(let i=0;i<nbImg;i++){
    let link = document.createElement('a')
    link.setAttribute('href',data[i][5])
    link.setAttribute('target','_blank')
    let image = document.createElement('img')
    link.setAttribute('data-id',i)
    link.classList.add('project-img')
    image.setAttribute('src',data[i][4])
    link.appendChild(image)
    mobileWrapper.appendChild(link)
  }
}
let slide= document.querySelector('.slide')
let info= document.querySelector('.info')
let navSlider = document.querySelector('#nav-slider')
document.body.addEventListener('mousemove',function(event){
  let x = (event.clientX - (document.body.offsetWidth/2))/60
  let y = (event.clientY - (document.body.offsetHeight/2))/60
  slide.style.transform="translate("+-x*2+"px,"+-y*2+"px)"
  info.style.transform="translate("+(-x)+"px,"+(-y)+"px)"
  navSlider.style.transform="translate("+(-x)+"px,"+(-y)+"px)"
})

setImg()

class projectSlider{
  constructor(){
    this.btnNext=document.querySelector('#btn-next')
    this.btnPrev=document.querySelector('#btn-prev')
    this.mobilePrev=document.querySelector('#mobile-prev')
    this.mobileNext=document.querySelector('#mobile-next')
    this.imgWrapper = document.querySelector('.images-container')
    this.mobileWrapper = mobileWrapper
    this.nbImg = this.mobileWrapper.childElementCount
    this.mobileTranslateIncrementUnit = 100 / this.nbImg
    this.mobileTranslateIncrement
    this.curIndex=0
    this.sliderNav=document.querySelector('#slider-nav')
    this.sliderNavItems=[]
    this.imgAray=document.querySelectorAll('.project-img')
    this.imgHeight = document.querySelector('.project-img').getBoundingClientRect().height
    this.imgWidth = document.querySelector('.project-img').getBoundingClientRect().width
    this.imgIncr = this.imgHeight/2
    this.info = document.querySelector('.info')
    this.headline = document.querySelector('.headline')
    this.context= document.querySelector('#context')
    this.tag = document.querySelector('#tag')
    this.year = document.querySelector('#year')
    this.title = document.querySelector('#title')
    this.desc = document.querySelector('#desc')
    this.data = data
    this.link = document.querySelector('#project-trigger')
    this.projectModal= document.querySelector('#project')
    this.closeModalBtn = document.querySelector('#btn-back')
  }
  init(){
    let that = this
    this.btnNext.addEventListener('click',function(){that.seek(that.curIndex+1,that)},false)
    this.mobileNext.addEventListener('click',function(){that.seek(that.curIndex+1,that)},false)
    this.btnPrev.addEventListener('click',function(){that.seek(that.curIndex-1,that)},false)
    this.mobilePrev.addEventListener('click',function(){that.seek(that.curIndex-1,that)},false)
    this.closeModalBtn.addEventListener('click',function(){
      that.projectModal.classList.remove('project-active')
    })
    this.setNav(that)
    this.setInfo(that)
  }
  setNav(that){
    for(let e of that.imgAray){
      let point = document.createElement('div')
      point.innerHTML="0"+e.getAttribute('data-id')
      point.setAttribute('data-id',e.getAttribute('data-id'))
      that.sliderNav.appendChild(point)
      point.addEventListener('click',function(){that.seek(parseInt(point.getAttribute('data-id')),that)})
      that.sliderNavItems.push(point)
    }
  }
  checkNav(that){
    for(let e of that.sliderNavItems){
      e.classList.remove('nav-active')
    }
    that.sliderNavItems[that.curIndex].classList.add('nav-active')
  }
  setBtn(that){
    if(this.curIndex+2>this.nbImg){
      this.btnNext.classList.add('btn-hidden')
      this.mobileNext.classList.add('btn-hidden')
      this.btnPrev.classList.remove('btn-hidden')
      this.mobilePrev.classList.remove('btn-hidden')
    }
    else if (this.curIndex-1<0) {
      this.btnPrev.classList.add('btn-hidden')
      this.mobilePrev.classList.add('btn-hidden')
      this.btnNext.classList.remove('btn-hidden')
      this.mobileNext.classList.remove('btn-hidden')
    }
    else {
      this.btnNext.classList.remove('btn-hidden')
      this.mobileNext.classList.remove('btn-hidden')
      this.btnPrev.classList.remove('btn-hidden')
      this.mobilePrev.classList.remove('btn-hidden')
    }
  }
  setInfo(that){
    that.setBtn(that)
    that.checkNav(that)
    that.context.classList.toggle('hidden-context')
    that.title.classList.toggle('hidden-title')
    that.desc.classList.toggle('hidden-desc')

    setTimeout(function(){
      that.tag.innerHTML=that.data[that.curIndex][0]
      that.year.innerHTML=that.data[that.curIndex][1]
      that.title.innerHTML=that.data[that.curIndex][2]
      that.desc.innerHTML=that.data[that.curIndex][3]
    }, 330);
    setTimeout(function(){
      that.context.classList.toggle('hidden-context')
      that.title.classList.toggle('hidden-title')
      that.desc.classList.toggle('hidden-desc')
    }, 600);
    document.querySelector('.project-img[data-id="'+this.curIndex+'"]').classList.toggle('img-active')
    that.link.setAttribute('data-id',document.querySelector('.img-active').getAttribute('data-id'))
    that.link.setAttribute('href',data[document.querySelector('.img-active').getAttribute('data-id')][5])
  }
  seek(target,that){
    if(document.body.offsetWidth < 960){
      if(target>=this.nbImg || target<0 || this.projectModal.classList=="project-active"){
      }
      else{ 
        document.querySelector('.project-img[data-id="'+this.curIndex+'"]').classList.toggle('img-active')
        this.curIndex=target
        this.mobileTranslateIncrement = this.mobileTranslateIncrementUnit*target
        this.setInfo(this)
        this.imgWrapper.setAttribute( "style", "transform: translateX(-"+this.mobileTranslateIncrement+"%)!important" );
      }
    }
    else
    {
      this.imgHeight = document.querySelector('.project-img').getBoundingClientRect().height
      if(target>=this.nbImg || target<0 || this.projectModal.classList=="project-active"){
      }
      else{
        document.querySelector('.project-img[data-id="'+this.curIndex+'"]').classList.toggle('img-active')
        this.curIndex=target
        this.imgIncr = (this.imgHeight/2)+this.imgHeight*target+20*target
        this.setInfo(this)
        this.imgWrapper.setAttribute( "style", "transform: translateY(calc(50% - "+that.imgIncr+"px))!important" );
      }
    }
  }
}
let slider = new projectSlider();
slider.init()

var resizeId;
window.addEventListener('resize', function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 1200);
    resizeId = setTimeout(doneResizing, 1201);
    resizeConcrete = setTimeout(doneResizing, 1205);
});

function doneResizing(){
  console.log('ok')
    slider.seek(slider.curIndex,slider)
}

window.addEventListener('wheel', function(event)
{
 if (event.deltaY < 0)
 {
  slider.seek(slider.curIndex-1,slider)
 }
 else if (event.deltaY > 0)
 {
  slider.seek(slider.curIndex+1,slider)
 }
});