import { useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useTreatment, TreatmentParamsType } from '~features/draggable-list';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { SelectField } from '~shared/ui/select-field';
import { ReceptionTableEnum, ReversedReceptionTableEnum } from '~shared/utils';
import ListICO from '../../svg/list.svg';
import TimeICO from '../../svg/time.svg';
import s from './styles.module.scss';

interface Props extends TreatmentParamsType {
  id: string
}

export function Therapy({ id, doctorId, patientId }: Props) {
  const navigate = useNavigate();

  const { data } = useTreatment({
    patientId,
    doctorId,
    // status,
    category: id === ReceptionTableEnum.ALL ? '' : ReversedReceptionTableEnum[id] ?? '',
  });

  console.log('dataіі', data);


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


  if (!data?.length) {
    return (
      <div className={s.empty}>
        <svg xmlns="http://www.w3.org/2000/svg" width="175" height="175" viewBox="0 0 175 175" fill="none">
          <path d="M128.687 72.1191C144.001 72.1191 157.91 78.2394 168.105 88.1582L168.148 88.0247C172.694 73.6198 175 58.6636 175 43.5711C175 19.5465 155.459 0 131.433 0C109.884 0.00133514 103.766 8.16574 87.5 8.16574C71.2313 8.16574 65.1323 0.00133514 43.5684 0C19.5345 0 0 19.5518 0 43.5711C0 58.6636 2.30579 73.6198 6.85196 88.0247L30.4173 162.649C32.7511 170.036 39.5243 175 47.2748 175C53.6407 175 59.4887 171.53 62.5355 165.942L74.3221 144.332C72.8895 139.361 72.1191 134.113 72.1191 128.687C72.1191 97.4949 97.4949 72.1191 128.687 72.1191Z" fill="#C4EAFF" />
          <path d="M128.687 82.3729C103.149 82.3729 82.373 103.149 82.373 128.686C82.373 154.224 103.149 175 128.687 175C154.224 175 175 154.224 175 128.686C175 103.149 154.224 82.3729 128.687 82.3729ZM145.161 133.813H133.813V145.161C133.813 147.993 131.518 150.288 128.687 150.288C125.855 150.288 123.56 147.993 123.56 145.161V133.813H112.212C109.38 133.813 107.085 131.518 107.085 128.686C107.085 125.855 109.38 123.559 112.212 123.559H123.56V112.212C123.56 109.38 125.855 107.085 128.687 107.085C131.518 107.085 133.813 109.38 133.813 112.212V123.559H145.161C147.993 123.559 150.288 125.855 150.288 128.686C150.288 131.518 147.993 133.813 145.161 133.813Z" fill="#C4EAFF" />
        </svg>

        <span className={s.info}>
          У пациента еще нет приемов, чтобы создать <br /> прием, создать прием?
        </span>

        <Button className={s.createButton} onClick={() => navigate(PATH_PAGE.template.tab(id, patientId, doctorId))}>
          <AiOutlinePlusCircle />
          Создать прием
        </Button>
      </div>
    );
  }


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

      {
        data.map((treatment) => (
          <div key={treatment.id} className={s.card}>
            <div className={classNames(s.blockInfo, s.headInfo)}>
              <div className={s.category}>
                <span className={s.categoryName}> <ListICO /> {treatment.category}</span>
                <span> Зуб:  12</span>
              </div>
              <div>
                <span> {treatment.patient.fullName} </span>
                |
                <span className={s.status}>{treatment.status === 'ACTIVE' ? ' В процессе' : 'Закончено'}</span>
              </div>
            </div>

            <div className={classNames(s.blockInfo, s.problemInfo)}>
              <span className={s.name}>Жалоба: </span>
              <span className={s.textInfo}>{treatment.patient.notice}</span>
            </div>

            {
              treatment.subTreatments.map((subTreatment) => {
                const startTime = dayjs(subTreatment.record.startTime).locale('ru');
                const endTime = dayjs(subTreatment.record.endTime).locale('ru');

                return (
                  <div key={subTreatment.id} className={s.blockInfo}>
                    <div className={classNames(s.info, s.dateTime)}>
                      <TimeICO /> {`${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}`} | {startTime.format('DD.MM.YYYY')} {startTime.format('dddd')}
                    </div>
                    <div className={s.info}>
                      <span className={s.name}>План: </span>
                      <span className={s.textInfo}>{subTreatment.plan} </span>
                    </div>
                    <div className={s.info}>
                      <span className={s.name}>Выполнили: </span>
                      <span className={s.textInfo}>{subTreatment.completed} </span>
                    </div>
                    <div className={s.info}>
                      <span className={s.name}>Комментарий: </span>
                      <span className={s.textInfo}>{subTreatment.comment} </span>
                    </div>
                  </div>
                );
              })
            }
          </div>
        ))
      }

      <Button className='fixed-button' style={{ background: '#229CE1' }} onClick={() => navigate(PATH_PAGE.template.tab(id, patientId, doctorId))}>
        <AiOutlinePlusCircle />
        Создать прием
      </Button>
    </div>
  );
}