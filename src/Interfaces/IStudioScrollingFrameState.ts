import IStudioComponentState = require("./IStudioComponentState");

interface IStudioScrollingFrameState extends IStudioComponentState {
	AbsoluteWindowSize: Vector2;
	CurrentCanvasPosition: Vector2;
}

export = IStudioScrollingFrameState;
