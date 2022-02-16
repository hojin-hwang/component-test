class TextPreview extends ComponentABS{
  constructor()
  {
      super();    
  }
  static get observedAttributes() {return ['display','background','color']; }

  handleClick(e) {
      e.composedPath().find((node) => 
      {
          if (!node.className || !node.className?.match(/command/)) return false;
        //   if (node.className.match(/command-find-file/))
        //     {
        //       this.shadowRoot.querySelector('input#upload_image').click();
        //       return ;
        //     }
      });
  }
  onMessage(event){
      const window_url = `https://${window.location.hostname}`;
      //if(event.origin !== window_url) return;
      if(event.data?.msg) 
      {
          console.log(event.data.msg);
          console.log(`${this.message_prefix}_selected-theme`);
          if(event.data.msg === `${this.message_prefix}_selected-theme`) 
          {
              this._set_style(event.data.data);
          }
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
      if(name === 'display') this._set_display(newValue);
  }

  _render()
  {
      
      const template = document.querySelector('template#text_preview');
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(template.content.cloneNode(true));

      this.shadowRoot.querySelector('textarea').addEventListener('keyup', e => this._preview_text(e));

      //add custom div
      this._get_custom_div_configs().forEach(custom_config => {
        const custom_div = new CustomDiv(custom_config, this.message_prefix);
        this.shadowRoot.querySelector('.theme-box').appendChild(custom_div);
        custom_div.setAttribute('width', '40px');
        custom_div.setAttribute('height', '40px');
      });

      //first config 적용
      this._set_style(this._get_custom_div_configs()[0]);
  }
  
  _preview_text = e => {
    e.composedPath().find((node) => 
    {
        const temp_text = (this.shadowRoot.querySelector('textarea').value);
        this.shadowRoot.querySelector('.text-preview > p').innerText = temp_text;
        this._set_font_size(temp_text);
        this.post_message('message_load_content_done');
    });
  }
  
  _set_font_size(temp_text)
  {
    const temp_p = this.shadowRoot.querySelector('.text-preview > p');
    if(temp_text.length <= 20) temp_p.style.fontSize = '48px';
    else if(temp_text.length <= 40) temp_p.style.fontSize = '36px';
    else if(temp_text.length <= 100) temp_p.style.fontSize = '30px';
    else if(temp_text.length <= 180) temp_p.style.fontSize = '24px';
    else temp_p.style.fontSize = '18px';
  }
  
  _set_display(newValue)
  {
    this.style.display = newValue;
  }

  _set_style(attrs)
  {
    console.log(attrs);
    const text_preview = this.shadowRoot.querySelector('.text-preview');
    text_preview.style = '';
    for (const [key, value] of Object.entries(attrs)) 
    {
      text_preview.style[key] = value;
    }
  }


  _get_custom_div_configs()
  {
    const configs = [];
      let div_attribute = {};
      div_attribute.color = 'black';
      div_attribute.backgroundColor = '#e9e9e9';
      configs.push(div_attribute);

      div_attribute = {};
      div_attribute.color = 'white';
      div_attribute.backgroundColor = 'red';
      configs.push(div_attribute);

      div_attribute = {};
      div_attribute.color = 'white';
      div_attribute.backgroundColor = 'blue';
      configs.push(div_attribute);

      div_attribute = {};
      div_attribute.color = 'white';
      div_attribute.background = `linear-gradient(90deg, rgb(155, 175, 217) 0%, rgb(16, 55, 131) 100%)`;
      configs.push(div_attribute);
    return configs;
  }
}
customElements.define('text-preview', TextPreview);





 


