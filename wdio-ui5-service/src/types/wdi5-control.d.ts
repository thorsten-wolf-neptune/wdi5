/// <reference types="webdriverio/async" />
import { wdi5ControlMetadata, wdi5Selector } from "./wdi5.types";
/**
 * This is a bridge object to use from selector to UI5 control,
 * can be seen as a generic representation of a UI5 control
 */
export declare class WDI5Control {
    _controlSelector: wdi5Selector;
    _webElement: WebdriverIO.Element | string;
    _webdriverRepresentation: WebdriverIO.Element;
    _metadata: wdi5ControlMetadata;
    _wdio_ui5_key: string;
    _generatedUI5Methods: Array<string>;
    _initialisation: boolean;
    _forceSelect: boolean;
    _wdioBridge: WebdriverIO.Element;
    _generatedWdioMethods: Array<string>;
    _domId: string;
    _browserInstance: WebdriverIO.Browser;
    constructor(oOptions: any);
    init(controlSelector?: wdi5Selector, forceSelect?: boolean): Promise<this>;
    /**
     * after retrieving the ui5 control and connection this can be false eg. in cases when no DOM element was found by RecordReplay API
     * @return {Boolean} whether this control was sucessfully initialised
     */
    isInitialized(): boolean;
    getControlInfo(): wdi5ControlMetadata;
    setControlInfo(metadata?: wdi5ControlMetadata): wdi5ControlMetadata;
    /**
     * @return {WebdriverIO.Element} the webdriver Element
     */
    getWebElement(): Promise<WebdriverIO.Element>;
    /**
     * add conveniance to the getWebElement Function
     * @returns {WebdriverIO.Element} the webdriver Element
     */
    $(): WebdriverIO.Element;
    /**
     * @param id
     * @returns
     */
    renewWebElement(id?: string): Promise<WebdriverIO.Element>;
    /**
     * bridge to UI5 control api "getAggregation"
     * @param name name of the aggregation
     * @return array of UI5 controls representing the aggregation
     */
    getAggregation(name: string): Promise<any[]>;
    /**
     * enters a text into a UI5 control
     * @param text
     */
    enterText(text: string): Promise<this>;
    /**
     * click on a UI5 control
     * this works both on a standalone control as well as with the fluent async api
     */
    press(): Promise<this>;
    /**
     * Interact with specific control.
     * @param {object} oOptions
     * @param {sap.ui.test.RecordReplay.ControlSelector} oOptions.selector - UI5 type
     * @param {sap.ui.test.RecordReplay.InteractionType} oOptions.interactionType - UI5 type
     * @param {string} oOptions.enterText
     * @param {boolean} oOptions.clearTextFirst
     */
    interactWithControl(oOptions: any): Promise<any>;
    /**
     * fire a named event on a UI5 control
     * @param {String} eventName
     * @param {any} oOptions
     * @param {WebdriverIO.Element} webElement
     */
    fireEvent(eventName: any, oOptions: any, webElement?: string | WebdriverIO.Element): Promise<any>;
    /**
     * @deprecated -> use isInitialized()
     * @return {Boolean}
     */
    getInitStatus(): boolean;
    /**
     * retrieve UI5 control represenation of a UI5 control's aggregation
     *
     * @param aControls strings of IDs of aggregation items
     * @returns instances of wdi5 class per control in the aggregation
     */
    private _retrieveElements;
    /**
     * retrieve UI5 control represenation of a UI5 control's aggregation
     *
     * @param eControl ID
     * @returns instances of wdi5 class per control in the aggregation
     */
    private _retrieveElement;
    /**
     * attaches to the instance of this class the functions given in the parameter sReplFunctionNames
     *
     * @param sReplFunctionNames
     */
    private _attachControlBridge;
    private _attachWdioControlBridge;
    /**
     * runtime - proxied browser-time UI5 controls' method at Node.js-runtime
     *
     * @param methodName UI5 control method
     * @param webElement representation of selected UI5 control in wdio
     * @param args proxied arguments to UI5 control method at runtime
     */
    private _executeControlMethod;
    /**
     * retrieve an aggregation's members as UI5 controls
     *
     * @param aggregationName
     * @param webElement
     * @return {any}
     */
    private _getAggregation;
    /**
     * used to update the wdio control reference
     * this can be used to manually trigger an control reference update after a ui5 control rerendering
     * this method is also used wdi5-internally to implement the extended forceSelect option
     */
    private _renewWebElementReference;
    /**
     * retrieve a DOM element via UI5 locator
     * @param {sap.ui.test.RecordReplay.ControlSelector} controlSelector
     * @return {[WebdriverIO.Element | String, [aProtoFunctions]]} UI5 control or error message, array of function names of this control
     */
    private _getControl;
    private _writeObjectResultLog;
} 