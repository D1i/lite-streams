export class Sync {
    abinitPlayer = (playerName: string, data: { [key: string]: any }) => {
        localStorage.setItem(`player-${playerName}`, JSON.stringify(data));
    }

    updatePlayer = (playerName: string, key: string, value: any) => {
        const playerData = JSON.parse(localStorage.getItem(`player-${playerName}`) || '{}');
        playerData[key] = value;
        localStorage.setItem(`player-${playerName}`, JSON.stringify(playerData));
    }

    getPlayerData = (playerName: string) => {
        if (!localStorage.getItem(`player-${playerName}`)) {
            return null;
        }
        return JSON.parse(localStorage.getItem(`player-${playerName}`) || '{}');
    }

    setUserName = (userName: string) => {
        localStorage.setItem('userName', userName);
    }

    getUserName = () => {
        return localStorage.getItem('userName');
    }

    renamePlayer = (playerName: string, newName: string) => {
        const playerData = this.getPlayerData(playerName);
        if (playerData) {
            this.setUserName(newName);
            this.updatePlayer(newName, 'playerName', playerName);
            localStorage.removeItem(`player-${playerName}`);
        }
    }
}