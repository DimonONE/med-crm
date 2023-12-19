import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { API_URL } from '~shared/api/realworld';
import CloseICO from '../../svg/close-gray-ico.svg';
import { Modal } from '../modal';
import s from './styles.module.scss';
import DownloadICO from './svg/download-ico.svg';

export type FileValues = File[] | null;

type FileLoaderProps = {
  id: string
  filesData?: FileValues
  title: string
  className?: string
  accept?: 'pdf' | 'png'
  multiple?: boolean
  onDownload?: (link: string) => void
  onDelete?: (files: FileValues, file: File[]) => void
  onChange?: (files: FileValues) => void
  hiddenFileInfo?: boolean
  hiddenButton?: boolean
};

export function FileLoader(props: FileLoaderProps) {
  const [files, setFiles] = useState<FileValues>(null);
  const [isOpen, setOpen] = useState({
    flag: false,
    fileId: '',
  });

  const {
    id,
    title,
    filesData,
    accept = 'pdf',
    multiple = true,
    onDownload,
    onDelete,
    onChange,
    className,
    hiddenFileInfo,
    hiddenButton,
  } = props;

  useEffect(() => {
    if (filesData) {
      setFiles(filesData);
    }
  }, [filesData]);

  const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);

      const filesSelect = files ? [...files, ...filesArray] : filesArray;
      setFiles(filesSelect);

      if (onChange) {
        onChange(filesArray);
      }
    }
  };

  const handleSave = (path: string) => {
    if (onDownload) {
      onDownload(`${path.replace('/app', API_URL)}`);
    } else
      window.open(`${path.replace('/app', API_URL)}`, '_blank');
  };

  const handleDelete = (fileId: string) => {
    if (files) {
      const filterDeleteFile: FileValues = files.filter(({ name }) => name !== fileId);
      setFiles(filterDeleteFile);

      if (onDelete) {
        const selectFileDelete = files.filter(({ name }) => name === fileId);
        onDelete(filterDeleteFile, selectFileDelete);
        setOpen({ flag: false, fileId: '' });
      }
    }
  };

  return (
    <div className={classNames(s.root, className)} >
      {!hiddenFileInfo && files && (
        <ul>
          {files.map((file) => (
            <li key={file.name} className={s.fileInfo}>
              {
                'path' in file && (
                  <button type='button' onClick={() => handleSave(file.path as string)}>
                    <DownloadICO />
                  </button>
                )
              }
              <span className={s.name}>{file.name}</span>
              {onDelete && (
                <button type='button' onClick={() => setOpen({ flag: true, fileId: file.name })}>
                  <CloseICO />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {
        !hiddenButton && (
          <label htmlFor={id} className={s.downloadButton}>
            <input
              id={id}
              className={s.input}
              name="files"
              type="file"
              multiple={multiple}
              onChange={onSubmit}
              accept={`application/${accept}`}
            />
            {title}
          </label>
        )
      }
      <Modal
        isOpen={isOpen.flag}
        onSuccess={() => handleDelete(isOpen.fileId)}
        onClose={() => setOpen({ flag: false, fileId: '' })}
        type='warn' >
        <div>
          Удалить файл?
        </div>
      </Modal>
    </div>
  );
}