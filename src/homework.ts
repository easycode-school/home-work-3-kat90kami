//1.
function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
	let originalFunc = descriptor.value;

	// public info: String;
	descriptor.value = function () {
		let origResult = originalFunc.apply(this);
		origResult.date = '20/01/19';
		origResult.info = origResult.name + ' - $' + origResult.price;
		return origResult;
	}
}

class Item {
	public price: number;
	public name: string;

	constructor(name: string, price: number) {
		this.name = name;
		this.price = price;
	}

	@addItemInfoDecorator
	public getItemInfo() {
		return {
			name: this.name,
			price: this.price
		};
	}
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());


//2.
function addParams(createDate: string, type: string) {
	return function (targetClass) {
		return class {
			public name: string;
			public age: number;
			public createDate: string;
			public type: string;

			constructor(name: string, age: number) {
				this.name = name;
				this.age = age;
				this.createDate = createDate;
				this.type = type;
			}
		}
	}
}

@addParams('20/01/19', 'admin')
class User {
	public name: string;
	public age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
}
let res = new User('vasya', 69);
console.log(res);

//3.
// News api USA
namespace ApiUSA {
	export interface INews {
		id: number;
		title: string;
		text: string;
		author: string;
	}

	export class NewsService {
		protected apiurl: string = 'https://news_api_usa_url'
		public getNews() { } // method
	}
}

// News api Ukraine
namespace ApiUkraine {
	export interface INews {
		uuid: string;
		title: string;
		body: string;
		author: string;
		date: string;
		imgUrl: string;
	}

	export class NewsService {
		protected apiurl: string = 'https://news_api_2_url'
		public getNews() { } // method get all news
		public addToFavorite() { } // method add to favorites
	}
}


//4.
class Junior {
	doTasks() {
		console.log('Actions!!!');
	}
}

class Middle {
	createApp() {
		console.log('Creating!!!');
	}
}

class Senior implements Junior, Middle {
	doTasks(): void { };
	createApp(): void { };
	createArchitecture(): void {
		console.log('Creating Architecture!!!')
	}
}

applyMixins(Senior, [Junior, Middle]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
	baseCtors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			derivedCtor.prototype[name] = baseCtor.prototype[name];
		});
	});
}
