import { useEffect, useState } from 'react';
import { FormGroup, Grid, MenuItem } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateUpdateMedInfo, usePatientId } from '~entities/patients';
import { useRoleUser } from '~entities/session';
import { API_URL } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { Checkbox } from '~shared/ui/checkbox';
import { Modal } from '~shared/ui/modal';
import { SelectField } from '~shared/ui/select-field';
import { UnderlineText } from '~shared/ui/underline-text';
import { MedInfoData, downloadPDF, getDataInfo } from './lib/helper';
import { biteConditionOptions, jawOpeningSelect1Options1, jawOpeningSelect1Options2, jawOpeningSelect1Options3, selectOptionsYesOrNot } from './lib/utils';
import s from './styles.module.scss';
import ImplantICO from './svg/implant.svg';
import PrePlanningICO from './svg/pre-planning.svg';

type MedInfoDetailProps = {
  id: string
  patientId: string
  isUpdate: boolean
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
  bleedingDuringEndotherapy: number,
  presenceOfScars: number,
  periodontalPockets: number,
  dischargeExudatePocket: number,
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

export function MedInfoDetail({ patientId, id, isUpdate }: MedInfoDetailProps) {
  const navigate = useNavigate();
  const { data: patientInfo, isLoading } = usePatientId(patientId, isUpdate);
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
        value: `№ ${patientId} от «${values.startDay}» ${values.startMonth} ${values.startYear.replace(' ', '')}`,
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
        value: `${API_URL}/static/6.svg`,
      },
      {
        id: 'default',
        type: 'string',
        ...values,
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

  const handleEdit = () => {
    navigate(PATH_PAGE.medInfo.edit(patientId, id));
  };

  const onModal = () => {
    setOpen(false);
    if (isUpdate) {
      navigate(-1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [patientInfo, isLoading]);

  if (!patientInfo || isLoading) {
    return null;
  }

  const medInfo: MedInfoData[] = JSON.parse(patientInfo.medInfo);
  const defaultValue = medInfo.find((value) => value.id === 'default');

  return (
    <Formik
      initialValues={{
        startDay: defaultValue?.startDay as string ?? '',
        startMonth: defaultValue?.startMonth as string ?? '',
        startYear: defaultValue?.startYear as string ?? '20',
        fullName: patientInfo.fullName,
        sex: patientInfo.sex,
        address: patientInfo.address,
        phone: patientInfo.phone,
        age: patientInfo.dateOfBirth,
        specialization: defaultValue?.specialization as string ?? '',
        diagnosis: defaultValue?.diagnosis as string ?? '',
        diagnosisICD: defaultValue?.diagnosisICD as string ?? '',
        complaints: defaultValue?.complaints as string ?? '',
        previousConcomitantDiseases: defaultValue?.previousConcomitantDiseases as string ?? '',
        developmentDisease: defaultValue?.developmentDisease as string ?? '',
        faceSelect: defaultValue?.faceSelect as string ?? 'cимметричное',
        faceText: defaultValue?.faceText as string ?? '',
        skinSelect: defaultValue?.skinSelect as string ?? 'чистые',
        skinText: defaultValue?.skinText as string ?? '',
        propertiesOne: defaultValue?.propertiesOne as string ?? 'не увеличены',
        propertiesTwo: defaultValue?.propertiesTwo as string ?? 'безболезненные',
        propertiesThree: defaultValue?.propertiesThree as string ?? 'не спаяны с окружающики тканями',
        propertiesInfo: defaultValue?.propertiesInfo as string ?? '',
        consistency: defaultValue?.consistency as string ?? 'однородная',
        chinFolds: defaultValue?.chinFolds as string ?? 'не выражены',
        nasolabialFolds: defaultValue?.nasolabialFolds as string ?? 'не выражены',
        lowerFace: defaultValue?.nasolabialFolds as string ?? 'не выражены',
        externalInspectionComment: defaultValue?.nasolabialFolds as string ?? '',
        plaqueOnTeeth: defaultValue?.nasolabialFolds as string ?? 'Нет',
        plaqueOnTeethText: defaultValue?.nasolabialFolds as string ?? '',
        plaqueOnTeethDropdown1: defaultValue?.plaqueOnTeethDropdown1 as string ?? 'пигментированный',
        plaqueOnTeethDropdown2: defaultValue?.plaqueOnTeethDropdown2 as string ?? 'Твердый',
        plaqueOnTeethDropdown3: defaultValue?.plaqueOnTeethDropdown3 as string ?? 'обильное',
        plaqueOnTeethCheckbox1: defaultValue?.plaqueOnTeethCheckbox1 as string ?? '',
        plaqueOnTeethCheckbox2: defaultValue?.plaqueOnTeethCheckbox2 as string ?? '',
        plaqueOnTeethInputField: defaultValue?.plaqueOnTeethInputField as string ?? '',
        oralMucosa1: defaultValue?.oralMucosa1 as string ?? 'бледно-розового цвета',
        oralMucosa2: defaultValue?.oralMucosa2 as string ?? 'не отечна',
        bleedingDuringEndotherapy: defaultValue?.bleedingDuringEndotherapy as number ?? -1,
        presenceOfScars: defaultValue?.presenceOfScars as number ?? -1,
        periodontalPockets: defaultValue?.periodontalPockets as number ?? -1,
        dischargeExudatePocket: defaultValue?.dischargeExudatePocket as number ?? -1,
        dischargeExudatePocketText: defaultValue?.dischargeExudatePocketText as string ?? '',
        upperJawExostosis: defaultValue?.bleedingDuringEndotherapy as number ?? -1,
        upperJawExostosisText: defaultValue?.upperJawExostosisText as string ?? '',
        danglingComb: defaultValue?.danglingComb as number ?? -1,
        danglingCombText: defaultValue?.danglingCombText as string ?? '',
        upperJawAtrophy: defaultValue?.upperJawAtrophy as number ?? -1,
        upperJawAtrophyText: defaultValue?.upperJawAtrophyText as string ?? '',
        lowerJawExostosis: defaultValue?.lowerJawExostosis as number ?? -1,
        lowerJawExostosisText: defaultValue?.lowerJawExostosisText as string ?? '',
        lowerDanglingComb: defaultValue?.lowerDanglingComb as number ?? -1,
        lowerDanglingCombText: defaultValue?.lowerDanglingCombText as string ?? '',
        lowerJawAtrophy: defaultValue?.lowerJawAtrophy as number ?? -1,
        lowerJawAtrophyText: defaultValue?.lowerJawAtrophyText as string ?? '',
        salivaryGlandSelect1: defaultValue?.salivaryGlandSelect1 as string ?? 'однородная',
        salivaryGlandSelect2: defaultValue?.salivaryGlandSelect2 as string ?? 'безболезненная',
        salivaryGlandSelect3: defaultValue?.salivaryGlandSelect3 as string ?? 'симметричная',
        salivaryGlandText: defaultValue?.salivaryGlandText as string ?? '',
        parotidPalpationSelect1: defaultValue?.parotidPalpationSelect1 as string ?? 'однородная',
        parotidPalpationSelect2: defaultValue?.parotidPalpationSelect2 as string ?? 'безболезненная',
        parotidPalpationSelect3: defaultValue?.parotidPalpationSelect3 as string ?? 'симметричная',
        parotidPalpationText: defaultValue?.parotidPalpationText as string ?? '',
        redBorderOfLipsSelect1: defaultValue?.redBorderOfLipsSelect1 as string ?? 'бледно-розовая',
        redBorderOfLipsSelect2: defaultValue?.redBorderOfLipsSelect2 as string ?? 'влажная',
        presenceOfScales: defaultValue?.presenceOfScales as number ?? -1,
        crackedUpper: defaultValue?.crackedUpper as boolean ?? false,
        crackedLower: defaultValue?.crackedLower as boolean ?? false,
        crackedCommissural: defaultValue?.crackedCommissural as string ?? '',
        crackInHistory: defaultValue?.crackInHistory as number ?? -1,
        lipExaminationText: defaultValue?.lipExaminationText as string ?? '',
        tongueExaminationSelect1: defaultValue?.tongueExaminationSelect1 as string ?? 'не увеличен',
        tongueExaminationSelect2: defaultValue?.tongueExaminationSelect2 as string ?? 'бледно-розовый',
        tongueExaminationText: defaultValue?.tongueExaminationText as string ?? '',
        epithelialDesquamation: defaultValue?.epithelialDesquamation as number ?? -1,
        teetImprintsTheTongue: defaultValue?.teetImprintsTheTongue as number ?? -1,
        frenulumTongue: defaultValue?.frenulumTongue as string ?? 'длинная',
        severityGagReflex: defaultValue?.severityGagReflex as number ?? -1,
        examinationTonguePapillae: defaultValue?.examinationTonguePapillae as string ?? 'не гипертрофированы',
        tongueExaminationField: defaultValue?.tongueExaminationField as string ?? '',
        examinationVestibuleMouth: defaultValue?.examinationVestibuleMouth as string ?? 'среднее',
        attachedGingivalHeight: defaultValue?.attachedGingivalHeight as string ?? '',
        presenceOfRecessions: defaultValue?.presenceOfRecessions as number ?? -1,
        presenceOfRecessionsText: defaultValue?.presenceOfRecessionsText as string ?? '',
        frenulumLowerLip: defaultValue?.frenulumLowerLip as string ?? '',
        frenulumUpperLip: defaultValue?.frenulumUpperLip as string ?? '',
        presenceSurgicalScar: defaultValue?.presenceSurgicalScar as string ?? '',
        biteCondition: defaultValue?.biteCondition as number ?? -1,
        biteConditionField: defaultValue?.biteConditionField as string ?? '',
        overlapSelect: defaultValue?.overlapSelect as string ?? 'горизонтальное',
        overlapField: defaultValue?.overlapField as string ?? '',
        tremesSelect: defaultValue?.tremesSelect as number ?? -1,
        tremesField: defaultValue?.tremesField as string ?? '',
        diastemasSelect: defaultValue?.diastemasSelect as number ?? -1,
        diastemasField: defaultValue?.diastemasField as string ?? '',
        anomaliesIndividualTeeth: defaultValue?.anomaliesIndividualTeeth as string ?? '',
        toothWearSelect: defaultValue?.toothWearSelect as string ?? 'не имеется',
        toothWearField: defaultValue?.toothWearField as string ?? '',
        dentoalveolarAdvancementSelect: defaultValue?.dentoalveolarAdvancementSelect as number ?? -1,
        dentoalveolarAdvancementField: defaultValue?.dentoalveolarAdvancementField as string ?? '',
        signPopovGodonSelect: defaultValue?.dentoalveolarAdvancementSelect as number ?? -1,
        signPopovGodonField: defaultValue?.signPopovGodonField as string ?? '',
        overlappingLowerIncisorsUpper: defaultValue?.overlappingLowerIncisorsUpper as string ?? '',
        speechDefectSelect: defaultValue?.speechDefectSelect as number ?? -1,
        speechDefectField: defaultValue?.speechDefectField as string ?? '',
        jawOpeningSelect1: defaultValue?.jawOpeningSelect1 as number ?? -1,
        jawOpeningSelect2: defaultValue?.jawOpeningSelect2 as number ?? -1,
        jawOpeningSelect3: defaultValue?.jawOpeningSelect3 as number ?? -1,
        jawOpeningField: defaultValue?.jawOpeningField as string ?? '',
        movementArticularHeadsSelect: defaultValue?.movementArticularHeadsSelect as string ?? 'симметричное',
        movementArticularHeadsField: defaultValue?.movementArticularHeadsField as string ?? '',
        additionallyClick: defaultValue?.additionallyClick as boolean ?? false,
        additionallyCrunch: defaultValue?.additionallyCrunch as boolean ?? false,
        additionallyCrepitusJoint: defaultValue?.additionallyCrepitusJoint as boolean ?? false,
        additionallyField: defaultValue?.additionallyField as string ?? '',
        masticatoryMuscleToneSelect: defaultValue?.masticatoryMuscleToneSelect as string ?? 'нормальный',
        masticatoryMuscleToneField: defaultValue?.masticatoryMuscleToneField as string ?? '',
        examinationField: defaultValue?.examinationField as string ?? '',
        additionallyClickRight: defaultValue?.additionallyClickRight as boolean ?? false,
        additionallyClickLeft: defaultValue?.additionallyClickLeft as boolean ?? false,
        additionallyClickUponOpening: defaultValue?.additionallyClickUponOpening as boolean ?? false,
        additionallyClickWhenClosing: defaultValue?.additionallyClickWhenClosing as boolean ?? false,
        additionallyCrunchRight: defaultValue?.additionallyCrunchRight as boolean ?? false,
        additionallyCrunchLeft: defaultValue?.additionallyCrunchLeft as boolean ?? false,
        additionallyCrunchUponOpening: defaultValue?.additionallyCrunchUponOpening as boolean ?? false,
        additionallyCrunchWhenClosing: defaultValue?.additionallyCrunchWhenClosing as boolean ?? false,
        additionallyCrepitusJointRight: defaultValue?.additionallyCrepitusJointRight as boolean ?? false,
        additionallyCrepitusJointLeft: defaultValue?.additionallyCrepitusJointLeft as boolean ?? false,
        additionallyCrepitusJointUponOpening: defaultValue?.additionallyCrepitusJointUponOpening as boolean ?? false,
        additionallyCrepitusJointWhenClosing: defaultValue?.additionallyCrepitusJointWhenClosing as boolean ?? false,
        laboratoryData: defaultValue?.laboratoryData as string ?? '',
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
                !isUpdate ? medInfo[0].value : (
                  <>
                    № <span className={s.redHighlight}>{patientId}</span> от
                    «
                    <Field
                      name="startDay"
                    >
                      {(props: FieldProps) =>
                        <InputMask name="startDay" style={{ width: 20, textAlign: 'center' }} className={s.defaultInput}
                          defaultValue={props.field.value}
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
                          value={props.field.value}
                          onChange={props.field.onChange} />}
                    </Field>
                    {' '}
                    <Field
                      name="startYear"
                    >
                      {(props: FieldProps) =>
                        <InputMask name="startYear" className={classNames(s.defaultInput, s.title)}
                          defaultValue={props.field.value}
                          onChange={props.field.onChange} mask="2099г." placeholder='20__г.' maskChar="_" />
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
                !isUpdate ? medInfo[6].value : (
                  <Field
                    name="specialization"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='specialization'
                        className={classNames(s.defaultInput, s.title)}
                        value={props.field.value}
                        onChange={props.field.onChange} />}
                  </Field>
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>7. Диагноз:
              {
                !isUpdate ? medInfo[7].value : (
                  <Field
                    name="diagnosis"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='diagnosis'
                        className={classNames(s.defaultInput, s.title)}
                        value={props.field.value}
                        onChange={props.field.onChange} />}
                  </Field>
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>8. Диагноз по МКБ -10:
              {
                !isUpdate ? medInfo[8].value : (
                  <Field
                    name="diagnosisICD"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='diagnosisICD'
                        className={classNames(s.defaultInput, s.title)}
                        value={props.field.value}
                        onChange={props.field.onChange} />}
                  </Field>
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>9. Жалобы:
              {
                !isUpdate ? medInfo[9].value : (
                  <Field
                    name="complaints"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='complaints'
                        className={classNames(s.defaultInput, s.title)}
                        value={props.field.value}
                        onChange={props.field.onChange} />}
                  </Field>
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>10. Перенесенные и сопутствующие заболевания:
              {
                !isUpdate ? medInfo[10].value : (
                  <Field
                    name="previousConcomitantDiseases"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='previousConcomitantDiseases'
                        className={classNames(s.defaultInput, s.title)}
                        value={props.field.value}
                        onChange={props.field.onChange} />}
                  </Field>
                )
              }
            </div>
            <div className={classNames(s.title, s.filterOptions)}>11. Развитие настоящего заболевания:
              {
                !isUpdate ? medInfo[11].value : (
                  <Field
                    name="developmentDisease"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='developmentDisease'
                        className={classNames(s.defaultInput, s.title)}
                        value={props.field.value}
                        onChange={props.field.onChange} />}
                  </Field>
                )
              }
            </div>
            <Grid>
              <span className={classNames(s.title)}>12. Внешний осмотр:</span>
              {
                !isUpdate ? getDataInfo(medInfo[12]) : (
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
                              defaultOption={props.field.value}
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
                              value={props.field.value}
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
                              defaultOption={props.field.value}
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
                              value={props.field.value}
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
                                  defaultOption={props.field.value}
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
                                  defaultOption={props.field.value}
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
                                  defaultOption={props.field.value}
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
                                value={props.field.value}
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
                                  defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                              value={props.field.value}
                              onChange={props.field.onChange} />}
                        </Field>
                      </Grid>
                    </li>
                  </ul>
                )
              }
              {!isUpdate && getDataInfo(medInfo[13])}
            </Grid>
            <div className={s.title}>
              <Grid className={s.filterOptions}>
                <Grid marginRight={1}>13. Состояние зубов: <span>налет на зубах</span></Grid>
                {
                  !isUpdate ? getDataInfo(medInfo[14]) : (
                    <>
                      <Field name="plaqueOnTeeth">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: 'Нет', label: 'Нет' }, { value: 'Есть', label: 'Есть' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              defaultOption={props.field.value}
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
                                value={props.field.value}
                                onChange={props.field.onChange} />}
                          </Field>
                        )
                      }
                    </>
                  )}
              </Grid>
              {
                isUpdate && values.plaqueOnTeeth !== 'Нет' && (
                  <>
                    <Grid marginBlock={2} marginLeft={2} className={s.filterOptions}>
                      <Field name="plaqueOnTeethDropdown1">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: 'пигментированный', label: 'пигментированный' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              defaultOption={props.field.value}
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
                              defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                    <Grid marginBlock={2} marginLeft={2} >
                      <Field
                        name="plaqueOnTeethInputField"
                      >
                        {(props: FieldProps) =>
                          <UnderlineText
                            width='100%'
                            name='plaqueOnTeethInputField'
                            className={classNames(s.defaultInput, s.title)}
                            value={props.field.value}
                            onChange={props.field.onChange} />}
                      </Field>
                    </Grid>
                  </>)
              }
            </div>
            <div className={classNames(s.title)}>14. Зубная формула <br /><br />
              <div className={s.dentalFormula}>
                Условные обозначения: отсутствует — О, корень — R, Кариес — С, пульпит —Р, Периодонтит — Pt, пломба — П,<br /><br />
                Пародонтит — А, подвижность — степень I, II, III, Клиновидный дефект — КД, коронка - К, иск. зуб — Из,<br /><br />
                Имплантат — И, керамический виннр— VC, ЧСП—частичный съемный протез, ПСП— полный съемный протез <br /><br />

                <table>
                  <tr>
                    <th>Диагноз MКБ-10</th>
                    {
                      Array.from({ length: 16 }).fill(0).map((_, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <th key={`column-${i}`}> </th>
                      ))
                    }
                  </tr>
                  <tr>
                    <td>Подвижность</td>
                    <td width={20}>Тут может быть только I, II, III</td>
                    {Array.from({ length: 15 }).fill(0).map((_, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <th key={`column-${i}`}> </th>
                    ))}
                  </tr>
                  <tr>
                    <td>Дата заполнения</td>
                    {Array.from({ length: 16 }).fill(0).map((_, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <th key={`column-${i}`}> </th>
                    ))}
                  </tr>
                  <tr>
                    <td>Номер зубов</td>
                    {Array.from({ length: 8 }).fill(0).map((_, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <th key={`column-${i}`}>{i + 1}</th>
                    ))}
                    {Array.from({ length: 8 }).fill(0).reverse().map((_, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <th key={`column-${i}`}>{i + 1}</th>
                    ))}
                  </tr>
                  <tr>
                    <td>Дата заполнения</td>
                    {Array.from({ length: 16 }).fill(0).map((_, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <th key={`column-${i}`}> </th>
                    ))}
                  </tr>
                  <tr>
                    <td>Подвижность</td>
                    {Array.from({ length: 15 }).fill(0).map((_, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <th key={`column-${i}`}> </th>
                    ))}
                  </tr>
                  <tr>
                    <td>Диагноз MКБ-10</td>
                    {
                      Array.from({ length: 16 }).fill(0).map((_, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <th key={`column-${i}`}> </th>
                      ))
                    }
                  </tr>
                </table>
              </div>
            </div>
            <div className={s.title}>
              <Grid marginBlock={2}>15. Состояние слизистой оболочки рта, десен, альвеолярных отростков и неба:</Grid>
              {
                !isUpdate ? getDataInfo(medInfo[16]) : (
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
                                defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              defaultOption={props.field.value}
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
                        <Grid marginRight={1}>наличие рубцов</Grid>
                        <Field name="presenceOfScars">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              defaultOption={props.field.value}
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
                        <Grid marginRight={1}>пародонтальные карманы </Grid>
                        <Field name="periodontalPockets">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              defaultOption={props.field.value}
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
                        <Grid marginRight={1}>выделение экссудата из кармана</Grid>
                        <Field name="dischargeExudatePocket">
                          {(props: FieldProps) => (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptionsYesOrNot}
                              defaultOption={props.field.value}
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
                          name="dischargeExudatePocketText"
                        >
                          {(props: FieldProps) =>
                            <UnderlineText
                              width='100%'
                              name='dischargeExudatePocketText'
                              className={classNames(s.defaultInput, s.title)}
                              value={props.field.value}
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
                                  defaultOption={props.field.value}
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
                                  value={props.field.value}
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
                                defaultOption={props.field.value}
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
                                value={props.field.value}
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
                                defaultOption={props.field.value}
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
                                value={props.field.value}
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
                                  defaultOption={props.field.value}
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
                                  value={props.field.value}
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
                                defaultOption={props.field.value}
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
                                value={props.field.value}
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
                                defaultOption={props.field.value}
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
                                value={props.field.value}
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
                                defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                              value={props.field.value}
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
                                defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                              value={props.field.value}
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
                !isUpdate ? getDataInfo(medInfo[17]) : (
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
                                defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                              defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                                value={props.field.value}
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
                    !!isUpdate && (
                      <>
                        <Field name="tongueExaminationSelect1 ">
                          {(props: FieldProps) => {
                            const selectOptions = [{ value: 'не увеличен', label: 'не увеличен' }];
                            return (
                              <SelectField
                                className={s.optionInfo}
                                selectNavigate
                                selectOptions={selectOptions}
                                defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                              value={props.field.value}
                              onChange={props.field.onChange} />}
                        </Field>
                      </>
                    )}
                </Grid>
                {!isUpdate && getDataInfo(medInfo[18])}
              </Grid>
              {
                !!isUpdate && (
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
                              defaultOption={props.field.value}
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
                              defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                              defaultOption={props.field.value}
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
                                defaultOption={props.field.value}
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
                            value={props.field.value}
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
                    !!isUpdate && (
                      <Field name="examinationVestibuleMouth">
                        {(props: FieldProps) => {
                          const selectOptions = [{ value: 'среднее', label: 'среднее' }];
                          return (
                            <SelectField
                              className={s.optionInfo}
                              selectNavigate
                              selectOptions={selectOptions}
                              defaultOption={props.field.value}
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
                !isUpdate ? getDataInfo(medInfo[19]) : (
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
                              value={props.field.value}
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
                              defaultOption={props.field.value}
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
                              value={props.field.value}
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
                              value={props.field.value}
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
                              value={props.field.value}
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
                              value={props.field.value}
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
                    !!isUpdate && (
                      <Field name="biteCondition">
                        {(props: FieldProps) => (
                          <SelectField
                            className={s.optionInfo}
                            selectNavigate
                            selectOptions={biteConditionOptions}
                            defaultOption={props.field.value}
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
                  !!isUpdate && (
                    <Field
                      name="biteConditionField"
                    >
                      {(props: FieldProps) =>
                        <UnderlineText
                          width='100%'
                          name='biteConditionField'
                          className={classNames(s.defaultInput, s.title)}
                          value={props.field.value}
                          onChange={props.field.onChange} />}
                    </Field>
                  )}
              </Grid>
              {
                !isUpdate ? getDataInfo(medInfo[20]) : (
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
                                defaultOption={props.field.value}
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
                              value={props.field.value}
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
                              defaultOption={props.field.value}
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
                              value={props.field.value}
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
                              defaultOption={props.field.value}
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
                              value={props.field.value}
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
                              value={props.field.value}
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
                                defaultOption={props.field.value}
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
                              value={props.field.value}
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
                              defaultOption={props.field.value}
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
                              value={props.field.value}
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
                              defaultOption={props.field.value}
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
                              value={props.field.value}
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
                              value={props.field.value}
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
                              defaultOption={props.field.value}
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
                              value={props.field.value}
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
                !isUpdate ? getDataInfo(medInfo[21]) : (
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
                              defaultOption={props.field.value}
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
                              defaultOption={props.field.value}
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
                              defaultOption={props.field.value}
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
                              value={props.field.value}
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
                                defaultOption={props.field.value}
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
                              value={props.field.value}
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
                              value={props.field.value}
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
                                defaultOption={props.field.value}
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
                            value={props.field.value}
                            onChange={props.field.onChange} />}
                      </Field>
                    </li>
                  </ul>
                )}
            </div>

            <div className={classNames(s.title, s.filterOptions)}>21. Данные рентгенологического и лабораторного исследования:
              {
                !isUpdate ? getDataInfo(medInfo[22]) : (
                  <Field
                    name="laboratoryData"
                  >
                    {(props: FieldProps) =>
                      <UnderlineText
                        width='100%'
                        name='laboratoryData'
                        className={classNames(s.defaultInput, s.title)}
                        value={props.field.value}
                        onChange={props.field.onChange} />}
                  </Field>
                )}
            </div>
            <div className={classNames(s.title, s.tableInfo22)}>22. Бланк онкологического профилактического медицинского осмотра:

              <table className={s.table}>
                <tr>
                  <th rowSpan={2} style={{ width: 120 }}>Дата осмотра</th>
                  <th colSpan={8}>Направление на доследование</th>
                  {/* <th>Наименование медицинского учреждения и специалиста</th> */}
                </tr>
                <tr>
                  <td style={{ writingMode: 'vertical-rl' }}><p className={s.p}>Губа</p></td>
                  <td style={{ writingMode: 'vertical-rl' }}><p className={s.p} >Рот и глотка</p></td>
                  <td style={{ writingMode: 'vertical-rl' }}><p className={s.p}>Щитовидная железа</p></td>
                  <td style={{ writingMode: 'vertical-rl' }}><p className={s.p}>Лимфатические узлы</p></td>
                  <td style={{ writingMode: 'vertical-rl' }}><p className={s.p}>Кожа</p></td>
                  <td>Дата</td>
                  <td>Наименование медицинского учреждения и специалиста</td>
                </tr>
                <tr>
                  {Array.from({ length: 8 }).fill(0).map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <th key={`column-${i}`} className={s.empty}>{i + 1}</th>
                  ))}
                </tr>
                {Array.from({ length: 6 }).fill(0).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={`column-${index}`}>
                    {Array.from({ length: 7 }).fill(0).map((__, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <th key={`column-${i}`} className={classNames(s.empty, { [s.yellow]: i > 0 && i < 6 }, { [s.red]: i >= 6 })}> </th>
                    ))}
                    <th className={s.red}><span className={s.nameText}>Наименование организации <br /> Врач: ______________</span>  </th>
                  </tr>
                ))}
              </table>

              <p style={{ color: '#0E5F8C', lineHeight: '25.6px' }}>
                Примечание: 1. при подозрении на рак или предраковое заболевание, в соответствующем поле ставиться символ «+». <br />
                2. при отсутствии подозрительных симптомов ставится символ «N» (норма).<br />
                3. Заполняется 2 раза в год<br />
                4. При подозрении на рак или предраковое заболевание в соответствующие поле ставится символ «+)), в амбулаторной карте описывается цвет, размер, форма, консистенция очага поражения, указывается размер лимфоузлов, форма, подвижность болезненность, отмечается дата направления в специализированное учреждение и результат обследования. Врач заполняет графу «Ф.И.О.)) и ставит подпись.
              </p>

            </div>
            <div className={classNames(s.title, s.tableInfo23)}>23. Бланк обследования на венерические заболивания:
              <table className={s.table}>
                <tr>
                  <td>
                    I. Жалобы больного:
                    <div className={s.tdInfo}><span className={s.tdName}>снижение зрения</span> <span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>слуха</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>пямяти</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>нарушение координации движения</span><span className={s.tdName}>да/нет</span></div>
                    <br />
                    II. Наружный осмотр:
                    <div className={s.tdInfo}>1. В/ч головы: наличие</div>
                    <div className={s.tdInfo}><span className={s.tdName}>-алопеций</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-папулы</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-пустулы</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-корочки</span><span className={s.tdName}>да/нет</span></div>
                    <br />
                    2. Слизистая полости рта, язык:
                    <div className={s.tdInfo}><span className={s.tdName}>-пятна</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-папулы</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-эрозии</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-язвы</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-ангина</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-увеличение одной из мендалин</span><span className={s.tdName}>да/нет</span></div>
                  </td>
                  <td>
                    Состояние губ:
                    <div className={s.tdInfo}><span className={s.tdName}>-папулы</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-заеды</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-эрозии</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-язвы</span><span className={s.tdName}>да/нет</span></div>
                    <br />
                    <div className={s.tdInfo}><span className={s.tdName}>3. Осыплость голоса</span><span className={s.tdName}>да/нет</span></div>
                    <br />
                    III. Пальпация лимфатических узлов:
                    <div className={s.tdInfo}><span className={s.tdName}>-шейные</span><span className={s.tdName}>да/нет</span></div>
                    <div className={s.tdInfo}><span className={s.tdName}>-подчелюстные</span><span className={s.tdName}>да/нет</span></div>
                  </td>
                </tr>
              </table>
              <div className={s.bottomBlock}>
                Заключение:___________________________________________________________________________________________________________
                <div className={s.print}>Дата осмотра_____________________________ Подпись врача___________</div>
                <div className={s.print}>Дата осмотра_____________________________ Подпись врача___________</div>
                <div className={s.print}>Дата осмотра_____________________________ Подпись врача___________</div>
              </div>
            </div>
            <div className={classNames(s.title, s.tableInfo24)}>24. Предварительное планирование лечения:
              <table className={s.table}>
                <tr>
                  <th colSpan={2}> <PrePlanningICO /></th>
                  <th colSpan={2}> <PrePlanningICO /></th>
                  <th colSpan={2}> <PrePlanningICO /></th>
                </tr>
                <tr>
                  <td>Консультация</td>
                  <td />
                  <td>Консультация</td>
                  <td />
                  <td>Консультация</td>
                  <td />
                </tr>
                <tr>
                  <td>Гигиена</td>
                  <td />
                  <td>Гигиена</td>
                  <td />
                  <td>Гигиена</td>
                  <td />
                </tr>
                <tr>
                  <td>Лечение</td>
                  <td />
                  <td>Лечение</td>
                  <td />
                  <td>Лечение</td>
                  <td />
                </tr>
                <tr>
                  <td>Удаление</td>
                  <td />
                  <td>Удаление</td>
                  <td />
                  <td>Удаление</td>
                  <td />
                </tr>
                <tr>
                  <td>Пародонтология</td>
                  <td />
                  <td>Пародонтология</td>
                  <td />
                  <td>Пародонтология</td>
                  <td />
                </tr>
                <tr>
                  <td>Синус-лифтинг костная пластика</td>
                  <td />
                  <td>Синус-лифтинг костная пластика</td>
                  <td />
                  <td>Синус-лифтинг костная пластика</td>
                  <td />
                </tr>
                <tr>
                  <td>Имплантация</td>
                  <td />
                  <td>Имплантация</td>
                  <td />
                  <td>Имплантация</td>
                  <td />
                </tr>
                <tr>
                  <td>Протезирование</td>
                  <td />
                  <td>Протезирование</td>
                  <td />
                  <td>Протезирование</td>
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <td>ИТОГО</td>
                  <td />
                  <td>ИТОГО</td>
                  <td />
                  <td>ИТОГО</td>
                  <td />
                </tr>
                <tr>
                  <td>Срок лечения</td>
                  <td />
                  <td>Срок лечения</td>
                  <td />
                  <td>Срок лечения</td>
                  <td />
                </tr>

              </table>

              <table className={s.tableText}>
                <tr>
                  <td colSpan={6}>
                    Составление окончательного плана лечения, гарантирующего надёжный и долгосрочный результат возможно только после полной диагностики и осмотра всех специалистов.<br /><br />
                    Врач - хирург: _____________________________________<br />
                    Врач-ортопед: ____________________________________<br />
                    Врач-терапевт: ________________________________<br />
                    Особенности плана лечения ______________________________________________________________________________________________________________
                    ___________________________________________________________________.<br />
                    Ориентировочный срок реализации предполагаемого плана лечения – ____ месяца(ев). В зависимости от медицинских показаний и реакции организма на проводимое лечение сроки могут быть уменьшены или увеличены. Гарантия сохранения цен по настоящему плану лечения возможна только при условии внесения 100% предоплаты за предполагаемые услуги. В случае оплаты услуг по факту их оказания стоимость определяется прейскурантом, действующим на момент оказания услуги, и со временем может измениться в большую сторону. Если какие-либо услуги, которые предполагается оказать в соответствии с планом лечения, фактически не будут оказаны по медицинским показаниям в случае внесения 100% предоплаты, по окончании лечения будет произведен перерасчет и возврат денег за не оказанные услуги. Услуги, оказанные с согласия пациента сверх плана лечения, оплачиваются дополнительно по прейскуранту на момент оказания.
                    План лечения может быть дополнен и изменен по предварительному согласованию с пациентом и в соответствии с медицинскими показаниями. В случае несогласия пациента с обязательными изменениями плана лечения по медицинским показаниям или изменением его стоимости лечение прекращается и делается перерасчет с оплатой фактически оказанных услуг.
                    <br />Я понимаю, что план лечения является предварительным, объем, стоимость и сроки лечения могут меняться в зависимости от клинической картины, успеха лечения, выполнения мною рекомендаций и посещения врачей Исполнителя.
                    <br />Мне понятен план, объем, срок и предполагаемый результат лечения, возможные осложнения на всех этапах лечения, возможность возникновения необходимости дополнительных обследований, изменения сроков лечения, дополнительной оплаты за иные услуги в случае возникновения медицинских показаний, мне были представлены альтернативные варианты лечения и протезирования, понятны сроки и условия гарантии на оказываемые по лану лечения услуги. Я понимаю необходимость плановых профилактических осмотров 1 раз в 3 месяца после реализации плана лечения в
                    {/* &quot;{patientInfo.user.clinic.name}&quot;  */}
                    и обязательное использование для самостоятельной гигиены ирригатора полости рта.  Мне разъяснили значение всех слов и медицинских терминов, связанных с реализацией плана лечения. Я имел возможность задать любые вопросы врачу и получил ответы на все вопросы, касающиеся предстоящего лечения, его сроков и стоимости.
                    <br /><b>С планом лечения № ___ ознакомлен и согласен:</b>
                    <br /><b>Подпись пациента_________________________________________ ______________</b>
                    <br /><br />От предложенных планов лечения № ____отказываюсь__________ (подпись пациента)
                    <br /><br />Дата «__» __________ 20___ года
                  </td>
                </tr>
              </table>
            </div>
            <div className={s.title}>25. Установеленные импланты: <br /><br />
              <div className='center'>
                {Array.from({ length: 4 }).fill(0).map(() => (
                  <div className='d-flex'>
                    {Array.from({ length: 4 }).fill(0).map((_, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <ImplantICO key={`column-${i}`} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={s.submitButtons}>
            {!isUpdate && (
              <>
                {
                  role === 'medChief' && (
                    <Button
                      className={s.submit}
                      type="submit"
                      color="secondary"
                      onClick={handleEdit}
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
              </>
            )}

            {
              isUpdate && (
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
            onSuccess={onModal}
            onClose={onModal}
            type='info' >
            <div>
              {!isUpdate ? <>Сохранить информацию? <br />Поменять ее сможет только<br />Владелец клиники</> : 'Информация сохранена!'}
            </div>
          </Modal>
        </Form>
      )
      }
    </Formik >
  );
}
