export type Style = { [key: string]: string };

export class Component {
    component: Element;
    children?: Array<Component> | null;
    innerContent?: string | null;
    style?: Style | null;
    preRenderProcesses?: Array<(element: Element) => void>;

    constructor(props: {
        rootElement?: Element,
        children?: Array<Component>,
        innerContent?: string,
        style?: Style,
        events?: Array<{ handler: string, event: (event: any) => void }>
        attributes?: Array<{ name: string, value: string }>
        type: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "button" | "img",
        preRenderProcesses?: Array<(element: Element) => void>;
    }) {
        this.component = document.createElement(props.type);
        this.children = props.children ?? null;
        this.innerContent = props.innerContent;
        this.style = props.style ?? null;

        if (props.attributes) {
            props.attributes.forEach(({name, value}) => this.component.setAttribute(name, value));
        }

        if (props.rootElement) {
            props.rootElement.innerHTML = "";
            props.rootElement.appendChild(this.component);
        }

        if (props.style) {
            this.setStyle(props.style);
        }

        if (props.events) {
            this.setEvents(props.events);
        }

        this.render();
    }

    setStyle(style: Style): void {
        // @ts-ignore
        Object.keys(style).forEach(key => this.component.style[key] = style[key]);
    }

    setEvents(events: Array<{ handler: string, event: (event?: any) => void }>): void {
        events.forEach(({handler, event}) => {
            this.component.addEventListener(handler, event);
        });
    }

    setAttribute(name: string, value: string): void {
        this.component.setAttribute(name, value);
    }

    renderInRoot(rootElement: Element): void {
        rootElement.appendChild(this.component);

        this.render();
    }

    render(): void {
        if (this.preRenderProcesses) {
            this.preRenderProcesses.forEach(process => process(this.component));
        }
        if (this.children) {
            this.component.innerHTML = "";
            this.children.forEach(child => {
                child.renderInRoot(this.component);
            });
        } else if (this.innerContent) {
            this.component.innerHTML = "";
            this.component.innerHTML = this.innerContent;
        }
    }
}