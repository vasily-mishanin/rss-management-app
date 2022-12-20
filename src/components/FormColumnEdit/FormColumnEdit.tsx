import classes from './FormColumnEdit.module.scss';
import { ButtonGroup, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LoadingIcon from '@mui/icons-material/HourglassBottomOutlined';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { columnsApi } from '../../services/ColumnService';
import { IColumn } from '../../models/types';
import { useAppSelector } from '../../hooks/redux';
import { useParams } from 'react-router-dom';

type FormColumnEditProps = {
  onClose: () => void;
  fieldValue: string;
};

function FormColumnEdit({ onClose, fieldValue }: FormColumnEditProps) {
  const [columnTitle, setColumnTitle] = useState(fieldValue);
  const [validationError, setValidationError] = useState(false);
  const [updateColumn, resultUpdateColumn] = columnsApi.useUpdateColumnMutation();
  const uiSlice = useAppSelector((state) => state.uiReducer);

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

  const handleSubmit = async () => {
    ('handleSubmit');
    const updatedColumn: IColumn = {
      _id: uiSlice.updatingColumnId,
      title: columnTitle,
      order: uiSlice.updatingColumn.order ? uiSlice.updatingColumn.order : 0,
      boardId: uiSlice.updatingBoardId,
    };
    await updateColumn(updatedColumn);
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
        label='Column title'
        variant='standard'
        value={columnTitle}
        error={validationError}
        helperText='3 or more latin letters/digits '
        onChange={handleChange}
      />
      <ButtonGroup className={classes.actions}>
        {resultUpdateColumn.isLoading && (
          <IconButton
            className={classes.iconBtn}
            color='primary'
            size='small'
            aria-label='loading state icon'
          >
            <LoadingIcon />
          </IconButton>
        )}

        {!resultUpdateColumn.isLoading && (
          <IconButton
            className={classes.iconBtn}
            color='success'
            size='small'
            aria-label='chage column title'
            type='submit'
          >
            <CheckIcon />
          </IconButton>
        )}

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
