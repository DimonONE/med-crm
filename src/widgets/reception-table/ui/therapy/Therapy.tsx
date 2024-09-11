import { useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { SelectField } from '~shared/ui/select-field';
import ListICO from '../../svg/list.svg';
import TimeICO from '../../svg/time.svg';
import s from './styles.module.scss';

export function Therapy() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string | number>(1);

  const selectOptions = [
    {
      value: 1,
      label: 'Все лечения',
    },
    {
      value: 2,
      label: 'В процессе',
    },
    {
      value: 3,
      label: 'Закончено',
    },

  ];

  const selectOptionsTherapy = [
    {
      value: 1,
      label: '№Зуба',
    },
    {
      value: 2,
      label: 'В процессе',
    },
    {
      value: 3,
      label: 'Закончено',
    },

  ];


  return (
    <div className={s.root}>
      <div className={s.filters}>
        <SelectField
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className={s.filter}
          classNameIcon={s.filterIcon}
          selectNavigate
          selectOptions={selectOptions}

        >
          {
            selectOptions.map(({ label, value: link }) => (
              <MenuItem
                key={link}
                value={link}
                className='select-link'
              >
                {label}
              </MenuItem>
            ))
          }
        </SelectField>

        <SelectField
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className={classNames(s.filter, s.therapyFilter)}
          classNameIcon={s.filterIcon}
          selectNavigate
          selectOptions={selectOptionsTherapy}

        >
          {
            selectOptionsTherapy.map(({ label, value: link }) => (
              <MenuItem
                key={link}
                value={link}
                className='select-link'
              >
                {label}
              </MenuItem>
            ))
          }
        </SelectField>
      </div>


      <div className={s.card}>
        <div className={classNames(s.blockInfo, s.headInfo)}>
          <div className={s.category}>
            <span className={s.categoryName}> <ListICO /> Терапия</span>
            <span> Зуб:  12</span>
          </div>
          <div>
            <span> Ирина Ивановна Хакамада </span>
            |
            <span className={s.status}>{true ? ' В процессе' : 'Закончено'}</span>
          </div>
        </div>

        <div className={classNames(s.blockInfo, s.problemInfo)}>
          <span className={s.name}>Жалоба: </span>
          <span className={s.textInfo}>Боль в верхнем правом зубе под углом гауса блабла</span>
        </div>

        <div className={s.blockInfo}>
          <div className={classNames(s.info, s.dateTime)}><TimeICO /> {`${dayjs().hour(14).minute(30).format('HH:mm')} - ${dayjs().hour(14).minute(50).format('HH:mm')}`} |    23.07.2023  Четверг  </div>
          <div className={s.info}>
            <span className={s.name}>План: </span>
            <span className={s.textInfo}>Пломбирование фурмидонтной жидкостью 4\5 пульпита блабла</span>
          </div>
          <div className={s.info}>
            <span className={s.name}>Выполнили: </span>
            <span className={s.textInfo}>Пломбирование фурмидонтной жидкостью 4\5 пульпита блабла</span>
          </div>
          <div className={s.info}>
            <span className={s.name}>Комментарий: </span>
            <span className={s.textInfo}>Пломбирование фурмидонтной жидкостью 4\5 пульпита блабла</span>
          </div>
        </div>

        <div className={s.blockInfo}>
          <div className={classNames(s.info, s.dateTime)}>{`${dayjs().hour(14).minute(30).format('HH:mm')} - ${dayjs().hour(14).minute(50).format('HH:mm')}`} |    23.07.2023  Четверг  </div>
          <div className={s.info}>
            <span className={s.name}>План: </span>
            <span className={s.textInfo}>Пломбирование фурмидонтной жидкостью 4\5 пульпита блабла</span>
          </div>
          <div className={s.info}>
            <span className={s.name}>Выполнили: </span>
            <span className={s.textInfo}>Пломбирование фурмидонтной жидкостью 4\5 пульпита блабла</span>
          </div>
          <div className={s.info}>
            <span className={s.name}>Комментарий: </span>
            <span className={s.textInfo}>Пломбирование фурмидонтной жидкостью 4\5 пульпита блабла</span>
          </div>
        </div>
      </div>
      <Button className='fixed-button' onClick={() => navigate(PATH_PAGE.template.create())}>
        <AiOutlinePlusCircle />
        Создать прием
      </Button>
    </div>
  );
}