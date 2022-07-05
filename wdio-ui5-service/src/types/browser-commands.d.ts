/// <reference types="openui5" />
import Control from "sap/ui/core/Control";
import { wdi5Selector } from "./wdi5.types";
import { WDI5Control } from "./wdi5-control";
/**
 * wdi5 control cache aka
 * wdi5 keeping score of already retrieved UI5 controls
 */
declare type cachedControl = {
    [key: string]: Control;
};
declare global {
    namespace WebdriverIO {
        interface Browser {
            asControl: (arg: wdi5Selector) => Promise<WDI5Control & Control>;
            // allControls: (arg: wdi5Selector) => Promise<WDI5Control & Control>;
            screenshot: (arg: string) => Promise<any>;
            goTo: (arg: string | object) => Promise<any>;
            /**
             * adding the wdi5 control cache to the global browser object
             */
            _controls: cachedControl[];
            getUI5Version: () => Promise<string>;
        }
    }
}
export { }; 