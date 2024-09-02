import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';
import { toast } from 'react-toastify';
import { DraggableList, useCreateUpdateBodyBlock, useDraggableSlice } from '~features/draggable-list';
import { errorHandler } from '~shared/lib/react-query';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { Header } from '~widgets/header';
import s from './styles.module.scss';

export function CreatingTemplate() {
  const { mutate } = useCreateUpdateBodyBlock();
  const { templates, currentBlockInfo, toggleVisibility, onToggleVisibility, addCurrentBlock } = useDraggableSlice();

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>,
  ) => {
    resetForm();
  };

  const onSave = () => {
    console.log('onSave');

    mutate(templates, {
      onSuccess: async () => {
        toast('Success!', { type: 'success' });
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  return (
    <>
      <Header >
        <div>
          <Button>Сохранить и закрыть</Button>
          <Button onClick={onSave}>Сохранить</Button>
        </div>
      </Header>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {() => (
          <Form className={s.root}>
            <BackButton title="" />

            <DraggableList />

            <div className={s.createTemplateBlock}>
              {toggleVisibility && (
                <div className={s.createTemplatePanel}>
                  <button type='button' onClick={() => addCurrentBlock('text')} className={s.text}>Текст</button>
                  <button type='button' onClick={() => addCurrentBlock('bold')} className={s.textBold}>Выделенный текст</button>
                  <button type='button' onClick={() => addCurrentBlock('list')} className={s.textList}><li>Текст</li></button>

                  <button type='button' onClick={() => addCurrentBlock('dropdown')} className={s.dropdown}>Дропдаун</button>
                  <button type='button' onClick={() => addCurrentBlock('checkBox')} className={s.checkbox}><span className={s.checked} /> Чекбокс</button>
                  <button type='button' onClick={() => addCurrentBlock('radioButton')} className={s.radioButton}> <span className={s.checked} />Радиобатон</button>
                  <button type='button' onClick={() => addCurrentBlock('date')} className={s.textList}>
                    <DatePicker
                      sx={{
                        '.MuiInputBase-root.MuiOutlinedInput-root': {
                          width: '150px',
                          height: '42px',
                          padding: '0 20px',
                          maxWidth: 'none',
                          background: '#CBECFF',
                          borderRadius: '10px',
                          border: '1px solid #0E5F8C',
                          fontSize: '14px',
                          color: '#0E5F8C',
                        },
                        '.MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root': {
                          color: '#0E5F8C',
                        },
                      }}
                      value=""
                      onChange={() => false} />
                  </button>
                  <button type='button' onClick={() => addCurrentBlock('empty')} className={s.empty}>Пустое место</button>
                  <button type='button' onClick={() => addCurrentBlock('handwritten')} className={s.handwritten}>+Рукописный заполнения</button>
                </div>
              )}

              {
                Boolean(currentBlockInfo) && (
                  <button
                    type="button"
                    onClick={() => onToggleVisibility(!toggleVisibility)}
                    className={classNames(s.toggleVisibility, {
                      [s.active]: toggleVisibility,
                    })}
                  >
                    +
                  </button>
                )
              }
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
    </>
  );
}
