export default function handleSmallScreen(){
  const gameContainer = document.querySelector('.game-container');
  const mainContainer = document.querySelector('.main-container');
  const clickerContainer = document.querySelector('.clicker-container');
  const upgradeContainer = document.querySelector('.upgrades-container');
  
  if(innerWidth <= 750){
    mainContainer.style.height = 'auto';
    gameContainer.style.flexDirection = 'column';
    upgradeContainer.style.minWidth = '100%';
    upgradeContainer.style.display = 'flex';
    upgradeContainer.style.overflowX = 'hidden';
    gameContainer.style.height = 'fit-content';
    document.body.style.overflowY = 'visible';
    document.body.style.overflowX = 'hidden';
    clickerContainer.style.width = '100vw';
    document.querySelector('.game-header').style.height = '8vh';
    document.querySelector('.game-header').style.fontSize = '8vmin'
    const headerHeight = document.querySelector('.game-header').getBoundingClientRect().height;
    clickerContainer.style.minHeight = 'calc('+innerHeight+'px - '+headerHeight+'px )';
    clickerContainer.style.maxHeight = 'calc('+innerHeight+'px - '+headerHeight+'px )';
    console.log(headerHeight);
    document.querySelector('.clicker-image-container button').style.height = '90vmin';
    document.querySelector('.clicker-image-container button').style.width = '100%';
    document.getElementById('reset-storage').style.bottom = '10px';
    document.querySelector('.clicker-container h1').style.fontSize = '6vmin';
    document.querySelector('.clicker-container p').style.fontSize = '5vmin';
  }
  else{
    document.querySelector('.clicker-image-container button').style.height = '70vmin';
    document.querySelector('.clicker-image-container button').style.width = 'auto';
    mainContainer.style.height = '100vh';
    gameContainer.style.flexDirection = 'row';
    upgradeContainer.style.minWidth = '30%';
    upgradeContainer.style.display = 'flex';
    gameContainer.style.overflow = 'hidden';
    mainContainer.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    clickerContainer.style.minWidth = '70%';
    document.querySelector('.game-header').style.height = '';
    document.querySelector('.game-header').style.fontSize = '6vmin';
    document.querySelector('.clicker-container h1').style.fontSize = '4vmin';
    document.querySelector('.clicker-container p').style.fontSize = '3.5vmin';
  }

}

