import { FormGroup, Grid, MenuItem } from '@mui/material';
import classNames from 'classnames';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { useCreateUpdateMedInfo } from '~entities/patients';
import { API_URL } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { Button } from '~shared/ui/button';
import { Checkbox } from '~shared/ui/checkbox';
import { SelectField } from '~shared/ui/select-field';
import { UnderlineText } from '~shared/ui/underline-text';
import s from './styles.module.scss';

type MedInfoDetailProps = {
  id: string
  patientId: string
};

const tstArray = [
  {
    name: '',
    type: 'string',
    value: '№ 149219192 от 10.10.2014',
  },
  {
    name: 'Фамилия, имя, отчество',
    type: 'string',
    value: 'Гайхел Іван Іванович',
  },
  {
    name: '',
    type: 'string',
    value: 'Мужчина',
  },
  {
    name: 'Адресс',
    type: 'string',
    value: 'Ужгород',
  },
  {
    name: 'Возраст',
    type: 'string',
    value: '55',
  },
  {
    name: 'Професия',
    type: 'string',
    value: 'Програмист',
  },
  {
    name: 'Диагноз',
    type: 'string',
    value: 'Дебил',
  },
  {
    name: 'Диагноз по МКБ - 10',
    type: 'empty',
    value: 'Дебил',
  },
  {
    name: 'Жалобы',
    type: 'string',
    value: 'Жутко хочу спать',
  },
  {
    name: 'Перенесенные и сопуствующие заболевания',
    type: 'string',
    value: 'Пянство',
  },
  {
    name: 'Развитие настоящего заболевания',
    type: 'empty',
    value: '',
  },
  {
    name: 'Внешний вид',
    type: 'array',
    value: JSON.stringify([{
      name: 'Лицо',
      type: 'string',
      value: 'Симетричное чутка ебанутое',
    }, {
      name: 'кожные покровы',
      type: 'string',
      value: 'чистые',
    }, {
      name: 'подчелюстыне лимфатические узлы',
      type: 'array',
      value: JSON.stringify([{
        name: 'Ствойства',
        type: 'string',
        value: 'не увеличены',
      }, {
        name: 'Консистенция',
        type: 'string',
        value: 'Однородная',
      }]),
    }, {
      name: 'Подбородочные складки',
      type: 'string',
      value: 'не выражены',
    }, {
      name: 'нособные складки',
      type: 'string',
      value: 'не выраженые',
    }, {
      name: 'нижняя треть лица',
      type: 'string',
      value: 'не снижена',
    }]),
  },
  {
    name: '', // коментарий
    type: 'string',
    value: 'всьо збс',
  },
  {
    name: 'Состояния зубов',
    type: 'string',
    value: 'налет на зубах нет', ///
  },
  {
    name: 'Зубная формула',
    type: 'image',
    value: 'https://689f-31-41-94-255.ngrok-free.app/images/photo_2024-03-11_19-55-31.jpg',
  },
  {
    name: 'Состояние слизистой оболочки рта, десен, альвеолярных отростков и неба',
    type: 'array',
    value: JSON.stringify([
      {
        name: 'Слизистая оболочка рта',
        type: 'string',
        value: 'бледно-розового цвета не отечна',
      },
      {
        name: 'кровоточивость при эондировании',
        type: 'string',
        value: 'нет',
      },
      {
        name: 'наличие рубцов',
        type: 'string',
        value: 'нет',
      },
      {
        name: 'пародантальные карманы',
        type: 'string',
        value: 'нет',
      },
      {
        name: 'выделение экссудата из кармана',
        type: 'string',
        value: 'нет коментарий',
      },
      {
        name: 'Альвеолярный отросток',
        type: 'array',
        value: JSON.stringify([
          {
            name: 'Верхняя челюсть',
            type: 'array',
            value: JSON.stringify([{
              name: 'Экзостоз',
              type: 'string',
              value: 'нет',
            },
            {
              name: '«болтающийся» гребень ',
              type: 'string',
              value: 'нет',
            },
            {
              name: 'атрофия',
              type: 'string',
              value: 'нет',
            },
            ]),
          },
        ]),
      },
      {
        name: 'Нижняя челюсть',
        type: 'array',
        value: JSON.stringify([
          {
            name: 'Верхняя челюсть',
            type: 'array',
            value: JSON.stringify([{
              name: 'Экзостоз',
              type: 'string',
              value: 'нет',
            },
            {
              name: '«болтающийся» гребень ',
              type: 'string',
              value: 'нет',
            },
            {
              name: 'атрофия',
              type: 'string',
              value: 'нет',
            },
            ]),
          },
        ]),
      },
      {
        name: 'Слюнная железа',
        type: 'array',
        value: JSON.stringify([
          {
            name: 'Подчелюстная при пальпации',
            type: 'string',
            value: 'однородная безболезненая симеттрическая коментарий',
          },
          {
            name: 'Околоушная при пальпации',
            type: 'string',
            value: 'однородная безболезненая симеттрическая коментарий',
          },
        ]),
      },
      {
        name: 'Осмотр губ',
        type: 'array',
        value: JSON.stringify([{
          name: 'Красный кайма губ',
          type: 'string',
          value: 'бледно-розовая влажная',
        },

        {
          name: 'Наличия чешуек',
          type: 'string',
          value: 'нет',
        },
        {
          name: 'Наличия чешуек',
          type: 'string',
          value: 'нет',
        },
        {
          name: 'Трещины',
          type: 'checkboks',
          value: JSON.stringify([{
            name: 'Верхняя губа',
            type: 'checkboks',
            value: JSON.stringify([{
              name: 'Центральная',
              type: 'boks',
              value: true,
            },
            {
              name: 'парацентральная',
              type: 'boks',
              value: true,
            }]),
          },


          {
            name: 'Нижняя губа',
            type: 'checkboks',
            value: JSON.stringify([{
              name: 'Центральная',
              type: 'boks',
              value: true,
            },
            {
              name: 'парацентральная',
              type: 'boks',
              value: true,
            }]),
          },

          {
            name: 'Коммисуральная',
            type: 'boks',
            value: true,
          },
          ]),
        },
        ]),
      },
    ]),
  },
];

export function MedInfoDetail({ patientId }: MedInfoDetailProps) {
  const { mutate } = useCreateUpdateMedInfo();

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>,
  ) => {

    const info = JSON.stringify(tstArray);
    console.log('values', values);
    console.log('info', info);

    await mutate({ info, patientId }, {
      onSuccess: () => {
        resetForm();
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  return (
    <Formik
      initialValues={{
        test16: '',
        test_atrofia: '',
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
          <div className={s.cardBlock}>
            <span className={s.titleName}> Медицинская информация больного</span>

            <div className={classNames(s.title)}>
              № <span className={s.redHighlight}>345346356456</span> от
              «
              <Field
                name="test1"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='10px'
                    name='test1'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
              »
            </div>
            <div className={classNames(s.title)}>
              1. Фамилия, имя, отчество:
              <span className={classNames(s.redHighlight, s.italic)}> Пупкин Василий Васильевич</span>
            </div>
            <div className={classNames(s.title)}>2. <span className={s.redHighlight}> Мужчина</span> </div>
            <div className={classNames(s.title)}>3. Адрес:   <span className={classNames(s.redHighlight, s.italic)}> ул. Пушкина д27, кв 65</span> </div>
            <div className={classNames(s.title)}>4. Телефон: <span className={classNames(s.redHighlight, s.italic)}> +380966528347</span> </div>
            <div className={classNames(s.title)}>5. Возраст: <span className={classNames(s.redHighlight, s.italic)}> 55</span> </div>
            <div className={classNames(s.title)}>6. Профессия:
              <Field
                name="test2"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='test2'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>7. Диагноз:
              <Field
                name="test3"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='test3'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>8. Диагноз по МКБ -10:
              <Field
                name="test4"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='test4'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>9. Жалобы:
              <Field
                name="test5"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='test5'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>10. Перенесенные и сопутствующие заболевания:
              <Field
                name="test6"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='test6'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>11. Развитие настоящего заболевания:
              <Field
                name="test7"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='test7'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>


            <Grid>
              12. Внешний осмотр:
              <ul className={s.ul}>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    Лицо
                    <Field name="test8">
                      {(props: FieldProps) =>
                        <SelectField
                          className={s.optionInfo}
                          selectNavigate
                          selectOptions={[{ value: 1, label: 'Симметричное' }]}
                          {...props}
                        >
                          {[{ value: 1, label: 'Симметричное' }].map(({ label, value: link }) => (
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
                      name="test9"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='test9'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    Кожные покровы:
                    <Field name="10">
                      {(props: FieldProps) =>
                        <SelectField
                          className={s.optionInfo}
                          selectNavigate
                          selectOptions={[{ value: 1, label: 'Чистые' }]}
                          {...props}
                        >
                          {[{ value: 1, label: 'Чистые' }].map(({ label, value: link }) => (
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
                      name="test11"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='test11'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} >
                    Подчелюстные лимфатические узлы:
                    <Grid marginBlock={2} className={s.filterOptions}>
                      <span> Свойства </span>

                      <Field name="test2">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: 1, label: 'Не увеличены' }, { value: 2, label: 'Увеличены слева' }, { value: 3, label: 'Увеличены справа' }, { value: 4, label: 'Увеличены с обеих сторон' }, { value: 5, label: 'Увеличены с одной стороны' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              {...props}
                            >
                              {selectOptions.map(({ label, value: link }) => (
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
                          );
                        }}
                      </Field>
                      <Field name="test12">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: 1, label: 'Безболезненные' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              {...props}
                            >
                              {selectOptions.map(({ label, value: link }) => (
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
                          );
                        }}
                      </Field>
                      <Field name="test13">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: 1, label: 'Не спаяны с окружающики тканями' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              {...props}
                            >
                              {selectOptions.map(({ label, value: link }) => (
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
                          );
                        }}
                      </Field>


                      <Field
                        name="test14"
                      >
                        {(props: FieldProps) =>
                          <UnderlineText
                            width='100%'
                            name='test14'
                            className={classNames(s.defaultInput, s.title)}
                            onChange={props.field.onChange} />}
                      </Field>
                    </Grid>
                    <Grid marginBlock={2} className={s.filterOptions}>
                      <span> Консистенция </span>

                      <Field name="test2">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: 1, label: 'Однородная' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              {...props}
                            >
                              {selectOptions.map(({ label, value: link }) => (
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
                          );
                        }}
                      </Field>
                    </Grid>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    Подбородочные складки
                    <Field name="test2">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: 1, label: 'Не выражены' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    Носогубные складки
                    <Field name="test2">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: 1, label: 'Не выражены' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    Нижняя треть лица
                    <Field name="test2">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: 1, label: 'Не выражены' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2}>
                    <span>Комментарий</span>
                    <Field
                      name="test15"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='test15'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </li>
              </ul>
            </Grid>

            <div className={s.title}>
              <Grid className={s.filterOptions}>
                <Grid marginRight={1}>13. Состояние зубов: <span>налет на зубах</span></Grid>
                <Field name="test16">
                  {(props: FieldProps) => {
                    const selectOptions = [{ value: -1, label: 'Нет' }, { value: 2, label: 'Да' }];
                    return (
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={selectOptions}
                        {...props}
                      >
                        {selectOptions.map(({ label, value: link }) => (
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
                    );
                  }}
                </Field>
                {
                  values.test16 && (
                    <Field
                      name="test17"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='test17'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  )
                }
              </Grid>
              <Grid marginBlock={2} marginLeft={2} className={s.filterOptions}>
                <Field name="test18">
                  {(props: FieldProps) => {
                    const selectOptions = [{ value: 1, label: 'пигментированный' }];
                    return (
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={selectOptions}
                        {...props}
                      >
                        {selectOptions.map(({ label, value: link }) => (
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
                    );
                  }}
                </Field>
                <Field name="test19">
                  {(props: FieldProps) => {
                    const selectOptions = [{ value: 1, label: 'Твердый' }];
                    return (
                      <SelectField
                        className={s.optionInfo}
                        selectNavigate
                        selectOptions={selectOptions}
                        {...props}
                      >
                        {selectOptions.map(({ label, value: link }) => (
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
                    );
                  }}
                </Field>
                <Grid className={s.filterOptions} >
                  <Grid >
                    <Field
                      name="1"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          className={s.checkbox}
                          checked={field.value}
                          onChange={() => form.setFieldValue('1', !field.value)}
                        >
                          наддесневой
                        </Checkbox>
                      }
                    </Field>
                  </Grid>
                  <Grid >
                    <Field
                      name="2"
                    >
                      {({ field, form }: FieldProps) =>
                        <Checkbox
                          className={s.checkbox}
                          checked={field.value}
                          onChange={() => form.setFieldValue('2', !field.value)}
                        >
                          поддесневой
                        </Checkbox>
                      }
                    </Field>
                  </Grid>
                </Grid>
                <Grid className={s.filterOptions} >
                  <Grid marginRight={2}>Количество</Grid>

                  <Field name="test20">
                    {(props: FieldProps) => {
                      const selectOptions = [{ value: 1, label: 'обильное' }];
                      return (
                        <SelectField
                          className={s.optionInfo}
                          selectNavigate
                          selectOptions={selectOptions}
                          {...props}
                        >
                          {selectOptions.map(({ label, value: link }) => (
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
                      );
                    }}
                  </Field>
                </Grid>
                <Field
                  name="test14"
                >
                  {(props: FieldProps) =>
                    <UnderlineText
                      width='100%'
                      name='test14'
                      className={classNames(s.defaultInput, s.title)}
                      onChange={props.field.onChange} />}
                </Field>
              </Grid>
            </div>
            <div className={classNames(s.title)}>14. Зубная формула
              <Grid marginBlock={2} className={s.insertedPicture}>
                <img src={`${API_URL}/static/2.jpg`} alt='14' />
              </Grid>
            </div>
            <div className={s.title}>
              <Grid marginBlock={2}>15. Состояние слизистой оболочки рта, десен, альвеолярных отростков и неба:</Grid>
              <ul className={s.ul}>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>Слизистая оболочка рта</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'бледно-розового цвета' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>

                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'не отечна' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>кровоточивость при зондировании</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'нет' }, { value: 1, label: 'да' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>наличие рубцов</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'нет' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>пародонтальные карманы </Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'нет' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                    *ком. для врача: если ДА, заполните парадонтограмму
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>выделение экссудата из кармана</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'нет' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>

                    <Field
                      name="test7"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='test7'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li} >
                  <Grid marginBlock={2} >
                    Альвеолярный отросток:
                  </Grid>
                  <Grid marginInline={1} marginBlock={4}>
                    Верхняя челюсть
                    <Grid marginInline={2} marginBlock={2}>
                      <Grid marginBlock={1} className={s.filterOptions}>
                        Экзостоз
                        <Field name="test16">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: -1, label: 'нет' }];
                            return (
                              <SelectField
                                className={s.optionInfo}
                                selectNavigate
                                selectOptions={selectOptions}
                                {...props}
                              >
                                {selectOptions.map(({ label, value: link }) => (
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
                            );
                          }}
                        </Field>
                        <Field
                          name="test7"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='test7'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </Grid>
                    <Grid marginInline={2} marginBlock={2} className={s.filterOptions}>
                      «болтающийся» гребень
                      <Field name="test16">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: -1, label: 'нет' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              {...props}
                            >
                              {selectOptions.map(({ label, value: link }) => (
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
                          );
                        }}
                      </Field>
                      <Field
                        name="test7"
                      >
                        {(props: FieldProps) =>
                          <UnderlineText
                            width='100%'
                            name='test7'
                            className={classNames(s.defaultInput, s.title)}
                            onChange={props.field.onChange} />}
                      </Field>
                    </Grid>
                    <Grid marginInline={2} marginBlock={2} className={s.filterOptions}>
                      атрофия
                      <Field name="test_atrofia">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: -1, label: 'нет' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              {...props}
                            >
                              {selectOptions.map(({ label, value: link }) => (
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
                          );
                        }}
                      </Field>
                      {
                        values.test_atrofia && (
                          <>
                            <Field
                              name="1"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  className={s.checkbox}
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('1', !field.value)}
                                >
                                  не выражена
                                </Checkbox>
                              }
                            </Field>
                            <Field
                              name="1"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  className={s.checkbox}
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('1', !field.value)}
                                >
                                  выражена
                                </Checkbox>
                              }
                            </Field>
                          </>
                        )
                      }
                      <Field
                        name="test7"
                      >
                        {(props: FieldProps) =>
                          <UnderlineText
                            width='100%'
                            name='test7'
                            className={classNames(s.defaultInput, s.title)}
                            onChange={props.field.onChange} />}
                      </Field>
                    </Grid>
                  </Grid>
                  <Grid marginInline={1} marginBlock={4}>
                    Нижняя челюсть
                    <Grid marginInline={2} marginBlock={2}>
                      <Grid marginBlock={1} className={s.filterOptions}>
                        Экзостоз
                        <Field name="test16">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: -1, label: 'нет' }];
                            return (
                              <SelectField
                                className={s.optionInfo}
                                selectNavigate
                                selectOptions={selectOptions}
                                {...props}
                              >
                                {selectOptions.map(({ label, value: link }) => (
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
                            );
                          }}
                        </Field>
                        <Field
                          name="test7"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='test7'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </Grid>
                    <Grid marginInline={2} marginBlock={2} className={s.filterOptions}>
                      «болтающийся» гребень
                      <Field name="test16">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: -1, label: 'нет' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              {...props}
                            >
                              {selectOptions.map(({ label, value: link }) => (
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
                          );
                        }}
                      </Field>
                      <Field
                        name="test7"
                      >
                        {(props: FieldProps) =>
                          <UnderlineText
                            width='100%'
                            name='test7'
                            className={classNames(s.defaultInput, s.title)}
                            onChange={props.field.onChange} />}
                      </Field>
                    </Grid>
                    <Grid marginInline={2} marginBlock={2} className={s.filterOptions}>
                      атрофия
                      <Field name="test_atrofia">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: -1, label: 'нет' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              {...props}
                            >
                              {selectOptions.map(({ label, value: link }) => (
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
                          );
                        }}
                      </Field>
                      {
                        values.test_atrofia && (
                          <>
                            <Field
                              name="1"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  className={s.checkbox}
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('1', !field.value)}
                                >
                                  не выражена
                                </Checkbox>
                              }
                            </Field>
                            <Field
                              name="1"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  className={s.checkbox}
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('1', !field.value)}
                                >
                                  выражена
                                </Checkbox>
                              }
                            </Field>
                          </>
                        )
                      }
                      <Field
                        name="test7"
                      >
                        {(props: FieldProps) =>
                          <UnderlineText
                            width='100%'
                            name='test7'
                            className={classNames(s.defaultInput, s.title)}
                            onChange={props.field.onChange} />}
                      </Field>
                    </Grid>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    Слюнная железа
                  </Grid>
                  <Grid marginInline={1} marginBlock={2} className={s.filterOptions}>
                    Подчелюстная при пальпации
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'однородная' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'безболезненная' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'симметричная' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                    <Field
                      name="test7"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='test7'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                  <Grid marginInline={1} marginBlock={2} className={s.filterOptions}>
                    Околоушная при пальпации
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'однородная' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'безболезненная' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'симметричная' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                    <Field
                      name="test7"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='test7'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </li>
              </ul>
            </div>

            <div className={s.title}>
              <Grid marginBlock={2}>16. Осмотр губ:</Grid>
              <ul className={s.ul}>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>красная кайма губ</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'бледно-розовая' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'влажная' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>наличие чешуек</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'нет' }, { value: 1, label: 'да' }];
                        return (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={selectOptions}
                            {...props}
                          >
                            {selectOptions.map(({ label, value: link }) => (
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
                        );
                      }}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} >
                    <Grid marginRight={1}>Трещины:</Grid>
                    <FormGroup className={s.filterOptions} >
                      <Grid container  >
                        <Grid item xs={4} >
                          <Field
                            name="complaint"
                          >
                            {({ field, form }: FieldProps) =>
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue('complaint', !field.value)}
                              >
                                Верхняя губа
                              </Checkbox>
                            }
                          </Field>
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            name="2"
                          >
                            {({ field, form }: FieldProps) =>
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue('2', !field.value)}
                              >
                                Нижняя губа
                              </Checkbox>
                            }
                          </Field>
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            name="3"
                          >
                            {({ field, form }: FieldProps) =>
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue('3', !field.value)}
                              >
                                коммисуральная
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
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} >
                    <Grid className={s.filterOptions}>
                      Трещина в анамнезе
                      <Field name="test16">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: -1, label: 'нет' }, { value: 1, label: 'да' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              {...props}
                            >
                              {selectOptions.map(({ label, value: link }) => (
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
                          );
                        }}
                      </Field>
                    </Grid>
                    <Field
                      name="test17"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='test17'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </li>
              </ul>
            </div>

            <div className={classNames(s.title)}>21. Данные рентгенологического и лабораторного исследования:
              <Field
                name="test21"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='test7'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>22. Бланк онкологического профилактического медицинского осмотра:
              <Grid marginBlock={2} className={s.insertedPicture}>
                <img src={`${API_URL}/static/1.jpg`} alt='22' />
              </Grid>
            </div>
            <div className={classNames(s.title)}>23. Бланк обследования на венерические заболивания:
              <Grid marginBlock={2} className={s.insertedPicture}>
                <img src={`${API_URL}/static/3.jpg`} alt='23' />
              </Grid>
            </div>
            <div className={classNames(s.title)}>24. Предварительное планирование лечения:
              <Grid marginTop={2} className={s.insertedPicture}>
                <img src={`${API_URL}/static/4.jpg`} alt='24.1' />
              </Grid>
              <div className={s.insertedPicture}>
                <img src={`${API_URL}/static/5.jpg`} alt='24.2' />
              </div>
            </div>

            <div className={classNames(s.title)}>25. Установеленные импланты:
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
