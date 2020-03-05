/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import IStudioScrollingFrameProperties from "../../Interfaces/IStudioScrollingFrameProperties";
import IStudioScrollingFrameState from "Interfaces/IStudioScrollingFrameState";
import { Constants } from "Data/Constants";
import { StudioScrollBar } from "./StudioScrollBar";
import { vector2FuzzyEquals } from "Common/Vector2FuzzyEquals";

export class StudioScrollingFrame extends Roact.Component<IStudioScrollingFrameProperties, IStudioScrollingFrameState> {
	public static readonly defaultProps = {
		Active: true,
		AnchorPoint: new Vector2(0, 0),
		BorderMode: Enum.BorderMode.Outline,
		BorderSizePixel: 1,
		CanvasPosition: new Vector2(0, 0),
		CanvasSize: new UDim2(1, 0, 1, 0),
		HorizontalScrollBarInset: Enum.ScrollBarInset.None,
		HorizontalScrollStepSizeInPixels: 12,
		Position: new UDim2(0, 0, 0, 0),
		ScrollingDirection: Enum.ScrollingDirection.Y,
		ScrollingEnabled: true,
		Size: new UDim2(1, 0, 1, 0),
		VerticalScrollBarInset: Enum.ScrollBarInset.ScrollBar,
		VerticalScrollBarPosition: Enum.VerticalScrollBarPosition.Right,
		VerticalScrollStepSizeInPixels: 12,
		Visible: true,
	};

	public constructor(props: IStudioScrollingFrameProperties) {
		super(props);

		this.setState({
			AbsoluteWindowSize: new Vector2(1, 1),
			CurrentCanvasPosition: props.CanvasPosition || new Vector2(),
		});
	}

	public getDerivedStateFromProps(
		this: void,
		nextProps: IStudioScrollingFrameProperties,
		previousState: IStudioScrollingFrameState,
	) {
		if (
			nextProps.CanvasPosition !== undefined &&
			previousState.CurrentCanvasPosition !== undefined &&
			vector2FuzzyEquals(nextProps.CanvasPosition, previousState.CurrentCanvasPosition)
		) {
			return {
				CurrentCanvasPosition: nextProps.CanvasPosition,
			};
		}
	}

	public didUpdate(previousProps: IStudioScrollingFrameProperties, previousState: IStudioScrollingFrameState) {
		let didCanvasViewDimensionsChange = false;

		if (
			this.state.CurrentCanvasPosition !== undefined &&
			previousState.CurrentCanvasPosition !== undefined &&
			!vector2FuzzyEquals(this.state.CurrentCanvasPosition, previousState.CurrentCanvasPosition)
		) {
			didCanvasViewDimensionsChange = true;
		} else if (
			previousProps.CanvasSize !== undefined &&
			this.props.CanvasSize !== undefined &&
			previousProps.CanvasSize !== this.props.CanvasSize
		) {
			didCanvasViewDimensionsChange = true;
		} else if (
			this.state.AbsoluteWindowSize !== undefined &&
			previousState.AbsoluteWindowSize !== undefined &&
			!vector2FuzzyEquals(this.state.AbsoluteWindowSize, previousState.AbsoluteWindowSize)
		) {
			didCanvasViewDimensionsChange = true;
		}

		if (didCanvasViewDimensionsChange) {
			if (
				this.state.CurrentCanvasPosition !== undefined &&
				this.state.AbsoluteWindowSize !== undefined &&
				this.props.Events !== undefined &&
				this.props.Events.CanvasViewDimensionsChanged !== undefined
			) {
				this.props.Events.CanvasViewDimensionsChanged(
					this.state.CurrentCanvasPosition,
					this.state.CurrentCanvasPosition.add(this.state.AbsoluteWindowSize),
				);
			}
		}
	}

	public render(): Roact.Element {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const props = this.props as Required<IStudioScrollingFrameProperties>;
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const state = this.state as Required<IStudioScrollingFrameState>;

		const theme = settings().Studio.Theme;

		const absoluteCanvasSize = this.computeAbsoluteCanvasSize();

		const windowXViewSizePercentage = state.AbsoluteWindowSize.X / absoluteCanvasSize.X;
		const windowYViewSizePercentage = state.AbsoluteWindowSize.Y / absoluteCanvasSize.Y;

		const windowXViewPositionPercentage = state.CurrentCanvasPosition.X / absoluteCanvasSize.X;
		const windowYViewPositionPercentage = state.CurrentCanvasPosition.Y / absoluteCanvasSize.Y;

		const isVerticalScrollbarVisible =
			props.ScrollingEnabled &&
			(props.ScrollingDirection === Enum.ScrollingDirection.Y ||
				props.ScrollingDirection === Enum.ScrollingDirection.XY) &&
			(props.VerticalScrollBarInset === Enum.ScrollBarInset.Always ||
				(props.VerticalScrollBarInset === Enum.ScrollBarInset.ScrollBar && windowYViewSizePercentage < 1));
		const isHorizontalScrollbarVisible =
			props.ScrollingEnabled &&
			(props.ScrollingDirection === Enum.ScrollingDirection.X ||
				props.ScrollingDirection === Enum.ScrollingDirection.XY) &&
			(props.HorizontalScrollBarInset === Enum.ScrollBarInset.Always ||
				(props.HorizontalScrollBarInset === Enum.ScrollBarInset.ScrollBar && windowXViewSizePercentage < 1));

		const windowSize = new UDim2(
			1,
			isVerticalScrollbarVisible ? 1 - Constants.ScrollBar.ThicknessInPixels : 0,
			1,
			isHorizontalScrollbarVisible ? 1 - Constants.ScrollBar.ThicknessInPixels : 0,
		);

		const scrollBars = new Array<Roact.Element>();
		if (isVerticalScrollbarVisible) {
			scrollBars.push(
				<StudioScrollBar
					Key={`VerticalScrollBar`}
					GripLengthPercentage={windowYViewSizePercentage}
					GripTrackPositionPercentage={windowYViewPositionPercentage}
					Length={
						isHorizontalScrollbarVisible
							? new UDim(1, 3 - Constants.ScrollBar.ThicknessInPixels)
							: new UDim(1, 2)
					}
					Position={new UDim2(1, 1 - Constants.ScrollBar.ThicknessInPixels, 0, -1)}
					ScrollDirection={Enum.ScrollingDirection.Y}
					ScrollButtonPressed={direction =>
						this.stepCanvasPosition(direction, Enum.ScrollingDirection.Y, absoluteCanvasSize)
					}
					ScollGripDragged={trackLengthPercentageTraveled =>
						this.handleScrollBarGripDragged(
							trackLengthPercentageTraveled,
							Enum.ScrollingDirection.Y,
							absoluteCanvasSize,
						)
					}
				/>,
			);
		}
		if (isHorizontalScrollbarVisible) {
			scrollBars.push(
				<StudioScrollBar
					Key={`HorizontalScrollBar`}
					GripLengthPercentage={windowXViewSizePercentage}
					GripTrackPositionPercentage={windowXViewPositionPercentage}
					Length={
						isVerticalScrollbarVisible
							? new UDim(1, 3 - Constants.ScrollBar.ThicknessInPixels)
							: new UDim(1, 2)
					}
					Position={new UDim2(0, -1, 1, 1 - Constants.ScrollBar.ThicknessInPixels)}
					ScrollDirection={Enum.ScrollingDirection.X}
					ScrollButtonPressed={direction =>
						this.stepCanvasPosition(direction, Enum.ScrollingDirection.X, absoluteCanvasSize)
					}
					ScollGripDragged={trackLengthPercentageTraveled =>
						this.handleScrollBarGripDragged(
							trackLengthPercentageTraveled,
							Enum.ScrollingDirection.X,
							absoluteCanvasSize,
						)
					}
				/>,
			);
		}

		return (
			<frame
				Active={props.Active}
				AnchorPoint={props.AnchorPoint}
				BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.ScrollBarBackground)}
				BackgroundTransparency={0}
				BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
				BorderMode={props.BorderMode}
				BorderSizePixel={props.BorderSizePixel}
				LayoutOrder={props.LayoutOrder}
				Position={props.Position}
				Size={props.Size}
				Visible={props.Visible}
				Event={{
					InputChanged: (instance, inputObject) => {
						if (inputObject.UserInputType === Enum.UserInputType.MouseWheel) {
							const isVerticalScroll = inputObject.IsModifierKeyDown(0) !== true;
							if (isVerticalScroll && !isVerticalScrollbarVisible) {
								return;
							}
							if (!isVerticalScroll && !isHorizontalScrollbarVisible) {
								return;
							}

							this.stepCanvasPosition(
								-inputObject.Position.Z,
								isVerticalScroll ? Enum.ScrollingDirection.Y : Enum.ScrollingDirection.X,
								absoluteCanvasSize,
							);
						}
					},
				}}
			>
				<frame
					Key={`ScrollingFrameWindow`}
					BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
					BackgroundTransparency={0}
					BorderSizePixel={0}
					ClipsDescendants={true}
					Position={new UDim2(0, 0, 0, 0)}
					Size={windowSize}
					Ref={instance => {
						// Ugly hack because roblox-ts types are weird about `Changed`
						// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
						const changedEvent = instance.Changed as RBXScriptSignal<(propertyName: string) => void>;
						changedEvent.Connect(propertyName => {
							if (propertyName === "AbsoluteSize") {
								this.setState({
									AbsoluteWindowSize: instance.AbsoluteSize,
								});
							}
						});
					}}
				>
					<frame
						Key={`ScrollingFrameCanvas`}
						BackgroundTransparency={1}
						Position={new UDim2(0, -state.CurrentCanvasPosition.X, 0, -state.CurrentCanvasPosition.Y)}
						Size={props.CanvasSize}
					>
						{this.props[Roact.Children]}
					</frame>
				</frame>
				{scrollBars}
			</frame>
		);
	}

	private computeAbsoluteCanvasSize() {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const props = this.props as Required<IStudioScrollingFrameProperties>;
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const state = this.state as Required<IStudioScrollingFrameState>;

		return new Vector2(
			props.CanvasSize.X.Scale * state.AbsoluteWindowSize.X + props.CanvasSize.X.Offset,
			props.CanvasSize.Y.Scale * state.AbsoluteWindowSize.Y + props.CanvasSize.Y.Offset,
		);
	}

	private handleScrollBarGripDragged(
		trackLengthPercentageTraveled: number,
		axis: Enum.ScrollingDirection.X | Enum.ScrollingDirection.Y,
		absoluteCanvasSize: Vector2,
	) {
		const isVerticalAxis = axis === Enum.ScrollingDirection.Y;

		const relevantCanvasLength = isVerticalAxis ? absoluteCanvasSize.Y : absoluteCanvasSize.X;
		const rawCanvasLengthInPixelsTraveled = relevantCanvasLength * trackLengthPercentageTraveled;
		const roundedCanvasLengthInPixelsTraveled =
			rawCanvasLengthInPixelsTraveled % 1 <= 0.5
				? math.floor(rawCanvasLengthInPixelsTraveled)
				: math.ceil(rawCanvasLengthInPixelsTraveled);

		this.setState(prevState => {
			if (prevState.CurrentCanvasPosition === undefined) {
				return;
			}

			const newCanvasPositionValue = this.clampCanvasPositionValue(
				(isVerticalAxis ? prevState.CurrentCanvasPosition.Y : prevState.CurrentCanvasPosition.X) +
					roundedCanvasLengthInPixelsTraveled,
				isVerticalAxis,
				absoluteCanvasSize,
			);

			return {
				CurrentCanvasPosition: isVerticalAxis
					? new Vector2(prevState.CurrentCanvasPosition.X, newCanvasPositionValue)
					: new Vector2(newCanvasPositionValue, prevState.CurrentCanvasPosition.Y),
			};
		});
	}

	private stepCanvasPosition(
		direction: number,
		axis: Enum.ScrollingDirection.X | Enum.ScrollingDirection.Y,
		absoluteCanvasSize: Vector2,
	) {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const props = this.props as Required<IStudioScrollingFrameProperties>;
		const isVerticalAxis = axis === Enum.ScrollingDirection.Y;
		const scrollStepSizeInPixels = isVerticalAxis
			? props.VerticalScrollStepSizeInPixels
			: props.HorizontalScrollStepSizeInPixels;

		this.setState(prevState => {
			if (prevState.CurrentCanvasPosition === undefined) {
				return;
			}

			const newCanvasPositionValue = this.clampCanvasPositionValue(
				(isVerticalAxis ? prevState.CurrentCanvasPosition.Y : prevState.CurrentCanvasPosition.X) +
					direction * scrollStepSizeInPixels,
				isVerticalAxis,
				absoluteCanvasSize,
			);

			return {
				CurrentCanvasPosition: isVerticalAxis
					? new Vector2(prevState.CurrentCanvasPosition.X, newCanvasPositionValue)
					: new Vector2(newCanvasPositionValue, prevState.CurrentCanvasPosition.Y),
			};
		});
	}

	private clampCanvasPositionValue(
		canvasPositionValue: number,
		isVerticalAxis: boolean,
		absoluteCanvasSize: Vector2,
	) {
		if (this.state.AbsoluteWindowSize === undefined) {
			return 0;
		}

		return math.clamp(
			canvasPositionValue,
			0,
			isVerticalAxis
				? absoluteCanvasSize.Y - this.state.AbsoluteWindowSize.Y
				: absoluteCanvasSize.X - this.state.AbsoluteWindowSize.X,
		);
	}
}
