import classNames from 'classnames';
import { SearchPersonnel } from '~features/personnel';
import ArrowRightICO from '~shared/svg/arrowRight.svg';
import { ItemContainer } from '~shared/ui/item-container';
import { Sidebar } from '~shared/ui/sidebar';
import s from './styles.module.scss';

type ItemList = {
  id: string | number
  title: string
  subTitle: number
};

type Props = {
  rootUrl: string
  selectId: string | undefined
  items: ItemList[]
};

export function SidebarItemList({ rootUrl, selectId, items }: Props) {

  return (
    <Sidebar>
      <SearchPersonnel />
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
