const game = new Game();
//example upgrades
game.addUpgrade("Change Collecter", "This guy collects coins he finds on the street and gives them to you.", 0.5, 15);
game.addUpgrade("Thug", "This guy goes around and politely asks people for their money.", 5, 100);
game.addUpgrade("Indian Scammer", "Hello Paul, your car insurance has expired.", 100, 1000, {interval: 2});
game.addUpgrade("Money Printer", "This guy magically prints free money.", 1000, 10000, {interval: 3});
game.addUpgrade("Money Factory", "Remember that money printer guy from before? He's got a factory now.", 10000, 150000, {interval: 3})
game.startGame();
