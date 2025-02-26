import {ProcessTypes} from "./process-types";
import {ProcessorPriorities} from "./processor-priorities";

type ProcessStructure = {
    type: ProcessTypes;
    method: Function; // Функция
    priority: ProcessorPriorities;
}

export class Process {
    type: ProcessTypes;
    method: Function; // Функция
    priority: ProcessorPriorities;

    constructor(process: ProcessStructure) {
        this.type = process.type;
        this.method = process.method;
        this.priority = process.priority;
    }

    run() {
        this.method();
    }
}

export class ProcessorCore {
    private flowBackground: Array<Process>;
    private flowMain: Array<Process>;
    private flowCore: Array<Process>;
    private flowCritical: Array<Process>;
    private allowForBackground: number;
    private allowForMain: number;
    private allowForCore: number;
    private allowForCritical: number;

    constructor() {
        this.flowBackground = [];
        this.flowMain = [];
        this.flowCore = [];
        this.flowCritical = [];
        this.allowForBackground = 30;
        this.allowForMain = 70;
        this.allowForCore = 150;
        this.allowForCritical = 750;
    }

    runTick(priority: "Critical" | "Core" | "Main" | "Background") {
        new Promise<void>(() => {
            let doneProcesses = 0;
            const startTime = Date.now();
            this[`flow${priority}`].some(process => {
                process.run();
                doneProcesses++

                if ((startTime + this[`allowFor${priority}`]) < Date.now()) {
                    return true;
                }
            });

            this[`flow${priority}`] = this[`flow${priority}`].slice(doneProcesses);
        })
    }

    async runProcesses() {
        await new Promise((resolve) => {
            resolve(this.runTick("Critical"));
        });
        await new Promise((resolve) => {
            resolve(this.runTick("Core"));
        });
        await new Promise((resolve) => {
            resolve(this.runTick("Main"));
        });
        await new Promise((resolve) => {
            resolve(this.runTick("Background"));
        });

        if (
            this.flowCritical.length > 0 ||
            this.flowCore.length > 0 ||
            this.flowMain.length > 0 ||
            this.flowBackground.length > 0
        ) {
            this.runProcesses();
        }
    }

    addProcess(process: Process) {
        switch (process.priority) {
            case ProcessorPriorities.background:
                this.flowBackground.push(process);
                break;
            case ProcessorPriorities.main:
                this.flowMain.push(process);
                break;
            case ProcessorPriorities.core:
                this.flowCore.push(process);
                break;
            case ProcessorPriorities.critical:
                this.flowCritical.push(process);
                break;
            default:
                throw new Error('Unknown process priority');
        }
        this.runProcesses();
    }
}

