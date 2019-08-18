# VPC 기본 구성 요소들

## VPC
- 프라이빗 클라우드를 만드는데 가장 기본이 되는 리소스.
- 논리적인 독립 네트워크를 구성하는 리소스
- IPv4 CIDR 블록을 필수적으로 가짐
- 클라우드에서 생성하는 자원들은 기본적으로 특정 네트워크 위에서 생성되며 이에 접근하기 위한 프라이빗 IP를 가지는데 이 리소스들은 특정 VPC위에서 만들어짐(VPC의 CIDR 범위 안의 적절한 IP를 할당 받게됨)
- 가능하면 사설망 대역으로 사용
- CIDR이 같거나 겹치더라도 생성하는 것이 가능하지만 다수의 VPC를 함께 사용하는 경우 문제가 발생함.

## Subnet

- 서브넷은 실제로 리소스가 생성되는 물리적인 공간인 AZ(Available Zone - 가용존)과 연결됨
- VPC가 논리적인 범위를 의미한다면, 서브넷은 VPC 안에서 실제로 리소스가 생성될 수 있는 네트워크라고 생각하자
- 하나의 VPC에 N개 서브넷을 가짐(최대 크기는 VPC 크기과 같음)
- 일반적으로 사용할 수 있는 AZ를 고려하여 적절한 크기의 서브넷들을 AZ 수 만큼 생성해서 사용
- 모든 AZ을 사용하지 않더라도 2개 이상의 AZ를 사용하는 것이 일반적


## Route Table

- 라우트 테이블은 서브넷과 연결되어있는 리소스
- 서브넷에서 네트워크를 이요할 때 이 라우트 테이블을 사용해서 목적지를 찾음
- 인터넷을 연결하거나 다른 VPC와 통신하기 위해서는 라우트 테이블에 라우트 규칙을 추가해야됨



## Reference

[만들면서 배우는 AWS VPC 입문 아마존 웹 서비스 네트워크의 기초](https://www.44bits.io/ko/post/understanding_aws_vpc#%EA%B8%B0%EB%B3%B8-vpc%EC%9D%98-%EA%B5%AC%EC%84%B1-%EC%9A%94%EC%86%8C%EB%93%A4)

## 더 참고할 거

[PRIVATE SUBNET 으로 서비스 구성하기](http://linux.systemv.pe.kr/aws-private-subnet-%EC%9C%BC%EB%A1%9C-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0/)

[AWS를 위한 네트워크 용어 정리 - CIDR와 서브넷](https://gompro.postype.com/post/2491387)

[AWS Lambda 고오급 튜토리얼 - 3](https://velog.io/@leejh3224/AWS-Lambda-%EA%B3%A0%EC%98%A4%EA%B8%89-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-3-rzjn6mvcdb)

[AWS VPC를 디자인해보자(1) ~ (4)](https://bluese05.tistory.com/45)

[AWS VPC basic](https://blog.2dal.com/2017/09/12/aws-vpc-basic/)

