import { FormGroup, Grid, MenuItem } from '@mui/material';
import classNames from 'classnames';
import { Field, FieldProps, Form, Formik } from 'formik';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { useCreateUpdateMedInfo } from '~entities/patients';
import { sessionApi } from '~entities/session';
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

type InitialValues = {
  startDay: string
  startMonth: string
  startYear: string
  fullName: string,
  sex: string
  address: string
  phone: string
  age: string
  specialization: string
  diagnosis: string
  diagnosisICD: string
  complaints: string
  previousConcomitantDiseases: string
  developmentDisease: string
  visualInspection: string
  faceSelect: string
  faceText: string
  skinSelect: string
  skinText: string
  propertiesOne: string
  propertiesTwo: string
  propertiesThree: string
  propertiesInfo: string
  consistency: string
  chinFolds: string
  nasolabialFolds: string
  lowerFace: string
  externalInspectionComment: string
  plaqueOnTeeth: string
  plaqueOnTeethText: string
  plaqueOnTeethDropdown1: string
  plaqueOnTeethDropdown2: string
  plaqueOnTeethDropdown3: string
  plaqueOnTeethCheckbox1: string
  plaqueOnTeethCheckbox2: string
  plaqueOnTeethInputField: string
};

// const tstArray = [
//   {
//     name: '',
//     type: 'string',
//     value: '№ 149219192 от 10.10.2014',
//   },
//   {
//     name: 'Фамилия, имя, отчество',
//     type: 'string',
//     value: 'Гайхел Іван Іванович',
//   },
//   {
//     name: '',
//     type: 'string',
//     value: 'Мужчина',
//   },
//   {
//     name: 'Адресс',
//     type: 'string',
//     value: 'Ужгород',
//   },
//   {
//     name: 'Возраст',
//     type: 'string',
//     value: '55',
//   },
//   {
//     name: 'Професия',
//     type: 'string',
//     value: 'Програмист',
//   },
//   {
//     name: 'Диагноз',
//     type: 'string',
//     value: 'Дебил',
//   },
//   {
//     name: 'Диагноз по МКБ - 10',
//     type: 'empty',
//     value: 'Дебил',
//   },
//   {
//     name: 'Жалобы',
//     type: 'string',
//     value: 'Жутко хочу спать',
//   },
//   {
//     name: 'Перенесенные и сопуствующие заболевания',
//     type: 'string',
//     value: 'Пянство',
//   },
//   {
//     name: 'Развитие настоящего заболевания',
//     type: 'empty',
//     value: '',
//   },
//   {
//     name: 'Внешний вид',
//     type: 'array',
//     value: JSON.stringify([{
//       name: 'Лицо',
//       type: 'string',
//       value: 'Симетричное чутка ебанутое',
//     }, {
//       name: 'кожные покровы',
//       type: 'string',
//       value: 'чистые',
//     }, {
//       name: 'подчелюстыне лимфатические узлы',
//       type: 'array',
//       value: JSON.stringify([{
//         name: 'Ствойства',
//         type: 'string',
//         value: 'не увеличены',
//       }, {
//         name: 'Консистенция',
//         type: 'string',
//         value: 'Однородная',
//       }]),
//     }, {
//       name: 'Подбородочные складки',
//       type: 'string',
//       value: 'не выражены',
//     }, {
//       name: 'нособные складки',
//       type: 'string',
//       value: 'не выраженые',
//     }, {
//       name: 'нижняя треть лица',
//       type: 'string',
//       value: 'не снижена',
//     }]),
//   },
//   {
//     name: '', // коментарий
//     type: 'string',
//     value: 'всьо збс',
//   },
//   {
//     name: 'Состояния зубов',
//     type: 'string',
//     value: 'налет на зубах нет', ///
//   },
//   {
//     name: 'Зубная формула',
//     type: 'image',
//     value: 'https://689f-31-41-94-255.ngrok-free.app/images/photo_2024-03-11_19-55-31.jpg',
//   },
// {
//   name: 'Состояние слизистой оболочки рта, десен, альвеолярных отростков и неба',
//   type: 'array',
//   value: JSON.stringify([
//     {
//       name: 'Слизистая оболочка рта',
//       type: 'string',
//       value: 'бледно-розового цвета не отечна',
//     },
//     {
//       name: 'кровоточивость при эондировании',
//       type: 'string',
//       value: 'нет',
//     },
//     {
//       name: 'наличие рубцов',
//       type: 'string',
//       value: 'нет',
//     },
//     {
//       name: 'пародантальные карманы',
//       type: 'string',
//       value: 'нет',
//     },
//     {
//       name: 'выделение экссудата из кармана',
//       type: 'string',
//       value: 'нет коментарий',
//     },
//     {
//       name: 'Альвеолярный отросток',
//       type: 'array',
//       value: JSON.stringify([
//         {
//           name: 'Верхняя челюсть',
//           type: 'array',
//           value: JSON.stringify([{
//             name: 'Экзостоз',
//             type: 'string',
//             value: 'нет',
//           },
//           {
//             name: '«болтающийся» гребень ',
//             type: 'string',
//             value: 'нет',
//           },
//           {
//             name: 'атрофия',
//             type: 'string',
//             value: 'нет',
//           },
//           ]),
//         },
//       ]),
//     },
//     {
//       name: 'Нижняя челюсть',
//       type: 'array',
//       value: JSON.stringify([
//         {
//           name: 'Верхняя челюсть',
//           type: 'array',
//           value: JSON.stringify([{
//             name: 'Экзостоз',
//             type: 'string',
//             value: 'нет',
//           },
//           {
//             name: '«болтающийся» гребень ',
//             type: 'string',
//             value: 'нет',
//           },
//           {
//             name: 'атрофия',
//             type: 'string',
//             value: 'нет',
//           },
//           ]),
//         },
//       ]),
//     },
//     {
//       name: 'Слюнная железа',
//       type: 'array',
//       value: JSON.stringify([
//         {
//           name: 'Подчелюстная при пальпации',
//           type: 'string',
//           value: 'однородная безболезненая симеттрическая коментарий',
//         },
//         {
//           name: 'Околоушная при пальпации',
//           type: 'string',
//           value: 'однородная безболезненая симеттрическая коментарий',
//         },
//       ]),
//     },
//     {
//       name: 'Осмотр губ',
//       type: 'array',
//       value: JSON.stringify([{
//         name: 'Красный кайма губ',
//         type: 'string',
//         value: 'бледно-розовая влажная',
//       },

//       {
//         name: 'Наличия чешуек',
//         type: 'string',
//         value: 'нет',
//       },
//       {
//         name: 'Наличия чешуек',
//         type: 'string',
//         value: 'нет',
//       },
//       {
//         name: 'Трещины',
//         type: 'checkboks',
//         value: JSON.stringify([{
//           name: 'Верхняя губа',
//           type: 'checkboks',
//           value: JSON.stringify([{
//             name: 'Центральная',
//             type: 'boks',
//             value: true,
//           },
//           {
//             name: 'парацентральная',
//             type: 'boks',
//             value: true,
//           }]),
//         },


//         {
//           name: 'Нижняя губа',
//           type: 'checkboks',
//           value: JSON.stringify([{
//             name: 'Центральная',
//             type: 'boks',
//             value: true,
//           },
//           {
//             name: 'парацентральная',
//             type: 'boks',
//             value: true,
//           }]),
//         },

//         {
//           name: 'Коммисуральная',
//           type: 'boks',
//           value: true,
//         },
//         ]),
//       },
//       ]),
//     },
//   ]),
// },
// ];

export function MedInfoDetail({ patientId }: MedInfoDetailProps) {
  const { data: patientInfo, isLoading } = sessionApi.useGetUserId(patientId);
  const { mutate } = useCreateUpdateMedInfo();

  const handleSubmit = async (
    values: InitialValues,
    // { resetForm }: FormikHelpers<any>,
  ) => {

    const medInfoData = [
      {
        name: '',
        type: 'string',
        value: `№ ${patientId} от «${values.startDay}» ${values.startMonth} ${values.startYear} `,
      },
      {
        name: '1. Фамилия, имя, отчество:',
        type: 'string',
        value: values.fullName,
      },
      {
        name: '2. ',
        type: 'string',
        value: values.sex,
      },
      {
        name: '3. Адрес:',
        type: 'string',
        value: values.address,
      },
      {
        name: '4. Телефон:',
        type: 'string',
        value: values.phone,
      },
      {
        name: '5. Возраст:',
        type: 'string',
        value: values.age,
      },
      {
        name: '6. Профессия:',
        type: 'string',
        value: values.specialization,
      },
      {
        name: '7. Диагноз:',
        type: 'string',
        value: values.diagnosis,
      },
      {
        name: '8. Диагноз по МКБ -10:',
        type: 'string',
        value: values.diagnosisICD,
      },
      {
        name: '9. Жалобы:',
        type: 'string',
        value: values.complaints,
      },
      {
        name: '10. Перенесенные и сопутствующие заболевания:',
        type: 'string',
        value: values.previousConcomitantDiseases,
      },
      {
        name: '11. Развитие настоящего заболевания:',
        type: 'string',
        value: values.developmentDisease,
      },
      {
        name: '12. Внешний осмотр:',
        type: 'array',
        value: JSON.stringify([{
          name: 'Лицо',
          type: 'string',
          value: `${values.faceSelect} ${values.faceText}`,
        }, {
          name: 'Кожные покровы',
          type: 'string',
          value: `${values.skinSelect} ${values.skinText}`,
        }, {
          name: 'Подчелюстные лимфатические узлы',
          type: 'array',
          value: JSON.stringify([{
            name: 'Ствойства',
            type: 'string',
            value: `${values.propertiesOne}, ${values.propertiesTwo}, ${values.propertiesThree} ${values.propertiesInfo}`,
          }, {
            name: 'Консистенция',
            type: 'string',
            value: `${values.consistency}`,
          }]),
        }, {
          name: 'Подбородочные складки',
          type: 'string',
          value: `${values.chinFolds}`,
        }, {
          name: 'Нособные складки',
          type: 'string',
          value: `${values.nasolabialFolds}`,
        }, {
          name: 'Нижняя треть лица',
          type: 'string',
          value: `${values.lowerFace}`,
        }]),
      },
      {
        name: '', // коментарий
        type: 'string',
        value: values.externalInspectionComment,
      },
      {
        name: '13. Состояние зубов: налет на зубах',
        type: 'string',
        value: `${values.plaqueOnTeeth !== 'Нет'
          ? `${values.plaqueOnTeethText} ${values.plaqueOnTeethDropdown1} ${values.plaqueOnTeethDropdown2} ${values.plaqueOnTeethCheckbox1} ${values.plaqueOnTeethCheckbox2} Количество: ${values.plaqueOnTeethDropdown3} ${values.plaqueOnTeethInputField}`
          : 'нет'
          }`,
      },
      {
        name: '14. Зубная формула:',
        type: 'image',
        value: `${API_URL}/static/2.jpg`,
      },

      {
        name: '15. Состояние слизистой оболочки рта, десен, альвеолярных отростков и неба:',
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
        ]),
      },

      {
        name: '22. Бланк онкологического профилактического медицинского осмотра',
        type: 'image',
        value: `${API_URL}/static/1.jpg`,
      },
      {
        name: '23. Бланк обследования на венерические заболивания',
        type: 'image',
        value: `${API_URL}/static/3.jpg`,
      },
      {
        name: '24. Предварительное планирование лечения',
        type: 'image',
        value: `${API_URL}/static/4.jpg`,
      },
      {
        name: '',
        type: 'image',
        value: `${API_URL}/static/5.jpg`,
      },
    ];


    const info = JSON.stringify(medInfoData);

    await mutate({ info, patientId }, {
      onSuccess: (data) => {
        window.open(`${API_URL}/${data.medInfoPath}`);

        console.log('data', data);

        // resetForm();
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  console.log('patientInfo', patientInfo);

  if (isLoading) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        startDay: '',
        startMonth: '',
        startYear: '20',
        fullName: 'Пупкин Василий Васильевич',
        sex: '',
        address: '',
        phone: '',
        age: '',
        specialization: '',
        diagnosis: '',
        diagnosisICD: '',
        complaints: '',
        previousConcomitantDiseases: '',
        developmentDisease: '',
        visualInspection: '',
        faceSelect: '',
        faceText: '',
        skinSelect: '',
        skinText: '',
        propertiesOne: '',
        propertiesTwo: '',
        propertiesThree: '',
        propertiesInfo: '',
        consistency: '',
        chinFolds: '',
        nasolabialFolds: '',
        lowerFace: '',
        externalInspectionComment: '',
        plaqueOnTeeth: 'Нет',
        plaqueOnTeethText: '',
        plaqueOnTeethDropdown1: 'пигментированный',
        plaqueOnTeethDropdown2: 'Твердый',
        plaqueOnTeethDropdown3: 'обильное',
        plaqueOnTeethCheckbox1: '',
        plaqueOnTeethCheckbox2: '',
        plaqueOnTeethInputField: '',

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
              № <span className={s.redHighlight}>{patientId}</span> от
              «
              <Field
                name="startDay"
              >
                {(props: FieldProps) =>
                  <InputMask name="startDay" style={{ width: 16 }} className={s.defaultInput}
                    onChange={props.field.onChange} mask="99" placeholder='__.' maskChar="_" />}
              </Field>
              »{' '}
              <Field
                name="startMonth"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='200px'
                    name='startMonth'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
              <Field
                name="startYear"
              >
                {(props: FieldProps) =>
                  <InputMask name="startYear" className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} mask="20\ 99 г." placeholder='20__ г.' maskChar="_" />
                }
              </Field>
            </div>
            <div className={classNames(s.title)}>
              1. Фамилия, имя, отчество:
              <span className={classNames(s.redHighlight, s.italic)}>{patientInfo?.fullName}</span>
            </div>
            <div className={classNames(s.title)}>2. <span className={s.redHighlight}> Мужчина</span> </div>
            <div className={classNames(s.title)}>3. Адрес:   <span className={classNames(s.redHighlight, s.italic)}> ул. Пушкина д27, кв 65</span> </div>
            <div className={classNames(s.title)}>4. Телефон: <span className={classNames(s.redHighlight, s.italic)}> +380966528347</span> </div>
            <div className={classNames(s.title)}>5. Возраст: <span className={classNames(s.redHighlight, s.italic)}> 55</span> </div>
            <div className={classNames(s.title)}>6. Профессия:
              <Field
                name="specialization"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='specialization'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>7. Диагноз:
              <Field
                name="diagnosis"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='diagnosis'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>8. Диагноз по МКБ -10:
              <Field
                name="diagnosisICD"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='diagnosisICD'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>9. Жалобы:
              <Field
                name="complaints"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='complaints'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>10. Перенесенные и сопутствующие заболевания:
              <Field
                name="previousConcomitantDiseases"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='previousConcomitantDiseases'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <div className={classNames(s.title)}>11. Развитие настоящего заболевания:
              <Field
                name="developmentDisease"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='100%'
                    name='developmentDisease'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
            </div>
            <Grid>
              <span className={classNames(s.title)}>12. Внешний осмотр:</span>
              <ul className={s.ul}>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    Лицо
                    <Field name="faceSelect">
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
                      name="faceText"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='faceText'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    Кожные покровы:
                    <Field name="skinSelect">
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
                      name="skinText"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='skinText'
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
                      <Field name="propertiesOne">
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
                      <Field name="propertiesTwo">
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
                      <Field name="propertiesThree">
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
                        name="propertiesInfo"
                      >
                        {(props: FieldProps) =>
                          <UnderlineText
                            width='100%'
                            name='propertiesInfo'
                            className={classNames(s.defaultInput, s.title)}
                            onChange={props.field.onChange} />}
                      </Field>
                    </Grid>
                    <Grid marginBlock={2} className={s.filterOptions}>
                      <span> Консистенция </span>
                      <Field name="consistency">
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
                    <Field name="chinFolds">
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
                    <Field name="nasolabialFolds">
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
                    <Field name="lowerFace">
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
                      name="externalInspectionComment"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='externalInspectionComment'
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
                <Field name="plaqueOnTeeth">
                  {(props: FieldProps) => {
                    const selectOptions = [{ value: 'Нет', label: 'Нет' }, { value: 'Есть', label: 'Есть' }];
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
                  values.plaqueOnTeeth !== 'Нет' && (
                    <Field
                      name="plaqueOnTeethText"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='plaqueOnTeethText'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  )
                }
              </Grid>
              {
                values.plaqueOnTeeth !== 'Нет' && (
                  <Grid marginBlock={2} marginLeft={2} className={s.filterOptions}>
                    <Field name="plaqueOnTeethDropdown1">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: 'пигментированный', label: 'пигментированный' }];
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
                    <Field name="plaqueOnTeethDropdown2">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: 'Твердый', label: 'Твердый' }];
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
                          name="plaqueOnTeethCheckbox1"
                        >
                          {({ field, form }: FieldProps) =>
                            <Checkbox
                              className={s.checkbox}
                              checked={field.value}
                              onChange={() => form.setFieldValue('plaqueOnTeethCheckbox1', !field.value ? 'наддесневой' : '')}
                            >
                              наддесневой
                            </Checkbox>
                          }
                        </Field>
                      </Grid>
                      <Grid >
                        <Field
                          name="plaqueOnTeethCheckbox2"
                        >
                          {({ field, form }: FieldProps) =>
                            <Checkbox
                              className={s.checkbox}
                              checked={field.value}
                              onChange={() => form.setFieldValue('plaqueOnTeethCheckbox2', !field.value ? 'поддесневой' : '')}
                            >
                              поддесневой
                            </Checkbox>
                          }
                        </Field>
                      </Grid>
                    </Grid>
                    <Grid className={s.filterOptions} >
                      <Grid marginRight={2}>Количество</Grid>
                      <Field name="plaqueOnTeethDropdown3">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: 'обильное', label: 'обильное' }];
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
                      name="plaqueOnTeethInputField"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='plaqueOnTeethInputField'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>)
              }
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
                    <Grid marginRight={1} marginBlock={2}>Трещины:</Grid>
                    <FormGroup className={s.filterOptions} >
                      <Grid container  >
                        <Grid item xs={3} >
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
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  центральная
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3} >
                            <Field
                              name="5"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('5', !field.value)}
                                >
                                  парацентральная
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                        </Grid>
                        <Grid item xs={3}>
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
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  центральная
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3} >
                            <Field
                              name="5"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('5', !field.value)}
                                >
                                  парацентральная
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                        </Grid>
                        <Grid item xs={3}>
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
            <div className={s.title}>
              <Grid marginBlock={2}>
                <Grid marginBlock={1} className={s.filterOptions}>
                  <Grid marginRight={2}>17. Осмотр языка:</Grid>
                  <Field name="test16">
                    {(props: FieldProps) => {
                      const selectOptions = [{ value: -1, label: 'не увеличен' }];
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
                      const selectOptions = [{ value: -1, label: 'бледно-розовый' }];
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
              </Grid>
              <ul className={s.ul}>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>десквамация эпителия</Grid>
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
                    <Grid marginRight={1}>отпечатки зубов на боковой поверхности языка</Grid>
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
                    <Grid marginRight={1}>уздечка языка</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'длинная' }];
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
                    <Grid marginRight={1}>выраженность рвотного рефлекса</Grid>
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
                    <Grid marginRight={1}>сосочки</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'не гипертрофированы' }];
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

                <li>
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
                </li>
              </ul>
            </div>
            <div className={s.title}>
              <Grid marginBlock={2}>
                <Grid marginBlock={1} className={s.filterOptions} >
                  <Grid marginRight={2}>18. Осмотр преддверия рта:</Grid>
                  <Field name="test16">
                    {(props: FieldProps) => {
                      const selectOptions = [{ value: -1, label: 'среднее' }];
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
              <ul className={s.ul}>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>высота прикрепленной десны (мм)</Grid>
                    <Field
                      name="test14"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='300px'
                          name='test14'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  </Grid>
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>наличие рецессий</Grid>
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
                    если да то в области каких зубов
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>уздечка нижней губы</Grid>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>уздечка верхней губы</Grid>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={1} className={s.filterOptions}>
                    <Grid marginRight={1}>наличие рубца операций</Grid>
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
                </li>
              </ul>
            </div>
            <div className={s.title}>
              <Grid marginBlock={2}>
                <Grid marginBlock={1} className={s.filterOptions} >
                  <Grid marginRight={2}>19. Состояние прикуса:</Grid>
                  <Field name="test16">
                    {(props: FieldProps) => {
                      const selectOptions = [{ value: -1, label: 'ортогнатический' }];
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
              <ul className={s.ul}>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>перекрытие</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'горизонтальное' }];
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>перекрытие</Grid>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>Тремы</Grid>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>Диастемы</Grid>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>Аномалии отдельных зубов</Grid>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>Стираемость зубов</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'не имеется' }];
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>зубо-альвеолярное выдвижение </Grid>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>симптом Попова-Годона</Grid>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>Перекрытие нижних резцов верхними (мм)</Grid>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>дефект речи</Grid>
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
                </li>
              </ul>
            </div>

            <div className={s.title}>
              <Grid marginBlock={2}>
                20. Осмотр ВНЧС:
              </Grid>
              <ul className={s.ul}>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>открывание челюсти </Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'в полном объеме' }, { value: 1, label: 'затруднено' }, { value: 2, label: 'не открывается' }];
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
                        const selectOptions = [{ value: -1, label: 'безболезненное' }, { value: 1, label: 'болезненное' }];
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
                        const selectOptions = [{ value: -1, label: 'плавное' }, { value: 1, label: 'без смещения' }, { value: 2, label: 'со смещением нижней челюсти вправо' }, { value: 3, label: 'со смещением нижней челюсти влево' }, { value: 4, label: 'С -образное' }];
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>движение суставных головок при пальпации</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'симметричное' }];
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={2} className={s.filterOptions}>
                    <Grid marginRight={1}>тонус жевательных мышц</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'нормальный' }];
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
                    <Grid marginRight={1} marginBlock={2}>Дополнительно</Grid>
                    <FormGroup className={s.filterOptions} >
                      <Grid container  >
                        <Grid item xs={3} >
                          <Field
                            name="complaint"
                          >
                            {({ field, form }: FieldProps) =>
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue('complaint', !field.value)}
                              >
                                Щелчок
                              </Checkbox>
                            }
                          </Field>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  справа
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  слева
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  при открывании
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  при закрывании
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            name="2"
                          >
                            {({ field, form }: FieldProps) =>
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue('2', !field.value)}
                              >
                                Хруст
                              </Checkbox>
                            }
                          </Field>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  справа
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  слева
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  при открывании
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  при закрывании
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                        </Grid>
                        <Grid item xs={3}>
                          <Field
                            name="3"
                          >
                            {({ field, form }: FieldProps) =>
                              <Checkbox
                                checked={field.value}
                                onChange={() => form.setFieldValue('3', !field.value)}
                              >
                                Крепитация в суставе
                              </Checkbox>
                            }
                          </Field>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  справа
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  слева
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  при открывании
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                          <Grid marginLeft={3}>
                            <Field
                              name="4"
                            >
                              {({ field, form }: FieldProps) =>
                                <Checkbox
                                  checked={field.value}
                                  onChange={() => form.setFieldValue('4', !field.value)}
                                >
                                  при закрывании
                                </Checkbox>
                              }
                            </Field>
                          </Grid>
                        </Grid>
                      </Grid>
                    </FormGroup>
                  </Grid>
                </li>
                <li>
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
                </li>
                <li className={s.li}>
                  <Grid marginBlock={3} className={s.filterOptions}>
                    <Grid marginRight={1}>тонус жевательных мышц</Grid>
                    <Field name="test16">
                      {(props: FieldProps) => {
                        const selectOptions = [{ value: -1, label: 'нормальный' }];
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
