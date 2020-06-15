깃헙에 TypeORM 을 보면 Active Record 와 Data Mapper 패턴을 둘 다 사용이 가능하다고 설명한다. Active Record 와 Data Mapper 의 차이점이 무엇인지 궁금하여 검색하다가 [Active Record vs Data Mapper](https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper) 글을 읽게 되었다.

> [Active Record vs Data Mapper](https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper) 글을 번역 및 정리.

---

# Active Record vs Data Mapper

## What is the Active Record pattern

Active Record 방식을 사용하면 모델 자체에서 모든 쿼리 메소드(query method)들을 정의하고 모델 메소드(model method)를 사용하여 개체(object)를 저장, 제거 및 로드를 할 수 있다.

간단하게 말해서, 액티브 레코드 패턴은 모델 내의 DB에 엑세스하는 접근하기 위한 방식이다.

Exapmle:

``` typescript
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

}
```

모든 액티비 레코드 엔터티는 엔터티에 대한 적업을 수행하는 메소드를 제공하는 `BaseEntity` 클래스를 extends 해야한다. 이러한 엔터티를 사용하는 예는 다음과 같다.

Example:

``` typescript
// example how to save AR entity
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.isActive = true;
await user.save();

// example how to remove AR entity
await user.remove();

// example how to load AR entities
const users = await User.find({ skip: 2, take: 5 });
const newUsers = await User.find({ isActive: true });
const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });
```

`BaseEntity` 는 표준 레파지토리의 많은 메소드들을 가지고 있다. 대부분의 경우 액티브 레코드 엔티티와 함꼐 `Repository` 또는 `EntityManager` 를 사용할 필요는 없다.

다음과 같이 `User` 클래스에서 static method 를 만들 수 있다.

``` typescript
@Entity()
export class User extends BaseEntity {
    // ...
    static findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }
}
```

``` typescript
const timber = await User.findByName("Timber", "Saw");
```

## What is the Data Mapper pattern?

Data Mapper 을 사용하면 모든 쿼리 메소드를 "Repository" 라는 별도의 클래스로 정의하고 리포지토리를 사용하여 객체를 저장, 제거 및 로드 할 수 있다. 데이터 매퍼에서 엔티티는 매우 dumb 하다. 단지 속성을 정의하고 "dummy" 메소드가 있을 수 있다.

간단히 말해서 데이터 매퍼는 모델 대신 리포지토리 내에서 데이터베이스에 액세스하는 방법이다.

Example:

``` typescript
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

}
```

``` typescript
const userRepository = connection.getRepository(User);

// example how to save DM entity
const user = new User();
user.firstName = "Timber";
user.lastName = "Saw";
user.isActive = true;
await userRepository.save(user);

// example how to remove DM entity
await userRepository.remove(user);

// example how to load DM entities
const users = await userRepository.find({ skip: 2, take: 5 });
const newUsers = await userRepository.find({ isActive: true });
const timber = await userRepository.findOne({ firstName: "Timber", lastName: "Saw" });
```

성과 이름을 이용하여 사용자를 반환하는 함수를 작성한다고 하자. "custom repository" 에서 다음과 같이 작성할 수 있다.

```typescript
import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository()
export class UserRepository extends Repository<User> {

    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }

}
```

``` typescript
const userRepository = connection.getCustomRepository(UserRepository);
const timber = await userRepository.findByName("Timber", "Saw");
```

[여기](https://orkhan.gitbook.io/typeorm/docs/custom-repository)서 다양한 custom repsitories example 를 볼 수 있다.

## Which one should i choose?

Data Mapper - 유지 관리에 도움이 되며 큰 애플리케이션에서 더 효과적.

Active Record - 소규모 앱에서 효과적, 단순하게 유지하는데 도움이 됨.

## NOTE

> The biggest difference between the data mapper pattern and the active record pattern is that the data mapper is meant to be a layer between the actual business domain of your application and the database that persists its data. Where active record seeks to invisibly bridge the gaps between the two as seamlessly as possible, the role of the data mapper is to allow you to consider the two more independently.
>
> Ref) [ORM Patterns: The Trade-Offs of Active Record and Data Mappers for Object Relational Mapping](https://www.thoughtfulcode.com/orm-active-record-vs-data-mapper/#:~:text=The%20biggest%20difference%20between%20the,database%20that%20persists%20its%20data.)

## Reference

[Active Record vs Data Mapper](https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper)

[ORM Patterns: The Trade-Offs of Active Record and Data Mappers for Object Relational Mapping](https://www.thoughtfulcode.com/orm-active-record-vs-data-mapper/#:~:text=The%20biggest%20difference%20between%20the,database%20that%20persists%20its%20data.)