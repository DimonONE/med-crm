import { useState } from 'react';
import classNames from 'classnames';
import Slider, { ReactSliderProps } from 'react-slider';
// import ArrowLeftICO from '~shared/svg/arrow-left-ico.svg';
// import ArrowRightICO from '~shared/svg/arrow-right-ico.svg';
// import CloseICO from '~shared/svg/close-gray-ico.svg';
// import { Button } from '~shared/ui/button';
import s from './styles.module.scss';


type TimeScaleProps = {
  startTime: number;
  endTime: number;
} & ReactSliderProps;

export function TimeScale({ startTime, endTime }: TimeScaleProps) {
  const [sliderValue, setSliderValue] = useState<number[]>([startTime, endTime]);

  const handleChange = (value: number[]) => {
    setSliderValue(value);
  };

  return (
    <div className={s.root}>
      <Slider
        className={s.slider}
        min={startTime}
        max={endTime}
        step={1}
        value={sliderValue}
        onChange={handleChange}
        renderThumb={(props, state) => <div key={state.index} {...props}
          className={classNames(s.thumb, { [s.first]: state.index === 0 })} />}
        renderTrack={(props, state) => <div key={state.index} {...props}
          className={classNames({ [s.track]: state.index === 1 })} />}
      />
    </div>
  );
}
