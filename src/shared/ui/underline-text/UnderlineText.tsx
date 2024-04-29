import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

interface UnderlineTextProps {
  value?: string
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement> | string) => void
  name: string
  width?: string
  className?: string
}

export function UnderlineText(props: UnderlineTextProps): JSX.Element {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  const { value: initialValue, width, className, onChange, ...prevProps } = props;
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

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      onChange(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

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

