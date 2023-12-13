import { useState } from 'react';
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

export function LoadImage({ defaultImage, isLoad, onChange, className }: LoadImageProps) {
  const [image, setImage] = useState<File | null>(null);
  const [isOpen, setOpen] = useState(false);

  const handleChange = (files: FileValues) => {
    if (files && onChange) {
      setImage(files[0]);
      onChange(files[0]);
    }
  };

  const handleDelete = () => {
    if (onChange) {
      setImage(null);
      onChange(null);
      setOpen(false);
    }
  };

  return (
    <div className={classNames(s.root, className)}>
      {isLoad && (
        <button
          type='button'
          className={s.close}
          onClick={() => setOpen(true)}
        >
          <CloseGrayICO />
        </button>
      )}
      {image || defaultImage ? (
        <img src={image ? URL.createObjectURL(image) : `${defaultImage?.replace('/app', API_URL)}`} alt="user" />
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