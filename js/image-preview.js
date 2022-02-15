class ImagePreview extends ComponentABS{
  constructor()
  {
      super();    
  }
  static get observedAttributes() {return ['display']; }

  handleClick(e) {
      e.composedPath().find((node) => 
      {
          if (!node.className || !node.className?.match(/command/)) return false;
          if (node.className.match(/command-find-file/))
            {
              this.shadowRoot.querySelector('input#upload_image').click();
              return ;
            }
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
      this._render();
  }
      
  disconnectedCallback(){
      console.log("disconnectedCallback");
      window.removeEventListener("message", this.receiveMessage);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
      // console.log('image Preview element attributes changed.'); 
      if(name === 'display') this._set_style(newValue);
  }

  _render()
  {
      const template = document.querySelector('template#image_preview');
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(template.content.cloneNode(true));
      
      const infoText = this.getAttribute('placeholder');
      if(!infoText) {this._setInfoText('이미지를 업로드 해주세요');}
      
      this.shadowRoot.querySelector('input#upload_image').addEventListener('change', e => this._load_image(e));
  }
  
  _load_image = e => {
    const files = e.target.files;
    const filesArr = Array.prototype.slice.call(files);

    // 여러장의 이미지를 불러올 경우, 배열화
    filesArr.forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
            const image = new Image();
            image.className = "img-item"; // 스타일 적용을 위해
            image.src = e.target.result;
            image.onload = imageEvent => {
              this.shadowRoot.querySelector('.add-image-zone').style.border = 'none'
              this.shadowRoot.querySelector('.add-image-zone').style.backgroundImage = `url(${e.target.result})`;
              this.shadowRoot.querySelector('.add-image-zone').style.borderRadius = 'unset';
              this.shadowRoot.querySelector('.image-upload-info > p').style.display = 'none';
              this._after_preview();
              this.post_message('message_load_content_done');
            };
            image.onerror = function() {
                console.log("error");
            };
        };
        reader.readAsDataURL(file);
    });
  };

  _setInfoText(newValue)
  {
    this.shadowRoot.querySelector('.image-upload-info > p').innerText = newValue;
  }
  _after_preview()
  {
    //..do something after preview
    // form action, save image ..
  }
  _set_style(newValue)
  {
    this.style.display = newValue;
  }
}
customElements.define('image-preview', ImagePreview);





 


