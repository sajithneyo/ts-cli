import { install } from 'source-map-support';
install();

class Hello {
    static sayHello(): void {
        console.log('Hello World');
    }
}

Hello.sayHello();
