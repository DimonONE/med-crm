import { ItemContainer } from '~shared/ui/item-container';
import { TitleItem } from '~shared/ui/title-item';
import s from './styles.module.scss';

export function AllClinic() {
  const items = [{ row: ['03.02.2021', 'Сывтывкар', 'ул.Пушкина 23\\77', '+7 095 518 58 36', 'Осипенко Владимир Николаевич', 'до 12.12.2023'] }];
  const titles = [
    {
      title: 'ДАТА РЕГ.',
      onFilter: () => false,
    },
    {
      title: 'ГОРОД',
      onFilter: () => false,
    },
    {
      title: 'АДРЕС',
    },
    {
      title: 'ТЕЛЕФОН',
    },
    {
      title: 'ГЛАВВРАЧ',
    },
    {
      title: 'ТАРИФ',
      onFilter: () => false,
    },
    {
      title: 'СТАТУС',
    },
  ];

  return (
    <div className={s.table}>
      <div className={s.header}>
        {titles.map(({ title, onFilter }) => (
          <TitleItem key={title} title={title} onFilter={onFilter} />
        ))}
      </div>
      {items.map(({ row }) => (
        <ItemContainer className={s.itemContainer}>
          {row.map((text) => (
            <span>
              {text}
            </span>
          ))}
        </ItemContainer>
      ))}
    </div>
  );
}
