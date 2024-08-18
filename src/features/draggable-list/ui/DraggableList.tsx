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
import { useDraggableSlice } from '../store/draggableSlice';
import DropppedLeft from '../svg/dropped-left.svg';
import DropppedRight from '../svg/dropped-right.svg';
import { ContentT, LineContentT } from '../types';
import s from './styles.module.scss';

interface DraggableLineP {
  templateId: string;
  contentId: string;
  provided: DraggableProvided;
  content: ContentT[];
  lineContent: LineContentT[];
}

interface DraggableItemP {
  templateId: string;
  provided: DraggableProvided;
  content: ContentT[];
  onDelete: () => void;
}

function DraggableItem(props: DraggableLineP) {
  const { handleTemplatesContent } = useDraggableSlice();
  const [isFocused, setFocused] = useState(false);
  const { templateId, contentId, provided, content, lineContent } = props;

  const onDelete = (id: string) => {
    if (!content.length) return;

    const reorderedItems = Array.from(content);
    const deleteTemplate = reorderedItems.filter((item) => item.id !== id);

    handleTemplatesContent(templateId, deleteTemplate);
  };

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
      {lineContent.map(({ id, template }) => (
        <div key={id} className={s.lineContent}>
          {template}
        </div>
      ))}
      <div
        className={classNames(s.contentBlockDraggeble, { [s.show]: isFocused })}
      >
        <div
          className={classNames(s.dragHandleRight, { [s.show]: isFocused })}
          {...provided.dragHandleProps}
        >
          <DropppedRight />
        </div>
        <button
          className={classNames(s.deleteTemplate, { [s.show]: isFocused })}
          type="button"
          onClick={() => onDelete(contentId)}
        >
          <CloseICO />
        </button>
      </div>
    </div>
  );
}

function DraggableBlock(props: DraggableItemP) {
  const { onToggleVisibility, addTemplatesLine, handleTemplatesContent } =
    useDraggableSlice();

  const [isFocused, setFocused] = useState(false);
  const { templateId, provided, content } = props;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(content);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    console.log('reorderedItems', reorderedItems);

    handleTemplatesContent(templateId, reorderedItems);
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
            <DropppedLeft />
          </div>
        )}
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableContent">
              {(providedContent) => (
                <div
                  {...providedContent.droppableProps}
                  ref={providedContent.innerRef}
                >
                  {content.map(({ id, lineContent }, index) => (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(providedContentLine) => (
                        <DraggableItem
                          templateId={templateId}
                          contentId={id}
                          provided={providedContentLine}
                          lineContent={lineContent}
                          content={content}
                        />
                      )}
                    </Draggable>
                  ))}
                  {providedContent.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {content.map(({ id: lineId, lineContent }) => (
            <div key={lineId} id={lineId} className={s.contentBlock}>
              {lineContent.map(({ id, template }) => (
                <div key={id} className={s.lineContent}>
                  {template}
                </div>
              ))}
              {isFocused && (
                <>
                  <div
                    className={s.dragHandleRight}
                    {...provided.dragHandleProps}
                  >
                    <DropppedRight />
                  </div>
                  <button
                    className={s.deleteTemplate}
                    type="button"
                    onClick={onDelete}
                  >
                    <CloseICO />
                  </button>
                </>
              )}
            </div>
          ))} */}
          <button
            type="button"
            className={s.createLineBlock}
            onClick={() => addTemplatesLine(templateId)}
          >
            <div className={s.createLine}>+</div>
            <span className={s.text}>Создать строку</span>
          </button>
        </div>

        {/* <button
          type="button"
          className={s.createLineBlock}
          onClick={() => updateLineContent(templateId)}
        >
          <div className={s.createLine}>+</div>
          <span className={s.text}>Создать строку</span>
        </button> */}
        <button
          type="button"
          className={s.createLineBlock}
          onClick={() => onToggleVisibility(true)}
        >
          <div className={s.createLine}>+</div>
          <span className={s.text}>onToggleVisibility</span>
        </button>
      </div>
    </div>
  );
}

export function DraggableList() {
  const { templates, handleTemplates } = useDraggableSlice();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(templates);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    handleTemplates(reorderedItems);
  };

  const onDelete = (id: string) => {
    if (!templates.length) return;

    const reorderedItems = Array.from(templates);
    const deleteTemplate = reorderedItems.filter((item) => item.id !== id);

    handleTemplates(deleteTemplate);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(providedD) => (
          <div {...providedD.droppableProps} ref={providedD.innerRef}>
            {templates.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <DraggableBlock
                    templateId={item.id}
                    provided={provided}
                    content={item.content}
                    onDelete={() => onDelete(item.id)}
                  />
                )}
              </Draggable>
            ))}
            {providedD.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
