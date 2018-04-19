# NodeJS Database

데이터베이스는 서버에서 데이터를 저장할 수 있는 별도의 프로그램.
이때까지 데이터를 변수를 만들어 값을 저장하여 DB처럼 사용했는데 만약 서버가 재시작되면 데이터가 초기화가 되므로 데이터베이스를 사용해야한다.

데이터 베이스는 분류하자면 크게 3가지 나온다.

1. SQL DB- MySQL, PostgreSQL, Aurora, Sqlite

테이블 형식의 데이터베이스
 
2.  NoSQL DB - MongoDB, DynamoDB

테이블 형식이 아니라 도큐먼트 형식의 데이터베이스.
json형식이라고 보면 된다.

3. In Memory DB - Redis, Memcashed

메모리 안에 다가 데이터베이스를 만들어 놓은 것. 메모리 안에 저장하다보니 DB가 재구동되면 데이터가 다 날라가게 되어있다.
그래도 사용하는 이유는 서비스의 성능 향상을 위해 사용한다. 인증 토큰, 세션, 자주 사용되는 데이터들은 In Memory DB를 사용한다.

1. SQL 쿼리

데이터베이스는 데이터를 관리하는 역할을 가지고 잇는데 쿼리를 이용하여 관리할 수 있다.

```sql
insert table ('name') values('alice');
select * from users;
update users set name = 'bek' where id = 1;
delete from users where id = 1;
```

2. ORM
데이터베이스를 객체로 추상화해 논것을 ORM이라고 한다.
쿼리를 직접 작성하는 대신 ORM의 메소드로 데이터 관리를 할 수 있다.
좀 더 어플리케이션의 코드를 깔끔하게 유지할 수 있다는 장점이 있지만
잘못쓰면 성능 이슈도 있다고 한다.
노드에서는 SQL ORM은 시퀄라이져가 있다.

시퀄라이져를 사용하면 위 쿼리를 다음과 같이 쓸 수 있다.

```js
User.create({name: 'aclie'})
User.findAll()
User.update({name:'bek'}, {where: {id: 1}});
User.destory(where: {id: 1}});
```

메소드 앞에 User라는 객체가 있는데 이 객체를 ORM에서는 모델이라고 한다.

3. 모델
데이터베이스 테이블을 ORM으로 추상화한것을 모델이라고 한다.

`sequelize.define() # 모델 정의`
`sequelize.sync() # 데이터베이스 연동(동기화)`

4. API - 디비 연동
API 로직인 user.ctrl.js 에서 모델을 연동하여 디비를 연결하여 사용.
> ctrl 은 controller 를 의미.
