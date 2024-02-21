import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const {persistAtom} = recoilPersist();

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoryListState = atom<string[]>({
  key: 'categoryList',
  default: ["TO_DO", "DOING", "DONE"],
  effects_UNSTABLE: [ persistAtom ],
})

export const currCategoryState = atom<string>({
  key: 'currCategory',
  default: "TO_DO",
})

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [ persistAtom ],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({get}) => {
    const toDos = get(toDoState);
    const category = get(currCategoryState);
    return toDos.filter((toDo) => toDo.category === category);
  }
})

export const openModalState = atom<boolean>({
  key: 'openModal',
  default: false,
})