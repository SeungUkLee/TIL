# 깊은 복사, 얕은 복사

~~~ python
class Bus:
    def __init__(self, passengers=[]):
        self.passengers = passengers
    
    def pick(self, name):
        self.passengers.append(name)
    
    def drop(self, name):
        self.passengers.remove(name)

bus1 = HauntedBus(['Alice', 'Bill'])
bus1.passengers  #['Alice', 'Bill']
bus1.pick('Charlie')
bus1.drop('Alice')
bus1.passengers  #['Bill', 'Charlie']

bus2 = HauntedBus()
bus2.pick('Carrie')
bus2.passengers  #['Carrie']
bus3 = HauntedBus()
bus3.passengers  #['Carrie']  # ?????
bus3.pick('Dave')

bus2.passengers  #['Carrie', 'Dave']
bus2.passengers is bus3.passengers  #True
bus1.passengers  #['Bill', 'Charlie']

dir(HauntedBus.__init__)
#['__annotations__', '__call__', ..., '__defaults__', ...]
HauntedBus.__init__.__defaults__
#(['Carrie', 'Dave'],)
HauntedBus.__init__.__defaults__[0] is bus2.passengers
# True
~~~

`__init__` 생성자의 매개변수는 `[]` 가 기본값으로 되어있다. **각 기본값은 함수가 정의 될 때 (일반적으로 모듈이 로딩될 때) 평가되고 기본값은 함수 객체의 속성이 된다.** 즉, 기본값은 가변 객체이고, 이 객체를 변경하면 변경 내용이 향후 이 함수의 호출에 영향을 미친다. 

이러한 문제 때문에 가변값을 받는 매개변수의 기본값은 `None` 을 주로 사용한다. `__init__` 은 `passengers` 인수가 None 인지 확인하고 새로운 빈 리스트를 할당한다.

따라서 위 코드의 `__init__` 을 좀 더 방어적인 프로그래밍을 하기 위해 아래처럼 수정할 수 있다.

~~~ python
def __init__(self, passengers=None):
    if passengers is None:
        self.passengers = []
    else:
        self.passengers = passengers
~~~

## Reference
[파이썬의 함정 - 3. 참조, 얕은 복사, 깊은 복사](https://hamait.tistory.com/m/844?category=79136)