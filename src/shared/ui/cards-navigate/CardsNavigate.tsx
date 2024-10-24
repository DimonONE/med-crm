
import { ReactElement } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { DropDownMenu } from '../drop-down-menu/DropDownMenu';
import s from './styles.module.scss';

export type TCard = {
  id: number
  title: string | JSX.Element
  link: string
  ico?: ReactElement
  notification?: boolean
};

export type TCardEvent = Pick<TCard, 'id' | 'title' | 'link'>;

type TCardsNavigate = {
  cards: TCard[]
  className?: string
  menuItems?: (id: number) => React.JSX.Element
  onClick?: (cardData: TCardEvent) => void
  onCopy?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  hasCopy?: boolean
};

export function CardsNavigate(props: TCardsNavigate) {
  const { cards, onClick, onCopy, hasCopy, className, menuItems } = props;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, cardData: TCardEvent) => {
    if ((onClick && cardData.link !== '#') || (onClick && onCopy)) {
      event.preventDefault();
      onClick(cardData);
    }
  };

  return (
    <div className={classNames(s.root, className)}>
      {
        cards.map(({ id, title, ico, link, notification }) => (
          <DropDownMenu menuItems={() => menuItems && menuItems(id)}>
            <NavLink
              key={id}
              to={link}
              className={classNames(s.card, { [s.disabled]: link === '#' })}
              onClick={(e) => handleClick(e, { id, link, title })}
            >
              {
                hasCopy && onCopy && (
                  <button type='button' className={s.copyButton} onClick={onCopy}>
                    <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.3472 21.0058H16.5833C16.29 21.0058 16.0088 20.8894 15.8015 20.682C15.5942 20.4747 15.4777 20.1935 15.4777 19.9003C15.4777 19.6071 15.5942 19.3259 15.8015 19.1185C16.0088 18.9112 16.29 18.7947 16.5833 18.7947H19.3472C19.4932 18.7929 19.6328 18.734 19.736 18.6308C19.8393 18.5275 19.8981 18.388 19.9 18.2419V2.76393C19.8981 2.61789 19.8393 2.47835 19.736 2.37508C19.6328 2.27181 19.4932 2.21298 19.3472 2.21114H6.08033C5.9343 2.21298 5.79476 2.27181 5.69149 2.37508C5.58821 2.47835 5.52939 2.61789 5.52755 2.76393V5.52785C5.52755 5.82107 5.41107 6.10228 5.20373 6.30961C4.9964 6.51695 4.71519 6.63343 4.42198 6.63343C4.12876 6.63343 3.84756 6.51695 3.64022 6.30961C3.43289 6.10228 3.31641 5.82107 3.31641 5.52785V2.76393C3.31718 2.03112 3.60862 1.32856 4.12679 0.810386C4.64496 0.292215 5.34753 0.000769695 6.08033 0H19.3472C20.08 0.000769695 20.7826 0.292215 21.3007 0.810386C21.8189 1.32856 22.1103 2.03112 22.1111 2.76393V18.2419C22.1103 18.9747 21.8189 19.6773 21.3007 20.1955C20.7826 20.7136 20.08 21.0051 19.3472 21.0058Z" fill="#0E5F8C" />
                      <path d="M14.9252 24.3226H2.76393C2.03112 24.3218 1.32856 24.0304 0.810386 23.5122C0.292215 22.994 0.000769695 22.2915 0 21.5587V7.18623C0.000769695 6.45343 0.292215 5.75086 0.810386 5.23269C1.32856 4.71452 2.03112 4.42307 2.76393 4.4223H14.9252C15.658 4.42307 16.3606 4.71452 16.8787 5.23269C17.3969 5.75086 17.6884 6.45343 17.6891 7.18623V21.5587C17.6884 22.2915 17.3969 22.994 16.8787 23.5122C16.3606 24.0304 15.658 24.3218 14.9252 24.3226ZM2.76393 6.63344C2.61738 6.63363 2.47688 6.69193 2.37326 6.79556C2.26963 6.89919 2.21133 7.03968 2.21114 7.18623V21.5587C2.21133 21.7052 2.26963 21.8457 2.37326 21.9493C2.47688 22.0529 2.61738 22.1112 2.76393 22.1114H14.9252C15.0718 22.1112 15.2122 22.0529 15.3159 21.9493C15.4195 21.8457 15.4778 21.7052 15.478 21.5587V7.18623C15.4778 7.03968 15.4195 6.89919 15.3159 6.79556C15.2122 6.69193 15.0718 6.63363 14.9252 6.63344H2.76393Z" fill="#0E5F8C" />
                    </svg>
                  </button>
                )
              }
              <div className={s.icon}>
                {ico}
              </div>
              {title}
              {notification && <div className={s.notification} />}
            </NavLink>
          </DropDownMenu>
        ))
      }
    </div >
  );
}
