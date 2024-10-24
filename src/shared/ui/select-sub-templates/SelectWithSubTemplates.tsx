import { useState } from 'react';
import { Menu, MenuItem, List, Collapse } from '@mui/material';
import classNames from 'classnames';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ArrowBottomICO from '~shared/svg/arrow-bottom-filter.svg';
import { Button } from '../button';
import s from './styles.module.scss';

export type SelectWithSubTemplatesOptions = {
  value: string | number
  label: string | number
  subTemplates: {
    value: string | number
    label: string | number
  }[] | undefined
};

type IProps = {
  title: string
  selectOptions: SelectWithSubTemplatesOptions[]
  onClick: (templateId: string, subTemplateId: string) => void
  className?: string
};

export function SelectWithSubTemplates({ title, selectOptions, onClick, className }: IProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (templateId: string, subTemplateId: string) => {
    setAnchorEl(null);
    setOpenSubmenu(null);
    onClick(
      templateId,
      subTemplateId,
    );
  };

  const handleToggleSubmenu = (id: string) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  };

  return (
    <div className={classNames(s.root, className)}>
      <Button
        className={s.button}
        onClick={handleClick}>
        {title}
        {anchorEl ? <FiChevronUp /> : <FiChevronDown />}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
          setOpenSubmenu(null);
        }}
        className={s.menu}
      >
        {selectOptions.map(({ label, value: link, subTemplates }) => (
          <div key={link}>
            <MenuItem
              onClick={() => handleToggleSubmenu(link as string)}
              className={s.title}
            >
              {openSubmenu === link ? <ArrowBottomICO /> : <ArrowBottomICO />}
              <span className={s.label}>{label}</span>

            </MenuItem>

            <Collapse in={openSubmenu === link} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subTemplates?.map((sub) => (
                  <MenuItem
                    key={sub.value}
                    onClick={() => handleClose(link.toString(), sub.value.toString())}
                    sx={{ pl: 4 }}
                    className={s.subTitle}
                  >
                    <span className={s.label}>{sub.label}</span>
                  </MenuItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </Menu>
    </div >
  );
}
