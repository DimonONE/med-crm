import { InputBase } from '@mui/material';
import classNames from 'classnames';
import { debounce } from 'lodash';
import s from './styles.module.scss';
import SearchICO from './svg/search-ico.svg';

type Props = {
  filters: string
  className?: string
  waitSecond?: number
  isSearch?: boolean
  handleChange?: (value: string) => void
};

export function Search(props: Props) {
  const { filters, isSearch, handleChange, waitSecond = 1000, className } = props;

  const handleSearch = debounce((searchTerm) => {
    if (handleChange) {
      handleChange(searchTerm.target.value);
    }
  }, waitSecond);

  return (
    <div className={classNames(s.root, className)}>
      {filters && <span className={s.name}>{filters}</span>}
      {
        isSearch && (
          <InputBase
            placeholder='Поиск'
            className={classNames('form-input', s.search)}
            onChange={handleSearch}
            endAdornment={<SearchICO />}
          />
        )
      }
    </div>
  );
}
