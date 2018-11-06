import React, { Component } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, ArrowKeyStepper } from 'react-virtualized'
import 'react-virtualized/styles.css'; // only needs to be imported once
import ListItem from './ListItem';

class VList extends Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
        this.state = {
            // listRowHeight: 50,
            overscanRowCount: 5,
            scrollToIndex: 0,
            // showScrollingPlaceholder: false,
            // useDynamicRowHeight: true,
        };

        this._noRowsRenderer = this._noRowsRenderer.bind(this);
        this._rowRenderer = this._rowRenderer.bind(this);

        this._cache = new CellMeasurerCache({
            fixedWidth: true,
            minHeight: 10,
        });
        this._lastRenderedWidth = null;

    }

    _selectCell = ({ scrollToColumn, scrollToRow }) => {
        this.setState({ scrollToIndex: scrollToRow });
    }

    _noRowsRenderer() {
        return <div>Nothing to display</div>;
    }

    _rowRenderer({ index, isScrolling, key, style, parent, scrollToColumn, scrollToRow }) {
        let item = this.props.list[index];


        return (

            <CellMeasurer
                cache={this._cache}
                columnIndex={0}
                key={key}
                rowIndex={index}
                parent={parent}>
                {({ measure }) => (
                    <div className={index === scrollToRow ? 'highlightThis' : ''}
                        key={key}
                        style={style}
                        onMouseDown={() => this._selectCell({ scrollToColumn: null, scrollToRow: index })}
                    >
                        <ListItem
                            measure={measure}
                            index={index}
                            item={item}
                        />
                    </div>
                )}
            </CellMeasurer>
        );
    }



    render() {
        const {
            // width,
            // listHeight,
            // listRowHeight,
            overscanRowCount,
            // rowCount,
            scrollToIndex,
            // showScrollingPlaceholder,
            // useDynamicRowHeight,
        } = this.state;

        return (
            <ArrowKeyStepper
                className='fullHeight'
                columnCount={1}
                isControlled={true}
                onScrollToChange={this._selectCell}
                mode='cells'
                rowCount={this.props.list.length}
                scrollToColumn={0}
                scrollToRow={scrollToIndex}
            >
                {({ onSectionRendered, scrollToColumn, scrollToRow }) => {
                    return (
                        <AutoSizer>
                            {({ width, height }) => {
                                if (this._lastRenderedWidth !== width) {
                                    this._lastRenderedWidth = width;
                                    this._cache.clearAll();
                                }
                                return (
                                    <List
                                        list={this.props.list}
                                        noRowsRenderer={this._noRowsRenderer}
                                        deferredMeasurementCache={this._cache}
                                        ref={this.listRef}
                                        // scrollToAlignment='start'
                                        height={height}
                                        overscanRowCount={overscanRowCount}
                                        rowCount={this.props.list.length}
                                        rowHeight={this._cache.rowHeight}
                                        rowRenderer={({ index, isScrolling, key, style, parent }) =>
                                            this._rowRenderer({
                                                index, isScrolling, key, style, parent,
                                                scrollToRow, scrollToColumn
                                            })
                                        }

                                        scrollToIndex={this.state.scrollToIndex}
                                        width={width}

                                        onRowsRendered={onSectionRendered}
                                    />
                                )
                            }}
                        </AutoSizer>
                    )
                }}
            </ArrowKeyStepper>
        );
    }
}

export default VList;