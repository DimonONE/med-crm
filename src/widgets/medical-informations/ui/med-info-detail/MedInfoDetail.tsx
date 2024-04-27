import { useState } from 'react';
import { FormGroup, Grid, MenuItem } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import InputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import { useCreateUpdateMedInfo, usePatientId } from '~entities/patients';
import { useRoleUser } from '~entities/session';
import { API_URL } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { Button } from '~shared/ui/button';
import { Checkbox } from '~shared/ui/checkbox';
import { Modal } from '~shared/ui/modal';
import { SelectField } from '~shared/ui/select-field';
import { UnderlineText } from '~shared/ui/underline-text';
import { MedInfoData, downloadPDF, getDataInfo } from './lib/helper';
import { biteConditionOptions, jawOpeningSelect1Options1, jawOpeningSelect1Options2, jawOpeningSelect1Options3, selectOptionsYesOrNot } from './lib/utils';
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
  oralMucosa1: string,
  oralMucosa2: string,
  bleedingDuringEndotherapy: string,
  presenceOfScars: string,
  periodontalPockets: string,
  dischargeExudatePocket: string,
  dischargeExudatePocketText: string,
  upperJawExostosis: number,
  upperJawExostosisText: string,
  danglingComb: number,
  danglingCombText: string,
  upperJawAtrophy: number,
  upperJawAtrophyText: string,
  upperJawAtrophyNo?: string,
  upperJawAtrophyYes?: string,
  lowerJawExostosis: number,
  lowerJawExostosisText: string,
  lowerDanglingComb: number,
  lowerDanglingCombText: string,
  lowerJawAtrophy: number,
  lowerJawAtrophyText: string,
  lowerJawAtrophyNo?: string,
  lowerJawAtrophyYes?: string,
  salivaryGlandSelect1: string
  salivaryGlandSelect2: string
  salivaryGlandSelect3: string
  salivaryGlandText: string
  parotidPalpationSelect1: string
  parotidPalpationSelect2: string
  parotidPalpationSelect3: string
  parotidPalpationText: string
  redBorderOfLipsSelect1: string
  redBorderOfLipsSelect2: string
  presenceOfScales: number
  crackedUpper: boolean
  crackedUpperCenter?: string
  crackedUpperParacentral?: string
  crackedLower: boolean
  crackedLowerCenter?: string
  crackedLowerParacentral?: string
  crackedCommissural: string
  crackInHistory: number
  lipExaminationText: string
  tongueExaminationSelect1: string
  tongueExaminationSelect2: string
  tongueExaminationText: string
  epithelialDesquamation: number
  teetImprintsTheTongue: number
  frenulumTongue: string
  severityGagReflex: number
  examinationTonguePapillae: string
  tongueExaminationField: string
  examinationVestibuleMouth: string
  attachedGingivalHeight: string
  presenceOfRecessions: number
  presenceOfRecessionsText: string
  frenulumLowerLip: string
  frenulumUpperLip: string
  presenceSurgicalScar: string
  biteCondition: number
  biteConditionField: string
  overlapSelect: string
  overlapField: string
  tremesSelect: number
  tremesField: string
  diastemasSelect: number
  diastemasField: string
  anomaliesIndividualTeeth: string
  toothWearSelect: string
  toothWearField: string
  dentoalveolarAdvancementSelect: number
  dentoalveolarAdvancementField: string
  signPopovGodonSelect: number
  signPopovGodonField: string
  overlappingLowerIncisorsUpper: string
  speechDefectSelect: number
  speechDefectField: string
  jawOpeningSelect1: number
  jawOpeningSelect2: number
  jawOpeningSelect3: number
  jawOpeningField: string
  movementArticularHeadsSelect: string
  movementArticularHeadsField: string
  additionallyClick: boolean
  additionallyCrunch: boolean
  additionallyCrepitusJoint: boolean
  additionallyField: string
  masticatoryMuscleToneSelect: string
  masticatoryMuscleToneField: string
  examinationField: string
  additionallyClickRight: boolean
  additionallyClickLeft: boolean
  additionallyClickUponOpening: boolean
  additionallyClickWhenClosing: boolean
  additionallyCrunchRight: boolean
  additionallyCrunchLeft: boolean
  additionallyCrunchUponOpening: boolean
  additionallyCrunchWhenClosing: boolean
  additionallyCrepitusJointRight: boolean
  additionallyCrepitusJointLeft: boolean
  additionallyCrepitusJointUponOpening: boolean
  additionallyCrepitusJointWhenClosing: boolean
  laboratoryData: string
};

export function MedInfoDetail({ patientId }: MedInfoDetailProps) {
  const { data: patientInfo, isLoading } = usePatientId(patientId);
  const { mutate } = useCreateUpdateMedInfo();
  const { role } = useRoleUser();
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = async (
    values: InitialValues,
    { resetForm }: FormikHelpers<InitialValues>,
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
          name: 'Подчелюстные лимфатические узлы:',
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
            value: `${values.oralMucosa1} ${values.oralMucosa2}`,
          },
          {
            name: 'Кровоточивость при эондировании',
            type: 'string',
            value: values.bleedingDuringEndotherapy,
          },
          {
            name: 'Наличие рубцов',
            type: 'string',
            value: values.presenceOfScars,
          },
          {
            name: 'Пародантальные карманы',
            type: 'string',
            value: `${values.periodontalPockets} *ком. для врача: если ДА, заполните парадонтограмму`,
          },
          {
            name: 'Выделение экссудата из кармана',
            type: 'string',
            value: `${values.dischargeExudatePocket} ${values.dischargeExudatePocketText}`,
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
                  value: `${selectOptionsYesOrNot.find(select => select.value === values.upperJawExostosis)?.label} ${values.upperJawExostosisText}`,
                },
                {
                  name: '«болтающийся» гребень ',
                  type: 'string',
                  value: `${selectOptionsYesOrNot.find(select => select.value === values.danglingComb)?.label} ${values.danglingCombText}`,
                },
                {
                  name: 'атрофия',
                  type: 'string',
                  value: (() => {
                    const selectOptions = selectOptionsYesOrNot.find(select => select.value === values.upperJawAtrophy);
                    return `${selectOptions?.value! > 0 ? (values.upperJawAtrophyNo || values.upperJawAtrophyYes) : selectOptions?.label} ${values.upperJawAtrophyText}`;
                  })(),
                },
                ]),
              },
              {
                name: 'Нижняя челюсть',
                type: 'array',
                value: JSON.stringify([{
                  name: 'Экзостоз',
                  type: 'string',
                  value: `${selectOptionsYesOrNot.find(select => select.value === values.lowerJawExostosis)?.label} ${values.lowerJawExostosisText}`,

                },
                {
                  name: '«болтающийся» гребень ',
                  type: 'string',
                  value: `${selectOptionsYesOrNot.find(select => select.value === values.lowerDanglingComb)?.label} ${values.lowerDanglingCombText}`,
                },
                {
                  name: 'атрофия',
                  type: 'string',
                  value: (() => {
                    const selectOptions = selectOptionsYesOrNot.find(select => select.value === values.lowerJawAtrophy);
                    return `${selectOptions?.value! > 0 ? (values.lowerJawAtrophyNo || values.lowerJawAtrophyYes) : selectOptions?.label} ${values.lowerJawAtrophyText}`;
                  })(),
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
                value: `${values.salivaryGlandSelect1} ${values.salivaryGlandSelect2} ${values.salivaryGlandSelect3} ${values.salivaryGlandText}`,
              },
              {
                name: 'Околоушная при пальпации',
                type: 'string',
                value: `${values.parotidPalpationSelect1} ${values.parotidPalpationSelect2} ${values.parotidPalpationSelect3} ${values.parotidPalpationText}`,
              },
            ]),
          },
        ]),
      },
      {
        name: '16. Осмотр губ:',
        type: 'array',
        value: JSON.stringify([{
          name: 'Красная кайма губ',
          type: 'string',
          value: `${values.redBorderOfLipsSelect1}, ${values.redBorderOfLipsSelect2}`,
        }, {
          name: 'Наличие чешуек',
          type: 'string',
          value: selectOptionsYesOrNot.find(select => select.value === values.presenceOfScales)?.label,
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
              value: values.crackedUpperCenter,
            },
            {
              name: 'парацентральная',
              type: 'boks',
              value: values.crackedUpperParacentral,
            }]),
          },
          {
            name: 'Нижняя губа',
            type: 'checkboks',
            value: JSON.stringify([{
              name: 'Центральная',
              type: 'boks',
              value: values.crackedLowerCenter,
            },
            {
              name: 'парацентральная',
              type: 'boks',
              value: values.crackedUpperParacentral,
            }]),
          },

          {
            name: 'Коммисуральная',
            type: 'boks',
            value: values.crackedCommissural,
          },
          ]),
        },
        {
          name: 'Трещина в анамнезе',
          type: 'string',
          value: selectOptionsYesOrNot.find(select => select.value === values.crackInHistory)?.label,
        }, {
          name: '',
          type: 'string',
          value: `${values.lipExaminationText}`,
        }]),
      },
      {
        name: `17. Осмотр языка: ${values.tongueExaminationSelect1}, ${values.tongueExaminationSelect2} ${values.tongueExaminationText}`,
        type: 'array',
        value: JSON.stringify([
          {
            name: 'десквамация эпителия',
            type: 'string',
            value: selectOptionsYesOrNot.find(select => select.value === values.epithelialDesquamation)?.label,
          },
          {
            name: 'отпечатки зубов на боковой поверхности языка',
            type: 'string',
            value: selectOptionsYesOrNot.find(select => select.value === values.teetImprintsTheTongue)?.label,
          },
          {
            name: 'уздечка языка',
            type: 'string',
            value: values.frenulumTongue,
          },
          {
            name: 'выраженность рвотного рефлекса',
            type: 'string',
            value: selectOptionsYesOrNot.find(select => select.value === values.severityGagReflex)?.label,
          },
          {
            name: 'сосочки',
            type: 'string',
            value: values.examinationTonguePapillae,
          },
          {
            name: '',
            type: 'string',
            value: values.tongueExaminationField,
          },
        ]),
      },
      {
        name: `18. Осмотр преддверия рта: ${values.examinationVestibuleMouth}`,
        type: 'array',
        value: JSON.stringify([
          {
            name: 'высота прикрепленной десны (мм)',
            type: 'string',
            value: values.attachedGingivalHeight || '__________',
          },
          {
            name: 'наличие рецессий',
            type: 'string',
            value: `${values.presenceOfRecessions > 0 ? values.presenceOfRecessionsText : selectOptionsYesOrNot.find(select => select.value === values.presenceOfScales)?.label}`,
          },
          {
            name: 'уздечка нижней губы',
            type: 'string',
            value: values.frenulumLowerLip || '________________________________________',
          },
          {
            name: 'уздечка верхней губы',
            type: 'string',
            value: values.frenulumUpperLip || '________________________________________',
          },
          {
            name: 'наличие рубца операций',
            type: 'string',
            value: values.presenceSurgicalScar || '________________________________________',
          },
        ]),
      },
      {
        name: `19. Состояние прикуса: ${biteConditionOptions.find(select => select.value === values.biteCondition)?.label}`,
        type: 'array',
        value: JSON.stringify([
          {
            name: '',
            type: 'string',
            value: values.biteConditionField,
          },
          {
            name: 'перекрытие',
            type: 'string',
            value: `${values.overlapSelect} ${values.overlapField}`,
          },
          {
            name: 'Тремы',
            type: 'string',
            value: `${selectOptionsYesOrNot.find(select => select.value === values.tremesSelect)?.label} ${values.tremesField}`,
          },
          {
            name: 'Диастемы',
            type: 'string',
            value: `${selectOptionsYesOrNot.find(select => select.value === values.diastemasSelect)?.label} ${values.diastemasField}`,
          },
          {
            name: 'Аномалии отдельных зубов',
            type: 'string',
            value: values.anomaliesIndividualTeeth || '________________________________________',
          },
          {
            name: 'Стираемость зубов',
            type: 'string',
            value: `${values.toothWearSelect} ${values.toothWearField}`,
          },
          {
            name: 'зубо-альвеолярное выдвижение',
            type: 'string',
            value: `${selectOptionsYesOrNot.find(select => select.value === values.dentoalveolarAdvancementSelect)?.label} ${values.dentoalveolarAdvancementField}`,
          },
          {
            name: 'симптом Попова-Годона',
            type: 'string',
            value: `${selectOptionsYesOrNot.find(select => select.value === values.signPopovGodonSelect)?.label} ${values.signPopovGodonField}`,
          },
          {
            name: 'Перекрытие нижних резцов верхними (мм)',
            type: 'string',
            value: values.overlappingLowerIncisorsUpper || '________________________________________',
          },
          {
            name: 'дефект речи',
            type: 'string',
            value: `${selectOptionsYesOrNot.find(select => select.value === values.speechDefectSelect)?.label} ${values.speechDefectField}`,
          },
        ]),
      },
      {
        name: '20. Осмотр ВНЧС:',
        type: 'array',
        value: JSON.stringify([
          {
            name: 'открывание челюсти',
            type: 'string',
            value: `${jawOpeningSelect1Options1.find(select => select.value === values.jawOpeningSelect1)?.label}` +
              `${jawOpeningSelect1Options2.find(select => select.value === values.jawOpeningSelect2)?.label}` +
              `${jawOpeningSelect1Options3.find(select => select.value === values.jawOpeningSelect3)?.label}${values.jawOpeningField}`,
          },
          {
            name: 'движение суставных головок при пальпации',
            type: 'string',
            value: `${values.movementArticularHeadsSelect} ${values.movementArticularHeadsField}`,
          },
          {
            name: 'Дополнительно',
            type: 'checkboks',
            value: JSON.stringify([{
              name: 'Щелчок',
              type: 'checkboks',
              value: JSON.stringify([{
                name: 'справа',
                type: 'boks',
                value: values.additionallyClickRight,
              },
              {
                name: 'слева',
                type: 'boks',
                value: values.additionallyClickLeft,
              },
              {
                name: 'при открывании',
                type: 'boks',
                value: values.additionallyClickUponOpening,
              },
              {
                name: 'при закрывании',
                type: 'boks',
                value: values.additionallyClickWhenClosing,
              }]),
            },
            {
              name: 'Хруст',
              type: 'checkboks',
              value: JSON.stringify([{
                name: 'справа',
                type: 'boks',
                value: values.additionallyCrunchRight,
              },
              {
                name: 'слева',
                type: 'boks',
                value: values.additionallyCrunchLeft,
              },
              {
                name: 'при открывании',
                type: 'boks',
                value: values.additionallyCrunchUponOpening,
              },
              {
                name: 'при закрывании',
                type: 'boks',
                value: values.additionallyCrunchWhenClosing,
              }]),
            },
            {
              name: 'Крепитация в суставе',
              type: 'checkboks',
              value: JSON.stringify([{
                name: 'справа',
                type: 'boks',
                value: values.additionallyCrepitusJointRight,
              },
              {
                name: 'слева',
                type: 'boks',
                value: values.additionallyCrepitusJointLeft,
              },
              {
                name: 'при открывании',
                type: 'boks',
                value: values.additionallyCrepitusJointUponOpening,
              },
              {
                name: 'при закрывании',
                type: 'boks',
                value: values.additionallyCrepitusJointWhenClosing,
              }]),
            },
            {
              name: '',
              type: 'string',
              value: values.additionallyField,
            },
            ]),
          },
          {
            name: 'тонус жевательных мышц',
            type: 'string',
            value: `${values.masticatoryMuscleToneSelect} ${values.masticatoryMuscleToneField}`,
          },
          {
            name: '',
            type: 'string',
            value: values.examinationField,
          },
        ]),
      },
      {
        name: '21. Данные рентгенологического и лабораторного исследования:',
        type: 'string',
        value: values.laboratoryData,
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
      {
        name: '25. Установеленные импланты:',
        type: 'image',
        value: '',
      },
    ];

    const info = JSON.stringify(medInfoData);

    await mutate({ info, patientId }, {
      onSuccess: () => {
        setOpen(true);
        resetForm();
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  if (!patientInfo || isLoading) {
    return null;
  }
  const medInfo: MedInfoData[] = JSON.parse(patientInfo.medInfo);
  const isUpdate = medInfo?.length;

  return (
    <Formik
      initialValues={{
        startDay: '',
        startMonth: '',
        startYear: '20',
        fullName: patientInfo.fullName,
        sex: patientInfo.sex,
        address: patientInfo.address,
        phone: patientInfo.phone,
        age: patientInfo.dateOfBirth,
        specialization: '',
        diagnosis: '',
        diagnosisICD: '',
        complaints: '',
        previousConcomitantDiseases: '',
        developmentDisease: '',
        visualInspection: '',
        faceSelect: 'cимметричное',
        faceText: '',
        skinSelect: 'чистые',
        skinText: '',
        propertiesOne: 'не увеличены',
        propertiesTwo: 'безболезненные',
        propertiesThree: 'не спаяны с окружающики тканями',
        propertiesInfo: '',
        consistency: 'однородная',
        chinFolds: 'не выражены',
        nasolabialFolds: 'не выражены',
        lowerFace: 'не выражены',
        externalInspectionComment: '',
        plaqueOnTeeth: 'Нет',
        plaqueOnTeethText: '',
        plaqueOnTeethDropdown1: 'пигментированный',
        plaqueOnTeethDropdown2: 'Твердый',
        plaqueOnTeethDropdown3: 'обильное',
        plaqueOnTeethCheckbox1: '',
        plaqueOnTeethCheckbox2: '',
        plaqueOnTeethInputField: '',
        oralMucosa1: 'бледно-розового цвета',
        oralMucosa2: 'не отечна',
        bleedingDuringEndotherapy: 'нет',
        presenceOfScars: 'нет',
        periodontalPockets: 'нет',
        dischargeExudatePocket: 'нет',
        dischargeExudatePocketText: '',
        upperJawExostosis: -1,
        upperJawExostosisText: '',
        danglingComb: -1,
        danglingCombText: '',
        upperJawAtrophy: -1,
        upperJawAtrophyText: '',
        lowerJawExostosis: -1,
        lowerJawExostosisText: '',
        lowerDanglingComb: -1,
        lowerDanglingCombText: '',
        lowerJawAtrophy: -1,
        lowerJawAtrophyText: '',
        salivaryGlandSelect1: 'однородная',
        salivaryGlandSelect2: 'безболезненная',
        salivaryGlandSelect3: 'симметричная',
        salivaryGlandText: '',
        parotidPalpationSelect1: 'однородная',
        parotidPalpationSelect2: 'безболезненная',
        parotidPalpationSelect3: 'симметричная',
        parotidPalpationText: '',
        redBorderOfLipsSelect1: 'бледно-розовая',
        redBorderOfLipsSelect2: 'влажная',
        presenceOfScales: -1,
        crackedUpper: false,
        crackedLower: false,
        crackedCommissural: '',
        crackInHistory: -1,
        lipExaminationText: '',
        tongueExaminationSelect1: 'не увеличен',
        tongueExaminationSelect2: 'бледно-розовый',
        tongueExaminationText: '',
        epithelialDesquamation: -1,
        teetImprintsTheTongue: -1,
        frenulumTongue: 'длинная',
        severityGagReflex: -1,
        examinationTonguePapillae: 'не гипертрофированы',
        tongueExaminationField: '',
        examinationVestibuleMouth: 'среднее',
        attachedGingivalHeight: '',
        presenceOfRecessions: -1,
        presenceOfRecessionsText: '',
        frenulumLowerLip: '',
        frenulumUpperLip: '',
        presenceSurgicalScar: '',
        biteCondition: -1,
        biteConditionField: '',
        overlapSelect: 'горизонтальное',
        overlapField: '',
        tremesSelect: -1,
        tremesField: '',
        diastemasSelect: -1,
        diastemasField: '',
        anomaliesIndividualTeeth: '',
        toothWearSelect: 'не имеется',
        toothWearField: '',
        dentoalveolarAdvancementSelect: -1,
        dentoalveolarAdvancementField: '',
        signPopovGodonSelect: -1,
        signPopovGodonField: '',
        overlappingLowerIncisorsUpper: '',
        speechDefectSelect: -1,
        speechDefectField: '',
        jawOpeningSelect1: -1,
        jawOpeningSelect2: -1,
        jawOpeningSelect3: -1,
        jawOpeningField: '',
        movementArticularHeadsSelect: 'симметричное',
        movementArticularHeadsField: '',
        additionallyClick: false,
        additionallyCrunch: false,
        additionallyCrepitusJoint: false,
        additionallyField: '',
        masticatoryMuscleToneSelect: 'нормальный',
        masticatoryMuscleToneField: '',
        examinationField: '',
        additionallyClickRight: false,
        additionallyClickLeft: false,
        additionallyClickUponOpening: false,
        additionallyClickWhenClosing: false,
        additionallyCrunchRight: false,
        additionallyCrunchLeft: false,
        additionallyCrunchUponOpening: false,
        additionallyCrunchWhenClosing: false,
        additionallyCrepitusJointRight: false,
        additionallyCrepitusJointLeft: false,
        additionallyCrepitusJointUponOpening: false,
        additionallyCrepitusJointWhenClosing: false,
        laboratoryData: '',
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
              {
                isUpdate ? medInfo[0].value : (
                  <>
                    № <span className={s.redHighlight}>{patientId}</span> от
                    «
                    <Field
                      name="startDay"
                    >
                      {(props: FieldProps) =>
                        <InputMask name="startDay" style={{ width: 20, textAlign: 'center' }} className={s.defaultInput}
                          onChange={props.field.onChange} mask="99" placeholder='__' maskChar="_" />}
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
                  </>
                )
              }
            </div>
            <div className={classNames(s.title)}>
              1. Фамилия, имя, отчество:
              <span className={classNames(s.redHighlight, s.italic)}> {patientInfo.fullName}</span>
            </div>
            <div className={classNames(s.title)}>2. <span className={s.redHighlight}> Мужчина</span> </div>
            <div className={classNames(s.title)}>3. Адрес:   <span className={classNames(s.redHighlight, s.italic)}> {patientInfo.address}</span> </div>
            <div className={classNames(s.title)}>4. Телефон: <span className={classNames(s.redHighlight, s.italic)}> {patientInfo.phone}</span> </div>
            <div className={classNames(s.title)}>5. Возраст: <span className={classNames(s.redHighlight, s.italic)}> {dayjs().diff(dayjs(patientInfo.dateOfBirth), 'year')}</span> </div>
            <div className={classNames(s.title, s.filterOptions)}>6. Профессия:
              {
                isUpdate ? medInfo[6].value : (
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
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>7. Диагноз:
              {
                isUpdate ? medInfo[7].value : (
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
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>8. Диагноз по МКБ -10:
              {
                isUpdate ? medInfo[8].value : (
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
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>9. Жалобы:
              {
                isUpdate ? medInfo[9].value : (
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
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>10. Перенесенные и сопутствующие заболевания:
              {
                isUpdate ? medInfo[10].value : (
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
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>11. Развитие настоящего заболевания:
              {
                isUpdate ? medInfo[11].value : (
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
                )
              }
            </div>
            <Grid>
              <span className={classNames(s.title)}>12. Внешний осмотр:</span>
              {
                isUpdate ? getDataInfo(medInfo[12]) : (
                  <ul className={s.ul}>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        Лицо
                        <Field name="faceSelect">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'cимметричное', label: 'Симметричное' }];

                            return <SelectField
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
                            </SelectField>;
                          }}
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
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'чистые', label: 'Чистые' }];
                            return <SelectField
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
                            </SelectField>;
                          }}
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
                              const selectOptions = [{ value: 'не увеличены', label: 'Не увеличены' }, { value: 'увеличены слева', label: 'Увеличены слева' }, { value: 'увеличены справа', label: 'Увеличены справа' }, { value: 'увеличены с обеих сторон', label: 'Увеличены с обеих сторон' }, { value: 'увеличены с одной стороны', label: 'Увеличены с одной стороны' }];
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
                              const selectOptions = [{ value: 'безболезненные', label: 'Безболезненные' }];
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
                              const selectOptions = [{ value: 'не спаяны с окружающики тканями', label: 'Не спаяны с окружающики тканями' }];
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
                              const selectOptions = [{ value: 'однородная', label: 'Однородная' }];
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
                            const selectOptions = [{ value: 'не выражены', label: 'Не выражены' }];
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
                            const selectOptions = [{ value: 'не выражены', label: 'Не выражены' }];
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
                            const selectOptions = [{ value: 'не выражены', label: 'Не выражены' }];
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
                )
              }
              {isUpdate && getDataInfo(medInfo[13])}
            </Grid>
            <div className={s.title}>
              <Grid className={s.filterOptions}>
                <Grid marginRight={1}>13. Состояние зубов: <span>налет на зубах</span></Grid>
                {
                  isUpdate ? getDataInfo(medInfo[14]) : (
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
                  )
                }
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
              {
                isUpdate ? getDataInfo(medInfo[16]) : (
                  <ul className={s.ul}>
                    <li className={s.li}>
                      <Grid marginBlock={1} className={s.filterOptions}>
                        <Grid marginRight={1}>Слизистая оболочка рта</Grid>
                        <Field name="oralMucosa1">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'бледно-розового цвета', label: 'бледно-розового цвета' }];
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
                        <Field name="oralMucosa2">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'не отечна', label: 'не отечна' }];
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
                        <Field name="bleedingDuringEndotherapy">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'нет', label: 'нет' }, { value: 'да', label: 'да' }];
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
                        <Field name="presenceOfScars">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'нет', label: 'нет' }];
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
                        <Field name="periodontalPockets">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'нет', label: 'нет' }];
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
                        <Grid marginRight={1}>выделение экссудата из кармана</Grid>
                        <Field name="dischargeExudatePocket">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'нет', label: 'нет' }];
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
                          name="dischargeExudatePocketText"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='dischargeExudatePocketText'
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
                            <Field name="upperJawExostosis">
                              {(props: FieldProps) => (
                                <SelectField
                                  className={s.optionInfo}
                                  selectNavigate
                                  selectOptions={selectOptionsYesOrNot}
                                  {...props}
                                >
                                  {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                              )}
                            </Field>
                            <Field
                              name="upperJawExostosisText"
                            >
                              {(props: FieldProps) =>
                                <UnderlineText
                                  width='100%'
                                  name='upperJawExostosisText'
                                  className={classNames(s.defaultInput, s.title)}
                                  onChange={props.field.onChange} />}
                            </Field>
                          </Grid>
                        </Grid>
                        <Grid marginInline={2} marginBlock={2} className={s.filterOptions}>
                          «болтающийся» гребень
                          <Field name="danglingComb">
                            {(props: FieldProps) => (
                              <SelectField
                                className={s.optionInfo}
                                selectNavigate
                                selectOptions={selectOptionsYesOrNot}
                                {...props}
                              >
                                {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                            )}
                          </Field>
                          <Field
                            name="danglingCombText"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='danglingCombText'
                                className={classNames(s.defaultInput, s.title)}
                                onChange={props.field.onChange} />}
                          </Field>
                        </Grid>
                        <Grid marginInline={2} marginBlock={2} className={s.filterOptions}>
                          атрофия
                          <Field name="upperJawAtrophy">
                            {(props: FieldProps) => (
                              <SelectField
                                className={s.optionInfo}
                                selectNavigate
                                selectOptions={selectOptionsYesOrNot}
                                {...props}
                              >
                                {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                            )}
                          </Field>
                          {
                            values.upperJawAtrophy > 0 && (
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
                            name="upperJawAtrophyText"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='upperJawAtrophyText'
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
                            <Field name="lowerJawExostosis">
                              {(props: FieldProps) => (
                                <SelectField
                                  className={s.optionInfo}
                                  selectNavigate
                                  selectOptions={selectOptionsYesOrNot}
                                  {...props}
                                >
                                  {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                              )}
                            </Field>
                            <Field
                              name="lowerJawExostosisText"
                            >
                              {(props: FieldProps) =>
                                <UnderlineText
                                  width='100%'
                                  name='lowerJawExostosisText'
                                  className={classNames(s.defaultInput, s.title)}
                                  onChange={props.field.onChange} />}
                            </Field>
                          </Grid>
                        </Grid>
                        <Grid marginInline={2} marginBlock={2} className={s.filterOptions}>
                          «болтающийся» гребень
                          <Field name="lowerDanglingComb">
                            {(props: FieldProps) => (
                              <SelectField
                                className={s.optionInfo}
                                selectNavigate
                                selectOptions={selectOptionsYesOrNot}
                                {...props}
                              >
                                {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                            )}
                          </Field>
                          <Field
                            name="lowerDanglingCombText"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='lowerDanglingCombText'
                                className={classNames(s.defaultInput, s.title)}
                                onChange={props.field.onChange} />}
                          </Field>
                        </Grid>
                        <Grid marginInline={2} marginBlock={2} className={s.filterOptions}>
                          атрофия
                          <Field name="lowerJawAtrophy">
                            {(props: FieldProps) => (
                              <SelectField
                                className={s.optionInfo}
                                selectNavigate
                                selectOptions={selectOptionsYesOrNot}
                                {...props}
                              >
                                {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                            )}
                          </Field>
                          {
                            values.lowerJawAtrophy > 0 && (
                              <>
                                <Field
                                  name="lowerJawAtrophyNo"
                                >
                                  {({ field, form }: FieldProps) =>
                                    <Checkbox
                                      className={s.checkbox}
                                      checked={field.value}
                                      onChange={() => {
                                        form.setFieldValue('lowerJawAtrophyNo', 'не выражена');
                                        form.setFieldValue('lowerJawAtrophyYes', '');
                                      }}
                                    >
                                      не выражена
                                    </Checkbox>
                                  }
                                </Field>
                                <Field
                                  name="lowerJawAtrophyYes"
                                >
                                  {({ field, form }: FieldProps) =>
                                    <Checkbox
                                      className={s.checkbox}
                                      checked={field.value}
                                      onChange={() => {
                                        form.setFieldValue('lowerJawAtrophyYes', 'выражена');
                                        form.setFieldValue('lowerJawAtrophyNo', '');
                                      }}
                                    >
                                      выражена
                                    </Checkbox>
                                  }
                                </Field>
                              </>
                            )
                          }
                          <Field
                            name="lowerJawAtrophyText"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='lowerJawAtrophyText'
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
                        <Field name="salivaryGlandSelect1">
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
                        <Field name="salivaryGlandSelect2">
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
                        <Field name="salivaryGlandSelect3">
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
                          name="salivaryGlandText"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='salivaryGlandText'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                      <Grid marginInline={1} marginBlock={2} className={s.filterOptions}>
                        Околоушная при пальпации
                        <Field name="parotidPalpationSelect1">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'однородная', label: 'однородная' }];
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
                        <Field name="parotidPalpationSelect2">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'безболезненная', label: 'безболезненная' }];
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
                        <Field name="parotidPalpationSelect3">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'симметричная', label: 'симметричная' }];
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
                          name="parotidPalpationText"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='parotidPalpationText'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                  </ul>
                )}

            </div>
            <div className={s.title}>
              <Grid marginBlock={2}>16. Осмотр губ:</Grid>
              {
                isUpdate ? getDataInfo(medInfo[17]) : (
                  <ul className={s.ul}>
                    <li className={s.li}>
                      <Grid marginBlock={1} className={s.filterOptions}>
                        <Grid marginRight={1}>красная кайма губ</Grid>
                        <Field name="redBorderOfLipsSelect1">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'бледно-розовая', label: 'бледно-розовая' }];
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
                        <Field name="redBorderOfLipsSelect2">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'влажная', label: 'влажная' }];
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
                        <Field name="presenceOfScales">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
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
                                name="crackedUpper"
                              >
                                {({ field, form }: FieldProps) =>
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue('crackedUpper', !field.value)}
                                  >
                                    Верхняя губа
                                  </Checkbox>
                                }
                              </Field>
                              {
                                values?.crackedUpper && (
                                  <>
                                    <Grid marginLeft={3}>
                                      <Field
                                        name="crackedUpperCenter"
                                      >
                                        {({ field, form }: FieldProps) =>
                                          <Checkbox
                                            checked={field.value}
                                            onChange={() => form.setFieldValue('crackedUpperCenter', !field.value)}
                                          >
                                            центральная
                                          </Checkbox>
                                        }
                                      </Field>
                                    </Grid>
                                    <Grid marginLeft={3} >
                                      <Field
                                        name="crackedUpperParacentral"
                                      >
                                        {({ field, form }: FieldProps) =>
                                          <Checkbox
                                            checked={field.value}
                                            onChange={() => form.setFieldValue('crackedUpperParacentral', !field.value)}
                                          >
                                            парацентральная
                                          </Checkbox>
                                        }
                                      </Field>
                                    </Grid>
                                  </>
                                )
                              }
                            </Grid>
                            <Grid item xs={3}>
                              <Field
                                name="crackedLower"
                              >
                                {({ field, form }: FieldProps) =>
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue('crackedLower', !field.value)}
                                  >
                                    Нижняя губа
                                  </Checkbox>
                                }
                              </Field>
                              {values.crackedLower && (<>
                                <Grid marginLeft={3}>
                                  <Field
                                    name="crackedLowerCenter"
                                  >
                                    {({ field, form }: FieldProps) =>
                                      <Checkbox
                                        checked={field.value}
                                        onChange={() => form.setFieldValue('crackedLowerCenter', !field.value)}
                                      >
                                        центральная
                                      </Checkbox>
                                    }
                                  </Field>
                                </Grid>
                                <Grid marginLeft={3} >
                                  <Field
                                    name="crackedLowerParacentral"
                                  >
                                    {({ field, form }: FieldProps) =>
                                      <Checkbox
                                        checked={field.value}
                                        onChange={() => form.setFieldValue('crackedLowerParacentral', !field.value)}
                                      >
                                        парацентральная
                                      </Checkbox>
                                    }
                                  </Field>
                                </Grid>
                              </>)}
                            </Grid>
                            <Grid item xs={3}>
                              <Field
                                name="crackedCommissural"
                              >
                                {({ field, form }: FieldProps) =>
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue('crackedCommissural', !field.value)}
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
                          <Field name="crackInHistory">
                            {(props: FieldProps) => (
                              <SelectField
                                className={s.optionInfo}
                                selectNavigate
                                selectOptions={selectOptionsYesOrNot}
                                {...props}
                              >
                                {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                            )}
                          </Field>
                        </Grid>
                        <Grid marginBlock={2} >
                          <Field
                            name="lipExaminationText"
                          >
                            {(props: FieldProps) =>
                              <UnderlineText
                                width='100%'
                                name='lipExaminationText'
                                className={classNames(s.defaultInput, s.title)}
                                onChange={props.field.onChange} />}
                          </Field>
                        </Grid>
                      </Grid>
                    </li>
                  </ul>
                )}
            </div>
            <div className={s.title}>
              <Grid marginBlock={2}>
                <Grid marginBlock={1} className={s.filterOptions}>
                  <Grid marginRight={2}>17. Осмотр языка:</Grid>
                  {
                    !isUpdate && (
                      <>
                        <Field name="tongueExaminationSelect1 ">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'не увеличен', label: 'не увеличен' }];
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
                        <Field name="tongueExaminationSelect2">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'бледно-розовый', label: 'бледно-розовый' }];
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
                          name="tongueExaminationText"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='tongueExaminationText'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </>
                    )}
                </Grid>
                {isUpdate && getDataInfo(medInfo[18])}
              </Grid>
              {
                !isUpdate && (
                  <ul className={s.ul}>
                    <li className={s.li}>
                      <Grid marginBlock={1} className={s.filterOptions}>
                        <Grid marginRight={1}>десквамация эпителия</Grid>
                        <Field name="epithelialDesquamation">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={1} className={s.filterOptions}>
                        <Grid marginRight={1}>отпечатки зубов на боковой поверхности языка</Grid>
                        <Field name="teetImprintsTheTongue">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={1} className={s.filterOptions}>
                        <Grid marginRight={1}>уздечка языка</Grid>
                        <Field name="frenulumTongue">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'длинная', label: 'длинная' }];
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
                        <Field name="severityGagReflex">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={1} className={s.filterOptions}>
                        <Grid marginRight={1}>сосочки</Grid>
                        <Field name="examinationTonguePapillae">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'не гипертрофированы', label: 'не гипертрофированы' }];
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
                        name="tongueExaminationField"
                      >
                        {(props: FieldProps) =>
                          <UnderlineText
                            width='100%'
                            name='tongueExaminationField'
                            className={classNames(s.defaultInput, s.title)}
                            onChange={props.field.onChange} />}
                      </Field>
                    </li>
                  </ul>
                )
              }
            </div>
            <div className={s.title}>
              <Grid marginBlock={2}>
                <Grid marginBlock={1} className={s.filterOptions} >
                  <Grid marginRight={2}>18. Осмотр преддверия рта:</Grid>
                  {
                    !isUpdate && (
                      <Field name="examinationVestibuleMouth">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: 'среднее', label: 'среднее' }];
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
                    )}
                </Grid>
              </Grid>
              {
                isUpdate ? getDataInfo(medInfo[19]) : (
                  <ul className={s.ul}>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>высота прикрепленной десны (мм)</Grid>
                        <Field
                          name="attachedGingivalHeight"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='300px'
                              name='attachedGingivalHeight'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>наличие рецессий</Grid>
                        <Field name="presenceOfRecessions">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                        <Grid marginRight={1}>если да то в области каких зубов</Grid>
                        <Field
                          name="presenceOfRecessionsText"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='presenceOfRecessionsText'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>уздечка нижней губы</Grid>
                        <Field
                          name="frenulumLowerLip"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='frenulumLowerLip'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={3} className={s.filterOptions}>
                        <Grid marginRight={1}>уздечка верхней губы</Grid>
                        <Field
                          name="frenulumUpperLip"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='frenulumUpperLip'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={1} className={s.filterOptions}>
                        <Grid marginRight={1}>наличие рубца операций</Grid>
                        <Field
                          name="presenceSurgicalScar"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='presenceSurgicalScar'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                  </ul>
                )}
            </div>
            <div className={s.title}>
              <Grid marginBlock={2}>
                <Grid marginBlock={1} className={s.filterOptions} >
                  <Grid marginRight={2}>19. Состояние прикуса:</Grid>
                  {
                    !isUpdate && (
                      <Field name="biteCondition">
                        {(props: FieldProps) => (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={biteConditionOptions}
                            {...props}
                          >
                            {biteConditionOptions.map(({ label, value: link }) => (
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
                        )}
                      </Field>
                    )}
                </Grid>
                {
                  !isUpdate && (
                    <Field
                      name="biteConditionField"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='biteConditionField'
                          className={classNames(s.defaultInput, s.title)}
                          onChange={props.field.onChange} />}
                    </Field>
                  )}
              </Grid>
              {
                isUpdate ? getDataInfo(medInfo[20]) : (
                  <ul className={s.ul}>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>перекрытие</Grid>
                        <Field name="overlapSelect">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'горизонтальное', label: 'горизонтальное' }];
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
                          name="overlapField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='overlapField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>Тремы</Grid>
                        <Field name="tremesSelect">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                        <Field
                          name="tremesField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='tremesField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>Диастемы</Grid>
                        <Field name="diastemasSelect">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                        <Field
                          name="diastemasField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='diastemasField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>Аномалии отдельных зубов</Grid>
                        <Field
                          name="anomaliesIndividualTeeth"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='anomaliesIndividualTeeth'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>Стираемость зубов</Grid>
                        <Field name="toothWearSelect">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'не имеется', label: 'не имеется' }];
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
                          name="toothWearField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='toothWearField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>зубо-альвеолярное выдвижение </Grid>
                        <Field name="dentoalveolarAdvancementSelect">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                        <Field
                          name="dentoalveolarAdvancementField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='dentoalveolarAdvancementField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>симптом Попова-Годона</Grid>
                        <Field name="signPopovGodonSelect">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                        <Field
                          name="signPopovGodonField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='signPopovGodonField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>Перекрытие нижних резцов верхними (мм)</Grid>
                        <Field
                          name="overlappingLowerIncisorsUpper"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='overlappingLowerIncisorsUpper'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>дефект речи</Grid>
                        <Field name="speechDefectSelect">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              {...props}
                            >
                              {selectOptionsYesOrNot.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                        <Field
                          name="speechDefectField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='speechDefectField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                  </ul>
                )}
            </div>

            <div className={s.title}>
              <Grid marginBlock={2}>
                20. Осмотр ВНЧС:
              </Grid>
              {
                isUpdate ? getDataInfo(medInfo[21]) : (
                  <ul className={s.ul}>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>открывание челюсти </Grid>
                        <Field name="jawOpeningSelect1">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={jawOpeningSelect1Options1}
                              {...props}
                            >
                              {jawOpeningSelect1Options1.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                        <Field name="jawOpeningSelect2">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={jawOpeningSelect1Options2}
                              {...props}
                            >
                              {jawOpeningSelect1Options2.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                        <Field name="jawOpeningSelect3">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={jawOpeningSelect1Options3}
                              {...props}
                            >
                              {jawOpeningSelect1Options3.map(({ label, value: link }) => (
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
                          )}
                        </Field>
                        <Field
                          name="jawOpeningField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='jawOpeningField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={2} className={s.filterOptions}>
                        <Grid marginRight={1}>движение суставных головок при пальпации</Grid>
                        <Field name="movementArticularHeadsSelect">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'симметричное', label: 'симметричное' }];
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
                          name="movementArticularHeadsField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='movementArticularHeadsField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
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
                                name="additionallyClick"
                              >
                                {({ field, form }: FieldProps) =>
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue('additionallyClick', !field.value)}
                                  >
                                    Щелчок
                                  </Checkbox>
                                }
                              </Field>
                              {values.additionallyClick && (
                                <>
                                  <Grid marginLeft={3}>
                                    <Field
                                      name="additionallyClickRight"
                                    >
                                      {({ field, form }: FieldProps) =>
                                        <Checkbox
                                          checked={field.value}
                                          onChange={() => form.setFieldValue('additionallyClickRight', !field.value)}
                                        >
                                          справа
                                        </Checkbox>
                                      }
                                    </Field>
                                  </Grid>
                                  <Grid marginLeft={3}>
                                    <Field
                                      name="additionallyClickLeft"
                                    >
                                      {({ field, form }: FieldProps) =>
                                        <Checkbox
                                          checked={field.value}
                                          onChange={() => form.setFieldValue('additionallyClickLeft', !field.value)}
                                        >
                                          слева
                                        </Checkbox>
                                      }
                                    </Field>
                                  </Grid>
                                  <Grid marginLeft={3}>
                                    <Field
                                      name="additionallyClickUponOpening"
                                    >
                                      {({ field, form }: FieldProps) =>
                                        <Checkbox
                                          checked={field.value}
                                          onChange={() => form.setFieldValue('additionallyClickUponOpening', !field.value)}
                                        >
                                          при открывании
                                        </Checkbox>
                                      }
                                    </Field>
                                  </Grid>
                                  <Grid marginLeft={3}>
                                    <Field
                                      name="additionallyClickWhenClosing"
                                    >
                                      {({ field, form }: FieldProps) =>
                                        <Checkbox
                                          checked={field.value}
                                          onChange={() => form.setFieldValue('additionallyClickWhenClosing', !field.value)}
                                        >
                                          при закрывании
                                        </Checkbox>
                                      }
                                    </Field>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                            <Grid item xs={3}>
                              <Field
                                name="additionallyCrunch"
                              >
                                {({ field, form }: FieldProps) =>
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue('additionallyCrunch', !field.value)}
                                  >
                                    Хруст
                                  </Checkbox>
                                }
                              </Field>
                              {values.additionallyCrunch && (
                                <>
                                  <Grid marginLeft={3}>
                                    <Field
                                      name="additionallyCrunchRight"
                                    >
                                      {({ field, form }: FieldProps) =>
                                        <Checkbox
                                          checked={field.value}
                                          onChange={() => form.setFieldValue('additionallyCrunchRight', !field.value)}
                                        >
                                          справа
                                        </Checkbox>
                                      }
                                    </Field>
                                  </Grid>
                                  <Grid marginLeft={3}>
                                    <Field
                                      name="additionallyCrunchLeft"
                                    >
                                      {({ field, form }: FieldProps) =>
                                        <Checkbox
                                          checked={field.value}
                                          onChange={() => form.setFieldValue('additionallyCrunchLeft', !field.value)}
                                        >
                                          слева
                                        </Checkbox>
                                      }
                                    </Field>
                                  </Grid>
                                  <Grid marginLeft={3}>
                                    <Field
                                      name="additionallyCrunchUponOpening"
                                    >
                                      {({ field, form }: FieldProps) =>
                                        <Checkbox
                                          checked={field.value}
                                          onChange={() => form.setFieldValue('additionallyCrunchUponOpening', !field.value)}
                                        >
                                          при открывании
                                        </Checkbox>
                                      }
                                    </Field>
                                  </Grid>
                                  <Grid marginLeft={3}>
                                    <Field
                                      name="additionallyCrunchWhenClosing"
                                    >
                                      {({ field, form }: FieldProps) =>
                                        <Checkbox
                                          checked={field.value}
                                          onChange={() => form.setFieldValue('additionallyCrunchWhenClosing', !field.value)}
                                        >
                                          при закрывании
                                        </Checkbox>
                                      }
                                    </Field>
                                  </Grid>
                                </>
                              )}
                            </Grid>
                            <Grid item xs={3}>
                              <Field
                                name="additionallyCrepitusJoint"
                              >
                                {({ field, form }: FieldProps) =>
                                  <Checkbox
                                    checked={field.value}
                                    onChange={() => form.setFieldValue('additionallyCrepitusJoint', !field.value)}
                                  >
                                    Крепитация в суставе
                                  </Checkbox>
                                }
                              </Field>
                              {
                                values.additionallyCrepitusJoint && (
                                  <>
                                    <Grid marginLeft={3}>
                                      <Field
                                        name="additionallyCrepitusJointRight"
                                      >
                                        {({ field, form }: FieldProps) =>
                                          <Checkbox
                                            checked={field.value}
                                            onChange={() => form.setFieldValue('additionallyCrepitusJointRight', !field.value)}
                                          >
                                            справа
                                          </Checkbox>
                                        }
                                      </Field>
                                    </Grid>
                                    <Grid marginLeft={3}>
                                      <Field
                                        name="additionallyCrepitusJointLeft"
                                      >
                                        {({ field, form }: FieldProps) =>
                                          <Checkbox
                                            checked={field.value}
                                            onChange={() => form.setFieldValue('additionallyCrepitusJointLeft', !field.value)}
                                          >
                                            слева
                                          </Checkbox>
                                        }
                                      </Field>
                                    </Grid>
                                    <Grid marginLeft={3}>
                                      <Field
                                        name="additionallyCrepitusJointUponOpening"
                                      >
                                        {({ field, form }: FieldProps) =>
                                          <Checkbox
                                            checked={field.value}
                                            onChange={() => form.setFieldValue('additionallyCrepitusJointUponOpening', !field.value)}
                                          >
                                            при открывании
                                          </Checkbox>
                                        }
                                      </Field>
                                    </Grid>
                                    <Grid marginLeft={3}>
                                      <Field
                                        name="additionallyCrepitusJointWhenClosing"
                                      >
                                        {({ field, form }: FieldProps) =>
                                          <Checkbox
                                            checked={field.value}
                                            onChange={() => form.setFieldValue('additionallyCrepitusJointWhenClosing', !field.value)}
                                          >
                                            при закрывании
                                          </Checkbox>
                                        }
                                      </Field>
                                    </Grid>
                                  </>
                                )
                              }
                            </Grid>
                          </Grid>
                        </FormGroup>
                      </Grid>
                    </li>
                    <li>
                      <Grid marginBlock={3}>
                        <Field
                          name="masticatoryMuscleToneField"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='masticatoryMuscleToneField'
                              className={classNames(s.defaultInput, s.title)}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                    <li className={s.li}>
                      <Grid marginBlock={3} className={s.filterOptions}>
                        <Grid marginRight={1}>тонус жевательных мышц</Grid>
                        <Field name="masticatoryMuscleToneSelect">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'нормальный', label: 'нормальный' }];
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
                        name="examinationField"
                      >
                        {(props: FieldProps) =>
                          <UnderlineText
                            width='100%'
                            name='examinationField'
                            className={classNames(s.defaultInput, s.title)}
                            onChange={props.field.onChange} />}
                      </Field>
                    </li>
                  </ul>
                )}
            </div>

            <div className={classNames(s.title, s.filterOptions)}>21. Данные рентгенологического и лабораторного исследования:
              {
                isUpdate ? getDataInfo(medInfo[22]) : (
                  <Field
                    name="laboratoryData"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='laboratoryData'
                        className={classNames(s.defaultInput, s.title)}
                        onChange={props.field.onChange} />}
                  </Field>
                )}
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
          <div className={s.submitButtons}>
            {
              role === 'medChief' && (
                <Button
                  className={s.submit}
                  type="submit"
                  color="secondary"
                  disabled
                >
                  Редактировать
                </Button>
              )
            }
            <Button
              className={classNames(s.submit, s.submitDownload)}
              type="button"
              color="primary"
              onClick={() => downloadPDF(`${API_URL}/${patientInfo.medInfoPath}`)}
            >
              Скачать PDF
            </Button>
            <Button
              className={classNames(s.submit, s.submitPrint)}
              type="button"
              color="primary"
              onClick={() => window.open(`${API_URL}/${patientInfo.medInfoPath}`, '_blank')}
            >
              Печатать
            </Button>
            {
              !isUpdate && (
                <Button
                  className={s.submit}
                  type="submit"
                  color="primary"
                >
                  Сохранить
                </Button>
              )
            }
          </div>

          <Modal
            isOpen={isOpen}
            onSuccess={() => setOpen(false)}
            onClose={() => setOpen(false)}
            type='info' >
            <div>
              {isUpdate ? <>Сохранить информацию? <br />Поменять ее сможет только<br />Владелец клиники</> : 'Информация сохранена!'}
            </div>
          </Modal>
        </Form>
      )
      }
    </Formik >
  );
}
