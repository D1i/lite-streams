import {Component, Style} from "./component";

type SpriteReaderProps = {
    rootElement?: Element;
    spriteSheet: string; // Путь к файлу с множеством спрайтов
    spriteWidth: number; // Ширина спрайта (в шагах 64px)
    spriteHeight: number; // Высота спрайта (в шагах 64px)
    coordinates: { x: number; y: number }[]; // Координаты спрайтов в файле
    style?: Style;
};

export class SpriteReader extends Component {
    spriteSheet: string;
    spriteWidth: number;
    spriteHeight: number;
    coordinates: { x: number; y: number }[];

    constructor(props: SpriteReaderProps) {
        super({
            ...props,
            type: "div",
            style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
                gap: "10px",
                background: "#2a2a2a",
                borderRadius: "10px",
                width: `${props.spriteWidth * 64}px`,
                height: `${props.spriteHeight * 64}px`,
                ...props.style
            }
        });

        this.spriteSheet = props.spriteSheet;
        this.spriteWidth = props.spriteWidth * 64;
        this.spriteHeight = props.spriteHeight * 64;
        this.coordinates = props.coordinates;
        this.renderSprites();
    }

    renderSprites(): void {
        this.children = this.coordinates.map(({ x, y }) => new Component({
            type: "div",
            style: {
                width: `${this.spriteWidth}px`,
                height: `${this.spriteHeight}px`,
                backgroundImage: `url(${this.spriteSheet})`,
                backgroundPosition: `-${x * 64}px -${y * 64}px`,
                backgroundSize: "auto",
                imageRendering: "pixelated"
            }
        }));

        this.render();
    }
}