import { useState } from 'react';
import { MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { useCreateTemplate } from '~features/draggable-list';
import { errorHandler } from '~shared/lib/react-query';
import { Button } from '~shared/ui/button';
import { Modal } from '~shared/ui/modal';
import { SelectField } from '~shared/ui/select-field';
import { ReversedReceptionTableEnum } from '~shared/utils';
import s from './styles.module.scss';

type IProps = {
  isOpen: boolean;
  defaultTemplateId: string
  handleClose: () => void;
};

export function CreateTemplateModal(props: IProps) {
  const { isOpen, handleClose, defaultTemplateId } = props;
  const [value, setValue] = useState('');
  const [templateValue, setTemplateValue] = useState<string | number>(defaultTemplateId);
  const { mutate } = useCreateTemplate();

  const templates = Object.entries(ReversedReceptionTableEnum).map(([key, label]) => ({
    value: key,
    label,
  }));

  const onSave = () => {
    const createData = {
      id: 0,
      category: templates.find(({ value: categoryId }) => categoryId === templateValue)?.label as string,
      name: value,
      techInfo: 'Настоящее приложение разработано на основании «Клинических рекомендаций (протоколов ведения) при диагнозе болезни периапикальных тканей» (Утверждены Постановлением № 15 Совета Ассоциации общественных объединений «Стоматологическая Ассоциация России» от 30 сентября 2014 года, актуализированы 02 августа 2018 года).',
    };

    mutate(createData, {
      onSuccess: () => {
        setValue('');
        setTemplateValue(0);
        handleClose();
        toast('Success!', { type: 'success' });
        window.location.reload();
      },

      onError: (error) => {
        toast(errorHandler(error), { type: 'error' });
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      type='custom'
      onSuccess={() => handleClose()}
      onClose={() => handleClose()}
      className={s.modal}
    >
      <div className={s.modalContent}>
        <div className={s.dropdownBlock}>
          <div className={s.headBlock}>Категория шаблона</div>

          <SelectField
            value={templateValue}
            onChange={(e) => setTemplateValue(e.target.value)}
            className={s.dropdown}
            selectNavigate
            selectOptions={templates}
          >
            {templates.map(({ label, value: link }) => (
              <MenuItem
                key={link}
                value={link}
                className="select-link"
              >
                {label}
              </MenuItem>
            ))}
          </SelectField>
        </div>


        <div className={s.headBlock}>Название шаблона</div>

        <div className={s.inputBlock}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Введите название шаблона" />

        </div>

        <div className={s.buttonBlock}>
          <Button
            className={s.submit}
            type="submit"
            color="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Назад
          </Button>
          <Button
            className={s.submit}
            type="submit"
            color="primary"
            onClick={() => {
              onSave();
            }}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Modal >
  );
}
