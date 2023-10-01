import classNames from 'classnames';
import ArrowRightICO from '~shared/svg/arrowRight.svg';
import { ItemContainer } from '~shared/ui/item-container';
import { Sidebar } from '~shared/ui/sidebar';
import s from './styles.module.scss';

type Props = {
  rootUrl: string
  selectId: string | undefined
};

export function SidebarItemList({ rootUrl, selectId }: Props) {
  const items = [
    { id: '1', title: 'Арноль Качер Шварценегерович', subTitle: 12 },
    { id: '2', title: 'test', subTitle: 12 },
    { id: '3', title: 'test', subTitle: 12 },
  ];

  return (
    <Sidebar>
      {
        items.map(({ id, title, subTitle }) => (
          <ItemContainer link={`${rootUrl}/${id}`} className={classNames(s.item, { [s.active]: id === selectId })} >
            <div className={s.container}>
              <div className={s.title}>{title}</div>
              <span className={s.subTitle}>Код клиники: {subTitle}</span>
            </div>
            <div className={s.arrow}>
              <ArrowRightICO />
            </div>
          </ItemContainer>
        ))
      }
    </Sidebar>
  );
}
