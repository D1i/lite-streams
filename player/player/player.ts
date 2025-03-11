export class Player {
    strength: number; // Сила
    dexterity: number; // Ловкость
    construction: number; // Телосложение
    intelligence: number; // Интелект
    wisdom: number; // Мудрость
    charisma: number; // Харизма
    modificationPossession: number;
    possession: Array<string> = [];
    professionalPossession: Array<string> = [];
    damageReceived: number;
    skills: Array<(args: any) => void> = [];
    hasTenacious: boolean = false;
    lvl: number = 1;
    healthMultiplier: number = 6;
    satiety: number = 100;
    thirst: number = 100;

    constructor(playerInitData?: {
        strength: number,
        dexterity: number,
        construction: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
        possession: Array<string>,
        professionalPossession: Array<string>
        damageReceived: number,
        modificationPossession: number,
        hasTenacious: boolean,
        lvl: number,
        healthMultiplier: number,
        satiety: number,
        thirst: number
    }) {
        if (playerInitData) {
            this.strength = playerInitData.strength;
            this.dexterity = playerInitData.dexterity;
            this.construction = playerInitData.construction;
            this.intelligence = playerInitData.intelligence;
            this.wisdom = playerInitData.wisdom;
            this.charisma = playerInitData.charisma;
            this.possession = playerInitData.possession;
            this.professionalPossession = playerInitData.professionalPossession;
            this.damageReceived = playerInitData.damageReceived;
            this.modificationPossession = playerInitData.modificationPossession;
            this.hasTenacious = playerInitData.hasTenacious;
            this.lvl = playerInitData.lvl;
            this.healthMultiplier = playerInitData.healthMultiplier;
            this.satiety = playerInitData.satiety;
        } else {
            this.strength = 10;
            this.dexterity = 10;
            this.construction = 10;
            this.intelligence = 10;
            this.wisdom = 10;
            this.charisma = 10;
            this.possession = [];
            this.professionalPossession = [];
            this.damageReceived = 0;
            this.modificationPossession = 0;
            this.hasTenacious = false;
            this.lvl = 1;
            this.healthMultiplier = 6;
            this.satiety = 100;
            this.thirst = 100;
        }
    }

    getModificationFor(str: string) {
        if (this.professionalPossession.includes(str)) {
            return this.modificationPossession * 2;
        }

        if (this.possession.includes(str)) {
            return this.modificationPossession;
        }

        return 0;
    }

    getAnyBasicCharacteristics(str: "strength" | "dexterity" | "construction" | "intelligence" | "wisdom" | "charisma") {
        return Math.floor(this[str] / 2) + this.getModificationFor(str);
    }

    get spasStrength() {
        return this.getAnyBasicCharacteristics("strength");
    }

    get spasDexterity() {
        return this.getAnyBasicCharacteristics("dexterity");
    }

    get spasConstruction() {
        return this.getAnyBasicCharacteristics("construction");
    }

    get spasIntelligence() {
        return this.getAnyBasicCharacteristics("intelligence");
    }

    get spasWisdom() {
        return this.getAnyBasicCharacteristics("wisdom");
    }

    get spasCharisma() {
        return this.getAnyBasicCharacteristics("charisma");
    }

    get hp() {
        return ((this.healthMultiplier + this.construction + (this.hasTenacious ? 2 : 0)) * this.lvl) - this.damageReceived;
    }

    // get damageForAA() {
    //
    // }
}