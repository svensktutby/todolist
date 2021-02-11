import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';

export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
