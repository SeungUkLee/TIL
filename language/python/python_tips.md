# Python tips

1. Swapping values
2. Create a single string from all the elements in list
3. Find The Most Frequent Value In A List.
4. Checking if two words are anagrams
5. Reverse a String
6. Reverse a list
7. Transpose 2d array
8. Chained Comparison
9. Chained function call
10. Copying List
11. Dictionary Get
12. Sort Dictionary by Value
13. For Else
14. Convert list to comma separated
15. Merge dict’s
16. Min and Max index in List
17. Remove duplicates from a list

## Swapping values
~~~ python
a, b = 5, 10
print(a, b)  # 5 10
a, b = b, a
print(a, b)  # 10 5
~~~

## Create a single string from all the elements in list
~~~ python
intro = ["Hello", "my", "name", "is", "seunguk"]
print(" ".join(intro))  # Hello my name is seunguk
~~~

## Find The Most Frequent Value In A List.
~~~ python
lst = [1,2,3,1,1,2,5,1,6,7,3,3,2]
print(max(set(lst), key=lst.count)) # 1

from collections import Counter
cnt = Counter(lst)  # Counter({1: 4, 2: 3, 3: 3, 5: 1, 6: 1, 7: 1})
print(cnt.most_common(3)) # 빈도수가 제일 높은 3개 출력. [(1, 4), (2, 3), (3, 3)]
~~~

## Checking if two words are anagrams
~~~ python
from collections import Counter

str1 = "listen"
tr2 = "silent"
Counter(str1) == Counter(str2)  # True
~~~

## Reverse a String
~~~ python
# reversing string with special case of slice step param
s = "abcd"
print(s[::-1])  # dcba

# iterating over string contents in reverse efficiently.
for ch in reversed(s):
    print(ch) # d c b a

# reversing an integer through type conversion and slicing
num = 12345
print(int(str(num)[::-1]))  # 54321
~~~

## Reverse a list
~~~ python
lst = [1, 2, 3, 4, 5]
print(lst[::-1])  # [5, 4, 3, 2, 1]

for e in reversed(lst):
    print(e) # 5 4 3 2 1
~~~

## Transpose 2d array
~~~ python
ori = [[1, 2], [3, 4], [5, 6]]
trans = zip(*ori)
print(list(trans))  # [(1, 3, 5), (2, 4, 6)]
~~~

## Chained Comparison
~~~ python
n = 10
print(5 < n < 15)   # True
print(1 == b < 20)  # False
~~~

## Chained function call
~~~ python
def product(a, b):
    return a * b

def add(a, b):
    return a + b

is_true = True
print((product if is_true else add)(5, 7))  # 35
~~~

## Copying List
~~~ python
# shallow copy (얕은 복사)
a = [1, 2, 3]
b = a
b[0] = 10
print(a)  # [10, 2, 3]
print(b)  # [10, 2, 3]


a = [1, 2, 3]
b = a[:]
b[0] = 10
print(a)  # [1, 2, 3]
print(b)  # [10, 2, 3]


c = [1, 2, 3, 4, 5]
d = list(c)
d[0] = 10
print(c)  # [1, 2, 3, 4, 5]
print(d)  # [10, 2, 3, 4, 5]

e = [1, 2, 3, 4, 5]
f = e.copy()
f[0] = 10
print(e)  # [1, 2, 3, 4, 5]
print(f)  # [10, 2, 3, 4, 5]

# copy nested lists
from copy import deepcopy
l = [[1, 2], [3, 4]]
l2 = deepcopy(l)
l2.append(1)
print(l)  # [[1, 2], [3, 4]]
print(l2) # [[1, 2], [3, 4], 1]
~~~

## Dictionary Get
~~~ python
d = {'a':1, 'b':2}
print(d.get('c',3))  # 3
print(d.get('c'))    # None
~~~

## Sort Dictionary by Value
~~~ python
fruit = {'apple': 10, 'banana': 7, 'orange': 14, 'tomato': 2}
print(sorted(fruit.itmes(), key=lambda x: x[1])) # ('tomato', 2), ('banana', 7), ('apple', 10), ('orange', 14)]

from operator import itemgetter
print(sorted(fruit.items(), key=itemgetter(1))) # ('tomato', 2), ('banana', 7), ('apple', 10), ('orange', 14)]

print(sorted(fruit, key=a.get))  # ['tomato', 'banana', 'apple', 'orange']
~~~

## For Else
~~~ python
# else gets called when for loop does not reach break statement
a = [1, 2, 3, 4, 5]
for e in a:
    if e == 0:
        break
else:
   print('did not break out of for loop')
# did not break out of for loop
~~~

## Convert list to comma separated
~~~ python
items = ['foo', 'bar', 'baz']
print(','.join(itmes))  # foo,bar,baz

nums = [1, 2, 3, 4, 5]
print(','.join(map(str, nums)))  # 1,2,3,4,5

datas = [1, 'hi', 3, 3.4]
print(','.join(map(str, data)))  # 1,hi,3,3.4
~~~

## Merge dict’s
~~~ python
d1 = {'a':2}
d2 = {'b':3}
print({**d1, **d2})  # {'a': 2, 'b': 3}
print(dict(d1.items() | d2.items()))  # {'a': 2, 'b': 3}

d1.update(d2)
print(d1)  # {'a': 2, 'b': 3}
~~~

## Min and Max index in List
~~~ python
lst = [40, 10, 20, 30]

def min_index(lst):
    return min(range(len(lst)), key=lst.__getitem__)

def max_index(lst):
    return max(range(len(lst)), key=lst.__getitem__)

print(min_index(lst))  # 1
print(max_index(lst))  # 0
~~~

## Remove duplicates from a list
~~~ python
items = [2, 2, 3, 3, 1]
new_items = list(set(items))
print(new_items)  # [1, 2, 3] 원래의 목록 순서를 유지하지 않는다.

from collections import OrderedDict
items = ["foo", "bar", "bar", "foo", "baz"]
print(list(OrderedDict.fromkeys(items).keys()))  # ['foo', 'bar', 'baz']
>>>
~~~

## Reference
[Python Trikcs 101](https://hackernoon.com/python-tricks-101-2836251922e0)
