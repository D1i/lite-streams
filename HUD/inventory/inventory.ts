import {Item, ItemParams} from "../../items/item-sys";
import {Player} from "../../player";
import {Component} from "../component";
import {SpriteReader} from "../component/sprite-reader";

import sprites from "../component/sprits/basic-equipment.webp";

import style from "./style.module.css";

export class Inventory {
    elementRef: HTMLDivElement;
    items: Array<Item>;
    player: Player;

    constructor(elementRef: HTMLDivElement, player: Player, items: Array<ItemParams>) {
        this.elementRef = elementRef;
        this.items = items.map(item => new Item(item));
        this.player = player;

        this.renderElement();
    }

    renderElement() {
        new Component({
            type: "div",
            rootElement: this.elementRef,
            attributes: [
                {
                    name: "class",
                    value: style.main
                }
            ],
            children: [
                new Component({
                    type: "h1",
                    innerContent: "Характеристики персонажа"
                }),
                new Component({
                    type: "div",
                    style: {
                        border: "1px solid black",
                    },
                    children: [
                        new Component({
                            type: "div",
                            children: [
                                new Component({
                                    type: "h2",
                                    innerContent: "Статы персонажа"
                                }),
                                new Component({
                                    type: "p",
                                    innerContent: `Здоровье: ${this.player.hp}`
                                }),
                                new Component({
                                    type: "p",
                                    innerContent: `Сытость: ${this.player.satiety}`
                                }),
                                new Component({
                                    type: "p",
                                    innerContent: `Воды: ${this.player.thirst}`
                                })
                            ]
                        }),
                        new Component({
                            type: "div",
                            children: [
                                new Component({
                                    type: "h2",
                                    innerContent: "Харакетристики персонажа"
                                }),
                                new Component({
                                    type: "p",
                                    innerContent: `Сила: ${this.player.strength}`
                                }),
                                new Component({
                                    type: "p",
                                    innerContent: `Ловкость: ${this.player.dexterity}`
                                }),
                                new Component({
                                    type: "p",
                                    innerContent: `Конструкция: ${this.player.construction}`
                                }),
                                new Component({
                                    type: "p",
                                    innerContent: `Интеллект: ${this.player.intelligence}`
                                }),
                                new Component({
                                    type: "p",
                                    innerContent: `Мудрость: ${this.player.wisdom}`
                                }),
                                new Component({
                                    type: "p",
                                    innerContent: `Харизма: ${this.player.charisma}`
                                })
                            ]
                        }),
                        new Component({
                            type: "div",
                            attributes: [
                                {
                                    name: "class",
                                    value: style.items
                                }
                            ],
                            children: [
                                new Component({
                                    type: "h2",
                                    innerContent: "Инвентарь"
                                }),
                                ...this.items.map(item => new Component({
                                    type: "div",
                                    attributes: [
                                        {
                                            name: "class",
                                            value: style.item
                                        }
                                    ],
                                    children: [
                                        new Component({
                                            type: "p",
                                            innerContent: item.name
                                        }),
                                        new Component({
                                            type: "p",
                                            innerContent: `Вес: ${item.weight}`
                                        }),
                                        new Component({
                                            type: "div",
                                            attributes: [
                                                {
                                                    name: "class",
                                                    value: style.actions
                                                }
                                            ],
                                            children: [
                                                new Component({
                                                    type: "div",
                                                    innerContent: "Действия:"
                                                }),
                                                ...item.actions.map(action => new Component({
                                                    type: "button",
                                                    innerContent: action.name,
                                                    style: {margin: "5px"},
                                                    events: [{
                                                        handler: "click",
                                                        event: () => {
                                                            item.use(action.actionName, {
                                                                player: this.player,
                                                                items: this.items
                                                            });
                                                            this.renderElement();
                                                        },
                                                    }]
                                                }))
                                            ]
                                        }),
                                        new SpriteReader({
                                            spriteSheet: sprites, // Путь к файлу спрайтового атласа
                                            spriteWidth: 1.3, // 1 шаг (64px)
                                            spriteHeight: 1.3, // 1 шаг (64px)
                                            coordinates: [
                                                {x: 9, y: 13.1}, // Первый спрайт
                                            ],
                                            style: {border: "2px solid white"}
                                        }),
                                    ],
                                }))
                            ]
                        })
                    ]
                })
            ]
        })
    }
}