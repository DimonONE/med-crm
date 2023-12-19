import React, { ReactElement } from 'react';
import classNames from 'classnames';
import ArrowRightICO from '~shared/svg/arrowRight.svg';
import { ItemContainer } from '~shared/ui/item-container';
import { Sidebar } from '~shared/ui/sidebar';
import s from './styles.module.scss';

type SidebarItemType = {
  id: string
  title: string
  subTitle: string
  link?: string
};

interface SidebarItemListProps {
  children?: ReactElement
  selectId: string | undefined;
  items: SidebarItemType[];
  onScroll?: () => void;
}

export const SidebarItemList = React.forwardRef<HTMLDivElement, SidebarItemListProps>(
  ({ selectId, items, children, onScroll }, ref) => (
    <Sidebar {...{ ref, onScroll }}>
      {children}
      {
        items.map(({ id, title, subTitle, link }) => (
          <ItemContainer key={id} link={link} className={classNames(s.item, { [s.active]: id === selectId })} >
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
  ),
);