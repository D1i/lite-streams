import {Process, ProcessorCore} from "./processor-core/processor-core";
import {ProcessTypes} from "./processor-core/process-types";
import {ProcessorPriorities} from "./processor-core/processor-priorities";

const processorCore = new ProcessorCore();

processorCore.addProcess(new Process({
    type: ProcessTypes.CALC,
    priority: ProcessorPriorities.background,
    method: () => {
        console.log('HUI')
    }
}))

processorCore.runProcesses();
