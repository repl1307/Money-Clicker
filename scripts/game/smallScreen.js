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
    clickerContainer.style.minHeight = '95vh';
    document.querySelector('.game-header').style.height = '8vh';
    document.querySelector('.clicker-image-container button').style.height = '50vmin';
    document.querySelector('.clicker-image-container button').style.width = '100%';
    document.getElementById('reset-storage').style.bottom = '10px';
    document.querySelector('.game-header').style.fontSize = '8vmin';
    document.querySelector('.clicker-container h1').style.fontSize = '6vmin';
    document.querySelector('.clicker-container p').style.fontSize = '5vmin';
    document.querySelector('.clicker-image-container').style.marginTop = '50%';
  }
  else{
    document.querySelector('.clicker-image-container button').style.height = '50min';
    document.querySelector('.clicker-image-container button').style.width = '100%';
    mainContainer.style.height = '100vh';
    gameContainer.style.flexDirection = 'row';
    upgradeContainer.style.minWidth = '30%';
    upgradeContainer.style.display = 'flex';
    gameContainer.style.overflow = 'hidden';
    mainContainer.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    clickerContainer.style.width = '70%';
    clickerContainer.style.minHeight = '0';
    clickerContainer.style.width = 'auto';
    document.querySelector('.game-header').style.height = '';
    document.querySelector('.clicker-image-container').style.marginTop = 0;
    document.getElementById('reset-storage').style.bottom = '15px';
    document.querySelector('.game-header').style.fontSize = '6vmin';
    document.querySelector('.clicker-container h1').style.fontSize = '4vmin';
    document.querySelector('.clicker-container p').style.fontSize = '3.5vmin';
  }

}

