'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
//


var emptyObj = function emptyObj() {
  return {};
};

exports.default = {
  // General
  data: [],
  resolveData: function resolveData(data) {
    return data;
  },
  loading: false,
  showPagination: true,
  showPaginationTop: false,
  showPaginationBottom: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPage: 0,
  defaultPageSize: 20,
  showPageJump: true,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  sortable: true,
  multiSort: true,
  resizable: true,
  filterable: false,
  defaultSortDesc: false,
  defaultSorted: [],
  defaultFiltered: [],
  defaultResized: [],
  defaultExpanded: {},
  // eslint-disable-next-line no-unused-vars
  defaultFilterMethod: function defaultFilterMethod(filter, row, column) {
    var id = filter.pivotId || filter.id;
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
  },
  // eslint-disable-next-line no-unused-vars
  defaultSortMethod: function defaultSortMethod(a, b, desc) {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? '' : a;
    b = b === null || b === undefined ? '' : b;
    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // returning 0, undefined or any falsey value will use subsequent sorts or
    // the index as a tiebreaker
    return 0;
  },

  // Controlled State Props
  // page: undefined,
  // pageSize: undefined,
  // sorted: [],
  // filtered: [],
  // resized: [],
  // expanded: {},

  // Controlled State Callbacks
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortedChange: undefined,
  onFilteredChange: undefined,
  onResizedChange: undefined,
  onExpandedChange: undefined,

  // Pivoting
  pivotBy: undefined,

  // Key Constants
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',
  aggregatedKey: '_aggregated',
  nestingLevelKey: '_nestingLevel',
  originalKey: '_original',
  indexKey: '_index',
  groupedByPivotKey: '_groupedByPivot',

  // Server-side Callbacks
  onFetchData: function onFetchData() {
    return null;
  },

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: emptyObj,
  getTableProps: emptyObj,
  getTheadGroupProps: emptyObj,
  getTheadGroupTrProps: emptyObj,
  getTheadGroupThProps: emptyObj,
  getTheadProps: emptyObj,
  getTheadTrProps: emptyObj,
  getTheadThProps: emptyObj,
  getTheadFilterProps: emptyObj,
  getTheadFilterTrProps: emptyObj,
  getTheadFilterThProps: emptyObj,
  getTbodyProps: emptyObj,
  getTrGroupProps: emptyObj,
  getTrProps: emptyObj,
  getTdProps: emptyObj,
  getTfootProps: emptyObj,
  getTfootTrProps: emptyObj,
  getTfootTdProps: emptyObj,
  getPaginationProps: emptyObj,
  getLoadingProps: emptyObj,
  getNoDataProps: emptyObj,
  getResizerProps: emptyObj,

  // Global Column Defaults
  column: {
    // Renderers
    Cell: undefined,
    Header: undefined,
    Footer: undefined,
    Aggregated: undefined,
    Pivot: undefined,
    PivotValue: undefined,
    Expander: undefined,
    Filter: undefined,
    Placeholder: undefined,
    // All Columns
    sortable: undefined, // use table default
    resizable: undefined, // use table default
    filterable: undefined, // use table default
    show: true,
    minWidth: 100,
    minResizeWidth: 11,
    // Cells only
    className: '',
    style: {},
    getProps: emptyObj,
    // Pivot only
    aggregate: undefined,
    // Headers only
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: emptyObj,
    // Footers only
    footerClassName: '',
    footerStyle: {},
    getFooterProps: emptyObj,
    filterMethod: undefined,
    filterAll: false,
    sortMethod: undefined
  },

  // Global Expander Column Defaults
  expanderDefaults: {
    sortable: false,
    resizable: false,
    filterable: false,
    width: 35
  },

  pivotDefaults: {
    // extend the defaults for pivoted columns here
  },

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',
  pageJumpText: 'jump to page',
  rowsSelectorText: 'rows per page',

  // Components
  TableComponent: function TableComponent(_ref) {
    var children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)('rt-table', className),
        role: 'grid'
        // tabIndex='0'
      }, rest),
      children
    );
  },
  TheadComponent: _utils2.default.makeTemplateComponent('rt-thead', 'Thead'),
  TbodyComponent: _utils2.default.makeTemplateComponent('rt-tbody', 'Tbody'),
  TrGroupComponent: function TrGroupComponent(_ref2) {
    var children = _ref2.children,
        className = _ref2.className,
        rest = _objectWithoutProperties(_ref2, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('rt-tr-group', className), role: 'rowgroup' }, rest),
      children
    );
  },
  TrComponent: function TrComponent(_ref3) {
    var children = _ref3.children,
        className = _ref3.className,
        rest = _objectWithoutProperties(_ref3, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('rt-tr', className), role: 'row' }, rest),
      children
    );
  },
  ThComponent: function ThComponent(_ref4) {
    var toggleSort = _ref4.toggleSort,
        className = _ref4.className,
        children = _ref4.children,
        rest = _objectWithoutProperties(_ref4, ['toggleSort', 'className', 'children']);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      _react2.default.createElement(
        'div',
        _extends({
          className: (0, _classnames2.default)('rt-th', className),
          onClick: function onClick(e) {
            return toggleSort && toggleSort(e);
          },
          role: 'columnheader',
          tabIndex: '-1' // Resolves eslint issues without implementing keyboard navigation incorrectly
        }, rest),
        children
      )
    );
  },
  TdComponent: function TdComponent(_ref5) {
    var toggleSort = _ref5.toggleSort,
        className = _ref5.className,
        children = _ref5.children,
        rest = _objectWithoutProperties(_ref5, ['toggleSort', 'className', 'children']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('rt-td', className), role: 'gridcell' }, rest),
      children
    );
  },
  TfootComponent: _utils2.default.makeTemplateComponent('rt-tfoot', 'Tfoot'),
  FilterComponent: function FilterComponent(_ref6) {
    var filter = _ref6.filter,
        _onChange = _ref6.onChange,
        column = _ref6.column;
    return _react2.default.createElement('input', {
      type: 'text',
      style: {
        width: '100%'
      },
      placeholder: column.Placeholder,
      value: filter ? filter.value : '',
      onChange: function onChange(event) {
        return _onChange(event.target.value);
      }
    });
  },
  ExpanderComponent: function ExpanderComponent(_ref7) {
    var isExpanded = _ref7.isExpanded;
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('rt-expander', isExpanded && '-open') },
      '\u2022'
    );
  },
  PivotValueComponent: function PivotValueComponent(_ref8) {
    var subRows = _ref8.subRows,
        value = _ref8.value;
    return _react2.default.createElement(
      'span',
      null,
      value,
      ' ',
      subRows && '(' + subRows.length + ')'
    );
  },
  AggregatedComponent: function AggregatedComponent(_ref9) {
    var subRows = _ref9.subRows,
        column = _ref9.column;

    var previewValues = subRows.filter(function (d) {
      return typeof d[column.id] !== 'undefined';
    }).map(function (row, i) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        _react2.default.createElement(
          'span',
          { key: i },
          row[column.id],
          i < subRows.length - 1 ? ', ' : ''
        )
      );
    });
    return _react2.default.createElement(
      'span',
      null,
      previewValues
    );
  },
  PivotComponent: undefined, // this is a computed default generated using
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: _pagination2.default,
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref10) {
    var className = _ref10.className,
        loading = _ref10.loading,
        loadingText = _ref10.loadingText,
        rest = _objectWithoutProperties(_ref10, ['className', 'loading', 'loadingText']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('-loading', { '-active': loading }, className) }, rest),
      _react2.default.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: _utils2.default.makeTemplateComponent('rt-noData', 'NoData'),
  ResizerComponent: _utils2.default.makeTemplateComponent('rt-resizer', 'Resizer'),
  PadRowComponent: function PadRowComponent() {
    return _react2.default.createElement(
      'span',
      null,
      '\xA0'
    );
  },

  // Low level customization
  functionalRowRendering: false
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0UHJvcHMuanMiXSwibmFtZXMiOlsiZW1wdHlPYmoiLCJkYXRhIiwicmVzb2x2ZURhdGEiLCJsb2FkaW5nIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlIiwiZGVmYXVsdFBhZ2VTaXplIiwic2hvd1BhZ2VKdW1wIiwiY29sbGFwc2VPblNvcnRpbmdDaGFuZ2UiLCJjb2xsYXBzZU9uUGFnZUNoYW5nZSIsImNvbGxhcHNlT25EYXRhQ2hhbmdlIiwiZnJlZXplV2hlbkV4cGFuZGVkIiwic29ydGFibGUiLCJtdWx0aVNvcnQiLCJyZXNpemFibGUiLCJmaWx0ZXJhYmxlIiwiZGVmYXVsdFNvcnREZXNjIiwiZGVmYXVsdFNvcnRlZCIsImRlZmF1bHRGaWx0ZXJlZCIsImRlZmF1bHRSZXNpemVkIiwiZGVmYXVsdEV4cGFuZGVkIiwiZGVmYXVsdEZpbHRlck1ldGhvZCIsImZpbHRlciIsInJvdyIsImNvbHVtbiIsImlkIiwicGl2b3RJZCIsInVuZGVmaW5lZCIsIlN0cmluZyIsInN0YXJ0c1dpdGgiLCJ2YWx1ZSIsImRlZmF1bHRTb3J0TWV0aG9kIiwiYSIsImIiLCJkZXNjIiwidG9Mb3dlckNhc2UiLCJvblBhZ2VDaGFuZ2UiLCJvblBhZ2VTaXplQ2hhbmdlIiwib25Tb3J0ZWRDaGFuZ2UiLCJvbkZpbHRlcmVkQ2hhbmdlIiwib25SZXNpemVkQ2hhbmdlIiwib25FeHBhbmRlZENoYW5nZSIsInBpdm90QnkiLCJwaXZvdFZhbEtleSIsInBpdm90SURLZXkiLCJzdWJSb3dzS2V5IiwiYWdncmVnYXRlZEtleSIsIm5lc3RpbmdMZXZlbEtleSIsIm9yaWdpbmFsS2V5IiwiaW5kZXhLZXkiLCJncm91cGVkQnlQaXZvdEtleSIsIm9uRmV0Y2hEYXRhIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJnZXRQcm9wcyIsImdldFRhYmxlUHJvcHMiLCJnZXRUaGVhZEdyb3VwUHJvcHMiLCJnZXRUaGVhZEdyb3VwVHJQcm9wcyIsImdldFRoZWFkR3JvdXBUaFByb3BzIiwiZ2V0VGhlYWRQcm9wcyIsImdldFRoZWFkVHJQcm9wcyIsImdldFRoZWFkVGhQcm9wcyIsImdldFRoZWFkRmlsdGVyUHJvcHMiLCJnZXRUaGVhZEZpbHRlclRyUHJvcHMiLCJnZXRUaGVhZEZpbHRlclRoUHJvcHMiLCJnZXRUYm9keVByb3BzIiwiZ2V0VHJHcm91cFByb3BzIiwiZ2V0VHJQcm9wcyIsImdldFRkUHJvcHMiLCJnZXRUZm9vdFByb3BzIiwiZ2V0VGZvb3RUclByb3BzIiwiZ2V0VGZvb3RUZFByb3BzIiwiZ2V0UGFnaW5hdGlvblByb3BzIiwiZ2V0TG9hZGluZ1Byb3BzIiwiZ2V0Tm9EYXRhUHJvcHMiLCJnZXRSZXNpemVyUHJvcHMiLCJDZWxsIiwiSGVhZGVyIiwiRm9vdGVyIiwiQWdncmVnYXRlZCIsIlBpdm90IiwiUGl2b3RWYWx1ZSIsIkV4cGFuZGVyIiwiRmlsdGVyIiwiUGxhY2Vob2xkZXIiLCJzaG93IiwibWluV2lkdGgiLCJtaW5SZXNpemVXaWR0aCIsImFnZ3JlZ2F0ZSIsImhlYWRlckNsYXNzTmFtZSIsImhlYWRlclN0eWxlIiwiZ2V0SGVhZGVyUHJvcHMiLCJmb290ZXJDbGFzc05hbWUiLCJmb290ZXJTdHlsZSIsImdldEZvb3RlclByb3BzIiwiZmlsdGVyTWV0aG9kIiwiZmlsdGVyQWxsIiwic29ydE1ldGhvZCIsImV4cGFuZGVyRGVmYXVsdHMiLCJ3aWR0aCIsInBpdm90RGVmYXVsdHMiLCJwcmV2aW91c1RleHQiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJwYWdlSnVtcFRleHQiLCJyb3dzU2VsZWN0b3JUZXh0IiwiVGFibGVDb21wb25lbnQiLCJjaGlsZHJlbiIsInJlc3QiLCJUaGVhZENvbXBvbmVudCIsIl8iLCJtYWtlVGVtcGxhdGVDb21wb25lbnQiLCJUYm9keUNvbXBvbmVudCIsIlRyR3JvdXBDb21wb25lbnQiLCJUckNvbXBvbmVudCIsIlRoQ29tcG9uZW50IiwidG9nZ2xlU29ydCIsImUiLCJUZENvbXBvbmVudCIsIlRmb290Q29tcG9uZW50IiwiRmlsdGVyQ29tcG9uZW50Iiwib25DaGFuZ2UiLCJldmVudCIsInRhcmdldCIsIkV4cGFuZGVyQ29tcG9uZW50IiwiaXNFeHBhbmRlZCIsIlBpdm90VmFsdWVDb21wb25lbnQiLCJzdWJSb3dzIiwibGVuZ3RoIiwiQWdncmVnYXRlZENvbXBvbmVudCIsInByZXZpZXdWYWx1ZXMiLCJkIiwibWFwIiwiaSIsIlBpdm90Q29tcG9uZW50IiwiUGFnaW5hdGlvbkNvbXBvbmVudCIsIlBhZ2luYXRpb24iLCJQcmV2aW91c0NvbXBvbmVudCIsIk5leHRDb21wb25lbnQiLCJMb2FkaW5nQ29tcG9uZW50IiwiTm9EYXRhQ29tcG9uZW50IiwiUmVzaXplckNvbXBvbmVudCIsIlBhZFJvd0NvbXBvbmVudCIsImZ1bmN0aW9uYWxSb3dSZW5kZXJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7QUFGQTs7O0FBSUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTyxFQUFQO0FBQUEsQ0FBakI7O2tCQUVlO0FBQ2I7QUFDQUMsUUFBTSxFQUZPO0FBR2JDLGVBQWEscUJBQUNELElBQUQ7QUFBQSxXQUFVQSxJQUFWO0FBQUEsR0FIQTtBQUliRSxXQUFTLEtBSkk7QUFLYkMsa0JBQWdCLElBTEg7QUFNYkMscUJBQW1CLEtBTk47QUFPYkMsd0JBQXNCLElBUFQ7QUFRYkMsdUJBQXFCLElBUlI7QUFTYkMsbUJBQWlCLENBQUUsQ0FBRixFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixFQUFpQixFQUFqQixFQUFxQixHQUFyQixDQVRKO0FBVWJDLGVBQWEsQ0FWQTtBQVdiQyxtQkFBaUIsRUFYSjtBQVliQyxnQkFBYyxJ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ZCxVQUFjQSxPQUFkO0FBQUEsUUFBdUJ3RyxXQUF2QixVQUF1QkEsV0FBdkI7QUFBQSxRQUF1Q1MsSUFBdkM7O0FBQUEsV0FDaEI7QUFBQTtBQUFBLGlCQUFLLFdBQVcsMEJBQVcsVUFBWCxFQUF1QixFQUFFLFdBQVdqSCxPQUFiLEVBQXZCLEVBQStDcUQsU0FBL0MsQ0FBaEIsSUFBK0U0RCxJQUEvRTtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0JBQWY7QUFBaUNUO0FBQWpDO0FBREYsS0FEZ0I7QUFBQSxHQXJQTDtBQTBQYnlDLG1CQUFpQjlCLGdCQUFFQyxxQkFBRixDQUF3QixXQUF4QixFQUFxQyxRQUFyQyxDQTFQSjtBQTJQYjhCLG9CQUFrQi9CLGdCQUFFQyxxQkFBRixDQUF3QixZQUF4QixFQUFzQyxTQUF0QyxDQTNQTDtBQTRQYitCLG1CQUFpQjtBQUFBLFdBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFOO0FBQUEsR0E1UEo7O0FBOFBiO0FBQ0FDLDBCQUF3QjtBQS9QWCxDIiwiZmlsZSI6ImRlZmF1bHRQcm9wcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcclxuLy9cclxuaW1wb3J0IF8gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJ1xyXG5cclxuY29uc3QgZW1wdHlPYmogPSAoKSA9PiAoe30pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLy8gR2VuZXJhbFxyXG4gIGRhdGE6IFtdLFxyXG4gIHJlc29sdmVEYXRhOiAoZGF0YSkgPT4gZGF0YSxcclxuICBsb2FkaW5nOiBmYWxzZSxcclxuICBzaG93UGFnaW5hdGlvbjogdHJ1ZSxcclxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXHJcbiAgc2hvd1BhZ2luYXRpb25Cb3R0b206IHRydWUsXHJcbiAgc2hvd1BhZ2VTaXplT3B0aW9uczogdHJ1ZSxcclxuICBwYWdlU2l6ZU9wdGlvbnM6IFsgNSwgMTAsIDIwLCAyNSwgNTAsIDEwMCBdLFxyXG4gIGRlZmF1bHRQYWdlOiAwLFxyXG4gIGRlZmF1bHRQYWdlU2l6ZTogMjAsXHJcbiAgc2hvd1BhZ2VKdW1wOiB0cnVlLFxyXG4gIGNvbGxhcHNlT25Tb3J0aW5nQ2hhbmdlOiB0cnVlLFxyXG4gIGNvbGxhcHNlT25QYWdlQ2hhbmdlOiB0cnVlLFxyXG4gIGNvbGxhcHNlT25EYXRhQ2hhbmdlOiB0cnVlLFxyXG4gIGZyZWV6ZVdoZW5FeHBhbmRlZDogZmFsc2UsXHJcbiAgc29ydGFibGU6IHRydWUsXHJcbiAgbXVsdGlTb3J0OiB0cnVlLFxyXG4gIHJlc2l6YWJsZTogdHJ1ZSxcclxuICBmaWx0ZXJhYmxlOiBmYWxzZSxcclxuICBkZWZhdWx0U29ydERlc2M6IGZhbHNlLFxyXG4gIGRlZmF1bHRTb3J0ZWQ6IFtdLFxyXG4gIGRlZmF1bHRGaWx0ZXJlZDogW10sXHJcbiAgZGVmYXVsdFJlc2l6ZWQ6IFtdLFxyXG4gIGRlZmF1bHRFeHBhbmRlZDoge30sXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgZGVmYXVsdEZpbHRlck1ldGhvZDogKGZpbHRlciwgcm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGlkID0gZmlsdGVyLnBpdm90SWQgfHwgZmlsdGVyLmlkXHJcbiAgICByZXR1cm4gcm93W2lkXSAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKHJvd1tpZF0pLnN0YXJ0c1dpdGgoZmlsdGVyLnZhbHVlKSA6IHRydWVcclxuICB9LFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gIGRlZmF1bHRTb3J0TWV0aG9kOiAoYSwgYiwgZGVzYykgPT4ge1xyXG4gICAgLy8gZm9yY2UgbnVsbCBhbmQgdW5kZWZpbmVkIHRvIHRoZSBib3R0b21cclxuICAgIGEgPSBhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCA/ICcnIDogYVxyXG4gICAgYiA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gJycgOiBiXHJcbiAgICAvLyBmb3JjZSBhbnkgc3RyaW5nIHZhbHVlcyB0byBsb3dlcmNhc2VcclxuICAgIGEgPSB0eXBlb2YgYSA9PT0gJ3N0cmluZycgPyBhLnRvTG93ZXJDYXNlKCkgOiBhXHJcbiAgICBiID0gdHlwZW9mIGIgPT09ICdzdHJpbmcnID8gYi50b0xvd2VyQ2FzZSgpIDogYlxyXG4gICAgLy8gUmV0dXJuIGVpdGhlciAxIG9yIC0xIHRvIGluZGljYXRlIGEgc29ydCBwcmlvcml0eVxyXG4gICAgaWYgKGEgPiBiKSB7XHJcbiAgICAgIHJldHVybiAxXHJcbiAgICB9XHJcbiAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm5pbmcgMCwgdW5kZWZpbmVkIG9yIGFueSBmYWxzZXkgdmFsdWUgd2lsbCB1c2Ugc3Vic2VxdWVudCBzb3J0cyBvclxyXG4gICAgLy8gdGhlIGluZGV4IGFzIGEgdGllYnJlYWtlclxyXG4gICAgcmV0dXJuIDBcclxuICB9LFxyXG5cclxuICAvLyBDb250cm9sbGVkIFN0YXRlIFByb3BzXHJcbiAgLy8gcGFnZTogdW5kZWZpbmVkLFxyXG4gIC8vIHBhZ2VTaXplOiB1bmRlZmluZWQsXHJcbiAgLy8gc29ydGVkOiBbXSxcclxuICAvLyBmaWx0ZXJlZDogW10sXHJcbiAgLy8gcmVzaXplZDogW10sXHJcbiAgLy8gZXhwYW5kZWQ6IHt9LFxyXG5cclxuICAvLyBDb250cm9sbGVkIFN0YXRlIENhbGxiYWNrc1xyXG4gIG9uUGFnZUNoYW5nZTogdW5kZWZpbmVkLFxyXG4gIG9uUGFnZVNpemVDaGFuZ2U6IHVuZGVmaW5lZCxcclxuICBvblNvcnRlZENoYW5nZTogdW5kZWZpbmVkLFxyXG4gIG9uRmlsdGVyZWRDaGFuZ2U6IHVuZGVmaW5lZCxcclxuICBvblJlc2l6ZWRDaGFuZ2U6IHVuZGVmaW5lZCxcclxuICBvbkV4cGFuZGVkQ2hhbmdlOiB1bmRlZmluZWQsXHJcblxyXG4gIC8vIFBpdm90aW5nXHJcbiAgcGl2b3RCeTogdW5kZWZpbmVkLFxyXG5cclxuICAvLyBLZXkgQ29uc3RhbnRzXHJcbiAgcGl2b3RWYWxLZXk6ICdfcGl2b3RWYWwnLFxyXG4gIHBpdm90SURLZXk6ICdfcGl2b3RJRCcsXHJcbiAgc3ViUm93c0tleTogJ19zdWJSb3dzJyxcclxuICBhZ2dyZWdhdGVkS2V5OiAnX2FnZ3JlZ2F0ZWQnLFxyXG4gIG5lc3RpbmdMZXZlbEtleTogJ19uZXN0aW5nTGV2ZWwnLFxyXG4gIG9yaWdpbmFsS2V5OiAnX29yaWdpbmFsJyxcclxuICBpbmRleEtleTogJ19pbmRleCcsXHJcbiAgZ3JvdXBlZEJ5UGl2b3RLZXk6ICdfZ3JvdXBlZEJ5UGl2b3QnLFxyXG5cclxuICAvLyBTZXJ2ZXItc2lkZSBDYWxsYmFja3NcclxuICBvbkZldGNoRGF0YTogKCkgPT4gbnVsbCxcclxuXHJcbiAgLy8gQ2xhc3Nlc1xyXG4gIGNsYXNzTmFtZTogJycsXHJcbiAgc3R5bGU6IHt9LFxyXG5cclxuICAvLyBDb21wb25lbnQgZGVjb3JhdG9yc1xyXG4gIGdldFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUYWJsZVByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZEdyb3VwUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkR3JvdXBUclByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZEdyb3VwVGhQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRUclByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZFRoUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkRmlsdGVyUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkRmlsdGVyVHJQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRGaWx0ZXJUaFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUYm9keVByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUckdyb3VwUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRyUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRkUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRmb290UHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRmb290VHJQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGZvb3RUZFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRQYWdpbmF0aW9uUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldExvYWRpbmdQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0Tm9EYXRhUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFJlc2l6ZXJQcm9wczogZW1wdHlPYmosXHJcblxyXG4gIC8vIEdsb2JhbCBDb2x1bW4gRGVmYXVsdHNcclxuICBjb2x1bW46IHtcclxuICAgIC8vIFJlbmRlcmVyc1xyXG4gICAgQ2VsbDogdW5kZWZpbmVkLFxyXG4gICAgSGVhZGVyOiB1bmRlZmluZWQsXHJcbiAgICBGb290ZXI6IHVuZGVmaW5lZCxcclxuICAgIEFnZ3JlZ2F0ZWQ6IHVuZGVmaW5lZCxcclxuICAgIFBpdm90OiB1bmRlZmluZWQsXHJcbiAgICBQaXZvdFZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICBFeHBhbmRlcjogdW5kZWZpbmVkLFxyXG4gICAgRmlsdGVyOiB1bmRlZmluZWQsXHJcbiAgICBQbGFjZWhvbGRlcjogdW5kZWZpbmVkLFxyXG4gICAgLy8gQWxsIENvbHVtbnNcclxuICAgIHNvcnRhYmxlOiB1bmRlZmluZWQsIC8vIHVzZSB0YWJsZSBkZWZhdWx0XHJcbiAgICByZXNpemFibGU6IHVuZGVmaW5lZCwgLy8gdXNlIHRhYmxlIGRlZmF1bHRcclxuICAgIGZpbHRlcmFibGU6IHVuZGVmaW5lZCwgLy8gdXNlIHRhYmxlIGRlZmF1bHRcclxuICAgIHNob3c6IHRydWUsXHJcbiAgICBtaW5XaWR0aDogMTAwLFxyXG4gICAgbWluUmVzaXplV2lkdGg6IDExLFxyXG4gICAgLy8gQ2VsbHMgb25seVxyXG4gICAgY2xhc3NOYW1lOiAnJyxcclxuICAgIHN0eWxlOiB7fSxcclxuICAgIGdldFByb3BzOiBlbXB0eU9iaixcclxuICAgIC8vIFBpdm90IG9ubHlcclxuICAgIGFnZ3JlZ2F0ZTogdW5kZWZpbmVkLFxyXG4gICAgLy8gSGVhZGVycyBvbmx5XHJcbiAgICBoZWFkZXJDbGFzc05hbWU6ICcnLFxyXG4gICAgaGVhZGVyU3R5bGU6IHt9LFxyXG4gICAgZ2V0SGVhZGVyUHJvcHM6IGVtcHR5T2JqLFxyXG4gICAgLy8gRm9vdGVycyBvbmx5XHJcbiAgICBmb290ZXJDbGFzc05hbWU6ICcnLFxyXG4gICAgZm9vdGVyU3R5bGU6IHt9LFxyXG4gICAgZ2V0Rm9vdGVyUHJvcHM6IGVtcHR5T2JqLFxyXG4gICAgZmlsdGVyTWV0aG9kOiB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXJBbGw6IGZhbHNlLFxyXG4gICAgc29ydE1ldGhvZDogdW5kZWZpbmVkLFxyXG4gIH0sXHJcblxyXG4gIC8vIEdsb2JhbCBFeHBhbmRlciBDb2x1bW4gRGVmYXVsdHNcclxuICBleHBhbmRlckRlZmF1bHRzOiB7XHJcbiAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgZmlsdGVyYWJsZTogZmFsc2UsXHJcbiAgICB3aWR0aDogMzUsXHJcbiAgfSxcclxuXHJcbiAgcGl2b3REZWZhdWx0czoge1xyXG4gICAgLy8gZXh0ZW5kIHRoZSBkZWZhdWx0cyBmb3IgcGl2b3RlZCBjb2x1bW5zIGhlcmVcclxuICB9LFxyXG5cclxuICAvLyBUZXh0XHJcbiAgcHJldmlvdXNUZXh0OiAnUHJldmlvdXMnLFxyXG4gIG5leHRUZXh0OiAnTmV4dCcsXHJcbiAgbG9hZGluZ1RleHQ6ICdMb2FkaW5nLi4uJyxcclxuICBub0RhdGFUZXh0OiAnTm8gcm93cyBmb3VuZCcsXHJcbiAgcGFnZVRleHQ6ICdQYWdlJyxcclxuICBvZlRleHQ6ICdvZicsXHJcbiAgcm93c1RleHQ6ICdyb3dzJyxcclxuICBwYWdlSnVtcFRleHQ6ICdqdW1wIHRvIHBhZ2UnLFxyXG4gIHJvd3NTZWxlY3RvclRleHQ6ICdyb3dzIHBlciBwYWdlJyxcclxuXHJcbiAgLy8gQ29tcG9uZW50c1xyXG4gIFRhYmxlQ29tcG9uZW50OiAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0pID0+IChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC10YWJsZScsIGNsYXNzTmFtZSl9XHJcbiAgICAgIHJvbGU9XCJncmlkXCJcclxuICAgICAgLy8gdGFiSW5kZXg9JzAnXHJcbiAgICAgIHsuLi5yZXN0fVxyXG4gICAgPlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L2Rpdj5cclxuICApLFxyXG4gIFRoZWFkQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGhlYWQnLCAnVGhlYWQnKSxcclxuICBUYm9keUNvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRib2R5JywgJ1Rib2R5JyksXHJcbiAgVHJHcm91cENvbXBvbmVudDogKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgLi4ucmVzdCB9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdHItZ3JvdXAnLCBjbGFzc05hbWUpfSByb2xlPVwicm93Z3JvdXBcIiB7Li4ucmVzdH0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICksXHJcbiAgVHJDb21wb25lbnQ6ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRyJywgY2xhc3NOYW1lKX0gcm9sZT1cInJvd1wiIHsuLi5yZXN0fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9kaXY+XHJcbiAgKSxcclxuICBUaENvbXBvbmVudDogKHsgdG9nZ2xlU29ydCwgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ucmVzdCB9KSA9PiAoXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50c1xyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRoJywgY2xhc3NOYW1lKX1cclxuICAgICAgb25DbGljaz17KGUpID0+IHRvZ2dsZVNvcnQgJiYgdG9nZ2xlU29ydChlKX1cclxuICAgICAgcm9sZT1cImNvbHVtbmhlYWRlclwiXHJcbiAgICAgIHRhYkluZGV4PVwiLTFcIiAvLyBSZXNvbHZlcyBlc2xpbnQgaXNzdWVzIHdpdGhvdXQgaW1wbGVtZW50aW5nIGtleWJvYXJkIG5hdmlnYXRpb24gaW5jb3JyZWN0bHlcclxuICAgICAgey4uLnJlc3R9XHJcbiAgICA+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICksXHJcbiAgVGRDb21wb25lbnQ6ICh7IHRvZ2dsZVNvcnQsIGNsYXNzTmFtZSwgY2hpbGRyZW4sIC4uLnJlc3QgfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRkJywgY2xhc3NOYW1lKX0gcm9sZT1cImdyaWRjZWxsXCIgey4uLnJlc3R9PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L2Rpdj5cclxuICApLFxyXG4gIFRmb290Q29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGZvb3QnLCAnVGZvb3QnKSxcclxuICBGaWx0ZXJDb21wb25lbnQ6ICh7IGZpbHRlciwgb25DaGFuZ2UsIGNvbHVtbiB9KSA9PiAoXHJcbiAgICA8aW5wdXRcclxuICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgIH19XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtjb2x1bW4uUGxhY2Vob2xkZXJ9XHJcbiAgICAgIHZhbHVlPXtmaWx0ZXIgPyBmaWx0ZXIudmFsdWUgOiAnJ31cclxuICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cclxuICAgIC8+XHJcbiAgKSxcclxuICBFeHBhbmRlckNvbXBvbmVudDogKHsgaXNFeHBhbmRlZCB9KSA9PiA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtZXhwYW5kZXInLCBpc0V4cGFuZGVkICYmICctb3BlbicpfT4mYnVsbDs8L2Rpdj4sXHJcbiAgUGl2b3RWYWx1ZUNvbXBvbmVudDogKHsgc3ViUm93cywgdmFsdWUgfSkgPT4gKFxyXG4gICAgPHNwYW4+XHJcbiAgICAgIHt2YWx1ZX0ge3N1YlJvd3MgJiYgYCgke3N1YlJvd3MubGVuZ3RofSlgfVxyXG4gICAgPC9zcGFuPlxyXG4gICksXHJcbiAgQWdncmVnYXRlZENvbXBvbmVudDogKHsgc3ViUm93cywgY29sdW1uIH0pID0+IHtcclxuICAgIGNvbnN0IHByZXZpZXdWYWx1ZXMgPSBzdWJSb3dzLmZpbHRlcigoZCkgPT4gdHlwZW9mIGRbY29sdW1uLmlkXSAhPT0gJ3VuZGVmaW5lZCcpLm1hcCgocm93LCBpKSA9PiAoXHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcclxuICAgICAgPHNwYW4ga2V5PXtpfT5cclxuICAgICAgICB7cm93W2NvbHVtbi5pZF19XHJcbiAgICAgICAge2kgPCBzdWJSb3dzLmxlbmd0aCAtIDEgPyAnLCAnIDogJyd9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICkpXHJcbiAgICByZXR1cm4gPHNwYW4+e3ByZXZpZXdWYWx1ZXN9PC9zcGFuPlxyXG4gIH0sXHJcbiAgUGl2b3RDb21wb25lbnQ6IHVuZGVmaW5lZCwgLy8gdGhpcyBpcyBhIGNvbXB1dGVkIGRlZmF1bHQgZ2VuZXJhdGVkIHVzaW5nXHJcbiAgLy8gdGhlIEV4cGFuZGVyQ29tcG9uZW50IGFuZCBQaXZvdFZhbHVlQ29tcG9uZW50IGF0IHJ1bi10aW1lIGluIG1ldGhvZHMuanNcclxuICBQYWdpbmF0aW9uQ29tcG9uZW50OiBQYWdpbmF0aW9uLFxyXG4gIFByZXZpb3VzQ29tcG9uZW50OiB1bmRlZmluZWQsXHJcbiAgTmV4dENvbXBvbmVudDogdW5kZWZpbmVkLFxyXG4gIExvYWRpbmdDb21wb25lbnQ6ICh7IGNsYXNzTmFtZSwgbG9hZGluZywgbG9hZGluZ1RleHQsIC4uLnJlc3QgfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1sb2FkaW5nJywgeyAnLWFjdGl2ZSc6IGxvYWRpbmcgfSwgY2xhc3NOYW1lKX0gey4uLnJlc3R9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1sb2FkaW5nLWlubmVyXCI+e2xvYWRpbmdUZXh0fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKSxcclxuICBOb0RhdGFDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC1ub0RhdGEnLCAnTm9EYXRhJyksXHJcbiAgUmVzaXplckNvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXJlc2l6ZXInLCAnUmVzaXplcicpLFxyXG4gIFBhZFJvd0NvbXBvbmVudDogKCkgPT4gPHNwYW4+Jm5ic3A7PC9zcGFuPixcclxuXHJcbiAgLy8gTG93IGxldmVsIGN1c3RvbWl6YXRpb25cclxuICBmdW5jdGlvbmFsUm93UmVuZGVyaW5nOiBmYWxzZSxcclxufVxyXG4iXX0=