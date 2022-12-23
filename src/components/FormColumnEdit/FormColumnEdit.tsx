import classes from './FormColumnEdit.module.scss';
import { ButtonGroup, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

type FormColumnEditProps = {
  onClose: () => void;
  onSubmit: (title: string) => void;
  fieldValue: string;
};

function FormColumnEdit({ onClose, fieldValue, onSubmit }: FormColumnEditProps) {
  const [columnTitle, setColumnTitle] = useState(fieldValue);
  const [validationError, setValidationError] = useState(false);
  const { t, i18n } = useTranslation();

  const isTextValid = (text: string) => {
    const regExpr = /^[A-Za-z0-9 ]{3,}$/;
    return regExpr.test(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTextValid(e.target.value)) {
      setColumnTitle(e.target.value);
      setValidationError(false);
    } else {
      setValidationError(true);
      setColumnTitle(e.target.value);
    }
  };

  const handleSubmit = () => {
    onSubmit(columnTitle);
    onClose();
  };

  return (
    <Box
      className={classes.columnform}
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <TextField
        className={classes.input}
        id='standard-basic'
        label={i18n.resolvedLanguage === 'ru' ? 'Название колонки' : 'Column title'}
        variant='standard'
        value={columnTitle}
        error={validationError}
        helperText={i18n.resolvedLanguage === 'ru' ? '3 и более символов' : '3 or more letters/digits'}
        onChange={handleChange}
      />
      <ButtonGroup className={classes.actions}>
        <IconButton
          className={classes.iconBtn}
          color='success'
          size='small'
          aria-label='chage column title'
          type='submit'
        >
          <CheckIcon />
        </IconButton>

        <IconButton
          className={classes.iconBtn}
          color='secondary'
          size='small'
          aria-label='close edit form'
          onClick={onClose}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
}

export default FormColumnEdit;
