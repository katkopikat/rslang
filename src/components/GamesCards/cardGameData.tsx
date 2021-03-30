interface IGameCard {
  linkTo: string;
  name: string;
  description: string;
  badge: string;
  img: string;
}

const cardGameData: IGameCard[] = [
  {
    name: 'Саванна',
    description: 'Напиши слово, пропущенное в предложении.',
    badge: 'Перевод',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617123395/rslang/wr.png',
    linkTo: '/games/savanna',
  },
  {
    name: 'Оазис',
    description: 'Напиши слово, пропущенное в предложении.',
    badge: 'Перевод',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617123395/rslang/wr.png',
    linkTo: '/games/writegame',
  },
  {
    name: 'Аудиовызов',
    description: 'Напиши слово, пропущенное в предложении.',
    badge: 'Слух',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617129730/rslang/11.png',
    linkTo: '/games/writegame',
  },
  {
    name: 'Спринт',
    description: 'Напиши слово, пропущенное в предложении.',
    badge: 'Перевод',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617123395/rslang/wr.png',
    linkTo: '/games/writegame',
  },
];

export default cardGameData;
