-- Compiled with https://roblox-ts.github.io v0.2.14
-- October 18, 2019, 7:26 PM Pacific Daylight Time

local TS = _G[script];
local exports;
local Roact = TS.import(TS.getModule("roact").roact.src);
local Signal = TS.import(TS.getModule("roblox-SignalsTooling").out).Signal;
local HttpService = TS.import(TS.getModule("services")).HttpService;
local _0;
do
	local StudioDialogFrame = setmetatable({}, {
		__tostring = function() return "StudioDialogFrame" end;
	});
	StudioDialogFrame.__index = StudioDialogFrame;
	function StudioDialogFrame.new(...)
		local self = setmetatable({}, StudioDialogFrame);
		self:constructor(...);
		return self;
	end;
	function StudioDialogFrame:constructor(pluginReference, name, title, size, dockWidgetPluginGuiId)
		self.Opened = Signal.new();
		self.Closed = Signal.new();
		if dockWidgetPluginGuiId == nil then
			dockWidgetPluginGuiId = HttpService:GenerateGUID();
		end;
		local dockWidgetPluginGuiInfo = DockWidgetPluginGuiInfo.new(Enum.InitialDockState.Float, false, true, size.X, size.Y, size.X, size.Y);
		local dockWidgetPluginGui = pluginReference:CreateDockWidgetPluginGui(dockWidgetPluginGuiId, dockWidgetPluginGuiInfo);
		dockWidgetPluginGui:GetPropertyChangedSignal("Enabled"):Connect(function()
			if dockWidgetPluginGui.Enabled then
				self.Opened:Fire();
			else
				self.Closed:Fire();
			end;
		end);
		dockWidgetPluginGui.Name = name;
		dockWidgetPluginGui.Title = title;
		self._DockWidgetPluginGui = dockWidgetPluginGui;
	end;
	function StudioDialogFrame:Close()
		self._DockWidgetPluginGui.Enabled = false;
	end;
	function StudioDialogFrame:Destroy()
		self.Opened:DisconnectAll();
		self.Closed:DisconnectAll();
		if self._Handle ~= nil then
			Roact.unmount(self._Handle);
		end;
		self._DockWidgetPluginGui:Destroy();
	end;
	function StudioDialogFrame:Open()
		self._DockWidgetPluginGui.Enabled = true;
	end;
	function StudioDialogFrame:SetContents(contents)
		if self._Handle ~= nil then
			Roact.unmount(self._Handle);
		end;
		self._Handle = Roact.mount(contents, self._DockWidgetPluginGui);
	end;
	_0 = StudioDialogFrame;
end;
exports = _0;
return exports;
