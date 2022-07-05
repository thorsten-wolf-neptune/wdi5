/// <reference types="webdriverio/async" />
/// <reference types="openui5" />
import Log from "sap/base/Log";
import RecordReplay from "sap/ui/test/RecordReplay";
import { ControlSelector } from "sap/ui/test/RecordReplay";
export declare type wdi5LogLevel = "silent" | "error" | "verbose";
export interface wdi5Config extends WebdriverIO.Config {
    wdi5: {
        /** wdi5-specific logging of UI5-related operations */
        logLevel?: wdi5LogLevel;
        /**
         * FQDN-suffix to append to `baseUrl` of wdio config,
         * typically "index.html"
         * @example http://localhost:8080/index.html -> "index.html"
         * @example https://ui5.sap.com/anotherIndex.html -> "anotherIndex.html"
         */
        url: string;
        /** path relative to the command `wdio` is run from to store screenshots */
        screenshotPath?: string;
        /**
         * whether to generally disable/enable screenshots
         */
        screenshotsDisabled?: boolean;
        /**
         * late-inject wdi5 <-> UI5 bridge, useful for testing in hybrid non-UI5/UI5 apps
         */
        skipInjectUI5OnStart?: boolean;
        /**
         * maximum waiting time while checking for UI5 (control) availability
         */
        waitForUI5Timeout?: number;
    };
}
interface wdi5ControlSelector {
    /**
     * Descendant matcher, {@link sap.ui.test.matchers.Descendant}
     */
    descendant?: any;
    /**
     * ID of a control (global or within viewName, if viewName is defined)
     */
    id?: string | RegExp;
    /**
     * Name of the control's view parent
     */
    viewName?: string;
    /**
     * Fully qualified control class name in dot notation, eg: "sap.m.ObjectHeader"
     */
    controlType?: string;
    /**
     * Binding path matcher, {@link sap.ui.test.matchers.BindingPath}
     */
    bindingPath?: Record<string, unknown>;
    /**
     * I18N Text matcher, {@link sap.ui.test.matchers.i18NText}
     */
    i18NText?: Record<string, unknown>;
    /**
     * Label matcher, {@link sap.ui.test.matchers.LabelFor}
     */
    labelFor?: Record<string, unknown>;
    /**
     * Properties matcher, {@link sap.ui.test.matchers.Properties}
     */
    properties?: Record<string, unknown>;
    /**
     * Ancestor matcher, {@link sap.ui.test.matchers.Ancestor}
     */
    ancestor?: Record<string, unknown>;
    /**
     * Sibling matcher, {@link sap.ui.test.matchers.Sibling}
     */
    sibling?: Record<string, unknown>;
    /**
     * Interactable matcher, {@link sap.ui.test.matchers.Interactable}
     */
    interactable?: Record<string, unknown>;
}
export interface wdi5Selector {
    /**
     * optional unique internal key to map and find a control
     * if not provided, wdi5 will calculate a unique key
     */
    wdio_ui5_key?: string;
    /**
     * forces the to re-retrieve the control from the browser context,
     * even if it was retrieved previously
     */
    forceSelect?: boolean;
    /**
     * OPA5-style selectors from RecordReplay
     */
    selector: wdi5ControlSelector;
}
/**
 * 0 = success
 * 1 = error
 */
export declare type wdi5StatusCode = 0 | 1;
export interface clientSide_ui5Response {
    status: wdi5StatusCode;
    result?: any;
    message?: string;
    domElement?: WebdriverIO.Element;
    id?: string;
    aProtoFunctions?: Array<string>;
    className?: string;
    returnType?: string;
    nonCircularResultObject?: any;
}
/**
 *
 */
export interface wdi5ControlMetadata {
    id?: string;
    methods?: string[];
    className?: string;
    $?: Array<string>;
    key?: string;
}
export interface wdi5Bridge extends Window {
    bridge: RecordReplay;
    wdi5: {
        createMatcher: (selector: ControlSelector) => ControlSelector;
        getUI5CtlForWebObj: (ui5Control: any) => any;
        retrieveControlMethods: (ui5Control: any) => string[];
        isPrimitive: (value: any) => boolean;
        createControlIdMap: (ui5Controls: any[]) => Map<"id", string>;
        createControlId: (ui5Control: any) => {
            id: string;
        };
        isInitialized: boolean;
        Log: Log;
        waitForUI5Options: {
            timeout: number;
            interval: number;
        };
    };
}
export {}; 