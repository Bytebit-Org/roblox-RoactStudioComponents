-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 7:26 PM Pacific Daylight Time

local TS = _G[script];
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local DeriveColorModifier = TS.import(script.Parent.Parent, "Common", "StudioComponentUtilities").DeriveColorModifier;
local _0;
do
	local StudioImageButton = Roact.Component:extend("StudioImageButton");
	function StudioImageButton:init(props)
		self:setState({
			IsMouseOver = false;
			IsPressed = false;
			IsSelected = false;
		});
	end;
	function StudioImageButton:render()
		local theme = settings().Studio.Theme;
		local styleGuideModifier = DeriveColorModifier(self.props, self.state);
			local _1;
			if self.props.LayoutOrder ~= nil then
				_1 = self.props.LayoutOrder;
			else
				_1 = 0;
			end;
			local _2;
			if self.props.Rotation ~= nil then
				_2 = self.props.Rotation;
			else
				_2 = 0;
			end;
		return Roact.createElement("TextButton", {
			Active = self.props.Active,
			AnchorPoint = self.props.AnchorPoint,
			AutoButtonColor = false,
			BackgroundColor3 = theme:GetColor(self.props.BackgroundColorEnum, styleGuideModifier),
			BorderColor3 = theme:GetColor(self.props.BorderColorEnum, styleGuideModifier),
			BorderSizePixel = 1,
			LayoutOrder = _1,
			Position = self.props.Position,
			Rotation = _2,
			Size = UDim2.new(self.props.Width, StudioImageButton.HeightUDim),
			Text = "",
			Visible = self.props.Visible,
			[Roact.Event.MouseEnter] = function()
				self:setState({
					IsMouseOver = true;
				});
			end,
			[Roact.Event.MouseLeave] = function()
				self:setState({
					IsMouseOver = false;
				});
			end,
			[Roact.Event.MouseButton1Down] = function()
				self:setState({
					IsPressed = true;
				});
			end,
			[Roact.Event.MouseButton1Up] = function()
				self:setState({
					IsPressed = false;
				});
			end,
			[Roact.Event.SelectionGained] = function()
				self:setState({
					IsSelected = true;
				});
			end,
			[Roact.Event.SelectionLost] = function()
				self:setState({
					IsSelected = false;
				});
			end,
			[Roact.Event.MouseButton1Click] = function()
				if self.props.Events == nil or self.props.Events.MouseButton1Click == nil then
					return nil;
				end;
				self.props.Events.MouseButton1Click();
			end 
		}		, {
			Roact.createElement("ImageLabel", {
				Active = false,
				AnchorPoint = Vector2.new(0.5, 0.5),
				BackgroundTransparency = 1,
				Image = self.props.Image,
				ImageColor3 = self.props.ImageColor3,
				ImageRectOffset = self.props.ImageRectOffset,
				ImageRectSize = self.props.ImageRectSize,
				Position = UDim2.new(0.5, 0, 0.5, 0),
				Size = UDim2.new(1, -4, 1, -4) 
			})
		});
	end;
	StudioImageButton.HeightUDim = UDim.new(0, 22);
	StudioImageButton.defaultProps = {
		Active = true;
		AnchorPoint = Vector2.new(0, 0);
		BackgroundColorEnum = Enum.StudioStyleGuideColor.Button;
		BorderColorEnum = Enum.StudioStyleGuideColor.ButtonBorder;
		ImageColor3 = Color3.new(1, 1, 1);
		ImageRectOffset = Vector2.new(0, 0);
		ImageRectSize = Vector2.new(0, 0);
		Position = UDim2.new(0, 0, 0, 0);
		Width = UDim.new(1, 0);
		Visible = true;
	};
	_0 = StudioImageButton;
end;
exports = _0;
return exports;
