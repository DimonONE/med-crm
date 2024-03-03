import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

interface UnderlineTextProps {
  name: string
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void
  width?: string
  className?: string
}

export function UnderlineText(props: UnderlineTextProps): JSX.Element {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  const { width, className, onChange, ...prevProps } = props;
  const fontSize = 18;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;

      if (inputRef.current.scrollHeight > fontSize) {
        inputRef.current.classList.remove('border');
      } else {
        inputRef.current.classList.add('border');
      }
    }
  }, [value]);

  return (
    <textarea
      ref={inputRef}
      value={value}
      onChange={handleChange}
      className={classNames(s.root, className)}
      style={{ width: value ? `${value.length}ch` : width || 'auto' }}
      {...prevProps}
    />
  );
}

