import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { CardsNavigate, TCardEvent } from '~shared/ui/cards-navigate';
import s from './styles.module.scss';
import DocumentCardICO from './svg/document-card-ico.svg';
import DocumentICO from './svg/document-ico.svg';

const cards = [
  {
    id: 1,
    title: <>Медицинская карта <br /> 043-У</>,
    ico: <DocumentCardICO />,
    link: PATH_PAGE.patients.records,
  },
  {
    id: 2,
    title: <>Медицинская карта <br /> 043-1/У</>,
    ico: <DocumentCardICO />,
    link: PATH_PAGE.doctor.root,
  },
  {
    id: 3,
    title: 'Лист учета дозовых нагрузок',
    ico: <DocumentCardICO />,
    link: '/',
  },
  {
    id: 4,
    title: 'Гарантийные сроки и сертификат',
    ico: <DocumentCardICO />,
    link: PATH_PAGE.attendance.root,
  },
  {
    id: 5,
    title: <>Зубная <br /> формула</>,
    ico: <DocumentCardICO />,
    link: '/',
  },
  {
    id: 6,
    title: <>Таблица <br /> приема</>,
    ico: <DocumentCardICO />,
    link: '#',
  },
];

export function MedInfo() {
  const [selectCard, setSelectCard] = useState<TCardEvent | null>(null);
  const navigate = useNavigate();

  return (
    <div className={s.root}>
      {
        !selectCard
          ? (
            <CardsNavigate cards={cards} className={s.cardsNavigate}
              onClick={(card) => setSelectCard(card)
              } />
          )
          : <div className={s.emptyBlock}>
            <DocumentICO />
            <span className={s.name}>{selectCard.title}</span>
            <Button className={s.createButton}
              onClick={() => navigate(PATH_PAGE.medInfo.detail('1'))}>Создать</Button>
          </div>
      }
    </div>
  );
}
