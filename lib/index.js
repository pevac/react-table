'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactTableDefaults = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _lifecycle = require('./lifecycle');

var _lifecycle2 = _interopRequireDefault(_lifecycle);

var _methods = require('./methods');

var _methods2 = _interopRequireDefault(_methods);

var _defaultProps = require('./defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

var _propTypes = require('./propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var ReactTableDefaults = exports.ReactTableDefaults = _defaultProps2.default;

var ReactTable = function (_Methods) {
  _inherits(ReactTable, _Methods);

  function ReactTable(props) {
    _classCallCheck(this, ReactTable);

    var _this = _possibleConstructorReturn(this, (ReactTable.__proto__ || Object.getPrototypeOf(ReactTable)).call(this));

    _this.getResolvedState = _this.getResolvedState.bind(_this);
    _this.getDataModel = _this.getDataModel.bind(_this);
    _this.getSortedData = _this.getSortedData.bind(_this);
    _this.fireFetchData = _this.fireFetchData.bind(_this);
    _this.getPropOrState = _this.getPropOrState.bind(_this);
    _this.getStateOrProp = _this.getStateOrProp.bind(_this);
    _this.filterData = _this.filterData.bind(_this);
    _this.sortData = _this.sortData.bind(_this);
    _this.getMinRows = _this.getMinRows.bind(_this);
    _this.onPageChange = _this.onPageChange.bind(_this);
    _this.onPageSizeChange = _this.onPageSizeChange.bind(_this);
    _this.sortColumn = _this.sortColumn.bind(_this);
    _this.filterColumn = _this.filterColumn.bind(_this);
    _this.resizeColumnStart = _this.resizeColumnStart.bind(_this);
    _this.resizeColumnEnd = _this.resizeColumnEnd.bind(_this);
    _this.resizeColumnMoving = _this.resizeColumnMoving.bind(_this);

    _this.state = {
      page: props.defaultPage,
      pageSize: props.defaultPageSize,
      sorted: props.defaultSorted,
      expanded: props.defaultExpanded,
      filtered: props.defaultFiltered,
      resized: props.defaultResized,
      currentlyResizing: false,
      skipNextSort: false
    };
    return _this;
  }

  _createClass(ReactTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var resolvedState = this.getResolvedState();
      var children = resolvedState.children,
          className = resolvedState.className,
          style = resolvedState.style,
          getProps = resolvedState.getProps,
          getTableProps = resolvedState.getTableProps,
          getTheadGroupProps = resolvedState.getTheadGroupProps,
          getTheadGroupTrProps = resolvedState.getTheadGroupTrProps,
          getTheadGroupThProps = resolvedState.getTheadGroupThProps,
          getTheadProps = resolvedState.getTheadProps,
          getTheadTrProps = resolvedState.getTheadTrProps,
          getTheadThProps = resolvedState.getTheadThProps,
          getTheadFilterProps = resolvedState.getTheadFilterProps,
          getTheadFilterTrProps = resolvedState.getTheadFilterTrProps,
          getTheadFilterThProps = resolvedState.getTheadFilterThProps,
          getTbodyProps = resolvedState.getTbodyProps,
          getTrGroupProps = resolvedState.getTrGroupProps,
          getTrProps = resolvedState.getTrProps,
          getTdProps = resolvedState.getTdProps,
          getTfootProps = resolvedState.getTfootProps,
          getTfootTrProps = resolvedState.getTfootTrProps,
          getTfootTdProps = resolvedState.getTfootTdProps,
          getPaginationProps = resolvedState.getPaginationProps,
          getLoadingProps = resolvedState.getLoadingProps,
          getNoDataProps = resolvedState.getNoDataProps,
          getResizerProps = resolvedState.getResizerProps,
          showPagination = resolvedState.showPagination,
          showPaginationTop = resolvedState.showPaginationTop,
          showPaginationBottom = resolvedState.showPaginationBottom,
          manual = resolvedState.manual,
          loadingText = resolvedState.loadingText,
          noDataText = resolvedState.noDataText,
          sortable = resolvedState.sortable,
          multiSort = resolvedState.multiSort,
          resizable = resolvedState.resizable,
          filterable = resolvedState.filterable,
          pivotIDKey = resolvedState.pivotIDKey,
          pivotValKey = resolvedState.pivotValKey,
          pivotBy = resolvedState.pivotBy,
          subRowsKey = resolvedState.subRowsKey,
          aggregatedKey = resolvedState.aggregatedKey,
          originalKey = resolvedState.originalKey,
          indexKey = resolvedState.indexKey,
          groupedByPivotKey = resolvedState.groupedByPivotKey,
          loading = resolvedState.loading,
          pageSize = resolvedState.pageSize,
          page = resolvedState.page,
          sorted = resolvedState.sorted,
          filtered = resolvedState.filtered,
          resized = resolvedState.resized,
          expanded = resolvedState.expanded,
          pages = resolvedState.pages,
          onExpandedChange = resolvedState.onExpandedChange,
          TableComponent = resolvedState.TableComponent,
          TheadComponent = resolvedState.TheadComponent,
          TbodyComponent = resolvedState.TbodyComponent,
          TrGroupComponent = resolvedState.TrGroupComponent,
          TrComponent = resolvedState.TrComponent,
          ThComponent = resolvedState.ThComponent,
          TdComponent = resolvedState.TdComponent,
          TfootComponent = resolvedState.TfootComponent,
          PaginationComponent = resolvedState.PaginationComponent,
          LoadingComponent = resolvedState.LoadingComponent,
          SubComponent = resolvedState.SubComponent,
          NoDataComponent = resolvedState.NoDataComponent,
          ResizerComponent = resolvedState.ResizerComponent,
          ExpanderComponent = resolvedState.ExpanderComponent,
          PivotValueComponent = resolvedState.PivotValueComponent,
          PivotComponent = resolvedState.PivotComponent,
          AggregatedComponent = resolvedState.AggregatedComponent,
          FilterComponent = resolvedState.FilterComponent,
          PadRowComponent = resolvedState.PadRowComponent,
          resolvedData = resolvedState.resolvedData,
          visibleColumns = resolvedState.visibleColumns,
          headerGroups = resolvedState.headerGroups,
          hasHeaderGroups = resolvedState.hasHeaderGroups,
          sortedData = resolvedState.sortedData,
          currentlyResizing = resolvedState.currentlyResizing,
          functionalRowRendering = resolvedState.functionalRowRendering;

      // Pagination

      var startRow = pageSize * page;
      var endRow = startRow + pageSize;
      var pageRows = manual ? resolvedData : sortedData.slice(startRow, endRow);
      var minRows = this.getMinRows();
      var padRows = _utils2.default.range(Math.max(minRows - pageRows.length, 0));

      var hasColumnFooter = visibleColumns.some(function (d) {
        return d.Footer;
      });
      var hasFilters = filterable || visibleColumns.some(function (d) {
        return d.filterable;
      });

      var recurseRowsViewIndex = function recurseRowsViewIndex(rows) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
        return [rows.map(function (row, i) {
          index += 1;
          var rowWithViewIndex = _extends({}, row, {
            _viewIndex: index
          });
          var newPath = path.concat([i]);
          if (rowWithViewIndex[subRowsKey] && _utils2.default.get(expanded, newPath)) {
            ;
            var _recurseRowsViewIndex = recurseRowsViewIndex(rowWithViewIndex[subRowsKey], newPath, index);

            var _recurseRowsViewIndex2 = _slicedToArray(_recurseRowsViewIndex, 2);

            rowWithViewIndex[subRowsKey] = _recurseRowsViewIndex2[0];
            index = _recurseRowsViewIndex2[1];
          }
          return rowWithViewIndex;
        }), index];
      };
      var _recurseRowsViewIndex3 = recurseRowsViewIndex(pageRows);

      var _recurseRowsViewIndex4 = _slicedToArray(_recurseRowsViewIndex3, 1);

      pageRows = _recurseRowsViewIndex4[0];


      var canPrevious = page > 0;
      var canNext = page + 1 < pages;

      var rowMinWidth = _utils2.default.sum(visibleColumns.map(function (d) {
        var resizedColumn = resized.find(function (x) {
          return x.id === d.id;
        }) || {};
        return _utils2.default.getFirstDefined(resizedColumn.value, d.width, d.minWidth);
      }));

      var rowIndex = -1;

      var finalState = _extends({}, resolvedState, {
        startRow: startRow,
        endRow: endRow,
        pageRows: pageRows,
        minRows: minRows,
        padRows: padRows,
        hasColumnFooter: hasColumnFooter,
        canPrevious: canPrevious,
        canNext: canNext,
        rowMinWidth: rowMinWidth
      });

      var rootProps = _utils2.default.splitProps(getProps(finalState, undefined, undefined, this));
      var tableProps = _utils2.default.splitProps(getTableProps(finalState, undefined, undefined, this));
      var tBodyProps = _utils2.default.splitProps(getTbodyProps(finalState, undefined, undefined, this));
      var loadingProps = getLoadingProps(finalState, undefined, undefined, this);
      var noDataProps = getNoDataProps(finalState, undefined, undefined, this);

      // Visual Components

      var makeHeaderGroup = function makeHeaderGroup(column, i) {
        var resizedValue = function resizedValue(col) {
          return (resized.find(function (x) {
            return x.id === col.id;
          }) || {}).value;
        };

        var leafColumns = _utils2.default.leaves(column, 'columns');
        var flex = _utils2.default.sum(leafColumns.map(function (col) {
          return col.width || resizedValue(col) ? 0 : col.minWidth;
        }));
        var width = _utils2.default.sum(leafColumns.map(function (col) {
          return _utils2.default.getFirstDefined(resizedValue(col), col.width, col.minWidth);
        }));
        var maxWidth = _utils2.default.sum(leafColumns.map(function (col) {
          return _utils2.default.getFirstDefined(resizedValue(col), col.width, col.maxWidth);
        }));

        var theadGroupThProps = _utils2.default.splitProps(getTheadGroupThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadGroupThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadGroupThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadGroupThProps.rest, columnHeaderProps.rest);

        var flexStyles = {
          flex: flex + ' 0 auto',
          width: _utils2.default.asPx(width),
          maxWidth: _utils2.default.asPx(maxWidth)
        };

        return _react2.default.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: (0, _classnames2.default)(classes),
            style: _extends({}, styles, flexStyles)
          }, rest),
          _utils2.default.normalizeComponent(column.Header, {
            data: sortedData,
            column: column
          })
        );
      };

      var makeHeaderGroups = function makeHeaderGroups(row, i) {
        var theadGroupProps = _utils2.default.splitProps(getTheadGroupProps(finalState, undefined, row, _this2));
        var theadGroupTrProps = _utils2.default.splitProps(getTheadGroupTrProps(finalState, undefined, row, _this2));
        return _react2.default.createElement(
          TheadComponent,
          _extends({
            key: i + '-' + row.id,
            className: (0, _classnames2.default)('-headerGroups', theadGroupProps.className),
            style: _extends({}, theadGroupProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, theadGroupProps.rest),
          _react2.default.createElement(
            TrComponent,
            _extends({
              className: theadGroupTrProps.className,
              style: theadGroupTrProps.style
            }, theadGroupTrProps.rest),
            row.map(makeHeaderGroup)
          )
        );
      };

      var makeHeader = function makeHeader(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var sort = sorted.find(function (d) {
          return d.id === column.id;
        });
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var theadThProps = _utils2.default.splitProps(getTheadThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadThProps.rest, columnHeaderProps.rest);

        var isResizable = _utils2.default.getFirstDefined(column.resizable, resizable, false);
        var resizer = isResizable ? _react2.default.createElement(ResizerComponent, _extends({
          onMouseDown: function onMouseDown(e) {
            return _this2.resizeColumnStart(e, column, false);
          },
          onTouchStart: function onTouchStart(e) {
            return _this2.resizeColumnStart(e, column, true);
          }
        }, getResizerProps('finalState', undefined, column, _this2))) : null;

        var isSortable = _utils2.default.getFirstDefined(column.sortable, sortable, false);

        return _react2.default.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: (0, _classnames2.default)(classes, isResizable && 'rt-resizable-header', sort ? sort.desc ? '-sort-desc' : '-sort-asc' : '', isSortable && '-cursor-pointer', !show && '-hidden', pivotBy && pivotBy.slice(0, -1).includes(column.id) && 'rt-header-pivot'),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: _utils2.default.asPx(width),
              maxWidth: _utils2.default.asPx(maxWidth)
            }),
            toggleSort: function toggleSort(e) {
              if (isSortable) _this2.sortColumn(column, multiSort ? e.shiftKey : false);
            }
          }, rest),
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(isResizable && 'rt-resizable-header-content') },
            _utils2.default.normalizeComponent(column.Header, {
              data: sortedData,
              column: column
            })
          ),
          resizer
        );
      };

      var makeHeaders = function makeHeaders() {
        var theadProps = _utils2.default.splitProps(getTheadProps(finalState, undefined, undefined, _this2));
        var theadTrProps = _utils2.default.splitProps(getTheadTrProps(finalState, undefined, undefined, _this2));
        return _react2.default.createElement(
          TheadComponent,
          _extends({
            className: (0, _classnames2.default)('-header', theadProps.className),
            style: _extends({}, theadProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, theadProps.rest),
          _react2.default.createElement(
            TrComponent,
            _extends({ className: theadTrProps.className, style: theadTrProps.style }, theadTrProps.rest),
            visibleColumns.map(makeHeader)
          )
        );
      };

      var makeFilter = function makeFilter(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var theadFilterThProps = _utils2.default.splitProps(getTheadFilterThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = _utils2.default.splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadFilterThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadFilterThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadFilterThProps.rest, columnHeaderProps.rest);

        var filter = filtered.find(function (filter) {
          return filter.id === column.id;
        });

        var ResolvedFilterComponent = column.Filter || FilterComponent;

        var isFilterable = _utils2.default.getFirstDefined(column.filterable, filterable, false);

        return _react2.default.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: (0, _classnames2.default)(classes),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: _utils2.default.asPx(width),
              maxWidth: _utils2.default.asPx(maxWidth)
            })
          }, rest),
          isFilterable ? _utils2.default.normalizeComponent(ResolvedFilterComponent, {
            column: column,
            filter: filter,
            onChange: function onChange(value) {
              return _this2.filterColumn(column, value);
            }
          }, _defaultProps2.default.column.Filter) : null
        );
      };

      var makeFilters = function makeFilters() {
        var theadFilterProps = _utils2.default.splitProps(getTheadFilterProps(finalState, undefined, undefined, _this2));
        var theadFilterTrProps = _utils2.default.splitProps(getTheadFilterTrProps(finalState, undefined, undefined, _this2));
        return _react2.default.createElement(
          TheadComponent,
          _extends({
            className: (0, _classnames2.default)('-filters', theadFilterProps.className),
            style: _extends({}, theadFilterProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, theadFilterProps.rest),
          _react2.default.createElement(
            TrComponent,
            _extends({
              className: theadFilterTrProps.className,
              style: theadFilterTrProps.style
            }, theadFilterTrProps.rest),
            visibleColumns.map(makeFilter)
          )
        );
      };

      var makePageRow = function makePageRow(row, i) {
        var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        var rowInfo = {
          original: row[originalKey],
          row: row,
          index: row[indexKey],
          viewIndex: rowIndex += 1,
          pageSize: pageSize,
          page: page,
          level: path.length,
          nestingPath: path.concat([i]),
          aggregated: row[aggregatedKey],
          groupedByPivot: row[groupedByPivotKey],
          subRows: row[subRowsKey]
        };
        var isExpanded = _utils2.default.get(expanded, rowInfo.nestingPath);
        var trGroupProps = getTrGroupProps(finalState, rowInfo, undefined, _this2);
        var trProps = _utils2.default.splitProps(getTrProps(finalState, rowInfo, undefined, _this2));
        return _react2.default.createElement(
          TrGroupComponent,
          _extends({ key: rowInfo.nestingPath.join('_') }, trGroupProps),
          _react2.default.createElement(
            TrComponent,
            _extends({
              className: (0, _classnames2.default)(trProps.className, row._viewIndex % 2 ? '-even' : '-odd'),
              style: trProps.style
            }, trProps.rest),
            visibleColumns.map(function (column, i2) {
              var resizedCol = resized.find(function (x) {
                return x.id === column.id;
              }) || {};
              var show = typeof column.show === 'function' ? column.show() : column.show;
              var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
              var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
              var tdProps = _utils2.default.splitProps(getTdProps(finalState, rowInfo, column, _this2));
              var columnProps = _utils2.default.splitProps(column.getProps(finalState, rowInfo, column, _this2));

              var classes = [tdProps.className, column.className, columnProps.className];

              var styles = _extends({}, tdProps.style, column.style, columnProps.style);

              var cellInfo = _extends({}, rowInfo, {
                isExpanded: isExpanded,
                column: _extends({}, column),
                value: rowInfo.row[column.id],
                pivoted: column.pivoted,
                expander: column.expander,
                resized: resized,
                show: show,
                width: width,
                maxWidth: maxWidth,
                tdProps: tdProps,
                columnProps: columnProps,
                classes: classes,
                styles: styles
              });

              var value = cellInfo.value;

              var useOnExpanderClick = void 0;
              var isBranch = void 0;
              var isPreview = void 0;

              var onExpanderClick = function onExpanderClick(e) {
                var newExpanded = _utils2.default.clone(expanded);
                if (isExpanded) {
                  newExpanded = _utils2.default.set(newExpanded, cellInfo.nestingPath, false);
                } else {
                  newExpanded = _utils2.default.set(newExpanded, cellInfo.nestingPath, {});
                }

                return _this2.setStateWithData({
                  expanded: newExpanded
                }, function () {
                  return onExpandedChange && onExpandedChange(newExpanded, cellInfo.nestingPath, e);
                });
              };

              // Default to a standard cell
              var resolvedCell = _utils2.default.normalizeComponent(column.Cell, cellInfo, value);

              // Resolve Renderers
              var ResolvedAggregatedComponent = column.Aggregated || (!column.aggregate ? AggregatedComponent : column.Cell);
              var ResolvedExpanderComponent = column.Expander || ExpanderComponent;
              var ResolvedPivotValueComponent = column.PivotValue || PivotValueComponent;
              var DefaultResolvedPivotComponent = PivotComponent || function (props) {
                return _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(ResolvedExpanderComponent, props),
                  _react2.default.createElement(ResolvedPivotValueComponent, props)
                );
              };
              var ResolvedPivotComponent = column.Pivot || DefaultResolvedPivotComponent;

              // Is this cell expandable?
              if (cellInfo.pivoted || cellInfo.expander) {
                // Make it expandable by defualt
                cellInfo.expandable = true;
                useOnExpanderClick = true;
                // If pivoted, has no subRows, and does not have a subComponent,
                // do not make expandable
                if (cellInfo.pivoted && !cellInfo.subRows && !SubComponent) {
                  cellInfo.expandable = false;
                }
              }

              if (cellInfo.pivoted) {
                // Is this column a branch?
                isBranch = rowInfo.row[pivotIDKey] === column.id && cellInfo.subRows;
                // Should this column be blank?
                isPreview = pivotBy.indexOf(column.id) > pivotBy.indexOf(rowInfo.row[pivotIDKey]) && cellInfo.subRows;
                // Pivot Cell Render Override
                if (isBranch) {
                  // isPivot
                  resolvedCell = _utils2.default.normalizeComponent(ResolvedPivotComponent, _extends({}, cellInfo, {
                    value: row[pivotValKey]
                  }), row[pivotValKey]);
                } else if (isPreview) {
                  // Show the pivot preview
                  resolvedCell = _utils2.default.normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
                } else {
                  resolvedCell = null;
                }
              } else if (cellInfo.aggregated) {
                resolvedCell = _utils2.default.normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
              }

              if (cellInfo.expander) {
                resolvedCell = _utils2.default.normalizeComponent(ResolvedExpanderComponent, cellInfo, row[pivotValKey]);
                if (pivotBy) {
                  if (cellInfo.groupedByPivot) {
                    resolvedCell = null;
                  }
                  if (!cellInfo.subRows && !SubComponent) {
                    resolvedCell = null;
                  }
                }
              }

              var resolvedOnExpanderClick = useOnExpanderClick ? onExpanderClick : function () {};

              // If there are multiple onClick events, make sure they don't
              // override eachother. This should maybe be expanded to handle all
              // function attributes
              var interactionProps = {
                onClick: resolvedOnExpanderClick
              };

              if (tdProps.rest.onClick) {
                interactionProps.onClick = function (e) {
                  tdProps.rest.onClick(e, function () {
                    return resolvedOnExpanderClick(e);
                  });
                };
              }

              if (columnProps.rest.onClick) {
                interactionProps.onClick = function (e) {
                  columnProps.rest.onClick(e, function () {
                    return resolvedOnExpanderClick(e);
                  });
                };
              }

              // Return the cell
              return _react2.default.createElement(
                TdComponent
                // eslint-disable-next-line react/no-array-index-key
                ,
                _extends({ key: i2 + '-' + column.id,
                  className: (0, _classnames2.default)(classes, !cellInfo.expandable && !show && 'hidden', cellInfo.expandable && 'rt-expandable', (isBranch || isPreview) && 'rt-pivot'),
                  style: _extends({}, styles, {
                    flex: width + ' 0 auto',
                    width: _utils2.default.asPx(width),
                    maxWidth: _utils2.default.asPx(maxWidth)
                  })
                }, tdProps.rest, columnProps.rest, interactionProps),
                resolvedCell
              );
            })
          ),
          rowInfo.subRows && isExpanded && !functionalRowRendering && rowInfo.subRows.map(function (d, i) {
            return makePageRow(d, i, rowInfo.nestingPath);
          }),
          SubComponent && !rowInfo.subRows && isExpanded && SubComponent(rowInfo, function () {
            var newExpanded = _utils2.default.clone(expanded);

            _utils2.default.set(newExpanded, cellInfo.nestingPath, false);
          })
        );
      };

      var makePadColumn = function makePadColumn(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var flex = width;
        var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var tdProps = _utils2.default.splitProps(getTdProps(finalState, undefined, column, _this2));
        var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this2));

        var classes = [tdProps.className, column.className, columnProps.className];

        var styles = _extends({}, tdProps.style, column.style, columnProps.style);

        return _react2.default.createElement(
          TdComponent,
          _extends({
            key: i + '-' + column.id,
            className: (0, _classnames2.default)(classes, !show && 'hidden'),
            style: _extends({}, styles, {
              flex: flex + ' 0 auto',
              width: _utils2.default.asPx(width),
              maxWidth: _utils2.default.asPx(maxWidth)
            })
          }, tdProps.rest),
          _utils2.default.normalizeComponent(PadRowComponent)
        );
      };

      var makePadRow = function makePadRow(row, i) {
        var trGroupProps = getTrGroupProps(finalState, undefined, undefined, _this2);
        var trProps = _utils2.default.splitProps(getTrProps(finalState, undefined, undefined, _this2));
        return _react2.default.createElement(
          TrGroupComponent,
          _extends({ key: 'pad-' + i }, trGroupProps),
          _react2.default.createElement(
            TrComponent,
            {
              className: (0, _classnames2.default)('-padRow', (pageRows.length + i) % 2 ? '-even' : '-odd', trProps.className),
              style: trProps.style || {}
            },
            visibleColumns.map(makePadColumn)
          )
        );
      };

      var makeColumnFooter = function makeColumnFooter(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = _utils2.default.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var tFootTdProps = _utils2.default.splitProps(getTfootTdProps(finalState, undefined, undefined, _this2));
        var columnProps = _utils2.default.splitProps(column.getProps(finalState, undefined, column, _this2));
        var columnFooterProps = _utils2.default.splitProps(column.getFooterProps(finalState, undefined, column, _this2));

        var classes = [tFootTdProps.className, column.className, columnProps.className, columnFooterProps.className];

        var styles = _extends({}, tFootTdProps.style, column.style, columnProps.style, columnFooterProps.style);

        return _react2.default.createElement(
          TdComponent,
          _extends({
            key: i + '-' + column.id,
            className: (0, _classnames2.default)(classes, !show && 'hidden'),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: _utils2.default.asPx(width),
              maxWidth: _utils2.default.asPx(maxWidth)
            })
          }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
          _utils2.default.normalizeComponent(column.Footer, {
            data: sortedData,
            column: column
          })
        );
      };

      var makeColumnFooters = function makeColumnFooters() {
        var tFootProps = _utils2.default.splitProps(getTfootProps(finalState, undefined, undefined, _this2));
        var tFootTrProps = _utils2.default.splitProps(getTfootTrProps(finalState, undefined, undefined, _this2));
        return _react2.default.createElement(
          TfootComponent,
          _extends({
            className: tFootProps.className,
            style: _extends({}, tFootProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, tFootProps.rest),
          _react2.default.createElement(
            TrComponent,
            _extends({ className: (0, _classnames2.default)(tFootTrProps.className), style: tFootTrProps.style }, tFootTrProps.rest),
            visibleColumns.map(makeColumnFooter)
          )
        );
      };

      var makePagination = function makePagination(isTop) {
        var paginationProps = _utils2.default.splitProps(getPaginationProps(finalState, undefined, undefined, _this2));
        return _react2.default.createElement(PaginationComponent, _extends({}, resolvedState, {
          pages: pages,
          canPrevious: canPrevious,
          canNext: canNext,
          onPageChange: _this2.onPageChange,
          onPageSizeChange: _this2.onPageSizeChange,
          className: paginationProps.className,
          style: paginationProps.style,
          isTop: isTop
        }, paginationProps.rest));
      };

      var makeTable = function makeTable() {
        var tbodyChildren = functionalRowRendering ? makePageRow : [].concat(_toConsumableArray(pageRows.map(function (d, i) {
          return makePageRow(d, i);
        })), _toConsumableArray(padRows.map(makePadRow)));

        return _react2.default.createElement(
          'div',
          _extends({
            className: (0, _classnames2.default)('ReactTable', className, rootProps.className),
            style: _extends({}, style, rootProps.style)
          }, rootProps.rest),
          showPagination && showPaginationTop ? _react2.default.createElement(
            'div',
            { className: 'pagination-top' },
            makePagination(true)
          ) : null,
          _react2.default.createElement(
            TableComponent,
            _extends({
              className: (0, _classnames2.default)(tableProps.className, currentlyResizing ? 'rt-resizing' : ''),
              style: tableProps.style
            }, tableProps.rest),
            hasHeaderGroups ? headerGroups.map(makeHeaderGroups) : null,
            makeHeaders(),
            hasFilters ? makeFilters() : null,
            _react2.default.createElement(
              TbodyComponent,
              _extends({
                className: (0, _classnames2.default)(tBodyProps.className),
                style: _extends({}, tBodyProps.style, {
                  minWidth: rowMinWidth + 'px'
                })
              }, tBodyProps.rest),
              tbodyChildren
            ),
            hasColumnFooter ? makeColumnFooters() : null
          ),
          showPagination && showPaginationBottom ? _react2.default.createElement(
            'div',
            { className: 'pagination-bottom' },
            makePagination(false)
          ) : null,
          !pageRows.length && _react2.default.createElement(
            NoDataComponent,
            noDataProps,
            _utils2.default.normalizeComponent(noDataText)
          ),
          _react2.default.createElement(LoadingComponent, _extends({ loading: loading, loadingText: loadingText }, loadingProps))
        );
      };

      // childProps are optionally passed to a function-as-a-child
      return children ? children(finalState, makeTable, this) : makeTable();
    }
  }]);

  return ReactTable;
}((0, _methods2.default)((0, _lifecycle2.default)(_react.Component)));

ReactTable.propTypes = _propTypes2.default;
ReactTable.defaultProps = _defaultProps2.default;
exports.default = ReactTable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdFRhYmxlRGVmYXVsdHMiLCJkZWZhdWx0UHJvcHMiLCJSZWFjdFRhYmxlIiwicHJvcHMiLCJnZXRSZXNvbHZlZFN0YXRlIiwiYmluZCIsImdldERhdGFNb2RlbCIsImdldFNvcnRlZERhdGEiLCJmaXJlRmV0Y2hEYXRhIiwiZ2V0UHJvcE9yU3RhdGUiLCJnZXRTdGF0ZU9yUHJvcCIsImZpbHRlckRhdGEiLCJzb3J0RGF0YSIsImdldE1pblJvd3MiLCJvblBhZ2VDaGFuZ2UiLCJvblBhZ2VTaXplQ2hhbmdlIiwic29ydENvbHVtbiIsImZpbHRlckNvbHVtbiIsInJlc2l6ZUNvbHVtblN0YXJ0IiwicmVzaXplQ29sdW1uRW5kIiwicmVzaXplQ29sdW1uTW92aW5nIiwic3RhdGUiLCJwYWdlIiwiZGVmYXVsdFBhZ2UiLCJwYWdlU2l6ZSIsImRlZmF1bHRQYWdlU2l6ZSIsInNvcnRlZCIsImRlZmF1bHRTb3J0ZWQiLCJleHBhbmRlZCIsImRlZmF1bHRFeHBhbmRlZCIsImZpbHRlcmVkIiwiZGVmYXVsdEZpbHRlcmVkIiwicmVzaXplZCIsImRlZmF1bHRSZXNpemVkIiwiY3VycmVudGx5UmVzaXppbmciLCJza2lwTmV4dFNvcnQiLCJyZXNvbHZlZFN0YXRlIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJQcm9wcyIsImdldFRoZWFkRmlsdGVyVHJQcm9wcyIsImdldFRoZWFkRmlsdGVyVGhQcm9wcyIsImdldFRib2R5UHJvcHMiLCJnZXRUckdyb3VwUHJvcHMiLCJnZXRUclByb3BzIiwiZ2V0VGRQcm9wcyIsImdldFRmb290UHJvcHMiLCJnZXRUZm9vdFRyUHJvcHMiLCJnZXRUZm9vdFRkUHJvcHMiLCJnZXRQYWdpbmF0aW9uUHJvcHMiLCJnZXRMb2FkaW5nUHJvcHMiLCJnZXROb0RhdGFQcm9wcyIsImdldFJlc2l6ZXJQcm9wcyIsInNob3dQYWdpbmF0aW9uIiwic2hvd1BhZ2luYXRpb25Ub3AiLCJzaG93UGFnaW5hdGlvbkJvdHRvbSIsIm1hbnVhbCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInNvcnRhYmxlIiwibXVsdGlTb3J0IiwicmVzaXphYmxlIiwiZmlsdGVyYWJsZSIsInBpdm90SURLZXkiLCJwaXZvdFZhbEtleSIsInBpdm90QnkiLCJzdWJSb3dzS2V5IiwiYWdncmVnYXRlZEtleSIsIm9yaWdpbmFsS2V5IiwiaW5kZXhLZXkiLCJncm91cGVkQnlQaXZvdEtleSIsImxvYWRpbmciLCJwYWdlcyIsIm9uRXhwYW5kZWRDaGFuZ2UiLCJUYWJsZUNvbXBvbmVudCIsIlRoZWFkQ29tcG9uZW50IiwiVGJvZHlDb21wb25lbnQiLCJUckdyb3VwQ29tcG9uZW50IiwiVHJDb21wb25lbnQiLCJUaENvbXBvbmVudCIsIlRkQ29tcG9uZW50IiwiVGZvb3RDb21wb25lbnQiLCJQYWdpbmF0aW9uQ29tcG9uZW50IiwiTG9hZGluZ0NvbXBvbmVudCIsIlN1YkNvbXBvbmVudCIsIk5vRGF0YUNvbXBvbmVudCIsIlJlc2l6ZXJDb21wb25lbnQiLCJFeHBhbmRlckNvbXBvbmVudCIsIlBpdm90VmFsdWVDb21wb25lbnQiLCJQaXZvdENvbXBvbmVudCIsIkFnZ3JlZ2F0ZWRDb21wb25lbnQiLCJGaWx0ZXJDb21wb25lbnQiLCJQYWRSb3dDb21wb25lbnQiLCJyZXNvbHZlZERhdGEiLCJ2aXNpYmxlQ29sdW1ucyIsImhlYWRlckdyb3VwcyIsImhhc0hlYWRlckdyb3VwcyIsInNvcnRlZERhdGEiLCJmdW5jdGlvbmFsUm93UmVuZGVyaW5nIiwic3RhcnRSb3ciLCJlbmRSb3ciLCJwYWdlUm93cyIsInNsaWNlIiwibWluUm93cyIsInBhZFJvd3MiLCJfIiwicmFuZ2UiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaGFzQ29sdW1uRm9vdGVyIiwic29tZSIsImQiLCJGb290ZXIiLCJoYXNGaWx0ZXJzIiwicmVjdXJzZVJvd3NWaWV3SW5kZXgiLCJyb3dzIiwicGF0aCIsImluZGV4IiwibWFwIiwicm93IiwiaSIsInJvd1dpdGhWaWV3SW5kZXgiLCJfdmlld0luZGV4IiwibmV3UGF0aCIsImNvbmNhdCIsImdldCIsImNhblByZXZpb3VzIiwiY2FuTmV4dCIsInJvd01pbldpZHRoIiwic3VtIiwicmVzaXplZENvbHVtbiIsImZpbmQiLCJ4IiwiaWQiLCJnZXRGaXJzdERlZmluZWQiLCJ2YWx1ZSIsIndpZHRoIiwibWluV2lkdGgiLCJyb3dJbmRleCIsImZpbmFsU3RhdGUiLCJyb290UHJvcHMiLCJzcGxpdFByb3BzIiwidW5kZWZpbmVkIiwidGFibGVQcm9wcyIsInRCb2R5UHJvcHMiLCJsb2FkaW5nUHJvcHMiLCJub0RhdGFQcm9wcyIsIm1ha2VIZWFkZXJHcm91cCIsImNvbHVtbiIsInJlc2l6ZWRWYWx1ZSIsImNvbCIsImxlYWZDb2x1bW5zIiwibGVhdmVzIiwiZmxleCIsIm1heFdpZHRoIiwidGhlYWRHcm91cFRoUHJvcHMiLCJjb2x1bW5IZWFkZXJQcm9wcyIsImdldEhlYWRlclByb3BzIiwiY2xhc3NlcyIsImhlYWRlckNsYXNzTmFtZSIsInN0eWxlcyIsImhlYWRlclN0eWxlIiwicmVzdCIsImZsZXhTdHlsZXMiLCJhc1B4Iiwibm9ybWFsaXplQ29tcG9uZW50IiwiSGVhZGVyIiwiZGF0YSIsIm1ha2VIZWFkZXJHcm91cHMiLCJ0aGVhZEdyb3VwUHJvcHMiLCJ0aGVhZEdyb3VwVHJQcm9wcyIsIm1ha2VIZWFkZXIiLCJyZXNpemVkQ29sIiwic29ydCIsInNob3ciLCJ0aGVhZFRoUHJvcHMiLCJpc1Jlc2l6YWJsZSIsInJlc2l6ZXIiLCJlIiwiaXNTb3J0YWJsZSIsImRlc2MiLCJpbmNsdWRlcyIsInNoaWZ0S2V5IiwibWFrZUhlYWRlcnMiLCJ0aGVhZFByb3BzIiwidGhlYWRUclByb3BzIiwibWFrZUZpbHRlciIsInRoZWFkRmlsdGVyVGhQcm9wcyIsImZpbHRlciIsIlJlc29sdmVkRmlsdGVyQ29tcG9uZW50IiwiRmlsdGVyIiwiaXNGaWx0ZXJhYmxlIiwib25DaGFuZ2UiLCJtYWtlRmlsdGVycyIsInRoZWFkRmlsdGVyUHJvcHMiLCJ0aGVhZEZpbHRlclRyUHJvcHMiLCJtYWtlUGFnZVJvdyIsInJvd0luZm8iLCJvcmlnaW5hbCIsInZpZXdJbmRleCIsImxldmVsIiwibmVzdGluZ1BhdGgiLCJhZ2dyZWdhdGVkIiwiZ3JvdXBlZEJ5UGl2b3QiLCJzdWJSb3dzIiwiaXNFeHBhbmRlZCIsInRyR3JvdXBQcm9wcyIsInRyUHJvcHMiLCJqb2luIiwiaTIiLCJ0ZFByb3BzIiwiY29sdW1uUHJvcHMiLCJjZWxsSW5mbyIsInBpdm90ZWQiLCJleHBhbmRlciIsInVzZU9uRXhwYW5kZXJDbGljayIsImlzQnJhbmNoIiwiaXNQcmV2aWV3Iiwib25FeHBhbmRlckNsaWNrIiwibmV3RXhwYW5kZWQiLCJjbG9uZSIsInNldCIsInNldFN0YXRlV2l0aERhdGEiLCJyZXNvbHZlZENlbGwiLCJDZWxsIiwiUmVzb2x2ZWRBZ2dyZWdhdGVkQ29tcG9uZW50IiwiQWdncmVnYXRlZCIsImFnZ3JlZ2F0ZSIsIlJlc29sdmVkRXhwYW5kZXJDb21wb25lbnQiLCJFeHBhbmRlciIsIlJlc29sdmVkUGl2b3RWYWx1ZUNvbXBvbmVudCIsIlBpdm90VmFsdWUiLCJEZWZhdWx0UmVzb2x2ZWRQaXZvdENvbXBvbmVudCIsIlJlc29sdmVkUGl2b3RDb21wb25lbnQiLCJQaXZvdCIsImV4cGFuZGFibGUiLCJpbmRleE9mIiwicmVzb2x2ZWRPbkV4cGFuZGVyQ2xpY2siLCJpbnRlcmFjdGlvblByb3BzIiwib25DbGljayIsIm1ha2VQYWRDb2x1bW4iLCJtYWtlUGFkUm93IiwibWFrZUNvbHVtbkZvb3RlciIsInRGb290VGRQcm9wcyIsImNvbHVtbkZvb3RlclByb3BzIiwiZ2V0Rm9vdGVyUHJvcHMiLCJtYWtlQ29sdW1uRm9vdGVycyIsInRGb290UHJvcHMiLCJ0Rm9vdFRyUHJvcHMiLCJtYWtlUGFnaW5hdGlvbiIsImlzVG9wIiwicGFnaW5hdGlvblByb3BzIiwibWFrZVRhYmxlIiwidGJvZHlDaGlsZHJlbiIsIkNvbXBvbmVudCIsInByb3BUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBTEE7OztBQU9PLElBQU1BLGtEQUFxQkMsc0JBQTNCOztJQUVjQyxVOzs7QUFJbkIsc0JBQWFDLEtBQWIsRUFBb0I7QUFBQTs7QUFBQTs7QUFHbEIsVUFBS0MsZ0JBQUwsR0FBd0IsTUFBS0EsZ0JBQUwsQ0FBc0JDLElBQXRCLE9BQXhCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCRCxJQUFsQixPQUFwQjtBQUNBLFVBQUtFLGFBQUwsR0FBcUIsTUFBS0EsYUFBTCxDQUFtQkYsSUFBbkIsT0FBckI7QUFDQSxVQUFLRyxhQUFMLEdBQXFCLE1BQUtBLGFBQUwsQ0FBbUJILElBQW5CLE9BQXJCO0FBQ0EsVUFBS0ksY0FBTCxHQUFzQixNQUFLQSxjQUFMLENBQW9CSixJQUFwQixPQUF0QjtBQUNBLFVBQUtLLGNBQUwsR0FBc0IsTUFBS0EsY0FBTCxDQUFvQkwsSUFBcEIsT0FBdEI7QUFDQSxVQUFLTSxVQUFMLEdBQWtCLE1BQUtBLFVBQUwsQ0FBZ0JOLElBQWhCLE9BQWxCO0FBQ0EsVUFBS08sUUFBTCxHQUFnQixNQUFLQSxRQUFMLENBQWNQLElBQWQsT0FBaEI7QUFDQSxVQUFLUSxVQUFMLEdBQWtCLE1BQUtBLFVBQUwsQ0FBZ0JSLElBQWhCLE9BQWxCO0FBQ0EsVUFBS1MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCVCxJQUFsQixPQUFwQjtBQUNBLFVBQUtVLGdCQUFMLEdBQXdCLE1BQUtBLGdCQUFMLENB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QXFCaUgsU0FBckIsRUFBZ0MsSUFBaEMsQ0FBWCxHQUFtREEsV0FBMUQ7QUFDRDs7OztFQWh5QnFDLHVCQUFRLHlCQUFVRSxnQkFBVixDQUFSLEM7O0FBQW5CdFEsVSxDQUNadVEsUyxHQUFZQSxtQjtBQURBdlEsVSxDQUVaRCxZLEdBQWVBLHNCO2tCQUZIQyxVIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xyXG4vL1xyXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgTGlmZWN5Y2xlIGZyb20gJy4vbGlmZWN5Y2xlJ1xyXG5pbXBvcnQgTWV0aG9kcyBmcm9tICcuL21ldGhvZHMnXHJcbmltcG9ydCBkZWZhdWx0UHJvcHMgZnJvbSAnLi9kZWZhdWx0UHJvcHMnXHJcbmltcG9ydCBwcm9wVHlwZXMgZnJvbSAnLi9wcm9wVHlwZXMnXHJcblxyXG5leHBvcnQgY29uc3QgUmVhY3RUYWJsZURlZmF1bHRzID0gZGVmYXVsdFByb3BzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFjdFRhYmxlIGV4dGVuZHMgTWV0aG9kcyhMaWZlY3ljbGUoQ29tcG9uZW50KSkge1xyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXNcclxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzXHJcblxyXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xyXG4gICAgc3VwZXIoKVxyXG5cclxuICAgIHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmdldERhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsLmJpbmQodGhpcylcclxuICAgIHRoaXMuZ2V0U29ydGVkRGF0YSA9IHRoaXMuZ2V0U29ydGVkRGF0YS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmZpcmVGZXRjaERhdGEgPSB0aGlzLmZpcmVGZXRjaERhdGEuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5nZXRQcm9wT3JTdGF0ZSA9IHRoaXMuZ2V0UHJvcE9yU3RhdGUuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5nZXRTdGF0ZU9yUHJvcCA9IHRoaXMuZ2V0U3RhdGVPclByb3AuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5maWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJEYXRhLmJpbmQodGhpcylcclxuICAgIHRoaXMuc29ydERhdGEgPSB0aGlzLnNvcnREYXRhLmJpbmQodGhpcylcclxuICAgIHRoaXMuZ2V0TWluUm93cyA9IHRoaXMuZ2V0TWluUm93cy5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLm9uUGFnZUNoYW5nZSA9IHRoaXMub25QYWdlQ2hhbmdlLmJpbmQodGhpcylcclxuICAgIHRoaXMub25QYWdlU2l6ZUNoYW5nZSA9IHRoaXMub25QYWdlU2l6ZUNoYW5nZS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLnNvcnRDb2x1bW4gPSB0aGlzLnNvcnRDb2x1bW4uYmluZCh0aGlzKVxyXG4gICAgdGhpcy5maWx0ZXJDb2x1bW4gPSB0aGlzLmZpbHRlckNvbHVtbi5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLnJlc2l6ZUNvbHVtblN0YXJ0ID0gdGhpcy5yZXNpemVDb2x1bW5TdGFydC5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLnJlc2l6ZUNvbHVtbkVuZCA9IHRoaXMucmVzaXplQ29sdW1uRW5kLmJpbmQodGhpcylcclxuICAgIHRoaXMucmVzaXplQ29sdW1uTW92aW5nID0gdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcuYmluZCh0aGlzKVxyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBhZ2U6IHByb3BzLmRlZmF1bHRQYWdlLFxyXG4gICAgICBwYWdlU2l6ZTogcHJvcHMuZGVmYXVsdFBhZ2VTaXplLFxyXG4gICAgICBzb3J0ZWQ6IHByb3BzLmRlZmF1bHRTb3J0ZWQsXHJcbiAgICAgIGV4cGFuZGVkOiBwcm9wcy5kZWZhdWx0RXhwYW5kZWQsXHJcbiAgICAgIGZpbHRlcmVkOiBwcm9wcy5kZWZhdWx0RmlsdGVyZWQsXHJcbiAgICAgIHJlc2l6ZWQ6IHByb3BzLmRlZmF1bHRSZXNpemVkLFxyXG4gICAgICBjdXJyZW50bHlSZXNpemluZzogZmFsc2UsXHJcbiAgICAgIHNraXBOZXh0U29ydDogZmFsc2UsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIgKCkge1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXHJcbiAgICBjb25zdCB7XHJcbiAgICAgIGNoaWxkcmVuLFxyXG4gICAgICBjbGFzc05hbWUsXHJcbiAgICAgIHN0eWxlLFxyXG4gICAgICBnZXRQcm9wcyxcclxuICAgICAgZ2V0VGFibGVQcm9wcyxcclxuICAgICAgZ2V0VGhlYWRHcm91cFByb3BzLFxyXG4gICAgICBnZXRUaGVhZEdyb3VwVHJQcm9wcyxcclxuICAgICAgZ2V0VGhlYWRHcm91cFRoUHJvcHMsXHJcbiAgICAgIGdldFRoZWFkUHJvcHMsXHJcbiAgICAgIGdldFRoZWFkVHJQcm9wcyxcclxuICAgICAgZ2V0VGhlYWRUaFByb3BzLFxyXG4gICAgICBnZXRUaGVhZEZpbHRlclByb3BzLFxyXG4gICAgICBnZXRUaGVhZEZpbHRlclRyUHJvcHMsXHJcbiAgICAgIGdldFRoZWFkRmlsdGVyVGhQcm9wcyxcclxuICAgICAgZ2V0VGJvZHlQcm9wcyxcclxuICAgICAgZ2V0VHJHcm91cFByb3BzLFxyXG4gICAgICBnZXRUclByb3BzLFxyXG4gICAgICBnZXRUZFByb3BzLFxyXG4gICAgICBnZXRUZm9vdFByb3BzLFxyXG4gICAgICBnZXRUZm9vdFRyUHJvcHMsXHJcbiAgICAgIGdldFRmb290VGRQcm9wcyxcclxuICAgICAgZ2V0UGFnaW5hdGlvblByb3BzLFxyXG4gICAgICBnZXRMb2FkaW5nUHJvcHMsXHJcbiAgICAgIGdldE5vRGF0YVByb3BzLFxyXG4gICAgICBnZXRSZXNpemVyUHJvcHMsXHJcbiAgICAgIHNob3dQYWdpbmF0aW9uLFxyXG4gICAgICBzaG93UGFnaW5hdGlvblRvcCxcclxuICAgICAgc2hvd1BhZ2luYXRpb25Cb3R0b20sXHJcbiAgICAgIG1hbnVhbCxcclxuICAgICAgbG9hZGluZ1RleHQsXHJcbiAgICAgIG5vRGF0YVRleHQsXHJcbiAgICAgIHNvcnRhYmxlLFxyXG4gICAgICBtdWx0aVNvcnQsXHJcbiAgICAgIHJlc2l6YWJsZSxcclxuICAgICAgZmlsdGVyYWJsZSxcclxuICAgICAgLy8gUGl2b3RpbmcgU3RhdGVcclxuICAgICAgcGl2b3RJREtleSxcclxuICAgICAgcGl2b3RWYWxLZXksXHJcbiAgICAgIHBpdm90QnksXHJcbiAgICAgIHN1YlJvd3NLZXksXHJcbiAgICAgIGFnZ3JlZ2F0ZWRLZXksXHJcbiAgICAgIG9yaWdpbmFsS2V5LFxyXG4gICAgICBpbmRleEtleSxcclxuICAgICAgZ3JvdXBlZEJ5UGl2b3RLZXksXHJcbiAgICAgIC8vIFN0YXRlXHJcbiAgICAgIGxvYWRpbmcsXHJcbiAgICAgIHBhZ2VTaXplLFxyXG4gICAgICBwYWdlLFxyXG4gICAgICBzb3J0ZWQsXHJcbiAgICAgIGZpbHRlcmVkLFxyXG4gICAgICByZXNpemVkLFxyXG4gICAgICBleHBhbmRlZCxcclxuICAgICAgcGFnZXMsXHJcbiAgICAgIG9uRXhwYW5kZWRDaGFuZ2UsXHJcbiAgICAgIC8vIENvbXBvbmVudHNcclxuICAgICAgVGFibGVDb21wb25lbnQsXHJcbiAgICAgIFRoZWFkQ29tcG9uZW50LFxyXG4gICAgICBUYm9keUNvbXBvbmVudCxcclxuICAgICAgVHJHcm91cENvbXBvbmVudCxcclxuICAgICAgVHJDb21wb25lbnQsXHJcbiAgICAgIFRoQ29tcG9uZW50LFxyXG4gICAgICBUZENvbXBvbmVudCxcclxuICAgICAgVGZvb3RDb21wb25lbnQsXHJcbiAgICAgIFBhZ2luYXRpb25Db21wb25lbnQsXHJcbiAgICAgIExvYWRpbmdDb21wb25lbnQsXHJcbiAgICAgIFN1YkNvbXBvbmVudCxcclxuICAgICAgTm9EYXRhQ29tcG9uZW50LFxyXG4gICAgICBSZXNpemVyQ29tcG9uZW50LFxyXG4gICAgICBFeHBhbmRlckNvbXBvbmVudCxcclxuICAgICAgUGl2b3RWYWx1ZUNvbXBvbmVudCxcclxuICAgICAgUGl2b3RDb21wb25lbnQsXHJcbiAgICAgIEFnZ3JlZ2F0ZWRDb21wb25lbnQsXHJcbiAgICAgIEZpbHRlckNvbXBvbmVudCxcclxuICAgICAgUGFkUm93Q29tcG9uZW50LFxyXG4gICAgICAvLyBEYXRhIG1vZGVsXHJcbiAgICAgIHJlc29sdmVkRGF0YSxcclxuICAgICAgdmlzaWJsZUNvbHVtbnMsXHJcbiAgICAgIGhlYWRlckdyb3VwcyxcclxuICAgICAgaGFzSGVhZGVyR3JvdXBzLFxyXG4gICAgICAvLyBTb3J0ZWQgRGF0YVxyXG4gICAgICBzb3J0ZWREYXRhLFxyXG4gICAgICBjdXJyZW50bHlSZXNpemluZyxcclxuICAgICAgLy8gTG93IGxldmVsIGN1c3RvbWl6YXRpb25cclxuICAgICAgZnVuY3Rpb25hbFJvd1JlbmRlcmluZyxcclxuICAgIH0gPSByZXNvbHZlZFN0YXRlXHJcblxyXG4gICAgLy8gUGFnaW5hdGlvblxyXG4gICAgY29uc3Qgc3RhcnRSb3cgPSBwYWdlU2l6ZSAqIHBhZ2VcclxuICAgIGNvbnN0IGVuZFJvdyA9IHN0YXJ0Um93ICsgcGFnZVNpemVcclxuICAgIGxldCBwYWdlUm93cyA9IG1hbnVhbCA/IHJlc29sdmVkRGF0YSA6IHNvcnRlZERhdGEuc2xpY2Uoc3RhcnRSb3csIGVuZFJvdylcclxuICAgIGNvbnN0IG1pblJvd3MgPSB0aGlzLmdldE1pblJvd3MoKVxyXG4gICAgY29uc3QgcGFkUm93cyA9IF8ucmFuZ2UoTWF0aC5tYXgobWluUm93cyAtIHBhZ2VSb3dzLmxlbmd0aCwgMCkpXHJcblxyXG4gICAgY29uc3QgaGFzQ29sdW1uRm9vdGVyID0gdmlzaWJsZUNvbHVtbnMuc29tZSgoZCkgPT4gZC5Gb290ZXIpXHJcbiAgICBjb25zdCBoYXNGaWx0ZXJzID0gZmlsdGVyYWJsZSB8fCB2aXNpYmxlQ29sdW1ucy5zb21lKChkKSA9PiBkLmZpbHRlcmFibGUpXHJcblxyXG4gICAgY29uc3QgcmVjdXJzZVJvd3NWaWV3SW5kZXggPSAocm93cywgcGF0aCA9IFtdLCBpbmRleCA9IC0xKSA9PiBbXHJcbiAgICAgIHJvd3MubWFwKChyb3csIGkpID0+IHtcclxuICAgICAgICBpbmRleCArPSAxXHJcbiAgICAgICAgY29uc3Qgcm93V2l0aFZpZXdJbmRleCA9IHtcclxuICAgICAgICAgIC4uLnJvdyxcclxuICAgICAgICAgIF92aWV3SW5kZXg6IGluZGV4LFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5jb25jYXQoWyBpIF0pXHJcbiAgICAgICAgaWYgKHJvd1dpdGhWaWV3SW5kZXhbc3ViUm93c0tleV0gJiYgXy5nZXQoZXhwYW5kZWQsIG5ld1BhdGgpKSB7XHJcbiAgICAgICAgICA7WyByb3dXaXRoVmlld0luZGV4W3N1YlJvd3NLZXldLCBpbmRleCBdID0gcmVjdXJzZVJvd3NWaWV3SW5kZXgocm93V2l0aFZpZXdJbmRleFtzdWJSb3dzS2V5XSwgbmV3UGF0aCwgaW5kZXgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3dXaXRoVmlld0luZGV4XHJcbiAgICAgIH0pLFxyXG4gICAgICBpbmRleCxcclxuICAgIF1cclxuICAgIDtbIHBhZ2VSb3dzIF0gPSByZWN1cnNlUm93c1ZpZXdJbmRleChwYWdlUm93cylcclxuXHJcbiAgICBjb25zdCBjYW5QcmV2aW91cyA9IHBhZ2UgPiAwXHJcbiAgICBjb25zdCBjYW5OZXh0ID0gcGFnZSArIDEgPCBwYWdlc1xyXG5cclxuICAgIGNvbnN0IHJvd01pbldpZHRoID0gXy5zdW0oXHJcbiAgICAgIHZpc2libGVDb2x1bW5zLm1hcCgoZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc2l6ZWRDb2x1bW4gPSByZXNpemVkLmZpbmQoKHgpID0+IHguaWQgPT09IGQuaWQpIHx8IHt9XHJcbiAgICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2x1bW4udmFsdWUsIGQud2lkdGgsIGQubWluV2lkdGgpXHJcbiAgICAgIH0pLFxyXG4gICAgKVxyXG5cclxuICAgIGxldCByb3dJbmRleCA9IC0xXHJcblxyXG4gICAgY29uc3QgZmluYWxTdGF0ZSA9IHtcclxuICAgICAgLi4ucmVzb2x2ZWRTdGF0ZSxcclxuICAgICAgc3RhcnRSb3csXHJcbiAgICAgIGVuZFJvdyxcclxuICAgICAgcGFnZVJvd3MsXHJcbiAgICAgIG1pblJvd3MsXHJcbiAgICAgIHBhZFJvd3MsXHJcbiAgICAgIGhhc0NvbHVtbkZvb3RlcixcclxuICAgICAgY2FuUHJldmlvdXMsXHJcbiAgICAgIGNhbk5leHQsXHJcbiAgICAgIHJvd01pbldpZHRoLFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJvb3RQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXHJcbiAgICBjb25zdCB0YWJsZVByb3BzID0gXy5zcGxpdFByb3BzKGdldFRhYmxlUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgY29uc3QgdEJvZHlQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUYm9keVByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcclxuICAgIGNvbnN0IGxvYWRpbmdQcm9wcyA9IGdldExvYWRpbmdQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcylcclxuICAgIGNvbnN0IG5vRGF0YVByb3BzID0gZ2V0Tm9EYXRhUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXHJcblxyXG4gICAgLy8gVmlzdWFsIENvbXBvbmVudHNcclxuXHJcbiAgICBjb25zdCBtYWtlSGVhZGVyR3JvdXAgPSAoY29sdW1uLCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc2l6ZWRWYWx1ZSA9IChjb2wpID0+IChyZXNpemVkLmZpbmQoKHgpID0+IHguaWQgPT09IGNvbC5pZCkgfHwge30pLnZhbHVlXHJcblxyXG4gICAgICBjb25zdCBsZWFmQ29sdW1ucyA9IF8ubGVhdmVzKGNvbHVtbiwgJ2NvbHVtbnMnKVxyXG4gICAgICBjb25zdCBmbGV4ID0gXy5zdW0obGVhZkNvbHVtbnMubWFwKChjb2wpID0+IChjb2wud2lkdGggfHwgcmVzaXplZFZhbHVlKGNvbCkgPyAwIDogY29sLm1pbldpZHRoKSkpXHJcbiAgICAgIGNvbnN0IHdpZHRoID0gXy5zdW0obGVhZkNvbHVtbnMubWFwKChjb2wpID0+IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRWYWx1ZShjb2wpLCBjb2wud2lkdGgsIGNvbC5taW5XaWR0aCkpKVxyXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uc3VtKGxlYWZDb2x1bW5zLm1hcCgoY29sKSA9PiBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkVmFsdWUoY29sKSwgY29sLndpZHRoLCBjb2wubWF4V2lkdGgpKSlcclxuXHJcbiAgICAgIGNvbnN0IHRoZWFkR3JvdXBUaFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkR3JvdXBUaFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuICAgICAgY29uc3QgY29sdW1uSGVhZGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldEhlYWRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuXHJcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbIGNvbHVtbi5oZWFkZXJDbGFzc05hbWUsIHRoZWFkR3JvdXBUaFByb3BzLmNsYXNzTmFtZSwgY29sdW1uSGVhZGVyUHJvcHMuY2xhc3NOYW1lIF1cclxuXHJcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICAuLi5jb2x1bW4uaGVhZGVyU3R5bGUsXHJcbiAgICAgICAgLi4udGhlYWRHcm91cFRoUHJvcHMuc3R5bGUsXHJcbiAgICAgICAgLi4uY29sdW1uSGVhZGVyUHJvcHMuc3R5bGUsXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc3QgPSB7XHJcbiAgICAgICAgLi4udGhlYWRHcm91cFRoUHJvcHMucmVzdCxcclxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0LFxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmbGV4U3R5bGVzID0ge1xyXG4gICAgICAgIGZsZXg6IGAke2ZsZXh9IDAgYXV0b2AsXHJcbiAgICAgICAgd2lkdGg6IF8uYXNQeCh3aWR0aCksXHJcbiAgICAgICAgbWF4V2lkdGg6IF8uYXNQeChtYXhXaWR0aCksXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRoQ29tcG9uZW50XHJcbiAgICAgICAgICBrZXk9e2Ake2l9LSR7Y29sdW1uLmlkfWB9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoY2xhc3Nlcyl9XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAuLi5zdHlsZXMsXHJcbiAgICAgICAgICAgIC4uLmZsZXhTdHlsZXMsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5IZWFkZXIsIHtcclxuICAgICAgICAgICAgZGF0YTogc29ydGVkRGF0YSxcclxuICAgICAgICAgICAgY29sdW1uLFxyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9UaENvbXBvbmVudD5cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ha2VIZWFkZXJHcm91cHMgPSAocm93LCBpKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRoZWFkR3JvdXBQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEdyb3VwUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCByb3csIHRoaXMpKVxyXG4gICAgICBjb25zdCB0aGVhZEdyb3VwVHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEdyb3VwVHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHJvdywgdGhpcykpXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRoZWFkQ29tcG9uZW50XHJcbiAgICAgICAgICBrZXk9e2Ake2l9LSR7cm93LmlkfWB9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1oZWFkZXJHcm91cHMnLCB0aGVhZEdyb3VwUHJvcHMuY2xhc3NOYW1lKX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLnRoZWFkR3JvdXBQcm9wcy5zdHlsZSxcclxuICAgICAgICAgICAgbWluV2lkdGg6IGAke3Jvd01pbldpZHRofXB4YCxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB7Li4udGhlYWRHcm91cFByb3BzLnJlc3R9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFRyQ29tcG9uZW50XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhlYWRHcm91cFRyUHJvcHMuY2xhc3NOYW1lfVxyXG4gICAgICAgICAgICBzdHlsZT17dGhlYWRHcm91cFRyUHJvcHMuc3R5bGV9XHJcbiAgICAgICAgICAgIHsuLi50aGVhZEdyb3VwVHJQcm9wcy5yZXN0fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7cm93Lm1hcChtYWtlSGVhZGVyR3JvdXApfVxyXG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cclxuICAgICAgICA8L1RoZWFkQ29tcG9uZW50PlxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFrZUhlYWRlciA9IChjb2x1bW4sIGkpID0+IHtcclxuICAgICAgY29uc3QgcmVzaXplZENvbCA9IHJlc2l6ZWQuZmluZCgoeCkgPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxyXG4gICAgICBjb25zdCBzb3J0ID0gc29ydGVkLmZpbmQoKGQpID0+IGQuaWQgPT09IGNvbHVtbi5pZClcclxuICAgICAgY29uc3Qgc2hvdyA9IHR5cGVvZiBjb2x1bW4uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5zaG93KCkgOiBjb2x1bW4uc2hvd1xyXG4gICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxyXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxyXG4gICAgICBjb25zdCB0aGVhZFRoUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRUaFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuICAgICAgY29uc3QgY29sdW1uSGVhZGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldEhlYWRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuXHJcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbIGNvbHVtbi5oZWFkZXJDbGFzc05hbWUsIHRoZWFkVGhQcm9wcy5jbGFzc05hbWUsIGNvbHVtbkhlYWRlclByb3BzLmNsYXNzTmFtZSBdXHJcblxyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgLi4uY29sdW1uLmhlYWRlclN0eWxlLFxyXG4gICAgICAgIC4uLnRoZWFkVGhQcm9wcy5zdHlsZSxcclxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5zdHlsZSxcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzdCA9IHtcclxuICAgICAgICAuLi50aGVhZFRoUHJvcHMucmVzdCxcclxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0LFxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBpc1Jlc2l6YWJsZSA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi5yZXNpemFibGUsIHJlc2l6YWJsZSwgZmFsc2UpXHJcbiAgICAgIGNvbnN0IHJlc2l6ZXIgPSBpc1Jlc2l6YWJsZSA/IChcclxuICAgICAgICA8UmVzaXplckNvbXBvbmVudFxyXG4gICAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiB0aGlzLnJlc2l6ZUNvbHVtblN0YXJ0KGUsIGNvbHVtbiwgZmFsc2UpfVxyXG4gICAgICAgICAgb25Ub3VjaFN0YXJ0PXsoZSkgPT4gdGhpcy5yZXNpemVDb2x1bW5TdGFydChlLCBjb2x1bW4sIHRydWUpfVxyXG4gICAgICAgICAgey4uLmdldFJlc2l6ZXJQcm9wcygnZmluYWxTdGF0ZScsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKX1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbFxyXG5cclxuICAgICAgY29uc3QgaXNTb3J0YWJsZSA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi5zb3J0YWJsZSwgc29ydGFibGUsIGZhbHNlKVxyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGhDb21wb25lbnRcclxuICAgICAgICAgIGtleT17YCR7aX0tJHtjb2x1bW4uaWR9YH1cclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcclxuICAgICAgICAgICAgY2xhc3NlcyxcclxuICAgICAgICAgICAgaXNSZXNpemFibGUgJiYgJ3J0LXJlc2l6YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICBzb3J0ID8gKHNvcnQuZGVzYyA/ICctc29ydC1kZXNjJyA6ICctc29ydC1hc2MnKSA6ICcnLFxyXG4gICAgICAgICAgICBpc1NvcnRhYmxlICYmICctY3Vyc29yLXBvaW50ZXInLFxyXG4gICAgICAgICAgICAhc2hvdyAmJiAnLWhpZGRlbicsXHJcbiAgICAgICAgICAgIHBpdm90QnkgJiYgcGl2b3RCeS5zbGljZSgwLCAtMSkuaW5jbHVkZXMoY29sdW1uLmlkKSAmJiAncnQtaGVhZGVyLXBpdm90JyxcclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAuLi5zdHlsZXMsXHJcbiAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxyXG4gICAgICAgICAgICB3aWR0aDogXy5hc1B4KHdpZHRoKSxcclxuICAgICAgICAgICAgbWF4V2lkdGg6IF8uYXNQeChtYXhXaWR0aCksXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgdG9nZ2xlU29ydD17KGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzU29ydGFibGUpIHRoaXMuc29ydENvbHVtbihjb2x1bW4sIG11bHRpU29ydCA/IGUuc2hpZnRLZXkgOiBmYWxzZSlcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB7Li4ucmVzdH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhpc1Jlc2l6YWJsZSAmJiAncnQtcmVzaXphYmxlLWhlYWRlci1jb250ZW50Jyl9PlxyXG4gICAgICAgICAgICB7Xy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLkhlYWRlciwge1xyXG4gICAgICAgICAgICAgIGRhdGE6IHNvcnRlZERhdGEsXHJcbiAgICAgICAgICAgICAgY29sdW1uLFxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAge3Jlc2l6ZXJ9XHJcbiAgICAgICAgPC9UaENvbXBvbmVudD5cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ha2VIZWFkZXJzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB0aGVhZFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICBjb25zdCB0aGVhZFRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRUclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGhlYWRDb21wb25lbnRcclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnLWhlYWRlcicsIHRoZWFkUHJvcHMuY2xhc3NOYW1lKX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLnRoZWFkUHJvcHMuc3R5bGUsXHJcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGAsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgey4uLnRoZWFkUHJvcHMucmVzdH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VHJDb21wb25lbnQgY2xhc3NOYW1lPXt0aGVhZFRyUHJvcHMuY2xhc3NOYW1lfSBzdHlsZT17dGhlYWRUclByb3BzLnN0eWxlfSB7Li4udGhlYWRUclByb3BzLnJlc3R9PlxyXG4gICAgICAgICAgICB7dmlzaWJsZUNvbHVtbnMubWFwKG1ha2VIZWFkZXIpfVxyXG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cclxuICAgICAgICA8L1RoZWFkQ29tcG9uZW50PlxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFrZUZpbHRlciA9IChjb2x1bW4sIGkpID0+IHtcclxuICAgICAgY29uc3QgcmVzaXplZENvbCA9IHJlc2l6ZWQuZmluZCgoeCkgPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxyXG4gICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxyXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxyXG4gICAgICBjb25zdCB0aGVhZEZpbHRlclRoUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRGaWx0ZXJUaFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuICAgICAgY29uc3QgY29sdW1uSGVhZGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoY29sdW1uLmdldEhlYWRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcclxuXHJcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbIGNvbHVtbi5oZWFkZXJDbGFzc05hbWUsIHRoZWFkRmlsdGVyVGhQcm9wcy5jbGFzc05hbWUsIGNvbHVtbkhlYWRlclByb3BzLmNsYXNzTmFtZSBdXHJcblxyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgLi4uY29sdW1uLmhlYWRlclN0eWxlLFxyXG4gICAgICAgIC4uLnRoZWFkRmlsdGVyVGhQcm9wcy5zdHlsZSxcclxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5zdHlsZSxcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzdCA9IHtcclxuICAgICAgICAuLi50aGVhZEZpbHRlclRoUHJvcHMucmVzdCxcclxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0LFxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBmaWx0ZXIgPSBmaWx0ZXJlZC5maW5kKChmaWx0ZXIpID0+IGZpbHRlci5pZCA9PT0gY29sdW1uLmlkKVxyXG5cclxuICAgICAgY29uc3QgUmVzb2x2ZWRGaWx0ZXJDb21wb25lbnQgPSBjb2x1bW4uRmlsdGVyIHx8IEZpbHRlckNvbXBvbmVudFxyXG5cclxuICAgICAgY29uc3QgaXNGaWx0ZXJhYmxlID0gXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLmZpbHRlcmFibGUsIGZpbHRlcmFibGUsIGZhbHNlKVxyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGhDb21wb25lbnRcclxuICAgICAgICAgIGtleT17YCR7aX0tJHtjb2x1bW4uaWR9YH1cclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjbGFzc2VzKX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLnN0eWxlcyxcclxuICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXHJcbiAgICAgICAgICAgIHdpZHRoOiBfLmFzUHgod2lkdGgpLFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogXy5hc1B4KG1heFdpZHRoKSxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB7Li4ucmVzdH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7aXNGaWx0ZXJhYmxlID8gKFxyXG4gICAgICAgICAgICBfLm5vcm1hbGl6ZUNvbXBvbmVudChcclxuICAgICAgICAgICAgICBSZXNvbHZlZEZpbHRlckNvbXBvbmVudCxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW4sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZTogKHZhbHVlKSA9PiB0aGlzLmZpbHRlckNvbHVtbihjb2x1bW4sIHZhbHVlKSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGRlZmF1bHRQcm9wcy5jb2x1bW4uRmlsdGVyLFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8L1RoQ29tcG9uZW50PlxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFrZUZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRoZWFkRmlsdGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRGaWx0ZXJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXHJcbiAgICAgIGNvbnN0IHRoZWFkRmlsdGVyVHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEZpbHRlclRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxUaGVhZENvbXBvbmVudFxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCctZmlsdGVycycsIHRoZWFkRmlsdGVyUHJvcHMuY2xhc3NOYW1lKX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLnRoZWFkRmlsdGVyUHJvcHMuc3R5bGUsXHJcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGAsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgey4uLnRoZWFkRmlsdGVyUHJvcHMucmVzdH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8VHJDb21wb25lbnRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGVhZEZpbHRlclRyUHJvcHMuY2xhc3NOYW1lfVxyXG4gICAgICAgICAgICBzdHlsZT17dGhlYWRGaWx0ZXJUclByb3BzLnN0eWxlfVxyXG4gICAgICAgICAgICB7Li4udGhlYWRGaWx0ZXJUclByb3BzLnJlc3R9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHt2aXNpYmxlQ29sdW1ucy5tYXAobWFrZUZpbHRlcil9XHJcbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxyXG4gICAgICAgIDwvVGhlYWRDb21wb25lbnQ+XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYWtlUGFnZVJvdyA9IChyb3csIGksIHBhdGggPSBbXSkgPT4ge1xyXG4gICAgICBjb25zdCByb3dJbmZvID0ge1xyXG4gICAgICAgIG9yaWdpbmFsOiByb3dbb3JpZ2luYWxLZXldLFxyXG4gICAgICAgIHJvdyxcclxuICAgICAgICBpbmRleDogcm93W2luZGV4S2V5XSxcclxuICAgICAgICB2aWV3SW5kZXg6IChyb3dJbmRleCArPSAxKSxcclxuICAgICAgICBwYWdlU2l6ZSxcclxuICAgICAgICBwYWdlLFxyXG4gICAgICAgIGxldmVsOiBwYXRoLmxlbmd0aCxcclxuICAgICAgICBuZXN0aW5nUGF0aDogcGF0aC5jb25jYXQoWyBpIF0pLFxyXG4gICAgICAgIGFnZ3JlZ2F0ZWQ6IHJvd1thZ2dyZWdhdGVkS2V5XSxcclxuICAgICAgICBncm91cGVkQnlQaXZvdDogcm93W2dyb3VwZWRCeVBpdm90S2V5XSxcclxuICAgICAgICBzdWJSb3dzOiByb3dbc3ViUm93c0tleV0sXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaXNFeHBhbmRlZCA9IF8uZ2V0KGV4cGFuZGVkLCByb3dJbmZvLm5lc3RpbmdQYXRoKVxyXG4gICAgICBjb25zdCB0ckdyb3VwUHJvcHMgPSBnZXRUckdyb3VwUHJvcHMoZmluYWxTdGF0ZSwgcm93SW5mbywgdW5kZWZpbmVkLCB0aGlzKVxyXG4gICAgICBjb25zdCB0clByb3BzID0gXy5zcGxpdFByb3BzKGdldFRyUHJvcHMoZmluYWxTdGF0ZSwgcm93SW5mbywgdW5kZWZpbmVkLCB0aGlzKSlcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VHJHcm91cENvbXBvbmVudCBrZXk9e3Jvd0luZm8ubmVzdGluZ1BhdGguam9pbignXycpfSB7Li4udHJHcm91cFByb3BzfT5cclxuICAgICAgICAgIDxUckNvbXBvbmVudFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXModHJQcm9wcy5jbGFzc05hbWUsIHJvdy5fdmlld0luZGV4ICUgMiA/ICctZXZlbicgOiAnLW9kZCcpfVxyXG4gICAgICAgICAgICBzdHlsZT17dHJQcm9wcy5zdHlsZX1cclxuICAgICAgICAgICAgey4uLnRyUHJvcHMucmVzdH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3Zpc2libGVDb2x1bW5zLm1hcCgoY29sdW1uLCBpMikgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJlc2l6ZWRDb2wgPSByZXNpemVkLmZpbmQoKHgpID0+IHguaWQgPT09IGNvbHVtbi5pZCkgfHwge31cclxuICAgICAgICAgICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XHJcbiAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkQ29sLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcclxuICAgICAgICAgICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxyXG4gICAgICAgICAgICAgIGNvbnN0IHRkUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGRQcm9wcyhmaW5hbFN0YXRlLCByb3dJbmZvLCBjb2x1bW4sIHRoaXMpKVxyXG4gICAgICAgICAgICAgIGNvbnN0IGNvbHVtblByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRQcm9wcyhmaW5hbFN0YXRlLCByb3dJbmZvLCBjb2x1bW4sIHRoaXMpKVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gWyB0ZFByb3BzLmNsYXNzTmFtZSwgY29sdW1uLmNsYXNzTmFtZSwgY29sdW1uUHJvcHMuY2xhc3NOYW1lIF1cclxuXHJcbiAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICAgICAgICAgICAgLi4udGRQcm9wcy5zdHlsZSxcclxuICAgICAgICAgICAgICAgIC4uLmNvbHVtbi5zdHlsZSxcclxuICAgICAgICAgICAgICAgIC4uLmNvbHVtblByb3BzLnN0eWxlLFxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgY29uc3QgY2VsbEluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICAuLi5yb3dJbmZvLFxyXG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZCxcclxuICAgICAgICAgICAgICAgIGNvbHVtbjogeyAuLi5jb2x1bW4gfSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiByb3dJbmZvLnJvd1tjb2x1bW4uaWRdLFxyXG4gICAgICAgICAgICAgICAgcGl2b3RlZDogY29sdW1uLnBpdm90ZWQsXHJcbiAgICAgICAgICAgICAgICBleHBhbmRlcjogY29sdW1uLmV4cGFuZGVyLFxyXG4gICAgICAgICAgICAgICAgcmVzaXplZCxcclxuICAgICAgICAgICAgICAgIHNob3csXHJcbiAgICAgICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGRQcm9wcyxcclxuICAgICAgICAgICAgICAgIGNvbHVtblByb3BzLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NlcyxcclxuICAgICAgICAgICAgICAgIHN0eWxlcyxcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2VsbEluZm8udmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgbGV0IHVzZU9uRXhwYW5kZXJDbGlja1xyXG4gICAgICAgICAgICAgIGxldCBpc0JyYW5jaFxyXG4gICAgICAgICAgICAgIGxldCBpc1ByZXZpZXdcclxuXHJcbiAgICAgICAgICAgICAgY29uc3Qgb25FeHBhbmRlckNsaWNrID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdFeHBhbmRlZCA9IF8uY2xvbmUoZXhwYW5kZWQpXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNFeHBhbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICBuZXdFeHBhbmRlZCA9IF8uc2V0KG5ld0V4cGFuZGVkLCBjZWxsSW5mby5uZXN0aW5nUGF0aCwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBuZXdFeHBhbmRlZCA9IF8uc2V0KG5ld0V4cGFuZGVkLCBjZWxsSW5mby5uZXN0aW5nUGF0aCwge30pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiBuZXdFeHBhbmRlZCxcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgKCkgPT4gb25FeHBhbmRlZENoYW5nZSAmJiBvbkV4cGFuZGVkQ2hhbmdlKG5ld0V4cGFuZGVkLCBjZWxsSW5mby5uZXN0aW5nUGF0aCwgZSksXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIGEgc3RhbmRhcmQgY2VsbFxyXG4gICAgICAgICAgICAgIGxldCByZXNvbHZlZENlbGwgPSBfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2x1bW4uQ2VsbCwgY2VsbEluZm8sIHZhbHVlKVxyXG5cclxuICAgICAgICAgICAgICAvLyBSZXNvbHZlIFJlbmRlcmVyc1xyXG4gICAgICAgICAgICAgIGNvbnN0IFJlc29sdmVkQWdncmVnYXRlZENvbXBvbmVudCA9XHJcbiAgICAgICAgICAgICAgICBjb2x1bW4uQWdncmVnYXRlZCB8fCAoIWNvbHVtbi5hZ2dyZWdhdGUgPyBBZ2dyZWdhdGVkQ29tcG9uZW50IDogY29sdW1uLkNlbGwpXHJcbiAgICAgICAgICAgICAgY29uc3QgUmVzb2x2ZWRFeHBhbmRlckNvbXBvbmVudCA9IGNvbHVtbi5FeHBhbmRlciB8fCBFeHBhbmRlckNvbXBvbmVudFxyXG4gICAgICAgICAgICAgIGNvbnN0IFJlc29sdmVkUGl2b3RWYWx1ZUNvbXBvbmVudCA9IGNvbHVtbi5QaXZvdFZhbHVlIHx8IFBpdm90VmFsdWVDb21wb25lbnRcclxuICAgICAgICAgICAgICBjb25zdCBEZWZhdWx0UmVzb2x2ZWRQaXZvdENvbXBvbmVudCA9XHJcbiAgICAgICAgICAgICAgICBQaXZvdENvbXBvbmVudCB8fFxyXG4gICAgICAgICAgICAgICAgKChwcm9wcykgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxSZXNvbHZlZEV4cGFuZGVyQ29tcG9uZW50IHsuLi5wcm9wc30gLz5cclxuICAgICAgICAgICAgICAgICAgICA8UmVzb2x2ZWRQaXZvdFZhbHVlQ29tcG9uZW50IHsuLi5wcm9wc30gLz5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgICAgIGNvbnN0IFJlc29sdmVkUGl2b3RDb21wb25lbnQgPSBjb2x1bW4uUGl2b3QgfHwgRGVmYXVsdFJlc29sdmVkUGl2b3RDb21wb25lbnRcclxuXHJcbiAgICAgICAgICAgICAgLy8gSXMgdGhpcyBjZWxsIGV4cGFuZGFibGU/XHJcbiAgICAgICAgICAgICAgaWYgKGNlbGxJbmZvLnBpdm90ZWQgfHwgY2VsbEluZm8uZXhwYW5kZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIE1ha2UgaXQgZXhwYW5kYWJsZSBieSBkZWZ1YWx0XHJcbiAgICAgICAgICAgICAgICBjZWxsSW5mby5leHBhbmRhYmxlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdXNlT25FeHBhbmRlckNsaWNrID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy8gSWYgcGl2b3RlZCwgaGFzIG5vIHN1YlJvd3MsIGFuZCBkb2VzIG5vdCBoYXZlIGEgc3ViQ29tcG9uZW50LFxyXG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IG1ha2UgZXhwYW5kYWJsZVxyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxJbmZvLnBpdm90ZWQgJiYgIWNlbGxJbmZvLnN1YlJvd3MgJiYgIVN1YkNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICBjZWxsSW5mby5leHBhbmRhYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChjZWxsSW5mby5waXZvdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJcyB0aGlzIGNvbHVtbiBhIGJyYW5jaD9cclxuICAgICAgICAgICAgICAgIGlzQnJhbmNoID0gcm93SW5mby5yb3dbcGl2b3RJREtleV0gPT09IGNvbHVtbi5pZCAmJiBjZWxsSW5mby5zdWJSb3dzXHJcbiAgICAgICAgICAgICAgICAvLyBTaG91bGQgdGhpcyBjb2x1bW4gYmUgYmxhbms/XHJcbiAgICAgICAgICAgICAgICBpc1ByZXZpZXcgPSBwaXZvdEJ5LmluZGV4T2YoY29sdW1uLmlkKSA+IHBpdm90QnkuaW5kZXhPZihyb3dJbmZvLnJvd1twaXZvdElES2V5XSkgJiYgY2VsbEluZm8uc3ViUm93c1xyXG4gICAgICAgICAgICAgICAgLy8gUGl2b3QgQ2VsbCBSZW5kZXIgT3ZlcnJpZGVcclxuICAgICAgICAgICAgICAgIGlmIChpc0JyYW5jaCkge1xyXG4gICAgICAgICAgICAgICAgICAvLyBpc1Bpdm90XHJcbiAgICAgICAgICAgICAgICAgIHJlc29sdmVkQ2VsbCA9IF8ubm9ybWFsaXplQ29tcG9uZW50KFxyXG4gICAgICAgICAgICAgICAgICAgIFJlc29sdmVkUGl2b3RDb21wb25lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgLi4uY2VsbEluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93W3Bpdm90VmFsS2V5XSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd1twaXZvdFZhbEtleV0sXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNQcmV2aWV3KSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIFNob3cgdGhlIHBpdm90IHByZXZpZXdcclxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRDZWxsID0gXy5ub3JtYWxpemVDb21wb25lbnQoUmVzb2x2ZWRBZ2dyZWdhdGVkQ29tcG9uZW50LCBjZWxsSW5mbywgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsSW5mby5hZ2dyZWdhdGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBfLm5vcm1hbGl6ZUNvbXBvbmVudChSZXNvbHZlZEFnZ3JlZ2F0ZWRDb21wb25lbnQsIGNlbGxJbmZvLCB2YWx1ZSlcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChjZWxsSW5mby5leHBhbmRlcikge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRDZWxsID0gXy5ub3JtYWxpemVDb21wb25lbnQoUmVzb2x2ZWRFeHBhbmRlckNvbXBvbmVudCwgY2VsbEluZm8sIHJvd1twaXZvdFZhbEtleV0pXHJcbiAgICAgICAgICAgICAgICBpZiAocGl2b3RCeSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoY2VsbEluZm8uZ3JvdXBlZEJ5UGl2b3QpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaWYgKCFjZWxsSW5mby5zdWJSb3dzICYmICFTdWJDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkT25FeHBhbmRlckNsaWNrID0gdXNlT25FeHBhbmRlckNsaWNrID8gb25FeHBhbmRlckNsaWNrIDogKCkgPT4ge31cclxuXHJcbiAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG11bHRpcGxlIG9uQ2xpY2sgZXZlbnRzLCBtYWtlIHN1cmUgdGhleSBkb24ndFxyXG4gICAgICAgICAgICAgIC8vIG92ZXJyaWRlIGVhY2hvdGhlci4gVGhpcyBzaG91bGQgbWF5YmUgYmUgZXhwYW5kZWQgdG8gaGFuZGxlIGFsbFxyXG4gICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgICBjb25zdCBpbnRlcmFjdGlvblByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgb25DbGljazogcmVzb2x2ZWRPbkV4cGFuZGVyQ2xpY2ssXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAodGRQcm9wcy5yZXN0Lm9uQ2xpY2spIHtcclxuICAgICAgICAgICAgICAgIGludGVyYWN0aW9uUHJvcHMub25DbGljayA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRkUHJvcHMucmVzdC5vbkNsaWNrKGUsICgpID0+IHJlc29sdmVkT25FeHBhbmRlckNsaWNrKGUpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKGNvbHVtblByb3BzLnJlc3Qub25DbGljaykge1xyXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpb25Qcm9wcy5vbkNsaWNrID0gKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29sdW1uUHJvcHMucmVzdC5vbkNsaWNrKGUsICgpID0+IHJlc29sdmVkT25FeHBhbmRlckNsaWNrKGUpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBjZWxsXHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxUZENvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XHJcbiAgICAgICAgICAgICAgICAgIGtleT17YCR7aTJ9LSR7Y29sdW1uLmlkfWB9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLFxyXG4gICAgICAgICAgICAgICAgICAgICFjZWxsSW5mby5leHBhbmRhYmxlICYmICFzaG93ICYmICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxJbmZvLmV4cGFuZGFibGUgJiYgJ3J0LWV4cGFuZGFibGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIChpc0JyYW5jaCB8fCBpc1ByZXZpZXcpICYmICdydC1waXZvdCcsXHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBfLmFzUHgod2lkdGgpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiBfLmFzUHgobWF4V2lkdGgpLFxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICB7Li4udGRQcm9wcy5yZXN0fVxyXG4gICAgICAgICAgICAgICAgICB7Li4uY29sdW1uUHJvcHMucmVzdH1cclxuICAgICAgICAgICAgICAgICAgey4uLmludGVyYWN0aW9uUHJvcHN9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtyZXNvbHZlZENlbGx9XHJcbiAgICAgICAgICAgICAgICA8L1RkQ29tcG9uZW50PlxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxyXG4gICAgICAgICAge3Jvd0luZm8uc3ViUm93cyAmJlxyXG4gICAgICAgICAgICBpc0V4cGFuZGVkICYmXHJcbiAgICAgICAgICAgICFmdW5jdGlvbmFsUm93UmVuZGVyaW5nICYmXHJcbiAgICAgICAgICAgIHJvd0luZm8uc3ViUm93cy5tYXAoKGQsIGkpID0+IG1ha2VQYWdlUm93KGQsIGksIHJvd0luZm8ubmVzdGluZ1BhdGgpKX1cclxuICAgICAgICAgIHtTdWJDb21wb25lbnQgJiZcclxuICAgICAgICAgICAgIXJvd0luZm8uc3ViUm93cyAmJlxyXG4gICAgICAgICAgICBpc0V4cGFuZGVkICYmXHJcbiAgICAgICAgICAgIFN1YkNvbXBvbmVudChyb3dJbmZvLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgbmV3RXhwYW5kZWQgPSBfLmNsb25lKGV4cGFuZGVkKVxyXG5cclxuICAgICAgICAgICAgICBfLnNldChuZXdFeHBhbmRlZCwgY2VsbEluZm8ubmVzdGluZ1BhdGgsIGZhbHNlKVxyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICA8L1RyR3JvdXBDb21wb25lbnQ+XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYWtlUGFkQ29sdW1uID0gKGNvbHVtbiwgaSkgPT4ge1xyXG4gICAgICBjb25zdCByZXNpemVkQ29sID0gcmVzaXplZC5maW5kKCh4KSA9PiB4LmlkID09PSBjb2x1bW4uaWQpIHx8IHt9XHJcbiAgICAgIGNvbnN0IHNob3cgPSB0eXBlb2YgY29sdW1uLnNob3cgPT09ICdmdW5jdGlvbicgPyBjb2x1bW4uc2hvdygpIDogY29sdW1uLnNob3dcclxuICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkQ29sLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcclxuICAgICAgY29uc3QgZmxleCA9IHdpZHRoXHJcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXHJcbiAgICAgIGNvbnN0IHRkUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXHJcbiAgICAgIGNvbnN0IGNvbHVtblByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXHJcblxyXG4gICAgICBjb25zdCBjbGFzc2VzID0gWyB0ZFByb3BzLmNsYXNzTmFtZSwgY29sdW1uLmNsYXNzTmFtZSwgY29sdW1uUHJvcHMuY2xhc3NOYW1lIF1cclxuXHJcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICAuLi50ZFByb3BzLnN0eWxlLFxyXG4gICAgICAgIC4uLmNvbHVtbi5zdHlsZSxcclxuICAgICAgICAuLi5jb2x1bW5Qcm9wcy5zdHlsZSxcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGRDb21wb25lbnRcclxuICAgICAgICAgIGtleT17YCR7aX0tJHtjb2x1bW4uaWR9YH1cclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjbGFzc2VzLCAhc2hvdyAmJiAnaGlkZGVuJyl9XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAuLi5zdHlsZXMsXHJcbiAgICAgICAgICAgIGZsZXg6IGAke2ZsZXh9IDAgYXV0b2AsXHJcbiAgICAgICAgICAgIHdpZHRoOiBfLmFzUHgod2lkdGgpLFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogXy5hc1B4KG1heFdpZHRoKSxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgICB7Li4udGRQcm9wcy5yZXN0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChQYWRSb3dDb21wb25lbnQpfVxyXG4gICAgICAgIDwvVGRDb21wb25lbnQ+XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYWtlUGFkUm93ID0gKHJvdywgaSkgPT4ge1xyXG4gICAgICBjb25zdCB0ckdyb3VwUHJvcHMgPSBnZXRUckdyb3VwUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXHJcbiAgICAgIGNvbnN0IHRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRyR3JvdXBDb21wb25lbnQga2V5PXtgcGFkLSR7aX1gfSB7Li4udHJHcm91cFByb3BzfT5cclxuICAgICAgICAgIDxUckNvbXBvbmVudFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1wYWRSb3cnLCAocGFnZVJvd3MubGVuZ3RoICsgaSkgJSAyID8gJy1ldmVuJyA6ICctb2RkJywgdHJQcm9wcy5jbGFzc05hbWUpfVxyXG4gICAgICAgICAgICBzdHlsZT17dHJQcm9wcy5zdHlsZSB8fCB7fX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3Zpc2libGVDb2x1bW5zLm1hcChtYWtlUGFkQ29sdW1uKX1cclxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XHJcbiAgICAgICAgPC9Uckdyb3VwQ29tcG9uZW50PlxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFrZUNvbHVtbkZvb3RlciA9IChjb2x1bW4sIGkpID0+IHtcclxuICAgICAgY29uc3QgcmVzaXplZENvbCA9IHJlc2l6ZWQuZmluZCgoeCkgPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxyXG4gICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XHJcbiAgICAgIGNvbnN0IHdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWluV2lkdGgpXHJcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXHJcbiAgICAgIGNvbnN0IHRGb290VGRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZm9vdFRkUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICBjb25zdCBjb2x1bW5Qcm9wcyA9IF8uc3BsaXRQcm9wcyhjb2x1bW4uZ2V0UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxyXG4gICAgICBjb25zdCBjb2x1bW5Gb290ZXJQcm9wcyA9IF8uc3BsaXRQcm9wcyhjb2x1bW4uZ2V0Rm9vdGVyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpKVxyXG5cclxuICAgICAgY29uc3QgY2xhc3NlcyA9IFsgdEZvb3RUZFByb3BzLmNsYXNzTmFtZSwgY29sdW1uLmNsYXNzTmFtZSwgY29sdW1uUHJvcHMuY2xhc3NOYW1lLCBjb2x1bW5Gb290ZXJQcm9wcy5jbGFzc05hbWUgXVxyXG5cclxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICAgIC4uLnRGb290VGRQcm9wcy5zdHlsZSxcclxuICAgICAgICAuLi5jb2x1bW4uc3R5bGUsXHJcbiAgICAgICAgLi4uY29sdW1uUHJvcHMuc3R5bGUsXHJcbiAgICAgICAgLi4uY29sdW1uRm9vdGVyUHJvcHMuc3R5bGUsXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPFRkQ29tcG9uZW50XHJcbiAgICAgICAgICBrZXk9e2Ake2l9LSR7Y29sdW1uLmlkfWB9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoY2xhc3NlcywgIXNob3cgJiYgJ2hpZGRlbicpfVxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgLi4uc3R5bGVzLFxyXG4gICAgICAgICAgICBmbGV4OiBgJHt3aWR0aH0gMCBhdXRvYCxcclxuICAgICAgICAgICAgd2lkdGg6IF8uYXNQeCh3aWR0aCksXHJcbiAgICAgICAgICAgIG1heFdpZHRoOiBfLmFzUHgobWF4V2lkdGgpLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIHsuLi5jb2x1bW5Qcm9wcy5yZXN0fVxyXG4gICAgICAgICAgey4uLnRGb290VGRQcm9wcy5yZXN0fVxyXG4gICAgICAgICAgey4uLmNvbHVtbkZvb3RlclByb3BzLnJlc3R9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5Gb290ZXIsIHtcclxuICAgICAgICAgICAgZGF0YTogc29ydGVkRGF0YSxcclxuICAgICAgICAgICAgY29sdW1uLFxyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9UZENvbXBvbmVudD5cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ha2VDb2x1bW5Gb290ZXJzID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB0Rm9vdFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRmb290UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICBjb25zdCB0Rm9vdFRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGZvb3RUclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8VGZvb3RDb21wb25lbnRcclxuICAgICAgICAgIGNsYXNzTmFtZT17dEZvb3RQcm9wcy5jbGFzc05hbWV9XHJcbiAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAuLi50Rm9vdFByb3BzLnN0eWxlLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIHsuLi50Rm9vdFByb3BzLnJlc3R9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPFRyQ29tcG9uZW50IGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0Rm9vdFRyUHJvcHMuY2xhc3NOYW1lKX0gc3R5bGU9e3RGb290VHJQcm9wcy5zdHlsZX0gey4uLnRGb290VHJQcm9wcy5yZXN0fT5cclxuICAgICAgICAgICAge3Zpc2libGVDb2x1bW5zLm1hcChtYWtlQ29sdW1uRm9vdGVyKX1cclxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XHJcbiAgICAgICAgPC9UZm9vdENvbXBvbmVudD5cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1ha2VQYWdpbmF0aW9uID0gKGlzVG9wKSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhZ2luYXRpb25Qcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRQYWdpbmF0aW9uUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxQYWdpbmF0aW9uQ29tcG9uZW50XHJcbiAgICAgICAgICB7Li4ucmVzb2x2ZWRTdGF0ZX1cclxuICAgICAgICAgIHBhZ2VzPXtwYWdlc31cclxuICAgICAgICAgIGNhblByZXZpb3VzPXtjYW5QcmV2aW91c31cclxuICAgICAgICAgIGNhbk5leHQ9e2Nhbk5leHR9XHJcbiAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMub25QYWdlQ2hhbmdlfVxyXG4gICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZT17dGhpcy5vblBhZ2VTaXplQ2hhbmdlfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtwYWdpbmF0aW9uUHJvcHMuY2xhc3NOYW1lfVxyXG4gICAgICAgICAgc3R5bGU9e3BhZ2luYXRpb25Qcm9wcy5zdHlsZX1cclxuICAgICAgICAgIGlzVG9wPXtpc1RvcH1cclxuICAgICAgICAgIHsuLi5wYWdpbmF0aW9uUHJvcHMucmVzdH1cclxuICAgICAgICAvPlxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFrZVRhYmxlID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB0Ym9keUNoaWxkcmVuID0gZnVuY3Rpb25hbFJvd1JlbmRlcmluZ1xyXG4gICAgICAgID8gbWFrZVBhZ2VSb3dcclxuICAgICAgICA6IFsgLi4ucGFnZVJvd3MubWFwKChkLCBpKSA9PiBtYWtlUGFnZVJvdyhkLCBpKSksIC4uLnBhZFJvd3MubWFwKG1ha2VQYWRSb3cpIF1cclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdSZWFjdFRhYmxlJywgY2xhc3NOYW1lLCByb290UHJvcHMuY2xhc3NOYW1lKX1cclxuICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLnN0eWxlLFxyXG4gICAgICAgICAgICAuLi5yb290UHJvcHMuc3R5bGUsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgey4uLnJvb3RQcm9wcy5yZXN0fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtzaG93UGFnaW5hdGlvbiAmJiBzaG93UGFnaW5hdGlvblRvcCA/IDxkaXYgY2xhc3NOYW1lPVwicGFnaW5hdGlvbi10b3BcIj57bWFrZVBhZ2luYXRpb24odHJ1ZSl9PC9kaXY+IDogbnVsbH1cclxuICAgICAgICAgIDxUYWJsZUNvbXBvbmVudFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXModGFibGVQcm9wcy5jbGFzc05hbWUsIGN1cnJlbnRseVJlc2l6aW5nID8gJ3J0LXJlc2l6aW5nJyA6ICcnKX1cclxuICAgICAgICAgICAgc3R5bGU9e3RhYmxlUHJvcHMuc3R5bGV9XHJcbiAgICAgICAgICAgIHsuLi50YWJsZVByb3BzLnJlc3R9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtoYXNIZWFkZXJHcm91cHMgPyBoZWFkZXJHcm91cHMubWFwKG1ha2VIZWFkZXJHcm91cHMpIDogbnVsbH1cclxuICAgICAgICAgICAge21ha2VIZWFkZXJzKCl9XHJcbiAgICAgICAgICAgIHtoYXNGaWx0ZXJzID8gbWFrZUZpbHRlcnMoKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDxUYm9keUNvbXBvbmVudFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0Qm9keVByb3BzLmNsYXNzTmFtZSl9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIC4uLnRCb2R5UHJvcHMuc3R5bGUsXHJcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgey4uLnRCb2R5UHJvcHMucmVzdH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHt0Ym9keUNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L1Rib2R5Q29tcG9uZW50PlxyXG4gICAgICAgICAgICB7aGFzQ29sdW1uRm9vdGVyID8gbWFrZUNvbHVtbkZvb3RlcnMoKSA6IG51bGx9XHJcbiAgICAgICAgICA8L1RhYmxlQ29tcG9uZW50PlxyXG4gICAgICAgICAge3Nob3dQYWdpbmF0aW9uICYmIHNob3dQYWdpbmF0aW9uQm90dG9tID8gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2luYXRpb24tYm90dG9tXCI+e21ha2VQYWdpbmF0aW9uKGZhbHNlKX08L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgeyFwYWdlUm93cy5sZW5ndGggJiYgPE5vRGF0YUNvbXBvbmVudCB7Li4ubm9EYXRhUHJvcHN9PntfLm5vcm1hbGl6ZUNvbXBvbmVudChub0RhdGFUZXh0KX08L05vRGF0YUNvbXBvbmVudD59XHJcbiAgICAgICAgICA8TG9hZGluZ0NvbXBvbmVudCBsb2FkaW5nPXtsb2FkaW5nfSBsb2FkaW5nVGV4dD17bG9hZGluZ1RleHR9IHsuLi5sb2FkaW5nUHJvcHN9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGlsZFByb3BzIGFyZSBvcHRpb25hbGx5IHBhc3NlZCB0byBhIGZ1bmN0aW9uLWFzLWEtY2hpbGRcclxuICAgIHJldHVybiBjaGlsZHJlbiA/IGNoaWxkcmVuKGZpbmFsU3RhdGUsIG1ha2VUYWJsZSwgdGhpcykgOiBtYWtlVGFibGUoKVxyXG4gIH1cclxufVxyXG4iXX0=