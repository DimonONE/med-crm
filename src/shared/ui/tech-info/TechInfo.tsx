import { useEffect, useState } from 'react';
import classNames from 'classnames';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import s from './styles.module.scss';

type Props = {
  techInfo: {
    cardNumber?: string;
    organizationName?: string;
    dateOfAdmission?: string;
    fullName?: string;
    info: string;
  };
  className?: string;
  isEditing?: boolean;
  onSaveInfo?: (html: string) => void;
};

export function TechInfo({
  techInfo,
  className,
  isEditing = false,
  onSaveInfo,
}: Props) {
  const { cardNumber, organizationName, dateOfAdmission, info, fullName } =
    techInfo;

  const [blocks, setBlocks] = useState<string[]>([]);

  useEffect(() => {
    if (isEditing) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = info || '';
      const extractedBlocks = Array.from(tempDiv.children).map(
        (el) => el.outerHTML,
      );
      setBlocks(extractedBlocks.length ? extractedBlocks : ['<p></p>']);
    }
  }, [info, isEditing]);

  const handleChange = (index: number, value: string) => {
    const updated = [...blocks];
    updated[index] = `<p>${value}</p>`;
    setBlocks(updated);
  };

  const handleAdd = () => {
    setBlocks([...blocks, '<p></p>']);
  };

  const handleRemove = (index: number) => {
    const updated = blocks.filter((_, i) => i !== index);
    setBlocks(updated);
  };

  const handleSave = () => {
    const html = blocks.join('');
    onSaveInfo?.(html);
  };

  return (
    <div className={classNames(s.techInfo, className)}>
      <p className={s.info}>
        Приложение к амбулаторной карте:{' '}
        <span className={s.value}>
          {cardNumber ?? 'Номер карты'},{' '}
          {organizationName ?? 'Название организации'}
        </span>
      </p>
      <p className={s.info}>
        Дата приема:{' '}
        <span className={s.value}>{dateOfAdmission ?? 'Число приема'}</span>
      </p>
      <p className={s.info}>
        ФИО пациента:{' '}
        <span className={s.value}>{fullName ?? 'ФИО пациента'}</span>
      </p>

      {isEditing ? (
        <div className={s.editor}>
          {blocks.map((block, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={s.blockRow}>
              <button type="button" className={s.addBlock} onClick={handleAdd}>
                +
              </button>
              <textarea
                value={block.replace(/^<p>|<\/p>$/g, '')}
                onChange={(e) => handleChange(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() =>
                  blocks.length > 1 ? handleRemove(i) : undefined
                }
              >
                <CloseICO />
              </button>
            </div>
          ))}

          <button type="button" className={s.save} onClick={handleSave}>
            Сохранить
          </button>
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: info ?? '' }} />
      )}
    </div>
  );
}
