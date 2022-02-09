# component-test
- use Live Server Extenstion in VSCODE for testing
- 127.0.0.1:5500 -> localhost:5500 으로 변경(kakao map Api 등록때문에..)
- 모바일 화면으로 확인해주세요.

## media_article
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
        - attribute : draggable = "false or true"
            ```html
                <kakao-map draggable="true"></kakao-map>
            ```
