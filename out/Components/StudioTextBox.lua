-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 7:49 PM Pacific Daylight Time

local TS = _G[script];
local exports = {};
local StudioTextBox;
local Roact = TS.import(TS.getModule("roact").roact.src);
local DeriveColorModifier = TS.import(script.Parent.Parent, "Common", "StudioComponentUtilities").DeriveColorModifier;
do
	StudioTextBox = Roact.Component:extend("StudioTextBox");
	function StudioTextBox:init(props)
		self:setState({
			CurrentText = self.props.Text;
			IsMouseOver = false;
			IsPressed = false;
			IsSelected = false;
		});
		if props.Text ~= nil then
			self._PreviousValidValue = props.Text;
		end;
	end;
	function StudioTextBox:render()
		local theme = settings().Studio.Theme;
		local styleGuideModifier = DeriveColorModifier(self.props, self.state);
				local _0;
				if self.state.CurrentText ~= nil and self.state.CurrentText ~= "" then
					_0 = self.state.CurrentText;
				else
					_0 = self.props.PlaceholderText;
				end;
		return Roact.createElement("Frame", {
			Active = self.props.Active,
			AnchorPoint = self.props.AnchorPoint,
			BackgroundColor3 = theme:GetColor(Enum.StudioStyleGuideColor.InputFieldBackground, styleGuideModifier),
			BorderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.InputFieldBorder, styleGuideModifier),
			BorderSizePixel = 1,
			LayoutOrder = self.props.LayoutOrder,
			Position = self.props.Position,
			Rotation = self.props.Rotation,
			Size = UDim2.new(self.props.Width, StudioTextBox.HeightUDim),
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
			[Roact.Event.SelectionGained] = function()
				self:setState({
					IsSelected = true;
				});
			end,
			[Roact.Event.SelectionLost] = function()
				self:setState({
					IsSelected = false;
				});
			end 
		}		, {
			["TextBox"] = Roact.createElement("TextBox", {
				Active = true,
				AnchorPoint = Vector2.new(0.5, 0.5),
				BackgroundTransparency = 1,
				BorderSizePixel = 0,
				ClearTextOnFocus = self.props.ClearTextOnFocus,
				Font = Enum.Font.SourceSans,
				PlaceholderColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainText, Enum.StudioStyleGuideModifier.Disabled),
				PlaceholderText = self.props.PlaceholderText,
				Position = UDim2.new(0.5, 0, 0.5, 0),
				Size = UDim2.new(1, -4, 1, -4),
				Text = self.props.Text,
				TextColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainText, styleGuideModifier),
				TextSize = 16,
				TextXAlignment = self.props.TextXAlignment,
				TextYAlignment = Enum.TextYAlignment.Center,
				Visible = self.props.Active,
				[Roact.Event.FocusLost] = function(actualInstance)
					if self.props.InputValidationCallback ~= nil then
						local isCurrentInputValid = self.props.InputValidationCallback(actualInstance.Text);
						if isCurrentInputValid then
							self._PreviousValidValue = actualInstance.Text;
						else
							if self._PreviousValidValue ~= nil then
								actualInstance.Text = self._PreviousValidValue;
							else
								actualInstance.Text = "";
							end;
						end;
					end;
					if self.props.Events ~= nil and self.props.Events.ValueChanged ~= nil then
						self.props.Events.ValueChanged(actualInstance, actualInstance.Text);
					end;
					self:setState({
						CurrentText = actualInstance.Text;
					});
				end 
			}),
			["DisabledTextLabel"] = Roact.createElement("TextLabel", {
				Active = false,
				AnchorPoint = Vector2.new(0.5, 0.5),
				BackgroundTransparency = 1,
				BorderSizePixel = 0,
				Font = Enum.Font.SourceSans,
				Position = UDim2.new(0.5, 0, 0.5, 0),
				Size = UDim2.new(1, -4, 1, -4),
				Text = _0,
				TextColor3 = theme:GetColor(Enum.StudioStyleGuideColor.MainText, Enum.StudioStyleGuideModifier.Disabled),
				TextSize = 16,
				TextXAlignment = self.props.TextXAlignment,
				TextYAlignment = Enum.TextYAlignment.Center,
				Visible = not self.props.Active 
			})
		});
	end;
	StudioTextBox.HeightUDim = UDim.new(0, 22);
	StudioTextBox.defaultProps = {
		Active = true;
		AnchorPoint = Vector2.new(0, 0);
		ClearTextOnFocus = true;
		LayoutOrder = 0;
		PlaceholderText = "";
		Position = UDim2.new(0, 0, 0, 0);
		Rotation = 0;
		Text = "";
		TextXAlignment = Enum.TextXAlignment.Center;
		Width = UDim.new(1, 0);
		Visible = true;
	};
end;
exports.StudioTextBox = StudioTextBox;
return exports;
