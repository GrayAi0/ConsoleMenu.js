import { Library } from 'ffi-napi';
import { createInterface } from 'readline';
import wrap from 'word-wrap';

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * GetConsoleScreenBufferInfo
 *
 * dwSize x: offest 0 size 2
 * dwSize y: offest 2 size 2
 * dwCursorPosition x: offest 4 size 2
 * dwCursorPosition y: offest 6 size 2
 * wAttributes: offest 8 size 2
 * srWindowLeft: offest 10 size 2
 * srWindowTop: offest 12 size 2
 * srWindowRight: offest 14 size 2
 * srWindowBottom: offest 16 size 2
 * dwMaximumWindowSize x: offest 18 size 2
 * dwMaximumWindowSize y: offest 20 size 2
 *
 *
 */

var kernal = /*#__PURE__*/Library('kernel32', {
  'GetStdHandle': ['int', ['int']],
  'SetConsoleTextAttribute': ['int', ['int', 'int']],
  "GetConsoleScreenBufferInfo": ['int', ['int', 'pointer']]
});
var Color;

(function (Color) {
  Color[Color["FOREGROUND_BLUE"] = 1] = "FOREGROUND_BLUE";
  Color[Color["FOREGROUND_GREEN"] = 2] = "FOREGROUND_GREEN";
  Color[Color["FOREGROUND_RED"] = 4] = "FOREGROUND_RED";
  Color[Color["FOREGROUND_INTENSITY"] = 8] = "FOREGROUND_INTENSITY";
  Color[Color["BACKGROUND_BLUE"] = 16] = "BACKGROUND_BLUE";
  Color[Color["BACKGROUND_GREEN"] = 32] = "BACKGROUND_GREEN";
  Color[Color["BACKGROUND_RED"] = 64] = "BACKGROUND_RED";
  Color[Color["BACKGROUND_INTENSITY"] = 128] = "BACKGROUND_INTENSITY";
  Color[Color["COMMON_LVB_LEADING_BYTE"] = 256] = "COMMON_LVB_LEADING_BYTE";
  Color[Color["COMMON_LVB_TRAILING_BYTE"] = 512] = "COMMON_LVB_TRAILING_BYTE";
  Color[Color["COMMON_LVB_GRID_HORIZONTAL"] = 1024] = "COMMON_LVB_GRID_HORIZONTAL";
  Color[Color["COMMON_LVB_GRID_LVERTICAL"] = 2048] = "COMMON_LVB_GRID_LVERTICAL";
  Color[Color["COMMON_LVB_GRID_RVERTICAL"] = 4096] = "COMMON_LVB_GRID_RVERTICAL";
  Color[Color["COMMON_LVB_REVERSE_VIDEO"] = 16384] = "COMMON_LVB_REVERSE_VIDEO";
  Color[Color["COMMON_LVB_UNDERSCORE"] = 32768] = "COMMON_LVB_UNDERSCORE"; // Underscore.
})(Color || (Color = {}));

var RenderColor = /*#__PURE__*/function () {
  function RenderColor(color) {
    this.color = color;
    this._is_applyed = false;
  }

  RenderColor.create = function create(color) {
    return new RenderColor(typeof color === 'string' ? Number(color.split('[')[1].split('m')[0]) : color);
  };

  var _proto = RenderColor.prototype;

  _proto.toString = function toString() {
    return "[color: " + this.color + "]|";
  };

  RenderColor.getCurrentColor = function getCurrentColor() {
    var handle = kernal.GetStdHandle(
    /** Default Console Handle */
    -11);
    var buff = Buffer.alloc(22
    /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 22 */
    );
    /** @ts-ignore */

    kernal.GetConsoleScreenBufferInfo(handle, buff);
    return buff.readInt32LE(8
    /** offest in memory */
    );
  };

  RenderColor.applyColor = function applyColor(color) {
    var handle = kernal.GetStdHandle(
    /** Default Console Handle */
    -11);
    var buff = Buffer.alloc(22
    /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 22 */
    );
    /** @ts-ignore */

    kernal.GetConsoleScreenBufferInfo(handle, buff);
    kernal.SetConsoleTextAttribute(handle, color);
    return buff.readInt32LE(8
    /** offest in memory */
    );
  };

  _proto.toggle = function toggle() {
    if (this._is_applyed) {
      this.end();
    } else {
      this.apply();
    }

    this._is_applyed = !this._is_applyed;
  };

  _proto.apply = function apply() {
    RenderColor.applyColor(this.color);
  };

  _proto.end = function end() {
    RenderColor.applyColor(RenderColor._default_attributes);
  };

  return RenderColor;
}();
RenderColor._default_attributes = /*#__PURE__*/RenderColor.getCurrentColor();
function byteOnly(n) {
  return Math.max(n, -n);
}
function centerString(str, width) {
  var spaces = byteOnly(width - str.length) / 2;
  return ' '.repeat(spaces + (str.length % 2 == 1 ? 1 : 0)) + str + ' '.repeat(spaces);
}

var MenuItem = /*#__PURE__*/function () {
  function MenuItem(_label, propertys) {
    if (propertys === void 0) {
      propertys = {};
    }

    this._label = _label;
    this.ITEM_TYPE = "DEFAULT_ITEM";
    this._is_disabled = false;
    this.propertys = Object.assign({
      is_countless: false,
      onClicked: function onClicked() {},
      onKeyDown: function onKeyDown(key) {},
      disabled: false
    }, propertys);

    if (this.propertys.disabled) {
      this.disable();
    }
  }

  var _proto = MenuItem.prototype;

  _proto.disable = function disable() {
    this._is_disabled = true;

    if (this._menu) {
      this._menu.render();
    }
  };

  _proto.enable = function enable() {
    this._is_disabled = false;

    if (this._menu) {
      this._menu.render();
    }
  };

  _proto.onKeyDown = function onKeyDown(key) {
    this.propertys.onKeyDown.bind(this)(key);
  };

  _proto.onClicked = function onClicked() {
    /** @ts-ignore */
    return this.propertys.onClicked.bind(this).apply(void 0, arguments);
  }
  /**
   * Render the item
   */
  ;

  _proto.render = function render(width) {
    throw new Error("`Item.render(width)` Method not implemented.");
  };

  _createClass(MenuItem, [{
    key: "label",
    get: function get() {
      return this._label;
    },
    set: function set(value) {
      this._label = value;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this._is_disabled;
    }
  }, {
    key: "menu",
    get: function get() {
      if (!this._menu) {
        throw new Error("Cannot access `MenuItem.menu` property before append the item to the menu.");
      }

      return this._menu;
    },
    set: function set(val) {
      if (!this._menu) {
        this._menu = val;
      }
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    },
    set: function set(val) {
      var _this$_id;

      if (!((_this$_id = this._id) != null && _this$_id.length)) {
        this._id = val;
      }
    }
  }]);

  return MenuItem;
}();

var Button = /*#__PURE__*/function (_MenuItem) {
  _inheritsLoose(Button, _MenuItem);

  function Button(label, props) {
    if (props === void 0) {
      props = {};
    }

    return _MenuItem.call(this, label, props) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render(width) {
    return centerString(this.label, width);
  };

  return Button;
}(MenuItem);

var CheckButton = /*#__PURE__*/function (_MenuItem) {
  _inheritsLoose(CheckButton, _MenuItem);

  function CheckButton(label, props) {
    var _props$checked;

    var _this;

    if (props === void 0) {
      props = {};
    }

    _this = _MenuItem.call(this, label, props) || this;
    _this._checked = false;
    _this._checked = (_props$checked = props.checked) != null ? _props$checked : false;
    return _this;
  }

  var _proto = CheckButton.prototype;

  _proto.render = function render(width) {
    var checked = this._checked ? '[X]' : '[ ]';
    var spaces = byteOnly(width - this.label.length) / 2;
    return ' '.repeat(spaces + (this.label.length % 2 == 1 ? 1 : 0)) + this.label + ' '.repeat(spaces - checked.length) + checked;
  };

  _proto.onClicked = function onClicked() {
    this._checked = !this._checked;

    _MenuItem.prototype.onClicked.call(this, this._checked);
  };

  _createClass(CheckButton, [{
    key: "checked",
    get: function get() {
      return this._checked;
    }
  }]);

  return CheckButton;
}(MenuItem);

function setCursorPosition(x, y) {
  process.stdout.cursorTo(x, y);
}
function getCursorPosition() {
  var handle = kernal.GetStdHandle(
  /** Default Console Handle */
  -11);
  var buff = Buffer.alloc(22
  /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 22 */
  );
  /** @ts-ignore */

  kernal.GetConsoleScreenBufferInfo(handle, buff);
  return {
    x: buff.readInt16LE(4
    /** offest in memory */
    ),
    y: buff.readInt16LE(6
    /** offest in memory */
    )
  };
}

// format("${name} ${age}", {name: "John", age: 34}) // "John 34"
function format(data, obj) {
  return data.replace(/\{([^\}]*)\}/g, function (match, key) {
    var _obj$key;

    /** @ts-ignore */
    return (_obj$key = obj[key]) != null ? _obj$key : "";
  });
}

var MenuCore = /*#__PURE__*/function () {
  function MenuCore(propertys) {
    if (propertys === void 0) {
      propertys = {};
    }

    this._selected_item_idx = -1;
    this._items = [];
    this._message = "";
    this._is_menu_locked = false;
    this._is_menu_hidden = false;
    this.propertys = Object.assign({
      left_column_style: '|',
      right_column_style: '|',
      header_style: '-',
      bottom_row_style: '-',
      between_items_style: ' ',
      padding: 2,
      between_items_padding: 1,
      message_item_selected: false,
      message_item_format: "Item ${index} selected",
      minimal_width: 10
    }, propertys);
  } // protected _screen: Screen = new Screen()


  var _proto = MenuCore.prototype;

  _proto.showMessage = function showMessage(message, timeout) {
    var _this = this;

    if (timeout === void 0) {
      timeout = -1;
    }

    this._message = message;
    this.render();

    if (timeout > 0) {
      clearTimeout(this._message_timeout_tmo);
      this._message_timeout_tmo = setTimeout(function () {
        _this.clearMessage();

        _this.render();
      }, timeout);
    }
  }
  /**
   * Call this.showMessage("", -1)
   */
  ;

  _proto.clearMessage = function clearMessage() {
    this.showMessage("", -1);
  };

  _proto._on_key_down = function _on_key_down(keydat, key) {
    if (this._is_menu_locked) return;

    if (key.name == 'down') {
      this.moveSelection(false);
      if (this.propertys.message_item_selected) this.showMessage( // showMessage will render the menu
      format(this.propertys.message_item_format, {
        index: this._selected_item_idx
      }));else this.render();
    } else if (key.name == 'up') {
      this.moveSelection(true);
      if (this.propertys.message_item_selected) this.showMessage( // showMessage will render the menu
      format(this.propertys.message_item_format, {
        index: this._selected_item_idx
      }));else this.render();
    } else if (key.name === 'left') {
      if (this.current_selected_item) {
        this.current_selected_item.onClicked();
      }

      this.render();
    }
  }
  /**
   * Lock the menu control
   */
  ;

  _proto.lock = function lock() {
    this._is_menu_locked = true;
  }
  /**
   * Unlock the menu control
   */
  ;

  _proto.unlock = function unlock() {
    this._is_menu_locked = false;
  };

  _proto.clear = function clear() {
    throw new Error("`Menu.clear()` Method not implemented.");
  };

  _proto._hide = function _hide() {
    throw new Error("`Menu._hide()` Method not implemented.");
  };

  _proto._show = function _show() {
    throw new Error("`Menu._show()` Method not implemented.");
  };

  _proto.hide = function hide() {
    if (!this._is_menu_hidden) {
      this._is_menu_hidden = true;

      this._hide();
    }
  };

  _proto.show = function show() {
    if (this._is_menu_hidden) {
      this._is_menu_hidden = false;

      this._show();
    }
  }
  /**
   * Append new Item
   * @param at Append the item at
   */
  ;

  _proto.append = function append(item, at) {
    if (typeof at == 'number') {
      this._items.splice(at, 0, item);
    } else if (at instanceof MenuItem) {
      this._items.splice(this._items.indexOf(at), 0, item);
    } else {
      this._items.push(item);
    }

    item.id = item.ITEM_TYPE + ": " + this._items.indexOf(item);
    item.menu = this;
  }
  /**
   * Remove item from the menu
   */
  ;

  _proto.remove = function remove(item) {
    this._items.splice(this._items.indexOf(item), 1);
  };

  _proto.moveSelection = function moveSelection(up) {
    var _this$current_selecte;

    this._selected_item_idx += up ? -1 : 1;

    if (this._selected_item_idx < 0) {
      this._selected_item_idx = this._items.length - 1;
    } else if (this._selected_item_idx >= this._items.length) {
      this._selected_item_idx = 0;
    }

    if ((_this$current_selecte = this.current_selected_item) != null && _this$current_selecte.isDisabled) {
      this.moveSelection(up);
    }
  }
  /**
   * Disable an item from the menu
   */
  ;

  _proto.disable = function disable(item) {
    var _item;

    if (typeof item == 'number') {
      item = this._items[item];
    }

    (_item = item) == null ? void 0 : _item.disable == null ? void 0 : _item.disable();
  }
  /**
   * Enable an item from the menu
   */
  ;

  _proto.enable = function enable(item) {
    var _item2;

    if (typeof item == 'number') {
      item = this._items[item];
    }

    (_item2 = item) == null ? void 0 : _item2.enable == null ? void 0 : _item2.enable();
  }
  /**
   * Is item enabled
   */
  ;

  _proto.isEnabled = function isEnabled(item) {
    var _item3, _item4;

    if (typeof item == 'number') {
      item = this._items[item];
    }

    return typeof ((_item3 = item) == null ? void 0 : _item3.isDisabled) === 'boolean' ? !((_item4 = item) != null && _item4.isDisabled) : false;
  }
  /**
   * Is item disabled
   */
  ;

  _proto.isDisabled = function isDisabled(item) {
    var _item5, _item6;

    if (typeof item == 'number') {
      item = this._items[item];
    }

    return typeof ((_item5 = item) == null ? void 0 : _item5.isDisabled) === 'boolean' ? (_item6 = item) == null ? void 0 : _item6.isDisabled : false;
  }
  /**
   * Get the current menu index
   */
  ;

  _proto.currentItemIndex = function currentItemIndex() {
    return this._selected_item_idx;
  }
  /**
   * Get Item by index
   */
  ;

  _proto.getItem = function getItem(index) {
    return this._items[index];
  }
  /**
   * Initialize the menu
   */
  ;

  _proto.initialize = function initialize() {
    throw new Error("`Menu.render()` Method not implemented.");
  }
  /**
   * Render the menu
   */
  ;

  _proto.render = function render() {
    throw new Error("`Menu.render()` Method not implemented.");
  };

  _createClass(MenuCore, [{
    key: "current_selected_item",
    get: function get() {
      return this._items[this._selected_item_idx];
    }
  }, {
    key: "selected_item_idx",
    get: function get() {
      return this._selected_item_idx;
    }
  }]);

  return MenuCore;
}();
MenuCore.MENU_TYPE = "DEFAULT_MENU";

/**
 * TODO: Warp all the `console` methods, to move the cursor to ender the menu and then call the orignal method
 */
function renderScreenBuffer(buffer, options) {
  if (options === void 0) {
    options = {};
  }

  var height = 0;
  var mouseY = getCursorPosition().y;

  if (!options.cache) {
    options.cache = {
      buffer_cache: []
    };
  }

  var cache_rendered_lines = [];

  while (height < buffer.length) {
    cache_rendered_lines[height] = 0;
    var current_line = buffer[height]; // const current_line_flags = current_line[0]

    var _current_point = -1;

    setCursorPosition(0, height + mouseY);

    while (current_line[1].length > ++_current_point) {
      var current_str = current_line[1][_current_point];
      var is_color = current_str instanceof Array;
      cache_rendered_lines[height] += is_color ? current_str[1].length : current_str.length;

      if (is_color) {
        /** @ts-ignore: if is_color is true that mean current_str[0] is number */
        RenderColor.applyColor(current_str[0]);
      }

      process.stdout.write(
      /** @ts-ignore: ??? */
      is_color ? current_str[1] : current_str);

      if (is_color) {
        RenderColor.applyColor(RenderColor._default_attributes);
      }
    }

    if (cache_rendered_lines[height] < options.cache.buffer_cache[height]) {
      process.stdout.write(' '.repeat(options.cache.buffer_cache[height] - cache_rendered_lines[height] + 1));
    }

    height++;
  }

  if (cache_rendered_lines.length < options.cache.buffer_cache.length) {
    for (var i = cache_rendered_lines.length; i < options.cache.buffer_cache.length; i++) {
      setCursorPosition(0, height++);
      process.stdout.write(' '.repeat(options.cache.buffer_cache[i]));
    }
  } // if(options.curser_under_screen) {
  //     // setCursorPosition(0, buffer.length)
  // }


  setCursorPosition(0, mouseY);
  return {
    buffer_cache: cache_rendered_lines
  };
}

var MenuHeader = /*#__PURE__*/function (_MenuItem) {
  _inheritsLoose(MenuHeader, _MenuItem);

  function MenuHeader(_label) {
    var _this;

    _this = _MenuItem.call(this, "") || this;
    _this._label = _label;
    return _this;
  }
  /** @ts-ignore */


  var _proto = MenuHeader.prototype;

  _proto.render = function render(width, props) {
    var header_label = centerString(this._label, width);
    return [
    /** @ts-ignore */
    header_label.length, this._render("-".repeat(header_label.length + props.padding * 2), props, true), this._render(header_label, props), this._render("-".repeat(header_label.length + props.padding * 2), props, true)];
  };

  _proto._render = function _render(item, props, _remove_padding) {
    return [0, [// The left character of the menu
    props.left_column_style + ( // "|"
    // The menu padding, before the item
    _remove_padding ? "" : ' '.repeat(props.padding)) + // The selected item render output
    item + ( // "  Item  "
    // The menu padding, after the item
    _remove_padding ? "" : ' '.repeat(props.padding)) + // The right character of the menu
    props.right_column_style // "|"
    ]];
  };

  return MenuHeader;
}(MenuItem);

var MenuFooter = /*#__PURE__*/function (_MenuItem) {
  _inheritsLoose(MenuFooter, _MenuItem);

  function MenuFooter() {
    return _MenuItem.call(this, "") || this;
  }
  /** @ts-ignore */


  var _proto = MenuFooter.prototype;

  _proto.render = function render(log, width, props) {
    var _this = this;

    var footer_labels = wrap(log, {
      width: width - props.padding * 2
    }).split('\n').map(function (lbl) {
      return centerString(lbl, width);
    });
    /** @ts-ignore */

    var max_length = footer_labels.reduce(function (prev, cur) {
      return Math.max(prev.length, cur.length);
    });

    if (typeof max_length === 'string') {
      /** @ts-ignore */
      max_length = max_length.length;
    }

    return [this._render("-".repeat(max_length + props.padding * 2), props, true)].concat(footer_labels.map(function (label) {
      return _this._render(label, props);
    }), [this._render("-".repeat(max_length + props.padding * 2), props, true)]);
  };

  _proto._render = function _render(item, props, _remove_padding) {
    return [0, [// The left character of the menu
    props.left_column_style + ( // "|"
    // The menu padding, before the item
    _remove_padding ? "" : ' '.repeat(props.padding)) + // The selected item render output
    item + ( // "  Item  "
    // The menu padding, after the item
    _remove_padding ? "" : ' '.repeat(props.padding)) + // The right character of the menu
    props.right_column_style // "|"
    ]];
  };

  return MenuFooter;
}(MenuItem);

/** Initialize the stdin for us */

var RL = /*#__PURE__*/createInterface({
  input: process.stdin,
  output: process.stdout
});

var Menu = /*#__PURE__*/function (_MenuCore) {
  _inheritsLoose(Menu, _MenuCore);

  function Menu(_title, props) {
    var _this;

    if (_title === void 0) {
      _title = "Default Menu Title";
    }

    if (props === void 0) {
      props = {};
    }

    _this = _MenuCore.call(this, props) || this;
    _this._title = _title;
    _this._cache = undefined;
    _this._menu_header = new MenuHeader(_this._title);
    _this._menu_header.menu = _assertThisInitialized(_this);
    _this._menu_footer = new MenuFooter();
    _this._menu_footer.menu = _assertThisInitialized(_this);
    return _this;
  }

  var _proto = Menu.prototype;

  _proto.initialize = function initialize() {
    this.moveSelection(false);
    process.stdin.on('keypress', this._on_key_down.bind(this));
  };

  _proto.dispose = function dispose() {
    process.stdin.off('keypress', this._on_key_down);
    this.lock();
    this.hide();
  };

  _proto._hide = function _hide() {
    if (!this._cache) return;
    var hidden_buffer = [];

    for (var _iterator = _createForOfIteratorHelperLoose(this._cache.buffer_cache), _step; !(_step = _iterator()).done;) {
      var line = _step.value;
      hidden_buffer.push([0, [' '.repeat(line)]]);
    }

    renderScreenBuffer(hidden_buffer);
    setCursorPosition(0, 0);
  };

  _proto._show = function _show() {
    this.render();
  };

  _proto.render = function render(width) {
    if (width === void 0) {
      width = this.propertys.minimal_width;
    }

    if (this._is_menu_hidden) return;
    var buffer = []; // Rendering the menu header

    var _this$_menu_header$re = this._menu_header.render(width, this.propertys),
        header_width = _this$_menu_header$re[0],
        rendered_menu_header = _this$_menu_header$re.slice(1);

    width = header_width; // if(rendered_menu_header[0][1][0].length > header_width) {
    //     width = header_width
    // }

    var rendered_menu_footer = this._menu_footer.render(this._message, width, this.propertys); // Rendering the menu footer


    for (var idx in this._items) {
      var item = this._items[idx];
      var is_item_selected = idx == this._selected_item_idx;
      var rendered_item = item.render(width);

      if (rendered_item.length > width) {
        return this.render(rendered_item.length);
      }

      buffer.push(this._render(rendered_item, is_item_selected, item)); // We don't want to add padding after the last item
      // @ts-ignore

      if (idx != this._items.length - 1) {
        // Adding between items padding
        for (var i = 0; i < this.propertys.between_items_padding; i++) {
          buffer.push(this._render(this.propertys.between_items_style.repeat(width), false));
        }
      }
    } // Redner the menu


    this._cache = renderScreenBuffer([].concat(rendered_menu_header, buffer, rendered_menu_footer), {
      curser_under_screen: true,
      cache: this._cache
    });
  };

  _proto._render = function _render(rendered_data, is_selected, item) {
    var _this$propertys$left_;

    return [0, [// The left character of the menu
    (_this$propertys$left_ = this.propertys.left_column_style) != null ? _this$propertys$left_ : "|"].concat(is_selected ? [[Color.BACKGROUND_BLUE | Color.BACKGROUND_GREEN | Color.BACKGROUND_RED, // The menu padding, before the item
    ' '.repeat(this.propertys.padding) + // The selected item render output
    rendered_data + // "  Item  "
    // The menu padding, after the item
    ' '.repeat(this.propertys.padding)]] : [// The menu padding, before the item
    ' '.repeat(this.propertys.padding), item != null && item.isDisabled ? [8
    /** 8 for gray */
    , // The selected item render output
    rendered_data // "  Item  "
    ] : rendered_data, // The menu padding, after the item
    ' '.repeat(this.propertys.padding)], [// The right character of the menu
    this.propertys.right_column_style + ( // "|"
    // Selected item indicator
    is_selected ? " <--" : "") // " <-" or ""
    ])];
  };

  return Menu;
}(MenuCore);

var SubMenu = /*#__PURE__*/function (_MenuItem) {
  _inheritsLoose(SubMenu, _MenuItem);

  function SubMenu(label, _render_menu, propertys) {
    var _this;

    if (_render_menu === void 0) {
      _render_menu = new Menu(label);
    }

    if (propertys === void 0) {
      propertys = {};
    }

    _this = _MenuItem.call(this, label, propertys) || this;
    _this._render_menu = _render_menu;

    _this._render_menu.lock();

    _this._render_menu.append(new Button("Return", {
      onClicked: function onClicked() {
        _this.hide();
      }
    }));

    _this._render_menu.initialize();

    return _this;
  }

  var _proto = SubMenu.prototype;

  _proto.render = function render(width) {
    var label = this.label;
    var rightIcon = '[<]';
    var spaces = byteOnly(width - label.length) / 2;
    return ' '.repeat(spaces + (label.length % 2 == 1 ? 1 : 0)) + label + ' '.repeat(spaces - rightIcon.length) + rightIcon;
  };

  _proto.show = function show() {
    this.menu.lock();
    this.menu.hide();

    this._render_menu.show();

    this._render_menu.unlock();

    this._render_menu.render();
  };

  _proto.hide = function hide() {
    var _this2 = this;

    this._render_menu.lock();

    this._render_menu.hide();

    process.nextTick(function () {
      _this2.menu.unlock();

      _this2.menu.show();
    });
  };

  _proto.onClicked = function onClicked() {
    _MenuItem.prototype.onClicked.call(this);

    this.show();
  };

  _createClass(SubMenu, [{
    key: "subMenu",
    get: function get() {
      return this._render_menu;
    }
  }]);

  return SubMenu;
}(MenuItem);

module.exports = Menu;
module.exports.Button = Button;
module.exports.CheckButton = CheckButton;
module.exports.SubMenu = SubMenu;
module.exports.Menu = Menu;
module.exports.RL = RL;

export { Button, CheckButton, Menu, RL, SubMenu };
//# sourceMappingURL=console-menu.js.esm.js.map
