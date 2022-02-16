class CustomDiv extends ComponentABS{
  constructor(attr = null, p_message_prefix = null)
  {
      super();  
      this.attribute = (attr)? this.attribute = attr : this._get_default_attribute() ;
      this.p_message_prefix = p_message_prefix;
  }
  static get observedAttributes() {return ['width','height']; }

  handleClick(e) {
      e.composedPath().find((node) => 
      {
          if (!node.className || !node.className?.match(/command/)) return false;
          if (node.className.match(/command-select-theme/))
            {
              this.post_message(`${this.p_message_prefix}_selected-theme`, this.attribute);
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
      const attr = {};
      attr[name] = newValue;
      this._set_style(attr);
  }

  _render()
  {
      const div = document.createElement('div');
      div.classList.add('command-select-theme');
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(div);  
      this._set_style(this.attribute);

  }

  _set_style(attrs)
  {
    const custom_div = this.shadowRoot.querySelector('div');
    for (const [key, value] of Object.entries(attrs)) 
    {
        custom_div.style[key] = value;
    }
  }

  _get_default_attribute()
  {
      const default_attribute = {};
      default_attribute.height = '40px';
      default_attribute.width = '40px';
      default_attribute.color = 'black';
      default_attribute.backgroundColor = '#e9e9e9';
      return default_attribute;
  }

}
customElements.define('custom-div', CustomDiv);





 


