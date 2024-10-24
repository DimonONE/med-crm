
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { ReceptionTableEnum } from '~shared/utils';
import { Therapy } from '~widgets/reception';
import s from './styles.module.scss';

type Params = {
  id: string
  patientId: string,
  doctorId: string,
};

export function TherapyPage() {
  const { id, patientId, doctorId,
  } = useParams<Params>();

  return (
    <div className={s.root}>

      <nav className={s.navigate}>
        <BackButton title='Таблица приема' link={PATH_PAGE.root} className={s.backButton} />

        <NavLink className={classNames(s.tab, { [s.active]: id === undefined || id === 'undefined' })} to={PATH_PAGE.reception.info(patientId!, doctorId!, '')} >ВСЕ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.PERIODONTICS })} to={PATH_PAGE.reception.info(patientId!, doctorId!, ReceptionTableEnum.PERIODONTICS)} >ПАРОДОНТОЛОГИЯ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.THERAPY })} to={PATH_PAGE.reception.info(patientId!, doctorId!, ReceptionTableEnum.THERAPY)} >ТЕРАПИЯ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.SURGERY })} to={PATH_PAGE.reception.info(patientId!, doctorId!, ReceptionTableEnum.SURGERY)} >ХИРУРГИЯ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.ORTHOPEDICS })} to={PATH_PAGE.reception.info(patientId!, doctorId!, ReceptionTableEnum.ORTHOPEDICS)} >ОРТОПЕДИЯ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.OTHER })} to={PATH_PAGE.reception.info(patientId!, doctorId!, ReceptionTableEnum.OTHER)} >ПРОЧЕЕ</NavLink>
      </nav>
      <div className={s.container} >
        <Therapy
          id={id!}
          patientId={patientId!}
          doctorId={doctorId!}
          category=''
        />
      </div>

      {/* <Button className='fixed-button' style={{ background: '#229CE1' }} onClick={() => false}>
        <AiOutlinePlusCircle />
        Создать прием
      </Button> */}
    </div >
  );
}
