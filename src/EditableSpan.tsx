import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@material-ui/core';

type EditableSpanPropsType = {
  value: string;
  getNewTitle: (title: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>(props.value);

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    setEditMode(false);
    const newTitle = title.trim();

    newTitle && props.getNewTitle(newTitle);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField
      type="text"
      value={title}
      onBlur={offEditMode}
      onChange={changeHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={onEditMode}>{props.value}</span>
  );
}
