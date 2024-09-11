/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import classNames from 'classnames';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
} from 'react-beautiful-dnd';
import CloseICO from '~shared/svg/close-gray-ico.svg';
import { UnderlineText } from '~shared/ui/underline-text';
import { ChangeBlock } from '~widgets/reception-table';
import { useDraggableSlice } from '../model/draggableSlice';
import DroppedLeft from '../svg/dropped-left.svg';
import DroppedRight from '../svg/dropped-right.svg';
import { Template, TemplateLineBlock } from '../types';
import s from './styles.module.scss';

interface DraggableLineProps extends TemplateLineBlock {
  subTemplateId: number
  provided: DraggableProvided;
  onDelete: () => void;
}

interface DraggableBlockProps extends Template {
  provided: DraggableProvided;
  onDelete: () => void;
}


function DraggableItem(props: DraggableLineProps) {
  const [isFocused, setFocused] = useState(false);
  const { bodyBlockId, subTemplateId, blockInfo, provided, onDelete } = props;

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
            subTemplateId={subTemplateId}
            bodyBlockId={bodyBlockId}
            lineId={lineId}
            status={status}
          />
        )) : (
          <ChangeBlock
            subTemplateId={subTemplateId}
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
  const { subTemplateId, provided, lineBlocks } = props;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(lineBlocks);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    updateTemplatesLine(subTemplateId, reorderedItems);
  };

  const onDelete = (lineId: number) => {
    if (!lineBlocks.length) return;
    const deleteTemplate = lineBlocks.filter((item) => item.id !== lineId);
    updateTemplatesLine(subTemplateId, deleteTemplate);
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
                    <Draggable key={bodyBlockId} draggableId={bodyBlockId.toString()} index={index}>
                      {(providedContentLine) => (
                        <DraggableItem
                          key={lineBlocId}
                          subTemplateId={subTemplateId}
                          bodyBlockId={bodyBlockId}
                          id={lineBlocId}
                          provided={providedContentLine}
                          onDelete={() => onDelete(bodyBlockId)}
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
              onClick={() => addTemplatesLine(subTemplateId)}
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

  const onDelete = (subTemplateId: number) => {
    if (!templates.length) return;

    const reorderedItems = Array.from(templates);
    const deleteTemplate = reorderedItems.filter((item) => item.subTemplateId !== subTemplateId);

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
                        onChange={(event) => typeof event === 'object' ? handleTemplatesTitle(template.subTemplateId, event.target.value) : false}
                      />
                    </div>
                  </div>

                  <Draggable key={template.subTemplateId} draggableId={template.subTemplateId.toString()} index={template.subTemplateId}>
                    {(provided) => (
                      <DraggableLine
                        key={template.id}
                        provided={provided}
                        onDelete={() => onDelete(template.subTemplateId)}
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
