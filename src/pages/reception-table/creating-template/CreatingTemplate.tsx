import { useEffect } from 'react';
// import { FormGroup, Grid, MenuItem } from '@mui/material';
import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';
import { DraggableList, useDraggableSlice } from '~features/draggable-list';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
// import { SelectField } from '~shared/ui/select-field';
// import { UnderlineText } from '~shared/ui/underline-text';
import s from './styles.module.scss';

// interface RootChannelProps {
//   title: string;
//   isDefault?: boolean;
// }

// function RootChannel({ title, isDefault }: RootChannelProps): JSX.Element {
//   const [isHidden, setHidden] = useState(true);

//   const handleClick = () => {
//     setHidden((prev) => !prev);
//   };

//   useEffect(() => {
//     if (isDefault) {
//       setHidden((prev) => !prev);
//     }
//   }, [isDefault]);

//   return (
//     <div className={s.cardBlock}>
//       <button
//         onClick={handleClick}
//         type="button"
//         className={classNames(s.title, { [s.verticalGap]: !isHidden })}
//       >
//         {title}
//       </button>
//       {!isHidden && (
//         <>
//           <ul className={s.ul}>
//             <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
//               <span className={s.filterOptions}>
//                 Наименование корневого канала
//                 <Field name="test">
//                   {(props: FieldProps) => (
//                     <UnderlineText
//                       width="100%"
//                       name="test"
//                       className={classNames(s.defaultInput, s.title)}
//                       onChange={props.field.onChange}
//                     />
//                   )}
//                 </Field>
//               </span>
//             </li>
//             <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
//               <span className={s.filterOptions}>
//                 Рабочая длина, мм
//                 <Field name="test">
//                   {(props: FieldProps) => (
//                     <UnderlineText
//                       width="100%"
//                       name="test"
//                       className={classNames(s.defaultInput, s.title)}
//                       onChange={props.field.onChange}
//                     />
//                   )}
//                 </Field>
//               </span>
//             </li>
//             <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
//               <span className={s.filterOptions}>
//                 Наименование системы эндодонтического инструментария, размер
//                 финального инструмента по ISO
//                 <Field name="test">
//                   {(props: FieldProps) => (
//                     <UnderlineText
//                       width="100%"
//                       name="test"
//                       className={classNames(s.defaultInput, s.title)}
//                       onChange={props.field.onChange}
//                     />
//                   )}
//                 </Field>
//               </span>
//             </li>
//             <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
//               <div className={s.verticalGap}>
//                 {' '}
//                 Рентген контроль после{' '}
//                 <span className={s.title}>временного пломбирования:</span>
//               </div>
//               <FormGroup className={s.checkboxes}>
//                 <Grid container className={s.verticalGap}>
//                   <span className={s.filterOptions}>
//                     видна тень рентгеноконтрастного пломбировочного материала по
//                     всей длине канала зуба
//                     <Field name="test">
//                       {(props: FieldProps) => (
//                         <SelectField
//                           className={classNames(s.optionInfo, s.horizontalGap)}
//                           selectNavigate
//                           selectOptions={[
//                             { value: -1, label: 'доходя до апекса' },
//                             { value: 1, label: 'не доходя до апекса,' },
//                           ]}
//                           {...props}
//                         >
//                           {[
//                             { value: -1, label: 'доходя до апекса' },
//                             { value: 1, label: 'не доходя до апекса,' },
//                           ].map(({ label, value: link }) => (
//                             <MenuItem
//                               key={link}
//                               value={link}
//                               className="select-link"
//                             >
//                               {label}
//                             </MenuItem>
//                           ))}
//                         </SelectField>
//                       )}
//                     </Field>
//                     <Field name="test">
//                       {(props: FieldProps) => (
//                         <UnderlineText
//                           width="10px"
//                           name="test"
//                           className={classNames(s.defaultInput, s.title)}
//                           onChange={props.field.onChange}
//                         />
//                       )}
//                     </Field>
//                     мм,
//                   </span>
//                 </Grid>
//                 <Grid container className={s.verticalGap}>
//                   <span className={s.filterOptions}>
//                     распределение материала по всей длине
//                     <Field name="test">
//                       {(props: FieldProps) => (
//                         <SelectField
//                           className={classNames(s.optionInfo, s.horizontalGap)}
//                           selectNavigate
//                           selectOptions={[
//                             { value: -1, label: 'Равномерное' },
//                             { value: 1, label: 'Не равномерное' },
//                           ]}
//                           {...props}
//                         >
//                           {[
//                             { value: -1, label: 'Равномерное' },
//                             { value: 1, label: 'Не равномерное' },
//                           ].map(({ label, value: link }) => (
//                             <MenuItem
//                               key={link}
//                               value={link}
//                               className="select-link"
//                             >
//                               {label}
//                             </MenuItem>
//                           ))}
//                         </SelectField>
//                       )}
//                     </Field>
//                   </span>
//                 </Grid>
//                 <Grid container className={s.verticalGap}>
//                   <span className={s.filterOptions}>
//                     выход материала за пределы корневого канала
//                     <Field name="test">
//                       {(props: FieldProps) => (
//                         <SelectField
//                           className={classNames(s.optionInfo, s.horizontalGap)}
//                           selectNavigate
//                           selectOptions={[
//                             { value: -1, label: 'Не визуализируется' },
//                             { value: 1, label: 'Визуализируется' },
//                           ]}
//                           {...props}
//                         >
//                           {[
//                             { value: -1, label: 'Не визуализируется' },
//                             { value: 1, label: 'Визуализируется' },
//                           ].map(({ label, value: link }) => (
//                             <MenuItem
//                               key={link}
//                               value={link}
//                               className="select-link"
//                             >
//                               {label}
//                             </MenuItem>
//                           ))}
//                         </SelectField>
//                       )}
//                     </Field>
//                   </span>
//                 </Grid>
//               </FormGroup>
//             </li>
//           </ul>
//           <div className={s.verticalGap}>
//             <Field name="test">
//               {(props: FieldProps) => (
//                 <UnderlineText
//                   width="100%"
//                   name="test"
//                   className={classNames(s.defaultInput, s.title, s.verticalGap)}
//                   onChange={props.field.onChange}
//                 />
//               )}
//             </Field>
//           </div>
//           <ul className={s.ul}>
//             <li className={classNames(s.verticalGap, s.nameDisease, s.li)}>
//               <div className={s.verticalGap}>
//                 {' '}
//                 Рентген контроль после{' '}
//                 <span className={s.title}>постоянного пломбирования:</span>
//               </div>
//               <FormGroup className={s.checkboxes}>
//                 <Grid container className={s.verticalGap}>
//                   <span className={s.filterOptions}>
//                     видна тень рентгеноконтрастного пломбировочного материала по
//                     всей длине канала зуба
//                     <Field name="test">
//                       {(props: FieldProps) => (
//                         <SelectField
//                           className={classNames(s.optionInfo, s.horizontalGap)}
//                           selectNavigate
//                           selectOptions={[
//                             { value: -1, label: 'доходя до апекса' },
//                             { value: 1, label: 'не доходя до апекса,' },
//                           ]}
//                           {...props}
//                         >
//                           {[
//                             { value: -1, label: 'доходя до апекса' },
//                             { value: 1, label: 'не доходя до апекса,' },
//                           ].map(({ label, value: link }) => (
//                             <MenuItem
//                               key={link}
//                               value={link}
//                               className="select-link"
//                             >
//                               {label}
//                             </MenuItem>
//                           ))}
//                         </SelectField>
//                       )}
//                     </Field>
//                     <Field name="test">
//                       {(props: FieldProps) => (
//                         <UnderlineText
//                           width="10px"
//                           name="test"
//                           className={classNames(s.defaultInput, s.title)}
//                           onChange={props.field.onChange}
//                         />
//                       )}
//                     </Field>
//                     мм,
//                   </span>
//                 </Grid>
//                 <Grid container className={s.verticalGap}>
//                   <span className={s.filterOptions}>
//                     распределение материала по всей длине
//                     <Field name="test">
//                       {(props: FieldProps) => (
//                         <SelectField
//                           className={classNames(s.optionInfo, s.horizontalGap)}
//                           selectNavigate
//                           selectOptions={[
//                             { value: -1, label: 'Равномерное' },
//                             { value: 1, label: 'Не равномерное' },
//                           ]}
//                           {...props}
//                         >
//                           {[
//                             { value: -1, label: 'Равномерное' },
//                             { value: 1, label: 'Не равномерное' },
//                           ].map(({ label, value: link }) => (
//                             <MenuItem
//                               key={link}
//                               value={link}
//                               className="select-link"
//                             >
//                               {label}
//                             </MenuItem>
//                           ))}
//                         </SelectField>
//                       )}
//                     </Field>
//                   </span>
//                 </Grid>
//                 <Grid container className={s.verticalGap}>
//                   <span className={s.filterOptions}>
//                     выход материала за пределы корневого канала
//                     <Field name="test">
//                       {(props: FieldProps) => (
//                         <SelectField
//                           className={classNames(s.optionInfo, s.horizontalGap)}
//                           selectNavigate
//                           selectOptions={[
//                             { value: -1, label: 'Не визуализируется' },
//                             { value: 1, label: 'Визуализируется' },
//                           ]}
//                           {...props}
//                         >
//                           {[
//                             { value: -1, label: 'Не визуализируется' },
//                             { value: 1, label: 'Визуализируется' },
//                           ].map(({ label, value: link }) => (
//                             <MenuItem
//                               key={link}
//                               value={link}
//                               className="select-link"
//                             >
//                               {label}
//                             </MenuItem>
//                           ))}
//                         </SelectField>
//                       )}
//                     </Field>
//                   </span>
//                 </Grid>
//               </FormGroup>
//             </li>
//           </ul>
//           <Field name="test">
//             {(props: FieldProps) => (
//               <UnderlineText
//                 width="100%"
//                 name="test"
//                 className={classNames(s.defaultInput, s.title)}
//                 onChange={props.field.onChange}
//               />
//             )}
//           </Field>
//         </>
//       )}
//     </div>
//   );
// }

export function CreatingTemplate() {
  const { toggleVisibility, handleTemplates, onToggleVisibility } =
    useDraggableSlice();

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>,
  ) => {
    console.log('values', values);
    resetForm();
  };

  useEffect(() => {
    handleTemplates([
      {
        id: '2',
        content: [
          {
            id: '1',
            lineContent: [
              {
                id: 1,
                template: <>test</>,
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  return (
    <Formik initialValues={{}} onSubmit={handleSubmit}>
      {() => (
        <Form className={s.root}>
          <BackButton title="" />

          <DraggableList />

          <div className={s.createTemplateBlock}>
            {toggleVisibility && (
              <div className={s.createTemplatePanel}>
                <div className={s.text}>Текст</div>
                <div className={s.textBold}>Выделенный текст</div>
                <div className={s.textList}>
                  <li>Текст</li>
                </div>
                <div className={s.dropdown}>Дропдаун</div>
                <div className={s.textList}>Чекбокс</div>
                <div className={s.textList}>Радиобатон</div>
                <div className={s.textList}>DD/MM/YYYY</div>
                <div className={s.textList}>Пустое место</div>
              </div>
            )}
            <button
              type="button"
              onClick={() => onToggleVisibility(!toggleVisibility)}
              className={classNames(s.toggleVisibility, {
                [s.active]: toggleVisibility,
              })}
            >
              +
            </button>
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
    </Formik>
  );
}
