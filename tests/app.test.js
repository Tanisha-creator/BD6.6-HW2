const { beforeEach } = require('node:test');
const { getGames, getGameById } = require('../controllers');
let { app } = require('../index.js');

let http = require('http');
let request = require('supertest');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('API endpints testing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should get all games', async () => {
    let mockData = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];
    getGames.mockReturnValue(mockData);
    let result = await request(server).get('/games');
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockData);
    expect(result.body.length).toBe(3);
  });

  it('should get game by id', async () => {
    let mockData = {
      gameId: 1,
      title: 'The Legend of Zelda: Breath of the Wild',
      genre: 'Adventure',
      platform: 'Nintendo Switch',
    };
    getGameById.mockReturnValue(mockData);
    let result = await request(server).get('/games/details/1');
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockData);
  });
});

describe('function mock testing', () => {
  it('getGames should get all games', async () => {
    let mockData = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];
    getGames.mockReturnValue(mockData);
    let result = await getGames();
    expect(result).toEqual(mockData);
  });
});
