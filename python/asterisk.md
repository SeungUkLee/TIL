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


## 4. 컨테이너 타입의 데이터를 Unpacking 할 때

## Ref

[파이썬의 Asterisk 이해하기](https://mingrammer.com/understanding-the-asterisk-of-python/).