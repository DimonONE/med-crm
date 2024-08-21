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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  const { value: initialValue, width, className, onChange, ...prevProps } = props;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange(event);
  };

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      onChange(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      onChange={handleChange}
      className={classNames(s.root, className)}
      {...prevProps}
    />
  );
}

