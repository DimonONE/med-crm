import classNames from 'classnames';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { UnderlineText } from '~shared/ui/underline-text';
import s from './styles.module.scss';


// type Params = {
//   patientId: string | undefined
// };

export function MedInfoDetailPage() {

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
      {() => (
        <Form
          className={s.root}
        >
          <span className={s.titleName}> Медицинская информация больного</span>
          <div className={s.cardBlock}>

            <div className={classNames(s.title, s.verticalGap)}>
              № <span className={s.redHighlight}>345346356456</span> от
              «
              <Field
                name="test"
              >
                {(props: FieldProps) =>
                  <UnderlineText
                    width='10px'
                    name='test'
                    className={classNames(s.defaultInput, s.title)}
                    onChange={props.field.onChange} />}
              </Field>
              »
            </div>
            <div className={classNames(s.title, s.verticalGap)}>
              1. Фамилия, имя, отчество:
              <span className={classNames(s.redHighlight, s.italic)}> Пупкин Василий Васильевич</span>
            </div>
            <div className={classNames(s.title, s.verticalGap)}>2. <span className={s.redHighlight}> Мужчина</span> </div>
            <div className={classNames(s.title, s.verticalGap)}>3. Адрес:   <span className={classNames(s.redHighlight, s.italic)}> ул. Пушкина д27, кв 65</span> </div>
            <div className={classNames(s.title, s.verticalGap)}>4. Телефон: <span className={classNames(s.redHighlight, s.italic)}> +380966528347</span> </div>
            <div className={classNames(s.title, s.verticalGap)}>5. Возраст: <span className={classNames(s.redHighlight, s.italic)}> 55</span> </div>
          </div>
        </Form>
      )}
    </Formik >
  );
}
