function handleSmallScreen(){
  const gameContainer = document.querySelector('.game-container');
  const mainContainer = document.querySelector('.main-container');
  const clickerContainer = document.querySelector('.clicker-container');
  const upgradeContainer = document.querySelector('.upgrades-container');
  if(innerWidth <= 700){
    mainContainer.style.height = 'auto';
    gameContainer.style.flexDirection = 'column';
    upgradeContainer.style.minWidth = '100%';
    upgradeContainer.style.display = 'flex';
    upgradeContainer.style.overflowX = 'hidden';
    gameContainer.style.height = 'fit-content';
    //gameContainer.style.overflowY = 'scroll';
    //mainContainer.style.overflowY = 'scroll';
    document.body.style.overflowY = 'visible';
    document.body.style.overflowX = 'hidden';
    clickerContainer.style.width = '100vw';
    clickerContainer.style.height = '90vh';
    document.querySelector('.game-header').style.height = '8vh';
    document.querySelector('.clicker-image-container button').style.height = '50vmin';
    document.querySelector('.clicker-image-container button').style.width = '100%';
    document.getElementById('reset-storage').style.bottom = '10px';
    //document.querySelector('.clicker-image-container button').style.width = '90%';
    //document.querySelector('.clicker-image-container img').style.height = '100%';
  }
  else{
    mainContainer.style.height = '100vh';
    gameContainer.style.flexDirection = 'row';
    upgradeContainer.style.minWidth = '30%';
    upgradeContainer.style.display = 'flex';
    gameContainer.style.height = '90vh';
    gameContainer.style.overflow = 'hidden';
    mainContainer.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    clickerContainer.style.width = '70%';
    clickerContainer.style.height = '90vh';
    upgradeContainer.style.height = '90vh';
    document.querySelector('.game-header').style.height = '';
    // document.querySelector('.clicker-image-container button').style.height = '50vmin';
    document.querySelector('.clicker-image-container button').style.width = '75%';
    document.getElementById('reset-storage').style.bottom = '15px';
   // document.querySelector('.clicker-image-container button img').style.height = '100%';
  }
  // const h1 = document.querySelector('.clicker-container h1');
  // const style = getComputedStyle(h1);
  // while(h1.scrollWidth > h1.clientWidth){
  //   h1.style.fontSize = (parseFloat(style.fontSize.replace('px',''))-1)+'px';
  //   console.log(getComputedStyle(h1.style.fontSize))
  // }
  // console.log(h1.scrollWidth, h1.clientWidth)
}

window.addEventListener('resize', handleSmallScreen);
handleSmallScreen();