import Roact from "@rbxts/roact";
import { Constants } from "Data/Constants";
import { StudioScrollBarButton } from "./StudioScrollBarButton";
import { Dumpster } from "@rbxts/dumpster";
import { RunService } from "@rbxts/services";

interface IStudioScrollBarProperties {
	GripLengthPercentage: number;
	GripTrackPositionPercentage: number;
	Length: UDim;
	ScrollDirection: Enum.ScrollingDirection.X | Enum.ScrollingDirection.Y;
	Position: UDim2;

	ScrollButtonPressed: (direction: number) => void;
	ScollGripDragged: (trackLengthPercentageTraveled: number) => void;
}

interface IStudioScrollBarState {
	IsDecrementButtonPressed: boolean;
	IsIncrementButtonPressed: boolean;

	IsGripBeingDragged: boolean;
}

export class StudioScrollBar extends Roact.Component<IStudioScrollBarProperties, IStudioScrollBarState> {
	private trackPressedDumpster: Dumpster;

	public constructor(props: IStudioScrollBarProperties) {
		super(props);

		this.trackPressedDumpster = new Dumpster();

		this.setState({
			IsDecrementButtonPressed: false,
			IsIncrementButtonPressed: false,
			IsGripBeingDragged: false,
		});
	}

	public render(): Roact.Element {
		const theme = settings().Studio.Theme;

		const isVerticalScrollBar = this.props.ScrollDirection === Enum.ScrollingDirection.Y;

		const size = isVerticalScrollBar
			? new UDim2(new UDim(0, Constants.ScrollBar.ThicknessInPixels), this.props.Length)
			: new UDim2(this.props.Length, new UDim(0, Constants.ScrollBar.ThicknessInPixels));

		const trackPosition = isVerticalScrollBar
			? new UDim2(0, 0, 0, Constants.ScrollBar.ThicknessInPixels - 1)
			: new UDim2(0, Constants.ScrollBar.ThicknessInPixels - 1, 0, 0);
		const trackSize = isVerticalScrollBar
			? new UDim2(1, 0, 1, 2 - 2 * Constants.ScrollBar.ThicknessInPixels)
			: new UDim2(1, 2 - 2 * Constants.ScrollBar.ThicknessInPixels, 1, 0);

		const gripPosition = isVerticalScrollBar
			? new UDim2(0, -1, this.props.GripTrackPositionPercentage, -1)
			: new UDim2(this.props.GripTrackPositionPercentage, -1, 0, -1);
		const gripSize = isVerticalScrollBar
			? new UDim2(1, 2, this.props.GripLengthPercentage, 2)
			: new UDim2(this.props.GripLengthPercentage, 2, 1, 2);
		const gripStyleGuideModifier = this.state.IsGripBeingDragged
			? Enum.StudioStyleGuideModifier.Pressed
			: Enum.StudioStyleGuideModifier.Default;

		const decrementButtonImageRotation = isVerticalScrollBar ? 0 : 270;
		const incrementButtonImageRotation = isVerticalScrollBar ? 180 : 90;
		const incrementButtonAnchorPoint = isVerticalScrollBar ? new Vector2(0, 1) : new Vector2(1, 0);
		const incrementButtonPosition = isVerticalScrollBar ? new UDim2(0, 0, 1, 0) : new UDim2(1, 0, 0, 0);

		return (
			<frame BackgroundTransparency={1} BorderSizePixel={0} Position={this.props.Position} Size={size}>
				<StudioScrollBarButton
					Key={`DecrementButton`}
					AnchorPoint={new Vector2(0, 0)}
					Position={new UDim2(0, 0, 0, 0)}
					Rotation={decrementButtonImageRotation}
					OnActivated={() => this.props.ScrollButtonPressed(-1)}
				/>
				<frame
					Key={`ScrollTrack`}
					BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.ScrollBarBackground)}
					BackgroundTransparency={0}
					BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
					BorderMode={Enum.BorderMode.Inset}
					BorderSizePixel={1}
					Position={trackPosition}
					Size={trackSize}
					Event={{
						InputBegan: (instance, inputObject) => {
							if (inputObject.UserInputType === Enum.UserInputType.MouseButton1) {
								this.handleTrackPressStarted(instance, inputObject);
							}
						},
						InputEnded: (instance, inputObject) => {
							if (
								inputObject.UserInputType === Enum.UserInputType.MouseButton1 ||
								inputObject.UserInputType === Enum.UserInputType.MouseMovement
							) {
								this.handleTrackPressStopped();
							}
						},
					}}
				>
					<frame
						Key={`ScrollGrip`}
						BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.ScrollBar, gripStyleGuideModifier)}
						BackgroundTransparency={0}
						BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
						BorderMode={Enum.BorderMode.Inset}
						BorderSizePixel={1}
						Position={gripPosition}
						Size={gripSize}
						Event={{
							InputBegan: (instance, inputObject) => {
								if (inputObject.UserInputType === Enum.UserInputType.MouseButton1) {
									this.setState({
										IsGripBeingDragged: true,
									});
								}
							},
						}}
					/>
				</frame>
				<StudioScrollBarButton
					Key={`IncrementButton`}
					AnchorPoint={incrementButtonAnchorPoint}
					Position={incrementButtonPosition}
					Rotation={incrementButtonImageRotation}
					OnActivated={() => this.props.ScrollButtonPressed(1)}
				/>
				<frame
					Key={`DragTarget`}
					BackgroundTransparency={1}
					Position={new UDim2(0, 0, 0, 0)}
					Size={new UDim2(1, 0, 1, 0)}
					Event={{
						InputChanged: (instance, inputObject) => {
							if (!this.state.IsGripBeingDragged) {
								return;
							}

							if (inputObject.UserInputType !== Enum.UserInputType.MouseMovement) {
								return;
							}

							const isVerticalScrollBar = this.props.ScrollDirection === Enum.ScrollingDirection.Y;

							const relevantPixelsTraveled = isVerticalScrollBar
								? inputObject.Delta.Y
								: inputObject.Delta.X;
							const relevantLengthInPixels = isVerticalScrollBar
								? instance.AbsoluteSize.Y
								: instance.AbsoluteSize.X;
							const trackLengthInPixels =
								relevantLengthInPixels - (2 - 2 * Constants.ScrollBar.ThicknessInPixels);
							const trackLengthPercentageTraveled = relevantPixelsTraveled / trackLengthInPixels;

							this.props.ScollGripDragged(trackLengthPercentageTraveled);
						},

						InputEnded: (instance, inputObject) => {
							if (!this.state.IsGripBeingDragged) {
								return;
							}

							if (
								inputObject.UserInputType !== Enum.UserInputType.MouseMovement &&
								inputObject.UserInputType !== Enum.UserInputType.MouseButton1
							) {
								return;
							}

							this.setState({
								IsGripBeingDragged: false,
							});
						},
					}}
				/>
			</frame>
		);
	}

	private handleTrackPressStarted(trackInstance: Frame, inputObject: InputObject) {
		const mouseInitialRelativePosition = new Vector2(inputObject.Position.X, inputObject.Position.Y);
		const initialMousePositionOffset = mouseInitialRelativePosition.sub(trackInstance.AbsolutePosition);

		const isVerticalScrollBar = this.props.ScrollDirection === Enum.ScrollingDirection.Y;
		const relevantTrackLengthInPixels = isVerticalScrollBar
			? trackInstance.AbsoluteSize.Y
			: trackInstance.AbsoluteSize.X;
		const relevantMousePositionOffsetInPixels = isVerticalScrollBar
			? initialMousePositionOffset.Y
			: initialMousePositionOffset.X;
		const mouseTrackPositionPercentage = relevantMousePositionOffsetInPixels / relevantTrackLengthInPixels;

		const isMouseInBoundsOfGrip =
			mouseTrackPositionPercentage >= this.props.GripTrackPositionPercentage &&
			mouseTrackPositionPercentage <= this.props.GripTrackPositionPercentage + this.props.GripLengthPercentage;
		if (isMouseInBoundsOfGrip) {
			return;
		}

		const goalGripTrackPositionPercentage = math.clamp(
			mouseTrackPositionPercentage - this.props.GripLengthPercentage / 2,
			0,
			1 - this.props.GripLengthPercentage,
		);

		const didFirstMoveReachTheGoal = this.moveTowardsTrackPressGoal(goalGripTrackPositionPercentage);
		if (didFirstMoveReachTheGoal) {
			return;
		}

		let nextAttemptTick = tick() + Constants.ScrollBar.TrackPressedInitialTimerDuration;
		this.trackPressedDumpster.dump(
			RunService.RenderStepped.Connect(() => {
				const currentTick = tick();
				if (currentTick < nextAttemptTick) {
					return;
				}

				const didMoveReachTheGoal = this.moveTowardsTrackPressGoal(goalGripTrackPositionPercentage);
				if (didMoveReachTheGoal) {
					this.trackPressedDumpster.burn();
				} else {
					nextAttemptTick = currentTick + Constants.ScrollBar.TrackPressedSubsequentTimersDuration;
				}
			}),
		);
	}

	private moveTowardsTrackPressGoal(goalGripTrackPositionPercentage: number): boolean {
		const displacementFromGoal = goalGripTrackPositionPercentage - this.props.GripTrackPositionPercentage;

		if (math.abs(displacementFromGoal) <= this.props.GripLengthPercentage) {
			this.props.ScollGripDragged(displacementFromGoal);
			return true;
		}

		const directionToGoal = math.sign(displacementFromGoal);
		this.props.ScollGripDragged(directionToGoal * this.props.GripLengthPercentage);

		return false;
	}

	private handleTrackPressStopped() {
		this.trackPressedDumpster.burn();
	}
}
