import React, { useEffect, useRef, useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { TemplateBlockInfo, TemplateStatus, UpdateCurrentBlock, useDraggableSlice } from '~features/draggable-list';
import { Button } from '~shared/ui/button';
import { Checkbox } from '~shared/ui/checkbox';
import { DatePicker } from '~shared/ui/date-picker';
import { Modal } from '~shared/ui/modal';
import { ResizableItem } from '~shared/ui/resizable-item';
import { SelectField } from '~shared/ui/select-field';
import { UnderlineText } from '~shared/ui/underline-text';
import s from './styles.module.scss';

interface ChangeBlockProps extends Partial<UpdateCurrentBlock> {
  subTemplateId: number
  bodyBlockId: number
  lineId: number
  status: TemplateStatus
  value?: string
  type?: 'create' | 'preview'
}

const ChangeBlock = React.memo((props: ChangeBlockProps) => {
  const { onCurrentBlockInfo, onToggleVisibility, updateTemplatesLineItem, updateCurrentBlock } = useDraggableSlice();
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string | number>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);
  const [dropdownVariables, setDropdownVariables] = useState([{
    id: 0,
    value: -1,
    label: '',
  }]);

  const { subTemplateId, bodyBlockId, lineId, status, type = 'create', value: defaultValue, ...positionParams } = props;

  const onCreateItem = () => {
    onToggleVisibility(true);
    onCurrentBlockInfo(subTemplateId, bodyBlockId, lineId);
  };

  const onChange = (eventValue: string | number) => {
    setValue(eventValue);

    updateCurrentBlock(subTemplateId, bodyBlockId, lineId, {
      value: eventValue.toString(),
      ...(status === 'DROPDOWN' && { value: JSON.stringify(dropdownVariables) }),
    });
  };

  const onDelete = () => {
    updateTemplatesLineItem(subTemplateId, bodyBlockId, lineId);
  };

  const onUpdate = (updateData: Partial<TemplateBlockInfo>) => {
    updateCurrentBlock(subTemplateId, bodyBlockId, lineId, updateData);
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }

    if (defaultValue && status === 'DROPDOWN') {
      const variables = JSON.parse(defaultValue ?? '');
      setDropdownVariables(variables);
      setValue(variables[0]?.value);

    }

    // if (type === 'create' && status === 'DROPDOWN') {
    //   setOpen(true);
    // }

  }, []);

  const renderItem = () => {
    switch (true) {
      case status === 'TEXT':
        return (
          <ResizableItem
            positionParams={positionParams}
            preview={type === 'preview'}
            onUpdate={onUpdate}
            onDelete={onDelete}
            className={classNames(s.lineContent, { [s.preview]: type === 'preview' })}
          >
            <div className={s.inputBlock}>
              <input readOnly={type === 'preview'} className={classNames(s.defaultInput, s.text)}
                value={value} onChange={(e) => onChange(e.target.value)} />
            </div>
          </ResizableItem>
        );

      case status === 'BOLD_TEXT':
        return (
          <ResizableItem
            positionParams={positionParams}
            preview={type === 'preview'}
            onUpdate={onUpdate}
            onDelete={onDelete}
            className={classNames(s.lineContent, { [s.preview]: type === 'preview' })}
          >

            <div className={s.inputBlock}>
              <input readOnly={type === 'preview'} className={classNames(s.defaultInput, s.bold)}
                value={value} onChange={(e) => onChange(e.target.value)} />
            </div>

          </ResizableItem>
        );

      case status === 'POINT_TEXT':
        return (
          <ResizableItem
            positionParams={positionParams}
            preview={type === 'preview'}
            onUpdate={onUpdate}
            onDelete={onDelete}
            className={classNames(s.lineContent, { [s.preview]: type === 'preview' })}
          >
            <li className={s.list}>
              <div className={s.inputBlock}>
                <input readOnly={type === 'preview'} className={classNames(s.defaultInput)}
                  value={value} onChange={(e) => onChange(e.target.value)} />
              </div>
            </li>
          </ResizableItem>
        );

      case status === 'DROPDOWN':
        return (
          <ResizableItem
            positionParams={positionParams}
            onUpdate={onUpdate}
            preview={type === 'preview'}
            onEdit={() => setOpen(true)}
            onDelete={onDelete}
            className={classNames(s.lineContent, { [s.preview]: type === 'preview' })}
          >
            <SelectField
              value={value || -1}
              onChange={(e) => onChange(e.target.value)}
              className={s.dropdown}
              selectNavigate
              selectOptions={dropdownVariables}
            >
              {dropdownVariables.map(({ label, value: link }) => (
                <MenuItem
                  key={link}
                  value={link}
                  className="select-link"
                >
                  {label}
                </MenuItem>
              ))}
            </SelectField>
          </ResizableItem >
        );
      case status === 'CHECK_BOX':
        return (
          <ResizableItem
            positionParams={positionParams}
            onUpdate={onUpdate}
            preview={type === 'preview'}
            onDelete={onDelete}
            className={classNames(s.lineContent, { [s.preview]: type === 'preview' })}
          >
            <Checkbox
              className={s.checkbox}
              checked={checked}
              onChange={() => setChecked(prev => !prev)}
            >
              <input readOnly={type === 'preview'} placeholder='Ваше значение'
                className={classNames(s.defaultInput, s.text)} value={value} onChange={(e) => onChange(e.target.value)} />
            </Checkbox>
          </ResizableItem >
        );

      case status === 'RADIO_BOX':
        return (
          <ResizableItem
            positionParams={positionParams}
            onUpdate={onUpdate}
            preview={type === 'preview'}
            onDelete={onDelete}
            className={classNames(s.lineContent, { [s.preview]: type === 'preview' })}
          >
            <>
              <button type='button' onClick={() => onChange('Yes')} className={classNames(s.lineContent, s.radioBlock)}>
                <span className={classNames(s.radioButton, { [s.checked]: value === 'Yes' })} />
                Да
              </button>
              <button type='button' onClick={() => onChange('No')} className={classNames(s.lineContent, s.radioBlock)}>
                <span className={classNames(s.radioButton, { [s.checked]: value !== 'Yes' })} />
                Нет
              </button>
            </>
          </ResizableItem >
        );

      case status === 'DATE':
        return (
          <ResizableItem
            positionParams={positionParams}
            onUpdate={onUpdate}
            preview={type === 'preview'}
            onDelete={onDelete}
            className={classNames(s.lineContent, { [s.preview]: type === 'preview' })}
          >
            <DatePicker
              sx={{
                '.MuiInputBase-root.MuiOutlinedInput-root': {
                  width: '150px',
                  height: '42px',
                  padding: '0 20px',
                  maxWidth: 'none',
                  background: '#CBECFF',
                  borderRadius: '10px',
                  border: '1px solid #0E5F8C',
                  fontSize: '14px',
                  color: '#0E5F8C',
                },
                '.MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root': {
                  color: '#0E5F8C',
                },
              }}
              value={value}
              onChange={(date) =>
                date && onChange(dayjs(date).toISOString())
              } />
          </ResizableItem>);

      case status === 'EMPTY':
        return (
          <ResizableItem
            positionParams={positionParams}
            onUpdate={onUpdate}
            preview={type === 'preview'}
            onDelete={onDelete}
            className={classNames(s.lineContent, s.empty)}
          >
            <p>{type === 'create' ? 'Пустое место' : ''}</p>
          </ResizableItem>
        );

      case status === 'WRITE_TEXT':
        return (
          <ResizableItem
            positionParams={positionParams}
            onUpdate={onUpdate}
            preview={type === 'preview'}
            onDelete={onDelete}
            className={classNames(s.lineContent, { [s.preview]: type === 'preview' })}
          >
            <UnderlineText
              value={value.toString()}
              name=''
              onChange={(event) => typeof event === 'object' ? onChange(event.target.value) : ''}
              readOnly={type === 'preview'}
            />
          </ResizableItem>
        );

      default:
        return (
          <div ref={ref}
            onClick={onCreateItem}
            tabIndex={0}
            onKeyDown={() => false}
            role="button"
            className={classNames(s.lineContent, s.createItem)}
          >
            <div className={s.circle}> + </div>
            <div className={s.right} />
          </div>
        );
    }
  };

  return (
    <>
      {renderItem()}
      <Modal
        isOpen={isOpen}
        type='custom'
        onSuccess={() => setOpen(false)}
        onClose={() => setOpen(false)}
        className={s.modal}
      >
        <div className={s.modalDropdown}>
          <div className={s.headBlock}>Дропдаун</div>

          {dropdownVariables.map(({ id }) => (
            <div key={id} className={s.inputBlock}>
              <input
                value={dropdownVariables.find(({ id: variableId }) => id === variableId)?.label}
                onChange={(e) => setDropdownVariables(prev => prev.map((dropdownVariable) => {
                  if (id === dropdownVariable.id) {
                    return {
                      ...dropdownVariable,
                      label: e.target.value,
                    };
                  }

                  return dropdownVariable;
                }))}
                type="text"
                placeholder={dropdownVariables.length === 1 ? 'Первый вариант по умолчанию' : 'Введите вариант'} />
              <button
                type='button'
                className={s.deleteButton}
                disabled={dropdownVariables.length === 1}
                onClick={() => setDropdownVariables(prev => prev.filter(({ id: variableId }) => id !== variableId))}
              >x</button>
            </div>
          ))}
          <Button
            className={s.createVariable}
            onClick={() => setDropdownVariables(prev => [...prev, {
              id: prev.length + 1,
              value: prev.length + 1,
              label: '',
            }])}
            type='button'
            color='primary-reverse'
          >
            <div className={s.createVariablePlus}>+</div>
            Создать вариант
          </Button>
          <div className={s.buttonBlock}>
            <Button
              className={s.submit}
              type="submit"
              color="secondary"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              Назад
            </Button>
            <Button
              className={s.submit}
              type="submit"
              color="primary"
              onClick={() => {
                onUpdate({ value: JSON.stringify(dropdownVariables) });
                setOpen(false);
              }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>

    </>
  );
});

export { ChangeBlock };
