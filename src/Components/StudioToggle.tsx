/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import IStudioToggleProperties from "../Interfaces/IStudioToggleProperties";
import IStudioToggleState from "../Interfaces/IStudioToggleState";

const _SIZE = new UDim2(0, 27, 0, 16);

const _IMAGES = new Map<string, Map<boolean, string>>([
	["Dark", new Map<boolean, string>([
		[false, "rbxasset://textures/TerrainTools/import_toggleOff_dark.png"],
		[true, "rbxasset://textures/TerrainTools/import_toggleOn_dark.png"]
	])],
	["Light", new Map<boolean, string>([
		[false, "rbxasset://textures/TerrainTools/import_toggleOff.png"],
		[true, "rbxasset://textures/TerrainTools/import_toggleOn.png"]
	])]
])

export class StudioToggle extends Roact.Component<IStudioToggleProperties, IStudioToggleState> {
    constructor(props: IStudioToggleProperties) {
        super(props);
        
        this.setState({
            IsMouseOver: false,
            IsPressed: false,
			IsSelected: false,
			IsOn: this.props.IsOnByDefault
        } as IStudioToggleState);
	}
	
    public render(): Roact.Element {
		const theme = settings().Studio.Theme;

        return <imagebutton
			Key={"Toggle"}
			Active={this.props.Active !== undefined ? this.props.Active : true}
			AutoButtonColor={false}
            BackgroundTransparency={1}
            BorderSizePixel={0}
			LayoutOrder={this.props.LayoutOrder !== undefined ? this.props.LayoutOrder : 0}
			Image={_IMAGES.get(theme.Name)!.get(this.state.IsOn)}
            Rotation={this.props.Rotation !== undefined ? this.props.Rotation : 0}
            Size={_SIZE}
            Visible={this.props.Visible !== undefined ? this.props.Visible : true}
			Event={{
				MouseButton1Click: () => {
					const isOn = !this.state.IsOn;

                    this.setState({
                        IsOn: isOn
					} as IStudioToggleState);
					
                    if (this.props.Events !== undefined && this.props.Events.Toggled !== undefined) {
						this.props.Events.Toggled(isOn);
                    }
				}
			}} />;
    }
}