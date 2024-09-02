
import classNames from 'classnames';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { Therapy, Template } from '~widgets/reception-table';
import s from './styles.module.scss';



type Params = {
  id: string
};

enum ReceptionTableEnum {
  PERIODONTICS = '1',
  THERAPY = '2',
  SURGERY = '3',
  ORTHOPEDICS = '4',
  OTHER = '5',
}

export function ReceptionTablePage() {
  const { id } = useParams<Params>();
  const navigate = useNavigate();

  const getContent = (key: 'therapy' | 'template' | undefined) => {
    switch (key) {
      case 'therapy':
        return <Therapy />;

      case 'template':
        return <Template />;

      default:
        return (
          <div className={s.empty}>
            <svg xmlns="http://www.w3.org/2000/svg" width="175" height="175" viewBox="0 0 175 175" fill="none">
              <path d="M128.687 72.1191C144.001 72.1191 157.91 78.2394 168.105 88.1582L168.148 88.0247C172.694 73.6198 175 58.6636 175 43.5711C175 19.5465 155.459 0 131.433 0C109.884 0.00133514 103.766 8.16574 87.5 8.16574C71.2313 8.16574 65.1323 0.00133514 43.5684 0C19.5345 0 0 19.5518 0 43.5711C0 58.6636 2.30579 73.6198 6.85196 88.0247L30.4173 162.649C32.7511 170.036 39.5243 175 47.2748 175C53.6407 175 59.4887 171.53 62.5355 165.942L74.3221 144.332C72.8895 139.361 72.1191 134.113 72.1191 128.687C72.1191 97.4949 97.4949 72.1191 128.687 72.1191Z" fill="#C4EAFF" />
              <path d="M128.687 82.3729C103.149 82.3729 82.373 103.149 82.373 128.686C82.373 154.224 103.149 175 128.687 175C154.224 175 175 154.224 175 128.686C175 103.149 154.224 82.3729 128.687 82.3729ZM145.161 133.813H133.813V145.161C133.813 147.993 131.518 150.288 128.687 150.288C125.855 150.288 123.56 147.993 123.56 145.161V133.813H112.212C109.38 133.813 107.085 131.518 107.085 128.686C107.085 125.855 109.38 123.559 112.212 123.559H123.56V112.212C123.56 109.38 125.855 107.085 128.687 107.085C131.518 107.085 133.813 109.38 133.813 112.212V123.559H145.161C147.993 123.559 150.288 125.855 150.288 128.686C150.288 131.518 147.993 133.813 145.161 133.813Z" fill="#C4EAFF" />
            </svg>

            <span className={s.info}>
              У пациента еще нет приемов, чтобы создать <br /> прием, создать прием?
            </span>

            <Button className={s.createButton} onClick={() => navigate(PATH_PAGE.receptionTable.create)}>
              <AiOutlinePlusCircle />
              Создать прием
            </Button>
          </div>
        );

    }
  };

  return (
    <div className={s.root}>
      <nav className={s.navigate}>
        <BackButton title='Таблица приема' className={s.backButton} />

        <NavLink className={classNames(s.tab, { [s.active]: id === undefined })} to={PATH_PAGE.receptionTable.root} >ВСЕ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.PERIODONTICS })} to={PATH_PAGE.receptionTable.tab(ReceptionTableEnum.PERIODONTICS)} >ПАРОДОНТОЛОГИЯ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.THERAPY })} to={PATH_PAGE.receptionTable.tab(ReceptionTableEnum.THERAPY)} >ТЕРАПИЯ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.SURGERY })} to={PATH_PAGE.receptionTable.tab(ReceptionTableEnum.SURGERY)} >ХИРУРГИЯ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.ORTHOPEDICS })} to={PATH_PAGE.receptionTable.tab(ReceptionTableEnum.ORTHOPEDICS)} >ОРТОПЕДИЯ</NavLink>
        <NavLink className={classNames(s.tab, { [s.active]: id === ReceptionTableEnum.OTHER })} to={PATH_PAGE.receptionTable.tab(ReceptionTableEnum.OTHER)} >ПРОЧЕЕ</NavLink>
      </nav>
      <div className={s.container} >
        {getContent('template')}
      </div>
    </div >
  );
}
