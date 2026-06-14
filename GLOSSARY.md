# 용어 사전

1. [서비스 용어](#서비스-용어)
2. [변수](#변수)
   1. [숫자](#숫자)
   2. [시간](#시간)
   3. [약어/축약어](#약어축약어)
   4. [Boolean](#boolean)
   5. [배열/객체](#배열객체)
3. [함수](#함수)
   1. [조회 함수](#조회-함수)
   2. [생성 함수](#생성-함수)
   3. [수정 함수](#수정-함수)
   4. [삭제 함수](#삭제-함수)
   5. [검사 함수](#검사-함수)
   6. [변환 함수](#변환-함수)
4. [라이브러리](#라이브러리)

## 서비스 용어

서비스 기획과 운영 과정에서 변경된 용어를 반영해, 프로젝트 전반에 걸쳐 일관되게 사용해야 할 서비스 용어는 다음과 같습니다.

| 항목          | ✅ 올바른 예  | ❌ 잘못된 예          |
| ------------- | ------------- | --------------------- |
| 오픈예정      | launchingSoon | comingSoon            |
| 정산          | payout        | settlement            |
| 프로젝트      | project       | campaign              |
| 프로젝트 번호 | projectNo     | campaignId, projectId |

## 변수

### 숫자

**개수**

- 셀 수 있는 것의 총 개수
- `-Count` 접미사 사용
- 축약형 (`Cnt`, `Num`) 사용 금지

```typescript
// ✅ 올바른 예
const followerCount = 150;
const myCouponCount = 5;
const purchaseCount = 10;
const recommendedSupporterCount = 20;

// ❌ 잘못된 예
const followerCnt = 150;
const purchaseCnt = 10;
```

**수량**

- 상품, 재고 등 물리적 수량
- `-Quantity` 사용
- 서버 데이터가 `qty`인 경우 `-Qty` 사용

```typescript
// ✅ 올바른 예
const productQuantity = 5;

// ✅ 올바른 예 - 서버 데이터인 경우
const limitQty = 20;
const purchaseQty = 10;

// ❌ 잘못된 예
const stockCount = 100; // -Count → -Quantity
```

**금액**

- `-Amount` 접미사 사용
- `price`는 가격, `amount`는 금액

```typescript
// ✅ 올바른 예
const fundingAmount = 750000;
const goalAmount = 1000000;
const price = 10000;
const totalAmount = 50000;
const unitPrice = 10000;

// ❌ 잘못된 예
const goalAm = 1000000;
const totalAmt = 50000;
const totalPrice = 750000; // -Price → -Amount
```

**번호/식별자**

- 식별자: `-Id`, `-No` 접미사 사용 (`ID` 대문자 금지)
- 번호: `-Number` 사용
- 키: `-Key` 사용
- 코드: `-Code` 사용
- 프로젝트: `projectNo` 사용, `projectId` 금지

```typescript
// ✅ 올바른 예
const apiKey = 'abc123';
const cardNumber = '4111-1111-1111-1111';
const countryCode = 'KR';
const invoiceNo = 'INV-2025-001';
const orderNo = 'ORD-001';
const phoneNumber = '010-1234-5678';
const projectNo = 12345;
const trackingNo = 'KR1234567890';
const userId = 'user_123';
const zipCode = '12345';

// ❌ 잘못된 예
const phoneNum = '010-1234-5678'; // -Num → -Number
const orderNumber = 'ORD-001'; // -Number → -No
const projectId = 456; // -Id → -No
const userID = 'user_123'; // -ID → -Id
```

**값/크기/길이**

- `-Value`, `-Size`, `-Length` 사용

```typescript
// ✅ 올바른 예
const arrayLength = 10;
const defaultValue = 0;
const fileSize = 1024;
const inputValue = '';
const pageSize = 20;
const textLength = 50;

// ❌ 잘못된 예
const arrayLen = 10;
const fileSz = 1024;
const inputVal = '';
```

### 시간

**시각**

- `-Time` 접미사 사용

```typescript
// ✅ 올바른 예
const createdTime = '14:30:00';
const endTime = Date.now();
const startTime = new Date();

// ❌ 잘못된 예
const createdTm = '14:30:00';
const endTm = Date.now();
const startTm = new Date();
```

**일자**

- `-Date` 접미사 사용

```typescript
// ✅ 올바른 예
const createdDate = '2025-01-01';
const currentDay = 14;
const currentMonth = 1;
const currentYear = 2025;
const endDate = '2025-12-31';
const startDate = '2025-01-01';

// ❌ 잘못된 예
const createdDt = '2025-01-01';
const currentMon = 1;
const currentYr = 2025;
const endDt = '2025-12-31';
const startDt = '2025-01-01';
```

**일시**

- 일자 + 시각 조합
- `-At`, `-DateTime`, `-Timestamp` 접미사 사용
  - `-At`: 자동 생성 (시스템이 생성)
  - `-DateTime`: 능동 생성 (사용자가 생성)
  - `-Timestamp`: 타임스탬프

```typescript
// ✅ 올바른 예
const createdAt = new Date(); // 시스템이 자동 생성
const createdTimestamp = 1704067200000;
const startDateTime = new Date(); // 사용자가 능동 생성
const updatedAt = new Date();
const updatedTimestamp = 1704067200000;

// ❌ 잘못된 예
const createdDt = new Date();
const startTs = 1704067200000;
const updatedDt = new Date();
const updatedTs = 1704067200000;
```

**기간**

- `-Period`, `-Duration` 접미사 사용
  - `-Period`: 시작과 종료가 있는 기간 (`from`, `to` 사용)
  - `-Duration`: 지속 시간

```typescript
// ✅ 올바른 예
const datePeriod = { from: '2025-01-01', to: '2025-12-31' };
const sessionDuration = 3600; // 초
const timePeriod = { from: '09:00:00', to: '18:00:00' };

// ❌ 잘못된 예
const datePrd = { from: '2025-01', to: '2025-12' }; // -Prd → -Period
const dateRange = { start: '2025-01-01', end: '2025-12-31' }; // -Range → -Period
const duration = 3600; // duration -> 대상 + duration
const timePrd = { from: '09:00', to: '18:00' }; // -Prd → -Period
const timeRange = { start: '09:00:00', end: '18:00:00' }; // -Range → -Period
```

### 약어/축약어

**약어**

- 약어를 대문자로 표기 안 함
- 약어를 대문자로 표기했을 때 더 가독성이 좋은 경우 허용

```typescript
// ✅ 올바른 예
const baseUrl = 'https://api.wadiz.kr';
const htmlContent = '<div>content</div>';
const jsonData = { key: 'value' };
const userId = 'user123';

// ✅ 올바른 예 - 가독성이 더 좋은 경우
const currencyKRW = 'KRW'; // 통화 코드
const formatKRW = () => {}; // 통화 코드
const isCountryKR = true; // 국가 코드
const isCountryUS = false; // 국가 코드
const WAiAIAgent = {}; // 서비스 이름

// ❌ 잘못된 예
const baseURL = 'https://api.wadiz.kr'; // -URL → -Url
const userID = 'user123'; // ID → -Id
```

**축약어**

- 일반적인 용어 축약 금지
- 관행적으로 사용하는 용어인 경우 허용

```typescript
// ✅ 올바른 예
const description = '';
const element = {};
const error = {};
const event = {};
const message = '';
const request = {};
const response = {};

// ✅ 올바른 예 - 관행적으로 사용하는 용어
const args = {}; // arguments
const config = {}; // configuration
const info = {}; // information
const params = {}; // parameters

// ❌ 잘못된 예
const btn = {}; // button
const cfg = {}; // config
const conf = {}; // config
const desc = ''; // description
const e = {}; // e → error, event
const el = {}; // element
const err = {}; // error
const msg = ''; // message
const opt = {}; // option
const opts = {}; // options
const req = {}; // request
const res = {}; // response
const resp = {}; // response
const str = ''; // string
const txt = ''; // text
```

### Boolean

- `is-`, `has-`, `can-`, `should-` 접두사 사용 필수
- 질문 형태로 읽히도록 작성
- 긍정 상태 기준으로 네이밍
- 노출 여부: `isVisible` 사용
- 열림 여부: `isOpen` 사용
- 오픈 여부(프로젝트/이벤트): `isOpened` 사용

```typescript
// ✅ 올바른 예
const canDelete = false;
const canEdit = true;
const hasChildren = false;
const hasError = false;
const hasPermission = true;
const isActive = false;
const isDrawerOpen = false;
const isLoading = true;
const isModalOpen = false;
const isOpen = true;
const isVisible = true;
const shouldRender = true;
const shouldUpdate = false;

// ❌ 잘못된 예
const error = false; // isError
const isNotEmpty = true; // !isEmpty
const isOpened = true; // 일반적인 열림 여부는 isOpen 사용
const isModalOpened = true; // 모달 열림 여부는 isModalOpen 사용
const isProjectOpen = true; // 프로젝트/이벤트 오픈 여부는 isProjectOpened
const isShow = true; // isShow → isOpen
const isShowModal = false; // isShowModal → isModalOpen
const loading = true; // isLoading
const visible = true; // isVisible
```

### 배열/객체

**배열**

- 복수형 사용
- 복수형 표기 불가한 경우 `-List` 접미사 사용

```typescript
// ✅ 올바른 예
const items = [];
const projects = [];
const users = [];

// ✅ 올바른 예 - 복수형 표기 불가한 경우
const newsList = []; // 불가산명사
const snsList = []; // 복수형 표기 불가

// ❌ 잘못된 예
const projectArray = []; // Array 접미사 사용
const projectList = []; // 복수형 표기 가능
const userArr = []; // 축약어 사용
```

**객체**

- 의미가 명확한 이름 사용
- 여러 속성을 담는 컬렉션인 경우 복수형 사용
- 원시 타입과 구분이 필요한 경우 `-Object` 접미사 사용
- Map: `-Map` 접미사 사용
- Set: `-Set` 접미사 또는 복수형 사용

```typescript
// ✅ 올바른 예 - 의미가 명확한 경우
const language = { languageCode: 'ko', languageName: '한국어' };
const user = { userId: 1, userName: 'John' };

// ✅ 올바른 예 - 여러 속성을 담는 객체
const options = { theme: 'dark', locale: 'ko' };
const props = { title: 'Hello', count: 5 };
const settings = { fontSize: 14, lineHeight: 1.5 };

// ✅ 올바른 예 - 원시 타입과 구분이 필요한 경우
const url = 'https://wadiz.kr';
const urlObject = new URL(url);

// ✅ 올바른 예 - Map, Set
const configMap = new Map();
const tagSet = new Set();
const uniqueIds = new Set();
const userMap = new Map();

// ❌ 잘못된 예
const userDictionary = {}; // user
const userDict = new Map(); // userMap
```

## 함수

- 동사 원형 사용

### 조회 함수

- `get-`, `fetch-`, `find-`, `filter-`, `load-`, `search-` 사용
  - `fetch-`: 비동기 API 호출 + 상태 변경
  - `get-`: 로컬 데이터 또는 데이터를 가공한 결과 조회

```typescript
// ✅ 올바른 예
const fetchSnsList = async () => {
  const snsList = await service.getSnsList();
  setSnsList(snsList);
};
const getNotificationCount = () => {};
const getWeglotClass = () => {};
const loadInitialCheckoutData = (orderToken: string) => {};

// ❌ 잘못된 예
// get- → fetch-
const getSnsList = async () => {
  const data = await service.getSnsList();
  setSnsList(data);
};

const retrieveNotificationCount = () => {}; // retrieve → get
const selectUser = () => {}; // select → get
```

### 생성 함수

- `add-`, `create-`, `generate-`, `insert-` 사용
  - `create-`: 구조화된 객체 생성
  - `generate-`: 알고리즘에 의한 문자열, 숫자, 난수 등의 값 생성

```typescript
// ✅ 올바른 예
const createComment = () => {};
const generateQueryKey = () => {};

// ❌ 잘못된 예
const createKeyTitle = () => {}; // create- → generate-
const makeUser = () => {}; // make- → create-
const newProject = () => {}; // create-
```

### 수정 함수

- `edit-`, `update-`, `set-` 사용

```typescript
// ✅ 올바른 예
const editName = () => {};
const setName = () => {};
const updateUser = () => {};

// ❌ 잘못된 예
const alterUser = () => {}; // alter → update
const changeUser = () => {}; // change → set
```

### 삭제 함수

- `delete-`, `remove-` 사용
  - `delete-`: 자원이나 데이터 자체를 삭제
  - `remove-`: 일시적/논리적 제거

```typescript
// ✅ 올바른 예
const deleteUser = () => {};
const removeZwspFromHtml = (html: string) => {};

// ❌ 잘못된 예
const delProject = () => {}; // del → delete
const eraseUser = () => {}; // erase → delete
```

### 검사 함수

- `check-`, `validate-` 사용
  - `check-`: 조건이나 상태 확인
  - `validate-`: 유효성 검사
- Boolean 변수 사용 시: `is` + 대상 + `Valid`

```typescript
// ✅ 올바른 예
const checkIsOldApp = (versionInfo: VersionInfo): boolean => {};
const checkLoginStatus = async () => {};
const checkPermission = (user: User) => {};
const isEmailValid = true;
const isPasswordValid = true;
const validateEmail = (email: string) => {};

// ✅ 올바른 예 - 변수와 함께 사용
const isOldApp = checkIsOldApp(versionInfo);

// ❌ 잘못된 예
const checkUser = () => {}; // 모호한 이름. checkUser → checkUserPermission
const validEmail = () => {}; // valid → validate
```

### 변환 함수

- `convert-`, `format-`, `normalize-`, `parse-`, `transform-` 사용

```typescript
// ✅ 올바른 예
const convertCssToStyleObject = (css: string) => {};
const convertGifImagesToVideos = async (images: HTMLImageElement[] = []) => {};
const formatCurrency = (amount: number | string | undefined): string => {};
const normalizePhoneNumber = (value: string) => {};

// ✅ 올바른 예 - 변수와 함께 사용
const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

// ❌ 잘못된 예
const changeToKRW = () => {}; // change → convert
const currencyFormatter = () => {}; // formatCurrency
```

## 라이브러리

```typescript
// ✅ 올바른 예
import classNames from 'classnames';

// ❌ 잘못된 예
import cx from 'classnames';
```
