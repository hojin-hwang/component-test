class SwipeCard extends ComponentABS{
  constructor(content_data = null)
  {
      super();

      if(content_data)
      this.content_data = content_data;
      else this.content_data =  this._get_initial_data();
      
      this.curPos = 0;
      this.postion = 0;
      this.start_x, this.end_x;
      this.cards;
      this.contents_count = 0;
      this.CARD_WIDTH = window.screen.width;
    
      this.addEventListener('touchstart', this._touch_start,  {passive: true});
      this.addEventListener('touchend', this._touch_end,  {passive: true});
      this.addEventListener('touchmove', this._touch_move,  {passive: true});

  }
  static get observedAttributes() {return ['any_attribute']; }

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
      this._render(this.content_data);
  }
      
  disconnectedCallback(){
      console.log("disconnectedCallback");
      window.removeEventListener("message", this.receiveMessage);
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
      console.log('Swipe Card element attributes changed.'); 
  }

  _render(content_data = null)
  {
      const template = document.querySelector('template#swipe_card');
      const cards = template.content.querySelector('.cards');   
      
      content_data.forEach(content => {
        if(content.type === 'img')
        cards.appendChild(this._make_img_element(content));
        else if(content.type === 'mov'){}
        else if(content.type === 'text')
        cards.appendChild(this._make_text_element(content));
      });

      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(template.content.cloneNode(true));
      this.cards = this.shadowRoot.querySelector('.cards');
      this.contents_count = this.cards.childElementCount;
      cards.innerHTML = '';
  }

  _get_initial_data()
  {
      const init_content_data_list = [];

      //random image
      for(let i = 0; i<=9; i++)
      {
        const temp_content_data = {};
        temp_content_data.type = 'img';
        temp_content_data.content = `\/images\/${i}${i}${i}.jpg`;
        temp_content_data.option = {};
        init_content_data_list.push(temp_content_data);
      }

      let temp_content_data = {};
      temp_content_data.type = 'text';
      temp_content_data.content = `이번엔 기필고 승리하리라!!`;
      temp_content_data.option = {'color':'white', 'background':'darkgray', 'fontSize':'28px'};
      init_content_data_list.push(temp_content_data);

      temp_content_data = {};
      temp_content_data.type = 'text';
      temp_content_data.content = `장수는 나가서 이름을 떨치고 정승은 앉아서 이름을 알린다.`;
      temp_content_data.option = {'color':'#bee99f', 'background':'darkolivegreen','fontSize':'22px'};
      init_content_data_list.push(temp_content_data);

      return this._shuffle(init_content_data_list);
  }

  _shuffle(array) { 
    array.sort(() => Math.random() - 0.5); 
    return array;
  }

  _make_img_element(content)
  {
    const content_box = document.createElement('div');
    content_box.classList.add('content-box');
    const img = document.createElement('img');
    img.src = content.content;
    content_box.appendChild(img);

    return content_box;
  }

  _make_text_element(content)
  {
    const content_box = document.createElement('div');
    content_box.classList.add('content-box');
    content_box.style.background = content.option.background;
    content_box.style.fontSize = content.option.fontSize;
    content_box.style.color = content.option.color;
    content_box.style.display = 'flex';
    content_box.style.alignItems = 'center';
    content_box.style.justifyContent = 'center';
    content_box.style.textAlign = 'center';

    const text = document.createElement('p');
    text.innerText = content.content;
    text.style.margin = '24px 12px';
    
    
    content_box.appendChild(text);

    return content_box;
  }

  _touch_start(event) {
      this.start_x = event.touches[0].pageX;
  }
 
  _touch_end(event) {
    this.end_x = event.changedTouches[0].pageX;
    if(this.start_x > this.end_x)
    {
      this._next();
    }
    else
    {
      this._prev();
    }  
  }

  _touch_move(event)
  {
      let current_x = event.touches[0].pageX;
      if(current_x > 0 && current_x < this.CARD_WIDTH)
      {
          let current_img_index = (Math.abs(this.postion/this.CARD_WIDTH) +1);
          let tr_px = (this.start_x > current_x) ? (current_x - (current_img_index * this.CARD_WIDTH)) : (current_x + ( this.postion));
          if( !((current_img_index === 1 && this.start_x < current_x) ||  (current_img_index === this.contents_count && this.start_x > current_x) ))
          {
              this.cards.style.transform = `translateX(${tr_px}px)`;
          }
      }
  }  

  
  _prev()
  {
    if(this.curPos > 0){
      this.postion += this.CARD_WIDTH;
      this.cards.style.transform = `translateX(${this.postion}px)`;
      this.curPos = this.curPos - 1;
    }
  }

  _next()
  {
    if(this.curPos < (this.contents_count-1)){
      this.postion -= this.CARD_WIDTH; 
      this.cards.style.transform = `translateX(${this.postion}px)`;
      this.curPos = this.curPos + 1;
    }
  }
}
customElements.define('swipe-card', SwipeCard);





 


