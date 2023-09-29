import GameSavingLoader from '../GameSavingLoader';
import read from '../reader';

jest.mock('../reader');

beforeEach(() => {
  jest.resetAllMocks();
});

test('test class GameSavingLoader, read() returned reject', async () => {
  read.mockReturnValue(new Promise((resolve, reject) => {
    reject(new Error('readError'));
  }));
  try {
    await GameSavingLoader.load();
  } catch (error) {
    expect(error).toEqual(new Error('readError'));
  }
});

test('test class GameSavingLoader, read() returned resolve', async () => {
  read.mockReturnValue(new Promise((resolve) => {
    const str = '{"name":"Vadim"}';
    const buffer = new ArrayBuffer(str.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < bufferView.length; i += 1) {
      bufferView[i] = str.charCodeAt(i);
    }
    resolve(buffer);
  }));
  const result = await GameSavingLoader.load();
  expect(result).toEqual({ name: 'Vadim' });
});
