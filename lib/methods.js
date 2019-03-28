'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, _utils2.default.compactObject(this.state), _utils2.default.compactObject(this.props), _utils2.default.compactObject(state), _utils2.default.compactObject(props));
        return resolvedState;
      }
    }, {
      key: 'getDataModel',
      value: function getDataModel(newState, dataChanged) {
        var _this2 = this;

        var columns = newState.columns,
            _newState$pivotBy = newState.pivotBy,
            pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy,
            data = newState.data,
            resolveData = newState.resolveData,
            pivotIDKey = newState.pivotIDKey,
            pivotValKey = newState.pivotValKey,
            subRowsKey = newState.subRowsKey,
            aggregatedKey = newState.aggregatedKey,
            nestingLevelKey = newState.nestingLevelKey,
            originalKey = newState.originalKey,
            indexKey = newState.indexKey,
            groupedByPivotKey = newState.groupedByPivotKey,
            SubComponent = newState.SubComponent;

        // Determine if there are Header Groups

        var hasHeaderGroups = columns.some(function (column) {
          return column.columns;
        });

        // Find the expander column which could be deep in tree of columns
        var allColumns = _utils2.default.iterTree(columns, 'columns');
        var expanderColumn = _utils2.default.getFirstDefined(allColumns);

        // If we have SubComponent's we need to make sure we have an expander column
        var hasSubComponentAndNoExpanderColumn = SubComponent && !expanderColumn;
        var columnsWithExpander = hasSubComponentAndNoExpanderColumn ? [{ expander: true }].concat(_toConsumableArray(columns)) : [].concat(_toConsumableArray(columns));

        var makeDecoratedColumn = function makeDecoratedColumn(column, parentColumn) {
          var dcol = void 0;
          if (column.expander) {
            dcol = _extends({}, _this2.props.column, _this2.props.expanderDefaults, column);
          } else {
            dcol = _extends({}, _this2.props.column, _this2.props.column, column);
          }

          // Ensure minWidth is not greater than maxWidth if set
          if (dcol.maxWidth < dcol.minWidth) {
            dcol.minWidth = dcol.maxWidth;
          }

          if (parentColumn) {
            dcol.parentColumn = parentColumn;
          }

          // First check for string accessor
          if (typeof dcol.accessor === 'string') {
            dcol.id = dcol.id || dcol.accessor;
            var accessorString = dcol.accessor;
            dcol.accessor = function (row) {
              return _utils2.default.get(row, accessorString);
            };
            return dcol;
          }

          // Fall back to functional accessor (but require an ID)
          if (dcol.accessor && !dcol.id) {
            console.warn(dcol);
            throw new Error('A column id is required if using a non-string accessor for column above.');
          }

          // Fall back to an undefined accessor
          if (!dcol.accessor) {
            dcol.accessor = function () {
              return undefined;
            };
          }

          return dcol;
        };

        var allDecoratedColumns = [];

        // Decorate the columns
        var decorateAndAddToAll = function decorateAndAddToAll(columns, parentColumn) {
          return columns.map(function (column) {
            var decoratedColumn = makeDecoratedColumn(column, parentColumn);
            if (column.columns) {
              decoratedColumn.columns = decorateAndAddToAll(column.columns, column);
            }

            allDecoratedColumns.push(decoratedColumn);
            return decoratedColumn;
          });
        };

        var decoratedColumns = decorateAndAddToAll(columnsWithExpander);
        var mapVisibleColumns = function mapVisibleColumns(columns) {
          return columns.map(function (column) {
            if (column.columns) {
              var visibleSubColumns = column.columns.filter(function (d) {
                return pivotBy.indexOf(d.id) > -1 ? false : _utils2.default.getFirstDefined(d.show, true);
              });
              return _extends({}, column, {
                columns: mapVisibleColumns(visibleSubColumns)
              });
            }
            return column;
          });
        };

        var filterVisibleColumns = function filterVisibleColumns(columns) {
          return columns.filter(function (column) {
            return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils2.default.getFirstDefined(column.show, true);
          });
        };

        // Build the full array of visible columns - this is an array that contains all columns that
        // are not hidden via pivoting
        var allVisibleColumns = filterVisibleColumns(mapVisibleColumns(decoratedColumns.slice()));

        // Find any custom pivot location
        var pivotIndex = allVisibleColumns.findIndex(function (col) {
          return col.pivot;
        });

        // Handle Pivot Columns
        if (pivotBy.length) {
          // Retrieve the pivot columns in the correct pivot order
          var pivotColumns = [];
          pivotBy.forEach(function (pivotID) {
            var found = allDecoratedColumns.find(function (d) {
              return d.id === pivotID;
            });
            if (found) {
              pivotColumns.push(found);
            }
          });

          var PivotParentColumn = pivotColumns.reduce(function (prev, current) {
            return prev && prev === current.parentColumn && current.parentColumn;
          }, pivotColumns[0].parentColumn);

          var PivotGroupHeader = hasHeaderGroups && PivotParentColumn.Header;
          PivotGroupHeader = PivotGroupHeader || function () {
            return _react2.default.createElement(
              'strong',
              null,
              'Pivoted'
            );
          };

          var pivotColumnGroup = {
            Header: PivotGroupHeader,
            columns: pivotColumns.map(function (col) {
              return _extends({}, _this2.props.pivotDefaults, col, {
                pivoted: true
              });
            })

            // Place the pivotColumns back into the visibleColumns
          };if (pivotIndex >= 0) {
            pivotColumnGroup = _extends({}, allVisibleColumns[pivotIndex], pivotColumnGroup);
            allVisibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
          } else {
            allVisibleColumns.unshift(pivotColumnGroup);
          }
        }

        // Build Visible Columns and Header Groups
        var allColumnHeaders = [];

        var addHeader = function addHeader(column) {
          var level = 0;

          // If this column has children, push them first and add this column to the next level
          if (column.columns) {
            var childLevels = column.columns.map(addHeader);
            level = Math.max.apply(Math, _toConsumableArray(childLevels)) + 1;
          }

          // Add spans above columns without parents (orphans) to fill the space above them
          if (allColumnHeaders.length <= level) allColumnHeaders.push([]);
          if (level > 0) {
            // The spans need to contain the shifted headers as children. This finds all of the
            // columns in the lower level between the first child of this column and the last child
            // of the preceding column (if there is one)
            var lowerLevel = allColumnHeaders[level - 1];
            var precedingColumn = _utils2.default.last(allColumnHeaders[level]);

            var indexOfFirstChildInLowerLevel = lowerLevel.indexOf(column.columns[0]);
            var indexAfterLastChildInPrecedingColumn = precedingColumn ? lowerLevel.indexOf(_utils2.default.last(precedingColumn.columns)) + 1 : 0;

            // If there are ophans, add a span above them
            var orphans = lowerLevel.slice(indexAfterLastChildInPrecedingColumn, indexOfFirstChildInLowerLevel);

            if (orphans.length) {
              allColumnHeaders[level].push(_extends({}, _this2.props.column, {
                columns: orphans
              }));
            }
          }

          allColumnHeaders[level].push(column);

          return level;
        };

        allVisibleColumns.forEach(addHeader);

        // visibleColumns is an array containing column definitions for the bottom row of TH elements
        var visibleColumns = allColumnHeaders.shift();
        var headerGroups = allColumnHeaders.reverse();

        // Access the data
        var accessRow = function accessRow(d, i) {
          var _row;

          var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          var row = (_row = {}, _defineProperty(_row, originalKey, d), _defineProperty(_row, indexKey, i), _defineProperty(_row, subRowsKey, d[subRowsKey]), _defineProperty(_row, nestingLevelKey, level), _row);
          allDecoratedColumns.forEach(function (column) {
            if (column.expander) return;
            row[column.id] = column.accessor(d);
          });
          if (row[subRowsKey]) {
            row[subRowsKey] = row[subRowsKey].map(function (d, i) {
              return accessRow(d, i, level + 1);
            });
          }
          return row;
        };

        // // If the data hasn't changed, just use the cached data
        var resolvedData = this.resolvedData;
        // If the data has changed, run the data resolver and cache the result
        if (!this.resolvedData || dataChanged) {
          resolvedData = resolveData(data);
          this.resolvedData = resolvedData;
        }
        // Use the resolved data
        resolvedData = resolvedData.map(function (d, i) {
          return accessRow(d, i);
        });

        // TODO: Make it possible to fabricate nested rows without pivoting
        var aggregatingColumns = visibleColumns.filter(function (d) {
          return !d.expander && d.aggregate;
        });

        // If pivoting, recursively group the data
        var aggregate = function aggregate(rows) {
          var aggregationValues = {};
          aggregatingColumns.forEach(function (column) {
            var values = rows.map(function (d) {
              return d[column.id];
            });
            aggregationValues[column.id] = column.aggregate(values, rows);
          });
          return aggregationValues;
        };
        if (pivotBy.length) {
          var groupRecursively = function groupRecursively(rows, keys) {
            var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            // This is the last level, just return the rows
            if (i === keys.length) {
              return rows;
            }
            // Group the rows together for this level
            var groupedRows = Object.entries(_utils2.default.groupBy(rows, keys[i])).map(function (_ref) {
              var _ref3;

              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _defineProperty(_ref3, nestingLevelKey, i), _defineProperty(_ref3, groupedByPivotKey, true), _ref3;
            });
            // Recurse into the subRows
            groupedRows = groupedRows.map(function (rowGroup) {
              var _extends2;

              var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
              return _extends({}, rowGroup, (_extends2 = {}, _defineProperty(_extends2, subRowsKey, subRows), _defineProperty(_extends2, aggregatedKey, true), _extends2), aggregate(subRows));
            });
            return groupedRows;
          };
          resolvedData = groupRecursively(resolvedData, pivotBy);
        }

        return _extends({}, newState, {
          resolvedData: resolvedData,
          visibleColumns: visibleColumns,
          headerGroups: headerGroups,
          allDecoratedColumns: allDecoratedColumns,
          hasHeaderGroups: hasHeaderGroups
        });
      }
    }, {
      key: 'getSortedData',
      value: function getSortedData(resolvedState) {
        var manual = resolvedState.manual,
            sorted = resolvedState.sorted,
            filtered = resolvedState.filtered,
            defaultFilterMethod = resolvedState.defaultFilterMethod,
            resolvedData = resolvedState.resolvedData,
            visibleColumns = resolvedState.visibleColumns,
            allDecoratedColumns = resolvedState.allDecoratedColumns;


        var sortMethodsByColumnID = {};

        allDecoratedColumns.filter(function (col) {
          return col.sortMethod;
        }).forEach(function (col) {
          sortMethodsByColumnID[col.id] = col.sortMethod;
        });

        // Resolve the data from either manual data or sorted data
        return {
          sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, filtered, defaultFilterMethod, allDecoratedColumns), sorted, sortMethodsByColumnID)
        };
      }
    }, {
      key: 'fireFetchData',
      value: function fireFetchData() {
        // determine the current state, preferring certain state values over props
        var currentState = _extends({}, this.getResolvedState(), {
          page: this.getStateOrProp('page'),
          pageSize: this.getStateOrProp('pageSize'),
          filter: this.getStateOrProp('filter')
        });

        this.props.onFetchData(currentState, this);
      }
    }, {
      key: 'getPropOrState',
      value: function getPropOrState(key) {
        return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
      }
    }, {
      key: 'filterData',
      value: function filterData(data, filtered, defaultFilterMethod, visibleColumns) {
        var _this3 = this;

        var filteredData = data;

        if (filtered.length) {
          filteredData = filtered.reduce(function (filteredSoFar, nextFilter) {
            var column = visibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });

            // Don't filter hidden columns or columns that have had their filters disabled
            if (!column || column.filterable === false) {
              return filteredSoFar;
            }

            var filterMethod = column.filterMethod || defaultFilterMethod;

            // If 'filterAll' is set to true, pass the entire dataset to the filter method
            if (column.filterAll) {
              return filterMethod(nextFilter, filteredSoFar, column);
            }
            return filteredSoFar.filter(function (row) {
              return filterMethod(nextFilter, row, column);
            });
          }, filteredData);

          // Apply the filter to the subrows if we are pivoting, and then
          // filter any rows without subcolumns because it would be strange to show
          filteredData = filteredData.map(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return row;
            }
            return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.filterData(row[_this3.props.subRowsKey], filtered, defaultFilterMethod, visibleColumns)));
          }).filter(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return true;
            }
            return row[_this3.props.subRowsKey].length > 0;
          });
        }

        return filteredData;
      }
    }, {
      key: 'sortData',
      value: function sortData(data, sorted) {
        var _this4 = this;

        var sortMethodsByColumnID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!sorted.length) {
          return data;
        }

        var sortedData = (this.props.orderByMethod || _utils2.default.orderBy)(data, sorted.map(function (sort) {
          // Support custom sorting methods for each column
          if (sortMethodsByColumnID[sort.id]) {
            return function (a, b) {
              return sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id], sort.desc);
            };
          }
          return function (a, b) {
            return _this4.props.defaultSortMethod(a[sort.id], b[sort.id], sort.desc);
          };
        }), sorted.map(function (d) {
          return !d.desc;
        }), this.props.indexKey);

        sortedData.forEach(function (row) {
          if (!row[_this4.props.subRowsKey]) {
            return;
          }
          row[_this4.props.subRowsKey] = _this4.sortData(row[_this4.props.subRowsKey], sorted, sortMethodsByColumnID);
        });

        return sortedData;
      }
    }, {
      key: 'getMinRows',
      value: function getMinRows() {
        return _utils2.default.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
      }

      // User actions

    }, {
      key: 'onPageChange',
      value: function onPageChange(page) {
        var _props = this.props,
            onPageChange = _props.onPageChange,
            collapseOnPageChange = _props.collapseOnPageChange;


        var newState = { page: page };
        if (collapseOnPageChange) {
          newState.expanded = {};
        }
        this.setStateWithData(newState, function () {
          return onPageChange && onPageChange(page);
        });
      }
    }, {
      key: 'onPageSizeChange',
      value: function onPageSizeChange(newPageSize) {
        var onPageSizeChange = this.props.onPageSizeChange;

        var _getResolvedState = this.getResolvedState(),
            pageSize = _getResolvedState.pageSize,
            page = _getResolvedState.page;

        // Normalize the page to display


        var currentRow = pageSize * page;
        var newPage = Math.floor(currentRow / newPageSize);

        this.setStateWithData({
          pageSize: newPageSize,
          page: newPage
        }, function () {
          return onPageSizeChange && onPageSizeChange(newPageSize, newPage);
        });
      }
    }, {
      key: 'sortColumn',
      value: function sortColumn(column, additive) {
        var _getResolvedState2 = this.getResolvedState(),
            sorted = _getResolvedState2.sorted,
            skipNextSort = _getResolvedState2.skipNextSort,
            defaultSortDesc = _getResolvedState2.defaultSortDesc;

        var firstSortDirection = Object.prototype.hasOwnProperty.call(column, 'defaultSortDesc') ? column.defaultSortDesc : defaultSortDesc;
        var secondSortDirection = !firstSortDirection;

        // we can't stop event propagation from the column resize move handlers
        // attached to the document because of react's synthetic events
        // so we have to prevent the sort function from actually sorting
        // if we click on the column resize element within a header.
        if (skipNextSort) {
          this.setStateWithData({
            skipNextSort: false
          });
          return;
        }

        var onSortedChange = this.props.onSortedChange;


        var newSorted = _utils2.default.clone(sorted || []).map(function (d) {
          d.desc = _utils2.default.isSortingDesc(d);
          return d;
        });
        if (!_utils2.default.isArray(column)) {
          // Single-Sort
          var existingIndex = newSorted.findIndex(function (d) {
            return d.id === column.id;
          });
          if (existingIndex > -1) {
            var existing = newSorted[existingIndex];
            if (existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(existingIndex, 1);
              } else {
                existing.desc = firstSortDirection;
                newSorted = [existing];
              }
            } else {
              existing.desc = secondSortDirection;
              if (!additive) {
                newSorted = [existing];
              }
            }
          } else if (additive) {
            newSorted.push({
              id: column.id,
              desc: firstSortDirection
            });
          } else {
            newSorted = [{
              id: column.id,
              desc: firstSortDirection
            }];
          }
        } else {
          // Multi-Sort
          var _existingIndex = newSorted.findIndex(function (d) {
            return d.id === column[0].id;
          });
          // Existing Sorted Column
          if (_existingIndex > -1) {
            var _existing = newSorted[_existingIndex];
            if (_existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(_existingIndex, column.length);
              } else {
                column.forEach(function (d, i) {
                  newSorted[_existingIndex + i].desc = firstSortDirection;
                });
              }
            } else {
              column.forEach(function (d, i) {
                newSorted[_existingIndex + i].desc = secondSortDirection;
              });
            }
            if (!additive) {
              newSorted = newSorted.slice(_existingIndex, column.length);
            }
            // New Sort Column
          } else if (additive) {
            newSorted = newSorted.concat(column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            }));
          } else {
            newSorted = column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            });
          }
        }

        this.setStateWithData({
          page: !sorted.length && newSorted.length || !additive ? 0 : this.state.page,
          sorted: newSorted
        }, function () {
          return onSortedChange && onSortedChange(newSorted, column, additive);
        });
      }
    }, {
      key: 'filterColumn',
      value: function filterColumn(column, value) {
        var _getResolvedState3 = this.getResolvedState(),
            filtered = _getResolvedState3.filtered;

        var onFilteredChange = this.props.onFilteredChange;

        // Remove old filter first if it exists

        var newFiltering = (filtered || []).filter(function (x) {
          return x.id !== column.id;
        });

        if (value !== '') {
          newFiltering.push({
            id: column.id,
            value: value
          });
        }

        this.setStateWithData({
          filtered: newFiltering
        }, function () {
          return onFilteredChange && onFilteredChange(newFiltering, column, value);
        });
      }
    }, {
      key: 'resizeColumnStart',
      value: function resizeColumnStart(event, column, isTouch) {
        var _this5 = this;

        event.stopPropagation();
        var parentWidth = event.target.parentElement.getBoundingClientRect().width;

        var pageX = void 0;
        if (isTouch) {
          pageX = event.changedTouches[0].pageX;
        } else {
          pageX = event.pageX;
        }

        this.trapEvents = true;
        this.setStateWithData({
          currentlyResizing: {
            id: column.id,
            startX: pageX,
            parentWidth: parentWidth
          }
        }, function () {
          if (isTouch) {
            document.addEventListener('touchmove', _this5.resizeColumnMoving);
            document.addEventListener('touchcancel', _this5.resizeColumnEnd);
            document.addEventListener('touchend', _this5.resizeColumnEnd);
          } else {
            document.addEventListener('mousemove', _this5.resizeColumnMoving);
            document.addEventListener('mouseup', _this5.resizeColumnEnd);
            document.addEventListener('mouseleave', _this5.resizeColumnEnd);
          }
        });
      }
    }, {
      key: 'resizeColumnMoving',
      value: function resizeColumnMoving(event) {
        event.stopPropagation();
        var _props2 = this.props,
            onResizedChange = _props2.onResizedChange,
            column = _props2.column;

        var _getResolvedState4 = this.getResolvedState(),
            resized = _getResolvedState4.resized,
            currentlyResizing = _getResolvedState4.currentlyResizing,
            columns = _getResolvedState4.columns;

        var currentColumn = columns.find(function (c) {
          return c.accessor === currentlyResizing.id;
        });
        var minResizeWidth = currentColumn ? currentColumn.minResizeWidth : column.minResizeWidth;

        // Delete old value
        var newResized = resized.filter(function (x) {
          return x.id !== currentlyResizing.id;
        });

        var pageX = void 0;

        if (event.type === 'touchmove') {
          pageX = event.changedTouches[0].pageX;
        } else if (event.type === 'mousemove') {
          pageX = event.pageX;
        }

        var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, minResizeWidth);

        newResized.push({
          id: currentlyResizing.id,
          value: newWidth
        });

        this.setStateWithData({
          resized: newResized
        }, function () {
          return onResizedChange && onResizedChange(newResized, event);
        });
      }
    }, {
      key: 'resizeColumnEnd',
      value: function resizeColumnEnd(event) {
        event.stopPropagation();
        var isTouch = event.type === 'touchend' || event.type === 'touchcancel';

        if (isTouch) {
          document.removeEventListener('touchmove', this.resizeColumnMoving);
          document.removeEventListener('touchcancel', this.resizeColumnEnd);
          document.removeEventListener('touchend', this.resizeColumnEnd);
        }

        // If its a touch event clear the mouse one's as well because sometimes
        // the mouseDown event gets called as well, but the mouseUp event doesn't
        document.removeEventListener('mousemove', this.resizeColumnMoving);
        document.removeEventListener('mouseup', this.resizeColumnEnd);
        document.removeEventListener('mouseleave', this.resizeColumnEnd);

        // The touch events don't propagate up to the sorting's onMouseDown event so
        // no need to prevent it from happening or else the first click after a touch
        // event resize will not sort the column.
        if (!isTouch) {
          this.setStateWithData({
            skipNextSort: true,
            currentlyResizing: false
          });
        }
      }
    }]);

    return _class;
  }(Base);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbInByb3BzIiwic3RhdGUiLCJyZXNvbHZlZFN0YXRlIiwiXyIsImNvbXBhY3RPYmplY3QiLCJuZXdTdGF0ZSIsImRhdGFDaGFuZ2VkIiwiY29sdW1ucyIsInBpdm90QnkiLCJkYXRhIiwicmVzb2x2ZURhdGEiLCJwaXZvdElES2V5IiwicGl2b3RWYWxLZXkiLCJzdWJSb3dzS2V5IiwiYWdncmVnYXRlZEtleSIsIm5lc3RpbmdMZXZlbEtleSIsIm9yaWdpbmFsS2V5IiwiaW5kZXhLZXkiLCJncm91cGVkQnlQaXZvdEtleSIsIlN1YkNvbXBvbmVudCIsImhhc0hlYWRlckdyb3VwcyIsInNvbWUiLCJjb2x1bW4iLCJhbGxDb2x1bW5zIiwiaXRlclRyZWUiLCJleHBhbmRlckNvbHVtbiIsImdldEZpcnN0RGVmaW5lZCIsImhhc1N1YkNvbXBvbmVudEFuZE5vRXhwYW5kZXJDb2x1bW4iLCJjb2x1bW5zV2l0aEV4cGFuZGVyIiwiZXhwYW5kZXIiLCJtYWtlRGVjb3JhdGVkQ29sdW1uIiwicGFyZW50Q29sdW1uIiwiZGNvbCIsImV4cGFuZGVyRGVmYXVsdHMiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYWNjZXNzb3IiLCJpZCIsImFjY2Vzc29yU3RyaW5nIiwiZ2V0Iiwicm93IiwiY29uc29sZSIsIndhcm4iLCJFcnJvciIsInVuZGVmaW5lZCIsImFsbERlY29yYXRlZENvbHVtbnMiLCJkZWNvcmF0ZUFuZEFkZFRvQWxsIiwibWFwIiwiZGVjb3JhdGVkQ29sdW1uIiwicHVzaCIsImRlY29yYXRlZENvbHVtbnMiLCJtYXBWaXNpYmxlQ29sdW1ucyIsInZpc2libGVTdWJDb2x1bW5zIiwiZmlsdGVyIiwiaW5kZXhPZiIsImQiLCJzaG93IiwiZmlsdGVyVmlzaWJsZUNvbHVtbnMiLCJsZW5ndGgiLCJhbGxWaXNpYmxlQ29sdW1ucyIsInNsaWNlIiwicGl2b3RJbmRleCIsImZpbmRJbmRleCIsImNvbCIsInBpdm90IiwicGl2b3RDb2x1bW5zIiwiZm9yRWFjaCIsImZvdW5kIiwiZmluZCIsInBpdm90SUQiLCJQaXZvdFBhcmVudENvbHVtbiIsInJlZHVjZSIsInByZXYiLCJjdXJyZW50IiwiUGl2b3RHcm91cEhlYWRlciIsIkhlYWRlciIsInBpdm90Q29sdW1uR3JvdXAiLCJwaXZvdERlZmF1bHRzIiwicGl2b3RlZCIsInNwbGljZSIsInVuc2hpZnQiLCJhbGxDb2x1bW5IZWFkZXJzIiwiYWRkSGVhZGVyIiwibGV2ZWwiLCJjaGlsZExldmVscyIsIk1hdGgiLCJtYXgiLCJsb3dlckxldmVsIiwicHJlY2VkaW5nQ29sdW1uIiwibGFzdCIsImluZGV4T2ZGaXJzdENoaWxkSW5Mb3dlckxldmVsIiwiaW5kZXhBZnRlckxhc3RDaGlsZEluUHJlY2VkaW5nQ29sdW1uIiwib3JwaGFucyIsInZpc2libGVDb2x1bW5zIiwic2hpZnQiLCJoZWFkZXJHcm91cHMiLCJyZXZlcnNlIiwiYWNjZXNzUm93IiwiaSIsInJlc29sdmVkRGF0YSIsImFnZ3JlZ2F0aW5nQ29sdW1ucyIsImFnZ3JlZ2F0ZSIsImFnZ3JlZ2F0aW9uVmFsdWVzIiwidmFsdWVzIiwicm93cyIsImdyb3VwUmVjdXJzaXZlbHkiLCJrZXlzIiwiZ3JvdXBlZFJvd3MiLCJPYmplY3QiLCJlbnRyaWVzIiwiZ3JvdXBCeSIsImtleSIsInZhbHVlIiwic3ViUm93cyIsInJvd0dyb3VwIiwibWFudWFsIiwic29ydGVkIiwiZmlsdGVyZWQiLCJkZWZhdWx0RmlsdGVyTWV0aG9kIiwic29ydE1ldGhvZHNCeUNvbHVtbklEIiwic29ydE1ldGhvZCIsInNvcnRlZERhdGEiLCJzb3J0RGF0YSIsImZpbHRlckRhdGEiLCJjdXJyZW50U3RhdGUiLCJnZXRSZXNvbHZlZFN0YXRlIiwicGFnZSIsImdldFN0YXRlT3JQcm9wIiwicGFnZVNpemUiLCJvbkZldGNoRGF0YSIsImZpbHRlcmVkRGF0YSIsImZpbHRlcmVkU29GYXIiLCJuZXh0RmlsdGVyIiwieCIsImZpbHRlcmFibGUiLCJmaWx0ZXJNZXRob2QiLCJmaWx0ZXJBbGwiLCJvcmRlckJ5TWV0aG9kIiwib3JkZXJCeSIsInNvcnQiLCJhIiwiYiIsImRlc2MiLCJkZWZhdWx0U29ydE1ldGhvZCIsIm1pblJvd3MiLCJvblBhZ2VDaGFuZ2UiLCJjb2xsYXBzZU9uUGFnZUNoYW5nZSIsImV4cGFuZGVkIiwic2V0U3RhdGVXaXRoRGF0YSIsIm5ld1BhZ2VTaXplIiwib25QYWdlU2l6ZUNoYW5nZSIsImN1cnJlbnRSb3ciLCJuZXdQYWdlIiwiZmxvb3IiLCJhZGRpdGl2ZSIsInNraXBOZXh0U29ydCIsImRlZmF1bHRTb3J0RGVzYyIsImZpcnN0U29ydERpcmVjdGlvbiIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInNlY29uZFNvcnREaXJlY3Rpb24iLCJvblNvcnRlZENoYW5nZSIsIm5ld1NvcnRlZCIsImNsb25lIiwiaXNTb3J0aW5nRGVzYyIsImlzQXJyYXkiLCJleGlzdGluZ0luZGV4IiwiZXhpc3RpbmciLCJjb25jYXQiLCJvbkZpbHRlcmVkQ2hhbmdlIiwibmV3RmlsdGVyaW5nIiwiZXZlbnQiLCJpc1RvdWNoIiwic3RvcFByb3BhZ2F0aW9uIiwicGFyZW50V2lkdGgiLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJwYWdlWCIsImNoYW5nZWRUb3VjaGVzIiwidHJhcEV2ZW50cyIsImN1cnJlbnRseVJlc2l6aW5nIiwic3RhcnRYIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplQ29sdW1uTW92aW5nIiwicmVzaXplQ29sdW1uRW5kIiwib25SZXNpemVkQ2hhbmdlIiwicmVzaXplZCIsImN1cnJlbnRDb2x1bW4iLCJjIiwibWluUmVzaXplV2lkdGgiLCJuZXdSZXNpemVkIiwidHlwZSIsIm5ld1dpZHRoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkJhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7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dEIsT0FBSixFQUFhO0FBQ1hZLG1CQUFTWSxtQkFBVCxDQUE2QixXQUE3QixFQUEwQyxLQUFLVixrQkFBL0M7QUFDQUYsbUJBQVNZLG1CQUFULENBQTZCLGFBQTdCLEVBQTRDLEtBQUtULGVBQWpEO0FBQ0FILG1CQUFTWSxtQkFBVCxDQUE2QixVQUE3QixFQUF5QyxLQUFLVCxlQUE5QztBQUNEOztBQUVEO0FBQ0E7QUFDQUgsaUJBQVNZLG1CQUFULENBQTZCLFdBQTdCLEVBQTBDLEtBQUtWLGtCQUEvQztBQUNBRixpQkFBU1ksbUJBQVQsQ0FBNkIsU0FBN0IsRUFBd0MsS0FBS1QsZUFBN0M7QUFDQUgsaUJBQVNZLG1CQUFULENBQTZCLFlBQTdCLEVBQTJDLEtBQUtULGVBQWhEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUksQ0FBQ2YsT0FBTCxFQUFjO0FBQ1osZUFBS3pCLGdCQUFMLENBQXNCO0FBQ3BCTywwQkFBYyxJQURNO0FBRXBCNEIsK0JBQW1CO0FBRkMsV0FBdEI7QUFJRDtBQUNGO0FBL3FCVTs7QUFBQTtBQUFBLElBQ0NlLElBREQ7QUFBQSxDIiwiZmlsZSI6Im1ldGhvZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBfIGZyb20gJy4vdXRpbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBCYXNlID0+XHJcbiAgY2xhc3MgZXh0ZW5kcyBCYXNlIHtcclxuICAgIGdldFJlc29sdmVkU3RhdGUgKHByb3BzLCBzdGF0ZSkge1xyXG4gICAgICBjb25zdCByZXNvbHZlZFN0YXRlID0ge1xyXG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdCh0aGlzLnN0YXRlKSxcclxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3QodGhpcy5wcm9wcyksXHJcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHN0YXRlKSxcclxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3QocHJvcHMpLFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXNvbHZlZFN0YXRlXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0YU1vZGVsIChuZXdTdGF0ZSwgZGF0YUNoYW5nZWQpIHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIGNvbHVtbnMsXHJcbiAgICAgICAgcGl2b3RCeSA9IFtdLFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgcmVzb2x2ZURhdGEsXHJcbiAgICAgICAgcGl2b3RJREtleSxcclxuICAgICAgICBwaXZvdFZhbEtleSxcclxuICAgICAgICBzdWJSb3dzS2V5LFxyXG4gICAgICAgIGFnZ3JlZ2F0ZWRLZXksXHJcbiAgICAgICAgbmVzdGluZ0xldmVsS2V5LFxyXG4gICAgICAgIG9yaWdpbmFsS2V5LFxyXG4gICAgICAgIGluZGV4S2V5LFxyXG4gICAgICAgIGdyb3VwZWRCeVBpdm90S2V5LFxyXG4gICAgICAgIFN1YkNvbXBvbmVudCxcclxuICAgICAgfSA9IG5ld1N0YXRlXHJcblxyXG4gICAgICAvLyBEZXRlcm1pbmUgaWYgdGhlcmUgYXJlIEhlYWRlciBHcm91cHNcclxuICAgICAgY29uc3QgaGFzSGVhZGVyR3JvdXBzID0gY29sdW1ucy5zb21lKGNvbHVtbiA9PiBjb2x1bW4uY29sdW1ucylcclxuXHJcbiAgICAgIC8vIEZpbmQgdGhlIGV4cGFuZGVyIGNvbHVtbiB3aGljaCBjb3VsZCBiZSBkZWVwIGluIHRyZWUgb2YgY29sdW1uc1xyXG4gICAgICBjb25zdCBhbGxDb2x1bW5zID0gXy5pdGVyVHJlZShjb2x1bW5zLCAnY29sdW1ucycpXHJcbiAgICAgIGNvbnN0IGV4cGFuZGVyQ29sdW1uID0gXy5nZXRGaXJzdERlZmluZWQoYWxsQ29sdW1ucylcclxuXHJcbiAgICAgIC8vIElmIHdlIGhhdmUgU3ViQ29tcG9uZW50J3Mgd2UgbmVlZCB0byBtYWtlIHN1cmUgd2UgaGF2ZSBhbiBleHBhbmRlciBjb2x1bW5cclxuICAgICAgY29uc3QgaGFzU3ViQ29tcG9uZW50QW5kTm9FeHBhbmRlckNvbHVtbiA9IFN1YkNvbXBvbmVudCAmJiAhZXhwYW5kZXJDb2x1bW5cclxuICAgICAgY29uc3QgY29sdW1uc1dpdGhFeHBhbmRlciA9IGhhc1N1YkNvbXBvbmVudEFuZE5vRXhwYW5kZXJDb2x1bW5cclxuICAgICAgICA/IFt7IGV4cGFuZGVyOiB0cnVlIH0sIC4uLmNvbHVtbnNdXHJcbiAgICAgICAgOiBbLi4uY29sdW1uc11cclxuXHJcbiAgICAgIGNvbnN0IG1ha2VEZWNvcmF0ZWRDb2x1bW4gPSAoY29sdW1uLCBwYXJlbnRDb2x1bW4pID0+IHtcclxuICAgICAgICBsZXQgZGNvbFxyXG4gICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHtcclxuICAgICAgICAgIGRjb2wgPSB7XHJcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmV4cGFuZGVyRGVmYXVsdHMsXHJcbiAgICAgICAgICAgIC4uLmNvbHVtbixcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGNvbCA9IHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXHJcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxyXG4gICAgICAgICAgICAuLi5jb2x1bW4sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbnN1cmUgbWluV2lkdGggaXMgbm90IGdyZWF0ZXIgdGhhbiBtYXhXaWR0aCBpZiBzZXRcclxuICAgICAgICBpZiAoZGNvbC5tYXhXaWR0aCA8IGRjb2wubWluV2lkdGgpIHtcclxuICAgICAgICAgIGRjb2wubWluV2lkdGggPSBkY29sLm1heFdpZHRoXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyZW50Q29sdW1uKSB7XHJcbiAgICAgICAgICBkY29sLnBhcmVudENvbHVtbiA9IHBhcmVudENvbHVtblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgZm9yIHN0cmluZyBhY2Nlc3NvclxyXG4gICAgICAgIGlmICh0eXBlb2YgZGNvbC5hY2Nlc3NvciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGRjb2wuaWQgPSBkY29sLmlkIHx8IGRjb2wuYWNjZXNzb3JcclxuICAgICAgICAgIGNvbnN0IGFjY2Vzc29yU3RyaW5nID0gZGNvbC5hY2Nlc3NvclxyXG4gICAgICAgICAgZGNvbC5hY2Nlc3NvciA9IHJvdyA9PiBfLmdldChyb3csIGFjY2Vzc29yU3RyaW5nKVxyXG4gICAgICAgICAgcmV0dXJuIGRjb2xcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBmdW5jdGlvbmFsIGFjY2Vzc29yIChidXQgcmVxdWlyZSBhbiBJRClcclxuICAgICAgICBpZiAoZGNvbC5hY2Nlc3NvciAmJiAhZGNvbC5pZCkge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKGRjb2wpXHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICdBIGNvbHVtbiBpZCBpcyByZXF1aXJlZCBpZiB1c2luZyBhIG5vbi1zdHJpbmcgYWNjZXNzb3IgZm9yIGNvbHVtbiBhYm92ZS4nXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGYWxsIGJhY2sgdG8gYW4gdW5kZWZpbmVkIGFjY2Vzc29yXHJcbiAgICAgICAgaWYgKCFkY29sLmFjY2Vzc29yKSB7XHJcbiAgICAgICAgICBkY29sLmFjY2Vzc29yID0gKCkgPT4gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGNvbFxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhbGxEZWNvcmF0ZWRDb2x1bW5zID0gW11cclxuXHJcbiAgICAgIC8vIERlY29yYXRlIHRoZSBjb2x1bW5zXHJcbiAgICAgIGNvbnN0IGRlY29yYXRlQW5kQWRkVG9BbGwgPSAoY29sdW1ucywgcGFyZW50Q29sdW1uKSA9PiBjb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlY29yYXRlZENvbHVtbiA9IG1ha2VEZWNvcmF0ZWRDb2x1bW4oY29sdW1uLCBwYXJlbnRDb2x1bW4pXHJcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XHJcbiAgICAgICAgICBkZWNvcmF0ZWRDb2x1bW4uY29sdW1ucyA9IGRlY29yYXRlQW5kQWRkVG9BbGwoY29sdW1uLmNvbHVtbnMsIGNvbHVtbilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMucHVzaChkZWNvcmF0ZWRDb2x1bW4pXHJcbiAgICAgICAgcmV0dXJuIGRlY29yYXRlZENvbHVtblxyXG4gICAgICB9KVxyXG5cclxuICAgICAgY29uc3QgZGVjb3JhdGVkQ29sdW1ucyA9IGRlY29yYXRlQW5kQWRkVG9BbGwoY29sdW1uc1dpdGhFeHBhbmRlcilcclxuICAgICAgY29uc3QgbWFwVmlzaWJsZUNvbHVtbnMgPSBjb2x1bW5zID0+IGNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XHJcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XHJcbiAgICAgICAgICBjb25zdCB2aXNpYmxlU3ViQ29sdW1ucyA9IGNvbHVtbi5jb2x1bW5zLmZpbHRlcihcclxuICAgICAgICAgICAgZCA9PiAocGl2b3RCeS5pbmRleE9mKGQuaWQpID4gLTEgPyBmYWxzZSA6IF8uZ2V0Rmlyc3REZWZpbmVkKGQuc2hvdywgdHJ1ZSkpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5jb2x1bW4sXHJcbiAgICAgICAgICAgIGNvbHVtbnM6IG1hcFZpc2libGVDb2x1bW5zKHZpc2libGVTdWJDb2x1bW5zKSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtblxyXG4gICAgICB9KVxyXG5cclxuICAgICAgY29uc3QgZmlsdGVyVmlzaWJsZUNvbHVtbnMgPSBjb2x1bW5zID0+IGNvbHVtbnMuZmlsdGVyKFxyXG4gICAgICAgIGNvbHVtbiA9PlxyXG4gICAgICAgICAgY29sdW1uLmNvbHVtbnNcclxuICAgICAgICAgICAgPyBjb2x1bW4uY29sdW1ucy5sZW5ndGhcclxuICAgICAgICAgICAgOiBwaXZvdEJ5LmluZGV4T2YoY29sdW1uLmlkKSA+IC0xXHJcbiAgICAgICAgICAgICAgPyBmYWxzZVxyXG4gICAgICAgICAgICAgIDogXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLnNob3csIHRydWUpXHJcbiAgICAgIClcclxuXHJcbiAgICAgIC8vIEJ1aWxkIHRoZSBmdWxsIGFycmF5IG9mIHZpc2libGUgY29sdW1ucyAtIHRoaXMgaXMgYW4gYXJyYXkgdGhhdCBjb250YWlucyBhbGwgY29sdW1ucyB0aGF0XHJcbiAgICAgIC8vIGFyZSBub3QgaGlkZGVuIHZpYSBwaXZvdGluZ1xyXG4gICAgICBjb25zdCBhbGxWaXNpYmxlQ29sdW1ucyA9IGZpbHRlclZpc2libGVDb2x1bW5zKG1hcFZpc2libGVDb2x1bW5zKGRlY29yYXRlZENvbHVtbnMuc2xpY2UoKSkpXHJcblxyXG4gICAgICAvLyBGaW5kIGFueSBjdXN0b20gcGl2b3QgbG9jYXRpb25cclxuICAgICAgY29uc3QgcGl2b3RJbmRleCA9IGFsbFZpc2libGVDb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLnBpdm90KVxyXG5cclxuICAgICAgLy8gSGFuZGxlIFBpdm90IENvbHVtbnNcclxuICAgICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gUmV0cmlldmUgdGhlIHBpdm90IGNvbHVtbnMgaW4gdGhlIGNvcnJlY3QgcGl2b3Qgb3JkZXJcclxuICAgICAgICBjb25zdCBwaXZvdENvbHVtbnMgPSBbXVxyXG4gICAgICAgIHBpdm90QnkuZm9yRWFjaChwaXZvdElEID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZvdW5kID0gYWxsRGVjb3JhdGVkQ29sdW1ucy5maW5kKGQgPT4gZC5pZCA9PT0gcGl2b3RJRClcclxuICAgICAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgICAgICBwaXZvdENvbHVtbnMucHVzaChmb3VuZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBQaXZvdFBhcmVudENvbHVtbiA9IHBpdm90Q29sdW1ucy5yZWR1Y2UoXHJcbiAgICAgICAgICAocHJldiwgY3VycmVudCkgPT4gcHJldiAmJiBwcmV2ID09PSBjdXJyZW50LnBhcmVudENvbHVtbiAmJiBjdXJyZW50LnBhcmVudENvbHVtbixcclxuICAgICAgICAgIHBpdm90Q29sdW1uc1swXS5wYXJlbnRDb2x1bW5cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGxldCBQaXZvdEdyb3VwSGVhZGVyID0gaGFzSGVhZGVyR3JvdXBzICYmIFBpdm90UGFyZW50Q29sdW1uLkhlYWRlclxyXG4gICAgICAgIFBpdm90R3JvdXBIZWFkZXIgPSBQaXZvdEdyb3VwSGVhZGVyIHx8ICgoKSA9PiA8c3Ryb25nPlBpdm90ZWQ8L3N0cm9uZz4pXHJcblxyXG4gICAgICAgIGxldCBwaXZvdENvbHVtbkdyb3VwID0ge1xyXG4gICAgICAgICAgSGVhZGVyOiBQaXZvdEdyb3VwSGVhZGVyLFxyXG4gICAgICAgICAgY29sdW1uczogcGl2b3RDb2x1bW5zLm1hcChjb2wgPT4gKHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5waXZvdERlZmF1bHRzLFxyXG4gICAgICAgICAgICAuLi5jb2wsXHJcbiAgICAgICAgICAgIHBpdm90ZWQ6IHRydWUsXHJcbiAgICAgICAgICB9KSksXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQbGFjZSB0aGUgcGl2b3RDb2x1bW5zIGJhY2sgaW50byB0aGUgdmlzaWJsZUNvbHVtbnNcclxuICAgICAgICBpZiAocGl2b3RJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICBwaXZvdENvbHVtbkdyb3VwID0ge1xyXG4gICAgICAgICAgICAuLi5hbGxWaXNpYmxlQ29sdW1uc1twaXZvdEluZGV4XSxcclxuICAgICAgICAgICAgLi4ucGl2b3RDb2x1bW5Hcm91cCxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGFsbFZpc2libGVDb2x1bW5zLnNwbGljZShwaXZvdEluZGV4LCAxLCBwaXZvdENvbHVtbkdyb3VwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucy51bnNoaWZ0KHBpdm90Q29sdW1uR3JvdXApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBCdWlsZCBWaXNpYmxlIENvbHVtbnMgYW5kIEhlYWRlciBHcm91cHNcclxuICAgICAgY29uc3QgYWxsQ29sdW1uSGVhZGVycyA9IFtdXHJcblxyXG4gICAgICBjb25zdCBhZGRIZWFkZXIgPSBjb2x1bW4gPT4ge1xyXG4gICAgICAgIGxldCBsZXZlbCA9IDBcclxuXHJcbiAgICAgICAgLy8gSWYgdGhpcyBjb2x1bW4gaGFzIGNoaWxkcmVuLCBwdXNoIHRoZW0gZmlyc3QgYW5kIGFkZCB0aGlzIGNvbHVtbiB0byB0aGUgbmV4dCBsZXZlbFxyXG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xyXG4gICAgICAgICAgY29uc3QgY2hpbGRMZXZlbHMgPSBjb2x1bW4uY29sdW1ucy5tYXAoYWRkSGVhZGVyKVxyXG4gICAgICAgICAgbGV2ZWwgPSBNYXRoLm1heCguLi5jaGlsZExldmVscykgKyAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgc3BhbnMgYWJvdmUgY29sdW1ucyB3aXRob3V0IHBhcmVudHMgKG9ycGhhbnMpIHRvIGZpbGwgdGhlIHNwYWNlIGFib3ZlIHRoZW1cclxuICAgICAgICBpZiAoYWxsQ29sdW1uSGVhZGVycy5sZW5ndGggPD0gbGV2ZWwpIGFsbENvbHVtbkhlYWRlcnMucHVzaChbXSlcclxuICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgICAvLyBUaGUgc3BhbnMgbmVlZCB0byBjb250YWluIHRoZSBzaGlmdGVkIGhlYWRlcnMgYXMgY2hpbGRyZW4uIFRoaXMgZmluZHMgYWxsIG9mIHRoZVxyXG4gICAgICAgICAgLy8gY29sdW1ucyBpbiB0aGUgbG93ZXIgbGV2ZWwgYmV0d2VlbiB0aGUgZmlyc3QgY2hpbGQgb2YgdGhpcyBjb2x1bW4gYW5kIHRoZSBsYXN0IGNoaWxkXHJcbiAgICAgICAgICAvLyBvZiB0aGUgcHJlY2VkaW5nIGNvbHVtbiAoaWYgdGhlcmUgaXMgb25lKVxyXG4gICAgICAgICAgY29uc3QgbG93ZXJMZXZlbCA9IGFsbENvbHVtbkhlYWRlcnNbbGV2ZWwgLSAxXVxyXG4gICAgICAgICAgY29uc3QgcHJlY2VkaW5nQ29sdW1uID0gXy5sYXN0KGFsbENvbHVtbkhlYWRlcnNbbGV2ZWxdKVxyXG5cclxuICAgICAgICAgIGNvbnN0IGluZGV4T2ZGaXJzdENoaWxkSW5Mb3dlckxldmVsID0gbG93ZXJMZXZlbC5pbmRleE9mKGNvbHVtbi5jb2x1bW5zWzBdKVxyXG4gICAgICAgICAgY29uc3QgaW5kZXhBZnRlckxhc3RDaGlsZEluUHJlY2VkaW5nQ29sdW1uID0gcHJlY2VkaW5nQ29sdW1uXHJcbiAgICAgICAgICAgID8gbG93ZXJMZXZlbC5pbmRleE9mKF8ubGFzdChwcmVjZWRpbmdDb2x1bW4uY29sdW1ucykpICsgMVxyXG4gICAgICAgICAgICA6IDBcclxuXHJcbiAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgb3BoYW5zLCBhZGQgYSBzcGFuIGFib3ZlIHRoZW1cclxuICAgICAgICAgIGNvbnN0IG9ycGhhbnMgPSBsb3dlckxldmVsLnNsaWNlKFxyXG4gICAgICAgICAgICBpbmRleEFmdGVyTGFzdENoaWxkSW5QcmVjZWRpbmdDb2x1bW4sXHJcbiAgICAgICAgICAgIGluZGV4T2ZGaXJzdENoaWxkSW5Mb3dlckxldmVsXHJcbiAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgaWYgKG9ycGhhbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGFsbENvbHVtbkhlYWRlcnNbbGV2ZWxdLnB1c2goe1xyXG4gICAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxyXG4gICAgICAgICAgICAgIGNvbHVtbnM6IG9ycGhhbnMsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbGxDb2x1bW5IZWFkZXJzW2xldmVsXS5wdXNoKGNvbHVtbilcclxuXHJcbiAgICAgICAgcmV0dXJuIGxldmVsXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFsbFZpc2libGVDb2x1bW5zLmZvckVhY2goYWRkSGVhZGVyKVxyXG5cclxuICAgICAgLy8gdmlzaWJsZUNvbHVtbnMgaXMgYW4gYXJyYXkgY29udGFpbmluZyBjb2x1bW4gZGVmaW5pdGlvbnMgZm9yIHRoZSBib3R0b20gcm93IG9mIFRIIGVsZW1lbnRzXHJcbiAgICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gYWxsQ29sdW1uSGVhZGVycy5zaGlmdCgpXHJcbiAgICAgIGNvbnN0IGhlYWRlckdyb3VwcyA9IGFsbENvbHVtbkhlYWRlcnMucmV2ZXJzZSgpXHJcblxyXG4gICAgICAvLyBBY2Nlc3MgdGhlIGRhdGFcclxuICAgICAgY29uc3QgYWNjZXNzUm93ID0gKGQsIGksIGxldmVsID0gMCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IHtcclxuICAgICAgICAgIFtvcmlnaW5hbEtleV06IGQsXHJcbiAgICAgICAgICBbaW5kZXhLZXldOiBpLFxyXG4gICAgICAgICAgW3N1YlJvd3NLZXldOiBkW3N1YlJvd3NLZXldLFxyXG4gICAgICAgICAgW25lc3RpbmdMZXZlbEtleV06IGxldmVsLFxyXG4gICAgICAgIH1cclxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcclxuICAgICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHJldHVyblxyXG4gICAgICAgICAgcm93W2NvbHVtbi5pZF0gPSBjb2x1bW4uYWNjZXNzb3IoZClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyb3dbc3ViUm93c0tleV0pIHtcclxuICAgICAgICAgIHJvd1tzdWJSb3dzS2V5XSA9IHJvd1tzdWJSb3dzS2V5XS5tYXAoKGQsIGkpID0+IGFjY2Vzc1JvdyhkLCBpLCBsZXZlbCArIDEpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm93XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIC8vIElmIHRoZSBkYXRhIGhhc24ndCBjaGFuZ2VkLCBqdXN0IHVzZSB0aGUgY2FjaGVkIGRhdGFcclxuICAgICAgbGV0IHJlc29sdmVkRGF0YSA9IHRoaXMucmVzb2x2ZWREYXRhXHJcbiAgICAgIC8vIElmIHRoZSBkYXRhIGhhcyBjaGFuZ2VkLCBydW4gdGhlIGRhdGEgcmVzb2x2ZXIgYW5kIGNhY2hlIHRoZSByZXN1bHRcclxuICAgICAgaWYgKCF0aGlzLnJlc29sdmVkRGF0YSB8fCBkYXRhQ2hhbmdlZCkge1xyXG4gICAgICAgIHJlc29sdmVkRGF0YSA9IHJlc29sdmVEYXRhKGRhdGEpXHJcbiAgICAgICAgdGhpcy5yZXNvbHZlZERhdGEgPSByZXNvbHZlZERhdGFcclxuICAgICAgfVxyXG4gICAgICAvLyBVc2UgdGhlIHJlc29sdmVkIGRhdGFcclxuICAgICAgcmVzb2x2ZWREYXRhID0gcmVzb2x2ZWREYXRhLm1hcCgoZCwgaSkgPT4gYWNjZXNzUm93KGQsIGkpKVxyXG5cclxuICAgICAgLy8gVE9ETzogTWFrZSBpdCBwb3NzaWJsZSB0byBmYWJyaWNhdGUgbmVzdGVkIHJvd3Mgd2l0aG91dCBwaXZvdGluZ1xyXG4gICAgICBjb25zdCBhZ2dyZWdhdGluZ0NvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5maWx0ZXIoZCA9PiAhZC5leHBhbmRlciAmJiBkLmFnZ3JlZ2F0ZSlcclxuXHJcbiAgICAgIC8vIElmIHBpdm90aW5nLCByZWN1cnNpdmVseSBncm91cCB0aGUgZGF0YVxyXG4gICAgICBjb25zdCBhZ2dyZWdhdGUgPSByb3dzID0+IHtcclxuICAgICAgICBjb25zdCBhZ2dyZWdhdGlvblZhbHVlcyA9IHt9XHJcbiAgICAgICAgYWdncmVnYXRpbmdDb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcclxuICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHJvd3MubWFwKGQgPT4gZFtjb2x1bW4uaWRdKVxyXG4gICAgICAgICAgYWdncmVnYXRpb25WYWx1ZXNbY29sdW1uLmlkXSA9IGNvbHVtbi5hZ2dyZWdhdGUodmFsdWVzLCByb3dzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0aW9uVmFsdWVzXHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXBSZWN1cnNpdmVseSA9IChyb3dzLCBrZXlzLCBpID0gMCkgPT4ge1xyXG4gICAgICAgICAgLy8gVGhpcyBpcyB0aGUgbGFzdCBsZXZlbCwganVzdCByZXR1cm4gdGhlIHJvd3NcclxuICAgICAgICAgIGlmIChpID09PSBrZXlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcm93c1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gR3JvdXAgdGhlIHJvd3MgdG9nZXRoZXIgZm9yIHRoaXMgbGV2ZWxcclxuICAgICAgICAgIGxldCBncm91cGVkUm93cyA9IE9iamVjdC5lbnRyaWVzKF8uZ3JvdXBCeShyb3dzLCBrZXlzW2ldKSkubWFwKChba2V5LCB2YWx1ZV0pID0+ICh7XHJcbiAgICAgICAgICAgIFtwaXZvdElES2V5XToga2V5c1tpXSxcclxuICAgICAgICAgICAgW3Bpdm90VmFsS2V5XToga2V5LFxyXG4gICAgICAgICAgICBba2V5c1tpXV06IGtleSxcclxuICAgICAgICAgICAgW3N1YlJvd3NLZXldOiB2YWx1ZSxcclxuICAgICAgICAgICAgW25lc3RpbmdMZXZlbEtleV06IGksXHJcbiAgICAgICAgICAgIFtncm91cGVkQnlQaXZvdEtleV06IHRydWUsXHJcbiAgICAgICAgICB9KSlcclxuICAgICAgICAgIC8vIFJlY3Vyc2UgaW50byB0aGUgc3ViUm93c1xyXG4gICAgICAgICAgZ3JvdXBlZFJvd3MgPSBncm91cGVkUm93cy5tYXAocm93R3JvdXAgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzdWJSb3dzID0gZ3JvdXBSZWN1cnNpdmVseShyb3dHcm91cFtzdWJSb3dzS2V5XSwga2V5cywgaSArIDEpXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgLi4ucm93R3JvdXAsXHJcbiAgICAgICAgICAgICAgW3N1YlJvd3NLZXldOiBzdWJSb3dzLFxyXG4gICAgICAgICAgICAgIFthZ2dyZWdhdGVkS2V5XTogdHJ1ZSxcclxuICAgICAgICAgICAgICAuLi5hZ2dyZWdhdGUoc3ViUm93cyksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICByZXR1cm4gZ3JvdXBlZFJvd3NcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZWREYXRhID0gZ3JvdXBSZWN1cnNpdmVseShyZXNvbHZlZERhdGEsIHBpdm90QnkpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4ubmV3U3RhdGUsXHJcbiAgICAgICAgcmVzb2x2ZWREYXRhLFxyXG4gICAgICAgIHZpc2libGVDb2x1bW5zLFxyXG4gICAgICAgIGhlYWRlckdyb3VwcyxcclxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLFxyXG4gICAgICAgIGhhc0hlYWRlckdyb3VwcyxcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNvcnRlZERhdGEgKHJlc29sdmVkU3RhdGUpIHtcclxuICAgICAgY29uc3Qge1xyXG4gICAgICAgIG1hbnVhbCxcclxuICAgICAgICBzb3J0ZWQsXHJcbiAgICAgICAgZmlsdGVyZWQsXHJcbiAgICAgICAgZGVmYXVsdEZpbHRlck1ldGhvZCxcclxuICAgICAgICByZXNvbHZlZERhdGEsXHJcbiAgICAgICAgdmlzaWJsZUNvbHVtbnMsXHJcbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucyxcclxuICAgICAgfSA9IHJlc29sdmVkU3RhdGVcclxuXHJcbiAgICAgIGNvbnN0IHNvcnRNZXRob2RzQnlDb2x1bW5JRCA9IHt9XHJcblxyXG4gICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZpbHRlcihjb2wgPT4gY29sLnNvcnRNZXRob2QpLmZvckVhY2goY29sID0+IHtcclxuICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSURbY29sLmlkXSA9IGNvbC5zb3J0TWV0aG9kXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBSZXNvbHZlIHRoZSBkYXRhIGZyb20gZWl0aGVyIG1hbnVhbCBkYXRhIG9yIHNvcnRlZCBkYXRhXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc29ydGVkRGF0YTogbWFudWFsXHJcbiAgICAgICAgICA/IHJlc29sdmVkRGF0YVxyXG4gICAgICAgICAgOiB0aGlzLnNvcnREYXRhKFxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEocmVzb2x2ZWREYXRhLCBmaWx0ZXJlZCwgZGVmYXVsdEZpbHRlck1ldGhvZCwgYWxsRGVjb3JhdGVkQ29sdW1ucyksXHJcbiAgICAgICAgICAgIHNvcnRlZCxcclxuICAgICAgICAgICAgc29ydE1ldGhvZHNCeUNvbHVtbklEXHJcbiAgICAgICAgICApLFxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmlyZUZldGNoRGF0YSAoKSB7XHJcbiAgICAgIC8vIGRldGVybWluZSB0aGUgY3VycmVudCBzdGF0ZSwgcHJlZmVycmluZyBjZXJ0YWluIHN0YXRlIHZhbHVlcyBvdmVyIHByb3BzXHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHtcclxuICAgICAgICAuLi50aGlzLmdldFJlc29sdmVkU3RhdGUoKSxcclxuICAgICAgICBwYWdlOiB0aGlzLmdldFN0YXRlT3JQcm9wKCdwYWdlJyksXHJcbiAgICAgICAgcGFnZVNpemU6IHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJyksXHJcbiAgICAgICAgZmlsdGVyOiB0aGlzLmdldFN0YXRlT3JQcm9wKCdmaWx0ZXInKSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMucHJvcHMub25GZXRjaERhdGEoY3VycmVudFN0YXRlLCB0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFByb3BPclN0YXRlIChrZXkpIHtcclxuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMucHJvcHNba2V5XSwgdGhpcy5zdGF0ZVtrZXldKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0YXRlT3JQcm9wIChrZXkpIHtcclxuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMuc3RhdGVba2V5XSwgdGhpcy5wcm9wc1trZXldKVxyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckRhdGEgKGRhdGEsIGZpbHRlcmVkLCBkZWZhdWx0RmlsdGVyTWV0aG9kLCB2aXNpYmxlQ29sdW1ucykge1xyXG4gICAgICBsZXQgZmlsdGVyZWREYXRhID0gZGF0YVxyXG5cclxuICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCkge1xyXG4gICAgICAgIGZpbHRlcmVkRGF0YSA9IGZpbHRlcmVkLnJlZHVjZSgoZmlsdGVyZWRTb0ZhciwgbmV4dEZpbHRlcikgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY29sdW1uID0gdmlzaWJsZUNvbHVtbnMuZmluZCh4ID0+IHguaWQgPT09IG5leHRGaWx0ZXIuaWQpXHJcblxyXG4gICAgICAgICAgLy8gRG9uJ3QgZmlsdGVyIGhpZGRlbiBjb2x1bW5zIG9yIGNvbHVtbnMgdGhhdCBoYXZlIGhhZCB0aGVpciBmaWx0ZXJzIGRpc2FibGVkXHJcbiAgICAgICAgICBpZiAoIWNvbHVtbiB8fCBjb2x1bW4uZmlsdGVyYWJsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkU29GYXJcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBmaWx0ZXJNZXRob2QgPSBjb2x1bW4uZmlsdGVyTWV0aG9kIHx8IGRlZmF1bHRGaWx0ZXJNZXRob2RcclxuXHJcbiAgICAgICAgICAvLyBJZiAnZmlsdGVyQWxsJyBpcyBzZXQgdG8gdHJ1ZSwgcGFzcyB0aGUgZW50aXJlIGRhdGFzZXQgdG8gdGhlIGZpbHRlciBtZXRob2RcclxuICAgICAgICAgIGlmIChjb2x1bW4uZmlsdGVyQWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJNZXRob2QobmV4dEZpbHRlciwgZmlsdGVyZWRTb0ZhciwgY29sdW1uKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkU29GYXIuZmlsdGVyKHJvdyA9PiBmaWx0ZXJNZXRob2QobmV4dEZpbHRlciwgcm93LCBjb2x1bW4pKVxyXG4gICAgICAgIH0sIGZpbHRlcmVkRGF0YSlcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgdGhlIGZpbHRlciB0byB0aGUgc3Vicm93cyBpZiB3ZSBhcmUgcGl2b3RpbmcsIGFuZCB0aGVuXHJcbiAgICAgICAgLy8gZmlsdGVyIGFueSByb3dzIHdpdGhvdXQgc3ViY29sdW1ucyBiZWNhdXNlIGl0IHdvdWxkIGJlIHN0cmFuZ2UgdG8gc2hvd1xyXG4gICAgICAgIGZpbHRlcmVkRGF0YSA9IGZpbHRlcmVkRGF0YVxyXG4gICAgICAgICAgLm1hcChyb3cgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJvd1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgLi4ucm93LFxyXG4gICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN1YlJvd3NLZXldOiB0aGlzLmZpbHRlckRhdGEoXHJcbiAgICAgICAgICAgICAgICByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSxcclxuICAgICAgICAgICAgICAgIGZpbHRlcmVkLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEZpbHRlck1ldGhvZCxcclxuICAgICAgICAgICAgICAgIHZpc2libGVDb2x1bW5zXHJcbiAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5maWx0ZXIocm93ID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLmxlbmd0aCA+IDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBmaWx0ZXJlZERhdGFcclxuICAgIH1cclxuXHJcbiAgICBzb3J0RGF0YSAoZGF0YSwgc29ydGVkLCBzb3J0TWV0aG9kc0J5Q29sdW1uSUQgPSB7fSkge1xyXG4gICAgICBpZiAoIXNvcnRlZC5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzb3J0ZWREYXRhID0gKHRoaXMucHJvcHMub3JkZXJCeU1ldGhvZCB8fCBfLm9yZGVyQnkpKFxyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgc29ydGVkLm1hcChzb3J0ID0+IHtcclxuICAgICAgICAgIC8vIFN1cHBvcnQgY3VzdG9tIHNvcnRpbmcgbWV0aG9kcyBmb3IgZWFjaCBjb2x1bW5cclxuICAgICAgICAgIGlmIChzb3J0TWV0aG9kc0J5Q29sdW1uSURbc29ydC5pZF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBzb3J0TWV0aG9kc0J5Q29sdW1uSURbc29ydC5pZF0oYVtzb3J0LmlkXSwgYltzb3J0LmlkXSwgc29ydC5kZXNjKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIChhLCBiKSA9PiB0aGlzLnByb3BzLmRlZmF1bHRTb3J0TWV0aG9kKGFbc29ydC5pZF0sIGJbc29ydC5pZF0sIHNvcnQuZGVzYylcclxuICAgICAgICB9KSxcclxuICAgICAgICBzb3J0ZWQubWFwKGQgPT4gIWQuZGVzYyksXHJcbiAgICAgICAgdGhpcy5wcm9wcy5pbmRleEtleVxyXG4gICAgICApXHJcblxyXG4gICAgICBzb3J0ZWREYXRhLmZvckVhY2gocm93ID0+IHtcclxuICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0gPSB0aGlzLnNvcnREYXRhKFxyXG4gICAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0sXHJcbiAgICAgICAgICBzb3J0ZWQsXHJcbiAgICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSURcclxuICAgICAgICApXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICByZXR1cm4gc29ydGVkRGF0YVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1pblJvd3MgKCkge1xyXG4gICAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5wcm9wcy5taW5Sb3dzLCB0aGlzLmdldFN0YXRlT3JQcm9wKCdwYWdlU2l6ZScpKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFVzZXIgYWN0aW9uc1xyXG4gICAgb25QYWdlQ2hhbmdlIChwYWdlKSB7XHJcbiAgICAgIGNvbnN0IHsgb25QYWdlQ2hhbmdlLCBjb2xsYXBzZU9uUGFnZUNoYW5nZSB9ID0gdGhpcy5wcm9wc1xyXG5cclxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7IHBhZ2UgfVxyXG4gICAgICBpZiAoY29sbGFwc2VPblBhZ2VDaGFuZ2UpIHtcclxuICAgICAgICBuZXdTdGF0ZS5leHBhbmRlZCA9IHt9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKG5ld1N0YXRlLCAoKSA9PiBvblBhZ2VDaGFuZ2UgJiYgb25QYWdlQ2hhbmdlKHBhZ2UpKVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZVNpemVDaGFuZ2UgKG5ld1BhZ2VTaXplKSB7XHJcbiAgICAgIGNvbnN0IHsgb25QYWdlU2l6ZUNoYW5nZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgICBjb25zdCB7IHBhZ2VTaXplLCBwYWdlIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxyXG5cclxuICAgICAgLy8gTm9ybWFsaXplIHRoZSBwYWdlIHRvIGRpc3BsYXlcclxuICAgICAgY29uc3QgY3VycmVudFJvdyA9IHBhZ2VTaXplICogcGFnZVxyXG4gICAgICBjb25zdCBuZXdQYWdlID0gTWF0aC5mbG9vcihjdXJyZW50Um93IC8gbmV3UGFnZVNpemUpXHJcblxyXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFnZVNpemU6IG5ld1BhZ2VTaXplLFxyXG4gICAgICAgICAgcGFnZTogbmV3UGFnZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IG9uUGFnZVNpemVDaGFuZ2UgJiYgb25QYWdlU2l6ZUNoYW5nZShuZXdQYWdlU2l6ZSwgbmV3UGFnZSlcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHNvcnRDb2x1bW4gKGNvbHVtbiwgYWRkaXRpdmUpIHtcclxuICAgICAgY29uc3QgeyBzb3J0ZWQsIHNraXBOZXh0U29ydCwgZGVmYXVsdFNvcnREZXNjIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxyXG5cclxuICAgICAgY29uc3QgZmlyc3RTb3J0RGlyZWN0aW9uID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbHVtbiwgJ2RlZmF1bHRTb3J0RGVzYycpXHJcbiAgICAgICAgPyBjb2x1bW4uZGVmYXVsdFNvcnREZXNjXHJcbiAgICAgICAgOiBkZWZhdWx0U29ydERlc2NcclxuICAgICAgY29uc3Qgc2Vjb25kU29ydERpcmVjdGlvbiA9ICFmaXJzdFNvcnREaXJlY3Rpb25cclxuXHJcbiAgICAgIC8vIHdlIGNhbid0IHN0b3AgZXZlbnQgcHJvcGFnYXRpb24gZnJvbSB0aGUgY29sdW1uIHJlc2l6ZSBtb3ZlIGhhbmRsZXJzXHJcbiAgICAgIC8vIGF0dGFjaGVkIHRvIHRoZSBkb2N1bWVudCBiZWNhdXNlIG9mIHJlYWN0J3Mgc3ludGhldGljIGV2ZW50c1xyXG4gICAgICAvLyBzbyB3ZSBoYXZlIHRvIHByZXZlbnQgdGhlIHNvcnQgZnVuY3Rpb24gZnJvbSBhY3R1YWxseSBzb3J0aW5nXHJcbiAgICAgIC8vIGlmIHdlIGNsaWNrIG9uIHRoZSBjb2x1bW4gcmVzaXplIGVsZW1lbnQgd2l0aGluIGEgaGVhZGVyLlxyXG4gICAgICBpZiAoc2tpcE5leHRTb3J0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcclxuICAgICAgICAgIHNraXBOZXh0U29ydDogZmFsc2UsXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgeyBvblNvcnRlZENoYW5nZSB9ID0gdGhpcy5wcm9wc1xyXG5cclxuICAgICAgbGV0IG5ld1NvcnRlZCA9IF8uY2xvbmUoc29ydGVkIHx8IFtdKS5tYXAoZCA9PiB7XHJcbiAgICAgICAgZC5kZXNjID0gXy5pc1NvcnRpbmdEZXNjKGQpXHJcbiAgICAgICAgcmV0dXJuIGRcclxuICAgICAgfSlcclxuICAgICAgaWYgKCFfLmlzQXJyYXkoY29sdW1uKSkge1xyXG4gICAgICAgIC8vIFNpbmdsZS1Tb3J0XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IG5ld1NvcnRlZC5maW5kSW5kZXgoZCA9PiBkLmlkID09PSBjb2x1bW4uaWQpXHJcbiAgICAgICAgaWYgKGV4aXN0aW5nSW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBuZXdTb3J0ZWRbZXhpc3RpbmdJbmRleF1cclxuICAgICAgICAgIGlmIChleGlzdGluZy5kZXNjID09PSBzZWNvbmRTb3J0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChhZGRpdGl2ZSkge1xyXG4gICAgICAgICAgICAgIG5ld1NvcnRlZC5zcGxpY2UoZXhpc3RpbmdJbmRleCwgMSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBleGlzdGluZy5kZXNjID0gZmlyc3RTb3J0RGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgbmV3U29ydGVkID0gW2V4aXN0aW5nXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBleGlzdGluZy5kZXNjID0gc2Vjb25kU29ydERpcmVjdGlvblxyXG4gICAgICAgICAgICBpZiAoIWFkZGl0aXZlKSB7XHJcbiAgICAgICAgICAgICAgbmV3U29ydGVkID0gW2V4aXN0aW5nXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChhZGRpdGl2ZSkge1xyXG4gICAgICAgICAgbmV3U29ydGVkLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogY29sdW1uLmlkLFxyXG4gICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXdTb3J0ZWQgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogY29sdW1uLmlkLFxyXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gTXVsdGktU29ydFxyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBuZXdTb3J0ZWQuZmluZEluZGV4KGQgPT4gZC5pZCA9PT0gY29sdW1uWzBdLmlkKVxyXG4gICAgICAgIC8vIEV4aXN0aW5nIFNvcnRlZCBDb2x1bW5cclxuICAgICAgICBpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRlZFtleGlzdGluZ0luZGV4XVxyXG4gICAgICAgICAgaWYgKGV4aXN0aW5nLmRlc2MgPT09IHNlY29uZFNvcnREaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKGFkZGl0aXZlKSB7XHJcbiAgICAgICAgICAgICAgbmV3U29ydGVkLnNwbGljZShleGlzdGluZ0luZGV4LCBjb2x1bW4ubGVuZ3RoKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZXdTb3J0ZWRbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSBmaXJzdFNvcnREaXJlY3Rpb25cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb2x1bW4uZm9yRWFjaCgoZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgIG5ld1NvcnRlZFtleGlzdGluZ0luZGV4ICsgaV0uZGVzYyA9IHNlY29uZFNvcnREaXJlY3Rpb25cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcclxuICAgICAgICAgICAgbmV3U29ydGVkID0gbmV3U29ydGVkLnNsaWNlKGV4aXN0aW5nSW5kZXgsIGNvbHVtbi5sZW5ndGgpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBOZXcgU29ydCBDb2x1bW5cclxuICAgICAgICB9IGVsc2UgaWYgKGFkZGl0aXZlKSB7XHJcbiAgICAgICAgICBuZXdTb3J0ZWQgPSBuZXdTb3J0ZWQuY29uY2F0KFxyXG4gICAgICAgICAgICBjb2x1bW4ubWFwKGQgPT4gKHtcclxuICAgICAgICAgICAgICBpZDogZC5pZCxcclxuICAgICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXdTb3J0ZWQgPSBjb2x1bW4ubWFwKGQgPT4gKHtcclxuICAgICAgICAgICAgaWQ6IGQuaWQsXHJcbiAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcclxuICAgICAgICAgIH0pKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhZ2U6ICghc29ydGVkLmxlbmd0aCAmJiBuZXdTb3J0ZWQubGVuZ3RoKSB8fCAhYWRkaXRpdmUgPyAwIDogdGhpcy5zdGF0ZS5wYWdlLFxyXG4gICAgICAgICAgc29ydGVkOiBuZXdTb3J0ZWQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiBvblNvcnRlZENoYW5nZSAmJiBvblNvcnRlZENoYW5nZShuZXdTb3J0ZWQsIGNvbHVtbiwgYWRkaXRpdmUpXHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJDb2x1bW4gKGNvbHVtbiwgdmFsdWUpIHtcclxuICAgICAgY29uc3QgeyBmaWx0ZXJlZCB9ID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcclxuICAgICAgY29uc3QgeyBvbkZpbHRlcmVkQ2hhbmdlIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgICAvLyBSZW1vdmUgb2xkIGZpbHRlciBmaXJzdCBpZiBpdCBleGlzdHNcclxuICAgICAgY29uc3QgbmV3RmlsdGVyaW5nID0gKGZpbHRlcmVkIHx8IFtdKS5maWx0ZXIoeCA9PiB4LmlkICE9PSBjb2x1bW4uaWQpXHJcblxyXG4gICAgICBpZiAodmFsdWUgIT09ICcnKSB7XHJcbiAgICAgICAgbmV3RmlsdGVyaW5nLnB1c2goe1xyXG4gICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcclxuICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaWx0ZXJlZDogbmV3RmlsdGVyaW5nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4gb25GaWx0ZXJlZENoYW5nZSAmJiBvbkZpbHRlcmVkQ2hhbmdlKG5ld0ZpbHRlcmluZywgY29sdW1uLCB2YWx1ZSlcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZUNvbHVtblN0YXJ0IChldmVudCwgY29sdW1uLCBpc1RvdWNoKSB7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgIGNvbnN0IHBhcmVudFdpZHRoID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuXHJcbiAgICAgIGxldCBwYWdlWFxyXG4gICAgICBpZiAoaXNUb3VjaCkge1xyXG4gICAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYWdlWCA9IGV2ZW50LnBhZ2VYXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMudHJhcEV2ZW50cyA9IHRydWVcclxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGN1cnJlbnRseVJlc2l6aW5nOiB7XHJcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXHJcbiAgICAgICAgICAgIHN0YXJ0WDogcGFnZVgsXHJcbiAgICAgICAgICAgIHBhcmVudFdpZHRoLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIGlmIChpc1RvdWNoKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMucmVzaXplQ29sdW1uTW92aW5nKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZUNvbHVtbk1vdmluZyAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgY29uc3QgeyBvblJlc2l6ZWRDaGFuZ2UsIGNvbHVtbiB9ID0gdGhpcy5wcm9wc1xyXG4gICAgICBjb25zdCB7IHJlc2l6ZWQsIGN1cnJlbnRseVJlc2l6aW5nLCBjb2x1bW5zIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxyXG4gICAgICBjb25zdCBjdXJyZW50Q29sdW1uID0gY29sdW1ucy5maW5kKGMgPT4gYy5hY2Nlc3NvciA9PT0gY3VycmVudGx5UmVzaXppbmcuaWQpXHJcbiAgICAgIGNvbnN0IG1pblJlc2l6ZVdpZHRoID0gY3VycmVudENvbHVtbiA/IGN1cnJlbnRDb2x1bW4ubWluUmVzaXplV2lkdGggOiBjb2x1bW4ubWluUmVzaXplV2lkdGhcclxuXHJcbiAgICAgIC8vIERlbGV0ZSBvbGQgdmFsdWVcclxuICAgICAgY29uc3QgbmV3UmVzaXplZCA9IHJlc2l6ZWQuZmlsdGVyKHggPT4geC5pZCAhPT0gY3VycmVudGx5UmVzaXppbmcuaWQpXHJcblxyXG4gICAgICBsZXQgcGFnZVhcclxuXHJcbiAgICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2htb3ZlJykge1xyXG4gICAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcclxuICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSAnbW91c2Vtb3ZlJykge1xyXG4gICAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbmV3V2lkdGggPSBNYXRoLm1heChcclxuICAgICAgICBjdXJyZW50bHlSZXNpemluZy5wYXJlbnRXaWR0aCArIHBhZ2VYIC0gY3VycmVudGx5UmVzaXppbmcuc3RhcnRYLFxyXG4gICAgICAgIG1pblJlc2l6ZVdpZHRoXHJcbiAgICAgIClcclxuXHJcbiAgICAgIG5ld1Jlc2l6ZWQucHVzaCh7XHJcbiAgICAgICAgaWQ6IGN1cnJlbnRseVJlc2l6aW5nLmlkLFxyXG4gICAgICAgIHZhbHVlOiBuZXdXaWR0aCxcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcclxuICAgICAgICB7XHJcbiAgICAgICAgICByZXNpemVkOiBuZXdSZXNpemVkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4gb25SZXNpemVkQ2hhbmdlICYmIG9uUmVzaXplZENoYW5nZShuZXdSZXNpemVkLCBldmVudClcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZUNvbHVtbkVuZCAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgY29uc3QgaXNUb3VjaCA9IGV2ZW50LnR5cGUgPT09ICd0b3VjaGVuZCcgfHwgZXZlbnQudHlwZSA9PT0gJ3RvdWNoY2FuY2VsJ1xyXG5cclxuICAgICAgaWYgKGlzVG91Y2gpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIGl0cyBhIHRvdWNoIGV2ZW50IGNsZWFyIHRoZSBtb3VzZSBvbmUncyBhcyB3ZWxsIGJlY2F1c2Ugc29tZXRpbWVzXHJcbiAgICAgIC8vIHRoZSBtb3VzZURvd24gZXZlbnQgZ2V0cyBjYWxsZWQgYXMgd2VsbCwgYnV0IHRoZSBtb3VzZVVwIGV2ZW50IGRvZXNuJ3RcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxyXG5cclxuICAgICAgLy8gVGhlIHRvdWNoIGV2ZW50cyBkb24ndCBwcm9wYWdhdGUgdXAgdG8gdGhlIHNvcnRpbmcncyBvbk1vdXNlRG93biBldmVudCBzb1xyXG4gICAgICAvLyBubyBuZWVkIHRvIHByZXZlbnQgaXQgZnJvbSBoYXBwZW5pbmcgb3IgZWxzZSB0aGUgZmlyc3QgY2xpY2sgYWZ0ZXIgYSB0b3VjaFxyXG4gICAgICAvLyBldmVudCByZXNpemUgd2lsbCBub3Qgc29ydCB0aGUgY29sdW1uLlxyXG4gICAgICBpZiAoIWlzVG91Y2gpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xyXG4gICAgICAgICAgc2tpcE5leHRTb3J0OiB0cnVlLFxyXG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IGZhbHNlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==