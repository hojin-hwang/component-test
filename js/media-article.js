let curPos = 0;
let postion = 0;
let start_x, end_x;
const CARD_WIDTH = window.screen.width;
const cards = document.querySelector(".cards");
const contents_count = cards.querySelectorAll('.content')?.length; 

cards.addEventListener('touchstart', touch_start);
cards.addEventListener('touchend', touch_end);
cards.addEventListener('touchmove', touch_move);

function prev(){

  if(curPos > 0){
    postion += CARD_WIDTH;
    cards.style.transform = `translateX(${postion}px)`;
    curPos = curPos - 1;
  }
}
function next(){
  if(curPos < (contents_count-1)){
    postion -= CARD_WIDTH; 
    cards.style.transform = `translateX(${postion}px)`;
    curPos = curPos + 1;
  }
}
 
function touch_start(event) {
    event.preventDefault();
    start_x = event.touches[0].pageX;
}
 
function touch_end(event) {
  event.preventDefault();
  end_x = event.changedTouches[0].pageX;
  if(start_x > end_x){
    next();
  }else{
    prev();
  }
}

function touch_move(event)
{
    let current_x = event.touches[0].pageX;
    if(current_x > 0 && current_x < CARD_WIDTH)
    {
        let current_img_index = (Math.abs(postion/CARD_WIDTH) +1);
        let tr_px = (start_x > current_x) ? (current_x - (current_img_index * CARD_WIDTH)) : (current_x + ( postion));
        if( !((current_img_index === 1 && start_x < current_x) ||  (current_img_index === contents_count && start_x > current_x) ))
        {
            cards.style.transform = `translateX(${tr_px}px)`;
        }
     }
}

