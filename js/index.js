'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keyboards = {
    left_top_lis: [{ name: '%', type: 'o' }, { name: 'C', type: 'reset' }, { name: '←', type: 'back' }],
    left_main_lis: [{ name: '7', type: 'number' }, { name: '8', type: 'number' }, { name: '9', type: 'number' }, { name: '4', type: 'number' }, { name: '5', type: 'number' }, { name: '6', type: 'number' }, { name: '1', type: 'number' }, { name: '2', type: 'number' }, { name: '3', type: 'number' }, { name: '±', type: 'pos' }, { name: '0', type: 'number' }, { name: '.', type: 'number' }],
    right_lis: [{ name: '/', type: 'o' }, { name: '*', type: 'o' }, { name: '-', type: 'o' }, { name: '+', type: 'o' }, { name: '=', type: 'equal' }]
};

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                express = _props.express,
                eq = _props.eq;

            return React.createElement(
                'header',
                null,
                React.createElement('input', { type: 'text', readOnly: true, name: 'caculate', value: express }),
                React.createElement('input', { type: 'text', readOnly: true, name: 'result', value: eq })
            );
        }
    }]);

    return Header;
}(React.Component);

var Content = function (_React$Component2) {
    _inherits(Content, _React$Component2);

    function Content() {
        _classCallCheck(this, Content);

        return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
    }

    _createClass(Content, [{
        key: 'render',
        value: function render() {
            var right_lis = keyboards.right_lis,
                left_top_lis = keyboards.left_top_lis,
                left_main_lis = keyboards.left_main_lis;
            var fn = this.props.fn;

            right_lis = right_lis.map(function (v) {
                return React.createElement(
                    'li',
                    { key: v.name, onClick: function onClick() {
                            return fn(v);
                        } },
                    v.name
                );
            });
            left_top_lis = left_top_lis.map(function (v) {
                return React.createElement(
                    'li',
                    { key: v.name, onClick: function onClick() {
                            return fn(v);
                        } },
                    v.name
                );
            });
            left_main_lis = left_main_lis.map(function (v) {
                return React.createElement(
                    'li',
                    { key: v.name, onClick: function onClick() {
                            fn(v);
                        } },
                    v.name
                );
            });
            return React.createElement(
                'main',
                null,
                React.createElement(
                    'ul',
                    { className: 'left' },
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'ul',
                            null,
                            left_top_lis
                        )
                    ),
                    left_main_lis
                ),
                React.createElement(
                    'ul',
                    { className: 'right' },
                    right_lis
                )
            );
        }
    }]);

    return Content;
}(React.Component);

var Computer = function (_React$Component3) {
    _inherits(Computer, _React$Component3);

    function Computer() {
        _classCallCheck(this, Computer);

        var _this3 = _possibleConstructorReturn(this, (Computer.__proto__ || Object.getPrototypeOf(Computer)).call(this));

        _this3.state = {
            express: '',
            eq: ''
        };
        _this3.fn = _this3.fn.bind(_this3);
        return _this3;
    }

    _createClass(Computer, [{
        key: 'fn',
        value: function fn(v) {
            var reg = /^[+-]?\d+(\.?\d{0,2})([%+*/-]?\d+(\.?\d{0,2}))+$/;
            switch (v.type) {
                case 'equal':
                    if (this.state.express.length && reg.test(this.state.express)) {
                        this.setState({
                            express: this.state.express,
                            eq: eval(this.state.express)
                        });
                    } else {
                        alert('输入错误');
                    }
                    break;
                case 'reset':
                    this.reset();
                    break;
                case 'back':
                    if (this.state.express.length > 0) {
                        this.setState({
                            express: this.state.express.slice(0, -1),
                            eq: ''
                        });
                    }
                    break;
                case 'pos':
                    var regs = /^\d+$/;
                    if (this.state.express == '') {
                        this.setState({
                            express: '0',
                            eq: ''
                        });
                    } else if (regs.test(this.state.express)) {
                        if (eval(this.state.express)) {
                            this.setState({
                                express: '-' + this.state.express,
                                eq: ''
                            });
                        } else {
                            console.log(1);
                            this.setState({
                                express: this.state.express.slice(1),
                                eq: ''
                            });
                        }
                    }
                    break;
                default:
                    if (this.state.eq != '') {
                        this.setState({
                            express: v.name,
                            eq: ''
                        });
                    } else {
                        this.setState({
                            express: this.state.express += v.name,
                            eq: ''
                        });
                    }

            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState({
                express: '',
                eq: ''
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                express = _state.express,
                eq = _state.eq;

            return React.createElement(
                'div',
                { className: 'main' },
                React.createElement(Header, { express: express, eq: eq }),
                React.createElement(Content, { fn: this.fn })
            );
        }
    }]);

    return Computer;
}(React.Component);

ReactDOM.render(React.createElement(Computer, null), document.querySelector('#computer'));
