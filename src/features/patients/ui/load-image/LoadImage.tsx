import { useState } from 'react';
import classNames from 'classnames';
import { API_URL } from '~shared/api/realworld';
import { FileLoader, FileValues } from '~shared/ui/file-loader';
import s from './styles.module.scss';
import FiledICO from './svg/filed-img.svg';

type LoadImageProps = {
  defaultImage?: string
  className?: string
  onChange?: (file: File) => void
  isLoad?: boolean
};

export function LoadImage({ defaultImage, isLoad, onChange, className }: LoadImageProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (files: FileValues) => {
    if (files && onChange) {
      setImage(files[0]);
      onChange(files[0]);
    }
  };

  return (
    <div className={classNames(s.root, className)}>
      {image || defaultImage ? (
        <img src={image ? URL.createObjectURL(image) : `${defaultImage?.replace('/app', API_URL)}`} alt="user" />
      ) : <FiledICO />}
      {
        isLoad && (
          <FileLoader
            id="button-file-img"
            className={s.button}
            title='Загрузить фото'
            onChange={handleChange}
            accept='png'
            multiple={false}
            hiddenFileInfo
          />
        )
      }
    </div>
  );
}