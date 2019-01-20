var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//1.
function addItemInfoDecorator(target, method, descriptor) {
    let originalFunc = descriptor.value;
    // public info: String;
    descriptor.value = function () {
        let origResult = originalFunc.apply(this);
        origResult.date = '20/01/19';
        origResult.info = origResult.name + ' - $' + origResult.price;
        return origResult;
    };
}
class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getItemInfo() {
        return {
            name: this.name,
            price: this.price
        };
    }
}
__decorate([
    addItemInfoDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Item.prototype, "getItemInfo", null);
let item = new Item('Apple', 100);
console.log(item.getItemInfo());
//2.
function addParams(createDate, type) {
    return function (targetClass) {
        return class {
            constructor(name, age) {
                this.name = name;
                this.age = age;
                this.createDate = createDate;
                this.type = type;
            }
        };
    };
}
let User = class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
User = __decorate([
    addParams('20/01/19', 'admin'),
    __metadata("design:paramtypes", [String, Number])
], User);
let res = new User('vasya', 69);
console.log(res);
//3.
// News api USA
var ApiUSA;
(function (ApiUSA) {
    class NewsService {
        constructor() {
            this.apiurl = 'https://news_api_usa_url';
        }
        getNews() { } // method
    }
    ApiUSA.NewsService = NewsService;
})(ApiUSA || (ApiUSA = {}));
// News api Ukraine
var ApiUkraine;
(function (ApiUkraine) {
    class NewsService {
        constructor() {
            this.apiurl = 'https://news_api_2_url';
        }
        getNews() { } // method get all news
        addToFavorite() { } // method add to favorites
    }
    ApiUkraine.NewsService = NewsService;
})(ApiUkraine || (ApiUkraine = {}));
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
class Senior {
    doTasks() { }
    ;
    createApp() { }
    ;
    createArchitecture() {
        console.log('Creating Architecture!!!');
    }
}
applyMixins(Senior, [Junior, Middle]);
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
