import React, { useCallback, useRef, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { TemplateBlockInfo } from '~features/draggable-list';
import s from './styles.module.scss';

export type AnchorEl = {
  element: null | HTMLElement;
  offsetX: number;
};

type CustomParams = {
  minWidth: number;
};

type Props = {
  parentRef?: HTMLDivElement | null;
  children: React.JSX.Element;
  positionParams: Partial<TemplateBlockInfo> & Partial<CustomParams>;
  onDelete: () => void;
  onEdit?: () => void;
  className?: string;
  preview?: boolean;
  onUpdate?: (updateData: Partial<TemplateBlockInfo>) => void;
};

export function ResizableItem(props: Props) {
  const [isSelected, setSelected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    children,
    preview,
    className,
    positionParams,
    onDelete,
    onEdit,
    onUpdate,
    parentRef,
  } = props;

  const [anchorEl, setAnchorEl] = useState<AnchorEl>({
    element: null,
    offsetX: 0,
  });

  const debouncedUpdate = debounce((newWidth: number) => {
    if (onUpdate) {
      ref.current!.style.marginLeft = `${0}px`;

      // Обнуляем отступ слева
      onUpdate({ sizeX: newWidth }); // Вызываем функцию onUpdate с новой шириной
    }
  }, 100);

  const widthResizeBlocks = useCallback(() => {
    let totalWidth = 0;
    if (parentRef) {
      const childrenBlocks = Array.from(parentRef.children);

      if (childrenBlocks.length > 1) {
        totalWidth = childrenBlocks.slice(0, -1).reduce((sum, child) => {
          const childElement = child as HTMLElement;
          return sum + childElement.offsetWidth;
        }, 0);

        return (parentRef?.offsetWidth || 0) - totalWidth;
      }
    }
    return totalWidth;
  }, [parentRef]);

  const maxWidthSize = widthResizeBlocks();

  const handleResize = (event: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const startX = event.clientX;
      const startWidth = ref.current.offsetWidth;
      const minWidth = positionParams.minWidth ?? 80;
      const isResizingLeft = startX - rect.left <= 20;
      const isResizingRight = rect.right - startX <= 20;

      if (isResizingLeft || isResizingRight) {
        const onMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.clientX - startX;
          let newWidth;

          if (isResizingLeft && deltaX > 0) {
            newWidth = Math.max(startWidth - deltaX, minWidth);

            if (newWidth > minWidth) {
              ref.current!.style.marginLeft = `${deltaX}px`;
              debouncedUpdate(newWidth);
            }
          } else if (isResizingRight) {
            newWidth =
              deltaX < maxWidthSize
                ? startWidth + deltaX
                : startWidth + maxWidthSize;
          }

          if (newWidth && newWidth > minWidth) {
            ref.current!.style.width = `${newWidth}px`;
            debouncedUpdate(newWidth);
          }
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    }
  };

  const handleSelect = () => {
    setSelected(true);
  };

  const handleAnchorEl = (element: AnchorEl) => {
    setAnchorEl(element);
  };

  const handleContextMenu = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();

    handleAnchorEl({
      element: event.currentTarget as HTMLElement,
      offsetX: 'clientX' in event ? ref.current?.clientWidth ?? 0 / 2 : 0,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSelect();
    } else if (
      event.key === 'ContextMenu' ||
      (event.shiftKey && event.key === 'F10')
    ) {
      handleContextMenu(event);
    }
  };

  const onBlur = () => {
    setSelected(false);
  };

  const handleCloseMenu = () => {
    setAnchorEl({
      element: null,
      offsetX: 0,
    });
  };

  const stylesPosition = {
    ...(positionParams?.sizeX && { width: positionParams.sizeX }),
  };

  if (preview) {
    return (
      <div style={stylesPosition} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div className={s.root} style={stylesPosition}>
      <div
        ref={ref}
        onClick={handleSelect}
        tabIndex={0}
        onMouseDown={handleResize}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onContextMenu={handleContextMenu}
        role="button"
        className={classNames(className, { [s.selectItem]: isSelected })}
      >
        {children}
        <div className={s.right} />
      </div>
      {anchorEl.element && (
        <Menu
          anchorEl={anchorEl.element}
          open={Boolean(anchorEl.element)}
          onClose={handleCloseMenu}
          anchorPosition={{ top: 0, left: 0 }}
          style={{ marginLeft: anchorEl.offsetX / 2, marginTop: -20 }}
        >
          {onEdit && (
            <MenuItem
              onClick={() => {
                onEdit();
                handleCloseMenu();
              }}
            >
              Редактировать
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              onDelete();
              handleCloseMenu();
            }}
          >
            Удалить
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}
