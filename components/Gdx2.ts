namespace infos {
	Info;
	list(path: string = '/'): Info[];
}

namespace entries {
	infos;
	Entry;
	create(path: string, content: any): Promise<void>;
	get(path: string): Promise<Entry>;
	update(path: string, content: any): Promise<void>;
	delete(path: string): Promise<void>;
}

namespace gdx2 {
	entries;
};

export gdx2;
