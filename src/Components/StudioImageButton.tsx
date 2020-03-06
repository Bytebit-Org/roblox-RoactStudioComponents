/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import { DeriveColorModifier } from "../Common/StudioComponentUtilities";
import IStudioImageButtonProperties from "../Interfaces/IStudioImageButtonProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";

export class StudioImageButton extends Roact.Component<IStudioImageButtonProperties, IStudioComponentState> {
	public static readonly HeightUDim = new UDim(0, 22);
	public static readonly defaultProps = {
		Active: true,
		AnchorPoint: new Vector2(0, 0),
		BackgroundColorEnum: Enum.StudioStyleGuideColor.Button,
		BorderColorEnum: Enum.StudioStyleGuideColor.ButtonBorder,
		ImageColor3: new Color3(1, 1, 1),
		ImageRectOffset: new Vector2(0, 0),
		ImageRectSize: new Vector2(0, 0),
		Position: new UDim2(0, 0, 0, 0),
		Width: new UDim(1, 0),
		Visible: true,
	};

	public constructor(props: IStudioImageButtonProperties) {
		super(props);

		this.setState({
			IsMouseOver: false,
			IsPressed: false,
			IsSelected: false,
		});
	}

	public render(): Roact.Element {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const props = this.props as Required<IStudioImageButtonProperties>;

		const theme = settings().Studio.Theme;
		const styleGuideModifier = DeriveColorModifier(this.props, this.state);

		return (
			<textbutton
				Active={props.Active}
				AnchorPoint={props.AnchorPoint}
				AutoButtonColor={false}
				BackgroundColor3={theme.GetColor(props.BackgroundColorEnum, styleGuideModifier)}
				BorderColor3={theme.GetColor(props.BorderColorEnum, styleGuideModifier)}
				BorderSizePixel={1}
				LayoutOrder={props.LayoutOrder !== undefined ? props.LayoutOrder : 0}
				Position={props.Position}
				Rotation={props.Rotation !== undefined ? props.Rotation : 0}
				Size={new UDim2(props.Width, StudioImageButton.HeightUDim)}
				Text={""}
				Visible={props.Visible}
				// Events
				Event={{
					MouseEnter: () => {
						this.setState({
							IsMouseOver: true,
						});
					},
					MouseLeave: () => {
						this.setState({
							IsMouseOver: false,
						});
					},
					MouseButton1Down: () => {
						this.setState({
							IsPressed: true,
						});
					},
					MouseButton1Up: () => {
						this.setState({
							IsPressed: false,
						});
					},
					SelectionGained: () => {
						this.setState({
							IsSelected: true,
						});
					},
					SelectionLost: () => {
						this.setState({
							IsSelected: false,
						});
					},
					MouseButton1Click: () => {
						if (this.props.Events !== undefined && this.props.Events.MouseButton1Click !== undefined) {
							this.props.Events.MouseButton1Click();
						}
					},
				}}
			>
				<imagelabel
					Active={false}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Image={this.props.Image}
					ImageColor3={this.props.ImageColor3}
					ImageRectOffset={this.props.ImageRectOffset}
					ImageRectSize={this.props.ImageRectSize}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(1, -4, 1, -4)}
				/>
			</textbutton>
		);
	}
}
