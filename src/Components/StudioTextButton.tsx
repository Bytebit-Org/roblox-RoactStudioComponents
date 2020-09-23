/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import { DeriveColorModifier } from "../Common/StudioComponentUtilities";
import IStudioTextButtonProperties from "../Interfaces/IStudioTextButtonProperties";
import IStudioComponentState from "../Interfaces/IStudioComponentState";

export class StudioTextButton extends Roact.Component<IStudioTextButtonProperties, IStudioComponentState> {
	public static readonly HeightUDim = new UDim(0, 22);
	public static readonly defaultProps = {
		Active: true,
		AnchorPoint: new Vector2(0, 0),
		BackgroundColorEnum: Enum.StudioStyleGuideColor.Button,
		BorderColorEnum: Enum.StudioStyleGuideColor.ButtonBorder,
		LayoutOrder: 0,
		Position: new UDim2(0, 0, 0, 0),
		Rotation: 0,
		TextColorEnum: Enum.StudioStyleGuideColor.ButtonText,
		Width: new UDim(1, 0),
		Visible: true,
	};

	public constructor(props: IStudioTextButtonProperties) {
		super(props);

		this.setState({
			IsMouseOver: false,
			IsPressed: false,
			IsSelected: false,
		});
	}

	public render(): Roact.Element {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const props = this.props as Required<IStudioTextButtonProperties>;
		const theme = settings().Studio.Theme;
		const styleGuideModifier = DeriveColorModifier(props, this.state);

		return (
			<textbutton
				Active={props.Active}
				AnchorPoint={props.AnchorPoint}
				AutoButtonColor={false}
				BackgroundColor3={theme.GetColor(props.BackgroundColorEnum, styleGuideModifier)}
				BorderColor3={theme.GetColor(props.BorderColorEnum, styleGuideModifier)}
				BorderSizePixel={1}
				Font={Enum.Font.SourceSans}
				LayoutOrder={props.LayoutOrder}
				Position={props.Position}
				Rotation={props.Rotation}
				Size={new UDim2(props.Width, StudioTextButton.HeightUDim)}
				Text={props.Text}
				TextColor3={theme.GetColor(
					props.TextColorEnum,
					props.ForcedTextColorStyleGuideModifier ?? styleGuideModifier,
				)}
				TextSize={16}
				TextXAlignment={Enum.TextXAlignment.Center}
				TextYAlignment={Enum.TextYAlignment.Center}
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
						if (props.Events === undefined || props.Events.MouseButton1Click === undefined) {
							return;
						}
						props.Events.MouseButton1Click();
					},
				}}
			/>
		);
	}
}
