# AWS Lambda vs Docker Container - on AWS
AWS에서 마이크로 서비스 기반 아키텍쳐를 설계하고 빠르게 작업할 수 있는 방법이 2가지 있다.
 - Docker containers on ECS/ECR
 - AWS Lambda functions (Serverless)

## Docker Container
AWS에서 EC2 Continaer Servcie (ECS) 와 EC2 Container Registry (ECR) 와 같은 컨테이너 관리를 위한 프레임워크를 제공한다.

### ECS (EC2 Container Service )
Docker Swarm 또는 Marathon 과 비슷한 **컨테이너 오케스트레이션 프레임 워크**.
AWS에서 완전히 관리하며 core building block 은 일련의 상호 연결된 컨테이너(Docker Compose 라인을 따르는 컨테이너)를 구성하는 작업이다..


ECS는 사용자 정의 규칙에 따라 자동 확장되는 **EC2 인스턴스 클러스터** 위에서 작동한다. 기본적으로 EC2 이미지는 전용 Amazon ECS 최적화 AMI (ECS 에이전트 및 Docker로 사전 구성)를 기반으로한다. 필요한 경우 자신의 AMI를 사용할 수 있다 (예 : CoreOS). EC2 클러스터의 크기 조정 외에도 활성 컨테이너 인스턴스의 수를 동적으로 조정하여 개별 태스크를 관리 할 수 있다.


ECS는 내부 API Gateway로 작동 할 수 있는 ELB와 통합된다. 이 기능은 전용 HTTP 클라이언트를 덜어주며 linkerd, 쿼리 서비스 SRV 레코드와 같은 라우팅 데몬을 설정하거나 Nginx 템플릿을 유지 관리 할 필요가 없다.


가격면에서 볼 때 ECS는 필요한 처리 능력을 제공하는 EC2 리소스 외의 추가 비용을 발생시키지 않는다.


### ECR (EC2 Container Registry)

ECR은 Docker image 저장하며 가용성이 높고 확장성이 뛰어난 저장소이다. ECR을 사용하면 이미지에 대해 활용하는 스토리지에 대해서만 비용을 지불하면 된다.

-------

## AWS Lambda (Serverless)

AWS Lambda는 이벤트에 응답하여 특정 기능을 수행할 수 있게 해주는 서비스이다.
이벤트는 AWS API Gateway, Kinesis Streams, CloudWatch Events 와 같은 많은 곳에서 비롯된 것일 수 있다.


AWS Lambda를 사용하기 위해서는 코드를 준비하고 native Lambda API를 사용하여 핸들러 함수 (동기화 또는 비동기)를 나타내고 AWS에 업로드하면 된다. 또한 CPU 및 네트워크 대역폭을 비례 할당하여 함수 실행을 위한 최대 메모리 제한을 정의하면 된다.


보시다시피, 이 간단한 프로세스는 "Server"라는 개념을 언급하지 않고 "Serverless"라는 용어를 사용한다. 다른 lambda functions를 실행하는 컨테이너는 들어오는 호출 요청에 대한 응답으로 백그라운드에서 생성 및 확장된다. 이 프로세스는 AWS 고객에게는 보이지 않으며 AWS 고객은 기본 도메인 로직만 처리하면 되고 인프라 문제는 (거의) 무시할 수 있다

연속적인 환경에서 기능의 관리 및 수명주기를 돕기 위해 Lambda는 환경 변수, 버전 관리 및 aliase(별칭)과 같은 기능을 제공한다.


AWS Lambda는 귀하에게 다음과 같이 비용을 청구한다.
- 함수 호출 수 
- 함수 메모리 할당 
- 평균 함수 실행 기간

-------

## ECS Cluster vs AWS Lambda (feature by feature comparison [기능별 비교])

1. Simplicity

단순성 측면에서 볼 때 ECS cluster 구성 및 유지 관리는 큰 도전일 수 있으며 containerization technology 대해 알아야한다. 반면 Lambda는 인프라 복잡성을 추상화하여 코드를 통해 전달되는 비즈니스 성과에 중점을 두고 있다.


또한 Lambda는 per-environment function aliases (환경 별 기능 별칭)을 사용하여 신속하게 코드를 업데이트하고 CloudWatch를 통해 모니터링을 제공하며 IAM 역할을 통해 보안을 유지 할 수 있다. 특히 Lambda는 이벤트 처리 파이프 라인을 만들고 AWS API Gateway를 사용하여 외부 API에 대한 백엔드 서비스를 만드는 것이 매우 간단하다. 이것을 AWS SAM 및 Serverless와 같은 프레임 워크와 결합할 수 있다.

Score : ECS < Lambda


2. Usage patterns

예측할 수 없고 고도로 밀집된 트래픽 시나리오와 같은 상황에서 람다는 가장 비용 효율적이고 편리한 선택이다. 내장 된 auto-scaling 기능 덕분에 초기 계획이 필요 없다.

반대로 트래픽이 적은 경우에는 "콜드 스타트 ??(cold start)"효과로 인해 람다의 성능이 고르지 않을 수 있다. 주어진 유예 기간 내에 함수를 사용하지 않는다면, 처음부터 컨테이너를 만들고 작업 메모리에 코드를 로드해야 할 수도 있다. 반면 ECS는 주어진 순간에 활성화 된 서비스 작업의 최소 수를 정의 할 수 있다.

또한 예측 가능성이 높은 트래픽 시나리오의 경우 ECS가 최선의 방법이다. 예를 들어 5 초 간격으로 수천 명의 데이터 제공 업체의 GPS 측정 항목을 폴링해야했던 고객 중 예약 된 EC2 인스턴스 클러스터를 사용하면 람다에 의존하는 것보다 훨씬 낮은 비용이 발생했다.

반복적 인 사용량 증가 (매일, 매주, 계절별)의 경우 ECS를 사용하면 클러스터 확장 동작을 완전히 제어 할 수 있다. [Scryer](https://medium.com/netflix-techblog/scryer-netflixs-predictive-auto-scaling-engine-a3f8fc922270) by Netflix는 예상 트래픽 준비에 EC2 스케일링을 자동화하기 위해 히스토리 데이터와 FFT 알고리즘 (MP3 인코딩에 사용되는 고속 푸리에 변환)을 사용했다. AWS 서버 비용을 대폭 절감했을뿐만 아니라 "Just In Time(JIT)"처리 능력 프로비저닝을 통해 사용자 수가 증가하였다.

새로운 EC2 인스턴스를 돌리는데 몇 분이 걸릴 수 있기 때문에 Netflix가 request volumes의 갑작스러운 급증을 처리하기에는 너무 길다 (물론 더 많은 공격 규칙을 조정할 수는 있지만 추가 비용과 비정상적인 클러스터가 발생할 수 있다). Scryer를 통해 문제를 완전히 극복 할 수 있었다고 한다.

반대로 Lambda는 이러한 종류의 제어 기능을 제공하지 않는다. Auto-scaling은 AWS의 내부에서 숨겨지며 리소스는 암시적으로 예열되지 않는다.

Score : No winner. 비즈니스 usage pattern에 따라 다르다.


3. Polyglotism

Docker는 자연스럽게 다 언어 microservices를 지원한다. 반면에 Lambda functions는 AWS에서 현재 지원하는 것으로 제한된다.


Score : ECS > Lambda


4. Persistence

ECS는 EBS 디스크를 클러스터를 구성하는 EC2 인스턴스에 연결할 수 있기 때문에 stateless 및  stateful services 를 모두 배포 할 수 있다.

반대로, Lambda는 오직 stateless services 에만 적용된다 (ephemeral/tmp 파일 저장소를 사용할 수는 있지만 이것은 함수 호출을 통해 유지되지는 않는다). 즉 DB를 제외한 모든 것이 linear service scalability를 가능하게하려면 stateless가 되어야한다.

Score : ECS > Lambda


5. User Interface

AWS Lambda function은 엄격하게 백엔드 종류에 속한다. Lambda를 기반으로 Microservices 를 위한 프론트 엔드를 제작해야한다면, [SoundCloud](https://www.thoughtworks.com/insights/blog/bff-soundcloud)에서 성공적으로 구현 된 [Backend for Frontend](https://samnewman.io/patterns/architectural/bff/) 패턴을 사용할 수 있다.

프론트 엔드가 monolith/bottleneck (병목 현상)이 될까봐 걱정된다면 Spotify를 참고해도 된다. Spotify 데스크톱 앱은 Chromium을 사용하며 각 페이지 요소는 독립적인 Microservicse에 의해 직접 렌더링된다. "HTML Interface"를 직접 드러내는 서비스만으로 이 모델을 풀어 낼 수 있다.

Score : AWS는 여기에 패배.


6. Governance

Lambda에서는 각 microservice 관계를 효과적으로 시행한다. One Function = One API. 입력 매개 변수를 기반으로 특정 도메인 서비스 버전으로 라우팅하는 함수를 만들 수 있지만 AWS에 업로드 할 수 있는 코드 크기 제한에 빠르게 도달하게 된다. (패키지에 포함된 모든 종속성 포함).


spec 및 consumer contracts 관리와 관련하여 Lambda는 Swagger 또는 RAML 정의를 게시하는 HTTP-enabled microservices(내부 API Gateway 뒤에 기능을 배치하지 않는 경우)를 사용한다. 


Score : ECS > Lambda


7. Portability

Docker는 컨테이너화를 위한 사실상의 표준이므로 필요에 따라 서비스를 다른 Docker 기반 orchestration platforms에 쉽게 포팅 할 수  있다.


반면에 Lambda는 microservice를 AWS 플랫폼과 긴밀하게 연결한다. 재사용 가능한 "cloud-agnostic" 클라이언트 라이브러리 뒤에 모든 AWS API 호출을 캡슐화하면 coupling을 최소화 할 수 있다. 이는 권장하는 솔루션이지만 일반적으로 추가 비용과 유지 보수 노력이 필요하다.


8. Long running processes

Lambda function 호출은 5분 이상 걸릴 수 없다. - 더 복잡한 작업은 SEDA에 따라 더 작은 파이프 lambda function으로 분할해야한다.


하지만 아키텍쳐 단순성(simplicity) 유지 측면에서 이것이 반드시 나쁜 것은 아니다. 하나의 Lambda function으로 모든 처리 단계를 패키징하고 다른 매개변수로 자체 호출을 수행 할 수 있다. 또는 Kinesis에서 지속성(persistence)을 위해 중간 결과를 스테이지 할 수 있다.

Score : No Winner


9. Resource heavy processes

Single Lambda function 실행을 위해 최대 1.5GB의 RAM을 할당 할 수 있다. ECS의 경우 RAM, CPU 및 네트워크 대역폭은 처리 능력의 폭을 제공하는 기본 EC2 리소스에 의해서만 제한된다. 


10. Communication style

Cross-lambda communication은 RPC이다. 이 경우 caching  또는 hypermedia controls을 포함하여 RESP의 이점을 누릴 수 없다. 솔직히 거의 아무도 기계 대 기계 (machine-to-machine) 인터페이스에서 hypermedia를 사용하지는 않는다. 기존 REST 구현의 대부분은 HTTP wire를 통해 전송된 JSON을 기반으로하는 RPC이다. 그래도 REST를 사용하려면 ECS에 배포 된 microservices로 이 작업을 수행 할 수 있다.


11. New vs. existing services

각각 새로운 기능을 위해 microservice에 정착하는 것은 마틴 파울러가 만들어 낸 risk-driven "monolith first" 접근법과 상충 될 수 있다. 이 모델은 관리가 불가능한  integration knot of nanoservices을 만들 가능성을 최소화하는 것을 목표로 한다.
-------

## Reference

[Microservices on AWS – Docker Containers vs. AWS Lambda in 11 Rounds](https://blog.bluesoftglobal.com/microservices-on-aws/).
