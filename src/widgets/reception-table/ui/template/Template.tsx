import { memo, useCallback, useMemo } from 'react';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRoleUser } from '~entities/session';
import { useDeleteTemplate, useTemplateGetAll } from '~features/draggable-list';
import { errorHandler } from '~shared/lib/react-query';
import { PATH_PAGE } from '~shared/lib/react-router';
import { CardsNavigate, ServicesICO, TCardEvent } from '~shared/ui/cards-navigate';
import { ReceptionTableEnum, ReversedReceptionTableEnum } from '~shared/utils';
import s from './styles.module.scss';

type Props = {
  id: string
  onNavigate?: (templateId: number) => void
};

const MenuItems = memo(({ templateId, onDeleteTemplate }: any) => (
  <>
    <MenuItem onClick={() => false}>Просмотр</MenuItem>
    <MenuItem onClick={() => false}>Копировать</MenuItem>
    <MenuItem onClick={() => false}>Копировать все</MenuItem>
    <MenuItem onClick={() => false}>Вставить</MenuItem>
    <MenuItem onClick={() => false}>Переименовать</MenuItem>
    <MenuItem onClick={() => onDeleteTemplate(templateId)}>Удалить</MenuItem>
  </>
));

export function Template({ id, onNavigate }: Props) {
  const { data, refetch } = useTemplateGetAll({
    offset: 0,
    limit: 100,
    category: id === ReceptionTableEnum.ALL ? '' : ReversedReceptionTableEnum[id] ?? '',
  });

  const { mutate: deleteTemplate } = useDeleteTemplate();
  const navigate = useNavigate();
  const { checkUserRole } = useRoleUser();

  const isSuperAdmin = checkUserRole('superAdmin');

  const cards = useMemo(() => {
    if (!data?.data.length) return [];

    return data.data.map(({ id: templateId, name }) => ({
      id: templateId as number,
      title: name ?? '',
      ico: <ServicesICO />,
      link: PATH_PAGE.template.preview(id, templateId?.toString() as string),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onCopy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    alert('onCopy');
  };

  const onClick = ({ link, id: templateId }: TCardEvent) => {
    if (checkUserRole('superAdmin')) {
      navigate(link);
      return;
    }

    if (onNavigate) {
      onNavigate(templateId);
    }
  };

  const onDeleteTemplate = useCallback((templateId: number) => {
    deleteTemplate(templateId, {
      onSuccess: () => {
        toast('Success!', { type: 'success' });
        refetch();
      },
      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  }, [deleteTemplate]);

  const renderMenuItems = useCallback(
    (templateId: number) => (
      <MenuItems templateId={templateId} onDeleteTemplate={onDeleteTemplate} />
    ),
    [onDeleteTemplate],
  );

  return (
    <CardsNavigate
      className={s.root}
      cards={cards}
      hasCopy={isSuperAdmin}
      onCopy={onCopy}
      onClick={onClick}
      menuItems={isSuperAdmin ? renderMenuItems : undefined}
    />
  );
}