import { CollectionItem } from '../types';

const collectionItems: any[] = [
  {
    _id: "123",
    type: 'lego',
    name: 'Horizon Forbidden West: Tallneck',
    state: 'built',
    quantity: 1,
    release_date: '2022/05/01',
    price: {
      amount: 71.95,
      currency: 'EUR',
    },
    link: {
      name: 'Amazon.com',
      url: 'https://www.lego.com/en-nl/product/horizon-forbidden-west-tallneck-76989',
    },
    ean: '5702017156491',
    meta: {
      number: 76989,
      pieces: 1222,
      theme: 'Icons',
      subtheme: 'Licensed',
      minifigs: 1,
    }
  },
  {
    _id: "234",
    type: 'lego',
    name: "Luke Skywalker's Landspeeder",
    state: 'sealed',
    quantity: 1,
    release_date: '2022/05/04',
    meta: {
      number: 75341,
      pieces: 1890,
      theme: 'Star Wars',
      subtheme: 'Ultimate Collector Series',
      minifigs: 1,
    },
    price: {
      amount: 199.99,
      currency: 'EUR',
    },
    link: {
      name: 'LEGO.com',
      url: 'https://www.lego.com/en-nl/product/luke-skywalker-s-landspeeder-75341',
    },
    ean: '5702017155647',
  },
  {
    _id: "345",
    meta: {
      number: 76989,
      series: 'Horizon Forbidden West',
    },
    name: 'Nendoroid Aloy',
    release_date: '2022/10/01',
    manufacturer: 'Good Smile Company',
    quantity: 1,
    price: {
      amount: 59.95,
      currency: 'EUR',
    },
    links: [
      {
        name: 'Amazon.com',
        url: 'https://www.goodsmile.info/en/product/12520/Nendoroid+Aloy.html',
      },
    ],
    state: 'pre-order',
    type: 'nendoroid',
    ean: '4580590128606',
  },
  {
    _id: "456",
    meta: {
      number: '733-DX',
      series: 'The Legend of Zelda: Breath of the Wild',
    },
    name: 'Nendoroid Link: Breath of the Wild Ver. DX Edition',
    release_date: '2017/07/01',
    manufacturer: 'Good Smile Company',
    quantity: 1,
    price: {
      amount: 49.99,
      currency: 'USD',
    },
    link: {
      name: 'Amazon.com',
      url: 'https://www.goodsmile.info/en/product/6212/Nendoroid+Link+Breath+of+the+Wild+Ver+DX+Edition.html',
    },
    state: 'opened',
    type: 'nendoroid',
    ean: '4580416902984',
  },
  {
    _id: "567",
    type: 'videogame',
    name: 'Horizon: Zero Dawn',
    release_date: '2017/03/01',
    meta: {
      platform: 'PS4',
      developer: 'Guerrilla Games',
      rating: 'T',
      genre: ['Role-Playing', 'Action Adventure', 'Action RPG', 'Open-World'],
    },
    quantity: 1,
    price: {
      amount: 23.75,
      currency: 'EUR',
    },
    link: {
      name: 'Amazon.com',
      url: 'https://www.amazon.com/Horizon-Zero-Dawn-Complete-playstation-4/dp/B077SBGNXH',
    },
    game_progress: 'in-progress',
    times_played: 0,
    state: 'opened',
    ean: '0711719959069',
  },
  {
    _id: "678",
    type: 'videogame',
    name: 'Horizon: Forbidden West',
    release_date: '2022/02/18',
    meta: {
      platform: 'PS4',
      developer: 'Guerrilla Games',
      rating: 'T',
      genre: ['Role-Playing', 'Action Adventure', 'Action RPG', 'Open-World'],
    },
    quantity: 2,
    price: {
      amount: 23.75,
      currency: 'EUR',
    },
    link: {
      name: 'Amazon.com',
      url: 'https://a.co/d/3LPT99N',
    },
    state: 'opened',
    game_progress: 'in-progress',
    times_played: 0,
    ean: '0711719778394',
  },
  {
    _id: "789",
    type: 'videogame',
    name: 'The Legend of Zelda: Breath of the Wild',
    release_date: '2017/03/03',
    meta: {
      platform: 'NS',
      developer: 'Nintendo',
      rating: 'E10+',
      genre: ['Action Adventure', 'Open-World'],
    },
    quantity: 1,
    price: {
      amount: 23.75,
      currency: 'EUR',
    },
    link: {
      name: 'Metacritic',
      url: 'https://www.metacritic.com/game/switch/the-legend-of-zelda-breath-of-the-wild',
    },
    state: 'opened',
    game_progress: 'in-progress',
    times_played: 2,
    ean: '0045496420031',
  },
];

export default collectionItems;
