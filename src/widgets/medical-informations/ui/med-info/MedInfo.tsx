import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { usePatientId } from '~entities/patients';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { CardsNavigate, TCardEvent } from '~shared/ui/cards-navigate';
import { cardsNavigate } from './lib/utils';
import s from './styles.module.scss';
import DocumentICO from './svg/document-ico.svg';

type Params = {
  patientId: string
  id: string
};

type Props = {
  backName: (name: string | JSX.Element) => void
};

export function MedInfo({ backName }: Props) {
  const { patientId, id } = useParams<Params>();
  const navigate = useNavigate();
  const { data: patientInfo } = usePatientId(patientId as string);

  const [selectCard, setSelectCard] = useState<TCardEvent | null>(null);

  useEffect(() => {
    if (patientId && !id) {
      setSelectCard(null);
      backName('Мед. карта');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!patientId) {
    return <Navigate to={PATH_PAGE.patients.root} />;
  }

  if (patientInfo?.medInfo) {
    return <Navigate to={PATH_PAGE.medInfo.edit(patientId, id || 'default')} />;
  }

  const cards = cardsNavigate(patientId);

  const onSelectCard = (card: TCardEvent) => {
    backName(card.title);
    setSelectCard(card);
  };

  return (
    <div className={s.root}>
      {
        !selectCard
          ? (
            <CardsNavigate cards={cards} className={s.cardsNavigate}
              onClick={onSelectCard} />
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
