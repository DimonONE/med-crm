import { useState } from 'react';
import classNames from 'classnames';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { NavLink } from 'react-router-dom';
import { object } from 'yup';
import { PATH_PAGE } from '~shared/lib/react-router';
import { Button } from '~shared/ui/button';
import { FileLoader } from '~shared/ui/file-loader';
import { Modal } from '~shared/ui/modal';
import s from './styles.module.scss';

type Props = {
  status: 'shared' | 'move' | undefined
};

export function PatientsFilesForm({ status }: Props) {
  const [isOpen, setOpen] = useState(false);

  const initialValues = {};

  const onSubmit = async (
    values: {},
    { setSubmitting, resetForm }: FormikHelpers<{}>,
  ) => {
    try {
      console.log(values);
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={object().shape({

      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={classNames(s.container, 'full-width')}>
          <div className={s.navBar}>
            <NavLink className={classNames(s.navigate, { [s.active]: status === 'shared' })}
              to={PATH_PAGE.patients.files('shared')} >Общие файлы</NavLink>
            <NavLink className={classNames(s.navigate, { [s.active]: status === 'move' })} to={PATH_PAGE.patients.files('move')} >Файлы приемов</NavLink>
          </div>

          {
            status === 'shared'
              ? <>
                {[1, 2, 3].map((key) => (
                  <div key={key} className={s.card}>
                    <span className={s.date}>23.07.2023</span>
                    <span className={s.notes}>Уважаемая медсестра в широких кругах</span>
                    <div className={s.loadFails}>
                      <Field
                        name="files"
                      >{({ form, meta }: FieldProps) =>
                        <FileLoader
                          id="button-load-file"
                          title='Загрузить'
                          filesData={meta.value}
                          onChange={(files) => form.setFieldValue('files', files)}
                          onDelete={() => undefined}
                        />}</Field>
                    </div>
                  </div>
                ))}

                <div className='form-textarea-label'>Заметка</div>
                <Field
                  name="notice"
                  className={classNames(s.comment, 'form-textarea')}
                  type="text"
                  placeholder="Заметка"
                  component="textarea"
                />
                <button type='button' className={s.downloadButton}>
                  Загрузить
                </button>

                <div>
                  <Button
                    className={classNames(s.submit, 'form-submit')}
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Сохранить
                  </Button>
                </div>
              </>
              : <>
                {[1, 2, 3].map((key) => (
                  <div key={key} className={s.card}>
                    <span className={s.date}>Терапия  |  Ирина Ивановна Хакамада </span>
                    <div className={s.date}><b>Жалоба:</b> <span className={s.complaint}>Боль в верхнем правом зубе под углом гауса блабла</span> </div>
                    <span className={s.dateTime}>14:30 - 14:50    |    23.07.2023  Четверг  |  +2 файла  </span>
                    <div><b>Комментарий:</b> <span className={s.notes}> Пломбирование фурмидонтной жидкостью 4\5 пульпита блабла</span></div>

                    <div className={s.loadFails}>
                      <Field
                        name="files"
                      >{({ form, meta }: FieldProps) =>
                        <FileLoader
                          id="button-load-file"
                          title='Загрузить'
                          filesData={meta.value}
                          onChange={(files) => form.setFieldValue('files', files)}
                          onDelete={() => undefined}
                        />}</Field>
                    </div>
                  </div>
                ))}
              </>
          }

          <Modal
            isOpen={isOpen}
            onSuccess={() => setOpen(false)}
            onClose={() => setOpen(false)}
            type='warn-info' >
            <div>
              Удалить файл?
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
}
