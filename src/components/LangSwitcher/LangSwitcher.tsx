import classes from './LangSwitcher.module.scss';

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import LanguageIcon from '@mui/icons-material/Language';

import { useTranslation, Trans } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';

function LangSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setCurrentLang(i18n.resolvedLanguage || '');
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang.toUpperCase());
    setOpen(false);
  };

  return (
    <div className={classes.langswitcher}>
      <Button
        ref={anchorRef}
        id='composition-button'
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        style={{ color: 'white' }}
      >
        <LanguageIcon /> {currentLang}
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem className={classes.item} onClick={() => handleLangChange('ru')}>
                    Русский-RU
                  </MenuItem>
                  <MenuItem className={classes.item} onClick={() => handleLangChange('en')}>
                    English-EN
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default LangSwitcher;
