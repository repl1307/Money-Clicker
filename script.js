import Game from './scripts/game/idle-game.js';

const game = new Game();

// const img = document.createElement('img');
// let inAnim = false;
// img.classList.add('cursor-animation');
// img.src = 'test.gif';
// img.style.display = 'none';
// document.body.appendChild(img);

// document.addEventListener('click', e => {
//   if(inAnim){ return; }
//   inAnim = true;
//   img.style.left = (e.clientX-30) + 'px';
//   img.style.top = (e.clientY-30) + 'px'; 
//   img.style.display = 'block';
//   img.src =''
//   img.src = 'test.gif';
//   setTimeout(() => {
//     if(inAnim){
//       inAnim = false;
//       img.style.display = 'none';
//     }
//   }, 500);
// });
//example upgrades
game.addUpgrade("Change Collecter", "This guy collects coins he finds on the street and gives them to you.", 0.5, 15);
game.addUpgrade("Thug", "This guy goes around and politely asks people for their money.", 5, 100);
game.addUpgrade("Indian Scammer", "Hello Paul, your car insurance has expired.", 100, 1000, {interval: 2});
game.addUpgrade("Money Printer", "This guy magically prints free money.", 1000, 10000, {interval: 3});
game.addUpgrade("Money Factory", "Remember that money printer guy from before? He's got a factory now.", 10000, 150000, {interval: 3})
game.startGame();
