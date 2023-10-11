import { useState } from 'react';
import classNames from 'classnames';
import { FileLoader } from '~shared/ui/file-loader';
import s from './styles.module.scss';
import FiledICO from './svg/filed-img.svg';


export function LoadImage() {
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className={classNames(s.root)}>
      {image ? (
        <img src={URL.createObjectURL(image)} alt="user" />
      ) : <FiledICO />}
      <FileLoader
        id="button-file-img"
        className={s.button}
        title='Загрузить фото'
        onChange={(files) => files && setImage(files[0])}
        accept='png'
        multiple={false}
        hiddenFileInfo
      />
    </div>
  );
}