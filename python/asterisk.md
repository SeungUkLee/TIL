# 파이썬 asterisk(*)

파이썬 코드를 보다보면 * 를 볼 수 있다. 이는 크게 4가지의 연산들을 한다.
1. 곱셉 및 거듭제곱 연산
2. list형 컨테이너 타입의 데이터를 반복 확장할 때
3. 가변인자를 사용하고 싶을 떄
4. 컨테이너 타입의 데이터를 Unpacking 할 때

## 1. 곱셉 및 거듭제곱 연산

곱셈을 하고 싶을 떄는 * 를 한번만 사용하면 되고 거듭제곱 연산을 하고 싶으면 ** 를 사용하면 된다.

~~~ python
print(2 * 3)   # 6
print(2 ** 3)  # 8
~~~

## 2. list형 컨테이너 타입의 데이터를 반복 확장할 때
list형 컨테이너 타입에서 데이터를 반복적으로 확장하기 위해 사용할 수도 있다.

~~~ python
num_one_lists = [1] * 100
print(num_one_lists.__len__())  # 100

num_one_tups = (1,) * 100
print(num_one_tups.__len__())   # 100

# 리스트 3배 확장 후 연산
vector_list = [[1,2,3]]
for i, vector in enumerate(vector_list * 3):
    print("{0} scalar product of vector: {1}".format((i + 1), [(i + 1) * e for e in vector]))
# 1 scalar product of vector: [1, 2, 3]
# 2 scalar product of vector: [2, 4, 6]
# 3 scalar product of vector: [3, 6, 9]
~~~

## 3. 가변인자를 사용하고 싶을 떄

파이썬에서는 인자의 종류가 **positional arguments** 와 **keyword arguments** 이렇게 2가지가 있다. 

- positional arguments : 위치에 따라 정해지는 인자
- keyword arguments : 키워드(이름)을 가진 인자.

### positional arguments 만 받을 때

~~~ python
def positional_args(*args):
    print(args)

positional_args('lee', 'alic', 'tom', 'uk')
# ('lee', 'alic', 'tom', 'uk')
~~~


### keyword arguments 만 받을 때

~~~ python
def keyword_args(**kwargs):
    print(kwargs)

keyword_args(a='lee', b='alic', c='tom', d='uk')
# {'d': 'uk', 'a': 'lee', 'b': 'alic', 'c': 'tom'}
~~~


### positional arguments 와 keyword arguments 를 모두 받을 때

~~~ python
def positional_and_keyword_args(*args, **kwargs):
    print(args)
    print(kwargs)

positional_and_keyword_args('lee', 'alic', c='tom', d='uk')
# ('lee', 'alic')
# {'d': 'uk', 'c': 'tom'}
~~~

`*args` 는 임의의 갯수의 **positional arguments** 를 받는다라는 의미이며, `**kwargs` 는 임이의 갯수의 **keyword arguments** 를 받는다라는 의미이다. 이 때 `*args`, `**kwargs` 형태로 가변인자를 받는 걸 **packing** 이라고 한다.

positional 형태로 전달하는 인자들은 `args` 라는 **tuple** 형태로 저장되며, keyword 형태로 전달되는 인자들은 `kwargs` 라는 **dict** 형태로 저장된다.

## 4. 컨테이너 타입의 데이터를 Unpacking 할 때

컨테이너 타입의 데이터를 **unpacking** 하는 경우에도 사용할 수 있다. 

~~~ python
primes = [2, 3, 5, 7, 11, 13]
def product(*numbers):
    print(numbers) 

product(*primes) # (2, 3, 5, 7, 11, 13)
product(primes)  # ([2, 3, 5, 7, 11, 13],)
~~~

`product()` 함수는 가변인자를 받고 있기 때문에 변수 `primes` 의 데이터를 모두 unpacking 하여 함수에 전달해야한다. 이럴 경우 `*primes` 와 같은 형태로 전달하여 데이터의 모든 값들이 numbers 에 저장된다.

## Ref

[파이썬의 Asterisk 이해하기](https://mingrammer.com/understanding-the-asterisk-of-python/).