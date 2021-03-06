import Roact from "@rbxts/roact";
import { Signal } from "@rbxts/signals-tooling";
import { HttpService } from "@rbxts/services";

/**
 * Controls a dialog frame
 */
export class StudioDialogFrame {
	public readonly Opened = new Signal();
	public readonly Closed = new Signal();

	private _DockWidgetPluginGui: DockWidgetPluginGui;
	private _Handle?: Roact.ComponentInstanceHandle;

	public constructor(
		pluginReference: Plugin,
		name: string,
		title: string,
		size: Vector2,
		dockWidgetPluginGuiId?: string,
	) {
		if (dockWidgetPluginGuiId === undefined) {
			dockWidgetPluginGuiId = HttpService.GenerateGUID();
		}

		const dockWidgetPluginGuiInfo = new DockWidgetPluginGuiInfo(
			Enum.InitialDockState.Float,
			false,
			true,
			size.X,
			size.Y,
			size.X,
			size.Y,
		);
		const dockWidgetPluginGui = pluginReference.CreateDockWidgetPluginGui(
			dockWidgetPluginGuiId,
			dockWidgetPluginGuiInfo,
		);
		dockWidgetPluginGui.GetPropertyChangedSignal("Enabled").Connect(() => {
			if (dockWidgetPluginGui.Enabled) {
				this.Opened.fire();
			} else {
				this.Closed.fire();
			}
		});
		dockWidgetPluginGui.Name = name;
		dockWidgetPluginGui.Title = title;

		this._DockWidgetPluginGui = dockWidgetPluginGui;
	}

	/**
	 * Closes the dialog frame.
	 */
	public Close() {
		this._DockWidgetPluginGui.Enabled = false;
	}

	/**
	 * Destroys the dialog frame.
	 */
	public Destroy() {
		this.Opened.disconnectAll();
		this.Closed.disconnectAll();

		if (this._Handle !== undefined) {
			Roact.unmount(this._Handle);
		}
		this._DockWidgetPluginGui.Destroy();
	}

	/**
	 * Opens the dialog frame.
	 */
	public Open() {
		this._DockWidgetPluginGui.Enabled = true;
	}

	public SetContents(contents: Roact.Element) {
		if (this._Handle !== undefined) {
			Roact.unmount(this._Handle);
		}

		this._Handle = Roact.mount(contents, this._DockWidgetPluginGui);
	}
}
