import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { API_URL } from '~shared/api/realworld';
import CloseGrayICO from '~shared/svg/close-gray-ico.svg';
import { FileLoader, FileValues } from '~shared/ui/file-loader';
import { Modal } from '~shared/ui/modal';
import s from './styles.module.scss';
import FiledICO from './svg/filed-img.svg';

type LoadImageProps = {
  defaultImage?: string
  className?: string
  onChange?: (file: File | null) => void
  isLoad?: boolean
};

function isValidImage(url: string | File | null, callback: (valid: boolean) => void): void {
  if (typeof url === 'string') {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
  }
}

export function LoadImage({ defaultImage, isLoad, onChange, className }: LoadImageProps) {
  const [image, setImage] = useState<File | string | null>(null);
  const [isOpen, setOpen] = useState(false);

  const handleChange = (files: FileValues) => {
    if (files && onChange) {
      setImage(files[0] as File);
      onChange(files[0] as File);
    }
  };

  const handleDelete = () => {
    if (onChange) {
      setImage(null);
      onChange(null);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (typeof defaultImage === 'string' || defaultImage === null) {
      setImage(`${defaultImage?.replace('/app', API_URL)}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultImage]);

  useEffect(() => {
    isValidImage(image, (valid: boolean) => {
      if (!valid) {
        setImage(null);
      }
    });
  }, [image]);


  return (
    <div className={classNames(s.root, className)}>
      {(isLoad && image) && (
        <button
          type='button'
          className={s.close}
          onClick={() => setOpen(true)}
        >
          <CloseGrayICO />
        </button>
      )}
      {image ? (
        <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt="user" />
      ) : <FiledICO />}

      {
        isLoad && (
          <FileLoader
            id="button-file-img"
            className={s.loadFails}
            title='Загрузить фото'
            onChange={handleChange}
            accept='png'
            multiple={false}
            hiddenFileInfo
          />
        )
      }
      <Modal
        isOpen={isOpen}
        onSuccess={handleDelete}
        onClose={() => setOpen(false)}
        type='warn' >
        <div>
          Удалить картинку?
        </div>
      </Modal>
    </div>
  );
}