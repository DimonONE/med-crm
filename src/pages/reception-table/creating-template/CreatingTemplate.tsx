import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DraggableList, useCreateUpdateBodyBlock, useDraggableSlice } from '~features/draggable-list';
import { errorHandler } from '~shared/lib/react-query';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import { Header } from '~widgets/header';
import s from './styles.module.scss';

type Params = {
  subTemplateId: string
};

export function CreatingTemplate() {
  const { subTemplateId } = useParams<Params>();

  const { mutate } = useCreateUpdateBodyBlock();
  const { templates, currentBlockInfo, toggleVisibility, onToggleVisibility, addCurrentBlock } = useDraggableSlice();

  const handleSubmit = async (
    values: any,
    { resetForm }: FormikHelpers<any>,
  ) => {
    resetForm();
  };

  const onSave = () => {
    const template = {
      ...templates[0],
      lineBlocks: templates[0].lineBlocks.map((lineBlock) => ({
        ...lineBlock,
        blockInfo: lineBlock.blockInfo.filter(({ status }) => status !== 'default'),
      })),
    };

    const templateData = {
      ...template,
      subTemplateId: Number(subTemplateId),
    };

    mutate(templateData, {
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
                  <button type='button' onClick={() => addCurrentBlock('TEXT')} className={s.text}>Текст</button>
                  <button type='button' onClick={() => addCurrentBlock('BOLD_TEXT')} className={s.textBold}>Выделенный текст</button>
                  <button type='button' onClick={() => addCurrentBlock('POINT_TEXT')} className={s.textList}><li>Текст</li></button>

                  <button type='button' onClick={() => addCurrentBlock('DROPDOWN')} className={s.dropdown}>Дропдаун</button>
                  <button type='button' onClick={() => addCurrentBlock('CHECK_BOX')} className={s.checkbox}><span className={s.checked} /> Чекбокс</button>
                  <button type='button' onClick={() => addCurrentBlock('RADIO_BOX')} className={s.radioButton}> <span className={s.checked} />Радиобатон</button>
                  <button type='button' onClick={() => addCurrentBlock('DATE')} className={s.textList}>
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
                  <button type='button' onClick={() => addCurrentBlock('EMPTY')} className={s.empty}>Пустое место</button>
                  <button type='button' onClick={() => addCurrentBlock('WRITE_TEXT')} className={s.handwritten}>+Рукописный заполнения</button>
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
              onClick={onSave}
            >
              Сохранить
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
