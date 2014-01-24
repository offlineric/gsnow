const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const Slider = imports.ui.slider;

let snowing, text, button, flakes, max;

function _hideSnow(hide) {
  if (snowing == 1 && flakes <= max) {
    _showMeSnow();
  }
  if (flakes < max) {
    _showMeSnow();
    flakes += 1;
  }

  Main.uiGroup.remove_actor(hide);
}



function _showMeSnow() {

  let _myFlakes = ["❄", "❅", "❆"];
  let _whichFlake = Math.floor((Math.random() * _myFlakes.length));
  text = new St.Label({
    style_class: 'snowflake' + Math.floor((Math.random() * 3)+1),
    text: _myFlakes[_whichFlake]
  });

  Main.uiGroup.add_actor(text);


  text.opacity = 255;


  let monitor = Main.layoutManager.primaryMonitor;
  let startx = Math.floor((Math.random() * monitor.width) + 1 - text.width / 2);
  text.set_position(startx, -100);


  Tweener.addTween(text, {
    y: monitor.height + 50,
    x: startx + Math.floor((Math.random() * 100) - 50),
    rotation_angle_z: Math.floor((Math.random()*360)-180),
    time: ((Math.random() * 3) + 4),
    transition: 'easeOutQuad',
    onComplete: _hideSnow,
    onCompleteParams: [text]
  });
}


function init() {
  button = new St.Bin({
    style_class: 'panel-button',
    reactive: true,
    can_focus: true,
    x_fill: true,
    y_fill: false,
    track_hover: true
  });
  let icon = new St.Icon({
    icon_name: 'system-run-symbolic',
    style_class: 'system-status-icon'
  });
  let label = new St.Label({
    text: "❄"
  });
  button.set_child(label);
  button.connect('enter-event', _moreSnow);
  button.connect('button-press-event', _snow);
  flakes = 0;
  max = 0;
}

function _snow() {
  if (snowing == 1) {
    snowing = 0;
    max = 0;
    flakes = 0;
  } else {
    snowing = 1;
  };
  _moreSnow();
}

function _moreSnow() {
  if (snowing == 1) {
    max += 15;
    _showMeSnow();
  }
}


function enable() {
  Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
  Main.panel._rightBox.remove_child(button);
}