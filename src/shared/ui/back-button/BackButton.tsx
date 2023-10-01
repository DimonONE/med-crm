import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import BackICO from '~shared/svg/back-ico.svg';
import s from './styles.module.scss';

type Props = {
  title: string;
  link?: string;
  className?: string
};

export function BackButton(props: Props) {
  const {
    link,
    title,
    className,
  } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    } else
      navigate(-1);
  };

  return (
    <button type='button' onClick={handleClick} className={classnames(s.link, className)} >
      <BackICO />
      <span className={s.title}>
        {title}
      </span>
    </button>
  );
}
