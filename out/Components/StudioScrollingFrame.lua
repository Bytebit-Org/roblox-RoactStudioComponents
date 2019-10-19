-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 8:44 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
local Roact = TS.import(TS.getModule("roact").roact.src);
local _POSITION_ADDER = UDim2.new(0, 1, 0, 1);
local _SIZE_ADDER = UDim2.new(0, -2, 0, -2);
local _SCROLLBAR_THICKNESS = 16;
local StudioScrollingFrame;
do
	StudioScrollingFrame = Roact.Component:extend("StudioScrollingFrame");
	function StudioScrollingFrame:render()
		local theme = settings().Studio.Theme;
		local canvasSize = self.props.CanvasSize;
		if self.props.ScrollingDirection == Enum.ScrollingDirection.Y then
			canvasSize = (canvasSize + (UDim2.new(0, -_SCROLLBAR_THICKNESS - 4, 0, 0)));
		elseif self.props.ScrollingDirection == Enum.ScrollingDirection.X then
			canvasSize = (canvasSize + (UDim2.new(0, 0, 0, -_SCROLLBAR_THICKNESS - 4)));
		else
			canvasSize = (canvasSize + (UDim2.new(0, _SCROLLBAR_THICKNESS, 0, _SCROLLBAR_THICKNESS)));
		end;
			local _0;
			if self.props.LayoutOrder ~= nil then
				_0 = self.props.LayoutOrder;
			else
				_0 = 0;
			end;
			local _1;
			if self.props.Rotation ~= nil then
				_1 = self.props.Rotation;
			else
				_1 = 0;
			end;
		return Roact.createElement("ScrollingFrame", {
			Active = self.props.Active,
			BackgroundColor3 = theme:GetColor(Enum.StudioStyleGuideColor.ScrollBarBackground),
			BorderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.Border),
			BorderSizePixel = 1,
			LayoutOrder = _0,
			Position = (self.props.Position + (_POSITION_ADDER)),
			Rotation = _1,
			Size = (self.props.Size + (_SIZE_ADDER)),
			Visible = self.props.Visible,
			BottomImage = "rbxasset://textures/AnimationEditor/image_scrollbar_vertical_bot.png",
			CanvasPosition = self.props.CanvasPosition,
			CanvasSize = canvasSize,
			ElasticBehavior = self.props.ElasticBehavior,
			HorizontalScrollBarInset = self.props.HorizontalScrollBarInset,
			MidImage = "rbxasset://textures/AnimationEditor/image_scrollbar_vertical_mid.png",
			ScrollBarImageColor3 = theme:GetColor(Enum.StudioStyleGuideColor.ScrollBar),
			ScrollBarThickness = _SCROLLBAR_THICKNESS,
			ScrollingDirection = self.props.ScrollingDirection,
			ScrollingEnabled = self.props.ScrollingEnabled,
			TopImage = "rbxasset://textures/AnimationEditor/image_scrollbar_vertical_top.png",
			VerticalScrollBarInset = self.props.VerticalScrollBarInset,
			VerticalScrollBarPosition = self.props.VerticalScrollBarPosition 
		}		, {
			["ViewportFrame"] = Roact.createElement("Frame", {
				BackgroundColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainBackground),
				BorderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.Border),
				BorderSizePixel = 1,
				Size = UDim2.new(1, 0, 1, 0) 
			}, TS.Roact_combine(
self.props[Roact.Children]
			))
		});
	end;
	StudioScrollingFrame.defaultProps = {
		Active = true;
		AnchorPoint = Vector2.new(0, 0);
		CanvasPosition = Vector2.new(0, 0);
		CanvasSize = UDim2.new(1, 0, 2, 0);
		ElasticBehavior = Enum.ElasticBehavior.WhenScrollable;
		HorizontalScrollBarInset = Enum.ScrollBarInset.None;
		Position = UDim2.new(0, 0, 0, 0);
		ScrollingDirection = Enum.ScrollingDirection.Y;
		ScrollingEnabled = true;
		Size = UDim2.new(1, 0, 1, 0);
		VerticalScrollBarInset = Enum.ScrollBarInset.ScrollBar;
		VerticalScrollBarPosition = Enum.VerticalScrollBarPosition.Right;
		Visible = true;
	};
end;
exports.StudioScrollingFrame = StudioScrollingFrame;
return exports;
