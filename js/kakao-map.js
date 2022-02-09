class KakaoMap extends ComponentABS{
  constructor(map_data = null)
  {
      super();
      if(map_data)
      this.map_data = map_data;
      else this.map_data =  this._get_initial_data();
      this.last_custom_overlay;

  }
  static get observedAttributes() {return ['draggable']; }

  handleClick(e) {
      e.composedPath().find((node) => 
      {
            return;
            //if (!node.className || !node.className.match(/command/)) return false;
      });
  }
  onMessage(event){
      const window_url = `https://${window.location.hostname}`;
      //if(event.origin !== window_url) return;
      if(event.data?.msg) 
      {
          // if(event.data.msg === `${this.message_prefix}_show_user_name_card`) 
          // {
          //     this._render(event.data.data);
          // }
      }
  }

  connectedCallback() {
      this._render(this.map_data);
  }
      
  disconnectedCallback(){
      console.log("disconnectedCallback");
      window.removeEventListener("message", this.receiveMessage);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
      console.log('Swipe Card element attributes changed.'); 
      this.map_data.config.draggable = newValue
  }

  _render(map_data = null)
  {
    
    const template = document.querySelector('template#kakao_map');
    const shadowRoot = this.attachShadow({mode: 'open'});
    if(template) shadowRoot.appendChild(template.content.cloneNode(true));

    const container = this.shadowRoot.querySelector('.map');
    const options = {
    center: new kakao.maps.LatLng(map_data.latlng.lat, map_data.latlng.lng),
    draggable: map_data.config.draggable,
    level: map_data.config.level
    };

    const map = new kakao.maps.Map(container, options);  

    if(map_data.use_marker)
    {
        const markerPosition  = new kakao.maps.LatLng(map_data.latlng.lat, map_data.latlng.lng); 
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        const use_location_info = this._use_location_info;

        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {   
            marker.setPosition(mouseEvent.latLng);     
            use_location_info(mouseEvent);
        });
    }

  }

  _get_initial_data()
  {
    const map_data = { 
          "latlng" : {"lat":"33.450701", 'lng':"126.570667"},
          "config" : {
            "draggable": false,
            "level": 2
          },
          "use_marker":true,
        };
      return map_data;
  }  

  _use_location_info(mouseEvent)
  {
    const latlng = mouseEvent.latLng;
    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(latlng.getLat(), latlng.getLng());
    const callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            if(result[0].road_address)
            {
                console.log('도로명 주소');
                console.log(result[0].road_address.address_name);
            }
            else
            {
                console.log('일반주소 주소');
                console.log(result[0].address.address_name);
            }
        }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }


}
customElements.define('kakao-map', KakaoMap);





 


