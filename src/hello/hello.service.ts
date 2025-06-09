/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';



@Injectable()
export class HelloService {
    voidd():string{
        return "HELLO THIS IS VOID"
    }


   
    dynamicValue(name: string):string{
        return `Hello ${name} are you sure your name is ${name}`
    }

     getArrofthns(){
            return[
                {
                    name: "abhiral",
                    age:18,
                    hobby: "NVM",
                    id: 1
                },
                {
                    name: "Jenkins",
                    age: 21,
                    hobby: "PipeLining",
                                        id: 2

                },
            {
                name: "Docker | Kubernetes",
                age: 29,
                hobby: "Containerization",
                                    id: 3
            }
            ]
        }

find_the_user(num: number) {
    const ag = this.getArrofthns().find((e) => e.id === num); // ✅ Use `.find()` to get a single object

    if (!ag) {
        return "Nothing found"; // ✅ Properly check for `undefined`
    }

    return ag; // ✅ Return the found object
}
}
