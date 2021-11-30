import { atom } from 'recoil';
export const counterState = atom({
    key: 'counterState',
    default: [], //A comma is required!
});