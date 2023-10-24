import classNames from 'classnames';
import ArrowLeftICO from '~shared/svg/arrow-left-ico.svg';
import ArrowRightICO from '~shared/svg/arrow-right-ico.svg';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import { Button } from '~shared/ui/button';
import { TimeScale } from '~shared/ui/time-scale';
import s from './styles.module.scss';

type Values = {
  id: string | number,
  time: string,
  isWork: boolean
};

type IProps = {
  timesWork: Values[]
  handleChange: (values: Values) => void
  handleDelete?: (id: string | number) => void
  editTimes?: boolean
  className?: string
};

export function WorkTime(props: IProps) {
  const { className, editTimes, timesWork, handleChange, handleDelete } = props;

  const handleTime = (values: Values) => {
    handleChange(values);
  };

  return (
    <div className={classNames(s.root, className)}>
      <span tabIndex={0} role='button' onClick={() => { }} onKeyDown={() => { }} className={s.arrowLeft}>
        <ArrowLeftICO />
      </span>
      <div className={s.times}>
        <TimeScale
          startTime={1}
          endTime={timesWork.length * 2 + 1}
        />
        {timesWork.map(({ id, time, isWork }) => (
          <div key={id} className={classNames(s.timeBlock, { [s.timeWork]: !editTimes && isWork })}>
            <button type='button' className={s.time} onClick={() => handleTime({ id, time, isWork })}>{time}</button>
            {
              editTimes && handleDelete && (
                <Button
                  color='primary-reverse'
                  type='button'
                  className={s.delete}
                  onClick={() => handleDelete(id)}
                ><CloseICO /></Button>
              )
            }
          </div>
        ))}

      </div>
      <span tabIndex={0} role='button' onClick={() => { }} onKeyDown={() => { }} className={s.arrowRight}>
        <ArrowRightICO />
      </span>
    </div>
  );
}


