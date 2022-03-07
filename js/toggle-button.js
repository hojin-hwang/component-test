class ToggleButton extends ComponentABS{
  constructor(active = false)
  {
      super();  
      this.active = active;
  }
  static get observedAttributes() {return ['active']; }

  handleClick(e) {
      e.composedPath().find((node) => 
      {
          if (!node.className || !node.className?.match(/command/)) return false;
          if (node.className.match(/command-toggle-button/))
            {
                this._set_toggle();
                //and do something by postmessage
                //this.post_message(`message`, data);
              return ;
            }
      });
  }
  onMessage(event){
      const window_url = `https://${window.location.hostname}`;
      //if(event.origin !== window_url) return;
      if(event.data?.msg) 
      {

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
      if(name === 'active') this.active = newValue;
  }

  _render()
  {
    const template = document.querySelector('template#toggle_button');
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  _set_toggle()
  {
    this.active = !this.active;
    const toggle_container = this.shadowRoot.querySelector('.toggle-button-container');
    if(this.active) toggle_container.classList.remove('active');
    else toggle_container.classList.add('active');

    const toggle_image = toggle_container.querySelector('img').src;
    console.log(toggle_image);
  }


}
customElements.define('toggle-button', ToggleButton);