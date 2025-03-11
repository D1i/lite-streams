import {Item, ItemParams} from "./item-sys";
import {Player} from "../player";

export const consumables: Array<ItemParams> = [
    {
        id: "001",
        name: "Вино обычное (кружка)",
        description: "Приятное вино с умеренным вкусом.",
        weight: 2,
        price: 20,
        actions: [
            {
                name: "Выпить",
                actionName: "drink",
// @ts-ignore
                action: (data: { player: Player }) => {
                    data.player.satiety += 30;
                    data.player.thirst -= 20;
                }
            },
            {
                name: "Продать",
                actionName: "sell",
                // @ts-ignore
                action: (data: { player: Player, items: Array<Item> }) => {
                    const goldCoin = data.items.find(item => item.id === "gold_coin");

                    if (goldCoin) {
                        for (let i = 0; i < 20; i++) {
                            data.items.push({...goldCoin});
                        }
                    }

                    // Удаляем предмет из инвентаря
                    const itemIndex = data.items.findIndex(item => item.id === "001");
                    if (itemIndex !== -1) {
                        data.items.splice(itemIndex, 1);
                    }
                }
            }
        ]
    },
    {
        id: "002",
        name: "Вино отличное (бутылка)",
        description: "Редкое и вкусное вино.",
        weight: 5,
        price: 1000,
        actions: [
            {
                name: "Выпить",
                actionName: "drink",
// @ts-ignore
                action: (data: { player: Player }) => {
                    data.player.satiety += 25;
                    data.player.thirst += 80;
                }
            }
        ]
    },
    {
        id: "003",
        name: "Мясо, жаренное, кусок",
        description: "Мясо, жаренное, кусок.",
        weight: 2,
        price: 300,
        actions: [
            {
                name: "Съесть",
                actionName: "eat",
// @ts-ignore
                action: (data: { player: Player }) => {
                    data.player.satiety += 50;
                    data.player.thirst -= 20;
                }
            }
        ]
    },
    {
        id: "004",
        name: "Пиво галлон (4 литра)",
        description: "Терпкое и вкусное пиво.",
        weight: 4,
        price: 200,
        actions: [
            {
                name: "Выпить",
                actionName: "drink",
// @ts-ignore
                action: (data: { player: Player }) => {
                    data.player.satiety += 60;
                    data.player.thirst += 180;
                }
            }
        ]
    },
    {
        id: "005",
        name: "Пиво кружка",
        description: "Дешевое пойло",
        weight: 2,
        price: 4,
        actions: [
            {
                name: "Выпить",
                actionName: "drink",
// @ts-ignore
                action: (data: { player: Player }) => {
                    data.player.satiety += 10;
                    data.player.thirst += 40;
                }
            }
        ]
    },
    {
        id: "006",
        name: "Rations (1 day)",
        description: "Рационы состоят из обезвоженной пищи, подходящей для путешествий, включая вяленое мясо, сухофрукты, галеты и орехи.",
        weight: 1,
        price: 50,
        actions: [
            {
                name: "Съесть",
                actionName: "eat",
// @ts-ignore
                action: (data: { player: Player }) => {
                    data.player.satiety += 250;
                    data.player.thirst += 250;
                }
            }
        ]
    },
    {
        id: "007",
        name: "Сыр, кусок",
        description: "Сырный сыр. Копченый и соленый",
        weight: 1,
        price: 1000,
        actions: [
            {
                name: "Съесть",
                actionName: "eat",
// @ts-ignore
                action: (data: { player: Player }) => {
                    data.player.satiety += 150;
                    data.player.thirst -= 50;
                }
            }
        ]
    },
    {
        id: "008",
        name: "Торжественный ужин",
        description: "Торжественный ужин на 1 персону",
        weight: 10,
        price: 1000,
        actions: [
            {
                name: "Съесть",
                actionName: "eat",
// @ts-ignore
                action: (data: { player: Player }) => {
                    data.player.satiety += 1000;
                    data.player.thirst += 1000;
                }
            }
        ]
    },
    {
        id: "009",
        name: "Хлеб, ломоть",
        description: "Черствый, но питательный",
        weight: 1,
        price: 2,
        actions: [
            {
                name: "Съесть",
                actionName: "eat",
// @ts-ignore
                action: (data: { player: Player }) => {
                    data.player.satiety += 50;
                    data.player.thirst -= 50;
                }
            }
        ]
    },
    {
        id: "gold_coin",
        name: "Золотая монета",
        description: "Блестящая золотая монета.",
        weight: 0.01,
        price: 1,
        actions: []
    }
];