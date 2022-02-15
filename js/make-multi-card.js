class MakeMultiCard extends ComponentABS{
  constructor()
  {
    super();    
    this.card_map = new Map();  
    this.current_card_index = 0;
    this.MAX_CARD_SIZE = 5;
    this.selected_content = 'image';
    
  }
  static get observedAttributes() {return ['any_attribute']; }

  handleClick(e) {
      e.composedPath().find((node) => 
      {
          if (!node.className || !node.className?.match(/command/)) return false;
          if (node.className.match(/command-next-card/))
            {
                this.current_card_index = this._search_next_card(this.current_card_index);
                this._make_next_card( this.current_card_index);  
                this._show_current_card(this.current_card_index);
                this._check_button_condition();
                return ;
            }

            if (node.className.match(/command-previous-card/))
            {
              if(this.current_card_index >= 1) 
              {
                this.current_card_index = (this._search_previous_card(this.current_card_index));
                this._show_current_card(this.current_card_index);
                this._check_button_condition();
              }
              return ;
            }

            if (node.className.match(/command-remove-card/))
            {
              if(this.current_card_index >= 1 )
              {
                let move_card_index = (this._search_previous_card(this.current_card_index));
                this._delete_card(this.current_card_index);
                this.current_card_index = move_card_index;
                this._show_current_card(this.current_card_index);
                this._check_button_condition();
              }
              return ;
            }
      });
  }
  onMessage(event){
      const window_url = `https://${window.location.hostname}`;
      //if(event.origin !== window_url) return;
      if(event.data?.msg) 
      {
          if(event.data.msg === `message_load_content_done`) 
          {
            this.card_map.get(this.current_card_index).setContent = true;
            this._set_enable_next_button();
            this._check_button_condition();

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
      console.log('Make Muliti Card element attributes changed.'); 
  }

  _render()
  {
      const template = document.querySelector('template#make_multi_card');
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(template.content.cloneNode(true));
      
      const image_preview = new ImagePreview();
      this._append_article(image_preview);
      this.card_map.set(0, {"content_box" : image_preview}); 

      this.shadowRoot.querySelector('select').addEventListener('change', e => this._set_content(e));

  }
    _set_content = e =>{
       this.selected_content = (this.shadowRoot.querySelector('select').value);
       if(this.selected_content === 'image')
       {
            const image_preview = new ImagePreview();
            this._remove_article(this.card_map.get(this.current_card_index).content_box);
            this._append_article(image_preview);
            this.card_map.get(this.current_card_index).content_box = image_preview;

            this._set_next_button();
       }
       if(this.selected_content === 'text')
       {
            const text_preview = new TextPreview();
            this._remove_article(this.card_map.get(this.current_card_index).content_box);
            this._append_article(text_preview);
            this.card_map.get(this.current_card_index).content_box = text_preview;

            this._set_next_button();
       }
    }

    _make_next_card(current_card_index)
    {
        if(!this.card_map.has(current_card_index))
        {
            const new_card_no = current_card_index;
            const image_preview = new ImagePreview();
            this.card_map.set(new_card_no, {"content_box" : image_preview});  
            this._append_article(image_preview);
        }
    } 

    _search_next_card(index)
    {
        const card_iterator = this.card_map.entries();
        let current_card  = card_iterator.next();
        let next_index = 1;
        while(!current_card.done)
        {
            if(current_card.value[0] === index)
            {
                //마지막인지
                current_card = card_iterator.next();
                if(current_card.done) return index +1;
                else return current_card.value[0];
            }
            else
            {
                current_card = card_iterator.next();
                next_index = current_card.value[0];
            }
        }
        return next_index;
    }

    _search_previous_card(index)
    {
        let previous_key = 0;
        for(let [key, value] of this.card_map.entries())
            {
            if(key === index) return previous_key
            else previous_key = key;    
        }
        return previous_key;
    }

    _append_article(content_box)
    {
        this.shadowRoot.querySelector('article').appendChild(content_box);
    }
    _remove_article(content_box)
    {
        this.shadowRoot.querySelector('article').removeChild(content_box);
    }

    _delete_card(index)
    {
        this.card_map.get(index).content_box.remove();
        this.card_map.delete(index);
    }
                

    _show_current_card(current_card_index)
    {
        for(let value of this.card_map.values())
	    {
            (value.content_box.setAttribute('display','none'));
        }
        this.card_map.get(current_card_index).content_box.setAttribute('display','block');
    }

    _check_button_condition()
    {
        //Max length Check
        this._set_next_button();
        //disabled when 0 index
        this._set_button_by_zeor_index(); 
    }

    _set_enable_next_button()
    {
        this.shadowRoot.querySelector('.command-next-card').disabled = false;
    }
    
    _set_next_button()
    {
        if(!this.card_map.get(this.current_card_index).setContent) this.shadowRoot.querySelector('.command-next-card').disabled = true;
        else this.shadowRoot.querySelector('.command-next-card').disabled = false;
        if(this.current_card_index === this._get_map_last_key() && this.MAX_CARD_SIZE === this.card_map.size) 
        {
            this.shadowRoot.querySelector('.command-next-card').disabled = true;
        }
        console.log();

    }

    _set_button_by_zeor_index()
    {
        if(this.current_card_index === 0) 
        {
            this.shadowRoot.querySelector('.command-remove-card').disabled = true;
            this.shadowRoot.querySelector('.command-previous-card').disabled = true;
        }
        else
        {
            this.shadowRoot.querySelector('.command-remove-card').disabled = false;
            this.shadowRoot.querySelector('.command-previous-card').disabled = false;
        }
    }

    _get_map_last_key()
    {
        let last_key = 0;
        for(let key of this.card_map.keys()) last_key = key;  
        return last_key;
    }
}
customElements.define('make-multi-card', MakeMultiCard);





 


