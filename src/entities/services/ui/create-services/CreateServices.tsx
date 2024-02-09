
import classNames from 'classnames';
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { Button } from '~shared/ui/button';
import { TextField } from '~shared/ui/text-field';
import { useCreateServices } from '../../api/servicesApi';
import { addService } from '../../model/servicesModel';
import s from './styles.module.scss';

export function CreateServices() {
  const { mutate } = useCreateServices();

  const onSubmit = async (
    values: Api.CreateServicePriceDtoDto,
    { setSubmitting }: FormikHelpers<Api.CreateServicePriceDtoDto>,
  ) => {
    mutate({ ...values, price: Number(values.price) }, {
      onSuccess: async (response) => {
        addService(response);
        toast('Success!', { type: 'success' });
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  return (
    <Formik
      initialValues={{
        price: 0,
        name: '',
      }}
      validationSchema={object().shape({
        price: string().required(),
        name: string().required(),
      })}
      onSubmit={onSubmit}
    >
      {() => (
        <Form >
          <div className={s.addServices}>
            <div className={s.label}>Добавить услуги</div>

            <div className='d-flex'>
              <Field
                name="price"
              >
                {(props: FieldProps) =>
                  <TextField
                    {...props}
                    className={classNames(s.servicesPrice, 'form-input')}
                    placeholder='Цена ₽'
                    type="text"
                  />}
              </Field>

              <Field
                name="name"
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
  );
}
