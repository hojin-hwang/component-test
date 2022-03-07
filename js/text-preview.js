class TextPreview extends ComponentABS{
  constructor()
  {
      super();   
      this.preview_attribute = {}; 
  }
  static get observedAttributes() {return ['display','background','color']; }

  handleClick(e) {
      e.composedPath().find((node) => 
      {
          if (!node.className || !node.className?.match(/command/)) return false;
          if (node.className.match(/command-select-align/))
          {
            this._set_toggle_active(node);
          }
          if (node.className.match(/command-text-align-left/))
          {
            this.post_message(`${this.message_prefix}_selected-align`, {"textAlign":"left"});
            return ;
          }
          if (node.className.match(/command-text-align-right/))
          {
            this.post_message(`${this.message_prefix}_selected-align`, {"textAlign":"right"});
            return ;
          }
          if (node.className.match(/command-text-align-center/))
          {
            this.post_message(`${this.message_prefix}_selected-align`, {"textAlign":"center"});
            return ;
          }

      });
  }
  onMessage(event){
      const window_url = `https://${window.location.hostname}`;
      //if(event.origin !== window_url) return;
      if(event.data?.msg) 
      {
          if(event.data.msg === `${this.message_prefix}_selected-theme`) 
          {
              this._set_style(event.data.data);
          }
          if(event.data.msg === `${this.message_prefix}_selected-align`) 
          {
             
            this._set_align(event.data.data);
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
        if(temp_text.length > 2)
        this.post_message('message_load_content_done');
        else
        this.post_message('message_load_content_yet');
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
    this.preview_attribute = {};
    const text_preview = this.shadowRoot.querySelector('.text-preview');
    //text_preview.style = '';
    for (const [key, value] of Object.entries(attrs)) 
    {
      text_preview.style[key] = value;
      this.preview_attribute[key] = value;
    }
  }

  _set_align(attr)
  {
    const text_preview = this.shadowRoot.querySelector('.text-preview');
    for (const [key, value] of Object.entries(attr)) 
    {
      text_preview.style[key] = value;
      this.preview_attribute[key] = value;
    }
  }

  _get_custom_div_configs()
  {
    const configs = [];
      let div_attribute = {};
      div_attribute.color = 'white';
      div_attribute.background = `linear-gradient(90deg, #1CB5E0 0%, #000851 100%)`;
      configs.push(div_attribute);

      div_attribute = {};
      div_attribute.color = 'white';
      div_attribute.background = `linear-gradient(90deg, #9ebd13 0%, #008552 100%)`;
      configs.push(div_attribute);

      div_attribute = {};
      div_attribute.color = 'white';
      div_attribute.background = `linear-gradient(90deg, #fcff9e 0%, #c67700 100%)`;
      configs.push(div_attribute);

      div_attribute = {};
      div_attribute.color = 'white';
      div_attribute.background = `linear-gradient(90deg, rgb(155, 175, 217) 0%, rgb(16, 55, 131) 100%)`;
      configs.push(div_attribute);
    return configs;
  }

  _set_toggle_active(node)
  {
    this.shadowRoot.querySelectorAll('.btn-align').forEach(item=>item.classList.remove('active'));
    node.classList.add('active');
  }
}
customElements.define('text-preview', TextPreview);





 


