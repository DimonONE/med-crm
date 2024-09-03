import { useMemo } from 'react';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTemplateGetOne } from '~features/draggable-list';
import { PATH_PAGE } from '~shared/lib/react-router';
import { CardsNavigate, ServicesICO } from '~shared/ui/cards-navigate';
import s from './styles.module.scss';

type Props = {
  id: string
};

export enum ReceptionTableEnum {
  ALL = '',
  PERIODONTICS = '4',
  THERAPY = '5',
  SURGERY = '6',
  ORTHOPEDICS = '7',
  OTHER = '1',
}

export function Template({ id }: Props) {
  const { data } = useTemplateGetOne(id);
  const navigate = useNavigate();

  const cards = useMemo(() => {
    if (!data?.subTemplates?.length) return [];

    return data.subTemplates.map(({ id: templateId, name }) => ({
      id: templateId,
      title: name,
      ico: <ServicesICO />,
      link: PATH_PAGE.template.preview(templateId.toString()),
    }));
  }, [data]);


  const onCopy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    alert('onCopy');
  };
  return (
    <CardsNavigate
      className={s.root}
      cards={cards}
      onCopy={onCopy}
      onClick={({ link }) => navigate(link)}
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