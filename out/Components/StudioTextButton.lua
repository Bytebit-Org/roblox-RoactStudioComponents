-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 8:44 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
local StudioTextButton;
local Roact = TS.import(TS.getModule("roact").roact.src);
local DeriveColorModifier = TS.import(script.Parent.Parent, "Common", "StudioComponentUtilities").DeriveColorModifier;
do
	StudioTextButton = Roact.Component:extend("StudioTextButton");
	function StudioTextButton:init(props)
		self:setState({
			IsMouseOver = false;
			IsPressed = false;
			IsSelected = false;
		});
	end;
	function StudioTextButton:render()
		local theme = settings().Studio.Theme;
		local styleGuideModifier = DeriveColorModifier(self.props, self.state);
		return Roact.createElement("TextButton", {
			Active = self.props.Active,
			AnchorPoint = self.props.AnchorPoint,
			AutoButtonColor = false,
			BackgroundColor3 = theme:GetColor(self.props.BackgroundColorEnum, styleGuideModifier),
			BorderColor3 = theme:GetColor(self.props.BorderColorEnum, styleGuideModifier),
			BorderSizePixel = 1,
			Font = Enum.Font.SourceSans,
			LayoutOrder = self.props.LayoutOrder,
			Position = self.props.Position,
			Rotation = self.props.Rotation,
			Size = UDim2.new(self.props.Width, StudioTextButton.HeightUDim),
			Text = self.props.Text,
			TextColor3 = theme:GetColor(self.props.TextColorEnum, styleGuideModifier),
			TextSize = 16,
			TextXAlignment = Enum.TextXAlignment.Center,
			TextYAlignment = Enum.TextYAlignment.Center,
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
		});
	end;
	StudioTextButton.HeightUDim = UDim.new(0, 22);
	StudioTextButton.defaultProps = {
		Active = true;
		AnchorPoint = Vector2.new(0, 0);
		BackgroundColorEnum = Enum.StudioStyleGuideColor.Button;
		BorderColorEnum = Enum.StudioStyleGuideColor.ButtonBorder;
		LayoutOrder = 0;
		Position = UDim2.new(0, 0, 0, 0);
		Rotation = 0;
		TextColorEnum = Enum.StudioStyleGuideColor.ButtonText;
		Width = UDim.new(1, 0);
		Visible = true;
	};
end;
exports.StudioTextButton = StudioTextButton;
return exports;
