class MediaArticle extends ComponentABS
{
  constructor(data = null)
  {
      super();
      if(data) this.data = this._get_initial_data();
      else this.data =  this._get_initial_data();
  }

  static get observedAttributes() {return ['info']; }

  handleClick(e) {
      e.composedPath().find((node) => 
      {
          if (!node.className || !node.className.match(/command/)) return false;
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
      this._render(this.data);
  }
      
  disconnectedCallback(){
      console.log("disconnectedCallback");
      window.removeEventListener("message", this.receiveMessage);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
      console.log('Media Card element attributes changed.'); 
  }

  _render()
  {
    const template = document.querySelector('template#media_article');
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(template.content.cloneNode(true));
    // setTimeout(() => {
    //     this._hide_animation();
    // }, this.data.duration);
  }

  _get_initial_data()
  {
     const temp_data = {};
     temp_data.create_timestamp =  new Date().getTime();
     temp_data.end_timestatmp = temp_data.create_timestamp + (Math.floor(Math.random() * 15) +1) *1000;
     temp_data.duration = (temp_data.end_timestatmp - temp_data.create_timestamp);
     return temp_data;
  }

  _hide_animation()
  {
    this.shadowRoot.querySelector('article').classList.add('disappear');
    setTimeout(() => {
        this.remove();
    }, 1000);
  }
}
customElements.define('media-article', MediaArticle);





 


