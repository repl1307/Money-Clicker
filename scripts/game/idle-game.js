import { FallingMoneyManager } from './fallingMoney.js';
import PurchaseQuantityManager from './purchaseQuantity.js';
import handleSmallScreen from './smallScreen.js';

window.saveData = true;
class Game {
  constructor(){
    this.upgrades = {};
    this.time = Date.now();
    this.totalMoney = 0;
    this.name;
    this.clickCount = 0;
    this.clickIncome = 1;
    this.fallingMoneyManager = new FallingMoneyManager();
    this.handleSmallScreen = handleSmallScreen;
    window.addEventListener('resize', this.handleSmallScreen);
    this.handleSmallScreen();
    //purchase quantity functionality
    const purchaseQuantity = document.getElementById('purchase-quantity');
    for(let i = 0; i < purchaseQuantity.children.length; i++){
      purchaseQuantity.children[i].addEventListener('click', e => {
        this.changePurchaseMode(10 ** i);
      });
    }
    this.purchaseMode = 1;
    this.changePurchaseMode = mode => {
      if(mode == this.purchaseMode){ return; }
      this.purchaseMode = mode;
      this.updateUpgradeDisplay();
      console.log('The new mode is '+mode+'!');
    };    
    //add clicker functionality
    document.querySelector('.clicker-image-container button').onclick = () => {
      this.totalMoney+=this.clickIncome;
      this.clickCount++;
      this.updateMoneyDisplay();
    }
    Number.prototype.format = function(decimalPlaces=2){
      return this.valueOf().toLocaleString('en-US', {minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces})
    }
  }
  //get revenue per second of upgrade, if no param provided, returns total income per second
  getIncomePerSecond(selectedUpgrade=null){
    let incomePerSecond = 0;
    if(selectedUpgrade == null){
      for(const upgrade of Object.values(this.upgrades)){
        incomePerSecond += upgrade.income*upgrade.quantityOwned/upgrade.interval;
      }
    }
    else{
      const upgrade = selectedUpgrade;
      incomePerSecond = upgrade.income*upgrade.quantityOwned/upgrade.interval;
    }
    return incomePerSecond;
  }
  //update popup content of upgrade
  updatePopUpContent(upgrade){
    let content = '';
    let totalIncomePercent = (this.getIncomePerSecond(upgrade)/this.getIncomePerSecond()*100).format();
    if(isNaN(totalIncomePercent)){ totalIncomePercent = '0.00'}
    content += '<p>Income Per Second: $'+this.getIncomePerSecond(upgrade).format()+'</p>'
    content += '<p>% of Total Income: '+totalIncomePercent+'</p>';
    return content;
  }
  //update money display
  updateMoneyDisplay(){
    document.querySelector('.clicker-container h1').textContent = this.name+'\'s Ethical Money-Making Operation ($'+this.totalMoney.format()+')';
    document.querySelector('.clicker-container p').textContent = '$'+this.getIncomePerSecond().format()+' per second';
  }
  //update upgrade display
  updateUpgradeDisplay(){
    for (const upgrade of Object.values(this.upgrades)) {
       upgrade.purchaseButton.textContent = 'Purchase ($'+(upgrade.price*this.purchaseMode).format()+')';
    }
  }
  //create an upgrade provided the name, amount of money added per second, and initial price
  // a custom image can also be provided, by giving the path as a string
  addUpgrade(name="N/A", customDescription="Gives Money", income=1, price=10, customOpts={interval: 1, imageSrc: "/images/money.png"}){
    let interval = customOpts.interval || 1;
    let imageSrc = customOpts.imageSrc || "/images/money.png"
    const upgradeDiv = document.createElement('div');
    upgradeDiv.classList.add('upgrade');
  
    const upgradeImageContainer = document.createElement('div');
    const upgradeImage = document.createElement('img');
    upgradeImageContainer.classList.add('upgrade-image');
    upgradeImage.src = imageSrc;
    upgradeImageContainer.appendChild(upgradeImage);
  
    const upgradeInfoContainer = document.createElement('div');
    const header = document.createElement('h4');
    const description = document.createElement('p');
    const revenue = document.createElement('p');
    const owned = document.createElement('p');
    const purchaseButton = document.createElement('button');
  
    upgradeInfoContainer.classList.add('upgrade-info');
    header.textContent = name;
    if(interval == 1)
      revenue.textContent = `Adds $${income.format()} every second`;
    else
      revenue.textContent = `Adds $${income.format()} every ${interval} seconds`;
      
    description.textContent = customDescription;
    owned.textContent = 'Owned: 0';
    purchaseButton.textContent = 'Purchase ($'+price.format()+')';
    purchaseButton.dataset.name = name;
    const game = this;
    purchaseButton.onclick = (e) => {
      const upgrade = game.upgrades[purchaseButton.dataset.name];
      if(this.totalMoney < upgrade.price * this.purchaseMode){
        alert("You are too broke to purchase this");
        return;
      }
      this.totalMoney -= upgrade.price * this.purchaseMode;
      upgrade.price *= 1.017 * this.purchaseMode;
      upgrade.quantityOwned += this.purchaseMode;
      purchaseButton.textContent = 'Purchase ($'+upgrade.price.format()+')';
      upgrade.owned.textContent = 'Owned: '+upgrade.quantityOwned;
      this.updateUpgradeDisplay();
      for(const upgrade of Object.values(this.upgrades))
        upgrade.popup.setContent(this.updatePopUpContent(upgrade));
    };
    
    upgradeInfoContainer.appendChild(header);
    upgradeInfoContainer.appendChild(description);
    upgradeInfoContainer.appendChild(revenue);
    upgradeInfoContainer.appendChild(owned);
    upgradeInfoContainer.appendChild(purchaseButton)
  
    
    upgradeDiv.appendChild(upgradeImageContainer);
    upgradeDiv.appendChild(upgradeInfoContainer);
  
    document.querySelector('.upgrades-container').appendChild(upgradeDiv);

    this.upgrades[name] = { 
      income, 
      price, 
      imageSrc, 
      revenue, 
      description, 
      purchaseButton, 
      owned, 
      quantityOwned: 0,
      interval,
      time: this.time,
    };
    const upgrade = this.upgrades[name];
    this.upgrades[name].popup = tippy(upgradeDiv, {
      arrow: false,
      trigger: 'mouseenter',
      content: this.updatePopUpContent(upgrade),
      followCursor: true,
      hideOnClick: false,
      allowHTML: true,
      theme: 'money',
    });
    for(const upgrade of Object.values(this.upgrades)){
        // log(this.getIncomePerSecond(upgrade));
    }
    return this.upgrades[name];
  }
  //game update loop
  gameLoop(){
    const currentTime = Date.now(); 
    const secondsDiff  = (currentTime - this.time) / 1000;
    //execute upgrade check every second
    if (secondsDiff >= 1){
      //loop throught upgrades and update totalMoney based off of upgrade interval
      for(const upgrade of Object.values(this.upgrades)){
        const secondsDiff = (currentTime - upgrade.time) / 1000;
        if(secondsDiff >= upgrade.interval){
          this.totalMoney += upgrade.quantityOwned * upgrade.income * Math.floor(secondsDiff);
          upgrade.time = Date.now();
        }
      }
      this.updateMoneyDisplay();
      this.time = Date.now();
    }
    requestAnimationFrame(() => {this.gameLoop()});  
  }
  
  //get user inputted name and start game loop
  startGame(){
    this.localStorageAvailable = ()=>{
    const test = 'test';
      try {
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return true;
      } catch(e) {
          return false;
      }
    };
    const localStorageAvailable = this.localStorageAvailable();
    console.log('Local Storage is: '+(localStorageAvailable? 'available': 'not available'));
    //check if name has been stored
    if(localStorageAvailable && localStorage.getItem('name')){
      this.name = localStorage.getItem('name');
    }
    else{
      this.name = prompt('Please enter your name');
      if(this.name == '' || typeof this.name == 'object'){
        this.name = 'Someone';
      }
      if(localStorageAvailable)
        localStorage.setItem('name', this.name);
    }
    //if money has been stored
    if(localStorageAvailable && localStorage.getItem('totalMoney')){
      this.totalMoney = parseFloat(localStorage.getItem('totalMoney'));
    }
    //if time has been stored
    if(localStorageAvailable && localStorage.getItem('time')){
      this.time = Number(localStorage.getItem('time'));
    }
    //if upgrades have been stored
    if(localStorageAvailable && localStorage.getItem('upgrades')){
      const upgrades = JSON.parse(localStorage.getItem('upgrades'));
      for(const [key, value] of Object.entries(upgrades)){
        const upgrade = this.upgrades[key];
        upgrade.quantityOwned = value.quantityOwned;
        upgrade.imageSrc = value.imageSrc;
        upgrade.price = value.price;
        upgrade.time = value.time;
        upgrade.interval = value.interval;
        upgrade.owned.textContent = 'Owned: '+upgrade.quantityOwned;
        upgrade.purchaseButton.textContent = 'Purchase ($'+upgrade.price.format()+')';
        upgrade.popup.setContent(this.updatePopUpContent(upgrade));
      }
    }
    //update local storage on page close
    window.onbeforeunload = (e) => {
      if(this.localStorageAvailable() && saveData){
        localStorage.setItem('totalMoney', this.totalMoney);
        localStorage.setItem('time', this.time);
        for(const upgrade of Object.values(this.upgrades)){
          upgrade.popup.destroy();
          delete upgrade.popup;
        }
        localStorage.setItem('upgrades', JSON.stringify(this.upgrades));
      }
    }
    this.updateMoneyDisplay();
    this.gameLoop();
  }

}

console.log('yes')
export default Game;