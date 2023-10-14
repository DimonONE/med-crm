import { useEffect, useState } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';
import CloseICO from './svg/close-ico.svg';
import DownloadICO from './svg/download-ico.svg';

type FileValues = File[] | null;

type FileLoaderProps = {
  id: string
  filesData?: FileValues
  title: string
  className?: string
  accept?: 'pdf' | 'png'
  multiple?: boolean
  onDownload?: () => void
  onDelete?: (files: FileValues) => void
  onChange?: (files: FileValues) => void
  hiddenFileInfo?: boolean
  hiddenButton?: boolean
};

export function FileLoader(props: FileLoaderProps) {
  const [files, setFiles] = useState<FileValues>(null);

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

  const handleSave = () => {
    if (onDownload) {
      onDownload();
    }
  };

  const handleClose = (fileId: string) => {
    if (files) {
      const deleteFile: FileValues = files.filter(({ name }) => name !== fileId);
      setFiles(deleteFile);
      if (onDelete) {
        const selectFileDelete = files.filter(({ name }) => name === fileId);
        onDelete(selectFileDelete);
      }
    }
  };

  return (
    <div className={classNames(s.root, className)} >
      {!hiddenFileInfo && files && (
        <ul>
          {files.map((file) => (
            <li key={file.name} className={s.fileInfo}>
              <button type='button' onClick={() => handleSave()}>
                <DownloadICO />
              </button>
              <span className={s.name}>{file.name}</span>
              <button type='button' onClick={() => handleClose(file.name)}>
                <CloseICO />
              </button>
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
    </div>
  );
}