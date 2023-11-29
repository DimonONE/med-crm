import { useState } from 'react';
import classNames from 'classnames';
import { ErrorMessage, Field, useField } from 'formik';
import { toast } from 'react-toastify';
import { HttpResponse } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { Button } from '~shared/ui/button';
import { useNewPassword } from '../../api/superAdminApi';
import s from './styles.module.scss';

type Props = {
  userId: string
};

export function UpdatePasswordForm({ userId }: Props) {
  const { mutate } = useNewPassword();
  const [isChangePassword, setChangePassword] = useState(false);

  const form = useField({ name: 'password' });

  const onSubmit = async () => {
    mutate({ password: form[0].value, userId }, {
      onSuccess: ({ data }) => {
        if (data.message === 'success') {
          toast('Success!', { type: 'success' });
          setChangePassword(false);
        }
      },

      onError: (error) => {
        toast(errorHandler(error as HttpResponse<any, any>), { type: 'error' });
      },
    });
  };

  return (
    <div>
      {
        !isChangePassword && (
          <Button
            className={classNames('form-submit')}
            color="secondary"
            onClick={() => setChangePassword(true)}>
            Изменить пароль
          </Button>
        )
      }
      {isChangePassword &&
        <div className={s.editPassword}>
          <fieldset>
            <div className='error-message'>
              <ErrorMessage name="password" />
            </div>
            <Field
              name="password"
              className='form-input'
              type="text"
              placeholder="Пароль"
            />
          </fieldset>
          <Button
            className={classNames(s.submitPassword, 'form-submit')}
            color="primary"
            type='submit'
            onClick={onSubmit}>
            Применить
          </Button>
        </div>
      }
    </div>
  );
}
