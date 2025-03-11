import {allItems} from "./index";

export type ItemAction = {
    name: string; // Пользовательский нейм
    actionName: string; // Системный нейм
    action: (args: { [key: string]: any }) => void;
}

export type ItemParams = {
    id: string;
    name: string;
    description: string;
    weight: number;
    state?: string;
    price: number;
    actions: Array<ItemAction>
}

export class Item {
    id: string;
    name: string;
    description: string;
    weight: number;
    state?: string;
    price: number;
    actions: Array<ItemAction>;

    constructor(item: ItemParams) {
        this.id = item.id;
        this.name = item.name;
        this.description = item.description;
        this.state = item.state;
        this.weight = item.weight;
        this.price = item.price;

        // @ts-ignore
        this.actions = item.actions[0]?.action ? item.actions : allItems.find((item) => item.id === this.id)?.actions ?? [];
    }

    use = (actionName: string, args: { [key: string]: any }) => {
        const action = this.actions.find((action) => action.actionName === actionName);
        if (action) {
            action.action(args);
        } else {
            console.error(`Action "${actionName}" not found for item "${this.name}"`);
        }
    }
}