import classNames from 'classnames';
import TimeICO from '~shared/svg/time-ico.svg';
import s from './styles.module.scss';

export function AppointmentSchedule() {

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div className={s.time}>
          <TimeICO />
        </div>
        <div className={s.doctorInfo}>
          <span className={s.name}>Цой Антонионович</span>
          <span className={s.status}>Дантист</span>
        </div>
      </div>
      <div className={s.container}>
        {
          ['19:00', '20:00'].map((time) => (
            <div key={time} className='d-flex'>
              <div className={s.time}>
                {time}
                <div className={s.timeScale} />
              </div>
              <div className={classNames(s.patientInfo, { [s.active]: true }, { [s.passed]: true }, { [s.select]: true })}>
                Билл Клинтон Валерьевич
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
