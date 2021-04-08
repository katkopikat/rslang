interface IGameCard {
  linkTo: string;
  name: string;
  description: string;
  badge: string;
  img: string;
  id: string;
}

const cardGameData: IGameCard[] = [
  {
    name: 'Саванна',
    description: 'Выбери правильный перевод падающего вниз слова.',
    badge: 'Перевод на скорость',
    // img: 'https://res.cloudinary.com/travel-app/image/upload/v1617137987/rslang/catch1.png',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617587319/rslang/33.png',
    linkTo: '/games/savanna',
    id: 'savanna',
  },
  {
    name: 'Оазис',
    description: 'Напиши слово, пропущенное в предложении.',
    badge: 'Письмо/пропущенное слово',
    // img: 'https://res.cloudinary.com/travel-app/image/upload/v1617123395/rslang/wr.png',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617587319/rslang/22.png',
    linkTo: '/games/oasis',
    id: 'oasis',
  },
  {
    name: 'Спринт',
    description: 'Как можно быстрее определи верный перевод слова или нет.',
    badge: 'Перевод на скорость',
    // img: 'https://res.cloudinary.com/travel-app/image/upload/v1617137987/rslang/run1.png',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617587319/rslang/111.png',
    linkTo: '/games/sprint',
    id: 'sprint',
  },
  {
    name: 'Аудиовызов',
    description: 'Попробуй понять, какое слово было произнесено.',
    badge: 'Аудирование',
    // img: 'https://res.cloudinary.com/travel-app/image/upload/v1617129730/rslang/11.png',
    img: 'https://res.cloudinary.com/travel-app/image/upload/v1617587319/rslang/44.png',
    linkTo: '/games/audiocall',
    id: 'audiocall',
  },
];

export default cardGameData;
