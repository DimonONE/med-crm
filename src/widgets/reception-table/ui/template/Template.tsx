import { useMemo } from 'react';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRoleUser } from '~entities/session';
import { useTemplateGetAll } from '~features/draggable-list';
import { PATH_PAGE } from '~shared/lib/react-router';
import { CardsNavigate, ServicesICO, TCardEvent } from '~shared/ui/cards-navigate';
import s from './styles.module.scss';

type Props = {
  id: string
};

export enum ReceptionTableEnum {
  ALL = 'all',
  PERIODONTICS = '4',
  THERAPY = '5',
  SURGERY = '6',
  ORTHOPEDICS = '7',
  OTHER = '1',
}

export const ReversedReceptionTableEnum: { [key: string]: string } = {
  '1': 'OTHER',
  '4': 'PERIODONTICS',
  '5': 'Терапия',
  '6': 'SURGERY',
  '7': 'ORTHOPEDICS',
};

export function Template({ id }: Props) {
  const { data } = useTemplateGetAll({
    offset: 0,
    limit: 100,
    category: id === ReceptionTableEnum.ALL ? '' : ReversedReceptionTableEnum[id] ?? '',
  });

  const navigate = useNavigate();
  const { checkUserRole } = useRoleUser();

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

  const onClick = ({ link }: TCardEvent) => {
    if (checkUserRole('superAdmin')) {
      navigate(link);

    }

  };

  return (
    <CardsNavigate
      className={s.root}
      cards={cards}
      onCopy={onCopy}
      onClick={onClick}
      menuItems={<>
        <MenuItem onClick={() => false}>Просмотр</MenuItem>
        <MenuItem onClick={() => false}>Копировать</MenuItem>
        <MenuItem onClick={() => false}>Копировать все</MenuItem>
        <MenuItem onClick={() => false}>Вставить</MenuItem>
        <MenuItem onClick={() => false}>Переименовать</MenuItem>
        <MenuItem onClick={() => false}>Удалить</MenuItem>
      </>}
    />
  );
}