import classNames from 'classnames';
// eslint-disable-next-line no-restricted-imports
import { timesWork } from '~entities/work-time/api/msw/config/times';
import ArrowLeftICO from '~shared/svg/arrow-left-ico.svg';
import ArrowRightICO from '~shared/svg/arrow-right-ico.svg';
import s from './styles.module.scss';

type IProps = {
  className?: string
};


export function WorkTime({ className }: IProps) {

  return (
    <div className={classNames(s.root, className)}>
      <span tabIndex={0} role='button' onClick={() => { }} onKeyDown={() => { }} className={s.arrowLeft}>
        <ArrowLeftICO />
      </span>
      <div className={s.times}>
        {timesWork.map(({ id, time, isWork }) => (
          <button key={id} type='button' className={classNames(s.time, { [s.timeWork]: isWork })} >{time}</button>
        ))}
      </div>
      <span tabIndex={0} role='button' onClick={() => { }} onKeyDown={() => { }} className={s.arrowRight}>
        <ArrowRightICO />
      </span>
    </div>
  );
}


