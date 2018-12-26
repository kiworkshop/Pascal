# [Pascal](http://pascal.kiworkshop.s3-website.ap-northeast-2.amazonaws.com/)
특허법인을 위한 상표 견적 계산기



## 개발 스택

| [Vue.js](https://vuejs.org/)                             |               [Vuetify](https://vuetifyjs.com)               |             [S3](https://aws.amazon.com/ko/s3/)              | [Elasticsearch](https://www.elastic.co/products/elasticsearch) |
| -------------------------------------------------------- | :----------------------------------------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------ |
| <img src="https://vuejs.org/images/logo.png" width=100/> | <img src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" width=100/> | <img src="https://cdn.worldvectorlogo.com/logos/aws-s3.svg" width=100/> | <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/121/thumb/elastic-elasticsearch.png" width=100/> |



## 사용 방법 예시

### 1. 검색하기

##### 1) 특허청 분류에 고시되어있는 지정상품을 국문, 영문으로 검색합니다.

![ezgif-2-e31d3ff22cb7](https://user-images.githubusercontent.com/12382114/50447324-ae285c80-095d-11e9-9433-b8152483b673.gif)

##### 2) 특정 분류 내에서 지정상품을 검색합니다.

![ezgif-2-4f98705ec8a6](https://user-images.githubusercontent.com/12382114/50447350-da43dd80-095d-11e9-9675-e32b129b05a9.gif)

##### 3) 검색한 상품을 추가합니다.

![ezgif-2-9310a55189c4](https://user-images.githubusercontent.com/12382114/50447373-03fd0480-095e-11e9-96da-40e3af97300f.gif)



### 2.상품 추가

##### 1) 추가할 상품 목록을(,로 구분) 입력받아 고시상품과 비고시상품으로 분류합니다.

![ezgif-2-2a1c79d01610](https://user-images.githubusercontent.com/12382114/50447573-78847300-095f-11e9-8dc3-03621e8382a6.gif)

##### 2) 분류된 비고시 상품의 분류는 기본적으로 미분류로 설정됩니다.

- 미분류인 상품이 하나라도 있으면 상품을 추가할 수 없습니다.
- 분류가 설정된 비고시 상품에 한해 고시상품으로 이동이 가능합니다.
  (미분류인 상품은 고시 상품으로 이동이 불가능합니다.)

![ezgif-2-fc9cd46610d6](https://user-images.githubusercontent.com/12382114/50447575-79b5a000-095f-11e9-8a98-550cd1040f9a.gif)

##### 3) 상품 입력 폼에서 분류를 지정 시, 해당 상품 입력란 중 비고시 상품은 지정된 분류로 기본적으로 설정됩니다.

![ezgif-2-b08bb06a5e49](https://user-images.githubusercontent.com/12382114/50447576-7ae6cd00-095f-11e9-8cff-531ac9ff5cdb.gif)
