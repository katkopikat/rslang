/* eslint-disable react/prop-types */
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import './Settings.scss';

interface ISettings {
  showTranslate: boolean;
  setShowTranslate: (value: boolean) => void;
  showBtns: boolean;
  setShowBtns: (value: boolean) => void;
}

const Settings = ({
  showTranslate, setShowTranslate, showBtns, setShowBtns,
} : ISettings) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const openSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeSettings = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button aria-describedby={id} onClick={openSettings}>
        <SettingsIcon />
      </Button>

      <Popover
        open={open}
        onClose={closeSettings}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <h2>Настройки</h2>

        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={showTranslate}
                onChange={(e) => setShowTranslate(e.target.checked)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              )}
            label="Отображать перевод слова и перевод предложений?"
          />

          <FormControlLabel
            control={(
              <Checkbox
                checked={showBtns}
                onChange={(e) => setShowBtns(e.target.checked)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              )}
            label="Отображать кнопки 'Сложные слова' и 'Удалённые слова'?"
          />
        </FormGroup>

      </Popover>
    </>
  );
};

export default Settings;
