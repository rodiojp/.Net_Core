import { makeObservable, observable, action } from 'mobx';

export class CounterObservable {

    counter = 0;

    constructor() {
        makeObservable(this, {
            counter: observable,
            increment: action,
        });
    }
    increment = amount => this.counter += amount;

}
