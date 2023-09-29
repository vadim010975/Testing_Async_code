import read from './reader';
import json from './parser';

export default class GameSavingLoader {
  static async load() {
    try {
      return JSON.parse(await json(await read()));
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e);
      });
    }
  }
}
