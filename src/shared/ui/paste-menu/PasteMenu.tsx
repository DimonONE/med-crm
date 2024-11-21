import { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';

export type PasteT = {
  id: string;
  params: { [key: string]: number | string };
};

export function PasteMenu({
  copyId,
  handlePaste,
}: {
  copyId: string;
  handlePaste: (props: PasteT) => void;
}) {
  const [isPasteDisabled, setIsPasteDisabled] = useState(false);

  const hasCopy = async (
    key: string,
  ): Promise<{
    id: string;
    isCopy: boolean;
    params: { [key: string]: number | string };
  }> => {
    try {
      const text = await navigator.clipboard.readText();
      const parse = JSON.parse(text);
      const isCopy = Boolean(parse[key]);
      return { isCopy, id: parse[key], params: parse };
    } catch (err) {
      return { isCopy: false, id: '', params: {} };
    }
  };

  const onPaste = async (
    keyId: string,
    paste: ({ id, params }: PasteT) => void,
  ) => {
    try {
      const { isCopy, id: pasteId, params } = await hasCopy(keyId);

      if (isCopy) {
        paste({ id: pasteId, params });
      }
    } catch (err) {
      console.error('Ошибка чтения буфера обмена:', err);
    }
  };

  useEffect(() => {
    (async () => {
      const { isCopy } = await hasCopy(copyId);
      setIsPasteDisabled(!isCopy);
    })();
  }, [copyId]);

  return (
    <MenuItem
      disabled={isPasteDisabled}
      onClick={() => onPaste(copyId, handlePaste)}
    >
      Вставить
    </MenuItem>
  );
}
