/* eslint-disable @typescript-eslint/no-unused-vars */

import { useRef, useState } from 'react';
import { MenuItem } from '@mui/material';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
} from 'react-beautiful-dnd';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import { Checkbox } from '~shared/ui/checkbox';
import { DatePicker } from '~shared/ui/date-picker';
import { ResizableItem } from '~shared/ui/resizable-item';
import { SelectField } from '~shared/ui/select-field';
import { UnderlineText } from '~shared/ui/underline-text';
import { useDraggableSlice } from '../model/draggableSlice';
import DroppedLeft from '../svg/dropped-left.svg';
import DroppedRight from '../svg/dropped-right.svg';
import { Template, TemplateLineBlock, TemplateStatus } from '../types';
import s from './styles.module.scss';

interface DraggableLineProps extends TemplateLineBlock {
  templateId: number
  provided: DraggableProvided;
  onDelete: () => void;
}

interface DraggableBlockProps extends Template {
  provided: DraggableProvided;
  onDelete: () => void;
}

interface ChangeBlockProps {
  templateId: number
  bodyBlockId: number
  lineId: number
  status: TemplateStatus
}

function ChangeBlock(props: ChangeBlockProps) {
  const { onCurrentBlockInfo, onToggleVisibility } = useDraggableSlice();
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string | number>('');
  const { templateId, bodyBlockId, lineId, status } = props;

  const onCreateItem = () => {
    onToggleVisibility(true);
    onCurrentBlockInfo(templateId, bodyBlockId, lineId);
  };

  const onChange = (eventValue: string | number) => {
    setValue(eventValue);
  };

  switch (true) {
    case status === 'text':
      return (
        <ResizableItem className={s.lineContent} >
          <input className={classNames(s.defaultInput, s.text)} value={value} onChange={(e) => onChange(e.target.value)} />
        </ResizableItem>
      );

    case status === 'bold':
      return (
        <ResizableItem className={s.lineContent} >
          <input className={classNames(s.defaultInput, s.bold)} value={value} onChange={(e) => onChange(e.target.value)} />
        </ResizableItem>
      );

    case status === 'list':
      return (
        <ResizableItem className={s.lineContent} >
          <li className={s.list}>
            <div className={s.inputBlock}>
              <input className={classNames(s.defaultInput)} value={value} onChange={(e) => onChange(e.target.value)} />
            </div>
          </li>
        </ResizableItem>
      );

    case status === 'dropdown':
      return (
        <ResizableItem className={s.lineContent} >
          <SelectField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={s.dropdown}
            selectNavigate
            selectOptions={[
              { value: -1, label: 'Не визуализируется' },
              { value: 1, label: 'Визуализируется' },
            ]}
          >
            {[
              { value: -1, label: 'Не визуализируется' },
              { value: 1, label: 'Визуализируется' },
            ].map(({ label, value: link }) => (
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
    case status === 'checkBox':
      return (
        <ResizableItem className={s.lineContent} >
          <Checkbox
            className={s.checkbox}
            checked={Boolean(value)}
            onChange={() => setValue(prev => !prev ? 'test' : '')}
          >
            test
          </Checkbox>
        </ResizableItem >
      );

    case status === 'radioButton':
      return (
        <ResizableItem className={s.lineContent} >
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

    case status === 'date':
      return (
        <ResizableItem className={s.lineContent} >
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

    case status === 'empty':
      return (
        <ResizableItem className={classNames(s.lineContent, s.empty)} >
          <p>Пустое место</p>
        </ResizableItem>
      );

    case status === 'handwritten':
      return (
        <ResizableItem className={s.lineContent} >
          <UnderlineText
            value={value.toString()}
            name=''
            onChange={(event) => typeof event === 'object' ? onChange(event.target.value) : ''}
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
}


function DraggableItem(props: DraggableLineProps) {
  const [isFocused, setFocused] = useState(false);
  const { templateId, bodyBlockId, id, blockInfo, provided, onDelete } = props;

  return (
    <div
      className={s.contentBlock}
      ref={provided.innerRef}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      {...provided.draggableProps}
      style={{
        userSelect: 'none',
        ...provided.draggableProps.style,
      }}
    >
      {blockInfo.length ?
        blockInfo.map(({ lineId, status }) => (
          <ChangeBlock
            key={lineId}
            templateId={templateId}
            bodyBlockId={bodyBlockId}
            lineId={lineId}
            status={status}

          />
        )) : (
          <ChangeBlock
            templateId={templateId}
            bodyBlockId={bodyBlockId}
            lineId={0}
            status="default"

          />
        )}
      <div
        className={classNames(s.contentBlockDraggable, { [s.show]: isFocused })}
      >
        <div
          className={classNames(s.dragHandleRight, { [s.show]: isFocused })}
          {...provided.dragHandleProps}
        >
          <DroppedRight />
        </div>
        <button
          className={classNames(s.deleteTemplate, { [s.show]: isFocused })}
          type="button"
          onClick={() => onDelete()}
        >
          <CloseICO />
        </button>
      </div>
    </div>
  );
}

function DraggableLine(props: DraggableBlockProps) {
  const { addTemplatesLine, updateTemplatesLine } = useDraggableSlice();

  const [isFocused, setFocused] = useState(false);
  const { id, provided, lineBlocks } = props;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(lineBlocks);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    updateTemplatesLine(id, reorderedItems);
  };

  const onDelete = (lineId: number) => {
    if (!lineBlocks.length) return;
    const deleteTemplate = lineBlocks.filter((item) => item.id !== lineId);
    updateTemplatesLine(id, deleteTemplate);
  };

  return (
    <div
      ref={provided.innerRef}
      onMouseEnter={() => setFocused(true)}
      onMouseLeave={() => setFocused(false)}
      {...provided.draggableProps}
      role="button"
      tabIndex={0}
      style={{
        userSelect: 'none',
        ...provided.draggableProps.style,
      }}
    >
      <div className={s.draggable}>
        {isFocused && (
          <div className={s.dragHandleLeft} {...provided.dragHandleProps}>
            <DroppedLeft />
          </div>
        )}
        <div>
          <div className={s.headBlock}>
            Тело блока:
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableContent">
              {(providedContent) => (
                <div
                  {...providedContent.droppableProps}
                  ref={providedContent.innerRef}
                >
                  {lineBlocks.map(({ id: lineBlocId, bodyBlockId, ...propsLineBlocks }, index) => (
                    <Draggable key={lineBlocId} draggableId={bodyBlockId.toString()} index={index}>
                      {(providedContentLine) => (
                        <DraggableItem
                          key={lineBlocId}
                          templateId={id}
                          bodyBlockId={bodyBlockId}
                          id={lineBlocId}
                          provided={providedContentLine}
                          onDelete={() => onDelete(lineBlocId)}
                          {...propsLineBlocks}
                        />
                      )}
                    </Draggable>
                  ))}
                  {providedContent.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className={classNames(s.blockWithPadding, s.contentBlock)} style={{ border: 'none' }}>
            <button
              type="button"
              className={s.createLineBlock}
              onClick={() => addTemplatesLine(id)}
            >
              <div className={s.createLine}>+</div>
              <span className={s.text}>Создать строку</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DraggableList() {
  const { templates, handleTemplatesTitle, handleTemplates } = useDraggableSlice();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(templates);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    handleTemplates(reorderedItems);
  };

  const onDelete = (id: number) => {
    if (!templates.length) return;

    const reorderedItems = Array.from(templates);
    const deleteTemplate = reorderedItems.filter((item) => item.id !== id);

    handleTemplates(deleteTemplate);
  };

  return (
    <div className={s.wrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(providedD) => (
            <div {...providedD.droppableProps} ref={providedD.innerRef}>
              {templates.map((template) => (
                <div key={template.id}>
                  <div
                    key={template.id}
                    className={s.draggable}
                  >
                    <div className={s.headBlock}>
                      Название блока:
                    </div>
                    <div className={s.blockWithPadding}>
                      <UnderlineText
                        value={template.name}
                        name=''
                        onChange={(event) => typeof event === 'object' ? handleTemplatesTitle(template.id, event.target.value) : false}
                      />
                    </div>
                  </div>

                  <Draggable key={template.id} draggableId={template.id.toString()} index={template.subTemplateId}>
                    {(provided) => (
                      <DraggableLine
                        key={template.id}
                        provided={provided}
                        onDelete={() => onDelete(template.id)}
                        {...template}
                      />
                    )}
                  </Draggable>
                </div>
              ))}
              {providedD.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
