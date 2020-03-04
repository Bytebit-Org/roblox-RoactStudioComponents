/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import IStudioToggleProperties from "../Interfaces/IStudioToggleProperties";
import IStudioToggleState from "../Interfaces/IStudioToggleState";
import { StudioComponentSprites } from "Data/Spritesheets";

const _SIZE = new UDim2(0, 27, 0, 16);

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

		const spriteRegion = this.getSpriteRegion(theme, this.state.IsOn);

        return <imagebutton
			Key={"Toggle"}
			Active={this.props.Active !== undefined ? this.props.Active : true}
			AutoButtonColor={false}
            BackgroundTransparency={1}
            BorderSizePixel={0}
			LayoutOrder={this.props.LayoutOrder !== undefined ? this.props.LayoutOrder : 0}
			Image={StudioComponentSprites.image}
			ImageRectOffset={spriteRegion.offset}
			ImageRectSize={spriteRegion.size}
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
	
	private getSpriteRegion(theme: StudioTheme, isOn: boolean) {
		if (theme.Name === "Light") {
			if (isOn) {
				return StudioComponentSprites.sprites.toggleOnLight;
			} else {
				return StudioComponentSprites.sprites.toggleOffLight;
			}
		} else {
			if (isOn) {
				return StudioComponentSprites.sprites.toggleOnDark;
			} else {
				return StudioComponentSprites.sprites.toggleOffDark;
			}
		}
	}
}