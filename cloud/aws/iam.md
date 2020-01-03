# AWS IAM
iam은 aws resources 에 대한 사용자의 엑세시 및 인증을 관리해주는 서비스. IAM 을 통해 User, Group, Role, Policy 을 생성.  만들어진 User, Group, Role 에 Policy 를 적용하여 AWS resources 에 대한 접근을 제어할 수 있다.

> User : 사용자
> Group : 공통 역할을 하는 사용자들의 집합
> Role : 사용자나 그룹에 할당하는 것이 아닌 EC2 같은 aws 리소스에 할당
> Policy : 하나이상의 Permissions 를 정의
> Permission : 어떤 리소스와 어떤 작업을 허용 or 거부 할지를 결정

## Identity based policies & Resource based policies

Identity-based policies : 사용자, 그룹, 및 롤에 할당하는 IAM 정책
Resource based policies : AWS resouce 에 할당되는 정책

## IAM Policy 3가지 유형

### AWS Managed Policy

AWS에서 제공해주는 정책. IAM 에서 Policies 를 조회해서 나오는 policy 들이 managed policies 이다.  managed policies 는 모든 계정에서 사용가능.

### Customer Managed Policies

사용자가 직접 만드는 정책. 해당 정책을 생성한 계정에서만 유효하다.

### Inline Policies

Managed Policies와는 달리 User, Group, Role에 one-to-one로 명시적으로 할당되는 정책. 하나의 Inline Policies를 다수의 사용자가 공유할 수 없고, 동일한 내용의 Inline Policy라 하더라도 별도로 생성하여 할당해야 한다.

> AWS IAM에서는 Inline Policies보다 Managed Policy 사용을 권장.
> 특정 사용자에게만 특정 권한을 주고 싶을 경우에는 Inline Policy를 사용.

## Reference
[AWS IAM Policy 사용해보기 - redwood - Medium](https://medium.com/@labcloud/aws-iam-policy-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0-ca93cb6c868)

