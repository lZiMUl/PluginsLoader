class MainActivity {
	constructor (Socket, CallBack) {
		const Import = require ('modules-import');

		new Import (new Array ('fs', 'path'));

		const LWPC = FilePath => FilePath ['replace'] (new RegExp ('/', 'img'), Path ['sep'] === '\\'? '\\\\': '/');
		const Root = LWPC (Path ['join'] (Path ['dirname'] (__dirname), '../../', './Plugins/'));
		const PluginsList = new Object;

		if (Object ['prototype'] ['toString'] ['call'] (Socket) === '[object Object]')
		Fs ['exists'] (Root, Status => {
			if (!Status) 
			Fs ['mkdir'] (Root, Status => null);
			Fs ['readdir'] (Root, (Status, Results) => {
				if (Status === null && Results ['length'] !== 0)
				Results ['forEach'] ((Result, Index) => {
					const ManifestPath = LWPC (Path ['join'] (Root, Result, 'Manifest.JSON'));
					Fs ['exists'] (ManifestPath, Status => {
						if (Status) {
							Fs ['readFile'] (ManifestPath, 'UTF-8', (Status, Data) => {
								if (Status === null && this ['IsJson'] (Data)) {
									const ParseData = JSON ['parse'] (Data);
									if (this ['IsContentLegitimate'] ('Name', 'String', ParseData) && this ['IsContentLegitimate'] ('Description', 'String', ParseData)  && this ['IsContentLegitimate'] ('Author', 'String', ParseData)  && this ['IsContentLegitimate'] ('Main', 'String', ParseData) && this ['IsContentLegitimate'] ('Version', 'String', ParseData)) {
										const MainPath = LWPC (Path ['join'] (Root, Result, ParseData ['Main']));
										Fs ['exists'] (MainPath, Status => {
											if (Status)
											try {
												Fs ['readFile'] (MainPath, 'UTF-8', (Status, Data) => {
													if (Status === null) {
														if (const Repeat (PluginsList) ['indexOf'] (ParseData ['Name']) === -1) {
															PluginsList [ParseData ['Name']] = new (eval (`(${Data})`)) (Socket);
															PluginsList [ParseData ['Name']] ['Manifest'] = ParseData;
															console ['info'] (`[${Result}] => 載入成功`);
														} else
														console ['error'] (`[${Result}] => 載入失敗 重複包名`);
														}
												})
											} catch (Err) {}
										})
									}
								}
							})
						}
					});
					if (Index === Results.length - 1)
					setTimeout(Event => {
						if (Object ['prototype'] ['toString'] ['call'] (CallBack) === '[object Function]') 
						CallBack (PluginsList);
						}, 1000)
				});
			})
		})
	}

	IsJson (Content) {
		try {
			const Obj = JSON ['stringify'] (JSON ['parse'] (Content)) ['split'] ('');
			if (Obj [0] === '{' && Obj [Obj ['length'] - 1] === '}')
			return true;
			return false;
		} catch (Err) {
			return false;
		}
	}

	IsContentLegitimate (Key, Value, ParseData) {
		if (ParseData [Key] !== undefined && Object ['prototype'] ['toString'] ['call'] (ParseData [Key]) === `[object ${Value}]`)
		return true;
		return false;
	}
	
	Repeat (Data) {
		const Result = new Array;
		for (let Value in Data)
		Result ['push'] (Value);
		return Result;
	}
}

module ['exports'] = MainActivity;

new MainActivity