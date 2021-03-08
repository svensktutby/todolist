import React, { ChangeEvent, FC, useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export type EditableSpanPropsType = {
  value: string;
  onChange: (title: string) => void;
};

const useStyles = makeStyles(() => ({
  text: {
    wordBreak: 'break-word',
    fontSize: '1rem',
  },
}));

export const EditableSpan: FC<EditableSpanPropsType> = React.memo((props) => {
  const classes = useStyles();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>(props.value);

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    setEditMode(false);
    const newTitle = title.trim();

    if (newTitle) props.onChange(newTitle);
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      type="text"
      value={title}
      onBlur={offEditMode}
      onChange={changeTitleHandler}
      autoFocus
    />
  ) : (
    <Typography
      variant="caption"
      className={classes.text}
      onDoubleClick={onEditMode}
    >
      {props.value}
    </Typography>
  );
});
