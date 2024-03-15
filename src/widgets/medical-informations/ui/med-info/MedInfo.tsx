import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { CardsNavigate, TCardEvent } from '~shared/ui/cards-navigate';
import { cardsNavigate } from './lib/utils';
import s from './styles.module.scss';
import DocumentICO from './svg/document-ico.svg';

type Params = {
  patientId: string
};

export function MedInfo() {
  const { patientId } = useParams<Params>();
  const navigate = useNavigate();
  const [selectCard, setSelectCard] = useState<TCardEvent | null>(null);

  if (!patientId) {
    return <Navigate to={PATH_PAGE.patients.root} />;
  }

  const cards = cardsNavigate(patientId);

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
              onClick={() => navigate(PATH_PAGE.medInfo.edit(patientId, selectCard.id.toString()))}>Создать</Button>
          </div>
      }
    </div>
  );
}
