import classNames from 'classnames';
import s from './styles.module.scss';

type Props = {
  techInfo: {
    cardNumber?: string
    organizationName?: string
    dateOfAdmission?: string
    fullName?: string
    info: string
  }
  className?: string
};

export function TechInfo({ techInfo, className }: Props) {
  const { cardNumber, organizationName, dateOfAdmission, info, fullName } = techInfo;
  return (
    <div className={classNames(s.techInfo, className)} >
      <p className={s.info}>Приложение к амбулаторной карте: <span className={s.value}> {cardNumber ?? 'Номер карты'} , {organizationName ?? 'Название организации'}  </span> </p>
      <p className={s.info}>Дата приема: <span className={s.value}>{dateOfAdmission ?? 'Число приема'} </span> </p>
      <p className={s.info}>ФИО пациента: <span className={s.value}>{fullName ?? 'ФИО  пациента'}</span> </p>
      <p>{info}</p>
    </div>
  );
}
