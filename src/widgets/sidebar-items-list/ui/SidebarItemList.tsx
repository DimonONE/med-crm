import { ReactElement } from 'react';
import classNames from 'classnames';
import ArrowRightICO from '~shared/svg/arrowRight.svg';
import { ItemContainer } from '~shared/ui/item-container';
import { Sidebar } from '~shared/ui/sidebar';
import s from './styles.module.scss';

type ItemList = {
  id: string | number
  title: string
  subTitle: string
  link?: string
};

type Props = {
  selectId: string | undefined
  items: ItemList[]
  children?: ReactElement
};

export function SidebarItemList({ selectId, items, children }: Props) {

  return (
    <Sidebar>
      {children}
      {
        items.map(({ id, title, subTitle, link }) => (
          <ItemContainer link={link} className={classNames(s.item, { [s.active]: id === selectId })} >
            <div className={s.container}>
              <div className={s.title}>{title}</div>
              <span className={s.subTitle}>{subTitle}</span>
            </div>
            {
              link && (
                <div className={s.arrow}>
                  <ArrowRightICO />
                </div>
              )
            }
          </ItemContainer>
        ))
      }
    </Sidebar>
  );
}
