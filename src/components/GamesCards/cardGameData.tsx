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
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617137987/rslang/catch1.png',
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
    name: 'Спринт',
    description: 'Слово-перевод',
    badge: 'Перевод на скорость',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617137987/rslang/run1.png',
    linkTo: '/games/sprint',
  },
  {
    name: 'Аудиовызов',
    description: 'Какое слово произнесено?',
    badge: 'Аудирование',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617129730/rslang/11.png',
    linkTo: '/games/audiocall',
  },
];

export default cardGameData;
