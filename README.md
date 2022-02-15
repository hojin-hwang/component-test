# component-test
- use Live Server Extenstion in VSCODE for testing
- 127.0.0.1:5500 -> localhost:5500 으로 변경(kakao map Api 등록때문에..)
- 모바일 화면으로 확인해주세요.

## media_article
- media-article.js
    - 초기 데이터에 duration 값을 주어  제거되는 기능(자동 폭파)

- swip-card.js : '\<swip-card> \</swip-card>' or instance of SwipeCard();
    - touch event for Only Mobile
    - Image list swipe
    - text list swipe

- kakao-map.js : '\<kakao-map> \</kakao-map>'
    - kakao api key : https://apis.map.kakao.com/web/guide/ 참고
        - media_article 폴더 아래에 'config.json' file을 만든다.
        - config.json file 내용에 kakaoData='{"key":"카카오 API Key 값"}' 을 쓰고 저장한다.
        - parameter
        ```json
        { 
            "latlng" : {"lat":"33.450701", "lng":"126.570667"}, //위도 경도
            "config" : {
                "draggable": false, //지도크기 변경, 이동 가능여부
                "level": 2 //지도 확대 (낮을수록 자세히..)
            },
            "use_marker":true, //마커표시 여부
        }
        ```
        - attribute : draggable, lat, lng
            ```html
                <kakao-map draggable="true" lat="35.118196", lng="129.105920" ></kakao-map>
                ```
## make multi card
- make-multi-card.js
    - contents card 만들기
    - 컨텐츠가 있을때 다음 카드 만들 수 있음.
    - 컨텐츠 카드 갯수 설정
- image-preview.js
    - 파일 이미지를 로드하면 미리보기
- text-preview.js
    - 글을 쓰면 글 길이에 따라서 글씨 크기가 조정
    - 글 배치 기능(일반, 왼쪽, 중앙 정렬)      
    - 배경(색) 변경          
