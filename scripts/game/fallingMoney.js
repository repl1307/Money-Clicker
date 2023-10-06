//manage falling animation
function FallingMoneyManager(){
  this.createFallingMoney =function(xPos){
    const img = document.createElement('img');
    img.classList.add('falling-money');
    img.style.left = xPos;
    img.src = '/images/money.png';
    this.clickerContainer.appendChild(img);
    img.addEventListener('animationend', e => {
      const randomX = Math.floor(Math.random()*(this.width-50));
      img.style.left = (randomX)+'px';
      img.style.animationIterationCount = getComputedStyle(img).animationIterationCount+1;
  
      //10% chance of golden money and img isn't a golden money
      const chance = this.maxFallingMoneyCount/100*25;
      console.log('chance val: '+chance);
      console.log(Math.random()*this.maxFallingMoneyCount);
      if(Math.random()*this.maxFallingMoneyCount <= 10000 && !(img.dataset.goldenMoney == 'true')){
        img.dataset.goldenMoney = true;
        img.style.borderRadius = '50px';
        img.style.animation = 'freeze-fall 7s 1';
        console.log('making the golden money!!');
        const callback = e => {
          img.style.border = 'none';
          img.dataset.goldenMoney = false;
          const randomX = Math.floor(Math.random()*(this.width-50));
          img.style.animation = 'fall 7s 1';
          img.style.animationTimingFunction = 'linear';
          img.style.left = (randomX)+'px';
          try{
            img.removeEventListener('click', callback, {once: true});
          }catch(e){console.log(e)}
          try{
            img.removeEventListener('animationend', callback, {once: true});
          }catch(e){console.log(e)}
        }
        //onclick, reset animation and position
        img.addEventListener('click', callback, {once: true});
        img.addEventListener('animationend', callback, {once: true});
      }
    });
  };
  
  this.fallingMoneyCount = 0;
  this.width = document.querySelector('.clicker-container').getBoundingClientRect().width;
  this.maxFallingMoneyCount = Math.floor(this.width/100)+1;
  this.clickerContainer = document.querySelector('.clicker-container');
  this.interval = setInterval(()=>{
    if(this.fallingMoneyCount < this.maxFallingMoneyCount){
      const randomX = Math.floor(Math.random()*(this.width-50));
      this.createFallingMoney(randomX+'px');
      this.fallingMoneyCount++;
    }
  }, 1500);
}




export { FallingMoneyManager };
