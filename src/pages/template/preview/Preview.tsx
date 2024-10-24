/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Template, TemplateStatus, useCreateSubTemplate, useDeleteSubTemplate, useDeleteTemplate, useDraggableSlice, useTemplateGetOne } from '~features/draggable-list';
import { HeaderTemplate } from '~features/header-template';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import { BackButton } from '~shared/ui/back-button';
import { DropDownMenu } from '~shared/ui/drop-down-menu';
import { TechInfo } from '~shared/ui/tech-info';
import { ChangeBlock } from '~widgets/reception-table';
import s from './styles.module.scss';

type Params = {
  id: string;
  subTemplateId: string;
};

type IProps = {
  template: Api.SubTemplateEntityDto
  onCreateReception: () => void
  onDeleteSubTemplate: (id: number) => void
  onDeleteBlockTemplate: (templateId: number, id: number) => void
};

function Reception(props: IProps) {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const { template, onCreateReception, onDeleteSubTemplate, onDeleteBlockTemplate } = props;
  const { handleTemplates } = useDraggableSlice();

  const onEdit = (id?: number) => {
    const selectTemplate = template.bodyBlocks.find(({ id: templateId }) => templateId === id);

    if (!selectTemplate) return;

    const templates = {
      ...selectTemplate,
      lineBlocks: selectTemplate.lineBlocks.map(({ blocks, ...lineBlock }) => ({
        ...lineBlock,
        blockInfo: blocks,
      })),
    };


    handleTemplates([templates as any] as Template[]);
    navigate(PATH_PAGE.template.create(template.id.toString()));
  };

  const menuItemsReception = (handleCloseMenu: () => void) => <>
    <MenuItem onClick={() => {
      onCreateReception();
      handleCloseMenu();
    }}>Создать прием</MenuItem>
    <MenuItem onClick={() => false}>Редактировать</MenuItem>
    <MenuItem disabled onClick={() => false}>Вставить</MenuItem>
    <MenuItem disabled onClick={() => false}>Копировать</MenuItem>
    <MenuItem onClick={() => onDeleteSubTemplate(template.id)}>Удалить прием</MenuItem>
  </>;

  const menuItemsBlock = (handleCloseMenu: () => void, id?: number) => (<>
    <MenuItem onClick={() => {
      navigate(PATH_PAGE.template.create(template.id.toString()));
      handleCloseMenu();
    }}>Создать блок</MenuItem>
    <MenuItem disabled onClick={() => false}>Копировать</MenuItem>
    <MenuItem disabled onClick={() => false}>Вставить</MenuItem>
    <MenuItem onClick={() => {
      onEdit(id);
      handleCloseMenu();
    }}>Редактировать</MenuItem>
    <MenuItem onClick={() => id && onDeleteBlockTemplate(template.id, id)}>Удалить</MenuItem>
  </>);

  return (<>
    <DropDownMenu menuItems={menuItemsReception}>
      <button type='button' className={classNames(s.draggable, s.reception)} onClick={() => setOpen(prev => !prev)}>
        <div className={s.headBlock}>
          {template.name}
        </div>
        <div className={classNames(s.arrowBottom, { [s.active]: isOpen })}>
          <ArrowBottomICO />
        </div>
      </button>
    </DropDownMenu>
    {
      isOpen && (
        <div>
          {template.bodyBlocks.map((bodyBlock) => (
            <div key={bodyBlock.id} className={classNames(s.draggable)}>
              <div className={s.headBlock}>{bodyBlock.name}</div>
              <div className={classNames(s.blockWithPadding, s.lineBlock)}>
                {
                  bodyBlock.lineBlocks.map((lineBlock) => (
                    <div key={lineBlock.id} className={s.itemBlock}>
                      {lineBlock.blocks.map((block) => (
                        <div key={block.id}>
                          <ChangeBlock
                            {...block}
                            key={block.lineId}
                            type='preview'
                            subTemplateId={bodyBlock.subTemplateId}
                            bodyBlockId={lineBlock.id}
                            status={block.status as TemplateStatus}
                          />
                        </div>))}
                    </div>
                  ))
                }
              </div>
              <DropDownMenu menuItems={(handleCloseMenu) => menuItemsBlock(handleCloseMenu, bodyBlock.id)}>
                <div className={s.arrowBottom}>
                  <ArrowBottomICO />
                </div>
              </DropDownMenu>
            </div>
          ))}

          {
            !template.bodyBlocks.length ? (
              <div className={s.draggable}>
                <DropDownMenu menuItems={menuItemsBlock}>
                  <div className={s.arrowBottom}>
                    <ArrowBottomICO />
                  </div>
                </DropDownMenu>
              </div>
            ) : null
          }

        </div>
      )
    }
  </>
  );
}

export function Preview() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useTemplateGetOne(params.subTemplateId as string);
  const { mutate } = useCreateSubTemplate();
  const { mutate: deleteSubTemplate } = useDeleteSubTemplate();
  const { mutate: deleteTemplate } = useDeleteTemplate();


  const [toggle, setToggle] = useState(false);
  const [subTemplate, setSubTemplate] = useState<Api.SubTemplateEntityDto[]>([]);

  const createReception = (reception: number) => {
    const createData = {
      name: `Прием №${reception}`,
      templateId: Number(params.subTemplateId),
    };

    mutate(createData, {
      onSuccess: () => {
        refetch();
      },

      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  const onDeleteTemplate = (templateId: number) => {
    deleteTemplate(templateId, {
      onSuccess: () => {
        toast('Success!', { type: 'success' });
        navigate(-1);
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  const onDeleteSubTemplate = (id: number) => {
    deleteSubTemplate(id, {
      onSuccess: () => {
        toast('Success!', { type: 'success' });
      },

      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  const onDeleteBlockTemplate = (templateId: number, id: number) => {
    const deleteBlock = subTemplate.map((block) => block.id === templateId
      ? {
        ...block,
        bodyBlocks: block.bodyBlocks.filter((bodyBlock) => bodyBlock.id !== id),
      }
      : block);

    setSubTemplate(deleteBlock);
  };


  useEffect(() => {
    if (!isLoading && !data?.subTemplates.length) {
      createReception(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);


  useEffect(() => {
    const subTemplates = data?.subTemplates.sort((a, b) => a.id - b.id) ?? [];
    setSubTemplate(subTemplates);
  }, [data]);

  if (!data?.subTemplates) {
    navigate(-1);
    return null;
  }

  return (
    <>
      <HeaderTemplate />
      <div className={s.wrapper}>
        <BackButton
          title=''
          link={PATH_PAGE.template.root}
          className={s.backButton}
        />

        <div
          className={s.draggable}
        >
          <div className={s.headBlock}>
            {data.category}. {data.name}
          </div>
        </div>

        <TechInfo techInfo={{
          info: data.techInfo,
        }} />

        {
          subTemplate.map((template) => (
            <div key={template.id}>
              <Reception
                template={template}
                onCreateReception={() => createReception(data.subTemplates.length + 1)}
                onDeleteSubTemplate={(id) => onDeleteSubTemplate(id)}
                onDeleteBlockTemplate={onDeleteBlockTemplate}
              />
              <div className={classNames(s.draggable, s.reception)}>
                <div className={s.headBlock}>
                  Краткое резюме посещения
                </div>
              </div>
            </div>
          ))
        }

        <div className={s.toggleBlock}>
          <Menu
            open={toggle}
            onClose={() => setToggle(false)}
            style={{ top: -50, left: 30 }}
          >
            <MenuItem onClick={() => false}>Копировать</MenuItem>
            <MenuItem onClick={() => false}>Редактировать</MenuItem>
            <MenuItem onClick={() => onDeleteTemplate(Number(params.subTemplateId))}>Удалить</MenuItem>
          </Menu>

          <button
            type="button"
            onClick={() => setToggle(true)}
            className={classNames(s.toggle, {
              [s.active]: toggle,
            })}
          >
            +
          </button>
        </div>
      </div >
    </>
  );
}
