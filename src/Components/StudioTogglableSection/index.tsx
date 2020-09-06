import Roact from "@rbxts/roact";
import { IStudioTogglableSectionProperties } from "Interfaces/IStudioTogglableSectionProperties";
import { StudioTogglableSectionHeader } from "./StudioTogglableSectionHeader";
import { IStudioTogglableSectionState } from "Interfaces/IStudioTogglableSectionState";

export class StudioFrame extends Roact.Component<IStudioTogglableSectionProperties, IStudioTogglableSectionState> {
	public static readonly defaultProps = {
		Active: true,
		AnchorPoint: new Vector2(0, 0),
		BorderSizePixel: 1,
		ClipsDescendants: false,
		ContentHeight: new UDim2(0, 0, 0, 0),
		Position: new UDim2(0, 0, 0, 0),
		Visible: true,
	};

	public constructor(props: IStudioTogglableSectionProperties) {
		super(props);

		if (props.StartOpen) {
			this.setState({
				IsOpen: true,
			});
		}
	}

	public render(): Roact.Element {
		const props = this.props;
		const state = this.state;

		const theme = settings().Studio.Theme;

		const widthUDim = props.Width ?? new UDim(1, 0);

		let heightUDim = new UDim(0, StudioTogglableSectionHeader.HeightOffset);
		if (state.IsOpen && props.ContentHeight !== undefined) {
			heightUDim = heightUDim.add(props.ContentHeight);
		}

		return (
			<frame
				Active={props.Active}
				AnchorPoint={props.AnchorPoint}
				BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
				BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
				BorderMode={Enum.BorderMode.Inset}
				BorderSizePixel={props.BorderSizePixel}
				ClipsDescendants={true}
				LayoutOrder={props.LayoutOrder !== undefined ? props.LayoutOrder : 0}
				Position={props.Position}
				Rotation={props.Rotation !== undefined ? props.Rotation : 0}
				Size={new UDim2(widthUDim, heightUDim)}
				Visible={props.Visible}
			>
				<StudioTogglableSectionHeader
					Key={"StudioTogglableSectionHeader"}
					IsOpen={state.IsOpen}
					Title={props.Title}
					Events={{
						MouseButton1Click: () =>
							this.setState(currentState => {
								props.Events?.OnToggled?.(!currentState.IsOpen);

								return {
									IsOpen: !currentState.IsOpen,
								};
							}),
					}}
				/>
				<frame
					Key={"ContentsFrame"}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					Position={UDim2.fromOffset(0, StudioTogglableSectionHeader.HeightOffset)}
					Size={new UDim2(widthUDim, props.ContentHeight ?? new UDim(0, 0))}
				>
					{props[Roact.Children]}
				</frame>
			</frame>
		);
	}
}
