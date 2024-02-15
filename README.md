# themeforge

키워드-디자인 테마 생성기

- 목표
  - 키워드에서 테마 데이터를 추출하고, 적용해 봄으로써 ui 디자인에 도움을 주는 서비스

- 사용방법
  - 생성할 테마 개수를 입력해 주세요.
  - 키워드를 입력해 주세요.
  - 모든 옵션을 정상적으로 설정하였다면, 생성 버튼을 누르거나 엔터 키를 입력하세요.

- 서비스 URL
  - 실행 url : [https://Zeyakim.github.io/themeforge]

## WBS

```mermaid
gantt
    title ThemeForge Project
    dateFormat  YYYY-MM-DD
    section 기획 
        기능 정의       : 2023-02-10, 2d
        기본 UI 구성 설계    : 2023-02-11, 2d

    section 디자인
        html/css 설계 : 2023-02-11, 2d
        figma 와이어프레임 작업 : 2023-02-12, 2d
    section 구현
        html/css 작업 : 2023-02-11, 3d
        ChatGptClient 구현 : 2023-02-12, 2d
        Theme 구현 : 2023-02-13, 2d
        ThemeManager 구현 : 2023-02-13, 2d

```

## 설계

### 기술 스택

HTML, CSS, JavaScript

### 코딩 컨벤션

#### HTML

- tab size: 2
- tag: camelCase
- id: snake_case
- class: kebab-case

#### CSS

- tab size: 2
- property: snake_case

#### JavaScript

- tab size: 2
- class: PascalCase
- variable: camelCase
- function: camelCase

### 와이어프레임
  
![와이어프레임](https://github.com/ZeyaKim/themeforge/assets/118428615/b7dda4f2-5372-4fb1-ba62-9a9db3d6ce21)
