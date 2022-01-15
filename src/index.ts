import 'source-map-support/register';

class Hello {
    public sayHello(): void {
        console.log('Hello World');
    }
}

const hello = new Hello();
hello.sayHello();
