// mock

// import {Process, ProcessorCore} from "./processor-core/processor-core";
// import {ProcessTypes} from "./processor-core/process-types";
// import {ProcessorPriorities} from "./processor-core/processor-priorities";
// import {fastPower, fibonacci, quickSort, sieveOfEratosthenes} from "./processor-core/mock-methods.ts";
//
// const processorCore = new ProcessorCore();
// processorCore.addProcess(new Process({
//     type: ProcessTypes.CALC,
//     priority: ProcessorPriorities.background,
//     method: () => {
//         console.log('1');
//         console.log(sieveOfEratosthenes(100000));
//     }
// }));
//
// processorCore.addProcess(new Process({
//     type: ProcessTypes.CALC,
//     priority: ProcessorPriorities.background,
//     method: () => {
//         console.log('2');
//         console.log(fibonacci(40));
//     }
// }));
//
// processorCore.addProcess(new Process({
//     type: ProcessTypes.CALC,
//     priority: ProcessorPriorities.critical,
//     method: () => {
//         console.log('3');
//         console.log(fastPower(2, 1000000, 1000000007));
//     }
// }));
//
// setInterval(() => {
//     processorCore.addProcess(new Process({
//         type: ProcessTypes.CALC,
//         priority: ProcessorPriorities.critical,
//         method: () => {
//             console.log('4');
//             console.log(quickSort(Array.from({ length: 10000 }, () => Math.random() * 10000)));
//         }
//     }));
// }, 5000);
//
// processorCore.runProcesses();
