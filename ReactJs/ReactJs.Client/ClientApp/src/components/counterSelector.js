import { counterState } from './counterState'
import { selector } from 'recoil';
export const counterSelector = selector({
    key: 'counterSelector',
    get: ({ get }) => {
        const clicksData = get(counterState);
        const totalClicks = clicksData.reduce((sum, click) => { return sum + click.amount; }, 0);
        return totalClicks;
    },
});