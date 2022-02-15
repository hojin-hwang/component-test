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
      const template = document.querySelector('template#text_preview');
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(template.content.cloneNode(true));
      
      
      this.shadowRoot.querySelector('textarea').addEventListener('keyup', e => this._preview_text(e));
      this.shadowRoot.querySelector('.text-preview').style.background = 'linear-gradient(to top, black, 20%, cyan)';
      this.shadowRoot.querySelector('.text-preview').style.color = 'white';
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
  _set_style(newValue)
  {
    this.style.display = newValue;
  }
}
customElements.define('text-preview', TextPreview);





 


