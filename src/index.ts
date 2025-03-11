import {Inventory} from "../HUD/inventory/inventory";
import {Player} from "../player";
import {Sync} from "../items/mock-save";
import {consumables} from "../items/consumables";

const rootElement = document.querySelector("#root")!;

const sync = new Sync();

const playerName = sync.getUserName() ?? prompt("Введите имя персонажа:") ?? "Saya";

sync.setUserName(playerName);

let player = null;

let items = null;

if (sync.getPlayerData(playerName)) {
    const playerData = sync.getPlayerData(playerName);

    player = new Player(playerData.player);

    console.log(playerData)
    console.log(player)

    items = new Inventory(rootElement, player, playerData.items);
} else {
    player = new Player();
    items = {items: consumables};

    sync.abinitPlayer(playerName, {
        player: player,
        items: consumables,
    });

    new Inventory(rootElement, player, consumables);
}

document.querySelector("#save")!.addEventListener("click", () => {
    sync.abinitPlayer(playerName, {
        player: player,
        items: items.items,
    });
    console.log("Игровая информация сохранена");
});

document.querySelector("#rename")!.addEventListener("click", () => {
    const newName = prompt("Введите новое имя:")!;
    sync.renamePlayer(playerName, newName);
});