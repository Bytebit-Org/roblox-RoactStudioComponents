/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/types/plugin" />
/// <reference types="@rbxts/roact" />
import Roact from "@rbxts/roact";
import { Signal } from "@rbxts/roblox-SignalsTooling";
/**
 * Controls a dialog frame
 */
export declare class StudioDialogFrame {
    private _DockWidgetPluginGui;
    private _Handle?;
    readonly Opened: Signal<[]>;
    readonly Closed: Signal<[]>;
    constructor(pluginReference: Plugin, name: string, title: string, size: Vector2, dockWidgetPluginGuiId?: string);
    /**
     * Closes the dialog frame.
     */
    Close(): void;
    /**
     * Destroys the dialog frame.
     */
    Destroy(): void;
    /**
     * Opens the dialog frame.
     */
    Open(): void;
    SetContents(contents: Roact.Element): void;
}
