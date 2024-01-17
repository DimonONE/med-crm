
import { useEffect, useRef, useState } from 'react';
import { FormGroup, Grid, MenuItem } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { Checkbox } from '~shared/ui/checkbox';
import { DatePicker } from '~shared/ui/date-picker';
import { SelectField } from '~shared/ui/select-field';
import s from './styles.module.scss';


interface UnderlineTextProps {
  name: string
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void
  width?: string
  className?: string
}


function UnderlineText(props: UnderlineTextProps): JSX.Element {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  const { width, className, onChange, ...prevProps } = props;
  const fontSize = 18;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;

      if (inputRef.current.scrollHeight > fontSize) {
        inputRef.current.classList.remove('border');
      } else {
        inputRef.current.classList.add('border');
      }
    }
  }, [value]);

  return (
    <textarea
      ref={inputRef}
      value={value}
      onChange={handleChange}
      className={classNames(s.border, className)}
      style={{ width: value ? `${value.length}ch` : width || 'auto' }}
      {...prevProps}
    />
  );
}

export function CreatingReception() {
  const [specializationValue, setSpecialization] = useState<string | number>(0);
  const [sectionValue, setSection] = useState<string | number>(0);
  const [diagnosisValue, setDiagnosis] = useState<string | number>(0);

  const selectOptions = [
    { value: 1, label: 'В процессе' },
    { value: 2, label: 'Закончено' },
  ];

  const specializationOptions = [
    { value: 0, label: 'Специализация' },
    { value: 1, label: 'Терапия' },
    { value: 2, label: 'Ортодинтия' },
    { value: 3, label: 'Пародонтология' },
    { value: 4, label: 'Ортопедия' },
    { value: 6, label: 'Хирургия' },
  ];

  const sectionOptions = [
    { value: 0, label: 'Раздел' },
    { value: 1, label: 'Передонтит' },
    { value: 2, label: 'Кариес' },
    { value: 3, label: 'Пульпит' },
  ];

  const diagnosisOptions = [
    { value: 0, label: 'Диагноз' },
    { value: 1, label: 'Острый периодонтит' },
  ];

  const yesNoOptions = [
    { value: -1, label: 'нет' },
    { value: 1, label: 'да' },
  ];

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>,
  ) => {
    console.log('values', values);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        statusReception: 1,
        complaint: true,
        smoking: false,
        epidemiologicalHistory: '',
        presenceOfSpontaneousPain: 0,

        toothNumber: '',
        foreignObjects: -1,

        periapicalSpace_1: false,
        periapicalSpace_2: false,
        periapicalSpace_3: false,
        periapicalSpace_4: false,

        previouslyTreated: -1,
      }}
      // validationSchema={object().shape({
      //   email: string().email().required(),
      //   password: string().min(5).required(),
      // })}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form
          className={s.root}
        >
          <BackButton title='Создание приема' />
          <div className={s.cardBlock}>

            <div className={s.head}>
              <span className={s.title}> Создание приема</span>

              <div className={s.statusBlock}>
                <span> Статус лечения </span>

                <Field
                  name="statusReception"
                >
                  {(props: FieldProps) =>
                    <SelectField
                      className={classNames(s.status, { [s.finished]: props.field.value !== 1 })}
                      selectNavigate
                      selectOptions={selectOptions}
                      {...props}
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
                  }
                </Field>
              </div>
            </div>

            <div className={s.filterOptions}>
              <SelectField
                value={specializationValue}
                onChange={(event) => setSpecialization(event.target.value)}
                className={s.optionInfo}
                selectNavigate
                selectOptions={specializationOptions}
              >
                {
                  specializationOptions.map(({ label, value: link }) => (
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

              {
                Boolean(specializationValue) && (
                  <SelectField
                    value={sectionValue}
                    onChange={(event) => setSection(event.target.value)}
                    className={s.optionInfo}
                    selectNavigate
                    selectOptions={sectionOptions}
                  >
                    {
                      sectionOptions.map(({ label, value: link }) => (
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
                )
              }
              {
                Boolean(sectionValue) && (
                  <SelectField
                    value={diagnosisValue}
                    onChange={(event) => setDiagnosis(event.target.value)}
                    className={s.optionInfo}
                    selectNavigate
                    selectOptions={diagnosisOptions}
                  >
                    {
                      diagnosisOptions.map(({ label, value: link }) => (
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
                )
              }
            </div>
          </div>

          <div className={s.cardBlock}>
            <div className={classNames(s.title, s.verticalGap)}>Приложение к амбулаторной карте <span className={s.redHighlight}>№ 23974343   ООО “СИЯНИЕ”</span> </div>
            <div className={classNames(s.title, s.verticalGap)}>Дата приема: <span className={s.redHighlight}>12.12.2023</span> </div>
            <div className={classNames(s.title, s.verticalGap)}>ФИО пациента: <span className={s.redHighlight}>Пупкин Василий Васильевич</span> </div>
            <div className={s.description}>
              Настоящее приложение разработано на основании «Клинических рекомендаций (протоколов ведения)
              при диагнозе болезни периапикальных тканей» (Утверждены Постановлением № 15 Совета Ассоциации
              общественных объединений «Стоматологическая Ассоциация России» от 30 сентября 2014 года, актуализированы 02 августа 2018 года).
            </div>
          </div>

          <div className={s.cardBlock}>
            <div className={classNames(s.title, s.verticalGap)}>Жалобы</div>

            <FormGroup className={s.checkboxes} >
              <Grid container  >

                <Grid item xs={6} >
                  <Field
                    name="complaint"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('complaint', !field.value)}
                      >
                        <>
                          на боль во время еды в области зуба

                          <Field
                            name="complaintText"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                name='complaintText'
                                width='86px'
                                className={classNames(s.defaultInput, s.title)}
                                onChange={props.field.onChange} />}
                          </Field>
                        </>
                      </Checkbox>
                    }
                  </Field>

                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="2"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('2', !field.value)}
                      >
                        на застревание пищи между зубами
                      </Checkbox>
                    }
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="3"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('3', !field.value)}
                      >
                        Припухлость щеки
                      </Checkbox>
                    }
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="4"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('4', !field.value)}
                      >
                        Головная боль
                      </Checkbox>
                    }
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="5"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('5', !field.value)}
                      >
                        симптом «выросшего зуба»
                      </Checkbox>
                    }
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="6"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('6', !field.value)}
                      >
                        боль при накусывании
                      </Checkbox>
                    }
                  </Field>
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="7"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('7', !field.value)}
                      >
                        Повышение температуры тела
                      </Checkbox>
                    }
                  </Field>
                </Grid>
              </Grid>
            </FormGroup>
          </div>

          <div className={s.cardBlock}>
            <div className={classNames(s.title, s.verticalGap)}>Перенесенные и сопутствующие заболевания:</div>
            <ul className={s.ul}>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                Эпидемиологический анамнез:

                <Field
                  name="epidemiologicalHistory"
                >
                  {(props: FieldProps) =>
                    <UnderlineText
                      name='epidemiologicalHistory'
                      className={classNames(s.defaultInput, s.title)}
                      onChange={props.field.onChange} />}
                </Field>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}> Вредные привычки: </li>
              <li>
                <FormGroup className={s.checkboxes} >
                  <Grid container >
                    <Field
                      name="smoking"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('smoking', !field.value)}
                        > курение</Checkbox>}
                    </Field>
                    <Field
                      name="smoking"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('smoking', !field.value)}
                        > злоупотребление алкоголем</Checkbox>}
                    </Field>
                    <Field
                      name="smoking"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('smoking', !field.value)}
                        > кальян</Checkbox>}
                    </Field>
                    <Field
                      name="smoking"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('smoking', !field.value)}
                        > жевание табака</Checkbox>}
                    </Field>
                  </Grid>
                </FormGroup>
              </li>
              <li>
                <Field
                  name="badHabitsOther"
                >
                  {(props: FieldProps) =>
                    <UnderlineText
                      width='100%'
                      name='badHabitsOther'
                      className={classNames(s.defaultInput, s.title)}
                      onChange={props.field.onChange} />}
                </Field>
              </li>
            </ul>
          </div>

          <div className={s.cardBlock}>
            <div className={classNames(s.title, s.verticalGap)}>Анамнез</div>

            <ul className={s.ul}>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Боль в зубе
                  <Field
                    name="toothNumber"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='21px'
                        name='toothNumber'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                  появилась(число)
                  <Field
                    name="toothPainDateOfBirth"
                    className='form-input'
                  >{({ form, meta }: FieldProps) =>
                    <DatePicker
                      sx={{
                        '.MuiInputBase-root.MuiOutlinedInput-root': {
                          width: '150px',
                          height: '38px',
                          marginLeft: '15px',
                          borderRadius: '10px',
                          border: '1px solid #0E5F8C',
                          background: '#CBECFF',
                          color: 'var(--color-font)',
                          fontSize: '14px',
                          fontWeight: 400,
                        },
                        '.MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root': {
                          color: 'var(--color-font)',
                        },
                      }}
                      value={meta.value}
                      onChange={(date) =>
                        date && form.setFieldValue('toothPainDateOfBirth', dayjs(date as string).toISOString())
                      } />
                    }
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Наличие самопроизвольных болей
                  <Field name="presenceOfSpontaneousPain">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={yesNoOptions}
                        {...props}
                      >
                        {
                          yesNoOptions.map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Иррадиация болей
                  <Field name="radiationOfPain">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={yesNoOptions}
                        {...props}
                      >
                        {
                          yesNoOptions.map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={classNames(s.verticalGap, s.filterOptions)}>
                  Боль купируется приемом препаратов
                  <Field name="painIsRelievedByTakingMedications">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={yesNoOptions}
                        {...props}
                      >
                        {
                          yesNoOptions.map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
                <Field
                  name="painIsRelievedByTakingMedicationsText"
                >
                  {(props: FieldProps) =>
                    <UnderlineText
                      width='100%'
                      name='painIsRelievedByTakingMedicationsText'
                      className={classNames(s.verticalGap, s.defaultInput, s.title)}
                      onChange={props.field.onChange} />}
                </Field>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Ранее был лечен
                  <Field name="previouslyTreated">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={yesNoOptions}
                        {...props}
                      >
                        {
                          yesNoOptions.map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Прочее
                  <Field
                    name="painIsRelievedByTakingMedicationsOtcherText"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='painIsRelievedByTakingMedicationsOtcherText'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
            </ul>
          </div>

          <div className={s.cardBlock}>
            <div className={classNames(s.title, s.verticalGap)}>Внешний осмотр: </div>

            <ul className={s.ul}>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Лицо
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={[{ value: 0, label: 'Симметричное' }]}
                        {...props}
                      >
                        {
                          [{ value: 0, label: 'Симметричное' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>

                  <Field
                    name="visualInspectionFace"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='visualInspectionFace'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>

              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Кожные покровы:
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={[{ value: 0, label: 'Чистые' }]}
                        {...props}
                      >
                        {
                          [{ value: 0, label: 'Чистые' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>

                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>

              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Общее состояние:
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={[{ value: 0, label: 'Удовлетворительное' }]}
                        {...props}
                      >
                        {
                          [{ value: 0, label: 'Удовлетворительное' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>

                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>

              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <div className={s.verticalGap}>
                  Подчелюстные лимфатические узлы
                </div>

                <span className={classNames(s.verticalGap, s.filterOptions)}>
                  Свойства
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={[{ value: 0, label: 'Не увеличены' }, { value: 1, label: 'Увеличены' }]}
                        {...props}
                      >
                        {
                          [{ value: 0, label: 'Не увеличены' }, { value: 1, label: 'Увеличены' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={[{ value: 0, label: 'Безболезненные' }]}
                        {...props}
                      >
                        {
                          [{ value: 0, label: 'Безболезненные' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={[{ value: 0, label: 'Не спаяны с окружающики тканями' }]}
                        {...props}
                      >
                        {
                          [{ value: 0, label: 'Не спаяны с окружающики тканями' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
                <Field
                  name="test"
                >
                  {(props: FieldProps) =>
                    <UnderlineText
                      width='100%'
                      name='test'
                      className={classNames(s.verticalGap, s.defaultInput, s.title)}
                      onChange={props.field.onChange} />}
                </Field>

                <span className={s.filterOptions}>
                  Консистенция
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={[{ value: 0, label: 'Однородная' }]}
                        {...props}
                      >
                        {
                          [{ value: 0, label: 'Однородная' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>

              </li>

              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Термометрия (°C)
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100px'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  АД до приема
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100px'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  АД после приема
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100px'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Пульсоксиметрия (мм.рт.ст.)
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100px'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  ЧДД (ударов в мин)
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100px'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
            </ul>

            <Field
              name="test"
            >
              {(props: FieldProps) =>
                <UnderlineText
                  width='100%'
                  name='test'
                  className={classNames(s.defaultInput, s.title)}
                  onChange={props.field.onChange} />}
            </Field>
          </div>

          <div className={s.cardBlock}>
            <div className={classNames(s.title, s.verticalGap)}>Данные объективного осмотра:</div>

            <ul className={s.ul}>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Зуб<div className={s.valueInfo}>{values.toothNumber}</div>
                  {
                    values.previouslyTreated > 0
                      ? <>
                        глубокая кариозная полость на
                        <Field
                          name="test"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='test'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                        поверхности(ях),
                      </>
                      : <>
                        под пломбой по
                        <Field name="test">
                          {(props: FieldProps) =>
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={[{ value: 0, label: 'выбрать' }]}
                              {...props}
                            >
                              {
                                [{ value: 0, label: 'выбрать' }].map(({ label, value: link }) => (
                                  <MenuItem
                                    key={link}
                                    value={link}
                                    className='select-link'
                                  >
                                    {label}
                                  </MenuItem>
                                ))
                              }
                            </SelectField>}
                        </Field>
                        классу по Блеку с нарушением краевой проницаемости, после снятия пломбы,
                      </>
                  }
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.description)}>
                зондирование дна кариозной полости безболезненное, полость зуба вскрыта, реакция на холод длительная, ЭОД – 100-200 мкА, перкуссия резко болезненная, слизистая оболочка рта в области переходной складки в проекции корня зуба
                <div className={s.valueInfo}>{values.toothNumber}</div>
                гипермирована, отечна, болезненна при пальпации.
              </li>
              <li className={s.verticalGap}>
                <span className={s.filterOptions}>
                  Зуб изменен в цвете
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={classNames(s.optionInfo, s.horizontalGap)}
                        selectNavigate
                        selectOptions={yesNoOptions}
                        {...props}
                      >
                        {
                          yesNoOptions.map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
              </li>
              <li className={s.verticalGap}>
                <span className={s.filterOptions}>
                  подвижность
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={classNames(s.optionInfo, s.horizontalGap)}
                        selectNavigate
                        selectOptions={yesNoOptions}
                        {...props}
                      >
                        {
                          yesNoOptions.map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
              </li>
              <li className={s.verticalGap}>
                <span className={s.filterOptions}>
                  симптом флюктуации
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={classNames(s.optionInfo, s.horizontalGap)}
                        selectNavigate
                        selectOptions={yesNoOptions}
                        {...props}
                      >
                        {
                          yesNoOptions.map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Гигиена
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Индексы гигиены
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                <span className={s.filterOptions}>
                  Пародонтальные индексы
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
            </ul>
          </div>
          <div className={s.cardBlock}>
            <div className={classNames(s.title, s.verticalGap)}>Данные рентгенологического исследования:</div>

            <ul className={s.ul}>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <span className={s.filterOptions}>
                  Количество корней/каналов
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <span className={s.filterOptions}>
                  Форма корней
                  <Field
                    name="test"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='test'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <span className={s.filterOptions}>
                  Дентикли
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={classNames(s.optionInfo, s.horizontalGap)}
                        selectNavigate
                        selectOptions={yesNoOptions}
                        {...props}
                      >
                        {
                          yesNoOptions.map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <span className={classNames(s.title, s.verticalGap, s.filterOptions)}>
                  Тень пломбировочного материала в канале
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={classNames(s.optionInfo, s.horizontalGap)}
                        selectNavigate
                        selectOptions={[{ value: 0, label: 'Не прослеживается' }]}
                        {...props}
                      >
                        {
                          [{ value: 0, label: 'Не прослеживается' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </span>
                <FormGroup className={s.checkboxes} >
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Прослеживается на всем протяжении</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > однородна</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > неоднородна</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > фрагментарно</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > радиологически апекс обтурирован</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > радиологически апекс не обтурирован</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </FormGroup>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <span className={classNames(s.title, s.verticalGap, s.filterOptions)}>
                  Просвет каналов
                </span>

                <FormGroup className={s.checkboxes} >
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Визуализируется на всем протяжении</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Не визуализируется на всем протяжении</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > В апикальной части просвет канала не определяется</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.filterOptions, s.verticalGap)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Прослеживается от устья на протяжении ½ длины корня зуба</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </FormGroup>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <span className={classNames(s.title, s.verticalGap, s.filterOptions)}>
                  Пространство периодонтальной связки
                </span>

                <FormGroup className={s.checkboxes} >
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Изменений нет</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Определяется расширение пространства периодонтальной связки в периапикальной области</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Определяется расширение пространства периодонтальной связки на всем протяжении</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </FormGroup>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <span className={classNames(s.title, s.verticalGap, s.filterOptions)}>
                  Периапикальное пространство
                </span>

                <FormGroup className={s.checkboxes} >
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Изменений нет</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Деструкция (ремоделяция) твердой пластинки альвеолы в периапикальной области</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Наличие деструкции костной ткани альвеолы на всем протяжении корня  1/2 длины корня</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Наличие деструкции костной ткани альвеолы на всем протяжении корня на  1/3 длины корня</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        >
                          <>Прослеживается усиление плотности костного рисунка в виде перифокального
                            остеосклероза без четких контуров,  <br /> клинически соответствующее состоянию
                            после эндодонтического лечения с остаточной интоксикацией </></Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        >
                          <>
                            Непрерывная тень пломбировочного материала прослеживается за пределами корневого канала на
                            <Field
                              name="test"
                            >
                              {(props: FieldProps) =>
                                <UnderlineText
                                  width='100px'
                                  name='test'
                                  className={classNames(s.defaultInput, s.title)}
                                  onChange={props.field.onChange} />}
                            </Field>
                            мм от верхушки корня
                          </>
                        </Checkbox>}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        >
                          <>
                            Прослеживается тень пломбировочного материала в виде нескольких фрагментов, располагающихся в непосредственной близости к <br /> апексу на удалении
                            <Field
                              name="test"
                            >
                              {(props: FieldProps) =>
                                <UnderlineText
                                  width='100px'
                                  name='test'
                                  className={classNames(s.defaultInput, s.title)}
                                  onChange={props.field.onChange} />}
                            </Field>
                            мм
                          </>
                        </Checkbox>}
                    </Field>
                  </Grid>
                </FormGroup>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <div className={classNames(s.title, s.verticalGap)}>
                  Область фуркаций
                </div>

                <FormGroup className={s.checkboxes} >
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Изменений нет</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Деструкция костной ткани альвеолы в области фуркации на всем протяжении корней корня 1/2 длины корня</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('', !field.value)}
                        > Деструкция костной ткани альвеолы в области фуркации на всем протяжении корней корня 1/3 длины корня</Checkbox>}
                    </Field>

                    <Field
                      name="test"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          name='test'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </FormGroup>
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <div className={classNames(s.verticalGap, s.filterOptions)}>
                  <span className={s.title}>
                    Инородные предметы
                  </span>

                  <Field name="foreignObjects">
                    {(props: FieldProps) =>
                      <SelectField
                        className={classNames(s.optionInfo, s.horizontalGap)}
                        selectNavigate
                        selectOptions={[{ value: -1, label: 'Не обнаружены' }, { value: 1, label: 'Обнаружены' }]}
                        {...props}
                      >
                        {
                          [{ value: -1, label: 'Не обнаружены' }, { value: 1, label: 'Обнаружены' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </div>
                {
                  values.foreignObjects > 0 && (
                    <ul className={s.ul}>
                      <li className={classNames(s.verticalGap, s.filterOptions)}>
                        Место нахождения

                        <Field name="test">
                          {(props: FieldProps) =>
                            <SelectField
                              className={classNames(s.optionInfo, s.horizontalGap)}
                              selectNavigate
                              selectOptions={[{ value: -1, label: 'В устье' }, { value: 1, label: 'В средней трети' }, { value: 2, label: 'В апикальной части корня' }]}
                              {...props}
                            >
                              {
                                [{ value: -1, label: 'В устье' }, { value: 1, label: 'В средней трети' }, { value: 2, label: 'В апикальной части корня' }].map(({ label, value: link }) => (
                                  <MenuItem
                                    key={link}
                                    value={link}
                                    className='select-link'
                                  >
                                    {label}
                                  </MenuItem>
                                ))
                              }
                            </SelectField>}
                        </Field>
                      </li>

                      <li className={classNames(s.verticalGap, s.filterOptions)}>
                        Определяется тень плотности

                        <Field name="test">
                          {(props: FieldProps) =>
                            <SelectField
                              className={classNames(s.optionInfo, s.horizontalGap)}
                              selectNavigate
                              selectOptions={[{ value: -1, label: 'Не металлической' }, { value: 1, label: 'Металлической' }]}
                              {...props}
                            >
                              {
                                [{ value: -1, label: 'Не металлической' }, { value: 1, label: 'Металлической' }].map(({ label, value: link }) => (
                                  <MenuItem
                                    key={link}
                                    value={link}
                                    className='select-link'
                                  >
                                    {label}
                                  </MenuItem>
                                ))
                              }
                            </SelectField>}
                        </Field>
                      </li>
                      <li className={classNames(s.verticalGap, s.filterOptions)}>
                        Конфигурация соответствующая фрагменту

                        <Field name="test">
                          {(props: FieldProps) =>
                            <SelectField
                              className={classNames(s.optionInfo, s.horizontalGap)}
                              selectNavigate
                              selectOptions={[{ value: -1, label: 'эндодонтический материал' }, { value: 1, label: 'штифт' }, { value: 2, label: 'стекловолоконный штифт' }, { value: 3, label: 'фрагмент инструмента' }]}
                              {...props}
                            >
                              {
                                [{ value: -1, label: 'эндодонтический материал' }, { value: 1, label: 'штифт' }, { value: 2, label: 'стекловолоконный штифт' }, { value: 3, label: 'фрагмент инструмента' }].map(({ label, value: link }) => (
                                  <MenuItem
                                    key={link}
                                    value={link}
                                    className='select-link'
                                  >
                                    {label}
                                  </MenuItem>
                                ))
                              }
                            </SelectField>}
                        </Field>
                      </li>
                    </ul>
                  )
                }
              </li>
              <li className={classNames(s.verticalGap, s.nameDisease)}>
                <div className={classNames(s.title, s.verticalGap, s.filterOptions)} >
                  Периапикальное пространство (К.04.6-8)
                  <Field name="test">
                    {(props: FieldProps) =>
                      <SelectField
                        className={classNames(s.optionInfo, s.horizontalGap)}
                        selectNavigate
                        selectOptions={[{ value: -1, label: 'эндодонтический материал' }, { value: 1, label: 'штифт' }, { value: 2, label: 'стекловолоконный штифт' }, { value: 3, label: 'фрагмент инструмента' }]}
                        {...props}
                      >
                        {
                          [{ value: -1, label: 'эндодонтический материал' }, { value: 1, label: 'штифт' }, { value: 2, label: 'стекловолоконный штифт' }, { value: 3, label: 'фрагмент инструмента' }].map(({ label, value: link }) => (
                            <MenuItem
                              key={link}
                              value={link}
                              className='select-link'
                            >
                              {label}
                            </MenuItem>
                          ))
                        }
                      </SelectField>}
                  </Field>
                </div>

                <FormGroup className={s.checkboxes} >
                  <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('test', !field.value)}
                        > Без изменений</Checkbox>}
                    </Field>
                  </Grid>
                  <Grid container className={s.verticalGap} >
                    <Grid className={classNames(s.verticalGap, s.filterOptions)}>
                      <Field
                        name="periapicalSpace_1"
                      >
                        {({ field, form }: FieldProps) =>
                          <Checkbox
                            checked={field.value}
                            onChange={() => form.setFieldValue('periapicalSpace_1', !field.value)}
                          >
                            <>
                              В области верхушки корня деструкция (участок радиопросветления) костной ткани без четких контуров,<br />
                              в виде участка сниженной плотности на
                              <Field
                                name="test"
                              >
                                {(props: FieldProps) =>
                                  <UnderlineText
                                    width='100px'
                                    name='test'
                                    className={classNames(s.defaultInput, s.title)}
                                    onChange={props.field.onChange} />}
                              </Field>
                              мм
                            </>
                          </Checkbox>}
                      </Field>
                    </Grid>
                    {
                      values?.periapicalSpace_1 && (
                        <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                          <Field name="test">
                            {(props: FieldProps) =>
                              <SelectField
                                className={classNames(s.optionInfo, s.horizontalGap)}
                                selectNavigate
                                selectOptions={[{ value: -1, label: 'С частичным сохранением рисунка' }, { value: 1, label: 'Без сохранения рисунка' }]}
                                {...props}
                              >
                                {
                                  [{ value: -1, label: 'С частичным сохранением рисунка' }, { value: 1, label: 'Без сохранения рисунка' }].map(({ label, value: link }) => (
                                    <MenuItem
                                      key={link}
                                      value={link}
                                      className='select-link'
                                    >
                                      {label}
                                    </MenuItem>
                                  ))
                                }
                              </SelectField>}
                          </Field>
                        </Grid>
                      )
                    }
                  </Grid>
                  <Grid container className={s.verticalGap} >
                    <li className={s.li}>
                      <div className={s.filterOptions}>
                        Имеется тенденция распространения процесса в сторону периапикальной области

                        <Field name="test">
                          {(props: FieldProps) =>
                            <SelectField
                              className={classNames(s.optionInfo, s.horizontalGap)}
                              selectNavigate
                              selectOptions={[{ value: -1, label: 'зуба' }, { value: 1, label: 'межкорневой перегородки' }]}
                              {...props}
                            >
                              {
                                [{ value: -1, label: 'зуба' }, { value: 1, label: 'межкорневой перегородки' }].map(({ label, value: link }) => (
                                  <MenuItem
                                    key={link}
                                    value={link}
                                    className='select-link'
                                  >
                                    {label}
                                  </MenuItem>
                                ))
                              }
                            </SelectField>}
                        </Field>
                      </div>

                    </li>
                  </Grid>
                  <Grid container className={s.verticalGap} >
                    <Grid className={classNames(s.verticalGap, s.filterOptions)}>
                      <Field
                        name="periapicalSpace_2"
                      >
                        {({ field, form }: FieldProps) =>
                          <Checkbox
                            checked={field.value}
                            onChange={() => form.setFieldValue('periapicalSpace_2', !field.value)}
                          >
                            В просвете очага деструкции – тень, соответствующая по плотности и конфигурации фрагменту пломбировочного материала:
                          </Checkbox>}
                      </Field>
                    </Grid>
                    {
                      values?.periapicalSpace_2 && (
                        <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                          <Field name="test">
                            {(props: FieldProps) =>
                              <SelectField
                                className={classNames(s.optionInfo, s.horizontalGap)}
                                selectNavigate
                                selectOptions={[{ value: -1, label: 'гуттаперчевый штифт' }, { value: 1, label: 'фрагмент эндодонтического инструмента' }]}
                                {...props}
                              >
                                {
                                  [{ value: -1, label: 'гуттаперчевый штифт' }, { value: 1, label: 'фрагмент эндодонтического инструмента' }].map(({ label, value: link }) => (
                                    <MenuItem
                                      key={link}
                                      value={link}
                                      className='select-link'
                                    >
                                      {label}
                                    </MenuItem>
                                  ))
                                }
                              </SelectField>}
                          </Field>
                        </Grid>
                      )
                    }
                  </Grid>
                  <Grid container className={s.verticalGap} >
                    <Grid className={classNames(s.verticalGap, s.filterOptions)}>
                      <Field
                        name="periapicalSpace_3"
                      >
                        {({ field, form }: FieldProps) =>
                          <Checkbox
                            checked={field.value}
                            onChange={() => form.setFieldValue('periapicalSpace_3', !field.value)}
                          >
                            Кортикальная пластинка нижней стенки верхнечелюстного синуса в области проекции радиопросветления
                          </Checkbox>}
                      </Field>
                    </Grid>
                    {
                      values?.periapicalSpace_3 && (
                        <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                          <Field name="test">
                            {(props: FieldProps) =>
                              <SelectField
                                className={classNames(s.optionInfo, s.horizontalGap)}
                                selectNavigate
                                selectOptions={[{ value: -1, label: 'не прослеживается' }, { value: 1, label: 'прослеживается фрагментарно' }, { value: 2, label: 'сохранена на всем протяжении' }]}
                                {...props}
                              >
                                {
                                  [{ value: -1, label: 'не прослеживается' }, { value: 1, label: 'прослеживается фрагментарно' }, { value: 2, label: 'сохранена на всем протяжении' }].map(({ label, value: link }) => (
                                    <MenuItem
                                      key={link}
                                      value={link}
                                      className='select-link'
                                    >
                                      {label}
                                    </MenuItem>
                                  ))
                                }
                              </SelectField>}
                          </Field>
                        </Grid>
                      )
                    }
                  </Grid>

                  <Grid className={classNames(s.verticalGap, s.filterOptions)}>
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('test', !field.value)}
                        >
                          <>
                            В области верхушки корня деструкция (участок радиопросветления) костной ткани с четкими контурами на
                            <Field
                              name="test"
                            >
                              {(props: FieldProps) =>
                                <UnderlineText
                                  width='100px'
                                  name='test'
                                  className={classNames(s.defaultInput, s.title)}
                                  onChange={props.field.onChange} />}
                            </Field>
                            мм
                          </>
                        </Checkbox>}
                    </Field>
                  </Grid>
                  <Grid className={classNames(s.verticalGap, s.filterOptions)}>
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('test', !field.value)}
                        >
                          <>
                            По контуру очага на всем протяжении определяется усиление плотности костного рисунка окружающей <br />
                            ткани в виде перифокального остосклероза без четких контуров
                          </>
                        </Checkbox>}
                    </Field>
                  </Grid>
                  <Grid className={s.verticalGap}>
                    <Grid className={classNames(s.verticalGap, s.filterOptions)}>
                      <Field
                        name="periapicalSpace_4"
                      >
                        {({ field, form }: FieldProps) =>
                          <Checkbox
                            checked={field.value}
                            onChange={() => form.setFieldValue('periapicalSpace_4', !field.value)}
                          >
                            <>
                              Наблюдается линейное снижение плотности рисунка с поперечной протяженностью в области
                              <Field
                                name="test"
                              >
                                {(props: FieldProps) =>
                                  <UnderlineText
                                    width='100px'
                                    name='test'
                                    className={classNames(s.defaultInput, s.title)}
                                    onChange={props.field.onChange} />}
                              </Field>
                              клинически <br />соответствующее нарушению целостности твердых тканей корня зуба (фрактура)
                            </>
                          </Checkbox>}
                      </Field>
                    </Grid>
                    <Grid>
                      {
                        values?.periapicalSpace_4 && (
                          <Grid container className={classNames(s.verticalGap, s.filterOptions)} >
                            <Field name="test">
                              {(props: FieldProps) =>
                                <SelectField
                                  className={classNames(s.optionInfo, s.horizontalGap)}
                                  selectNavigate
                                  selectOptions={[{ value: -1, label: 'со смещением отломков' }, { value: 1, label: 'без смещения отломков' }]}
                                  {...props}
                                >
                                  {
                                    [{ value: -1, label: 'со смещением отломков' }, { value: 1, label: 'без смещения отломков' }].map(({ label, value: link }) => (
                                      <MenuItem
                                        key={link}
                                        value={link}
                                        className='select-link'
                                      >
                                        {label}
                                      </MenuItem>
                                    ))
                                  }
                                </SelectField>}
                            </Field>
                          </Grid>
                        )
                      }
                    </Grid>
                  </Grid>
                  <Grid className={classNames(s.verticalGap, s.filterOptions)}>
                    <Field
                      name="test"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          checked={field.value}
                          onChange={() => form.setFieldValue('test', !field.value)}
                        >
                          <>
                            Кортикальная пластинка нижней стенки верхнечелюстного синуса в области проекции радиопросветления сохранена на всем
                            <br />протяжении, отмечается изменение ее конфигурации и усиление плотности рисунка окружающих тканей,
                            <br />определяющееся как образование округлой формы, выступающее в просвет синуса.
                          </>
                        </Checkbox>}
                    </Field>
                  </Grid>
                </FormGroup>
              </li>
              <li className={classNames(s.title, s.filterOptions)}>
                Комментарий:
                <Field
                  name="test"
                >
                  {(props: FieldProps) =>
                    <UnderlineText
                      width='100%'
                      name='test'
                      className={classNames(s.defaultInput, s.title)}
                      onChange={props.field.onChange} />}
                </Field>
              </li>
            </ul>
          </div>

          <div className={s.cardBlock}>
            <div className={classNames(s.title, s.verticalGap)}>Диагноз</div>
            <ul className={s.ul}>
              <li className={classNames(s.li, s.nameDisease)}>Зуб <span className={s.valueInfo}>{values.toothNumber}</span>  Острый апикальный периодонтит. К04.4</li>
            </ul>
          </div>

          <div className={s.cardBlock}>
            <div className={classNames(s.title, s.verticalGap)}>Прием №1</div>

            <div className={s.horizontalGap}>
              <div className={s.verticalGap}>
                Зуб <span className={s.valueInfo}>{values.toothNumber}</span>  проведено:
              </div>
              <ul className={s.ul}>
                <li className={classNames(s.verticalGap, s.nameDisease, s.description, s.li)}>
                  раскрытие кариозной полости, удаление размягченного пигментированного дентина, формирование полости, раскрытие полости зуба,
                  создание прямого доступа к корневым каналам, обнаружение устьев корневых каналов,
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <Field
                    name="test"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('test', !field.value)}
                      >
                        <div className={s.filterOptions}>
                          Лечение под анестезией
                          <Field name="test">
                            {(props: FieldProps) =>
                              <SelectField
                                className={classNames(s.optionInfo, s.horizontalGap)}
                                selectNavigate
                                selectOptions={[{ value: -1, label: 'инфильтрационной' }, { value: 1, label: 'проводниковой' }, { value: 1, label: 'интралегаментарная' }]}
                                {...props}
                              >
                                {
                                  yesNoOptions.map(({ label, value: link }) => (
                                    <MenuItem
                                      key={link}
                                      value={link}
                                      className='select-link'
                                    >
                                      {label}
                                    </MenuItem>
                                  ))
                                }
                              </SelectField>}
                          </Field>
                          , применен раствор
                          <Field
                            name="test"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='test'
                                className={classNames(s.defaultInput, s.title)}
                                onChange={props.field.onChange} />}
                          </Field>
                        </div>
                      </Checkbox>}
                  </Field>
                </li>

                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <Field
                    name="test"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('test', !field.value)}
                      >Снятие пломбы</Checkbox>}
                  </Field>
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <Field
                    name="test"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('test', !field.value)}
                      >Использование коффердама</Checkbox>}
                  </Field>
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <Field
                    name="test"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('test', !field.value)}
                      >Извлечение штифта,</Checkbox>}
                  </Field>
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <Field
                    name="test"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('test', !field.value)}
                      >
                        <div className={s.filterOptions}>
                          Извлечение отломка, фрагмента инструмента
                          <Field
                            name="test"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='test'
                                className={classNames(s.defaultInput, s.title)}
                                onChange={props.field.onChange} />}
                          </Field>,
                        </div>
                      </Checkbox>}
                  </Field>
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <Field
                    name="test"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('test', !field.value)}
                      >
                        <div className={s.filterOptions}>
                          Распломбирование корневого(ых) канала(ов)
                          <Field
                            name="test"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='test'
                                className={classNames(s.defaultInput, s.title)}
                                onChange={props.field.onChange} />}
                          </Field>,
                        </div>
                      </Checkbox>}
                  </Field>
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <Field
                    name="test"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('test', !field.value)}
                      >Содержимое корневых каналов гнойное,</Checkbox>}
                  </Field>
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <div className={s.verticalGap}>Прохождение канала(ов) до:</div>
                  <FormGroup className={s.checkboxes} >
                    <Grid container className={s.verticalGap}>
                      <Field
                        name="test"
                      >
                        {({ field, form }: FieldProps) =>
                          <Checkbox
                            checked={field.value}
                            onChange={() => form.setFieldValue('test', !field.value)}
                          >
                            <span className={s.filterOptions}>
                              Физиологической верхушки
                              <Field
                                name="test"
                              >
                                {(props: FieldProps) =>
                                  <UnderlineText
                                    width='100%'
                                    name='test'
                                    className={classNames(s.defaultInput, s.title)}
                                    onChange={props.field.onChange} />}
                              </Field>
                            </span>
                          </Checkbox>}
                      </Field>
                    </Grid>
                    <Grid container className={s.verticalGap}>
                      <Field
                        name="test"
                      >
                        {({ field, form }: FieldProps) =>
                          <Checkbox
                            checked={field.value}
                            onChange={() => form.setFieldValue('test', !field.value)}
                          >
                            <span className={classNames(s.filterOptions, 'w-auto')}>
                              На 1/2 канала
                              <Field
                                name="test"
                              >
                                {(props: FieldProps) =>
                                  <UnderlineText
                                    width='100%'
                                    name='test'
                                    className={classNames(s.defaultInput, s.title)}
                                    onChange={props.field.onChange} />}
                              </Field>
                            </span>
                          </Checkbox>}
                      </Field>
                    </Grid>
                    <Grid container className={s.verticalGap}>
                      <Field
                        name="test"
                      >
                        {({ field, form }: FieldProps) =>
                          <Checkbox
                            checked={field.value}
                            onChange={() => form.setFieldValue('test', !field.value)}
                          >
                            <span className={classNames(s.filterOptions, 'w-auto')}>
                              На 1/3 канала
                              <Field
                                name="test"
                              >
                                {(props: FieldProps) =>
                                  <UnderlineText
                                    width='100%'
                                    name='test'
                                    className={classNames(s.defaultInput, s.title)}
                                    onChange={props.field.onChange} />}
                              </Field>
                            </span>
                          </Checkbox>}
                      </Field>
                    </Grid>
                    <Grid container className={s.verticalGap}>
                      <Field
                        name="test"
                      >
                        {({ field, form }: FieldProps) =>
                          <Checkbox
                            checked={field.value}
                            onChange={() => form.setFieldValue('test', !field.value)}
                          >
                            <span className={classNames(s.filterOptions, 'w-auto')}>
                              На 2/3 канала
                              <Field
                                name="test"
                              >
                                {(props: FieldProps) =>
                                  <UnderlineText
                                    width='100%'
                                    name='test'
                                    className={classNames(s.defaultInput, s.title)}
                                    onChange={props.field.onChange} />}
                              </Field>
                            </span>
                          </Checkbox>}
                      </Field>
                    </Grid>
                    <Grid container className={s.verticalGap}>
                      <Field
                        name="test"
                      >
                        {({ field, form }: FieldProps) =>
                          <Checkbox
                            checked={field.value}
                            onChange={() => form.setFieldValue('test', !field.value)}
                          >
                            <span className={classNames(s.filterOptions, 'w-auto')}>
                              Другое
                              <Field
                                name="test"
                              >
                                {(props: FieldProps) =>
                                  <UnderlineText
                                    width='100%'
                                    name='test'
                                    className={classNames(s.defaultInput, s.title)}
                                    onChange={props.field.onChange} />}
                              </Field>
                            </span>
                          </Checkbox>}
                      </Field>
                    </Grid>
                  </FormGroup>
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <Field
                    name="test"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('test', !field.value)}
                      >
                        <div className={s.filterOptions}>
                          Закрытие перфорации
                          <Field
                            name="test"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='test'
                                className={classNames(s.defaultInput, s.title)}
                                onChange={props.field.onChange} />}
                          </Field>,
                        </div>
                      </Checkbox>}
                  </Field>
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.description, s.li)}>
                  Рентгенологический контроль прохождения канала(ов), формирование корневого(ых) канала(ов), медикаментозная обработка
                  и высушивание канала(ов), использование ультразвуковых насадок для активации антисептического раствора,
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <Field
                    name="test"
                  >
                    {({ field, form }: FieldProps) =>
                      <Checkbox
                        checked={field.value}
                        onChange={() => form.setFieldValue('test', !field.value)}
                      >
                        <div className={s.filterOptions}>
                          Временное пломбирование корневого (ых) канала(ов) материалом
                          <Field
                            name="test"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='test'
                                className={classNames(s.defaultInput, s.title)}
                                onChange={props.field.onChange} />}
                          </Field>,
                        </div>
                      </Checkbox>}
                  </Field>
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  Рентгенологический контроль обтурации временным материалом (см. таблицу), поставлена временная пломба.
                </li>
                <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
                  <div className={s.filterOptions}>
                    Назначен повторный прием:
                    <Field
                      name="test"
                      className='form-input'
                    >{({ form, meta }: FieldProps) =>
                      <DatePicker
                        sx={{
                          '.MuiInputBase-root.MuiOutlinedInput-root': {
                            width: '150px',
                            height: '38px',
                            marginLeft: '15px',
                            borderRadius: '10px',
                            border: '1px solid #0E5F8C',
                            background: '#CBECFF',
                            color: 'var(--color-font)',
                            fontSize: '14px',
                            fontWeight: 400,
                          },
                          '.MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root': {
                            color: 'var(--color-font)',
                          },
                        }}
                        value={meta.value}
                        onChange={(date) =>
                          date && form.setFieldValue('test', dayjs(date as string).toISOString())
                        } />
                      }
                    </Field>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <Button
            className={classNames(s.submit, 'form-submit')}
            type="submit"
            color="primary"
          >
            Сохранить
          </Button>
        </Form>
      )
      }
    </Formik >
  );
}
