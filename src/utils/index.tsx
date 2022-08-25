import { ItemStateIcon } from "../types";

/**
 * 
 */
export const collectionTypeMap = (itemType: string) => {
  const typeMap: {[key: string]: string} = {
    'lego': 'LEGO',
    'nendoroid': 'Nendoroid',
    'videogame': 'Video Game'
  }
  return typeMap[itemType];
}

export const sortArrayObjects = (arr: any[]) => {
  return arr.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
}

/**
 * @param {string} itemKey 
 * @returns {string}
 */
export const itemPropertyMap = (itemKey: string): string => {
  const labelMap: {[key: string]: string} = {
    "type": "Type",
    "name": "Name",
    "state": "State",
    "quantity": "Quantity",
    "release_date": "Release date",
    "currency": "Currency",
    "price": "Price",
    "ean": "EAN",
    "links": "Link(s)",
    "theme": "Theme",
    "subtheme": "Subtheme",
    "number": "Number",
    "minifigs": "Minifigs",
    "pieces": "Pcs",
    "series": "Series",
    "manufacturer": "Manufacturer",
    "platform": "Platform",
    "genre": "Genre(s)",
    "developer": "Developer",
    "rating": "Rating",
  }
  return labelMap[itemKey];
}

export const uniqBy = (arr: any[], key: any) => {
  let seen = new Set();
  return arr.filter((item: any) => {
    let k = key(item);
    return seen.has(k) ? false : seen.add(k);
});
}

/**
 * 
 * @param {number} start 
 * @returns {number[]} years
 */
export const generateArrayOfYears = (start: number): number[] => {
  const max: number = new Date().getFullYear();
  const min: number = max - (max - start);
  let years: number[] = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

/**
 * @returns {number[]} months
 */
export const months = (): number[] => {
  let months: number[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  return months;
}

export const days = () => {
  let days: number[] = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  return days;
}

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
}

/**
 * @param {string} str 
 * @param {number} n 
 * @returns {string}
 */
export const truncate = (str: string, n: number): string => {
  return str?.length > n ? str.substring(0, n - 1) + '...' : str;
}

export const stateIcons: {[key: string]: ItemStateIcon} = {
  'pre-order': 'BiHourglass',
  sealed: 'BiPackage',
  built: 'BiLandscape',
  boxed: 'BiBox',
  opened: 'BiEnvelopeOpen',
  unknown: 'BiQuestionMark'
};

export const purgeObject = (obj: {[key: string]: any}): any => {
  Object.keys(obj).forEach(key => {
    if (!obj[key]) {
      delete obj[key];
    }
  });

  return obj;
}

/**
 * Temporary solution to strip `__typename` from retrieved GQL data
 * @param input 
 * @returns 
 */
export const stripTypename = (input: any) => {
  const newish = { ...input };

  for (const prop in newish) {
    if (prop === '__typename') delete newish[prop];
    else if (newish[prop] === null) {
    } else if (Array.isArray(newish[prop])) {
      // console.log("array")
    //   for (const next in newish[prop]) {
    //     newish[prop][next] = stripTypename(newish[prop][next]);
    //   }
    } else if (typeof newish[prop] === 'object') {
      newish[prop] = stripTypename(newish[prop]);
    }
  }
  return newish;
}

/**
 * 
 */
export const gameGenres = [
  { name: 'Action', type: 'action' },
  {
    name: 'Adventure',
    type: 'adventure',
  },
  {
    name: 'Point-and-Click',
    type: 'point-click',
  },
  {
    name: 'Fighting',
    type: 'fighting',
  },
  {
    name: 'Shooter',
    type: 'shooter',
  },
  {
    name: 'Music',
    type: 'music',
  },
  {
    name: 'Platform',
    type: 'platform',
  },
  {
    name: 'Puzzle',
    type: 'puzzle',
  },
  {
    name: 'Racing',
    type: 'racing',
  },
  {
    name: 'Real Time Strategy',
    type: 'rts',
  },
  {
    name: 'Role-playing',
    type: 'rpg',
  },
  {
    name: 'Simulator',
    type: 'simulator',
  },
  {
    name: 'Sport',
    type: 'sport',
  },
  {
    name: 'Strategy',
    type: 'strategy',
  },
  {
    name: 'Turn-based Strategy',
    type: 'tbs',
  },
  {
    name: 'Tactical',
    type: 'tactical',
  },
  {
    name: 'Quiz/Trivia',
    type: 'quiz',
  },
  {
    name: "Hack 'n Slash/Beat 'm Up",
    type: 'hack-slash',
  },
  {
    name: 'Pinball',
    type: 'pinball',
  },
  {
    name: 'Arcade',
    type: 'arcade',
  },
  {
    name: 'Visual Novel',
    type: 'visual-novel',
  },
  {
    name: 'Indie',
    type: 'indie',
  },
  {
    name: 'Card & Board Game',
    type: 'card-board-game',
  },
  {
    name: 'MOBA',
    type: 'moba',
  },
];