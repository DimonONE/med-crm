import { useEffect, useMemo, useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TemplateStatus, useCreateSubTemplate, useTemplateGetOne } from '~features/draggable-list';
import { Api } from '~shared/api/realworld';
import { errorHandler } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import { DropDownMenu } from '~shared/ui/drop-down-menu';
import { ChangeBlock } from '~widgets/reception-table';
import s from './styles.module.scss';

type Params = {
  id: string;
  subTemplateId: string;
};

type IProps = {
  template: Api.SubTemplateEntityDto
  onCreateReception: () => void
};

function Reception(props: IProps) {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const { template, onCreateReception } = props;

  const firstAppointment = template.name.includes('№1');

  const menuItemsReception = (handleCloseMenu: () => void) => firstAppointment
    ? undefined
    : <>
      <MenuItem onClick={() => {
        onCreateReception();
        handleCloseMenu();
      }}>Создать прием</MenuItem>
      <MenuItem onClick={() => false}>Редактировать</MenuItem>
      <MenuItem onClick={() => false}>Вставить</MenuItem>
      <MenuItem onClick={() => false}>Копировать</MenuItem>
      <MenuItem onClick={() => false}>Удалить прием</MenuItem>
    </>;

  const menuItemsBlock = (handleCloseMenu: () => void, id?: number) => (<>
    <MenuItem onClick={() => {
      navigate(PATH_PAGE.template.create(template.id.toString()));
      handleCloseMenu();
    }}>Создать блок</MenuItem>
    <MenuItem onClick={() => false}>Копировать {id}</MenuItem>
    <MenuItem onClick={() => false}>Вставить</MenuItem>
    <MenuItem onClick={() => false}>Редактировать</MenuItem>
    <MenuItem onClick={() => false}>Удалить</MenuItem>
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

function TechInfo({ techInfo }: { techInfo: string }) {
  return (
    <div >
      <p>Приложение к амбулаторной карте:  Номер карты,   Название организации</p>
      <p>Дата приема: Число приема</p>
      <p>ФИО пациента: ФИО  пациента</p>
      <p>ФИО пациента: ФИО  пациента</p>
      <p>{techInfo}</p>
    </div>
  );
}


export function Preview() {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useTemplateGetOne(params.subTemplateId as string);
  const { mutate } = useCreateSubTemplate();

  const subTemplate = useMemo(() => data?.subTemplates.sort((a, b) => a.id - b.id) ?? [], [data]);

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


  useEffect(() => {
    if (!isLoading && !data?.subTemplates.length) {
      createReception(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  if (!data?.subTemplates) {
    navigate(-1);
    return null;
  }

  console.log('subTemplate', subTemplate);


  return (
    <div className={s.wrapper}>
      <div
        className={s.draggable}
      >
        <div className={s.headBlock}>
          {data.category}. {data.name}
        </div>
      </div>
      <div className={s.draggable}>
        <div className={s.headBlock} >
          <TechInfo techInfo={data.techInfo} />
        </div>
      </div>
      {
        subTemplate.map((template) => (
          <div key={template.id}>
            <Reception
              template={template}
              onCreateReception={() => createReception(data.subTemplates.length + 1)}
            />
          </div>
        ))
      }
    </div>
  );
}
