import classNames from 'classnames';
import { Field, Form, Formik } from 'formik';
import { object } from 'yup';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import s from './styles.module.scss';

export function ServicesPage() {

  return (
    <div className={s.root}>
      <BackButton title='Услуги' className={s.backButton} />

      <div className={s.container}>
        <Formik
          initialValues={{
            servicesPrice: '',
            servicesName: '',
          }}
          validationSchema={object().shape({

          })}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onSubmit={() => {
            // mutate(values, {
            //   onSuccess: (response) => {
            //     sessionModel.addUser(response.data.user);
            //   },
            //   onSettled: () => {
            //     setSubmitting(false);
            //   },
            // });
          }}
        >
          {() => (
            <Form >
              <div className={s.addServices}>
                <div className={s.label}>Добавить услуги</div>

                <div className='d-flex'>
                  <Field
                    name="servicesPrice"
                    className={classNames(s.servicesPrice, 'form-input')}
                    placeholder='Цена ₽'
                  />
                  <Field
                    name="servicesName"
                    className={classNames(s.servicesName, 'form-input')}
                    placeholder='Название услуги'
                  />
                </div>
                <Button
                  className={classNames(s.adding, 'form-submit')}
                  type="submit"
                  color="primary"
                >
                  Добавить
                </Button>
              </div>

            </Form>
          )}
        </Formik>

        <div className={s.allServices}>
          <div className={s.label}>Все услуги</div>

          <div className={s.servicesList}>
            <div className={s.servicesItem}>
              <span className={s.price}>₽ 40</span>
              <span className={s.info}>Пломбирование</span>
              <Button color='primary-reverse' onClick={() => false}>
                <CloseICO />
              </Button>
            </div>
            <div className={s.servicesItem}>
              <span className={s.price}>₽ 40</span>
              <span className={s.info}>Пломбирование</span>
              <Button color='primary-reverse' onClick={() => false}>
                <CloseICO />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
