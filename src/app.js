import GameSavingLoader from './GameSavingLoader';

GameSavingLoader.load().then((saving) => {
  console.log(saving);
}, (error) => {
  console.error(error);
});
