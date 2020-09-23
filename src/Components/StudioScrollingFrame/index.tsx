/// <reference types="@rbxts/types/plugin" />

import Roact from "@rbxts/roact";
import IStudioScrollingFrameProperties from "../../Interfaces/IStudioScrollingFrameProperties";
import { Constants } from "Data/Constants";
import { StudioScrollBar } from "./StudioScrollBar";
import IStudioComponentState from "Interfaces/IStudioComponentState";

export class StudioScrollingFrame extends Roact.Component<IStudioScrollingFrameProperties, IStudioComponentState> {
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

	private readonly absoluteWindowSizeBinding: Roact.RoactBinding<Vector2>;
	private readonly setAbsoluteWindowSize: Roact.RoactBindingFunc<Vector2>;

	private readonly absoluteCanvasPositionBinding: Roact.RoactBinding<Vector2>;
	private readonly setAbsoluteCanvasPosition: Roact.RoactBindingFunc<Vector2>;

	public constructor(props: IStudioScrollingFrameProperties) {
		super(props);

		const [absoluteCanvasPositionBinding, setAbsoluteCanvasPosition] = Roact.createBinding(new Vector2(0, 0));
		this.absoluteCanvasPositionBinding = absoluteCanvasPositionBinding;
		this.setAbsoluteCanvasPosition = setAbsoluteCanvasPosition;

		const [absoluteWindowSizeBinding, setAbsoluteWindowSize] = Roact.createBinding(new Vector2(1, 1));
		this.absoluteWindowSizeBinding = absoluteWindowSizeBinding;
		this.setAbsoluteWindowSize = setAbsoluteWindowSize;
	}

	public render(): Roact.Element {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const props = this.props as Required<IStudioScrollingFrameProperties>;

		const theme = settings().Studio.Theme;

		const absoluteCanvasSizeBinding = this.createAbsoluteCanvasSizeBinding();
		const effectiveAbsoluteCanvasPositionBinding = this.createEffectiveAbsoluteCanvasPositionBinding(
			absoluteCanvasSizeBinding,
		);
		const canvasPositionPercentageBinding = this.createCanvasPositionPercentageBinding(
			absoluteCanvasSizeBinding,
			effectiveAbsoluteCanvasPositionBinding,
		);
		const windowViewSizePercentageBinding = this.createWindowViewSizePercentageBinding(absoluteCanvasSizeBinding);

		const isHorizontalScrollbarVisibleBinding = windowViewSizePercentageBinding.map(
			windowViewSizePercentage =>
				props.ScrollingEnabled === true &&
				(props.ScrollingDirection === Enum.ScrollingDirection.X ||
					props.ScrollingDirection === Enum.ScrollingDirection.XY) &&
				(props.HorizontalScrollBarInset === Enum.ScrollBarInset.Always ||
					(props.HorizontalScrollBarInset === Enum.ScrollBarInset.ScrollBar &&
						windowViewSizePercentage.Y < 1)),
		);
		const isVerticalScrollbarVisibleBinding = windowViewSizePercentageBinding.map(
			windowViewSizePercentage =>
				props.ScrollingEnabled === true &&
				(props.ScrollingDirection === Enum.ScrollingDirection.Y ||
					props.ScrollingDirection === Enum.ScrollingDirection.XY) &&
				(props.VerticalScrollBarInset === Enum.ScrollBarInset.Always ||
					(props.VerticalScrollBarInset === Enum.ScrollBarInset.ScrollBar && windowViewSizePercentage.Y < 1)),
		);

		const horizontalScrollBarLengthBinding = Roact.joinBindings({
			absoluteCanvasSize: absoluteCanvasSizeBinding,
			isVerticalScrollbarVisible: isVerticalScrollbarVisibleBinding,
		}).map(values =>
			values.isVerticalScrollbarVisible === true
				? new UDim(1, 3 - Constants.ScrollBar.ThicknessInPixels)
				: new UDim(1, 2),
		);
		const verticalScrollBarLengthBinding = Roact.joinBindings({
			absoluteCanvasSize: absoluteCanvasSizeBinding,
			isHorizontalScrollbarVisible: isHorizontalScrollbarVisibleBinding,
		}).map(values =>
			values.isHorizontalScrollbarVisible === true
				? new UDim(1, 3 - Constants.ScrollBar.ThicknessInPixels)
				: new UDim(1, 2),
		);

		const windowSizeBinding = Roact.joinBindings({
			isHorizontalScrollbarVisible: isHorizontalScrollbarVisibleBinding,
			isVerticalScrollbarVisible: isVerticalScrollbarVisibleBinding,
		}).map(
			values =>
				new UDim2(
					1,
					values.isVerticalScrollbarVisible === true ? 1 - Constants.ScrollBar.ThicknessInPixels : 0,
					1,
					values.isHorizontalScrollbarVisible === true ? 1 - Constants.ScrollBar.ThicknessInPixels : 0,
				),
		);

		const scrollBars = new Array<Roact.Element>();
		scrollBars.push(
			<StudioScrollBar
				Key={`VerticalScrollBar`}
				GripLengthPercentage={windowViewSizePercentageBinding.map(v2 => v2.Y)}
				GripTrackPositionPercentage={canvasPositionPercentageBinding.map(v2 => v2.Y)}
				Length={verticalScrollBarLengthBinding}
				Position={new UDim2(1, 1 - Constants.ScrollBar.ThicknessInPixels, 0, -1)}
				ScrollDirection={Enum.ScrollingDirection.Y}
				ScrollButtonPressed={direction =>
					this.stepCanvasPosition(direction, Enum.ScrollingDirection.Y, absoluteCanvasSizeBinding.getValue())
				}
				ScollGripDragged={trackLengthPercentageTraveled =>
					this.handleScrollBarGripDragged(
						trackLengthPercentageTraveled,
						Enum.ScrollingDirection.Y,
						absoluteCanvasSizeBinding.getValue(),
					)
				}
				Visible={isVerticalScrollbarVisibleBinding}
			/>,
		);
		scrollBars.push(
			<StudioScrollBar
				Key={`HorizontalScrollBar`}
				GripLengthPercentage={windowViewSizePercentageBinding.map(v2 => v2.X)}
				GripTrackPositionPercentage={canvasPositionPercentageBinding.map(v2 => v2.X)}
				Length={horizontalScrollBarLengthBinding}
				Position={new UDim2(0, -1, 1, 1 - Constants.ScrollBar.ThicknessInPixels)}
				ScrollDirection={Enum.ScrollingDirection.X}
				ScrollButtonPressed={direction =>
					this.stepCanvasPosition(direction, Enum.ScrollingDirection.X, absoluteCanvasSizeBinding.getValue())
				}
				ScollGripDragged={trackLengthPercentageTraveled =>
					this.handleScrollBarGripDragged(
						trackLengthPercentageTraveled,
						Enum.ScrollingDirection.X,
						absoluteCanvasSizeBinding.getValue(),
					)
				}
				Visible={isHorizontalScrollbarVisibleBinding}
			/>,
		);

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
					InputChanged: (_, inputObject) => {
						if (inputObject.UserInputType === Enum.UserInputType.MouseWheel) {
							const isVerticalScroll = inputObject.IsModifierKeyDown(0) !== true;
							if (isVerticalScroll && isVerticalScrollbarVisibleBinding.getValue() === false) {
								return;
							}

							if (!isVerticalScroll && isHorizontalScrollbarVisibleBinding.getValue() === false) {
								return;
							}

							this.stepCanvasPosition(
								-inputObject.Position.Z,
								isVerticalScroll ? Enum.ScrollingDirection.Y : Enum.ScrollingDirection.X,
								absoluteCanvasSizeBinding.getValue(),
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
					Size={windowSizeBinding}
					Ref={scrollingFrameWindow => this.listenForScrollingFrameWindowChanges(scrollingFrameWindow)}
				>
					<frame
						Key={`ScrollingFrameCanvas`}
						BackgroundTransparency={1}
						Position={effectiveAbsoluteCanvasPositionBinding.map(effectiveAbsoluteCanvasPosition =>
							UDim2.fromOffset(-effectiveAbsoluteCanvasPosition.X, -effectiveAbsoluteCanvasPosition.Y),
						)}
						Size={props.CanvasSize}
					>
						{this.props[Roact.Children]}
					</frame>
				</frame>
				{scrollBars}
			</frame>
		);
	}

	private createAbsoluteCanvasSizeBinding() {
		// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
		const props = this.props as Required<IStudioScrollingFrameProperties>;
		const propsCanvasSize = props.CanvasSize;

		const canvasSizeBinding = typeIs(propsCanvasSize, "UDim2")
			? Roact.createBinding(propsCanvasSize)[0]
			: propsCanvasSize;

		return Roact.joinBindings({
			absoluteWindowSize: this.absoluteWindowSizeBinding,
			canvasSize: canvasSizeBinding,
		}).map(
			values =>
				new Vector2(
					values.canvasSize.X.Scale * values.absoluteWindowSize.X + values.canvasSize.X.Offset,
					values.canvasSize.Y.Scale * values.absoluteWindowSize.Y + values.canvasSize.Y.Offset,
				),
		);
	}

	private createEffectiveAbsoluteCanvasPositionBinding(absoluteCanvasSizeBinding: Roact.RoactBinding<Vector2>) {
		return Roact.joinBindings({
			absoluteCanvasPosition: this.absoluteCanvasPositionBinding,
			absoluteCanvasSize: absoluteCanvasSizeBinding,
		}).map(
			values =>
				new Vector2(
					this.clampCanvasPositionValue(values.absoluteCanvasPosition.X, false, values.absoluteCanvasSize),
					this.clampCanvasPositionValue(values.absoluteCanvasPosition.Y, true, values.absoluteCanvasSize),
				),
		);
	}

	private createCanvasPositionPercentageBinding(
		absoluteCanvasSizeBinding: Roact.RoactBinding<Vector2>,
		effectiveAbsoluteCanvasPositionBinding: Roact.RoactBinding<Vector2>,
	) {
		return Roact.joinBindings({
			effectiveAbsoluteCanvasPosition: effectiveAbsoluteCanvasPositionBinding,
			absoluteCanvasSize: absoluteCanvasSizeBinding,
		}).map(
			values =>
				new Vector2(
					values.effectiveAbsoluteCanvasPosition.X / values.absoluteCanvasSize.X,
					values.effectiveAbsoluteCanvasPosition.Y / values.absoluteCanvasSize.Y,
				),
		);
	}

	private createWindowViewSizePercentageBinding(absoluteCanvasSizeBinding: Roact.RoactBinding<Vector2>) {
		return Roact.joinBindings({
			absoluteCanvasSize: absoluteCanvasSizeBinding,
			absoluteWindowSize: this.absoluteWindowSizeBinding,
		}).map(
			values =>
				new Vector2(
					values.absoluteWindowSize.X / values.absoluteCanvasSize.X,
					values.absoluteWindowSize.Y / values.absoluteCanvasSize.Y,
				),
		);
	}

	private listenForScrollingFrameWindowChanges(scrollingFrameWindow: Frame | undefined) {
		if (scrollingFrameWindow === undefined) {
			return;
		}

		scrollingFrameWindow
			.GetPropertyChangedSignal("AbsoluteSize")
			.Connect(() => this.setAbsoluteWindowSize(scrollingFrameWindow.AbsoluteSize));
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

		const currentAbsoluteCanvasPosition = this.absoluteCanvasPositionBinding.getValue();

		const newCanvasPositionValue = this.clampCanvasPositionValue(
			(isVerticalAxis ? currentAbsoluteCanvasPosition.Y : currentAbsoluteCanvasPosition.X) +
				roundedCanvasLengthInPixelsTraveled,
			isVerticalAxis,
			absoluteCanvasSize,
		);

		this.setAbsoluteCanvasPosition(
			isVerticalAxis
				? new Vector2(currentAbsoluteCanvasPosition.X, newCanvasPositionValue)
				: new Vector2(newCanvasPositionValue, currentAbsoluteCanvasPosition.Y),
		);
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

		const currentAbsoluteCanvasPosition = this.absoluteCanvasPositionBinding.getValue();

		const newCanvasPositionValue = this.clampCanvasPositionValue(
			(isVerticalAxis ? currentAbsoluteCanvasPosition.Y : currentAbsoluteCanvasPosition.X) +
				direction * scrollStepSizeInPixels,
			isVerticalAxis,
			absoluteCanvasSize,
		);

		this.setAbsoluteCanvasPosition(
			isVerticalAxis
				? new Vector2(currentAbsoluteCanvasPosition.X, newCanvasPositionValue)
				: new Vector2(newCanvasPositionValue, currentAbsoluteCanvasPosition.Y),
		);
	}

	private clampCanvasPositionValue(
		canvasPositionValue: number,
		isVerticalAxis: boolean,
		absoluteCanvasSize: Vector2,
	) {
		const absoluteWindowSize = this.absoluteWindowSizeBinding.getValue();

		if (
			(isVerticalAxis && absoluteWindowSize.Y > absoluteCanvasSize.Y) ||
			(!isVerticalAxis && absoluteWindowSize.X > absoluteCanvasSize.X)
		) {
			return 0;
		}

		return math.clamp(
			canvasPositionValue,
			0,
			isVerticalAxis ? absoluteCanvasSize.Y - absoluteWindowSize.Y : absoluteCanvasSize.X - absoluteWindowSize.X,
		);
	}
}
