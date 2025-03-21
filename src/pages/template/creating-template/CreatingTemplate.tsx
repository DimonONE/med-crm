import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  DraggableList,
  useCreateUpdateBodyBlock,
  useDraggableSlice,
  useTemplateGetOne,
  Template,
} from '~features/draggable-list';
import { HeaderTemplate } from '~features/header-template';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { BackButton } from '~shared/ui/back-button';
import { Button } from '~shared/ui/button';
import { DatePicker } from '~shared/ui/date-picker';
import s from './styles.module.scss';

type Params = {
  id: string;
  subTemplateId: string;
};

export function CreatingTemplate() {
  const { id: templateId, subTemplateId } = useParams<Params>();
  const { refetch } = useTemplateGetOne(templateId);
  const navigate = useNavigate();

  const { mutate } = useCreateUpdateBodyBlock();
  const {
    templates,
    currentBlockInfo,
    toggleVisibility,
    handleTemplates,
    onToggleVisibility,
    addCurrentBlock,
  } = useDraggableSlice();

  const handleSubmit = async (
    _values: {},
    { resetForm }: FormikHelpers<any>,
  ) => {
    resetForm();
  };

  const onSave = (isClose = false) => {
    const template = {
      ...templates[0],
      lineBlocks: templates[0].lineBlocks.map((lineBlock) => ({
        ...lineBlock,
        blockInfo: lineBlock.blockInfo.filter(
          ({ status }) => status !== 'default',
        ),
      })),
    };

    const templateData = {
      ...template,
      subTemplateId: Number(subTemplateId),
    };

    mutate(templateData, {
      onSuccess: async () => {
        toast('Success!', { type: 'success' });

        if (isClose) {
          handleTemplates([
            {
              name: '',
              positionId: 0,
              subTemplateId: 0,
              lineBlocks: [
                {
                  positionId: 0,
                  bodyBlockId: 0,
                  blockInfo: [],
                },
              ],
            },
          ]);
          navigate(-1);
          return;
        }

        const { data: dataTemplate } = await refetch();
        const subTemplate = dataTemplate?.subTemplates.find(
          (sub) => sub.id.toString() === subTemplateId,
        );

        const selectTemplate = subTemplate?.bodyBlocks?.reduce(
          (max, block) => (block.id > (max?.id ?? -Infinity) ? block : max),
          null as Api.BodyBlockEntityDto | null,
        );

        if (selectTemplate) {
          handleTemplates([
            {
              ...selectTemplate,
              lineBlocks: selectTemplate.lineBlocks.map(
                ({ blocks, ...lineBlock }) => ({
                  ...lineBlock,
                  blockInfo: blocks,
                }),
              ) as any,
            },
          ] as Template[]);
        }
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  return (
    <>
      <HeaderTemplate>
        <div className={s.submitBlock}>
          <Button className={s.submit} onClick={() => onSave(true)}>
            Сохранить и закрыть
          </Button>

          <Button
            type="submit"
            color="primary"
            onClick={() => onSave()}
            className={classNames(s.submit, s.save)}
          >
            Сохранить
          </Button>
        </div>
      </HeaderTemplate>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {() => (
          <Form className={s.root}>
            <BackButton title="" />

            <DraggableList />

            <div className={s.createTemplateBlock}>
              {toggleVisibility && (
                <div className={s.createTemplatePanel}>
                  <button
                    type="button"
                    onClick={() => addCurrentBlock('TEXT')}
                    className={s.text}
                  >
                    Текст
                  </button>
                  <button
                    type="button"
                    onClick={() => addCurrentBlock('BOLD_TEXT')}
                    className={s.textBold}
                  >
                    Выделенный текст
                  </button>
                  <button
                    type="button"
                    onClick={() => addCurrentBlock('POINT_TEXT')}
                    className={s.textList}
                  >
                    <li>Текст</li>
                  </button>

                  <button
                    type="button"
                    onClick={() => addCurrentBlock('DROPDOWN')}
                    className={s.dropdown}
                  >
                    Дропдаун
                  </button>
                  <button
                    type="button"
                    onClick={() => addCurrentBlock('CHECK_BOX')}
                    className={s.checkbox}
                  >
                    <span className={s.checked} /> Чекбокс
                  </button>
                  <button
                    type="button"
                    onClick={() => addCurrentBlock('RADIO_BOX')}
                    className={s.radioButton}
                  >
                    {' '}
                    <span className={s.checked} />
                    Радиобатон
                  </button>
                  <button
                    type="button"
                    onClick={() => addCurrentBlock('DATE')}
                    className={s.textList}
                  >
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
                        '.MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root':
                          {
                            color: '#0E5F8C',
                          },
                      }}
                      value=""
                      onChange={() => false}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => addCurrentBlock('EMPTY')}
                    className={s.empty}
                  >
                    Пустое место
                  </button>
                  <button
                    type="button"
                    onClick={() => addCurrentBlock('WRITE_TEXT')}
                    className={s.handwritten}
                  >
                    +Рукописный заполнения
                  </button>
                </div>
              )}

              {Boolean(currentBlockInfo) && (
                <button
                  type="button"
                  onClick={() => onToggleVisibility(!toggleVisibility)}
                  className={classNames(s.toggleVisibility, {
                    [s.active]: toggleVisibility,
                  })}
                >
                  +
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
