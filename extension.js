
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

let snowing, text, button;

function _hideSnow(hide) {
    if (snowing == 1) {
    _showMeSnow();
    Main.uiGroup.remove_actor(hide);
    }
    else {
    Main.uiGroup.remove_actor(hide);
    }

}

function _startSnow() {
snowing = 1;
}
function _stopSnow() {
snowing = 0;
}

function _showMeSnow() {
let _whichFlake = Math.floor((Math.random()*3)+1)
if (_whichFlake == 1){text = new St.Label({ style_class: 'snowflake', text: "❄" });}
if (_whichFlake == 2){text = new St.Label({ style_class: 'snowflake', text: "❅" });}
if (_whichFlake == 3){text = new St.Label({ style_class: 'snowflake', text: "❆" });}
        
        
        Main.uiGroup.add_actor(text);


    text.opacity = 255;


    let monitor = Main.layoutManager.primaryMonitor;
    let startx = Math.floor((Math.random()*monitor.width)+ 1 - text.width / 2);
    text.set_position(startx,
                      -100);


    Tweener.addTween(text,
                     { y: monitor.height,
                       x: startx + Math.floor((Math.random()*100)-50),
                       rotation: 100,
                       time: ((Math.random()*3)+4),
                       transition: 'easeOutQuad',
                       onComplete: _hideSnow,
                       onCompleteParams:[text] });
}


function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });
    let label = new St.Label({ text: "❄" });
    button.set_child(label);
    button.connect('enter-event', _moreSnow);
    button.connect('button-press-event', _snow);

}

function _snow() {
if(snowing == 1) {_stopSnow()} else {_startSnow()};
_moreSnow();
}

function _moreSnow() {
  if (snowing == 1) {
for(let i=0;i<15;i++){
_showMeSnow();
}
}
}


function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
