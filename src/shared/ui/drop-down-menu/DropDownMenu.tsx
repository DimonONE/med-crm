import { useRef, useState } from 'react';
import { Menu } from '@mui/material';

type Props = {
  children: React.JSX.Element
  menuItems: (handleCloseMenu: () => void) => React.JSX.Element | undefined
};

export type AnchorEl = {
  element: null | HTMLElement
  mouseX: number | null
  mouseY: number | null
};

export function DropDownMenu({ children, menuItems }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [anchorEl, setAnchorEl] = useState<AnchorEl>({
    element: null,
    mouseX: null,
    mouseY: null,
  });

  const handleContextMenu = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();

    if ('clientX' in event && 'clientY' in event) {
      setAnchorEl({
        element: event.currentTarget as HTMLElement,
        mouseX: event.clientX,
        mouseY: event.clientY,
      });
    } else {
      setAnchorEl({
        element: event.currentTarget as HTMLElement,
        mouseX: null,
        mouseY: null,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
      handleContextMenu(event);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl({
      element: null,
      mouseX: null,
      mouseY: null,
    });
  };

  if (menuItems(handleCloseMenu) === undefined) {
    return children;
  }

  return (
    <>
      <div
        ref={ref}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onContextMenu={handleContextMenu}
        role="button"
      >
        {children}
      </div>
      {
        Boolean(anchorEl.mouseX) && Boolean(anchorEl.mouseY) && (
          <Menu
            open={Boolean(anchorEl.element)}
            onClose={handleCloseMenu}
            anchorReference="anchorPosition"
            anchorPosition={anchorEl.mouseX !== null && anchorEl.mouseY !== null ? { top: anchorEl.mouseY, left: anchorEl.mouseX } : undefined}
          >
            {menuItems(handleCloseMenu)}
          </Menu>
        )
      }
    </>
  );
}