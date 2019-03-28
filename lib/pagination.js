'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultButton = function defaultButton(props) {
  return _react2.default.createElement(
    'button',
    _extends({ type: 'button' }, props, { className: '-btn' }),
    props.children
  );
};

var ReactTablePagination = function (_Component) {
  _inherits(ReactTablePagination, _Component);

  function ReactTablePagination(props) {
    _classCallCheck(this, ReactTablePagination);

    var _this = _possibleConstructorReturn(this, (ReactTablePagination.__proto__ || Object.getPrototypeOf(ReactTablePagination)).call(this, props));

    _this.getSafePage = _this.getSafePage.bind(_this);
    _this.changePage = _this.changePage.bind(_this);
    _this.applyPage = _this.applyPage.bind(_this);

    _this.state = {
      page: props.page
    };
    return _this;
  }

  _createClass(ReactTablePagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.page !== nextProps.page) {
        this.setState({ page: nextProps.page });
      }
    }
  }, {
    key: 'getSafePage',
    value: function getSafePage(page) {
      if (Number.isNaN(page)) {
        page = this.props.page;
      }
      return Math.min(Math.max(page, 0), this.props.pages - 1);
    }
  }, {
    key: 'changePage',
    value: function changePage(page) {
      page = this.getSafePage(page);
      this.setState({ page: page });
      if (this.props.page !== page) {
        this.props.onPageChange(page);
      }
    }
  }, {
    key: 'applyPage',
    value: function applyPage(e) {
      if (e) {
        e.preventDefault();
      }
      var page = this.state.page;
      this.changePage(page === '' ? this.props.page : page);
    }
  }, {
    key: 'getPageJumpProperties',
    value: function getPageJumpProperties() {
      var _this2 = this;

      return {
        onKeyPress: function onKeyPress(e) {
          if (e.which === 13 || e.keyCode === 13) {
            _this2.applyPage();
          }
        },
        onBlur: this.applyPage,
        value: this.state.page === '' ? '' : this.state.page + 1,
        onChange: function onChange(e) {
          var val = e.target.value;
          var page = val - 1;
          if (val === '') {
            return _this2.setState({ page: val });
          }
          _this2.setState({ page: _this2.getSafePage(page) });
        },
        inputType: this.state.page === '' ? 'text' : 'number',
        pageJumpText: this.props.pageJumpText
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          pages = _props.pages,
          page = _props.page,
          showPageSizeOptions = _props.showPageSizeOptions,
          pageSizeOptions = _props.pageSizeOptions,
          pageSize = _props.pageSize,
          showPageJump = _props.showPageJump,
          canPrevious = _props.canPrevious,
          canNext = _props.canNext,
          onPageSizeChange = _props.onPageSizeChange,
          className = _props.className,
          PreviousComponent = _props.PreviousComponent,
          NextComponent = _props.NextComponent,
          renderPageJump = _props.renderPageJump,
          renderCurrentPage = _props.renderCurrentPage,
          renderTotalPagesCount = _props.renderTotalPagesCount,
          renderPageSizeOptions = _props.renderPageSizeOptions;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(className, '-pagination'), style: this.props.style },
        _react2.default.createElement(
          'div',
          { className: '-previous' },
          _react2.default.createElement(
            PreviousComponent,
            {
              onClick: function onClick() {
                if (!canPrevious) return;
                _this3.changePage(page - 1);
              },
              disabled: !canPrevious
            },
            this.props.previousText
          )
        ),
        _react2.default.createElement(
          'div',
          { className: '-center' },
          _react2.default.createElement(
            'span',
            { className: '-pageInfo' },
            this.props.pageText,
            ' ',
            showPageJump ? renderPageJump(this.getPageJumpProperties()) : renderCurrentPage(page),
            ' ',
            this.props.ofText,
            ' ',
            renderTotalPagesCount(pages)
          ),
          showPageSizeOptions && renderPageSizeOptions({
            pageSize: pageSize,
            rowsSelectorText: this.props.rowsSelectorText,
            pageSizeOptions: pageSizeOptions,
            onPageSizeChange: onPageSizeChange,
            rowsText: this.props.rowsText
          })
        ),
        _react2.default.createElement(
          'div',
          { className: '-next' },
          _react2.default.createElement(
            NextComponent,
            {
              onClick: function onClick() {
                if (!canNext) return;
                _this3.changePage(page + 1);
              },
              disabled: !canNext
            },
            this.props.nextText
          )
        )
      );
    }
  }]);

  return ReactTablePagination;
}(_react.Component);

ReactTablePagination.defaultProps = {
  PreviousComponent: defaultButton,
  NextComponent: defaultButton,
  renderPageJump: function renderPageJump(_ref) {
    var onChange = _ref.onChange,
        value = _ref.value,
        onBlur = _ref.onBlur,
        onKeyPress = _ref.onKeyPress,
        inputType = _ref.inputType,
        pageJumpText = _ref.pageJumpText;
    return _react2.default.createElement(
      'div',
      { className: '-pageJump' },
      _react2.default.createElement('input', {
        'aria-label': pageJumpText,
        type: inputType,
        onChange: onChange,
        value: value,
        onBlur: onBlur,
        onKeyPress: onKeyPress
      })
    );
  },
  renderCurrentPage: function renderCurrentPage(page) {
    return _react2.default.createElement(
      'span',
      { className: '-currentPage' },
      page + 1
    );
  },
  renderTotalPagesCount: function renderTotalPagesCount(pages) {
    return _react2.default.createElement(
      'span',
      { className: '-totalPages' },
      pages || 1
    );
  },
  renderPageSizeOptions: function renderPageSizeOptions(_ref2) {
    var pageSize = _ref2.pageSize,
        pageSizeOptions = _ref2.pageSizeOptions,
        rowsSelectorText = _ref2.rowsSelectorText,
        onPageSizeChange = _ref2.onPageSizeChange,
        rowsText = _ref2.rowsText;
    return _react2.default.createElement(
      'span',
      { className: 'select-wrap -pageSizeOptions' },
      _react2.default.createElement(
        'select',
        {
          'aria-label': rowsSelectorText,
          onChange: function onChange(e) {
            return onPageSizeChange(Number(e.target.value));
          },
          value: pageSize
        },
        pageSizeOptions.map(function (option, i) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            _react2.default.createElement(
              'option',
              { key: i, value: option },
              option + ' ' + rowsText
            )
          );
        })
      )
    );
  }
};
exports.default = ReactTablePagination;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdpbmF0aW9uLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRCdXR0b24iLCJwcm9wcyIsImNoaWxkcmVuIiwiUmVhY3RUYWJsZVBhZ2luYXRpb24iLCJnZXRTYWZlUGFnZSIsImJpbmQiLCJjaGFuZ2VQYWdlIiwiYXBwbHlQYWdlIiwic3RhdGUiLCJwYWdlIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJOdW1iZXIiLCJpc05hTiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwYWdlcyIsIm9uUGFnZUNoYW5nZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm9uS2V5UHJlc3MiLCJ3aGljaCIsImtleUNvZGUiLCJvbkJsdXIiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidmFsIiwidGFyZ2V0IiwiaW5wdXRUeXBlIiwicGFnZUp1bXBUZXh0Iiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplIiwic2hvd1BhZ2VKdW1wIiwiY2FuUHJldmlvdXMiLCJjYW5OZXh0Iiwib25QYWdlU2l6ZUNoYW5nZSIsImNsYXNzTmFtZSIsIlByZXZpb3VzQ29tcG9uZW50IiwiTmV4dENvbXBvbmVudCIsInJlbmRlclBhZ2VKdW1wIiwicmVuZGVyQ3VycmVudFBhZ2UiLCJyZW5kZXJUb3RhbFBhZ2VzQ291bnQiLCJyZW5kZXJQYWdlU2l6ZU9wdGlvbnMiLCJzdHlsZSIsInByZXZpb3VzVGV4dCIsInBhZ2VUZXh0IiwiZ2V0UGFnZUp1bXBQcm9wZXJ0aWVzIiwib2ZUZXh0Iiwicm93c1NlbGVjdG9yVGV4dCIsInJvd3NUZXh0IiwibmV4dFRleHQiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJtYXAiLCJvcHRpb24iLCJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZ0JBQWdCLFNBQWhCQSxhQUFnQjtBQUFBLFNBQ3BCO0FBQUE7QUFBQSxlQUFRLE1BQUssUUFBYixJQUEwQkMsS0FB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QSxRQUFNLFdBQVUsY0FBaEI7QUFBZ0NqQyxhQUFPO0FBQXZDLEtBQVI7QUFBQSxHQWpCQztBQWtCcEJrQyx5QkFBdUI7QUFBQSxXQUFTO0FBQUE7QUFBQSxRQUFNLFdBQVUsYUFBaEI7QUFBK0IxQixlQUFTO0FBQXhDLEtBQVQ7QUFBQSxHQWxCSDtBQW1CcEIyQix5QkFBdUI7QUFBQSxRQUNyQlgsUUFEcUIsU0FDckJBLFFBRHFCO0FBQUEsUUFFckJELGVBRnFCLFNBRXJCQSxlQUZxQjtBQUFBLFFBR3JCa0IsZ0JBSHFCLFNBR3JCQSxnQkFIcUI7QUFBQSxRQUlyQmIsZ0JBSnFCLFNBSXJCQSxnQkFKcUI7QUFBQSxRQUtyQmMsUUFMcUIsU0FLckJBLFFBTHFCO0FBQUEsV0FPckI7QUFBQTtBQUFBLFFBQU0sV0FBVSw4QkFBaEI7QUFDRTtBQUFBO0FBQUE7QUFDRSx3QkFBWUQsZ0JBRGQ7QUFFRSxvQkFBVTtBQUFBLG1CQUFLYixpQkFBaUJ6QixPQUFPTyxFQUFFUyxNQUFGLENBQVNILEtBQWhCLENBQWpCLENBQUw7QUFBQSxXQUZaO0FBR0UsaUJBQU9RO0FBSFQ7QUFLR0Qsd0JBQWdCdUIsR0FBaEIsQ0FBb0IsVUFBQ0MsTUFBRCxFQUFTQyxDQUFUO0FBQUE7QUFDbkI7QUFDQTtBQUFBO0FBQUEsZ0JBQVEsS0FBS0EsQ0FBYixFQUFnQixPQUFPRCxNQUF2QjtBQUNNQSxvQkFETixTQUNnQkw7QUFEaEI7QUFGbUI7QUFBQSxTQUFwQjtBQUxIO0FBREYsS0FQcUI7QUFBQTtBQW5CSCxDO2tCQURIaEQsb0IiLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcclxuXHJcbmNvbnN0IGRlZmF1bHRCdXR0b24gPSBwcm9wcyA9PiAoXHJcbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgey4uLnByb3BzfSBjbGFzc05hbWU9XCItYnRuXCI+XHJcbiAgICB7cHJvcHMuY2hpbGRyZW59XHJcbiAgPC9idXR0b24+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWN0VGFibGVQYWdpbmF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgUHJldmlvdXNDb21wb25lbnQ6IGRlZmF1bHRCdXR0b24sXHJcbiAgICBOZXh0Q29tcG9uZW50OiBkZWZhdWx0QnV0dG9uLFxyXG4gICAgcmVuZGVyUGFnZUp1bXA6ICh7XHJcbiAgICAgIG9uQ2hhbmdlLCB2YWx1ZSwgb25CbHVyLCBvbktleVByZXNzLCBpbnB1dFR5cGUsIHBhZ2VKdW1wVGV4dCxcclxuICAgIH0pID0+IChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCItcGFnZUp1bXBcIj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e3BhZ2VKdW1wVGV4dH1cclxuICAgICAgICAgIHR5cGU9e2lucHV0VHlwZX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgICAgb25LZXlQcmVzcz17b25LZXlQcmVzc31cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICksXHJcbiAgICByZW5kZXJDdXJyZW50UGFnZTogcGFnZSA9PiA8c3BhbiBjbGFzc05hbWU9XCItY3VycmVudFBhZ2VcIj57cGFnZSArIDF9PC9zcGFuPixcclxuICAgIHJlbmRlclRvdGFsUGFnZXNDb3VudDogcGFnZXMgPT4gPHNwYW4gY2xhc3NOYW1lPVwiLXRvdGFsUGFnZXNcIj57cGFnZXMgfHwgMX08L3NwYW4+LFxyXG4gICAgcmVuZGVyUGFnZVNpemVPcHRpb25zOiAoe1xyXG4gICAgICBwYWdlU2l6ZSxcclxuICAgICAgcGFnZVNpemVPcHRpb25zLFxyXG4gICAgICByb3dzU2VsZWN0b3JUZXh0LFxyXG4gICAgICBvblBhZ2VTaXplQ2hhbmdlLFxyXG4gICAgICByb3dzVGV4dCxcclxuICAgIH0pID0+IChcclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic2VsZWN0LXdyYXAgLXBhZ2VTaXplT3B0aW9uc1wiPlxyXG4gICAgICAgIDxzZWxlY3RcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e3Jvd3NTZWxlY3RvclRleHR9XHJcbiAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBvblBhZ2VTaXplQ2hhbmdlKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxyXG4gICAgICAgICAgdmFsdWU9e3BhZ2VTaXplfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtwYWdlU2l6ZU9wdGlvbnMubWFwKChvcHRpb24sIGkpID0+IChcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLWFycmF5LWluZGV4LWtleVxyXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aX0gdmFsdWU9e29wdGlvbn0+XHJcbiAgICAgICAgICAgICAge2Ake29wdGlvbn0gJHtyb3dzVGV4dH1gfVxyXG4gICAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApLFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcylcclxuXHJcbiAgICB0aGlzLmdldFNhZmVQYWdlID0gdGhpcy5nZXRTYWZlUGFnZS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmNoYW5nZVBhZ2UgPSB0aGlzLmNoYW5nZVBhZ2UuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5hcHBseVBhZ2UgPSB0aGlzLmFwcGx5UGFnZS5iaW5kKHRoaXMpXHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcGFnZTogcHJvcHMucGFnZSxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xyXG4gICAgaWYgKHRoaXMucHJvcHMucGFnZSAhPT0gbmV4dFByb3BzLnBhZ2UpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2U6IG5leHRQcm9wcy5wYWdlIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRTYWZlUGFnZSAocGFnZSkge1xyXG4gICAgaWYgKE51bWJlci5pc05hTihwYWdlKSkge1xyXG4gICAgICBwYWdlID0gdGhpcy5wcm9wcy5wYWdlXHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocGFnZSwgMCksIHRoaXMucHJvcHMucGFnZXMgLSAxKVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlUGFnZSAocGFnZSkge1xyXG4gICAgcGFnZSA9IHRoaXMuZ2V0U2FmZVBhZ2UocGFnZSlcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwYWdlIH0pXHJcbiAgICBpZiAodGhpcy5wcm9wcy5wYWdlICE9PSBwYWdlKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25QYWdlQ2hhbmdlKHBhZ2UpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhcHBseVBhZ2UgKGUpIHtcclxuICAgIGlmIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgfVxyXG4gICAgY29uc3QgcGFnZSA9IHRoaXMuc3RhdGUucGFnZVxyXG4gICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgPT09ICcnID8gdGhpcy5wcm9wcy5wYWdlIDogcGFnZSlcclxuICB9XHJcblxyXG4gIGdldFBhZ2VKdW1wUHJvcGVydGllcyAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBvbktleVByZXNzOiBlID0+IHtcclxuICAgICAgICBpZiAoZS53aGljaCA9PT0gMTMgfHwgZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgdGhpcy5hcHBseVBhZ2UoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgb25CbHVyOiB0aGlzLmFwcGx5UGFnZSxcclxuICAgICAgdmFsdWU6IHRoaXMuc3RhdGUucGFnZSA9PT0gJycgPyAnJyA6IHRoaXMuc3RhdGUucGFnZSArIDEsXHJcbiAgICAgIG9uQ2hhbmdlOiBlID0+IHtcclxuICAgICAgICBjb25zdCB2YWwgPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgIGNvbnN0IHBhZ2UgPSB2YWwgLSAxXHJcbiAgICAgICAgaWYgKHZhbCA9PT0gJycpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHsgcGFnZTogdmFsIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwYWdlOiB0aGlzLmdldFNhZmVQYWdlKHBhZ2UpIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIGlucHV0VHlwZTogdGhpcy5zdGF0ZS5wYWdlID09PSAnJyA/ICd0ZXh0JyA6ICdudW1iZXInLFxyXG4gICAgICBwYWdlSnVtcFRleHQ6IHRoaXMucHJvcHMucGFnZUp1bXBUZXh0LFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyICgpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgLy8gQ29tcHV0ZWRcclxuICAgICAgcGFnZXMsXHJcbiAgICAgIC8vIFByb3BzXHJcbiAgICAgIHBhZ2UsXHJcbiAgICAgIHNob3dQYWdlU2l6ZU9wdGlvbnMsXHJcbiAgICAgIHBhZ2VTaXplT3B0aW9ucyxcclxuICAgICAgcGFnZVNpemUsXHJcbiAgICAgIHNob3dQYWdlSnVtcCxcclxuICAgICAgY2FuUHJldmlvdXMsXHJcbiAgICAgIGNhbk5leHQsXHJcbiAgICAgIG9uUGFnZVNpemVDaGFuZ2UsXHJcbiAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgUHJldmlvdXNDb21wb25lbnQsXHJcbiAgICAgIE5leHRDb21wb25lbnQsXHJcbiAgICAgIHJlbmRlclBhZ2VKdW1wLFxyXG4gICAgICByZW5kZXJDdXJyZW50UGFnZSxcclxuICAgICAgcmVuZGVyVG90YWxQYWdlc0NvdW50LFxyXG4gICAgICByZW5kZXJQYWdlU2l6ZU9wdGlvbnMsXHJcbiAgICB9ID0gdGhpcy5wcm9wc1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNsYXNzTmFtZSwgJy1wYWdpbmF0aW9uJyl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1wcmV2aW91c1wiPlxyXG4gICAgICAgICAgPFByZXZpb3VzQ29tcG9uZW50XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIWNhblByZXZpb3VzKSByZXR1cm5cclxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2UocGFnZSAtIDEpXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXshY2FuUHJldmlvdXN9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnByZXZpb3VzVGV4dH1cclxuICAgICAgICAgIDwvUHJldmlvdXNDb21wb25lbnQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCItY2VudGVyXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCItcGFnZUluZm9cIj5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMucGFnZVRleHR9eycgJ31cclxuICAgICAgICAgICAge3Nob3dQYWdlSnVtcCA/IHJlbmRlclBhZ2VKdW1wKHRoaXMuZ2V0UGFnZUp1bXBQcm9wZXJ0aWVzKCkpIDogcmVuZGVyQ3VycmVudFBhZ2UocGFnZSl9eycgJ31cclxuICAgICAgICAgICAge3RoaXMucHJvcHMub2ZUZXh0fSB7cmVuZGVyVG90YWxQYWdlc0NvdW50KHBhZ2VzKX1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIHtzaG93UGFnZVNpemVPcHRpb25zICYmXHJcbiAgICAgICAgICAgIHJlbmRlclBhZ2VTaXplT3B0aW9ucyh7XHJcbiAgICAgICAgICAgICAgcGFnZVNpemUsXHJcbiAgICAgICAgICAgICAgcm93c1NlbGVjdG9yVGV4dDogdGhpcy5wcm9wcy5yb3dzU2VsZWN0b3JUZXh0LFxyXG4gICAgICAgICAgICAgIHBhZ2VTaXplT3B0aW9ucyxcclxuICAgICAgICAgICAgICBvblBhZ2VTaXplQ2hhbmdlLFxyXG4gICAgICAgICAgICAgIHJvd3NUZXh0OiB0aGlzLnByb3BzLnJvd3NUZXh0LFxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1uZXh0XCI+XHJcbiAgICAgICAgICA8TmV4dENvbXBvbmVudFxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFjYW5OZXh0KSByZXR1cm5cclxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2UocGFnZSArIDEpXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXshY2FuTmV4dH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMubmV4dFRleHR9XHJcbiAgICAgICAgICA8L05leHRDb21wb25lbnQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iXX0=