import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { SelectField } from '~shared/ui/select-field';
import { UnderlineText } from '~shared/ui/underline-text';
import s from './styles.module.scss';


export function MedInfoDetail() {

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
          <div className={s.cardBlock}>
            <span className={s.titleName}> Медицинская информация больного</span>

            <div className={classNames(s.title)}>
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
            <div className={classNames(s.title)}>7. Диагноз:
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
            <div className={classNames(s.title)}>8. Диагноз по МКБ -10:
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
            <div className={classNames(s.title)}>9. Жалобы:
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
            <div className={classNames(s.title)}>10. Перенесенные и сопутствующие заболевания:
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
            <div className={classNames(s.title)}>11. Развитие настоящего заболевания:
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


            <div>
              12. Внешний осмотр:
              <ul className={s.ul}>
                <li className={s.li}>
                  <span className={s.filterOptions}>
                    Лицо
                    <Field name="previouslyTreated">
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
                  </span>
                </li>

                <li className={s.li}>
                  <span>Комментарий</span>
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

            <div className={classNames(s.title)}>13. Состояние зубов: <span>налет на зубах</span>
              <Field name="test">
                {(props: FieldProps) =>
                  <SelectField
                    className={s.optionInfo}
                    selectNavigate
                    selectOptions={[{ value: 1, label: 'Нет' }]}
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
            </div>
          </div>
        </Form>
      )}
    </Formik >
  );
}
