
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
      }}
      // validationSchema={object().shape({
      //   email: string().email().required(),
      //   password: string().min(5).required(),
      // })}
      onSubmit={handleSubmit}
    >
      {() => (
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
                    name="toothPainText"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='21px'
                        name='toothPainText'
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
                <span className={s.filterOptions}>
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
                      className={classNames(s.defaultInput, s.title)}
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
              <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>Лицо
                <Field
                  name="visualInspectionFace"
                >
                  {(props: FieldProps) =>
                    <textarea
                      rows={1}
                      name='visualInspectionFace'
                      value={props.field.value}
                      onChange={props.field.onChange}
                      className={classNames(s.defaultInput, s.title)} />}
                </Field>
              </li>

            </ul>
          </div>

          <Button
            className={classNames(s.submit, 'form-submit')}
            type="submit"
            color="primary"
          >
            Сохранить
          </Button>
        </Form>
      )}
    </Formik >
  );
}
