-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 7:26 PM Pacific Daylight Time

local TS = _G[script];
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local _SIZE = UDim2.new(0, 27, 0, 16);
local _IMAGES = {};
local _0 = {
	[false] = "rbxasset://textures/TerrainTools/import_toggleOff_dark.png";
	[true] = "rbxasset://textures/TerrainTools/import_toggleOn_dark.png";
};
_IMAGES["Dark"] = _0;
local _1 = {
	[false] = "rbxasset://textures/TerrainTools/import_toggleOff.png";
	[true] = "rbxasset://textures/TerrainTools/import_toggleOn.png";
};
_IMAGES["Light"] = _1;
local _2;
do
	local StudioToggle = Roact.Component:extend("StudioToggle");
	function StudioToggle:init(props)
		self:setState({
			IsMouseOver = false;
			IsPressed = false;
			IsSelected = false;
			IsOn = self.props.IsOnByDefault;
		});
	end;
	function StudioToggle:render()
		local theme = settings().Studio.Theme;
			local _3;
			if self.props.Active ~= nil then
				_3 = self.props.Active;
			else
				_3 = true;
			end;
			local _4;
			if self.props.LayoutOrder ~= nil then
				_4 = self.props.LayoutOrder;
			else
				_4 = 0;
			end;
			local _5;
			if self.props.Rotation ~= nil then
				_5 = self.props.Rotation;
			else
				_5 = 0;
			end;
			local _6;
			if self.props.Visible ~= nil then
				_6 = self.props.Visible;
			else
				_6 = true;
			end;
		return Roact.createElement("ImageButton", {
			Active = _3,
			AutoButtonColor = false,
			BackgroundTransparency = 1,
			BorderSizePixel = 0,
			LayoutOrder = _4,
			Image = _IMAGES[theme.Name][self.state.IsOn],
			Rotation = _5,
			Size = _SIZE,
			Visible = _6,
			[Roact.Event.MouseButton1Click] = function()
				local isOn = not self.state.IsOn;
				self:setState({
					IsOn = isOn;
				});
				if self.props.Events ~= nil and self.props.Events.Toggled ~= nil then
					self.props.Events.Toggled(isOn);
				end;
			end 
		});
	end;
	_2 = StudioToggle;
end;
exports = _2;
return exports;
