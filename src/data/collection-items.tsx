import { CollectionItem } from '../types';

const collectionItems: CollectionItem[] = [
  {
    id: 123,
    type: 'lego',
    name: 'Horizon Forbidden West: Tallneck',
    number: 76989,
    pieces: 1222,
    theme: 'Icons',
    subtheme: 'Licensed',
    minifigs: 1,
    state: 'built',
    quantity: 1,
    release_date: '2022/05/01',
    price: 71.95,
    currency: 'EUR',
    links: [{
      name: 'Amazon.com',
      url: 'https://www.lego.com/en-nl/product/horizon-forbidden-west-tallneck-76989'
    }],
    ean: '5702017156491'
  },
  {
    id: 234,
    type: 'lego',
    name: 'Luke Skywalker\'s Landspeeder',
    number: 75341,
    pieces: 1890,
    theme: 'Star Wars',
    subtheme: 'Ultimate Collector Series',
    minifigs: 1,
    state: 'sealed',
    quantity: 1,
    release_date: '2022/05/04',
    price: 199.99,
    currency: 'EUR',
    links: [
      {
        name: 'Brickwatch.nl',
        url: 'https://www.brickwatch.net/nl-NL/set/75341/Luke-Skywalker-s-Landspeeder.html'
      },
      {
        name: 'LEGO.com',
        url: 'https://www.lego.com/en-nl/product/luke-skywalker-s-landspeeder-75341'
      },
    ],
    ean: '5702017155647'
  },
  {
    id: 123,
    number: 76989,
    name: 'Nendoroid Aloy',
    release_date: '2022/10/01',
    series: 'Horizon Forbidden West',
    manufacturer: 'Good Smile Company',
    quantity: 1,
    price: 59.95,
    currency: 'EUR',
    links: [{
      name: 'Amazon.com',
      url: 'https://www.goodsmile.info/en/product/12520/Nendoroid+Aloy.html'
    }],
    state: 'pre-order',
    type: 'nendoroid',
    ean: '4580590128606'
  },
  {
    id: 456,
    number: "733-DX",
    name: 'Nendoroid Link: Breath of the Wild Ver. DX Edition',
    release_date: '2017/07/01',
    series: 'The Legend of Zelda: Breath of the Wild',
    manufacturer: 'Good Smile Company',
    quantity: 1,
    price: 49.99,
    currency: 'USD',
    links: [{
      name: 'Amazon.com',
      url: 'https://www.goodsmile.info/en/product/6212/Nendoroid+Link+Breath+of+the+Wild+Ver+DX+Edition.html'
    }],
    state: 'opened',
    type: 'nendoroid',
    ean: '4580416902984'
  },
  {
    id: 123,
    type: 'videogame',
    name: 'Horizon: Zero Dawn',
    release_date: '2017/03/01',
    platform: 'PS4',
    developer: 'Guerrilla Games',
    quantity: 1,
    price: 23.75,
    currency: 'EUR',
    links: [{
      name: 'Amazon.com',
      url: 'https://www.amazon.com/Horizon-Zero-Dawn-Complete-playstation-4/dp/B077SBGNXH'
    }],
    rating: 'T',
    game_progress: 'in-progress',
    times_played: 0,
    state: 'opened',
    genre: ["Role-Playing", "Action Adventure", "Action RPG", "Open-World"],
    ean: '0711719959069'
  },
  {
    id: 234,
    type: 'videogame',
    name: 'Horizon: Forbidden West',
    release_date: '2022/02/18',
    platform: 'PS4',
    developer: 'Guerrilla Games',
    quantity: 2,
    price: 23.75,
    currency: 'EUR',
    links: [{
      name: 'Amazon.com',
      url: 'https://a.co/d/3LPT99N'
    }],
    rating: 'T',
    state: 'opened',
    genre: ["Role-Playing", "Action Adventure", "Action RPG", "Open-World"],
    game_progress: 'in-progress',
    times_played: 0,
    ean: '0711719778394'
  },
  {
    id: 345,
    type: 'videogame',
    name: 'The Legend of Zelda: Breath of the Wild',
    release_date: '2017/03/03',
    platform: 'NS',
    developer: 'Nintendo',
    quantity: 1,
    price: 23.75,
    currency: 'EUR',
    links: [
      {
        name: 'Amazon.com',
        url: 'https://www.amazon.com/dp/B01MS6MO77'
      },
      {
        name: 'Metacritic',
        url: 'https://www.metacritic.com/game/switch/the-legend-of-zelda-breath-of-the-wild'
      },
    ],
    rating: 'E10+',
    state: 'opened',
    genre: ["Action Adventure", "Open-World"],
    game_progress: 'in-progress',
    times_played: 2,
    ean: '0045496420031'
  },
];

export default collectionItems;
