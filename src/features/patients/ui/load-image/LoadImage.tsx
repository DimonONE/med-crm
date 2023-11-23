import { useState } from 'react';
import classNames from 'classnames';
import { FileLoader, FileValues } from '~shared/ui/file-loader';
import s from './styles.module.scss';
import FiledICO from './svg/filed-img.svg';

type LoadImageProps = {
  onChange?: (file: File) => void
};

export function LoadImage({ onChange }: LoadImageProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (files: FileValues) => {
    if (files && onChange) {
      setImage(files[0]);
      onChange(files[0]);
    }
  };

  return (
    <div className={classNames(s.root)}>
      {image ? (
        <img src={URL.createObjectURL(image)} alt="user" />
      ) : <FiledICO />}
      <FileLoader
        id="button-file-img"
        className={s.button}
        title='Загрузить фото'
        onChange={handleChange}
        accept='png'
        multiple={false}
        hiddenFileInfo
      />
    </div>
  );
}